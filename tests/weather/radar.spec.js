const { test, expect } = require("../../fixtures");
const { dismissCookieBanner } = require("../../utils/test-helpers");

const RADAR_URL = "https://vejr.tv2.dk/radar-fra-dmi-nedboer-i-danmark-lige-nu";

test.describe("Weather radar page", () => {
  test.describe.configure({ timeout: 60000 });

  test("Radar page renders", async ({ weatherPage, page }) => {
    await weatherPage.navigateAbsolute(RADAR_URL);
    await dismissCookieBanner(page);

    await expect(page).toHaveURL(/radar-fra-dmi-nedboer-i-danmark-lige-nu/i);
    await expect(weatherPage.main).toBeVisible();

    await expect
      .poll(async () => weatherPage.radarRoot.count(), {
        timeout: 25000,
      })
      .toBeGreaterThan(0);
  });
});
