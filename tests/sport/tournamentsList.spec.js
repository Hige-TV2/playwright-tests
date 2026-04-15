const { test, expect } = require("../../fixtures");
const { TournamentsList } = require("../../pages/tournamentsList");
const {
  dismissCookieBanner,
  verifyLinkHrefs,
  verifyPageLoad,
  verifyVisibleItems,
} = require("../../utils/test-helpers");

test.describe("Sport tournaments page", () => {
  test.describe.configure({ timeout: 60000 });
  let tournamentsList;

  test.beforeEach(async ({ page }) => {
    tournamentsList = new TournamentsList(page);
    await tournamentsList.navigate();
    await dismissCookieBanner(page);
    await tournamentsList.waitForTournamentsReady();
  });

  test("Tournaments page loads and has main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      tournamentsList.main,
      "https://sport.tv2.dk/turneringer",
      "Tournaments page",
    );
  });

  test("Sport categories are present", async () => {
    await verifyVisibleItems(
      [
        { name: "Fodbold", locator: tournamentsList.fodboldTab },
        { name: "Håndbold", locator: tournamentsList.handboldTab },
      ],
      "Sport category tabs",
    );
  });

  test("Tournament links are available", async () => {
    const footballCount = await tournamentsList.footballTournamentLinks.count();
    const handballCount = await tournamentsList.handballTournamentLinks.count();
    const totalCount = footballCount + handballCount;

    expect(totalCount).toBeGreaterThan(0);
    console.log(`✓ Page has ${totalCount} tournament links`);
  });

  test("Football tournaments are listed", async () => {
    const footballTournaments =
      tournamentsList.getTournamentsBySport("Fodbold");
    const footballCount = await footballTournaments.count();
    expect(footballCount).toBeGreaterThan(0);

    console.log(`✓ ${footballCount} football tournaments listed`);
  });

  test("Handball tournaments are listed", async () => {
    const handballTournaments =
      tournamentsList.getTournamentsBySport("Håndbold");
    const handballCount = await handballTournaments.count();
    expect(handballCount).toBeGreaterThan(0);

    console.log(`✓ ${handballCount} handball tournaments listed`);
  });

  test("Popular tournaments are accessible", async ({ page }) => {
    // Test Superliga link
    if (await tournamentsList.superligaLink.isVisible().catch(() => false)) {
      await dismissCookieBanner(page);
      const superligaHref =
        await tournamentsList.superligaLink.getAttribute("href");
      await tournamentsList.superligaLink.click();
      await expect(page).toHaveURL(superligaHref || "");
      await page.goBack();
      console.log("✓ Superliga tournament accessible");
    }

    // Test Premier League link
    if (
      await tournamentsList.premierLeagueLink.isVisible().catch(() => false)
    ) {
      await dismissCookieBanner(page);
      const premierLeagueHref =
        await tournamentsList.premierLeagueLink.getAttribute("href");
      await tournamentsList.premierLeagueLink.click();
      await expect(page).toHaveURL(premierLeagueHref || "");
      console.log("✓ Premier League tournament accessible");
    }
  });

  test("Tournament links have valid URLs", async () => {
    await verifyLinkHrefs(tournamentsList.footballTournamentLinks, 3);
    await verifyLinkHrefs(tournamentsList.handballTournamentLinks, 3);
  });

  test("Can navigate to specific tournament", async ({ page }) => {
    await dismissCookieBanner(page);

    if (await tournamentsList.superligaLink.isVisible().catch(() => false)) {
      const href = await tournamentsList.superligaLink.getAttribute("href");
      await tournamentsList.superligaLink.click();
      await expect(page).toHaveURL(href || "");
      console.log("✓ Successfully navigated to Superliga");
      return;
    }

    if (
      await tournamentsList.premierLeagueLink.isVisible().catch(() => false)
    ) {
      const href = await tournamentsList.premierLeagueLink.getAttribute("href");
      await tournamentsList.premierLeagueLink.click();
      await expect(page).toHaveURL(href || "");
      console.log("✓ Successfully navigated to Premier League");
      return;
    }

    console.log("✓ No visible tournament link available in current run state");
  });
});
