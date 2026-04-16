const { test, expect } = require("../../fixtures");
const { MatchPage } = require("../../pages/matchPage");
const {
  dismissCookieBanner,
  verifyPageLoad,
  verifyLinkHrefs,
  verifyVisibleItems,
} = require("../../utils/test-helpers");
const { gotoWithRetry } = require("../../utils/page-navigation");

// ============================================================
// Finished match — Atletico Madrid 1-2 Barcelona (La Liga)
// Rich page: Kampoversigt with score + timeline, Hold (lineup),
// Statistik table, and sidebar article sections.
// ============================================================
test.describe("Football match page — finished match", () => {
  test.describe.configure({ timeout: 60000 });

  const FINISHED_URL = "https://sport.tv2.dk/fodbold/28184/kamp/5205794";
  let matchPage;

  test.beforeEach(async ({ page }) => {
    matchPage = new MatchPage(page, FINISHED_URL);
    await matchPage.navigate();
    await dismissCookieBanner(page);
    await matchPage.waitForPageReady();
  });

  test("Page loads with main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      matchPage.main,
      FINISHED_URL,
      "Finished match page",
    );
  });

  test("Match overview section is visible", async () => {
    await expect(matchPage.matchOverviewHeading).toBeVisible();
    console.log("✓ Kampoversigt heading is visible");
  });

  test("Match timeline events are present", async () => {
    await expect
      .poll(async () => matchPage.matchEventItems.count(), {
        timeout: 15000,
        message: "Expected at least one timeline event",
      })
      .toBeGreaterThan(0);
    const count = await matchPage.matchEventItems.count();
    console.log(`✓ ${count} timeline event item(s) present`);
  });

  test("Teams lineup section is present", async () => {
    await expect(matchPage.teamsSection).toBeVisible();
    console.log("✓ Teams (Hold) section is visible");
  });

  test("Statistics section is present", async () => {
    await expect(matchPage.statisticsSection).toBeVisible();
    console.log("✓ Statistics (Statistik) section is visible");
  });

  test("Statistics table is populated", async () => {
    await expect(matchPage.statsTable).toBeVisible();
    await expect
      .poll(async () => matchPage.statsRows.count(), {
        timeout: 10000,
        message: "Expected stats table to have rows",
      })
      .toBeGreaterThan(0);
    const rowCount = await matchPage.statsRows.count();
    console.log(`✓ Statistics table has ${rowCount} row(s)`);
  });

  test("Sidebar most-viewed section has article links", async () => {
    await expect(matchPage.mostViewedSection).toBeVisible();
    await expect
      .poll(async () => matchPage.mostViewedLinks.count(), {
        timeout: 10000,
        message: "Expected most-viewed section to have links",
      })
      .toBeGreaterThan(0);
    await verifyLinkHrefs(matchPage.mostViewedLinks, 3);
    console.log("✓ Most-viewed sidebar section has article links");
  });

  test("Sidebar latest sport section has article links", async () => {
    await expect(matchPage.latestSportSection).toBeVisible();
    await expect
      .poll(async () => matchPage.latestSportLinks.count(), {
        timeout: 10000,
        message: "Expected latest sport section to have links",
      })
      .toBeGreaterThan(0);
    await verifyLinkHrefs(matchPage.latestSportLinks, 3);
    console.log("✓ Latest sport sidebar section has article links");
  });
});

