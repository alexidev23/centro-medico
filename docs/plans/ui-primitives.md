# Stage 2 — UI primitives

**Branch:** `feat/ui-primitives`
**Status:** implemented, pending review
**Depends on:** `feat/design-foundations` (merged in `206cabd`)

## Objective

Provide the four base components used by every later screen, styled with the Aurora
tokens from Stage 1. No new colors are introduced.

## Decisions

### Generated files do not count toward the scope limit

Files created verbatim by the shadcn CLI are excluded from the 150-200 line budget;
only hand-authored changes count. This is recorded in the repository `AGENTS.md`.

### `cn` helper

The `base-nova` registry imports `cn` from the official `cn` package
(`github.com/shadcn-ui/cn`), a compiled drop-in replacement for `clsx + tailwind-merge`.
It is kept as generated. `src/lib/utils.ts` remains untouched for future registry items.

### Preview page

`src/app/page.tsx` is replaced by a preview of the primitives so the stage can be
reviewed visually. This file is replaced by the real landing in a later stage.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/components/ui/button.tsx` | shadcn + Aurora variants |
| `frontend/src/components/ui/badge.tsx` | shadcn + clinical status variants + `BadgeDot` |
| `frontend/src/components/ui/card.tsx` | 12px radius, 1px border, 20px padding |
| `frontend/src/components/ui/input.tsx` | 48px height, 1.5px border, teal focus ring |
| `frontend/src/app/page.tsx` | Preview of the primitives |
| `frontend/src/app/globals.css` | `--placeholder` token (`#94A3B8`) |
| `frontend/package.json`, `pnpm-lock.yaml` | `cn` dependency |

## Specification

**Button** — radius 12px, height 48px (`default`) / 44px (`sm`):

- `primary`: `#0F766E` background, white text, hover `#115E59`
- `secondary`: white background, `1px #E2E8F0` border, teal text, hover `#F0FDFA` + teal border
- `ghost`: no border, teal text, 8px horizontal padding, hover `#F3F4F1`

**Badge** — pill, soft background, saturated text, `BadgeDot` uses the status dot color:

- `confirmed`: bg `#DCFCE7`, text `#15803D`, dot `#16A34A`
- `pending`: bg `#FEF3C7`, text `#B45309`, dot `#D97706`
- `cancelled`: bg `#FEE2E2`, text `#B91C1C`, dot `#DC2626`

**Card** — white, `1px #E2E8F0` border, 12px radius, 20px padding.

**Input** — height 48px, `1.5px #E2E8F0` border, 15px text, placeholder `#94A3B8`,
focus border `#0F766E` with a 3px ring at 15% opacity.

## Acceptance criteria

- `pnpm lint` exit 0.
- `pnpm build` exit 0.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`.
- Compiled CSS contains the status colors, `#94A3B8`, and a `.text-body-md` rule with
  `font-size:15px; line-height:24px; font-weight:400`.
- `pnpm dev` renders the four primitives on `/`.
