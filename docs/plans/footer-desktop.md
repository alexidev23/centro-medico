# Correction C2 - Desktop footer

**Branch:** `fix/desktop-footer`
**Status:** implemented, pending review
**Depends on:** `fix/desktop-header` (commit `59af46e`, merged into `main`)
**Origin:** desktop-fidelity audit. The Stage 3 footer was built from the mobile export:
three stacked icon blocks instead of the desktop's three-column layout.

## Objective

Give the public footer the desktop export composition and adopt its contact data across
the shell, so the site stops advertising one address and phone while the desktop design
advertises another.

## Decisions

### The desktop export's data wins (owner decision)

The desktop export contains two footers with contradictory data. The owner chose the data
of the real footer element over the one that currently matches the mobile export:

| Field | Was (mobile) | Now (desktop) |
| --- | --- | --- |
| Address | Av. Hipólito Yrigoyen 320 | Av. Hipólito Yrigoyen 480, Nueva Córdoba, Córdoba |
| WhatsApp | +54 351 555-0188 | +54 9 351 522-8900 |
| Phone | +54 351 555-0188 | (0351) 485-9100 |
| Weekday hours | 8:00 a 20:00 | 07:30 a 20:30 |
| Saturday hours | 8:00 a 13:00 | 08:00 a 13:00 |

Because the header, the drawer and the footer all surface the same contact data, the same
commit updates all three. The header WhatsApp and phone links point at the new numbers:
`https://wa.me/5493515228900` and `tel:+543514859100`.

### One phone in the drawer

The export gives the drawer a single "Atención telefónica y WhatsApp" block. It shows the
WhatsApp number (`+54 351 522-8900`), the channel the mobile design actually links to; the
footer carries both numbers in full.

### Quick links are not added

The desktop export's real footer has three columns — brand, location, direct contact — and
no quick-links column. The audit's candidate list mentioned quick links from the leftover
duplicate footer inside `main`; that element is discarded.

### Layout

**Footer** — `mt-xl`, `border-t border-border/60`, `bg-card`, `pt-xl`, `pb-28 md:pb-xl`
(the bottom padding keeps the fixed mobile call-to-action bar clear of the content).

Inner `mx-auto w-full max-w-page px-gutter-mobile md:px-gutter`, grid
`grid-cols-1 gap-lg md:grid-cols-12 md:gap-xl`.

- Column 1 (`md:col-span-5`): brand mark plus *"Centro Médico Aurora"*
  (`text-headline-sm`, bold, `text-primary`), and the description
  *"Un entorno cálido y moderno de salud integral y precisión clínica en la ciudad de
  Córdoba. Estamos para cuidarte."* in `text-body-sm md:text-body-md text-fg-secondary`.
- Column 2 (`md:col-span-4`): *"Sede Central & Atención"* plus `MapPin` and `Clock` rows
  with the address and both hour ranges.
- Column 3 (`md:col-span-3`): *"Contacto Directo"* plus `MessageCircle` and `Phone` rows
  with the WhatsApp and phone links.
- Bottom row: `mt-xl border-t border-border/60 pt-lg`, flex column below `sm` and row from
  `sm` up — *"Proyecto demo. Datos ficticios."* and *"Córdoba, Argentina"*.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/layout/site-footer.tsx` | Desktop three-column composition and new data | ~85 |
| `frontend/src/components/layout/site-header.tsx` | WhatsApp and phone targets | ~2 |
| `frontend/src/components/layout/site-drawer.tsx` | Phone number, hours and address | ~4 |

## Acceptance criteria

- `pnpm lint` exit 0 and `pnpm build` exit 0.
- At 390px the footer stacks in one column; at 768px and 1280px it renders 5/4/3 columns.
- No horizontal overflow at 390, 768 or 1280.
- `git grep -n "555-0188\|Yrigoyen 320\|8:00 a 20:00" -- frontend/src` returns no matches.
- Prerendered `/` HTML contains Yrigoyen 480, both new numbers, both hour ranges and the
  demo note.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` still matches only `globals.css`.
