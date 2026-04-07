# Playwright Test Suite

This project contains an automated test suite built with Playwright, a Node.js library for end-to-end testing of web applications.

## Prerequisites

- Node.js (version 14 or higher)
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
npx playwright test tests/example.spec.js
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
```

### Generate and View Test Report

After running tests, generate and view the HTML report:

```bash
npx playwright show-report
```

### Debug Tests

Run tests in debug mode:

```bash
npx playwright test --debug
```

## Configuration

The test configuration is defined in `playwright.config.js`. This file includes:

- Test directory location (`./tests`)
- Browser configurations (Chromium, Firefox, WebKit)
- Parallel execution settings
- Retry policies
- Reporting options

## Project Structure

- `tests/` - Test specification files (`.spec.js`)
- `pages/` - Page Object Model classes for reusable page components
- `utils/` - Utility functions and helpers
- `data/` - Test data files
- `playwright.config.js` - Playwright configuration
- `package.json` - Project dependencies and scripts

## Writing Tests

Tests are written using Playwright's test runner. Example:

```javascript
import { test, expect } from "@playwright/test";

test("example test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
