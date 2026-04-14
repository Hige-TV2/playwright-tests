const { test, expect } = require("../../fixtures");
const { TournamentsPage } = require("../../pages/tournamentsPage");
const {
  dismissCookieBanner,
  verifyLinkHrefs,
  verifyPageLoad,
  verifyVisibleItems,
} = require("../../utils/test-helpers");

test.describe("Sport tournaments page", () => {
  test.describe.configure({ timeout: 60000 });
  let tournamentsPage;

  test.beforeEach(async ({ page }) => {
    tournamentsPage = new TournamentsPage(page);
    await tournamentsPage.navigate();
    await dismissCookieBanner(page);
    await tournamentsPage.waitForTournamentsReady();
  });

  test("Tournaments page loads and has main content", async ({ page }) => {
    await verifyPageLoad(
      page,
      tournamentsPage.main,
      "https://sport.tv2.dk/turneringer",
      "Tournaments page",
    );
  });

  test("Sport categories are present", async () => {
    await verifyVisibleItems(
      [
        { name: "Fodbold", locator: tournamentsPage.fodboldTab },
        { name: "Håndbold", locator: tournamentsPage.handboldTab },
      ],
      "Sport category tabs",
    );
  });

  test("Tournament links are available", async () => {
    const footballCount = await tournamentsPage.footballTournamentLinks.count();
    const handballCount = await tournamentsPage.handballTournamentLinks.count();
    const totalCount = footballCount + handballCount;

    expect(totalCount).toBeGreaterThan(0);
    console.log(`✓ Page has ${totalCount} tournament links`);
  });

  test("Football tournaments are listed", async () => {
    const footballTournaments =
      tournamentsPage.getTournamentsBySport("Fodbold");
    const footballCount = await footballTournaments.count();
    expect(footballCount).toBeGreaterThan(0);

    console.log(`✓ ${footballCount} football tournaments listed`);
  });

  test("Handball tournaments are listed", async () => {
    const handballTournaments =
      tournamentsPage.getTournamentsBySport("Håndbold");
    const handballCount = await handballTournaments.count();
    expect(handballCount).toBeGreaterThan(0);

    console.log(`✓ ${handballCount} handball tournaments listed`);
  });

  test("Popular tournaments are accessible", async ({ page }) => {
    // Test Superliga link
    if (await tournamentsPage.superligaLink.isVisible().catch(() => false)) {
      await dismissCookieBanner(page);
      const superligaHref =
        await tournamentsPage.superligaLink.getAttribute("href");
      await tournamentsPage.superligaLink.click();
      await expect(page).toHaveURL(superligaHref || "");
      await page.goBack();
      console.log("✓ Superliga tournament accessible");
    }

    // Test Premier League link
    if (
      await tournamentsPage.premierLeagueLink.isVisible().catch(() => false)
    ) {
      await dismissCookieBanner(page);
      const premierLeagueHref =
        await tournamentsPage.premierLeagueLink.getAttribute("href");
      await tournamentsPage.premierLeagueLink.click();
      await expect(page).toHaveURL(premierLeagueHref || "");
      console.log("✓ Premier League tournament accessible");
    }
  });

  test("Tournament links have valid URLs", async () => {
    await verifyLinkHrefs(tournamentsPage.footballTournamentLinks, 3);
    await verifyLinkHrefs(tournamentsPage.handballTournamentLinks, 3);
  });

  test("Can navigate to specific tournament", async ({ page }) => {
    await dismissCookieBanner(page);

    if (await tournamentsPage.superligaLink.isVisible().catch(() => false)) {
      const href = await tournamentsPage.superligaLink.getAttribute("href");
      await tournamentsPage.superligaLink.click();
      await expect(page).toHaveURL(href || "");
      console.log("✓ Successfully navigated to Superliga");
      return;
    }

    if (
      await tournamentsPage.premierLeagueLink.isVisible().catch(() => false)
    ) {
      const href = await tournamentsPage.premierLeagueLink.getAttribute("href");
      await tournamentsPage.premierLeagueLink.click();
      await expect(page).toHaveURL(href || "");
      console.log("✓ Successfully navigated to Premier League");
      return;
    }

    console.log("✓ No visible tournament link available in current run state");
  });
});