// ============================================================
// Upcoming match — URL resolved dynamically from the live-scores
// page for tomorrow's date.  The whole block is skipped if no
// upcoming football match links are found.
// ============================================================
test.describe("Football match page — upcoming match", () => {
  test.describe.configure({ timeout: 60000 });

  let upcomingMatchUrl = null;
  let matchPage;

  test.beforeAll(async ({ browser }) => {
    test.setTimeout(75000);
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      // Build tomorrow's date string (YYYY-MM-DD)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().slice(0, 10);

      await gotoWithRetry(
        page,
        `https://sport.tv2.dk/livescore-og-resultater/${dateStr}`,
        {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        },
      );
      await page
        .waitForLoadState("networkidle", { timeout: 15000 })
        .catch(() => {});

      const matchLinks = page.locator("a[href*='/kamp/']");
      const count = await matchLinks.count();
      if (count > 0) {
        upcomingMatchUrl = await matchLinks.first().getAttribute("href");
        // Ensure absolute URL
        if (upcomingMatchUrl && upcomingMatchUrl.startsWith("/")) {
          upcomingMatchUrl = `https://sport.tv2.dk${upcomingMatchUrl}`;
        }
      }
    } finally {
      await context.close();
    }
  });

  test.beforeEach(async ({ page }) => {
    if (!upcomingMatchUrl) {
      test.skip();
      return;
    }
    matchPage = new MatchPage(page, upcomingMatchUrl);
    await matchPage.navigate();
    await dismissCookieBanner(page);
    await matchPage.waitForPageReady();
  });

  test("Page loads with main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      matchPage.main,
      upcomingMatchUrl,
      "Upcoming match page",
    );
  });

  test("Match overview section is visible", async () => {
    await expect(matchPage.matchOverviewHeading).toBeVisible();
    console.log("✓ Overblik heading is visible");
  });

  test("Sub-navigation tabs are accessible", async () => {
    await expect(matchPage.subNavigation).toBeVisible();
    await verifyVisibleItems(
      [
        { name: "Overblik", locator: matchPage.subNavOverblik },
        { name: "Hændelser", locator: matchPage.subNavHaendelser },
        { name: "Opstilling", locator: matchPage.subNavOpstilling },
        { name: "Statistik", locator: matchPage.subNavStatistik },
        { name: "Stilling", locator: matchPage.subNavStilling },
      ],
      "Match sub-navigation tabs",
    );
  });

  test("Upcoming match has no finished status", async () => {
    const finished = await matchPage.isFinished();
    expect(finished).toBe(false);
    console.log("✓ Match does not show finished (Ft) status");
  });

  test("Sidebar most-viewed section has article links", async () => {
    await expect(matchPage.mostViewedSection).toBeVisible();
    await expect
      .poll(async () => matchPage.mostViewedLinks.count(), { timeout: 10000 })
      .toBeGreaterThan(0);
    console.log("✓ Most-viewed sidebar section has links");
  });

  test("Sidebar latest sport section has article links", async () => {
    await expect(matchPage.latestSportSection).toBeVisible();
    await expect
      .poll(async () => matchPage.latestSportLinks.count(), { timeout: 10000 })
      .toBeGreaterThan(0);
    console.log("✓ Latest sport sidebar section has links");
  });
});

// ============================================================
// Live match — URL resolved dynamically from today's live-scores.
// Uses the strictest possible detection: a match link must be
// inside a container with an explicit CSS live-score class.
// All tests are individually skipped if no live match is found.
// ============================================================
test.describe("Football match page — live match", () => {
  test.describe.configure({ timeout: 60000 });

  let liveMatchUrl = null;
  let matchPage;

  test.beforeAll(async ({ browser }) => {
    test.setTimeout(75000);
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
      await gotoWithRetry(
        page,
        "https://sport.tv2.dk/livescore-og-resultater",
        {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        },
      );
      await page
        .waitForLoadState("networkidle", { timeout: 15000 })
        .catch(() => {});

      // Look strictly for a match link inside a container bearing an explicit
      // live-score CSS indicator.  We intentionally avoid text-based fallbacks
      // to prevent false positives from sidebar "Live" article labels.
      const liveMatchContainers = page.main
        ? page.locator("main")
        : page.locator("[id='main'], main");

      const liveLinks = liveMatchContainers.locator(
        "[class*='live-score'] a[href*='/kamp/']," +
          "[class*='LiveScore'] a[href*='/kamp/']," +
          "[data-live='true'] a[href*='/kamp/']",
      );

      const count = await liveLinks.count();
      for (let i = 0; i < count; i++) {
        const href = await liveLinks
          .nth(i)
          .getAttribute("href")
          .catch(() => null);
        if (href) {
          liveMatchUrl = href.startsWith("/")
            ? `https://sport.tv2.dk${href}`
            : href;
          break;
        }
      }
    } finally {
      await context.close();
    }
  });

  test.beforeEach(async ({ page }) => {
    if (!liveMatchUrl) {
      test.skip();
      return;
    }
    matchPage = new MatchPage(page, liveMatchUrl);
    await matchPage.navigate();
    await dismissCookieBanner(page);
    await matchPage.waitForPageReady();
  });

  test("Page loads with main content", async ({ page }) => {
    await verifyPageLoad(page, matchPage.main, liveMatchUrl, "Live match page");
  });

  test("Match overview section is visible", async () => {
    await expect(matchPage.matchOverviewHeading).toBeVisible();
    console.log("✓ Match overview heading is visible for live match");
  });

  test("Live status indicator is present in match area", async () => {
    const isLive = await matchPage.isLive();
    expect(isLive).toBe(true);
    console.log("✓ Live status indicator found in match area");
  });

  test("Sidebar most-viewed section has article links", async () => {
    await expect(matchPage.mostViewedSection).toBeVisible();
    await expect
      .poll(async () => matchPage.mostViewedLinks.count(), { timeout: 10000 })
      .toBeGreaterThan(0);
    console.log("✓ Most-viewed sidebar section has links");
  });

  test("Sidebar latest sport section has article links", async () => {
    await expect(matchPage.latestSportSection).toBeVisible();
    await expect
      .poll(async () => matchPage.latestSportLinks.count(), { timeout: 10000 })
      .toBeGreaterThan(0);
    console.log("✓ Latest sport sidebar section has links");
  });
});
