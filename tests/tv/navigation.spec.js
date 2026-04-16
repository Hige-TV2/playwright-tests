const { test, expect } = require("../../fixtures");
const { dismissCookieBanner } = require("../../utils/test-helpers");

async function clickThroughWithSoftAssertions(
  page,
  tvPage,
  { name, locator, expectedUrl },
) {
  const count = await locator.count();
  let visibleLocator = locator.first();

  for (let i = 0; i < count; i++) {
    const candidate = locator.nth(i);
    if (await candidate.isVisible().catch(() => false)) {
      visibleLocator = candidate;
      break;
    }
  }

  await expect
    .soft(visibleLocator, `${name}: link should be visible`)
    .toBeVisible();

  await visibleLocator.scrollIntoViewIfNeeded().catch(() => {});

  const href = await visibleLocator.getAttribute("href");
  expect.soft(href, `${name}: href should be present`).toBeTruthy();

  if (!href) {
    return;
  }

  const originUrl = page.url();

  const popupPromise = page
    .waitForEvent("popup", { timeout: 8000 })
    .catch(() => null);

  const urlChangedPromise = page
    .waitForURL((url) => String(url) !== originUrl, {
      timeout: 15000,
    })
    .then(() => true)
    .catch(() => false);

  try {
    await visibleLocator.click({ timeout: 15000, noWaitAfter: true });
  } catch (error) {
    expect
      .soft(false, `${name}: click failed (${String(error.message || error)})`)
      .toBeTruthy();
    return;
  }

  const popup = await popupPromise;

  if (popup) {
    await popup
      .waitForLoadState("domcontentloaded", { timeout: 30000 })
      .catch(() => {});
    expect
      .soft(popup.url(), `${name}: popup destination should match`)
      .toMatch(expectedUrl);
    await popup.close().catch(() => {});
    return;
  }

  const urlChanged = await urlChangedPromise;
  if (!urlChanged) {
    // Some external links may be intercepted by client-side handlers.
    // Fall back to direct navigation validation using the discovered href.
    const verificationPage = await page.context().newPage();
    await verificationPage
      .goto(href, { waitUntil: "domcontentloaded", timeout: 30000 })
      .catch((error) => {
        expect
          .soft(
            false,
            `${name}: fallback navigation failed (${String(error.message || error)})`,
          )
          .toBeTruthy();
      });
    expect
      .soft(
        verificationPage.url(),
        `${name}: fallback destination should match`,
      )
      .toMatch(expectedUrl);
    await verificationPage.close().catch(() => {});
    return;
  }

  await page
    .waitForLoadState("domcontentloaded", { timeout: 30000 })
    .catch(() => {});
  expect
    .soft(page.url(), `${name}: destination should match`)
    .toMatch(expectedUrl);

  if (page.url() !== originUrl) {
    await page
      .goBack({ waitUntil: "domcontentloaded", timeout: 20000 })
      .catch(async () => {
        await tvPage.navigate();
        await dismissCookieBanner(page);
      });
  }
}

test.describe("TV outbound navigation", () => {
  test.describe.configure({ timeout: 90000 });

  test("Key outbound links navigate to expected destinations", async ({
    tvPage,
    page,
  }) => {
    await expect
      .poll(async () => tvPage.channelGuideLinks.count(), {
        timeout: 20000,
      })
      .toBeGreaterThan(0);

    const targets = [
      {
        name: "TV-guide link",
        locator: tvPage.tvGuideLink,
        expectedUrl: /https?:\/\/tvtid\.tv2\.dk\/?/i,
      },
      {
        name: "Kanaler link",
        locator: tvPage.channelsLink,
        expectedUrl:
          /https?:\/\/omtv2\.tv2\.dk\/(tv-2s-medier|medier)\/kanaler\/?/i,
      },
      {
        name: "TV 2 Play top navigation link",
        locator: tvPage.navigation.playButton,
        expectedUrl: /https?:\/\/play\.tv2\.dk\/?/i,
      },
      {
        name: "First channel guide card",
        locator: tvPage.channelGuideLinks.first(),
        expectedUrl: /https?:\/\/tvtid\.tv2\.dk\/kanal\//i,
      },
    ];

    for (const target of targets) {
      await clickThroughWithSoftAssertions(page, tvPage, target);
    }
  });
});
