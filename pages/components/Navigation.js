class Navigation {
  constructor(page) {
    this.logo = page
      .getByLabel("Global top")
      .getByRole("link", { name: "Forsiden af tv2.dk" });
    this.navNyheder = page.getByRole("link", { name: "Nyheder", exact: true });
    this.navSport = page.getByRole("link", { name: "Sport", exact: true });
    this.navVejr = page.getByRole("link", { name: "Vejr", exact: true });
    this.navTV = page.getByRole("link", { name: "TV", exact: true });
    this.playButton = page
      .getByLabel("Global top")
      .getByRole("link", { name: "TV 2 Play" });
    this.loginButton = page.getByRole("button", { name: "Log ind" });
    this.menuButton = page.getByRole("button", { name: "Menu" });
  }

  async openSidebar() {
    await this.menuButton.click();
  }

  async openLoginMenu() {
    await this.loginButton.click();
  }
}

module.exports = { Navigation };
