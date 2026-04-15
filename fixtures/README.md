# Test Fixtures

Custom Playwright test fixtures that extend the base test with reusable setup logic.
Fixtures provide pre-configured page objects and handle common test initialization tasks (e.g., cookie management, authentication).

## Files

- `index.js` - Main fixtures file exporting the extended test runner
- `storageState.json` - Saved session state for authenticated tests (cookies, localStorage, etc.)
