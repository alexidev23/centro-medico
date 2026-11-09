# Fix — Specialties chip overflow at 320px

**Branch:** `fix/specialties-chip-overflow`
**Status:** implemented, pending review
**Depends on:** `main` at `aef6566`

## Objective

The landing rendered a horizontal scroll of 20px at 320px viewports. The cause was the
category chip of the Dermatología card: its label *"Clínica & Estética"* is the longest of
the six, the chip carried `shrink-0`, and the card header row could not wrap.

## Root cause

Measured with CDP at 320px (`Emulation.setDeviceMetricsOverride mobile:false`):

- Card content width: 241px (273px card minus `p-md` on both sides).
- Header row in one line needs `40` (icon) `+ 8 + 119.6` (single-word title
  *Dermatología*) `+ 8 + 133` (chip) `= 308.6px`.
- The chip was `shrink-0` and the title cannot break inside a word, so the row overflowed:
  the chip's right edge landed at `340.2px`, i.e. 20px past the viewport.

Only that one card overflowed; the other five chips are 65–88px wide and fit.

## Decision — let the header row wrap

The design exports (desktop and mobile) never constrain the chip and never specify a 320px
composition. A one-line header cannot hold `icon + title + chip` below ~373px, so the row
now wraps (`flex-wrap`): the chip drops to its own line, aligned with the icon, instead of
the card breaking the page. The chip keeps its intrinsic width and never truncates.

Rejected alternatives:

- Removing `shrink-0` so the chip shrinks: the title and the chip together still exceed the
  row by ~1px at 320px, and the pill would break its label across two lines.
- Shortening the chip copy: the label comes from the design.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/components/landing/specialties.tsx` | Header row of `SpecialtyCard` gains `flex-wrap` |
| `docs/plans/specialties-chip-overflow.md` | New — this plan |

One class on one element; no token, copy or composition change above `md`.

## Acceptance criteria

- `pnpm exec tsc --noEmit` exit 0.
- `pnpm lint` exit 0.
- `pnpm build` exit 0, `/` still prerenders as static.
- CDP probe at 320 / 360 / 375 / 390 / 414 with `mobile:false`: no element extends past the
  viewport and `documentElement.scrollWidth <= innerWidth`.
- CDP probe at 768 / 1024 / 1280 / 1440: no horizontal overflow (the chip is hidden from
  `md` up, so the row has a single child).
- Every chip stays inside its card (`chip.right <= card.right`); no chip label is clipped.

## Evidence

| Width | Before | After |
| --- | --- | --- |
| 320 | `scrollWidth 340`, chip right `340.2` (outside card `289`) | `scrollWidth 316`, chip right `164.6` (own line) |
| 360 | overflowed (inferred: row needs `308.6` > `281` content) | no overflow, chip own line |
| 375 | no overflow | no overflow, chip own line |
| 390–1440 | no overflow | no overflow, chip on the title row |
