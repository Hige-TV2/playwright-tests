const { test } = require("../../fixtures");
/**
 * Debug spec for inspecting sport section pages
 * Useful for finding selectors and understanding page structure
 * Usage: npm test -- utils/debug/sport-debug.spec.js
 */

test.describe("Debug: Sport Section Analysis", () => {
  test("Analyze main sport page structure", async ({ page }) => {
    await page.goto("https://sport.tv2.dk/");

    console.log("\n=== Main Sport Page Structure ===\n");

    // Check main sections
    const sections = [
      {
        selector: "h2:has-text('Korte videoer')",
        name: "Short videos section",
      },
      {
        selector: "h2:has-text('Superliga-highlights')",
        name: "Superliga highlights",
      },
      { selector: "h2:has-text('Mest sete sport')", name: "Most viewed sport" },
      { selector: "h2:has-text('Seneste Sport')", name: "Latest sport" },
      { selector: "h2:has-text('TV 2 Play')", name: "TV 2 Play section" },
    ];

    for (const { selector, name } of sections) {
      const count = await page.locator(selector).count();
      console.log(`${name}: ${count > 0 ? "FOUND" : "NOT FOUND"}`);
    }

    // Check navigation links
    const navLinks = [
      "Fodbold",
      "Håndbold",
      "Cykling",
      "Badminton",
      "NFL",
      "Tennis",
    ];

    console.log("\nNavigation links:");
    for (const linkText of navLinks) {
      const link = page.getByRole("link", { name: linkText, exact: true });
      const count = await link.count();
      console.log(`  ${linkText}: ${count} link(s)`);
    }

    // Check sub-page links
    const subPages = [
      { text: "Sendeplan", href: "/sendeplan" },
      { text: "Live og resultater", href: "/livescore-og-resultater" },
      { text: "Turneringer", href: "/turneringer" },
    ];

    console.log("\nSub-page links:");
    for (const { text, href } of subPages) {
      const link = page.locator(`a[href*="${href}"]`);
      const count = await link.count();
      console.log(`  ${text}: ${count} link(s)`);
    }
  });

  test("Analyze schedule page structure", async ({ page }) => {
    await page.goto("https://sport.tv2.dk/sendeplan");

    console.log("\n=== Schedule Page Structure ===\n");

    // Check day sections
    const daySelectors = [
      "h3:has-text('I dag')",
      "h3:has-text('I morgen')",
      "h3:has-text('Torsdag')",
    ];

    console.log("Day sections:");
    for (const selector of daySelectors) {
      const count = await page.locator(selector).count();
      console.log(`  ${selector}: ${count > 0 ? "FOUND" : "NOT FOUND"}`);
    }

    // Check for events
    const events = page.locator("article, .tc_event, [class*='event']");
    const eventCount = await events.count();
    console.log(`\nTotal events found: ${eventCount}`);

    if (eventCount > 0) {
      // Analyze first event structure
      const firstEvent = events.first();
      const eventText = await firstEvent.textContent();
      console.log(`\nFirst event content:\n${eventText?.substring(0, 200)}...`);

      // Check for common elements in events
      const timePattern = await firstEvent
        .locator("text=/\\d{1,2}:\\d{2}/")
        .count();
      const kanalLinks = await firstEvent.locator("text=Kanal").count();
      const liveLinks = await firstEvent.locator("text=Se live").count();

      console.log(`\nEvent analysis:`);
      console.log(`  Time patterns: ${timePattern}`);
      console.log(`  "Kanal" links: ${kanalLinks}`);
      console.log(`  "Se live" links: ${liveLinks}`);
    }
  });

  test("Analyze live scores page structure", async ({ page }) => {
    await page.goto("https://sport.tv2.dk/livescore-og-resultater");

    console.log("\n=== Live Scores Page Structure ===\n");

    // Check sport categories
    const sports = ["Fodbold", "Håndbold", "Cykling"];
    console.log("Sport categories:");
    for (const sport of sports) {
      const link = page.getByRole("link", { name: sport, exact: true });
      const count = await link.count();
      console.log(`  ${sport}: ${count} link(s)`);
    }

    // Check date navigation
    const dateLinks = page.locator("a[href*='/livescore-og-resultater/2026-']");
    const dateCount = await dateLinks.count();
    console.log(`\nDate navigation links: ${dateCount}`);

    // Check for match listings
    const matches = page.locator("[class*='match'], [class*='game'], article");
    const matchCount = await matches.count();
    console.log(`Match/game elements: ${matchCount}`);

    if (matchCount > 0) {
      const firstMatch = matches.first();
      const matchText = await firstMatch.textContent();
      console.log(`\nFirst match content:\n${matchText?.substring(0, 150)}...`);
    }
  });

  test("Analyze tournaments page structure", async ({ page }) => {
    await page.goto("https://sport.tv2.dk/turneringer");

    console.log("\n=== Tournaments Page Structure ===\n");

    // Check sport categories
    const sports = ["Fodbold", "Håndbold"];
    console.log("Sport categories:");
    for (const sport of sports) {
      const heading = page.locator(`text=${sport}`);
      const count = await heading.count();
      console.log(`  ${sport}: ${count > 0 ? "FOUND" : "NOT FOUND"}`);
    }

    // Check tournament links
    const tournamentLinks = page.locator(
      "a[href*='/fodbold/'], a[href*='/haandbold/']",
    );
    const linkCount = await tournamentLinks.count();
    console.log(`\nTournament links: ${linkCount}`);

    if (linkCount > 0) {
      // Get first few tournament names
      console.log("\nSample tournament links:");
      for (let i = 0; i < Math.min(5, linkCount); i++) {
        const link = tournamentLinks.nth(i);
        const text = await link.textContent();
        const href = await link.getAttribute("href");
        console.log(`  ${text?.trim()}: ${href}`);
      }
    }
  });
});
