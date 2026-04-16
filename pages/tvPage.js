const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");
const { gotoWithRetry } = require("../utils/page-navigation");

class TvPage {
  constructor(page) {
    this.page = page;
    this.url = "https://tv.tv2.dk";

    this.navigation = new Navigation(page);
    this.sidebar = new Sidebar(page);
    this.footer = new Footer(page);
    this.loginMenu = new LoginMenu(page);

    this.main = page.locator("main");

    this.playHeadingLink = page.getByRole("link", {
      name: /TV 2 Play Nyt indhold/i,
    });
    this.playDeckCTA = page
      .getByRole("link", { name: /Gå til TV 2 Play|Få adgang/i })
      .first();
    this.playDomainLinks = this.main.locator("a[href*='play.tv2.dk']");

    this.tvGuideHeading = this.main.getByRole("heading", {
      name: /Se programmet for TV 2s kanaler i denne guide/i,
    });
    this.tvGuideLink = page.getByRole("link", {
      name: "TV-guide",
      exact: true,
    });
    this.channelsLink = page.getByRole("link", {
      name: "Kanaler",
      exact: true,
    });

    this.channelGuideLinks = this.main.locator(
      "a[href*='tvtid.tv2.dk/kanal/']",
    );

    this.tv2LigeNuLink = page.getByRole("link", {
      name: "TV 2 lige nu",
      exact: true,
    });
    this.tv2LigeNuLinks = this.main.locator("a[href*='nyheder.tv2.dk/live/']");
  }

  async navigate(path = "") {
    await gotoWithRetry(this.page, `${this.url}${path}`);
  }
}

module.exports = { TvPage };
