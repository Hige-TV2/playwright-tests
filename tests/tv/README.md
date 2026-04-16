# TV Test Workflow

This folder contains homepage-level coverage for tv.tv2.dk:

- `content.spec.js`
- `guide.spec.js`
- `play.spec.js`
- `navigation.spec.js`

## Scope

The suite validates:

1. TV page load and key sections.
2. TV guide and channel entry points.
3. Channel guide links structure.
4. TV 2 Play deck visibility and destination links.
5. Outbound click-through behavior for key links using soft assertions.
6. Dynamic content readiness using polling-based assertions.

## Stability Rules

- Prefer structural assertions over exact editorial text.
- Use `expect.poll()` for dynamic deck/link counts.
- Reuse `gotoWithRetry()` through the TV page object.
- Dismiss cookie banner before fragile link visibility checks.

## Recommended Run Commands

### TV Suite

```bash
npx playwright test tests/tv
```

### Single Spec

```bash
npx playwright test tests/tv/play.spec.js
```

### Headed Mode

```bash
npx playwright test tests/tv --headed
```
