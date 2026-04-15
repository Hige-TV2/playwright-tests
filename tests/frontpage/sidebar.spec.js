const { test, expect } = require("../../fixtures");
const { verifyExpandedSidebarSection } = require("../../utils/test-helpers");

const sidebarSectionCases = [
  {
    name: "Nyheder",
    section: "sectionNyheder",
    links: ["nyhederPolitik", "nyhederKrimi", "nyhederSamfund"],
  },
  {
    name: "Sport",
    section: "sectionSport",
    links: ["sportSendeplan", "sportLiveResultater", "sportTurneringer"],
  },
  {
    name: "Vejr",
    section: "sectionVejr",
    links: ["vejrUdsigt", "vejrRadar"],
  },
  {
    name: "TV",
    section: "sectionTV",
    links: ["tvGuide", "tvProgrammer", "tvKanaler"],
  },
  {
    name: "Livsstil",
    section: "sectionLivsstil",
    links: ["livsstilMad", "livsstilBolig"],
  },
  {
    name: "Underholdning",
    section: "sectionUnderholdning",
    links: [
      "underholdningKendte",
      "underholdningRoyale",
      "underholdningComedy",
    ],
  },
  {
    name: "Echo",
    section: "sectionEcho",
    links: ["echoKorteVideoer", "echoVideo"],
  },
];

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

  for (const sectionCase of sidebarSectionCases) {
    test(`${sectionCase.name} section expands and shows sub-links`, async ({
      frontPage,
    }) => {
      const subLinks = sectionCase.links.map((linkKey) => ({
        name: linkKey,
        locator: frontPage.sidebar[linkKey],
      }));

      await verifyExpandedSidebarSection(
        frontPage.sidebar,
        frontPage.sidebar[sectionCase.section],
        subLinks,
        sectionCase.name,
      );
    });
  }

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
