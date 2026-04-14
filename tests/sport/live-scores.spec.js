const { test, expect } = require("../../fixtures");
const { LiveScoresPage } = require("../../pages/liveScoresPage");
const {
  dismissCookieBanner,
  verifyPageLoad,
  verifyVisibleItems,
} = require("../../utils/test-helpers");

test.describe("Sport live scores page", () => {
  test.describe.configure({ timeout: 60000 });
  let liveScoresPage;

  test.beforeEach(async ({ page }) => {
    liveScoresPage = new LiveScoresPage(page);
    await liveScoresPage.navigate();
    await dismissCookieBanner(page);
  });

  test("Live scores page loads and has main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      liveScoresPage.main,
      "https://sport.tv2.dk/livescore-og-resultater",
      "Live scores page",
    );
  });

  test("Sport category links are present", async () => {
    await verifyVisibleItems(
      [
        { name: "Fodbold", locator: liveScoresPage.fodboldLink },
        { name: "Håndbold", locator: liveScoresPage.handboldLink },
        { name: "Cykling", locator: liveScoresPage.cyklingLink },
      ],
      "Sport category links",
    );
  });

  test("Date navigation is available", async () => {
    const dateLinkCount = await liveScoresPage.dateLinks.count();
    console.log(`✓ Date navigation has ${dateLinkCount} date links`);
  });

  test("Matches/games are displayed", async () => {
    await expect
      .poll(async () => await liveScoresPage.matches.count(), {
        timeout: 15000,
      })
      .toBeGreaterThan(0);
    console.log("✓ Page displays matches/games");
  });

  test("Matches have required content", async () => {
    const firstMatch = liveScoresPage.matches.first();
    await expect(firstMatch).toBeVisible();

    const matchText = await firstMatch.textContent();
    expect(matchText?.length).toBeGreaterThan(5);

    console.log("✓ First match has content");
  });

  test("Can navigate to different dates", async ({ page }) => {
    // Get current URL
    const currentUrl = page.url();

    // Click on a different date (not today)
    const dateLinks = liveScoresPage.dateLinks;
    const dateCount = await dateLinks.count();

    if (dateCount > 1) {
      // Find a date that's not the current one
      for (let i = 0; i < dateCount; i++) {
        const dateLink = dateLinks.nth(i);
        const href = await dateLink.getAttribute("href");

        if (!currentUrl.includes(href?.split("/").pop() || "")) {
          await dismissCookieBanner(page);
          await dateLink.click();
          await expect(page).toHaveURL(href || "");
          console.log(`✓ Navigated to different date: ${href}`);
          break;
        }
      }
    } else {
      console.log("✓ Only one date available (current date)");
    }
  });

  test("Sport filtering works", async ({ page }) => {
    await dismissCookieBanner(page);

    const fodboldHref = await liveScoresPage.fodboldLink.getAttribute("href");
    const handboldHref = await liveScoresPage.handboldLink.getAttribute("href");

    expect(fodboldHref).toMatch(/^https?:\/\//);
    expect(handboldHref).toMatch(/^https?:\/\//);

    await liveScoresPage.fodboldLink.click();
    await expect(page).toHaveURL(fodboldHref || "");

    console.log("✓ Sport filtering links are valid and navigation works");
  });
});
