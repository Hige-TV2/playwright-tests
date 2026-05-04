# Test Data

This folder is reserved for structured test data as the suite grows.
Use it for JSON/CSV fixtures, endpoint variants, locale strings, and other reusable inputs to avoid hardcoded values in specs.

## Suggested naming

- `*.data.json` for scenario datasets
- `*.users.json` for user profiles/roles
- `*.matrix.json` for combinational test cases

## Guidance

- Keep data deterministic and environment-safe.
- Do not store secrets or credentials.
- Prefer small, composable files over one large file.
