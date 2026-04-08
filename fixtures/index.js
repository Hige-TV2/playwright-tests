const { test: base } = require("@playwright/test");
const { FrontPage } = require("../pages/frontPage");

const test = base.extend({
  frontPage: async ({ page }, use) => {
    const frontPage = new FrontPage(page);
    await frontPage.navigate();

    const cookieButton = page.getByRole("button", { name: "Acceptér alle" });
    try {
      await cookieButton.waitFor({ state: "visible", timeout: 5000 });
      await cookieButton.click();
    } catch {
      // Cookie popup did not appear, continue
    }

    await use(frontPage);
  },
});

const { expect } = require("@playwright/test");
module.exports = { test, expect };
