const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");
const { gotoWithRetry } = require("../utils/page-navigation");

class WeatherPage {
  constructor(page) {
    this.page = page;
    this.url = "https://vejr.tv2.dk";

    // Shared components available on tv2 pages.
    this.navigation = new Navigation(page);
    this.sidebar = new Sidebar(page);
    this.footer = new Footer(page);
    this.loginMenu = new LoginMenu(page);

    // Main page regions.
    this.main = page.locator("main");
    this.pageHeading = this.main.getByRole("heading").first();

    // Forecast/content cards are dynamic, so tests should poll counts.
    this.forecastCards = this.main.locator(
      "article, [data-testid*='forecast'], [class*='forecast'], [class*='Forecast']",
    );

    // City search input has no aria-label; match by placeholder instead.
    this.citySearchInput = this.main
      .getByPlaceholder(/Søg efter by eller sted/i)
      .first();

    this.citySuggestionItems = page.locator(
      "[role='option'], [data-testid*='suggest'], [class*='suggestion'], [class*='autocomplete'] li",
    );

    // Radar page render targets.
    this.radarRoot = page.locator(
      "main canvas, main svg, main iframe, main [id*='radar'], main [class*='radar'], main [class*='map'], #map, .leaflet-container",
    );

    // Common weather subsection links (kept broad and stable).
    this.weatherSectionLinks = page.locator(
      "a[href*='/vejr/'], a[href*='radar-fra-dmi']",
    );
  }

  async navigate(path = "") {
    await gotoWithRetry(this.page, `${this.url}${path}`);
  }

  async navigateAbsolute(url) {
    await gotoWithRetry(this.page, url);
  }

  /**
   * Search for a Danish city using the visible search control.
   * Falls back to keyboard submit when suggestions are not available.
   * @param {string} cityName
   */
  async searchCity(cityName) {
    await this.citySearchInput.waitFor({ state: "visible", timeout: 20000 });
    await this.citySearchInput.click();
    await this.citySearchInput.fill(cityName);

    const previousUrl = this.page.url();

    // Try keyboard-driven selection first, which is usually stable for comboboxes.
    await this.citySearchInput.press("ArrowDown").catch(() => {});
    await this.citySearchInput.press("Enter");

    const changedByKeyboard = await this.page
      .waitForURL(
        (url) => {
          const asString = String(url);
          return asString !== previousUrl && /\/vejr\//i.test(asString);
        },
        { timeout: 8000 },
      )
      .then(() => true)
      .catch(() => false);

    if (changedByKeyboard) {
      return;
    }

    const suggestion = this.citySuggestionItems
      .filter({ hasText: new RegExp(cityName, "i") })
      .first();

    if (await suggestion.isVisible({ timeout: 5000 }).catch(() => false)) {
      await suggestion.click();
      await this.page
        .waitForURL(
          (url) => {
            const asString = String(url);
            return asString !== previousUrl && /\/vejr\//i.test(asString);
          },
          { timeout: 8000 },
        )
        .catch(() => {});
    }
  }
}

module.exports = { WeatherPage };
