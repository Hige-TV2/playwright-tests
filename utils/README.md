# Utilities

Shared helpers that do not belong to a single page object.
This folder includes Playwright-aware assertion/navigation helpers and debug tooling.

## Files

- `test-helpers.js` - Reusable test functions for common assertions and visibility checks
- `page-navigation.js` - Centralized resilient navigation helpers (domcontentloaded + bounded retry)
- `debug/` - Debug utility specs for troubleshooting tests (see `debug/README.md`)
