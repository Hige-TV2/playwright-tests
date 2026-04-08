const { test, expect } = require("../../fixtures");

test.describe("Top navigation", () => {
  test("Logo is visible and links to frontpage", async ({ frontPage }) => {
    await expect(frontPage.navigation.logo).toBeVisible();
    await expect(frontPage.navigation.logo).toHaveAttribute(
      "href",
      "https://tv2.dk",
    );
  });

  test("Nyheder link is visible and points to correct URL", async ({
    frontPage,
  }) => {
    await expect(frontPage.navigation.navNyheder).toBeVisible();
    await expect(frontPage.navigation.navNyheder).toHaveAttribute(
      "href",
      "https://nyheder.tv2.dk/",
    );
  });

  test("Sport link is visible and points to correct URL", async ({
    frontPage,
  }) => {
    await expect(frontPage.navigation.navSport).toBeVisible();
    await expect(frontPage.navigation.navSport).toHaveAttribute(
      "href",
      "https://sport.tv2.dk/",
    );
  });

  test("Vejr link is visible and points to correct URL", async ({
    frontPage,
  }) => {
    await expect(frontPage.navigation.navVejr).toBeVisible();
    await expect(frontPage.navigation.navVejr).toHaveAttribute(
      "href",
      "https://vejr.tv2.dk/",
    );
  });

  test("TV link is visible and points to correct URL", async ({
    frontPage,
  }) => {
    await expect(frontPage.navigation.navTV).toBeVisible();
    await expect(frontPage.navigation.navTV).toHaveAttribute(
      "href",
      "https://tv.tv2.dk/",
    );
  });

  test("TV 2 Play button is visible and points to correct URL", async ({
    frontPage,
  }) => {
    await expect(frontPage.navigation.playButton).toBeVisible();
    await expect(frontPage.navigation.playButton).toHaveAttribute(
      "href",
      "https://play.tv2.dk",
    );
  });

  test("Log ind button is visible", async ({ frontPage }) => {
    await expect(frontPage.navigation.loginButton).toBeVisible();
  });

  test("Menu button is visible", async ({ frontPage }) => {
    await expect(frontPage.navigation.menuButton).toBeVisible();
  });
});
