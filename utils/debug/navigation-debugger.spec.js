/**
 * Debug spec for testing navigation and state changes
 * Useful for understanding how elements behave during navigation and clicks
 *
 * Usage: npm test -- utils/debug/navigation-debugger.spec.js
 *
 * Customize the navigation paths and element checks based on your page
 */

const { test, expect } = require("../../fixtures");

test.describe("Debug: Navigation Debugger", () => {
  test("Trace navigation flow and element updates", async ({
    nyhederPage,
    page,
  }) => {
    console.log("\n=== Navigation Flow Debug ===\n");

    // Test 1: Click element and verify navigation
    console.log("Test 1: Click Seneste tab");
    const senesteTab = nyhederPage.sectionNav.tabSeneste;
    const senesteHref = await senesteTab.getAttribute("href");
    console.log(`  Href: ${senesteHref}`);

    await senesteTab.click();
    await page.waitForURL(senesteHref);
    console.log(`  Navigated to: ${page.url()}`);
    console.log(`  ✓ Navigation successful`);

    // Test 2: Check attribute after navigation
    console.log("\nTest 2: Check aria-current after navigation");
    const ariaCurrent = await senesteTab.getAttribute("aria-current");
    console.log(`  aria-current value: ${ariaCurrent}`);
    console.log(`  Expected 'true', got '${ariaCurrent}'`);
    console.log(`  ${ariaCurrent === "true" ? "✓" : "✗"} Attribute check`);

    // Test 3: Navigate to another tab
    console.log("\nTest 3: Click Politik tab");
    const politikTab = nyhederPage.sectionNav.tabPolitik;
    const politikHref = await politikTab.getAttribute("href");
    await politikTab.click();
    await page.waitForURL(politikHref);
    console.log(`  Navigated to: ${page.url()}`);

    // Check both states
    const senesteStateAfter = await senesteTab.getAttribute("aria-current");
    const politikState = await politikTab.getAttribute("aria-current");
    console.log(
      `  Seneste aria-current: ${senesteStateAfter} (should be 'false')`,
    );
    console.log(`  Politik aria-current: ${politikState} (should be 'true')`);
  });

  test("Debug slow/timing issues with navigation", async ({
    nyhederPage,
    page,
  }) => {
    console.log("\n=== Timing Debug ===\n");

    // Navigation without waiting
    console.log("1. Navigate to /seneste and check immediately:");
    const startTime = Date.now();
    await page.goto("https://nyheder.tv2.dk/seneste");
    const navigationTime = Date.now() - startTime;
    console.log(`   Navigation took: ${navigationTime}ms`);

    const senesteLink = page.getByRole("link", {
      name: "Seneste",
      exact: true,
    });
    let ariaCurrent = await senesteLink.getAttribute("aria-current");
    console.log(`   aria-current (immediate): ${ariaCurrent}`);

    // Wait for network idle and check again
    console.log("\n2. After waitForLoadState('networkidle'):");
    const waitStart = Date.now();
    await page.waitForLoadState("networkidle").catch(() => {});
    const waitTime = Date.now() - waitStart;
    console.log(`   Wait took: ${waitTime}ms`);

    ariaCurrent = await senesteLink.getAttribute("aria-current");
    console.log(`   aria-current (after wait): ${ariaCurrent}`);

    // Wait a bit more and check
    console.log("\n3. After additional 500ms wait:");
    await page.waitForTimeout(500);
    ariaCurrent = await senesteLink.getAttribute("aria-current");
    console.log(`   aria-current: ${ariaCurrent}`);
  });

  test("Debug element selector matching", async ({ page }) => {
    await page.goto("https://nyheder.tv2.dk");

    console.log("\n=== Selector Matching Debug ===\n");

    // Different ways to select "Seneste" link
    const selectors = [
      {
        get: () => page.getByRole("link", { name: "Seneste", exact: true }),
        name: 'getByRole("link", { name: "Seneste", exact: true })',
      },
      {
        get: () => page.locator('a:has-text("Seneste")'),
        name: "locator('a:has-text(\"Seneste\")')",
      },
      {
        get: () => page.locator('a[href*="/seneste"]'),
        name: "locator('a[href*=\"/seneste\"]')",
      },
      {
        get: () => page.locator("a.tc_header__local__nav__item__link"),
        name: "locator('a.tc_header__local__nav__item__link')",
      },
    ];

    for (const { get, name } of selectors) {
      const locator = get();
      const count = await locator.count();
      const text = count > 0 ? await locator.first().textContent() : "N/A";
      console.log(`${name}:\n  Found: ${count}, Text: "${text}"\n`);
    }
  });
});
