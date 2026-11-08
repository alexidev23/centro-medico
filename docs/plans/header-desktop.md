# Correction C1 - Desktop header

**Branch:** `fix/desktop-header`
**Status:** implemented, pending review
**Depends on:** `main` at `cb034e7`
**Origin:** desktop-fidelity audit of the landing. Stages 3 and 4 were built from the
mobile export; the desktop export was not used, so the shell has mobile-only navigation at
every width.

## Objective

Give the public header the desktop composition from
`landing_escritorio_centro_m_dico_aurora/code.html` while keeping the mobile one, without
touching any section below it.

## Decisions

### Two compositions, one component

The export defines two headers:

- Mobile: 64px tall, hamburger, brand, WhatsApp and phone shortcuts, portal avatar.
- Desktop: 80px tall, brand, horizontal navigation, "Sacar turno" call to action and the
  portal avatar; no hamburger and no phone shortcuts.

Both live in `SiteHeader`. The hamburger and the WhatsApp/phone shortcuts render below
`md` only; the navigation and the call to action render from `md` up. The drawer stays as
the mobile navigation surface.

### The brand block adopts the desktop copy

The desktop export shows the centre name with the descriptor *"Salud Integral · Córdoba"*;
the mobile export shows the current page name instead. The descriptor is static and true at
every width, so it replaces the page name; the page name was a mobile affordance that adds
nothing on a single-page site.

The brand tile grows to the design's 40px square (`size-10`, `rounded-xl`). `BrandMark` is
shared with the drawer, so both surfaces stay consistent.

### Navigation targets

The export links are placeholders (`href="#"`). Each item maps to the section that exists
or is planned on the landing:

| Item | Target |
| --- | --- |
| Inicio | `/` (active) |
| Especialidades | `#especialidades` (Stage 5) |
| Profesionales | `#profesionales` (Stage 7) |
| Contacto | `#contacto` (contact stage, not built yet) |

The header call to action, *"Sacar turno"*, targets `#reservar-turno` (Stage 7) instead of
the export's placeholder. The mobile call-to-action bar gets the same target so both
booking entries behave identically.

### Chrome details

The shadow replaces the hairline border, as in both exports. The container keeps
`max-w-page`, `px-gutter-mobile` and `md:px-gutter`.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/layout/site-header.tsx` | Mobile/desktop split, navigation, CTA, avatar | ~75 |
| `frontend/src/components/layout/brand-mark.tsx` | 40px tile, `rounded-xl` | ~4 |
| `frontend/src/components/layout/mobile-cta-bar.tsx` | Booking target | ~1 |
| `frontend/src/app/(public)/layout.tsx` | `pt-16 md:pt-20` offset | ~1 |

## Specification

**Header** — `fixed inset-x-0 top-0 z-50 bg-background/90 backdrop-blur-xl shadow-card`.
Inner `mx-auto flex h-16 w-full max-w-page items-center justify-between gap-sm
px-gutter-mobile md:h-20 md:gap-md md:px-gutter`.

- Hamburger `md:hidden`, same accessible name, `aria-expanded`, `aria-controls`.
- Brand: 40px tile plus two lines —
  name `text-title-md md:text-headline-sm`, bold, `tracking-tight`, `text-primary`;
  descriptor `text-label-sm uppercase tracking-wider text-muted-foreground` —
  *"Salud Integral · Córdoba"*.
- Navigation `hidden md:flex items-center gap-sm`, link `rounded-xl px-md py-sm
  text-label-lg transition-colors`; active `bg-surface-subtle text-primary` with
  `aria-current="page"`; inactive `text-fg-secondary hover:bg-surface-subtle
  hover:text-foreground`.
- Mobile shortcuts (`md:hidden`): WhatsApp and phone icon links.
- Desktop actions `hidden md:flex items-center gap-md`: *"Sacar turno"*
  (`buttonVariants({ variant: "primary" })`) to `#reservar-turno`, and the 32px portal
  avatar button (`bg-primary text-primary-foreground`).

**Layout offset** — `pt-16 md:pt-20` on the content wrapper.

## Acceptance criteria

- `pnpm lint` exit 0 and `pnpm build` exit 0.
- At 390px: hamburger visible, navigation and header CTA hidden, header content 64px tall.
- At 768px and 1280px: navigation, "Sacar turno" and avatar visible, hamburger and
  WhatsApp/phone shortcuts hidden, header content 80px tall.
- `#reservar-turno` is the target of the header CTA and of the mobile call-to-action bar.
- No horizontal overflow at 390, 768 or 1280.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` still matches only `globals.css`.
