const { test, expect } = require("../../fixtures");
const {
  verifyPageLoad,
  verifyVisibleItems,
} = require("../../utils/test-helpers");

test.describe("Sport page content", () => {
  test.describe.configure({ timeout: 60000 });

  test("Sport navigation links are present", async ({ sportPage }) => {
    await verifyVisibleItems(
      [
        { name: "Fodbold", locator: sportPage.fodboldLink },
        { name: "Håndbold", locator: sportPage.handboldLink },
        { name: "Cykling", locator: sportPage.cyklingLink },
        { name: "Badminton", locator: sportPage.badmintonLink },
        { name: "Tennis", locator: sportPage.tennisLink },
      ],
      "Sport navigation links",
    );
  });

  test("Sport links navigate to correct sections", async ({
    sportPage,
    page,
  }) => {
    // Test a few sport links
    const fodboldHref = await sportPage.fodboldLink.getAttribute("href");
    await sportPage.fodboldLink.click();
    await expect(page).toHaveURL(fodboldHref);

    await sportPage.navigate();

    const handboldHref = await sportPage.handboldLink.getAttribute("href");
    await sportPage.handboldLink.click();
    await expect(page).toHaveURL(handboldHref);

    console.log("✓ Sport category links navigate correctly");
  });

  test("Page has main content and loads correctly", async ({
    sportPage,
    page,
  }) => {
    await verifyPageLoad(
      page,
      sportPage.main,
      "https://sport.tv2.dk/",
      "Sport page",
    );
  });
});
