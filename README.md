# Playwright Test Suite

This project contains an automated test suite built with Playwright, a Node.js library for end-to-end testing of web applications.

## Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## Setup

1. Clone this repository to your local machine.

2. Navigate to the project directory:

   ```bash
   cd playwright-tests
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run All Tests

```bash
npx playwright test
```

### Run Tests in a Specific File

```bash
npx playwright test tests/frontpage/content.spec.js
```

### Run Tests in Headed Mode (with browser UI visible)

```bash
npx playwright test --headed
```

### Run Tests in a Specific Browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit


After running tests, generate and view the HTML report:

npx playwright show-report

```

npm install

````

## Running Tests

### All Tests

```bash
npx playwright test
````

### One File

```bash
npx playwright test tests/frontpage/content.spec.js
```

### Headed Mode

```bash
npx playwright test --headed
```

### One Browser Project

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### HTML Report

```bash
npx playwright show-report
```

### Debug Mode

```bash
npx playwright test --debug
```

## Configuration

The configuration is defined in `playwright.config.js` and includes:

- Test directory location (`./tests`)
- Browser projects (Chromium, Firefox, WebKit)
- Parallel execution settings
- Retry policies
- Reporting options

## Project Structure

- `tests/` - Test specification files (`.spec.js`)
- `pages/` - Page Object Model classes for front page, news, sport, and weather flows
- `pages/components/` - Reusable UI components (Navigation, Sidebar, Footer, LoginMenu, Content)
- `utils/` - Shared Playwright-aware helpers (assertion helpers, navigation retry helpers, debug specs)
- `data/` - Optional structured test data files
- `fixtures/` - Extended Playwright fixtures and storage state
- `playwright.config.js` - Playwright configuration
- `package.json` - Project dependencies and scripts

## Writing Tests

Example with the base Playwright runner:

```javascript
const { test, expect } = require("@playwright/test");

test("example test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

In this repository, most specs import from `fixtures/index.js` so they can use pre-configured page objects (`frontPage`, `nyhederPage`, `sportPage`, `weatherPage`).

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
