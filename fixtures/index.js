const { test: base } = require("@playwright/test");
const { FrontPage } = require("../pages/frontPage");

const test = base.extend({
  frontPage: async ({ page }, use) => {
    const frontPage = new FrontPage(page);
    await frontPage.navigate();

    const cookieButton = page.getByRole("button", { name: "Acceptér alle" });
    if (await cookieButton.isVisible()) {
      await cookieButton.click();
    }

    await use(frontPage);
  },
});

const { expect } = require("@playwright/test");
module.exports = { test, expect };
