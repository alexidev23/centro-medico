# Stage 3 — Public shell

**Branch:** `feat/public-shell`
**Status:** implemented, pending review
**Depends on:** `feat/ui-primitives` (merged in `b6f4e35`)

## Objective

Give the public site its persistent chrome — top app bar, navigation drawer, footer and
mobile CTA bar — so later screens render inside a real shell instead of a bare page.

## Decisions

### The stage is split in two commits

The shell as a whole exceeded the 150-200 authored-line budget (~284 lines), mostly in
the drawer. Per `AGENTS.md` the stage is split instead of forced:

| Commit | Content | Authored lines |
| --- | --- | --- |
| 3a | `brand-mark`, `site-header`, `site-drawer`, elevation + `fg-secondary` tokens | 193 |
| 3b | `(public)` layout, page move, `site-footer`, `mobile-cta-bar` | ~88 |

Each commit is reviewable on its own and the branch builds at every step.

### Drawer state lives in the header

`SiteHeader` owns the `open` state and renders `SiteDrawer` as a child. The drawer closes
on backdrop click, on its close button and on `Escape`, locks body scroll while open and
stays `inert` when closed so it is unreachable by keyboard and screen readers.

### Navigation is inert for now

Only `Inicio` points to a real route. The other five entries use `href="#"` and become
real anchors in the sections stage. They are listed now to match the design.

### Header links are placeholders

WhatsApp (`https://wa.me/543515550188`), phone (`tel:+543515550188`) and the patient
portal button use the demo contact data. The portal has no route yet.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/app/globals.css` | `--fg-secondary`, `--shadow-card`, `--shadow-raised`, `--shadow-overlay` |
| `frontend/src/components/layout/brand-mark.tsx` | Aurora logo mark (`HeartPulse` on teal) |
| `frontend/src/components/layout/site-header.tsx` | Fixed app bar, 64px, menu/WhatsApp/phone/portal |
| `frontend/src/components/layout/site-drawer.tsx` | Left drawer: contact block + 6 nav entries |
| `frontend/src/components/layout/site-footer.tsx` | Address, hours, phone, demo note |
| `frontend/src/components/layout/mobile-cta-bar.tsx` | Fixed bottom "Sacar turno" bar |
| `frontend/src/app/(public)/layout.tsx` | Public route group layout |
| `frontend/src/app/(public)/page.tsx` | Moved from `src/app/page.tsx` |

## Specification

**Header** — `fixed` full width, `z-50`, height 64px, `bg-background/90` with
`backdrop-blur-xl` and a 1px bottom border at 60% opacity.

- Left: 44px menu button (`Menu`), brand mark, two-line title — `Centro Médico Aurora`
  (`text-label-md`, semibold) over `Inicio` (`text-label-sm`, teal).
- Right: 44px circular icon links — WhatsApp, phone, patient portal — teal icons,
  hover background `--surface-subtle`.
- Every icon-only control has an `aria-label`.

**Drawer** — `84%` width, max 340px, full height, left aligned, `--shadow-overlay`.

- Header row: brand mark + `Aurora Salud` / `Córdoba Capital`, 44px close button.
- Contact block on `--surface-subtle`: "Atención telefónica y WhatsApp",
  `+54 351 555-0188`, `Lun a Vie 8:00 a 20:00 · Sáb 8:00 a 13:00`.
- Six 48px nav rows with teal 20px icons: Inicio, Especialidades, Profesionales,
  Cómo funciona, Ubicación, Contacto.
- Footer block: `Av. Hipólito Yrigoyen 320, Nueva Córdoba` and the tagline
  `Cuidado cálido, medicina de excelencia.`

**Footer** — three stacked blocks on the page background: address, opening hours,
phone/WhatsApp, plus `Proyecto demo. Datos ficticios.`

**Mobile CTA bar** — `fixed` bottom, full width, 1px top border, `--shadow-raised`,
single primary "Sacar turno" action with a `CalendarDays` icon, 48px tall.

**Public layout** — `min-h-full` column: header, `pt-16` content area (64px header),
footer and CTA bar. The footer carries `pb-28` so the fixed CTA bar never covers its
last line and no background seam appears above it.

## Acceptance criteria

- `pnpm lint` exit 0.
- `pnpm build` exit 0 and `/` prerenders as static.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`.
- Compiled CSS contains `shadow-overlay`, `shadow-raised`, `gutter-mobile`,
  `text-label-md` and `text-fg-secondary`.
- Prerendered `/` HTML contains the header, drawer, footer and CTA bar.
- `pnpm dev`: drawer opens/closes with button, backdrop and `Escape`; body does not scroll
  while it is open.
