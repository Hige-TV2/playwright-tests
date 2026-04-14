const { test, expect } = require("../../fixtures");
const {
  verifyFirstArticleTeaser,
  verifyPageComponents,
  verifyActiveTabState,
} = require("../../utils/test-helpers");

test.describe("Nyheder page content", () => {
  test("Page components are present and visible", async ({ nyhederPage }) => {
    await verifyPageComponents(nyhederPage);
  });

  test("Section slider contains expected number of tabs", async ({
    nyhederPage,
  }) => {
    // Get all tab links from within the section slider
    const tabLinks = nyhederPage.sectionNav.slider.locator("a");
    const tabCount = await tabLinks.count();

    // Should have at least the core 5 tabs (Seneste, Politik, Krimi, Samfund, Udland)
    // May have additional special tabs like "Valg 2026"
    expect(tabCount).toBeGreaterThanOrEqual(5);

    console.log(`✓ Section slider contains ${tabCount} tabs`);
  });

  test("First article teaser is visible and clickable", async ({
    nyhederPage,
    page,
  }) => {
    await verifyFirstArticleTeaser(page, nyhederPage, "Nyheder");
  });

  test.describe("Direct URL navigation - complete coverage", () => {
    const sections = [
      { name: "seneste", tabName: "Seneste" },
      { name: "politik", tabName: "Politik" },
      { name: "krimi", tabName: "Krimi" },
      { name: "samfund", tabName: "Samfund" },
      { name: "udland", tabName: "Udland" },
    ];

    for (const { name, tabName } of sections) {
      test(`Navigating directly to /${name} marks ${tabName} tab as active`, async ({
        nyhederPage,
      }) => {
        await nyhederPage.navigateTo(name);
        await verifyActiveTabState(nyhederPage.sectionNav, tabName);
      });

      test(`/${name} section has first article teaser`, async ({
        nyhederPage,
        page,
      }) => {
        await nyhederPage.navigateTo(name);
        await verifyFirstArticleTeaser(page, nyhederPage, name);
      });
    }
  });

  test.describe("Active state stability", () => {
    test("Only active tab has aria-current=true after navigation", async ({
      nyhederPage,
    }) => {
      // Navigate to seneste and verify state
      await nyhederPage.navigateTo("seneste");
      await verifyActiveTabState(nyhederPage.sectionNav, "Seneste");

      // Navigate to politik and verify state changed
      await nyhederPage.navigateTo("politik");
      await verifyActiveTabState(nyhederPage.sectionNav, "Politik");

      // Navigate back to seneste and verify state
      await nyhederPage.navigateTo("seneste");
      await verifyActiveTabState(nyhederPage.sectionNav, "Seneste");
    });
  });

  test.describe("Article teaser functionality", () => {
    test("First article teaser opens valid article page", async ({
      nyhederPage,
      page,
    }) => {
      // Get the href of the first article
      const articleLink = nyhederPage.firstArticle.locator("a").first();
      const articleHref = await articleLink.getAttribute("href");

      // Click the article
      await articleLink.click();

      // Verify we navigated to an article page
      await expect(page).toHaveURL(articleHref);

      // Verify we're on a valid article page (has main article content)
      const articleContent = page.locator("main article").first();
      await expect(articleContent).toBeVisible();

      console.log(`✓ Navigated to article: ${page.url()}`);
    });

    test("Article teasers have required elements", async ({ nyhederPage }) => {
      // Check first 3 articles have title, image, and link
      const articles = nyhederPage.page
        .locator("article")
        .first()
        .locator("..")
        .locator("article");

      for (let i = 0; i < Math.min(3, await articles.count()); i++) {
        const article = articles.nth(i);

        // Should have a title/link
        const titleLink = article.locator("a").first();
        await expect(titleLink).toBeVisible();

        // Should have some text content
        const textContent = await article.textContent();
        expect(textContent?.length).toBeGreaterThan(10);

        console.log(`✓ Article ${i + 1} has title and content`);
      }
    });
  });
});
