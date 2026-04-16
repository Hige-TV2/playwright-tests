const { test, expect } = require("../../fixtures");

test.describe("Login Menu", () => {
  test.beforeEach(async ({ frontPage }) => {
    await frontPage.navigation.openLoginMenu();
  });

  test("Login menu opens when Log ind button is clicked", async ({
    frontPage,
  }) => {
    await expect(frontPage.loginMenu.themeHeader).toBeVisible();
  });

  test("Login menu closes when close button is clicked", async ({
    frontPage,
  }) => {
    await frontPage.loginMenu.close();
    await expect(frontPage.loginMenu.themeHeader).not.toBeVisible();
  });

  test("Log ind link is visible", async ({ frontPage }) => {
    await expect(frontPage.loginMenu.loginLink).toBeVisible();
  });

  test("Opret TV 2 Login link is visible", async ({ frontPage }) => {
    await expect(frontPage.loginMenu.createAccountLink).toBeVisible();
  });

  test.describe("Theme settings", () => {
    test("Farvetema header is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.themeHeader).toBeVisible();
    });

    test("Theme note is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.themeNote).toBeVisible();
    });
  });

  test.describe("Region selector", () => {
    test("Region selector is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.regionSummary).toBeVisible();
    });

    test("Region dropdown expands and shows options", async ({ frontPage }) => {
      await frontPage.loginMenu.openRegionDropdown();
      const options = await frontPage.loginMenu.getRegionOptions();
      expect(options.length).toBeGreaterThan(0);
    });

    test("Selecting a region updates the selector", async ({ frontPage }) => {
      const initialRegion = await frontPage.loginMenu.getSelectedRegion();
      await frontPage.loginMenu.openRegionDropdown();
      await frontPage.loginMenu.selectRegion("TV2FYN");
      const updated = await frontPage.loginMenu.getSelectedRegion();
      expect(updated).not.toBe(initialRegion);
      expect(updated).toContain("TV 2 Fyn");
    });
  });

  test.describe("Shortcuts", () => {
    test("Genveje heading is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.shortcutsHeader).toBeVisible();
    });

    test("TV 2 Play shortcut is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.shortcutPlay).toBeVisible();
    });

    test("Administrer TV 2 konto link is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.shortcutAdminKonto).toBeVisible();
    });
  });

  test.describe("Privacy settings", () => {
    test("Privatlivsindstillinger heading is visible", async ({
      frontPage,
    }) => {
      await expect(frontPage.loginMenu.privacyHeader).toBeVisible();
    });

    test("TV 2 privatlivspolitik link is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.privacyPolicyLink).toBeVisible();
    });

    test("Cookie-indstillinger button is visible", async ({ frontPage }) => {
      await expect(frontPage.loginMenu.cookieSettingsButton).toBeVisible();
    });
  });
});
