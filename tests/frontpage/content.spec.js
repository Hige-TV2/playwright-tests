const { test, expect } = require("../../fixtures");

test.describe("Frontpage content", () => {
  test.describe("Article teasers", () => {
    test("At least one article teaser is present", async ({ frontPage }) => {
      await expect(frontPage.content.firstArticle).toBeVisible();
    });

    test("First article teaser is clickable and navigates away", async ({
      frontPage,
      page,
    }) => {
      await frontPage.content.firstArticle.click();
      await expect(page).not.toHaveURL("https://tv2.dk");
    });
  });

  test.describe("Korte videoer deck", () => {
    test("Deck is present", async ({ frontPage }) => {
      await expect(frontPage.content.kortVideoerDeck).toBeVisible();
    });

    test("Reel list contains more than one item", async ({
      frontPage,
      page,
    }) => {
      await frontPage.content.kortVideoerDeck.scrollIntoViewIfNeeded();
      const items = frontPage.content.kortVideoerList.locator("li");
      await expect(items).toHaveCount(await items.count());
      expect(await items.count()).toBeGreaterThan(1);
    });
  });

  test.describe("Mest sete deck", () => {
    test("Deck is present", async ({ frontPage }) => {
      await frontPage.content.mestSeteDeck.scrollIntoViewIfNeeded();
      await expect(frontPage.content.mestSeteHeading).toBeVisible();
    });

    test("Deck contains more than one article", async ({ frontPage }) => {
      await frontPage.content.mestSeteDeck.scrollIntoViewIfNeeded();
      const articles =
        frontPage.content.mestSeteDeck.locator("article.tc_teaser");
      expect(await articles.count()).toBeGreaterThan(1);
    });
  });

  test.describe("TV 2 Anbefaler deck", () => {
    test("Deck is present", async ({ frontPage }) => {
      await frontPage.content.anbefalerDeck.scrollIntoViewIfNeeded();
      await expect(frontPage.content.anbefalerHeading).toBeVisible();
    });

    test("Deck contains more than one article", async ({ frontPage }) => {
      await frontPage.content.anbefalerDeck.scrollIntoViewIfNeeded();
      const articles =
        frontPage.content.anbefalerDeck.locator("article.tc_teaser");
      expect(await articles.count()).toBeGreaterThan(1);
    });
  });

  test.describe("TV 2 Play deck", () => {
    test("Deck is present", async ({ frontPage }) => {
      await frontPage.content.playDeck.scrollIntoViewIfNeeded();
      await expect(frontPage.content.playDeckLink).toBeVisible();
    });

    test("Deck contains more than one article", async ({ frontPage }) => {
      await frontPage.content.playDeck.scrollIntoViewIfNeeded();
      const articles = frontPage.content.playDeck.locator("article.tc_teaser");
      expect(await articles.count()).toBeGreaterThan(1);
    });

    test("Play deck articles link to play.tv2.dk", async ({ frontPage }) => {
      await frontPage.content.playDeck.scrollIntoViewIfNeeded();
      const firstLink = frontPage.content.playDeck
        .locator("article.tc_teaser a")
        .first();
      await expect(firstLink).toHaveAttribute("href", /play\.tv2\.dk/);
    });

    test("Gå til TV 2 Play button links to play.tv2.dk", async ({
      frontPage,
    }) => {
      await frontPage.content.playDeck.scrollIntoViewIfNeeded();
      await expect(frontPage.content.playDeckCTA).toHaveAttribute(
        "href",
        "https://play.tv2.dk",
      );
    });
  });

  test.describe("Regional deck", () => {
    test("Deck is present", async ({ frontPage }) => {
      await frontPage.content.regionalDeck.scrollIntoViewIfNeeded();
      await expect(frontPage.content.regionalHeading).toBeVisible();
    });

    test("Deck contains articles", async ({ frontPage }) => {
      await frontPage.content.regionalDeck.scrollIntoViewIfNeeded();
      const articles =
        frontPage.content.regionalDeck.locator("article.tc_teaser");
      expect(await articles.count()).toBeGreaterThan(0);
    });

    test("Vælg region button is present", async ({ frontPage }) => {
      await frontPage.content.regionalDeck.scrollIntoViewIfNeeded();
      await expect(frontPage.content.regionalVaelgRegion).toBeVisible();
    });
  });
});
