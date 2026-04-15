const { test, expect } = require("../../fixtures");
const { TournamentPage } = require("../../pages/tournamentPage");
const {
  dismissCookieBanner,
  verifyLinkHrefs,
  verifyPageLoad,
  verifyVisibleItems,
} = require("../../utils/test-helpers");

// ============================================================
// Football — 3F Superliga
// Rich page with branding deck, team nav slider, match posters,
// highlights reel, standings table, and sub-navigation tabs.
// ============================================================
test.describe("Football tournament page - Superliga", () => {
  test.describe.configure({ timeout: 60000 });
  let tournamentPage;

  test.beforeEach(async ({ page }) => {
    tournamentPage = new TournamentPage(
      page,
      "https://sport.tv2.dk/fodbold/superliga",
    );
    await tournamentPage.navigate();
    await dismissCookieBanner(page);
    await tournamentPage.waitForPageReady();
  });

  test("Page loads with main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      tournamentPage.main,
      "https://sport.tv2.dk/fodbold/superliga",
      "Superliga tournament page",
    );
  });

  test("Branding deck is present with TV 2 Play link", async () => {
    await expect(tournamentPage.brandingDeck).toBeVisible();
    await expect(tournamentPage.brandingPlayLink).toBeVisible();
    const href = await tournamentPage.brandingPlayLink.getAttribute("href");
    expect(href).toContain("play.tv2.dk");
    console.log("✓ Branding deck present with TV 2 Play link");
  });

  test("Team navigation slider shows team links", async () => {
    await expect(tournamentPage.teamNavigation).toBeVisible();
    const teamCount = await tournamentPage.teamLinks.count();
    expect(teamCount).toBeGreaterThan(0);
    console.log(`✓ Team navigation slider has ${teamCount} team links`);
  });

  test("Team navigation links have valid URLs", async () => {
    await verifyLinkHrefs(tournamentPage.teamLinks, 5);
  });

  test("Match poster deck shows match cards", async () => {
    await expect(tournamentPage.matchPosterDeck).toBeVisible();
    const matchCount = await tournamentPage.matchLinks.count();
    expect(matchCount).toBeGreaterThan(0);
    console.log(`✓ Match poster deck has ${matchCount} match cards`);
  });

  test("Match card links have valid URLs", async () => {
    await verifyLinkHrefs(tournamentPage.matchLinks, 3);
  });

  test("Highlights reel deck is present with video links", async () => {
    await expect(tournamentPage.highlightsDeck).toBeVisible();
    const highlightCount = await tournamentPage.highlightsLinks.count();
    expect(highlightCount).toBeGreaterThan(0);
    console.log(`✓ Highlights deck has ${highlightCount} videos`);
  });

  test("Standings table is present and populated", async () => {
    await expect(tournamentPage.standingsDeck).toBeVisible();
    const rowCount = await tournamentPage.standingsRows.count();
    expect(rowCount).toBeGreaterThan(0);
    console.log(`✓ Standings table has ${rowCount} team rows`);
  });

  test("Sub-navigation tabs are accessible", async () => {
    await verifyVisibleItems(
      [
        { name: "Stilling", locator: tournamentPage.subNavStilling },
        { name: "Kampprogram", locator: tournamentPage.subNavKampprogram },
        { name: "Sendeplan", locator: tournamentPage.subNavSendeplan },
        { name: "Højdepunkter", locator: tournamentPage.subNavHoejdepunkter },
      ],
      "Football sub-navigation tabs",
    );
  });
});

// ============================================================
// Handball — Bundesligaen
// Simpler page: only standings table and recent/upcoming matches.
// No branding deck, team nav slider, match posters, or highlights.
// ============================================================
test.describe("Handball tournament page - Bundesligaen", () => {
  test.describe.configure({ timeout: 60000 });
  let tournamentPage;

  test.beforeEach(async ({ page }) => {
    tournamentPage = new TournamentPage(
      page,
      "https://sport.tv2.dk/haandbold/bundesligaen",
    );
    await tournamentPage.navigate();
    await dismissCookieBanner(page);
    await tournamentPage.waitForPageReady();
  });

  test("Page loads with main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      tournamentPage.main,
      "https://sport.tv2.dk/haandbold/bundesligaen",
      "Bundesligaen tournament page",
    );
  });

  test("Standings table is present and populated", async () => {
    await expect(tournamentPage.standingsDeck).toBeVisible();
    const rowCount = await tournamentPage.standingsRows.count();
    expect(rowCount).toBeGreaterThan(0);
    console.log(`✓ Standings table has ${rowCount} team rows`);
  });

  test("Recent matches section lists match links", async () => {
    const count = await tournamentPage.recentMatchLinks.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✓ Recent matches section has ${count} match links`);
  });

  test("Upcoming matches section lists match links", async () => {
    const count = await tournamentPage.upcomingMatchLinks.count();
    expect(count).toBeGreaterThan(0);
    console.log(`✓ Upcoming matches section has ${count} match links`);
  });

  test("Recent match links have valid URLs", async () => {
    await verifyLinkHrefs(tournamentPage.recentMatchLinks, 3);
  });

  test("Football-only sections are absent", async () => {
    await expect(tournamentPage.brandingDeck).not.toBeVisible();
    await expect(tournamentPage.teamNavigation).not.toBeVisible();
    await expect(tournamentPage.highlightsDeck).not.toBeVisible();
    console.log(
      "✓ Football-only sections (branding, team nav, highlights) are not present",
    );
  });
});
