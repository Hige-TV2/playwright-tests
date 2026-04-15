# Weather Test Workflow

This folder contains weather coverage for vejr.tv2.dk with resilient structural assertions:

- `main.spec.js`
- `forecast.spec.js`
- `radar.spec.js`
- `badevandstemperatur.spec.js`

## Scope

The suite currently validates:

1. Main weather page load and core regions.
2. Forecast page load and format-level weather data checks.
3. City coverage for Danish cities (København, Aarhus, Odense).
4. Radar page render readiness.
5. Badevandstemperatur subsection structural integrity.

## Stability Rules

- Prefer structure and visibility assertions over exact weather values.
- Use `expect.poll()` for dynamic lists/cards.
- Use domcontentloaded navigation and bounded retry via page objects.
- Scope weather search to the visible forecast searchbox in `main`.

## Recommended Run Commands

### Weather Suite

```bash
npx playwright test tests/weather
```

### Single Spec

```bash
npx playwright test tests/weather/badevandstemperatur.spec.js
```

### Headed Mode

```bash
npx playwright test tests/weather --headed
```
