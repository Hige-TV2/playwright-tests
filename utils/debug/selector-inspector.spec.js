/**
 * Debug spec for inspecting selectors and DOM structure
 * Useful for finding the right CSS selectors or role-based locators
 *
 * Usage: npm test -- utils/debug/selector-inspector.spec.js
 *
 * Customize the selectors and element inspection based on your needs
 */

const { test } = require("../../fixtures");

test.describe("Debug: Selector Inspector", () => {
  test("Inspect selectors and element structure", async ({ page }) => {
    // Navigate to a page
    await page.goto("https://nyheder.tv2.dk");

    // Try different selectors and log results
    const selectors = [
      { selector: "nav", name: "nav elements" },
      {
        selector: "[class*='slider']",
        name: "elements with 'slider' in class",
      },
      { selector: "ol.tc_slider__list", name: "ol.tc_slider__list" },
      { selector: "ul.tc_slider__list", name: "ul.tc_slider__list" },
      { selector: "a[href*='nyheder']", name: "links to nyheder" },
    ];

    for (const { selector, name } of selectors) {
      const count = await page.locator(selector).count();
      console.log(`\n${name}: found ${count} elements`);

      if (count > 0) {
        const firstEl = page.locator(selector).first();
        const tagName = await firstEl.evaluate((el) => el.tagName);
        const className = await firstEl.getAttribute("class");
        const id = await firstEl.getAttribute("id");
        console.log(
          `  First: <${tagName}${id ? ` id="${id}"` : ""}${className ? ` class="${className}"` : ""}>`,
        );
      }
    }
  });

  test("Inspect attributes of specific elements", async ({ page }) => {
    await page.goto("https://nyheder.tv2.dk");

    // Find elements and log all their attributes
    const links = page.getByRole("link", { name: "Seneste", exact: true });
    const count = await links.count();
    console.log(`\nFound ${count} "Seneste" links`);

    if (count > 0) {
      const link = links.first();
      const attrs = await link.evaluate((el) => {
        return Array.from(el.attributes)
          .map((attr) => `${attr.name}="${attr.value}"`)
          .join("\n    ");
      });
      console.log(`\nAll attributes of first "Seneste" link:\n    ${attrs}`);
    }
  });

  test("Find container elements", async ({ page }) => {
    await page.goto("https://nyheder.tv2.dk");

    // Find elements that contain specific content
    const senesteLink = page.getByRole("link", {
      name: "Seneste",
      exact: true,
    });

    if ((await senesteLink.count()) > 0) {
      // Find parent containers
      const parents = [
        { selector: "li", name: "list item" },
        { selector: "nav", name: "nav" },
        { selector: "[class*='slider']", name: "slider container" },
      ];

      for (const { selector, name } of parents) {
        const parentCount = await senesteLink
          .locator(`xpath=ancestor::${selector}`)
          .count();
        console.log(
          `\nParent ${name}: ${parentCount > 0 ? "found" : "not found"}`,
        );
      }
    }
  });
});
