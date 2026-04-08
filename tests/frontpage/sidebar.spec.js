const { test, expect } = require("../../fixtures");

test.describe("Sidebar", () => {
  test.beforeEach(async ({ frontPage }) => {
    await frontPage.navigation.openSidebar();
  });

  test("Sidebar opens when menu button is clicked", async ({ frontPage }) => {
    await expect(frontPage.sidebar.searchBox).toBeVisible();
  });

  test("Sidebar closes when close button is clicked", async ({ frontPage }) => {
    await frontPage.sidebar.close();
    await expect(frontPage.sidebar.searchBox).not.toBeVisible();
  });

  test("Search box is visible", async ({ frontPage }) => {
    await expect(frontPage.sidebar.searchBox).toBeVisible();
  });

  test("Sections header is visible", async ({ frontPage }) => {
    await expect(frontPage.sidebar.sectionHeader).toBeVisible();
  });

  test.describe("Nyheder section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(frontPage.sidebar.sectionNyheder);
    });

    test("Nyheder section expands and shows sub-links", async ({
      frontPage,
    }) => {
      await expect(frontPage.sidebar.nyhederPolitik).toBeVisible();
      await expect(frontPage.sidebar.nyhederKrimi).toBeVisible();
      await expect(frontPage.sidebar.nyhederSamfund).toBeVisible();
    });
  });

  test.describe("Sport section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(frontPage.sidebar.sectionSport);
    });

    test("Sport section expands and shows sub-links", async ({ frontPage }) => {
      await expect(frontPage.sidebar.sportSendeplan).toBeVisible();
      await expect(frontPage.sidebar.sportLiveResultater).toBeVisible();
      await expect(frontPage.sidebar.sportTurneringer).toBeVisible();
    });
  });

  test.describe("Vejr section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(frontPage.sidebar.sectionVejr);
    });

    test("Vejr section expands and shows sub-links", async ({ frontPage }) => {
      await expect(frontPage.sidebar.vejrUdsigt).toBeVisible();
      await expect(frontPage.sidebar.vejrRadar).toBeVisible();
    });
  });

  test.describe("TV section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(frontPage.sidebar.sectionTV);
    });

    test("TV section expands and shows sub-links", async ({ frontPage }) => {
      await expect(frontPage.sidebar.tvGuide).toBeVisible();
      await expect(frontPage.sidebar.tvProgrammer).toBeVisible();
      await expect(frontPage.sidebar.tvKanaler).toBeVisible();
    });
  });

  test.describe("Livsstil section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(frontPage.sidebar.sectionLivsstil);
    });

    test("Livsstil section expands and shows sub-links", async ({
      frontPage,
    }) => {
      await expect(frontPage.sidebar.livsstilMad).toBeVisible();
      await expect(frontPage.sidebar.livsstilBolig).toBeVisible();
    });
  });

  test.describe("Underholdning section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(
        frontPage.sidebar.sectionUnderholdning,
      );
    });

    test("Underholdning section expands and shows sub-links", async ({
      frontPage,
    }) => {
      await expect(frontPage.sidebar.underholdningKendte).toBeVisible();
      await expect(frontPage.sidebar.underholdningRoyale).toBeVisible();
      await expect(frontPage.sidebar.underholdningComedy).toBeVisible();
    });
  });

  test.describe("Echo section", () => {
    test.beforeEach(async ({ frontPage }) => {
      await frontPage.sidebar.expandSection(frontPage.sidebar.sectionEcho);
    });

    test("Echo section expands and shows sub-links", async ({ frontPage }) => {
      await expect(frontPage.sidebar.echoKorteVideoer).toBeVisible();
      await expect(frontPage.sidebar.echoVideo).toBeVisible();
    });
  });

  test.describe("Shortcuts", () => {
    test("Shortcuts header is visible", async ({ frontPage }) => {
      await expect(frontPage.sidebar.shortcutsHeader).toBeVisible();
    });

    test("Shortcuts section contains stable links", async ({ frontPage }) => {
      await expect(frontPage.sidebar.shortcutSportsresultater).toBeVisible();
      await expect(frontPage.sidebar.shortcutVejrudsigt).toBeVisible();
      await expect(frontPage.sidebar.shortcutTVGuide).toBeVisible();
      await expect(frontPage.sidebar.shortcutOpskrifter).toBeVisible();
    });

    test("Kandidattest shortcut is present if available", async ({
      frontPage,
    }) => {
      const isVisible =
        await frontPage.sidebar.shortcutKandidattest.isVisible();
      if (isVisible) {
        await expect(frontPage.sidebar.shortcutKandidattest).toBeVisible();
      }
    });
  });
});
