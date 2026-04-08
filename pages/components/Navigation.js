class Navigation {
  constructor(page) {
    // Header navigation
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

    // Sidebar menu
    this.closeMenuButton = page.getByRole("button", { name: "Luk menu" });
    this.searchBox = page.getByRole("searchbox", { name: "Søg på tv2.dk" });
    this.sectionHeader = page.getByRole("heading", { name: "Sektioner" });
    this.sectionNyheder = page
      .getByRole("group", { name: "Nyheder sektion" })
      .locator("summary");
    this.sectionSport = page
      .getByRole("group", { name: "Sport sektion" })
      .locator("summary");
    this.shortcutsHeader = page.getByRole("heading", {
      name: "Genveje",
      exact: true,
    });
    this.shortcutKandidattest = page.getByRole("link", {
      name: "Tag kandidattesten",
    });
    this.shortcutSportsresultater = page.getByRole("link", {
      name: "Sportsresultater",
    });
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async closeMenu() {
    await this.closeMenuButton.click();
  }

  async expandSection(sectionLocator) {
    await sectionLocator.click();
  }
}

module.exports = { Navigation };
