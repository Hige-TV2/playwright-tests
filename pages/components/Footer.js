class Footer {
  constructor(page) {
    // Services
    this.servicesHeading = page.getByRole("heading", { name: "Services" });
    this.servicesPlay = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "TV 2 Play" });
    this.servicesMitTV = page.getByRole("link", { name: "Mit TV 2" });
    this.servicesApps = page.getByRole("link", { name: "Apps" });

    // Etik
    this.etikHeading = page.getByRole("heading", { name: "Etik på TV 2" });
    this.etikRetningslinjer = page.getByRole("link", {
      name: "Etiske retningslinjer",
    });
    this.etikSeernes = page.getByRole("link", { name: "Seernes redaktør" });
    this.etikFejl = page.getByRole("link", { name: "Fejl og rettelser" });
    this.etikPrivatliv = page.getByRole("link", {
      name: "TV 2 Privatlivspolitik",
    });
    this.etikCookies = page.getByRole("button", {
      name: "Cookie-indstillinger",
    });
    this.etikAnmeld = page.getByRole("link", { name: "Anmeld reklame" });

    // Om TV 2
    this.omHeading = page.getByRole("heading", { name: "Om TV 2" });
    this.omInformation = page.getByRole("link", {
      name: "Information om TV 2",
    });
    this.omLedige = page.getByRole("link", { name: "Ledige stillinger" });
    this.omPresse = page.getByRole("link", { name: "Presse", exact: true });
    this.omPublikum = page.getByRole("link", {
      name: "Publikum og deltagere",
    });

    // Kontakt TV 2
    this.kontaktHeading = page.getByRole("heading", { name: "Kontakt TV 2" });
    this.kontaktTip = page.getByRole("link", { name: "Tip os på 1234" });
    this.kontaktTV = page.getByRole("link", { name: "Kontakt TV 2" });
    this.kontaktKundeservice = page.getByRole("link", {
      name: "Kundeservice",
    });
    this.kontaktAnnoncering = page.getByRole("link", {
      name: "Annoncering",
    });
    this.kontaktOffentlig = page.getByRole("link", {
      name: "Offentlig fremvisning",
    });
  }
}

module.exports = { Footer };
