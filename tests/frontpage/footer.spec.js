const { test, expect } = require("../../fixtures");

test.describe("Footer", () => {
  test.describe("Services", () => {
    test("Services heading is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.servicesHeading).toBeVisible();
    });

    test("TV 2 Play link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.servicesPlay).toBeVisible();
    });

    test("Mit TV 2 link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.servicesMitTV).toBeVisible();
    });

    test("Apps link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.servicesApps).toBeVisible();
    });
  });

  test.describe("Etik på TV 2", () => {
    test("Etik heading is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikHeading).toBeVisible();
    });

    test("Etiske retningslinjer link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikRetningslinjer).toBeVisible();
    });

    test("Seernes redaktør link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikSeernes).toBeVisible();
    });

    test("Fejl og rettelser link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikFejl).toBeVisible();
    });

    test("TV 2 Privatlivspolitik link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikPrivatliv).toBeVisible();
    });

    test("Cookie-indstillinger button is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikCookies).toBeVisible();
    });

    test("Anmeld reklame link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.etikAnmeld).toBeVisible();
    });
  });

  test.describe("Om TV 2", () => {
    test("Om TV 2 heading is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.omHeading).toBeVisible();
    });

    test("Information om TV 2 link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.omInformation).toBeVisible();
    });

    test("Ledige stillinger link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.omLedige).toBeVisible();
    });

    test("Presse link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.omPresse).toBeVisible();
    });

    test("Publikum og deltagere link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.omPublikum).toBeVisible();
    });
  });

  test.describe("Kontakt TV 2", () => {
    test("Kontakt TV 2 heading is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.kontaktHeading).toBeVisible();
    });

    test("Tip os på 1234 link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.kontaktTip).toBeVisible();
    });

    test("Kontakt TV 2 link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.kontaktTV).toBeVisible();
    });

    test("Kundeservice link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.kontaktKundeservice).toBeVisible();
    });

    test("Annoncering link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.kontaktAnnoncering).toBeVisible();
    });

    test("Offentlig fremvisning link is visible", async ({ frontPage }) => {
      await expect(frontPage.footer.kontaktOffentlig).toBeVisible();
    });
  });
});
