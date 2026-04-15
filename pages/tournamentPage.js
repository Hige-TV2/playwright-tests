class TournamentPage {
  constructor(page, url) {
    this.page = page;
    this.url = url;

    // Determine page type from URL for conditional logic in tests
    this.type = url.includes("/fodbold/")
      ? "football"
      : url.includes("/haandbold/")
        ? "handball"
        : "unknown";

    // Main content
    this.main = page.locator("main");
    this.mainContent = page.locator("#main");

    // ----------------------------------------------------------------
    // Common — present on both football and handball tournament pages
    // ----------------------------------------------------------------

    // Standings are represented by the primary tournament table on both pages.
    this.standingsDeck = this.main.locator("table").first();
    this.standingsRows = this.standingsDeck.locator("tbody tr, tr");

    // ----------------------------------------------------------------
    // Football-only sections
    // ----------------------------------------------------------------

    // Branding deck at the top with TV 2 Play button.
    this.brandingDeck = this.main
      .locator(
        "xpath=.//*[self::div or self::section][.//h2[contains(., 'TV 2 Play')] and .//a[contains(@href, 'play.tv2.dk/info')]][1]",
      )
      .first();
    this.brandingPlayLink = this.brandingDeck
      .locator('a[href*="play.tv2.dk"]')
      .first();

    // Team navigation slider.
    this.teamNavigation = page.locator(".tc_sport-team-navigation");
    this.teamLinks = this.teamNavigation.locator("a[href*='/hold/']");

    // Match poster deck — represented by the main match list region on the live page.
    this.matchPosterDeck = page.getByRole("region", {
      name: /liste af kampe/i,
    });
    this.matchLinks = this.matchPosterDeck.locator("a[href*='/kamp/']");

    // Highlights deck uses a header element inside the enclosing tc_deck container.
    this.highlightsDeck = page
      .locator(".tc_deck__header")
      .filter({ hasText: /highlights/i })
      .locator("xpath=ancestor::*[contains(@class,'tc_deck')][1]")
      .first();
    this.highlightsLinks = this.highlightsDeck.locator(
      "a[href*='/video/'], a[href*='/reel/']",
    );

    // Sub-navigation tabs (football tournament sub-pages)
    this.subNavigation = page.getByRole("navigation", {
      name: /Undersektioner/i,
    });
    this.subNavStilling = this.subNavigation
      .locator('a[href$="/stilling"]')
      .first();
    this.subNavKampprogram = this.subNavigation
      .locator('a[href$="/kampprogram"]')
      .first();
    this.subNavSendeplan = this.subNavigation
      .locator('a[href$="/sendeplan"]')
      .first();
    this.subNavHoejdepunkter = this.subNavigation
      .locator('a[href$="/hoejdepunkter"]')
      .first();

    // ----------------------------------------------------------------
    // Handball-only sections
    // ----------------------------------------------------------------

    // Recent and upcoming match links inside the "Kampe" section.
    this.recentMatchesSection = this.main
      .getByRole("heading", { name: /Seneste kampe/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div][.//a[contains(@href, '/kamp/')]][1]",
      )
      .first();
    this.recentMatchLinks =
      this.recentMatchesSection.locator("a[href*='/kamp/']");
    this.upcomingMatchesSection = this.main
      .getByRole("heading", { name: /Kommende kampe/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div][.//a[contains(@href, '/kamp/')]][1]",
      )
      .first();
    this.upcomingMatchLinks =
      this.upcomingMatchesSection.locator("a[href*='/kamp/']");
  }

  async navigate() {
    await this.page.goto(this.url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
  }

  /**
   * Wait for the page's primary content to be ready.
   * Football waits for the team navigation slider; handball waits for standings.
   */
  async waitForPageReady() {
    await this.main.waitFor({ state: "visible", timeout: 20000 });
    await this.page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => {});

    if (this.type === "football") {
      await this.teamNavigation.waitFor({ state: "visible", timeout: 20000 });
    } else {
      await this.standingsDeck.waitFor({ state: "visible", timeout: 20000 });
    }
  }

  isFootball() {
    return this.type === "football";
  }

  isHandball() {
    return this.type === "handball";
  }
}

module.exports = { TournamentPage };
