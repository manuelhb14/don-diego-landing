# i18n Contract

This document defines the translation contract for the project.

## Principles

- Centralize all UI copy in `messages/es.json` and `messages/en.json`.
- Do not add inline locale conditionals for user-facing text.
- Treat current hardcoded UI copy as Spanish source of truth.
- Use semantic keys (never text-as-key).

## Namespace Taxonomy

- `common.*`: shared labels, buttons, statuses, errors, aria text
- `meta.*`: SEO metadata strings per route
- `pages.<route>.*`: page-level and section-level copy
- `components.<componentName>.*`: reusable component copy
- `api.*`: user-facing API and async operation messages

## Long-form Policy

- Keep long-form content in content files (blog/legal bodies).
- Keep UI chrome around long-form content in message files:
  - titles
  - labels
  - navigation copy
  - metadata

## Glossary Lock

Keep these terms exactly as currently used across locales unless explicitly changed by product/content review:

- `Organic Farm`
- `Wellness Center`
- `Club Residencial`
- `Presa de la Cantera`

## Implementation Rules

- Add keys in both locales in the same PR.
- Preserve key parity between locale files.
- Prefer `useTranslations` in client components and `getTranslations` in server contexts.
- Route pages under `app/[locale]/**` must not contain hardcoded user-facing strings.
