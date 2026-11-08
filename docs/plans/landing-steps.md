# Stage 6 - Landing booking steps

**Branch:** `feat/landing-steps`
**Status:** implemented, pending review
**Depends on:** `feat/landing-specialties` (merged in `e5ff08f`)

## Objective

Append the "3 steps" block below the specialties grid: the three-step promise that
explains how booking works before the visitor reaches the professional list.

## Decisions

### The desktop export is the composition

The Stitch export ships two different compositions for this block. Desktop
(`landing_escritorio_*`) renders a rounded container card with a centred header and a
three-column grid of step cards carrying a large number and an icon. Mobile
(`landing_m_vil_*`) renders the same steps as stacked rows with a number tile and no
icons, and it changes the heading copy.

Following the precedent set by the hero in Stage 4 and the specialties grid in Stage 5,
the section is one responsive composition built from the desktop export: the mobile-only
row composition and its copy are dropped, and responsiveness comes from the grid.

### Tokens replace the design's surface names

| Design | Utility |
| --- | --- |
| `bg-surface-container-low` | `bg-surface-subtle` |
| `bg-surface-container-lowest` | `bg-card` |
| `bg-surface-container` | `bg-surface-subtle` |
| `text-on-surface` | `text-foreground` |
| `text-on-surface-variant` | `text-fg-secondary` |
| `shadow-sm` | `shadow-card` |
| `rounded-xl` (12px) | `rounded-lg` |

No hex colour is introduced; every value already lives in `globals.css`.

### Material Symbols are replaced by `lucide-react`

| Design | Component |
| --- | --- |
| `person_search` | `UserRoundSearch` |
| `calendar_month` | `CalendarDays` |
| `mark_email_read` | `MailCheck` |

The design renders the step number at `text-display` (48px). Mobile keeps it at
`text-headline-lg-mobile` (28px) so it stays proportional to the mobile card, and the
step numbers are `aria-hidden`: the heading already names the step, so the screen reader
must not announce "cero uno".

### No section anchor

The desktop export does not give this block an id, and Stage 5 left the drawer links
untouched. The drawer anchors are their own stage; nothing here invents an anchor
without a consumer.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/landing/booking-steps.tsx` | New — three-step data plus the card and section | ~95 |
| `frontend/src/app/(public)/page.tsx` | Renders `<BookingSteps />` below `<Specialties />` | ~2 |

## Specification

**Section** — `py-lg` below `md` and `py-xl` from `md` up. Inner container
`mx-auto w-full max-w-page px-gutter-mobile md:px-gutter`, carrying the design's
container card: `rounded-lg bg-surface-subtle p-lg shadow-card md:p-xl`, flex column
`gap-lg md:gap-xl`.

- Header `mx-auto flex max-w-2xl flex-col items-center gap-xs text-center`.
- Kicker `text-label-sm font-semibold tracking-wider text-primary uppercase` —
  *"Gestión ágil"*.
- Heading `text-title-md md:text-headline-lg`, bold, `tracking-tight` —
  *"Cómo sacar tu turno en 3 simples pasos"*.
- Subtitle `text-body-sm md:text-body-md text-fg-secondary` — *"Olvidate de esperas
  telefónicas. Elegí el horario más adecuado para tu día a día."*.

**Grid** — `grid-cols-1`, `md:grid-cols-3`; `gap-sm` below `md`, `gap-lg` from `md` up.

**Step card** — `bg-card`, rounded-lg, `shadow-card`, `p-md md:p-lg`,
`flex flex-col gap-sm`.

- Top row `flex items-center justify-between gap-sm`.
- Number `text-headline-lg-mobile md:text-display`, bold, `text-primary/40`,
  `aria-hidden`.
- Icon circle `flex size-10 shrink-0 items-center justify-center rounded-full
  bg-surface-subtle text-primary`, icon `size-5`, `aria-hidden`.
- Title `text-title-md md:text-headline-sm`, bold, `text-foreground`.
- Description `text-body-sm md:text-body-md text-fg-secondary`.

**Content** (desktop copy)

| Step | Title | Description |
| --- | --- | --- |
| 01 | Elegí especialidad o médico | Filtrá según tu preferencia o necesidad en Nueva Córdoba entre nuestras 6 especialidades dedicadas. |
| 02 | Seleccioná fecha y horario | Mirá los turnos disponibles en tiempo real y elegí el más conveniente para tu rutina. |
| 03 | Confirmá sin pago anticipado | Te llega un recordatorio con la confirmación directo por WhatsApp o correo electrónico de forma instantánea. |

## Acceptance criteria

- `pnpm lint` exit 0.
- `pnpm build` exit 0 and `/` prerenders as static.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`.
- Prerendered `/` HTML contains the kicker, the heading and the three step titles.
- Layout holds at 390px (one column), 768px and 1280px (three columns).
