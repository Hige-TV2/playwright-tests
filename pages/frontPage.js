const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");
const { Content } = require("./components/Content");
const { gotoWithRetry } = require("../utils/page-navigation");

class FrontPage {
  constructor(page) {
    this.page = page;
    this.url = "https://tv2.dk";

    this.navigation = new Navigation(page);
    this.sidebar = new Sidebar(page);
    this.footer = new Footer(page);
    this.loginMenu = new LoginMenu(page);
    this.content = new Content(page);
  }

  async navigate() {
    await gotoWithRetry(this.page, this.url);
  }
}

module.exports = { FrontPage };
