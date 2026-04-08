class LoginMenu {
  constructor(page) {
    this.page = page;

    this.closeButton = page.getByRole("button", { name: "Luk login menu" });
    this.loginLink = page.getByRole("link", { name: "Log ind" });
    this.createAccountLink = page.getByRole("link", {
      name: "Opret TV 2 Login",
    });

    // Theme settings
    this.themeHeader = page.getByText("Farvetema", { exact: true });
    this.themeNote = page.getByText('Med "Auto" skiftes der');

    // Regional selector
    this.regionSelector = page.getByText("NyhedsregionTV 2 Kosmopol", {
      exact: true,
    });
    this.regionDropdown = page
      .getByLabel("Nyhedsregion")
      .locator("div")
      .filter({ hasText: "Vælg nyhedsregionTV 2" });
    this.regionOptions = page.getByLabel("Nyhedsregion").locator("label");

    // Shortcuts
    this.shortcutsHeader = page.getByRole("heading", { name: "Genveje" });
    this.shortcutPlay = page
      .getByLabel("Log ind")
      .getByRole("link", { name: "TV 2 Play" });
    this.shortcutAdminKonto = page.getByRole("link", {
      name: "Administrer TV 2 konto",
    });

    // Privacy
    this.privacyHeader = page.getByRole("heading", {
      name: "Privatlivsindstillinger",
    });
    this.privacyPolicyLink = page.getByRole("link", {
      name: "TV 2 privatlivspolitik",
      exact: true,
    });
    this.cookieSettingsButton = page
      .getByLabel("Log ind")
      .getByRole("button", { name: "Cookie-indstillinger" });
  }

  async close() {
    await this.closeButton.click();
  }

  async openRegionDropdown() {
    await this.regionSelector.click();
  }

  async getRegionOptions() {
    return this.regionOptions.allTextContents();
  }

  async selectRegion(regionName) {
    const option = this.page
      .getByLabel("Nyhedsregion")
      .locator('input[type="radio"]')
      .filter({ has: this.page.locator("label", { hasText: regionName }) });
    await option.check({ force: true });
  }

  async getSelectedRegion() {
    return this.regionSelector.textContent();
  }
}

module.exports = { LoginMenu };
