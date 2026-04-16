const { test: base } = require("@playwright/test");
const { FrontPage } = require("../pages/frontPage");
const { NyhederPage } = require("../pages/nyhederPage");
const { SportPage } = require("../pages/sportPage");
const { WeatherPage } = require("../pages/weatherPage");
const { TvPage } = require("../pages/tvPage");
const { dismissCookieBanner } = require("../utils/test-helpers");
const { expect } = require("@playwright/test");

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
    // Retry navigation on transient failures
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        await sportPage.navigate();
        break;
      } catch (error) {
        const msg = String(error?.message || "").toLowerCase();
        if (
          attempt === 2 ||
          (!msg.includes("timeout") && !msg.includes("chrome-error"))
        ) {
          throw error;
        }
      }
    }
    await dismissCookieBanner(page);
    await use(sportPage);
  },

  weatherPage: async ({ page }, use) => {
    const weatherPage = new WeatherPage(page);
    await weatherPage.navigate();
    await dismissCookieBanner(page);
    await use(weatherPage);
  },

  tvPage: async ({ page }, use) => {
    const tvPage = new TvPage(page);
    await tvPage.navigate();
    await dismissCookieBanner(page);
    await use(tvPage);
  },
});

module.exports = { test, expect };
