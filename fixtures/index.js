const { test: base } = require("@playwright/test");
const { FrontPage } = require("../pages/frontPage");
const { NyhederPage } = require("../pages/nyhederPage");
const { SportPage } = require("../pages/sportPage");
const { expect } = require("@playwright/test");

/**
 * Dismisses the OneTrust consent popup if it appears.
 * Safe to call on any tv2 domain — silently continues if the popup is absent.
 * @param {import('@playwright/test').Page} page
 */
async function dismissCookieBanner(page) {
  const cookieButton = page.getByRole("button", { name: "Acceptér alle" });
  try {
    await cookieButton.waitFor({ state: "visible", timeout: 10000 });
    await cookieButton.click();
    await page
      .locator(".onetrust-pc-dark-filter")
      .waitFor({ state: "hidden", timeout: 5000 });
  } catch {
    // Cookie popup did not appear, continue
  }
}

const test = base.extend({
  frontPage: async ({ page }, use) => {
    const frontPage = new FrontPage(page);
    await frontPage.navigate();
    await dismissCookieBanner(page);
    await use(frontPage);
  },

  nyhederPage: async ({ page }, use) => {
    const nyhederPage = new NyhederPage(page);
    await nyhederPage.navigate();
    await dismissCookieBanner(page);
    await use(nyhederPage);
  },

  sportPage: async ({ page }, use) => {
    const sportPage = new SportPage(page);
    await sportPage.navigate();
    await dismissCookieBanner(page);
    await use(sportPage);
  },
});

module.exports = { test, expect };
