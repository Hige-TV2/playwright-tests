/**
 * Reusable test helpers for news pages
 */

const { expect } = require("@playwright/test");

/**
 * Verifies that the first article teaser is visible and clickable
 * @param {import('@playwright/test').Page} page - The page object
 * @param {Object} pageObject - The page object containing firstArticle locator
 * @param {string} sectionName - Name of the section for logging (optional)
 */
async function verifyFirstArticleTeaser(page, pageObject, sectionName = "") {
  const sectionLabel = sectionName ? ` (${sectionName})` : "";

  // Verify first article teaser is visible
  await expect(pageObject.firstArticle).toBeVisible();

  // Verify it has a clickable link
  const articleLink = pageObject.firstArticle.locator("a").first();
  await expect(articleLink).toBeVisible();

  // Verify the link has a valid href
  const href = await articleLink.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).toMatch(/^https?:\/\//);

  console.log(`✓ First article teaser visible and clickable${sectionLabel}`);
}

/**
 * Verifies that a page has the expected major components
 * @param {Object} pageObject - The page object with component locators
 */
async function verifyPageComponents(pageObject) {
  // Main content area
  await expect(pageObject.main).toBeVisible();

  // Navigation - check for logo or main nav elements
  await expect(pageObject.navigation.logo).toBeVisible();

  // Sidebar - check for menu button (sidebar can be opened)
  await expect(pageObject.navigation.menuButton).toBeVisible();

  // Footer - check for services heading
  await expect(pageObject.footer.servicesHeading).toBeVisible();

  // Login menu - check for login button
  await expect(pageObject.navigation.loginButton).toBeVisible();

  console.log("✓ All major page components are visible");
}

/**
 * Verifies that only one tab has aria-current="true" and others don't
 * @param {Object} sectionNav - The section navigation object
 * @param {string} expectedActiveTab - Name of the tab that should be active
 */
async function verifyActiveTabState(sectionNav, expectedActiveTab) {
  const tabs = [
    { name: "Seneste", locator: sectionNav.tabSeneste },
    { name: "Politik", locator: sectionNav.tabPolitik },
    { name: "Krimi", locator: sectionNav.tabKrimi },
    { name: "Samfund", locator: sectionNav.tabSamfund },
    { name: "Udland", locator: sectionNav.tabUdland },
  ];

  for (const tab of tabs) {
    const isActive = await sectionNav.isActive(tab.locator);
    if (tab.name === expectedActiveTab) {
      expect(isActive).toBe(true);
    } else {
      expect(isActive).toBe(false);
    }
  }

  console.log(`✓ Only "${expectedActiveTab}" tab is marked as active`);
}

module.exports = {
  verifyFirstArticleTeaser,
  verifyPageComponents,
  verifyActiveTabState,
};
