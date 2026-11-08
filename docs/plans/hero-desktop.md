# Correction C3 - Desktop hero

**Branch:** `fix/desktop-hero`
**Status:** implemented, pending review
**Depends on:** `main` at `aedab4c`
**Origin:** desktop-fidelity audit of the landing. Stage 4 was built from the mobile export,
so the hero renders the mobile composition at every width: appointment card above the image,
no desktop status line and a booking CTA that points at the specialties section.

## Objective

Give the hero the desktop composition from
`landing_escritorio_centro_m_dico_aurora/code.html` (section 1) while keeping the mobile one
intact, without touching any section below it.

## Decisions

### Two compositions, one section

The export defines two heroes:

- Mobile: stacked text, full-width CTAs, appointment card, then the facilities photo.
- Desktop: 12-column grid, text and CTAs on 7 columns, image and appointment card stacked on
  5 columns, both sides vertically centred.

The grid starts at `lg`, as in the export. Below `lg` the section keeps the current mobile
composition unchanged. Moving the split to `md` is a one-word change if tablets should get the
two-column layout.

### The right column reverses at mobile

In the export the image sits above the card; the mobile export places the card above the
image. One wrapper holds both with `flex-col-reverse lg:flex-col`, so DOM order can follow the
desktop stack while mobile keeps its order.

### Two appointment cards

The copy differs by composition, so each is a local component in `hero.tsx`:

- Mobile (unchanged): "Disponible hoy", "Sin costo adicional", "Dra. Sofía Ramírez
  (M.P. 34.892)", button "Reservar este turno".
- Desktop: "Próximo turno disponible hoy" and "Jueves 15 de octubre", title `title-md`,
  "Dra. Sofía Ramírez (M.P. 34.892) • Consultorio 3", CTA "Reservar este horario".

Both CTAs target `#reservar-turno`; the mobile one stops being a dead button.

### Badge and status line

The mobile badge keeps the shadcn brand variant with the shield icon. From `lg` the export's
pill is used: pulsing dot plus the same label on `surface-subtle`.

The line "Sistema actualizado para el jueves 15 de octubre de 2026" is the export's static demo
copy; it renders from `lg` only.

### Booking target

The primary hero CTA now targets `#reservar-turno` (it pointed at `#especialidades`); the
secondary keeps `#especialidades`.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/landing/hero.tsx` | Desktop grid, card variants, badge, status line, targets | ~50 |
| `docs/plans/hero-desktop.md` | This plan | - |

## Specification

**Section** - `mx-auto flex w-full max-w-page flex-col gap-lg px-gutter-mobile pt-md pb-lg`
plus `lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-xl lg:gap-y-lg lg:px-gutter lg:pt-xl
lg:pb-xl`.

**Left column** - `flex flex-col gap-sm lg:col-span-7 lg:gap-md`.

- Badge: mobile `Badge variant="brand"` with the shield (`lg:hidden`); desktop pill
  `inline-flex items-center gap-xs rounded-full bg-surface-subtle px-md py-xs text-primary
  shadow-sm`, a `size-2` pulsing primary dot and `text-label-sm tracking-wide`.
- Title: `text-headline-lg-mobile` up to `lg:text-headline-lg`, `tracking-tight`.
- Paragraph: `text-body-md text-fg-secondary`, `lg:max-w-[42rem] lg:text-body-lg`.
- CTAs: `mt-md flex flex-col gap-sm`, from `lg` `mt-0 flex-row flex-wrap items-center gap-md
  pt-xs`; both buttons `w-full lg:w-auto`.
- Status line: `hidden items-center gap-sm pt-sm text-body-sm text-fg-secondary lg:flex` with a
  `CalendarCheck` icon in `text-primary`.

**Right column** - `flex flex-col-reverse gap-lg lg:col-span-5 lg:flex-col lg:gap-md`.

- Image: `relative h-56 w-full overflow-hidden rounded-lg lg:h-80`, `next/image` fill,
  caption overlay `bg-linear-to-t from-foreground/60` with `text-label-sm lg:text-label-md`.
- Cards: mobile `lg:hidden`, desktop `hidden lg:flex`, desktop padding `lg:p-lg`.

## Acceptance criteria

- `pnpm lint` exit 0 and `pnpm build` exit 0.
- 390px: identical to the current mobile hero; card before image; no horizontal overflow.
- 768px: stacked composition, no horizontal overflow.
- 1024px and 1280px: text/CTAs vertically centred against the right stack, image above the
  card, desktop copy present, no horizontal overflow.
- "Sacar turno online" targets `#reservar-turno`; "Ver especialidades" targets
  `#especialidades`; both card CTAs target `#reservar-turno`.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` still matches only `globals.css`.
