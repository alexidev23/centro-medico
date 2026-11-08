# Correction C4 - Desktop indicators and coverage

**Branch:** `fix/desktop-stats`
**Status:** implemented, pending review
**Depends on:** `main` at `c8def6d`
**Origin:** desktop-fidelity audit of the landing. Stage 4 rendered the indicators as three
bare tiles with no descriptions, and the coverage mention that both exports contain was never
built.

## Objective

Give the indicators and the coverage the desktop composition from
`landing_escritorio_centro_m_dico_aurora/code.html` (section 2) and the mobile composition from
`landing_m_vil_centro_m_dico_aurora/code.html` (franja + coberturas).

## Decisions

### Desktop card, mobile band

From `lg` the three indicators sit in one white card: number on `display`, title on `title-md`
and a description on `body-sm`, with the coverage strip inside the same card at the bottom.
Below `lg` the current three compact tiles stay untouched, and the coverage section from the
mobile export is added below them: kicker, title, lead and the OSDE / Swiss Medical / APROSS /
Particular chips.

The `surface-subtle` band keeps wrapping only the compact tiles, as in the mobile export; the
coverage section sits on the page background.

### One data set

The exports disagree: the desktop says 6 doctors, the mobile says 28, and the grid has exactly
6 professionals. The single data set is `12+`, `6`, `+45k` with the desktop labels. This
corrects the mobile tile from 28 to 6 and the label to "Médicos y especialistas".

Coverage copy is taken verbatim from the exports.

### Geometry

The exports use `rounded-xl` (0.75rem); the project's equivalent is `rounded-lg`. The desktop
card uses `p-xl`, the coverage strip `p-md`, and the chips `py-2.5`.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/landing/stats-strip.tsx` | Desktop card, coverage strip, mobile coverage section | ~125 |
| `docs/plans/stats-desktop.md` | This plan | - |

## Specification

**Mobile band** - `bg-surface-subtle py-md lg:hidden`; inner `mx-auto grid w-full max-w-page
grid-cols-3 gap-xs px-gutter-mobile md:gap-md md:px-gutter`; tile `flex flex-col items-center
rounded-lg bg-card p-sm text-center shadow-card` with value `text-headline-sm font-bold
text-primary` and label `text-label-sm leading-tight text-fg-secondary`.

**Section** - `mx-auto w-full max-w-page px-gutter-mobile pt-lg pb-lg md:px-gutter lg:py-lg`.

**Desktop card** - `hidden rounded-lg bg-card p-xl shadow-card lg:block`.

- Grid `grid-cols-3 gap-lg`; each item `flex flex-col gap-xs` with `text-display
  tracking-tight text-primary`, `text-title-md text-foreground` and `text-body-sm
  text-fg-secondary`.
- Strip `mt-xl flex items-center justify-between gap-sm rounded-lg bg-surface-subtle p-md`: a
  `ShieldCheck` at `size-6 text-primary`, `text-label-lg` for the accepted plans and
  `text-body-sm text-fg-secondary` for the billing note.

**Mobile coverage** - `flex flex-col gap-md lg:hidden`.

- Header: `text-label-sm font-semibold uppercase tracking-wider text-primary`,
  `text-title-md font-bold text-foreground`, `text-body-sm text-fg-secondary`.
- Chips: `flex flex-wrap gap-xs`; each `flex items-center gap-1.5 rounded-lg bg-card px-md py-2.5
  text-label-md text-foreground shadow-card` with a `size-2` primary dot; the Particular chip
  uses `bg-surface-subtle text-primary font-semibold` and a `CreditCard` icon.

## Acceptance criteria

- `pnpm lint` exit 0 and `pnpm build` exit 0.
- 390px and 768px: three compact tiles with 12+ / 6 / +45k, coverage heading and four chips; no
  horizontal overflow.
- 1024px and 1280px: white card with the three descriptions and the coverage strip; compact
  tiles and chips hidden; no horizontal overflow.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` still matches only `globals.css`.
