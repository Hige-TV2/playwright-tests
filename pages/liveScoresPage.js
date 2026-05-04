const { gotoWithRetry } = require("../utils/page-navigation");

class LiveScoresPage {
  constructor(page) {
    this.page = page;
    this.url = "https://sport.tv2.dk/livescore-og-resultater";

    // Main content
    this.main = page.locator("main");
    this.mainContent = page.locator("#main");
    this.sportFilterGroup = this.mainContent
      .getByRole("heading", { name: "Sportsgrene" })
      .locator("..");

    // Sport category links
    this.fodboldLink = this.sportFilterGroup.getByRole("link", {
      name: "Fodbold",
      exact: true,
    });
    this.handboldLink = this.sportFilterGroup.getByRole("link", {
      name: "Håndbold",
      exact: true,
    });
    this.cyklingLink = this.sportFilterGroup.getByRole("link", {
      name: "Cykling",
      exact: true,
    });

    // Date navigation
    this.dateLinks = page.locator("a[href*='/livescore-og-resultater/2026-']");

    // Match/game elements
    this.matches = page.locator("[class*='match'], [class*='game'], article");

    // Featured/important matches
    this.featuredMatches = page
      .locator("h4:has-text('Fremhævede')")
      .locator("..")
      .locator("a");
  }

  async navigate() {
    await gotoWithRetry(this.page, this.url);
  }

  /**
   * Navigate to a specific date
   * @param {string} dateString - Format: "2026-04-14"
   */
  async navigateToDate(dateString) {
    const dateLink = this.page.locator(
      `a[href*="/livescore-og-resultater/${dateString}"]`,
    );
    await dateLink.click();
  }

  /**
   * Get matches for a specific sport
   * @param {string} sport - "Fodbold", "Håndbold", or "Cykling"
   */
  getMatchesBySport(sport) {
    // This might need refinement based on actual page structure
    return this.matches.filter({ hasText: sport });
  }

  /**
   * Check if a match is live
   * @param {import('@playwright/test').Locator} match
   */
  async isLive(match) {
    const liveIndicator = match.locator("text=/Live|LIVE|live/");
    return (await liveIndicator.count()) > 0;
  }

  /**
   * Get match result/score
   * @param {import('@playwright/test').Locator} match
   */
  async getMatchScore(match) {
    // Look for score patterns like "2-1" or "1 - 0"
    const scoreText = await match.textContent();
    const scoreMatch = scoreText?.match(/(\d+)\s*-\s*(\d+)/);
    return scoreMatch ? `${scoreMatch[1]}-${scoreMatch[2]}` : null;
  }
}

module.exports = { LiveScoresPage };
