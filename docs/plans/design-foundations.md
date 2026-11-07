# Stage 1 — Design foundations

**Branch:** `feat/design-foundations`
**Status:** implemented, pending review
**Depends on:** monorepo baseline `chore: initial monorepo`

## Objective

Turn the default shadcn/neutral theme into the Aurora design system so every later
screen is built with utilities (`bg-primary`, `text-on-surface`, `text-body-md`,
`rounded-lg`, `gap-gutter`) instead of hardcoded colors.

## Decisions

### Palette source of truth

`DESIGN.md` contains two conflicting palettes:

- YAML frontmatter (Material-3 export): `primary: #005c55`, `surface: #f9f9ff`
- Document body (hand-written spec): `primary: #0F766E`, `canvas: #FAFAF8`

The exported `code.html` files inherit the frontmatter values (`bg-primary` = `#005c55`)
but their own shadows use `rgba(15, 118, 110, ...)` = `#0F766E`, i.e. the body value.
The export is internally inconsistent, and its button hover (`bg-tertiary` = `#0c5b56`)
is nearly identical to `primary`, so the hover state is invisible.

**Decision:** the document body palette is the source of truth. Hover uses
`primary-dark` (`#115E59`) instead of the broken `tertiary` hover.

### Icons

Lucide, as configured in `components.json` (`iconLibrary: "lucide"`). The exported
HTML uses Material Symbols; icons are mapped to their Lucide equivalents per stage.

### UI components

All UI primitives come from shadcn/ui. If a component is not available locally, the
stage stops and the required component is requested from the owner instead of being
hand-rolled.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/app/globals.css` | Aurora tokens, type scale, radii, spacing | ~175 |
| `frontend/src/app/layout.tsx` | Plus Jakarta Sans, `lang="es-AR"`, metadata | ~20 |

No component files in this stage.

## Token map

| Role | Value |
| --- | --- |
| `--background` | `#FAFAF8` |
| `--foreground` | `#1E293B` |
| `--card` | `#FFFFFF` |
| `--primary` | `#0F766E` |
| `--primary-dark` | `#115E59` |
| `--primary-light` | `#CCFBF1` |
| `--primary-subtle` | `#F0FDFA` |
| `--secondary` / `--surface-subtle` | `#F3F4F1` |
| `--muted-foreground` | `#64748B` |
| `--border` | `#E5E7EB` |
| `--input` | `#E2E8F0` |
| `--ring` | `#0F766E` |
| `--radius` | `0.75rem` (12px) |
| confirmed | `#16A34A` / bg `#DCFCE7` / text `#15803D` |
| pending | `#D97706` / bg `#FEF3C7` / text `#B45309` |
| cancelled | `#DC2626` / bg `#FEE2E2` / text `#B91C1C` |

## Acceptance criteria

- `pnpm build` passes.
- `pnpm lint` is clean.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`,
  except the untouched Next.js boilerplate in `page.tsx` (`hover:bg-[#383838]`,
  `dark:*`), which is replaced in a later stage.
- `pnpm dev` renders text in Plus Jakarta Sans.

## Notes

- `next/font/google` downloads the font at build time; the first build needs network.
- The unused `.dark` token block was removed: the design is light-only, and keeping
  stale dark values would be misleading.
- Page content is untouched; the default `page.tsx` is replaced in a later stage.
