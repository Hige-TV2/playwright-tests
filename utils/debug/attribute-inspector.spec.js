/**
 * Debug spec for inspecting element attributes and state
 * Useful for understanding what attributes are on elements and their values
 *
 * Usage: npm test -- utils/debug/attribute-inspector.spec.js
 *
 * Customize the locators and attributes you want to inspect
 */

const { test } = require("../../fixtures");

test.describe("Debug: Attribute Inspector", () => {
  test("Compare attributes across multiple elements", async ({ page }) => {
    await page.goto("https://nyheder.tv2.dk");

    // Define elements to inspect
    const tabNames = ["Seneste", "Politik", "Krimi", "Samfund", "Udland"];
    const attributesToCheck = [
      "aria-current",
      "aria-selected",
      "data-test",
      "class",
    ];

    console.log("\nAria attributes on section tabs:");
    console.log("-".repeat(60));

    for (const tabName of tabNames) {
      const link = page.getByRole("link", { name: tabName, exact: true });
      const count = await link.count();

      if (count > 0) {
        const attrs = {};
        for (const attr of attributesToCheck) {
          attrs[attr] = await link.getAttribute(attr);
        }
        console.log(
          `${tabName}: ${JSON.stringify(attrs, null, 2).split("\n").join("\n  ")}`,
        );
      } else {
        console.log(`${tabName}: NOT FOUND`);
      }
    }
  });

  test("Track attribute changes on navigation", async ({
    nyhederPage,
    page,
  }) => {
    // Start at root
    console.log("\n1. At root URL:");
    let senesteLink = page.getByRole("link", { name: "Seneste", exact: true });
    let ariaCurrent = await senesteLink.getAttribute("aria-current");
    console.log(`   Seneste aria-current: ${ariaCurrent}`);

    // Navigate to /seneste
    console.log("\n2. After navigating to /seneste:");
    await nyhederPage.navigateTo("seneste");
    senesteLink = page.getByRole("link", { name: "Seneste", exact: true });
    ariaCurrent = await senesteLink.getAttribute("aria-current");
    console.log(`   Seneste aria-current: ${ariaCurrent}`);

    // Navigate to /politik
    console.log("\n3. After navigating to /politik:");
    await nyhederPage.navigateTo("politik");
    const politikLink = page.getByRole("link", {
      name: "Politik",
      exact: true,
    });
    const politikAriaCurrent = await politikLink.getAttribute("aria-current");
    const senesteAfterPolitik = await senesteLink.getAttribute("aria-current");
    console.log(`   Seneste aria-current: ${senesteAfterPolitik}`);
    console.log(`   Politik aria-current: ${politikAriaCurrent}`);
  });

  test("Check element visibility and state", async ({ page }) => {
    await page.goto("https://nyheder.tv2.dk");

    // Check visibility of various elements
    const elements = [
      {
        selector: "nav.tc_header__local ol.tc_slider__list",
        name: "Section slider",
      },
      { selector: 'a[href*="/seneste"]', name: "Seneste link" },
      { selector: '[role="navigation"]', name: "Navigation elements" },
    ];

    console.log("\nElement visibility:");
    console.log("-".repeat(60));

    for (const { selector, name } of elements) {
      const locator = page.locator(selector);
      const count = await locator.count();
      const visible = await locator.isVisible().catch(() => false);
      const inViewport = await locator.isInViewport().catch(() => false);

      console.log(`${name}:`);
      console.log(`  Count: ${count}`);
      console.log(`  Visible: ${visible}`);
      console.log(`  In viewport: ${inViewport}`);
    }
  });
});
