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
    this.regionAccordion = page.locator('details[aria-label="Nyhedsregion"]');
    this.regionSummary = page.locator(
      'details[aria-label="Nyhedsregion"] summary',
    );
    this.regionSubtext = page.locator(
      'details[aria-label="Nyhedsregion"] small',
    );
    this.regionOptions = page.locator(
      'details[aria-label="Nyhedsregion"] input[type="radio"]',
    );

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
    await this.regionSummary.click();
  }

  async getRegionOptions() {
    const labels = this.page.locator(
      'details[aria-label="Nyhedsregion"] label',
    );
    return labels.allTextContents();
  }

  async selectRegion(regionValue) {
    await this.page
      .locator(`input[id="region-${regionValue}"]`)
      .check({ force: true });
  }

  async getSelectedRegion() {
    return this.regionSubtext.textContent();
  }
}

module.exports = { LoginMenu };
