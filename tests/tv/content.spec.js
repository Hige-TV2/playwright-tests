const { test, expect } = require("../../fixtures");
const {
  verifyPageLoad,
  verifyVisibleItems,
  verifyLinkHrefs,
} = require("../../utils/test-helpers");

test.describe("TV main content", () => {
  test.describe.configure({ timeout: 60000 });

  test("TV page loads with main content", async ({ tvPage, page }) => {
    await verifyPageLoad(
      page,
      tvPage.main,
      /https:\/\/tv\.tv2\.dk\/?$/,
      "TV page",
    );
  });

  test("Core TV regions are visible", async ({ tvPage }) => {
    await verifyVisibleItems(
      [
        { name: "Main content", locator: tvPage.main },
        { name: "TV 2 lige nu module", locator: tvPage.tv2LigeNuLink },
        { name: "TV guide section", locator: tvPage.tvGuideHeading },
      ],
      "TV core regions",
    );
  });

  test("TV channel guide contains links", async ({ tvPage }) => {
    await expect
      .poll(async () => tvPage.channelGuideLinks.count(), {
        timeout: 20000,
      })
      .toBeGreaterThan(0);

    await verifyLinkHrefs(tvPage.channelGuideLinks, 6);
  });
});
