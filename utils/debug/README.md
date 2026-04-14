# Debug Specs

Collection of debug utility specs for troubleshooting test issues, inspecting DOM elements, and analyzing attribute changes during navigation.

## Available Debug Specs

### 1. `selector-inspector.spec.js`

Helps you find and validate CSS selectors, role-based locators, and explore DOM structure.

**Use when:**

- You're unsure which selector will find an element
- You need to inspect element structure and class names
- You're trying to find parent/container elements

**Run:**

```bash
npm test -- utils/debug/selector-inspector.spec.js
```

**What it tests:**

- Counts elements matching various selectors
- Logs tag names, classes, and IDs
- Finds parent containers of specific elements

---

### 2. `attribute-inspector.spec.js`

Inspects and compares element attributes across multiple elements and navigation states.

**Use when:**

- Elements don't behave as expected (e.g., `aria-current` values wrong)
- You need to see all attributes on an element
- You're debugging state changes during navigation

**Run:**

```bash
npm test -- utils/debug/attribute-inspector.spec.js
```

**What it tests:**

- Compares attributes like `aria-current`, `aria-selected`, `class` on similar elements
- Tracks attribute changes as you navigate
- Checks element visibility and viewport status

---

### 3. `navigation-debugger.spec.js`

Traces navigation flow and analyzes timing issues.

**Use when:**

- Tests fail intermittently (timing issues)
- Elements don't update after navigation
- You need to understand navigation timing
- Selectors aren't matching as expected

**Run:**

```bash
npm test -- utils/debug/navigation-debugger.spec.js
```

**What it tests:**

- Tracks navigation flow and attribute updates step-by-step
- Measures timing of navigation and state changes
- Tests different selector approaches to find the right one

---

## Tips for Using

1. **Customize the specs**: These are templates. Modify the selectors, page URLs, and element names to match your page structure.

2. **Look at console output**: Most of these specs log detailed debug information. Run with:

   ```bash
   npm test -- utils/debug/selector-inspector.spec.js --reporter=list
   ```

3. **Run one spec at a time**: It's easier to read the output when not running all tests in parallel.

4. **Copy and modify**: Use these as a starting point for your own custom debug specs.

## Common Issues Fixed With These

- ✅ Finding the right CSS selectors
- ✅ Understanding why `aria-current`, `aria-selected` attributes aren't set
- ✅ Debugging navigation timing issues
- ✅ Identifying which elements match a locator
- ✅ Comparing element attributes across a page

## Example Output

When you run these specs, you'll see output like:

```
nav elements: found 7 elements
  First: <nav class="tc_header__local">

Found 1 "Seneste" links

All attributes of first "Seneste" link:
    href="https://nyheder.tv2.dk/seneste"
    class="tc_header__local__nav__item__link"
    aria-current="false"
```

Use this information to refine your selectors and understand element behavior.
