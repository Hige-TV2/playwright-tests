class TournamentsPage {
  constructor(page) {
    this.page = page;
    this.url = "https://sport.tv2.dk/turneringer";

    // Main content
    this.main = page.locator("main");
    this.mainContent = page.locator("#main");

    // Sport categories
    this.fodboldTab = this.mainContent.getByRole("tab", { name: "Fodbold" });
    this.handboldTab = this.mainContent.getByRole("tab", { name: "Håndbold" });

    // Tournament links
    this.footballTournamentLinks = this.mainContent.locator(
      "a[href*='/fodbold/']",
    );
    this.handballTournamentLinks = this.mainContent.locator(
      "a[href*='/haandbold/']",
    );

    // Specific tournament links (most common ones)
    this.superligaLink = this.mainContent
      .locator("a[href*='/superliga']")
      .first();
    this.premierLeagueLink = this.mainContent
      .locator("a[href*='/premier-league']")
      .first();
    this.laLigaLink = this.mainContent.locator("a[href*='/la-liga']").first();
    this.serieALink = this.mainContent.locator("a[href*='/serie-a']").first();
    this.bundesligaLink = this.mainContent
      .locator("a[href*='/bundesligaen']")
      .first();
  }

  async navigate() {
    await this.page.goto(this.url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
  }

  /**
   * Wait for tournaments area to be ready.
   */
  async waitForTournamentsReady() {
    await this.fodboldTab.waitFor({ state: "visible", timeout: 15000 });
  }

  /**
   * Get all tournaments for a specific sport
   * @param {string} sport - "Fodbold" or "Håndbold"
   */
  getTournamentsBySport(sport) {
    if (sport === "Fodbold") {
      return this.footballTournamentLinks;
    }
    if (sport === "Håndbold") {
      return this.handballTournamentLinks;
    }
    return this.page.locator("a"); // fallback
  }

  /**
   * Navigate to a specific tournament
   * @param {string} tournamentName - e.g., "superliga", "premier-league"
   */
  async navigateToTournament(tournamentName) {
    const link = this.page.locator(`a[href*='/${tournamentName}']`).first();
    await link.click();
  }
}

module.exports = { TournamentsPage };
