const { test, expect } = require("../../fixtures");

test.describe("Nyheder section navigation", () => {
  test("Section slider is present", async ({ nyhederPage }) => {
    await expect(nyhederPage.sectionNav.slider).toBeVisible();
  });

  test("No tab is marked as active by default on the root URL", async ({
    nyhederPage,
  }) => {
    const isActive = await nyhederPage.sectionNav.isActive(
      nyhederPage.sectionNav.tabSeneste,
    );
    expect(isActive).toBe(false);
  });

  test("Core section tabs are all visible", async ({ nyhederPage }) => {
    const tabs = [
      nyhederPage.sectionNav.tabSeneste,
      nyhederPage.sectionNav.tabPolitik,
      nyhederPage.sectionNav.tabKrimi,
      nyhederPage.sectionNav.tabSamfund,
      nyhederPage.sectionNav.tabUdland,
    ];
    for (const tab of tabs) {
      await expect(tab).toBeVisible();
    }
  });

  test.describe("Tab navigation", () => {
    test("All tabs navigate and become active", async ({
      nyhederPage,
      page,
    }) => {
      // Get all tab links from within the section slider
      const tabLinks = nyhederPage.sectionNav.slider.locator("a");
      const tabCount = await tabLinks.count();

      expect(tabCount).toBeGreaterThan(0);

      for (let i = 0; i < tabCount; i++) {
        const tabLink = tabLinks.nth(i);
        const tabHref = await tabLink.getAttribute("href");
        const tabText = await tabLink.textContent();

        // Only test links that point to nyheder.tv2.dk sections
        // and skip special tabs like "Valg 2026" that don't use aria-current
        if (
          !tabHref ||
          !tabHref.includes("nyheder.tv2.dk") ||
          tabText?.includes("Valg")
        ) {
          continue;
        }

        // Click the tab
        await tabLink.click();

        // Verify URL matches the href
        await expect(page).toHaveURL(tabHref);

        // Verify the tab is marked as active
        const isActive = await nyhederPage.sectionNav.isActive(tabLink);
        expect(isActive).toBe(true);
      }
    });
  });

  test.describe("Direct URL navigation", () => {
    test("Navigating directly to /seneste marks Seneste tab as active", async ({
      nyhederPage,
    }) => {
      await nyhederPage.navigateTo("seneste");
      const isActive = await nyhederPage.sectionNav.isActive(
        nyhederPage.sectionNav.tabSeneste,
      );
      expect(isActive).toBe(true);
    });

    test("Navigating directly to /politik marks Politik tab as active", async ({
      nyhederPage,
    }) => {
      await nyhederPage.navigateTo("politik");
      const isActive = await nyhederPage.sectionNav.isActive(
        nyhederPage.sectionNav.tabPolitik,
      );
      expect(isActive).toBe(true);
    });
  });
});
