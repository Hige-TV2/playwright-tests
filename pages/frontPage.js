const { Navigation } = require("./components/Navigation");

class FrontPage {
  constructor(page) {
    this.page = page;
    this.url = "https://tv2.dk";

    this.navigation = new Navigation(page);

    // Footer
    this.footerServicesHeading = page.getByRole("heading", {
      name: "Services",
    });
    this.footerPlay = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "TV 2 Play" });
    this.footerEtikHeading = page.getByRole("heading", { name: "Etik på TV" });
    this.footerEtikLink = page.getByRole("link", {
      name: "Etiske retningslinjer",
    });
    this.footerOmHeading = page.getByRole("heading", { name: "Om TV" });
    this.footerOmLink = page.getByRole("link", { name: "Information om TV" });
    this.footerKontaktHeading = page.getByRole("heading", {
      name: "Kontakt TV",
    });
    this.footerKontaktLink = page.getByRole("link", { name: "Kontakt TV" });
  }

  async navigate() {
    await this.page.goto(this.url);
  }
}

module.exports = { FrontPage };
