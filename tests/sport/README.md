# Sport Test Workflow

This folder contains stable test specs for the Sport section pages:

- `sport.spec.js`
- `schedule.spec.js`
- `live-scores.spec.js`
- `tournaments.spec.js`

## Sport Debug Spec

The dedicated debug spec for Sport is:

- `utils/debug/sport-debug.spec.js`

Run it with:

```bash
npx playwright test utils/debug/sport-debug.spec.js --project=chromium --workers=1
```

This debug spec is meant for selector discovery and structure analysis. It logs counts and sample content to help you build resilient locators.

## Repeatable Selector Discovery Workflow

1. Run `utils/debug/sport-debug.spec.js` against the target URL.
2. Capture section anchors first (`#main`, `h2` labels, tabs) before deep selectors.
3. Prefer scoped locators like `page.locator("#main").getByRole(...)`.
4. Validate strictness with `.count()` and ensure expected unique matches.
5. Promote successful selectors into the relevant page object in `pages/`.
6. Add assertions in the corresponding spec under `tests/sport/`.
7. Re-run only the affected spec file, then run all Sport specs.

## Recommended Run Order

```bash
npx playwright test utils/debug/sport-debug.spec.js --project=chromium --workers=1
npx playwright test tests/sport/sport.spec.js
npx playwright test tests/sport/schedule.spec.js
npx playwright test tests/sport/live-scores.spec.js
npx playwright test tests/sport/tournaments.spec.js
```

## Notes

- Cookie overlays can reappear; call `dismissCookieBanner(page)` before clicks on fragile pages.
- Sport content is dynamic; avoid assertions that require specific event titles or fixed counts.
- Favor structural assertions (visibility, valid hrefs, navigation behavior) over content snapshots.
