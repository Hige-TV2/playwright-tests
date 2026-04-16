const { test, expect } = require("../../fixtures");

test.describe("TV 2 Play integration", () => {
  test.describe.configure({ timeout: 60000 });

  test("Play deck heading and CTA are visible", async ({ tvPage }) => {
    await expect(tvPage.playHeadingLink).toBeVisible();
    await expect(tvPage.playDeckCTA).toBeVisible();
  });

  test("Play heading and CTA link to play.tv2.dk", async ({ tvPage }) => {
    await expect(tvPage.playHeadingLink).toHaveAttribute(
      "href",
      /play\.tv2\.dk/,
    );
    await expect(tvPage.playDeckCTA).toHaveAttribute("href", /play\.tv2\.dk/);
  });

  test("Play deck has dynamic content", async ({ tvPage }) => {
    await expect
      .poll(async () => tvPage.playDomainLinks.count(), {
        timeout: 20000,
      })
      .toBeGreaterThan(0);
  });

  test("At least one Play deck link points to play.tv2.dk", async ({
    tvPage,
  }) => {
    await expect
      .poll(
        async () => {
          const count = await tvPage.playDomainLinks.count();
          for (let i = 0; i < Math.min(count, 12); i++) {
            const href =
              (await tvPage.playDomainLinks.nth(i).getAttribute("href")) || "";
            if (/play\.tv2\.dk/i.test(href)) {
              return true;
            }
          }
          return false;
        },
        { timeout: 20000 },
      )
      .toBeTruthy();
  });
});
