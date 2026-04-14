// @ts-check
const { test, expect } = require("@playwright/test");

test("Navigate", async ({ page, context }) => {
  await context.clearCookies();
  await page.goto("/");
});
