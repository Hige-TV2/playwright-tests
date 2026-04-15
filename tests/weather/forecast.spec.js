const { test, expect } = require("../../fixtures");
const { dismissCookieBanner } = require("../../utils/test-helpers");

const FORECAST_PATH = "/vejr/koebenhavn-2618425";
const TOP_CITIES = [
  { name: "Aarhus", path: "/vejr/aarhus-2624652" },
  { name: "Odense", path: "/vejr/odense-2615876" },
];

test.describe("Weather forecast pages", () => {
  test.describe.configure({ timeout: 90000 });

  test.beforeEach(async ({ weatherPage, page }) => {
    await weatherPage.navigate(FORECAST_PATH);
    await dismissCookieBanner(page);
  });

  test("Forecast page loads for København", async ({ weatherPage, page }) => {
    await expect(weatherPage.main).toBeVisible();
    await expect(page).toHaveURL(/\/vejr\/koebenhavn-\d+/i);
  });

  test("Forecast page exposes weather cards and temperature tokens", async ({
    weatherPage,
    page,
  }) => {
    await expect
      .poll(async () => weatherPage.forecastCards.count(), {
        timeout: 25000,
      })
      .toBeGreaterThan(0);

    const bodyText = (await weatherPage.main.innerText()).replace(/\s+/g, " ");
    await expect(bodyText).toMatch(/\d+\s?°/);

    await expect(page).toHaveURL(/\/vejr\//i);
  });

  test("City search can navigate to Aarhus", async ({ weatherPage, page }) => {
    await weatherPage.searchCity("Aarhus");
    await expect(page).toHaveURL(/\/vejr\/aarhus-\d+/i);
    await expect(weatherPage.main).toBeVisible();
  });

  test("Top Danish city forecast routes load", async ({
    weatherPage,
    page,
  }) => {
    for (const city of TOP_CITIES) {
      await weatherPage.navigate(city.path);
      await expect(page).toHaveURL(
        new RegExp(`/vejr/${city.name.toLowerCase()}-\\d+`, "i"),
      );
      await expect(weatherPage.main).toBeVisible();
    }
  });
});
