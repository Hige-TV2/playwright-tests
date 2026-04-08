const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");

class FrontPage {
  constructor(page) {
    this.page = page;
    this.url = "https://tv2.dk";

    this.navigation = new Navigation(page);
    this.sidebar = new Sidebar(page);
    this.footer = new Footer(page);
    this.loginMenu = new LoginMenu(page);
  }

  async navigate() {
    await this.page.goto(this.url);
  }
}

module.exports = { FrontPage };
