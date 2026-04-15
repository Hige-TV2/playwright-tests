class MatchPage {
  constructor(page, url = "") {
    this.page = page;
    this.url = url;

    // Derive sport from URL for conditional logic in tests
    this.sport = url.includes("/fodbold/")
      ? "football"
      : url.includes("/haandbold/")
        ? "handball"
        : "unknown";

    // Main content
    this.main = page.locator("main");
    this.mainContent = page.locator("#main");

    // Page heading
    this.pageHeading = this.main.getByRole("heading", { level: 1 }).first();

    // ----------------------------------------------------------------
    // Match overview section
    // Heading is "Kampoversigt" on finished matches, "Overblik" on
    // upcoming / live matches.  We match both so the same locator
    // works for all three states.
    // ----------------------------------------------------------------
    this.matchOverviewHeading = this.main
      .getByRole("heading", { name: /kampoversigt|overblik/i })
      .first();

    this.matchOverviewSection = this.main
      .getByRole("heading", { name: /kampoversigt|overblik/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div or self::article][1]",
      )
      .first();

    // Timeline events (goals, cards, substitutions) — each carries a minute
    // marker and a player name.  Present on finished and live matches only.
    this.matchEventItems = this.matchOverviewSection.locator(
      "[class*='event'], [class*='Event'], li, [class*='timeline'], [class*='Timeline']",
    );

    // ----------------------------------------------------------------
    // Teams / lineup section  (finished match: own ## Hold section)
    // ----------------------------------------------------------------
    this.teamsSection = this.main
      .getByRole("heading", { name: /^hold$/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div or self::article][1]",
      )
      .first();

    // ----------------------------------------------------------------
    // Statistics section
    // ----------------------------------------------------------------
    this.statisticsSection = this.main
      .getByRole("heading", { name: /statistik/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div or self::article][1]",
      )
      .first();

    this.statsTable = this.statisticsSection.locator("table").first();
    this.statsRows = this.statsTable.locator("tr");

    // ----------------------------------------------------------------
    // Sub-navigation tabs (upcoming / live matches only)
    // Rendered as a button group inside <main>, not as a navigation.
    // ----------------------------------------------------------------
    this.subNavigation = this.main.getByRole("group", {
      name: /button group/i,
    });
    this.subNavOverblik = this.subNavigation
      .locator("a")
      .filter({ hasText: /^overblik$/i })
      .first();
    this.subNavHaendelser = this.subNavigation
      .locator("a")
      .filter({ hasText: /hændelser/i })
      .first();
    this.subNavOpstilling = this.subNavigation
      .locator("a")
      .filter({ hasText: /opstilling/i })
      .first();
    this.subNavStatistik = this.subNavigation
      .locator("a")
      .filter({ hasText: /statistik/i })
      .first();
    this.subNavStilling = this.subNavigation
      .locator("a")
      .filter({ hasText: /stilling/i })
      .first();

    // ----------------------------------------------------------------
    // Sidebar sections — rendered outside <main> at the page level
    // ----------------------------------------------------------------
    this.mostViewedSection = page
      .getByRole("heading", { name: /mest sete sport/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div or self::aside][1]",
      )
      .first();
    this.mostViewedLinks = this.mostViewedSection.locator("a[href]");

    this.latestSportSection = page
      .getByRole("heading", { name: /seneste sport/i })
      .locator(
        "xpath=ancestor::*[self::section or self::div or self::aside][1]",
      )
      .first();
    this.latestSportLinks = this.latestSportSection.locator("a[href]");
  }

  /**
   * Navigate to the match page.
   * @param {string} [url] - Override the URL set in the constructor.
   */
  async navigate(url) {
    await this.page.goto(url || this.url, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    if (url) this.url = url;
  }

  /**
   * Wait until the main content and the match overview heading are visible.
   * Also attempts networkidle but does not fail if it times out (TV2 keeps
   * long-lived connections open).
   */
  async waitForPageReady() {
    await this.main.waitFor({ state: "visible", timeout: 20000 });
    await this.page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => {});
    await this.matchOverviewHeading.waitFor({
      state: "visible",
      timeout: 20000,
    });
  }

  /**
   * Returns true when the match is finished ("Ft" status text is present).
   */
  async isFinished() {
    const text = await this.main.textContent().catch(() => "");
    return /\bft\b/i.test(text);
  }

  /**
   * Returns true when the match is currently live.
   */
  async isLive() {
    const liveIndicator = this.main.locator(
      "[class*='live'], [class*='Live'], [aria-label*='live']",
    );
    return (await liveIndicator.count()) > 0;
  }

  /**
   * Returns true when the match is upcoming (not finished and not live).
   */
  async isUpcoming() {
    return !(await this.isFinished()) && !(await this.isLive());
  }
}

module.exports = { MatchPage };
