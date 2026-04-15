const { test } = require("../../fixtures");

async function logFirstElements(locator, name, limit = 3) {
  const count = await locator.count();
  console.log(`\n${name}: ${count}`);

  for (let i = 0; i < Math.min(limit, count); i++) {
    const el = locator.nth(i);
    const text = (await el.textContent())?.replace(/\s+/g, " ").trim();
    const className = await el.getAttribute("class");
    console.log(
      `  [${i}] class="${className || ""}" text="${(text || "").slice(0, 140)}"`,
    );
  }
}

test.describe("Debug: Tournament Detail Pages", () => {
  test("Analyze football tournament page (Superliga)", async ({ page }) => {
    await page.goto("https://sport.tv2.dk/fodbold/superliga", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForLoadState("networkidle").catch(() => {});

    console.log("\n=== Football Tournament (Superliga) ===");
    console.log(`URL: ${page.url()}`);

    const keySections = [
      {
        name: "Team slider (tc_sport-team-navigation)",
        locator: page.locator(".tc_sport-team-navigation"),
      },
      {
        name: "Match cards deck (MatchPosterGroup)",
        locator: page.locator("[class*='MatchPosterGroup']"),
      },
      {
        name: "Highlight deck header (tc_deck__header)",
        locator: page.locator(".tc_deck__header"),
      },
      {
        name: "Standings deck (deck-standings-match)",
        locator: page.locator("[class*='deck-standings-match']"),
      },
      {
        name: "Branding deck (tc_brandingdeck)",
        locator: page.locator(".tc_brandingdeck"),
      },
    ];

    for (const section of keySections) {
      const count = await section.locator.count();
      console.log(`${section.name}: ${count > 0 ? "FOUND" : "NOT FOUND"} (${count})`);
    }

    const teamLinks = page
      .locator(".tc_sport-team-navigation")
      .locator("a, button, [role='link']");
    await logFirstElements(teamLinks, "Team slider interactive items", 8);

    const matchCards = page.locator("[class*='MatchPosterGroup'] article, [class*='MatchPosterGroup'] a");
    await logFirstElements(matchCards, "MatchPosterGroup cards", 5);

    const highlightHeader = page
      .locator(".tc_deck__header")
      .filter({ hasText: "Superliga-highlights" });
    const highlightCount = await highlightHeader.count();
    console.log(`\nSuperliga-highlights header count: ${highlightCount}`);

    if (highlightCount > 0) {
      const highlightDeck = highlightHeader.first().locator("xpath=ancestor::*[contains(@class,'tc_deck')][1]");
      const highlightLinks = highlightDeck.locator("a");
      await logFirstElements(highlightLinks, "Highlight deck links", 5);
    }

    const standingsRows = page.locator("[class*='deck-standings-match'] tr, [class*='deck-standings-match'] li");
    await logFirstElements(standingsRows, "Standings rows", 5);

    const brandingPlayButtons = page
      .locator(".tc_brandingdeck")
      .locator("a:has-text('TV 2 Play'), button:has-text('TV 2 Play'), [aria-label*='TV 2 Play']");
    await logFirstElements(brandingPlayButtons, "Branding deck TV 2 Play controls", 3);
  });

  test("Analyze handball tournament page (Bundesligaen)", async ({ page }) => {
    await page.goto("https://sport.tv2.dk/haandbold/bundesligaen", {
      waitUntil: "domcontentloaded",
    });
    await page.waitForLoadState("networkidle").catch(() => {});

    console.log("\n=== Handball Tournament (Bundesligaen) ===");
    console.log(`URL: ${page.url()}`);

    const keySections = [
      {
        name: "Team slider (tc_sport-team-navigation)",
        locator: page.locator(".tc_sport-team-navigation"),
      },
      {
        name: "Match cards deck (MatchPosterGroup)",
        locator: page.locator("[class*='MatchPosterGroup']"),
      },
      {
        name: "Highlight deck header (tc_deck__header)",
        locator: page.locator(".tc_deck__header"),
      },
      {
        name: "Standings deck (deck-standings-match)",
        locator: page.locator("[class*='deck-standings-match']"),
      },
      {
        name: "Branding deck (tc_brandingdeck)",
        locator: page.locator(".tc_brandingdeck"),
      },
    ];

    for (const section of keySections) {
      const count = await section.locator.count();
      console.log(`${section.name}: ${count > 0 ? "FOUND" : "NOT FOUND"} (${count})`);
    }

    const deckHeaders = page.locator(".tc_deck__header");
    await logFirstElements(deckHeaders, "Deck headers on handball page", 8);

    const mainArticles = page.locator("main article");
    await logFirstElements(mainArticles, "Main articles", 8);

    const allLinks = page.locator("main a[href]");
    const linkCount = await allLinks.count();
    console.log(`\nMain links total: ${linkCount}`);
    await logFirstElements(allLinks, "Sample links", 12);
  });

  test("Compare structural complexity signals", async ({ page }) => {
    const pages = [
      { name: "Football Superliga", url: "https://sport.tv2.dk/fodbold/superliga" },
      { name: "Handball Bundesligaen", url: "https://sport.tv2.dk/haandbold/bundesligaen" },
    ];

    console.log("\n=== Complexity Comparison ===");

    for (const target of pages) {
      await page.goto(target.url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle").catch(() => {});

      const metrics = {
        deckHeaders: await page.locator(".tc_deck__header").count(),
        sections: await page.locator("main section").count(),
        articles: await page.locator("main article").count(),
        links: await page.locator("main a[href]").count(),
        sportTeamNav: await page.locator(".tc_sport-team-navigation").count(),
        matchPosterGroups: await page.locator("[class*='MatchPosterGroup']").count(),
        standingsDeck: await page.locator("[class*='deck-standings-match']").count(),
        brandingDeck: await page.locator(".tc_brandingdeck").count(),
      };

      console.log(`\n${target.name}`);
      console.log(JSON.stringify(metrics, null, 2));
    }
  });
});