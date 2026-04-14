const { Navigation } = require("./components/Navigation");
const { Sidebar } = require("./components/Sidebar");
const { Footer } = require("./components/Footer");
const { LoginMenu } = require("./components/LoginMenu");
const { Content } = require("./components/Content");

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

  async gotoWithRetry(url, maxAttempts = 2) {
    let lastError;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        return;
      } catch (error) {
        lastError = error;
        const message = String(error?.message || "");
        const isRetryable =
          message.includes("ERR_CONNECTION_TIMED_OUT") ||
          message.includes("ERR_ABORTED") ||
          message.includes("Test timeout") ||
          message.includes("Timeout");

        if (!isRetryable || attempt === maxAttempts) {
          throw error;
        }
      }
    }

    throw lastError;
  }

  async navigate() {
    await this.gotoWithRetry(this.url);
  }
}

module.exports = { FrontPage };
