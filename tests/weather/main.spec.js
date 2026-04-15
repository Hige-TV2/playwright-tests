const { test, expect } = require("../../fixtures");
const {
  verifyPageLoad,
  verifyVisibleItems,
  verifyLinkHrefs,
} = require("../../utils/test-helpers");

test.describe("Weather main page", () => {
  test.describe.configure({ timeout: 60000 });

  test("Weather front page loads with main content", async ({
    weatherPage,
    page,
  }) => {
    await verifyPageLoad(
      page,
      weatherPage.main,
      /https:\/\/vejr\.tv2\.dk\/?$/,
      "Weather page",
    );
  });

  test("Main weather regions are visible", async ({ weatherPage }) => {
    await verifyVisibleItems(
      [
        { name: "Main content", locator: weatherPage.main },
        { name: "Page heading", locator: weatherPage.pageHeading },
      ],
      "Weather core regions",
    );
  });

  test("Weather subsection links have valid hrefs", async ({ weatherPage }) => {
    await expect
      .poll(async () => weatherPage.weatherSectionLinks.count(), {
        timeout: 20000,
      })
      .toBeGreaterThan(0);

    await verifyLinkHrefs(weatherPage.weatherSectionLinks, 8);
  });
});
