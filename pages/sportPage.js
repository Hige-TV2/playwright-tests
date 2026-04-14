const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");

class SportPage {
  constructor(page) {
    this.page = page;
    this.url = "https://sport.tv2.dk";

    // Main content area
    this.main = page.locator("main");

    // Shared components — identical behaviour to FrontPage
    this.navigation = new Navigation(page);
    this.sidebar = new Sidebar(page);
    this.footer = new Footer(page);
    this.loginMenu = new LoginMenu(page);

    // Sport-specific sections
    this.shortVideosSection = page
      .locator("h2:has-text('Korte videoer')")
      .locator("..");
    this.superligaHighlights = page
      .locator("h2:has-text('Superliga-highlights')")
      .locator("..");
    this.mostViewedSport = page
      .locator("h2:has-text('Mest sete sport')")
      .first()
      .locator("..");
    this.latestSport = page
      .locator("h2:has-text('Seneste Sport')")
      .first()
      .locator("..");
    this.tv2PlaySection = page
      .locator("h2:has-text('TV 2 Play')")
      .locator("..");

    // Navigation links to sports
    this.fodboldLink = page.getByRole("link", { name: "Fodbold", exact: true });
    this.handboldLink = page.getByRole("link", {
      name: "Håndbold",
      exact: true,
    });
    this.cyklingLink = page.getByRole("link", { name: "Cykling", exact: true });
    this.badmintonLink = page.getByRole("link", {
      name: "Badminton",
      exact: true,
    });
    this.nflLink = page.getByRole("link", { name: "NFL", exact: true });
    this.tennisLink = page.getByRole("link", { name: "Tennis", exact: true });

    // Sub-page navigation
    this.sendeplanLink = page.locator("a[href*='/sendeplan']").first();
    this.liveScoresLink = page
      .locator("a[href*='/livescore-og-resultater']")
      .first();
    this.tournamentsLink = page.locator("a[href*='/turneringer']").first();
  }

  async navigate(path = "") {
    await this.page.goto(`${this.url}${path}`, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
  }
}

module.exports = { SportPage };
