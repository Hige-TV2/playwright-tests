const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");

class SectionNav {
  constructor(page) {
    this.slider = page.locator("nav.tc_header__local ol.tc_slider__list");

    // Individual section tab links
    this.tabSeneste = page.getByRole("link", {
      name: "Seneste",
      exact: true,
    });
    this.tabPolitik = page.getByRole("link", {
      name: "Politik",
      exact: true,
    });
    this.tabKrimi = page.getByRole("link", {
      name: "Krimi",
      exact: true,
    });
    this.tabSamfund = page.getByRole("link", {
      name: "Samfund",
      exact: true,
    });
    this.tabUdland = page.getByRole("link", {
      name: "Udland",
      exact: true,
    });
  }

  /**
   * Returns the tab link for a given section name.
   * Useful for dynamic tab assertions without listing every tab explicitly.
   * @param {string} name - visible tab label, e.g. "Seneste"
   */
  tab(name) {
    return this.slider.getByRole("link", { name, exact: true });
  }

  /**
   * Returns true if a tab is marked as the active/current tab.
   * The active item carries aria-current="true" on the <a> element.
   * @param {import('@playwright/test').Locator} tabLocator
   */
  async isActive(tabLocator) {
    const ariaCurrent = await tabLocator.getAttribute("aria-current");
    return ariaCurrent === "true";
  }
}

class NyhederPage {
  constructor(page) {
    this.page = page;
    this.url = "https://nyheder.tv2.dk";

    // Shared components — identical behaviour to FrontPage
    this.navigation = new Navigation(page);
    this.sidebar = new Sidebar(page);
    this.footer = new Footer(page);
    this.loginMenu = new LoginMenu(page);

    // Nyheder-specific: section slider below the global header
    this.sectionNav = new SectionNav(page);

    // Main content area
    this.main = page.locator("main");

    // First article teaser in the main feed
    this.firstArticle = page.getByRole("article").first();
  }

  async gotoWithRetry(url, maxAttempts = 2) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        return;
      } catch (error) {
        lastError = error;
        const message = String(error?.message || "");
        const isRetryable =
          message.includes("ERR_CONNECTION_TIMED_OUT") ||
          message.includes("ERR_ABORTED") ||
          message.includes("Test timeout") ||
          message.includes("Timeout");

        if (!isRetryable || attempt === maxAttempts) {
          throw error;
        }
      }
    }

    throw lastError;
  }

  async navigate(path = "") {
    await this.gotoWithRetry(`${this.url}${path}`);
  }

  /**
   * Navigate directly to a named sub-section.
   * @param {"seneste"|"politik"|"krimi"|"samfund"|"udland"} section
   */
  async navigateTo(section) {
    await this.gotoWithRetry(`${this.url}/${section}`);
  }
}

module.exports = { NyhederPage, SectionNav };
