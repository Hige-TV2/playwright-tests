class Content {
  constructor(page) {
    // Article teasers
    this.firstArticle = page.getByRole("article").nth(1);

    // Korte videoer deck
    this.kortVideoerDeck = page.getByRole("region", { name: "Korte videoer" });
    this.kortVideoerList = page.getByRole("list", {
      name: "Liste af korte videoer",
    });

    // Mest sete deck
    this.mestSeteDeck = page.locator(
      'section[data-adobe-context="deck-most-read"]',
    );
    this.mestSeteHeading = page.getByRole("heading", { name: "Mest sete" });

    // TV 2 Anbefaler deck
    this.anbefalerDeck = page.locator(
      'section[data-adobe-context="deck-tv2-recommends"]',
    );
    this.anbefalerHeading = page.getByRole("heading", {
      name: "TV 2 Anbefaler",
    });

    // TV 2 Play deck
    this.playDeck = page.locator('section[data-adobe-context="deck-play"]');
    this.playDeckLink = page.getByRole("link", {
      name: "TV 2 Play Nyt indhold",
    });
    this.playDeckCTA = page.getByRole("link", { name: "Gå til TV 2 Play" });

    // Regional deck
    this.regionalDeck = page.getByRole("region", {
      name: "Nyheder fra TV 2 Kosmopol",
    });
    this.regionalHeading = page.getByRole("heading", {
      name: "Nyheder fra TV 2 Kosmopol",
    });
    this.regionalVaelgRegion = page.getByRole("button", {
      name: "Vælg region",
    });
  }
}

module.exports = { Content };
