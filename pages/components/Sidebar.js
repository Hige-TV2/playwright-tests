class Sidebar {
  constructor(page) {
    this.closeButton = page.getByRole("button", { name: "Luk menu" });
    this.searchBox = page.getByRole("searchbox", {
      name: /Indtast søgeord|Søg på tv2\.dk/i,
    });

    // Section headers
    this.sectionHeader = page.getByRole("heading", { name: "Sektioner" });

    // Nyheder
    this.sectionNyheder = page
      .getByRole("group", { name: "Nyheder sektion" })
      .locator("summary");
    this.nyhederLink = page
      .getByLabel("Nyheder sektion")
      .getByRole("link", { name: "Nyheder" });
    this.nyhederPolitik = page
      .getByLabel("Nyheder sektion")
      .getByRole("link", { name: "Politik", exact: true });
    this.nyhederKrimi = page
      .getByLabel("Nyheder sektion")
      .getByRole("link", { name: "Krimi" });
    this.nyhederSamfund = page
      .getByLabel("Nyheder sektion")
      .getByRole("link", { name: "Samfund" });

    // Sport
    this.sectionSport = page
      .getByRole("group", { name: "Sport sektion" })
      .locator("summary");
    this.sportLink = page
      .getByLabel("Sport sektion")
      .getByRole("link", { name: "Sport" });
    this.sportSendeplan = page.getByRole("link", { name: "Sendeplan" });
    this.sportLiveResultater = page.getByRole("link", {
      name: "Live og resultater",
    });
    this.sportTurneringer = page.getByRole("link", { name: "Turneringer" });

    // Vejr
    this.sectionVejr = page
      .getByRole("group", { name: "Vejr sektion" })
      .locator("summary");
    this.vejrLink = page
      .getByLabel("Vejr sektion")
      .getByRole("link", { name: "Vejr", exact: true });
    this.vejrSeneste = page.getByRole("link", { name: "Seneste", exact: true });
    this.vejrUdsigt = page
      .getByLabel("Vejr sektion")
      .getByRole("link", { name: "Vejrudsigt" });
    this.vejrRadar = page.getByRole("link", { name: "Radar" });

    // TV
    this.sectionTV = page
      .getByRole("group", { name: "TV sektion" })
      .locator("summary");
    this.tvLink = page
      .getByLabel("TV sektion")
      .getByRole("link", { name: "TV", exact: true });
    this.tvGuide = page
      .getByLabel("TV sektion")
      .getByRole("link", { name: "TV-guide" });
    this.tvProgrammer = page.getByRole("link", { name: "Programmer" });
    this.tvKanaler = page.getByRole("link", { name: "Kanaler" });

    // Livsstil
    this.sectionLivsstil = page
      .getByRole("group", { name: "Livsstil sektion" })
      .locator("summary");
    this.livsstilLink = page.getByRole("link", { name: "Livsstil" });
    this.livsstilKorteVideoer = page
      .getByLabel("Livsstil sektion")
      .getByRole("link", { name: "Korte videoer" });
    this.livsstilMad = page.getByRole("link", { name: "Mad", exact: true });
    this.livsstilBolig = page.getByRole("link", { name: "Bolig", exact: true });

    // Underholdning
    this.sectionUnderholdning = page
      .locator("summary")
      .filter({ hasText: "Underholdning" });
    this.underholdningLink = page.getByRole("link", {
      name: "Underholdning",
    });
    this.underholdningKendte = page.getByRole("link", {
      name: "Kendte",
      exact: true,
    });
    this.underholdningRoyale = page.getByRole("link", { name: "Royale" });
    this.underholdningComedy = page.getByRole("link", { name: "Comedy" });

    // Echo
    this.sectionEcho = page.locator("summary").filter({ hasText: "Echo" });
    this.echoLink = page.getByRole("link", { name: "Echo" });
    this.echoKorteVideoer = page
      .getByLabel("Echo sektion")
      .getByRole("link", { name: "Korte videoer" });
    this.echoSeneste = page.getByRole("link", { name: "Seneste", exact: true });
    this.echoVideo = page.getByRole("link", { name: "Video", exact: true });

    // Shortcuts
    // Shortcuts
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
    this.shortcutVejrudsigt = page.getByRole("link", { name: "Vejrudsigt" });
    this.shortcutTVGuide = page.getByRole("link", { name: "TV-guide" });
    this.shortcutOpskrifter = page.getByRole("link", { name: "Opskrifter" });
  }

  async close() {
    await this.closeButton.click();
  }

  async expandSection(sectionLocator) {
    await sectionLocator.click();
  }
}

module.exports = { Sidebar };
