/**
 * Reusable test helpers for news pages
 */

const { expect } = require("@playwright/test");

/**
 * Dismisses the OneTrust consent popup if it appears.
 * Safe to call on tv2 domains and no-ops when popup is absent.
 * @param {import('@playwright/test').Page} page
 */
async function dismissCookieBanner(page) {
  const cookieButton = page.getByRole("button", { name: "Acceptér alle" });
  try {
    await cookieButton.waitFor({ state: "visible", timeout: 10000 });
    await cookieButton.click();
    await page
      .locator(".onetrust-pc-dark-filter")
      .waitFor({ state: "hidden", timeout: 5000 });
  } catch {
    // Cookie popup did not appear, continue
  }
}

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

/**
 * Verifies a list of locators are all visible.
 * @param {{name: string, locator: import('@playwright/test').Locator}[]} items
 * @param {string} label
 */
async function verifyVisibleItems(items, label = "items") {
  for (const item of items) {
    await expect(item.locator).toBeVisible();
  }
  console.log(`✓ ${label} are visible`);
}

/**
 * Expands a sidebar section and verifies all expected sub-links are visible.
 * @param {Object} sidebar
 * @param {import('@playwright/test').Locator} sectionLocator
 * @param {{name: string, locator: import('@playwright/test').Locator}[]} subLinks
 * @param {string} sectionName
 */
async function verifyExpandedSidebarSection(
  sidebar,
  sectionLocator,
  subLinks,
  sectionName,
) {
  await sidebar.expandSection(sectionLocator);
  await verifyVisibleItems(subLinks, `${sectionName} sub-links`);
}

/**
 * Verifies links have non-empty absolute URLs.
 * @param {import('@playwright/test').Locator} links
 * @param {number} maxToCheck
 */
async function verifyLinkHrefs(links, maxToCheck = 5) {
  const linkCount = await links.count();
  for (let i = 0; i < Math.min(linkCount, maxToCheck); i++) {
    const href = await links.nth(i).getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toMatch(/^https?:\/\//);
  }
  console.log(
    `✓ Checked valid href on ${Math.min(linkCount, maxToCheck)} links`,
  );
}

/**
 * Verifies a page has visible main content and the expected URL.
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} mainLocator
 * @param {string|RegExp} expectedUrl
 * @param {string} pageName
 */
async function verifyPageLoad(
  page,
  mainLocator,
  expectedUrl,
  pageName = "Page",
) {
  await expect(mainLocator).toBeVisible();
  await expect(page).toHaveURL(expectedUrl);
  console.log(`✓ ${pageName} loads correctly`);
}

module.exports = {
  dismissCookieBanner,
  verifyFirstArticleTeaser,
  verifyPageComponents,
  verifyActiveTabState,
  verifyVisibleItems,
  verifyExpandedSidebarSection,
  verifyLinkHrefs,
  verifyPageLoad,
};
