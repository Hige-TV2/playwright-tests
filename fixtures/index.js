const { test: base } = require("@playwright/test");
const { FrontPage } = require("../pages/frontPage");
const { expect } = require("@playwright/test");

const test = base.extend({
  frontPage: async ({ page }, use) => {
    const frontPage = new FrontPage(page);
    await frontPage.navigate();

    const cookieButton = page.getByRole("button", { name: "Acceptér alle" });
    try {
      await cookieButton.waitFor({ state: "visible", timeout: 10000 });
      await cookieButton.click();
      // Wait for the overlay to fully disappear before proceeding
      await page
        .locator(".onetrust-pc-dark-filter")
        .waitFor({ state: "hidden", timeout: 5000 });
    } catch {
      // Cookie popup did not appear, continue
    }

    await use(frontPage);
  },
});

module.exports = { test, expect };
