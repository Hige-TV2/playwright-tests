const { test, expect } = require("../../fixtures");
const { dismissCookieBanner } = require("../../utils/test-helpers");

const BADEVAND_PATH = "/badevandstemperatur";

test.describe("Weather subsection: Badevandstemperatur", () => {
  test.describe.configure({ timeout: 60000 });

  test.beforeEach(async ({ weatherPage, page }) => {
    await weatherPage.navigate(BADEVAND_PATH);
    await dismissCookieBanner(page);
  });

  test("Page loads with expected route and main content", async ({
    weatherPage,
    page,
  }) => {
    await expect(page).toHaveURL(/\/badevandstemperatur\/?$/i);
    await expect(weatherPage.main).toBeVisible();
  });

  test("Section heading is visible", async ({ weatherPage }) => {
    await expect(
      weatherPage.main.getByRole("heading", {
        name: "Badevandstemperatur",
        level: 1,
      }),
    ).toBeVisible();
  });

  test("Primary data region is present", async ({ weatherPage }) => {
    const structuralItems = weatherPage.main.locator(
      "table, [role='table'], article, li",
    );

    await expect
      .poll(async () => structuralItems.count(), {
        timeout: 25000,
      })
      .toBeGreaterThan(0);
  });
});
