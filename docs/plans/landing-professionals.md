# Stage 7 - Landing professionals

**Branch:** `feat/landing-professionals`
**Status:** implemented, pending review
**Depends on:** `feat/landing-steps` (merged in `28b85d5`)

## Objective

Append the professional list below the booking steps: the six specialists with their
photo, specialty, licence number and office, each carrying the booking call to action.
The section also materialises `#reservar-turno`, the anchor the hero and the specialties
grid have been pointing at since Stages 4 and 5.

## Decisions

### The desktop export is the composition

Desktop (`landing_escritorio_*`) renders a left-aligned header and a three-column grid of
vertical cards: photo, name, specialty, licence and office, with a full-width booking
button. Mobile (`landing_m_vil_*`) renders the same six people as a horizontal
snap-scrolling carousel of 280px cards.

Following the precedent of Stages 4-6, the section is one responsive composition built
from the desktop export. The mobile carousel is dropped because it is a different
composition rather than a variation of the desktop one: below `md` the cards stack in a
single column. If the carousel is wanted, it is its own stage.

### The mobile-only availability badge is dropped

The mobile export shows a "Hoy libre" pill on some cards. There is no availability data
yet and the desktop export does not render it, so the card shows only what the desktop
export shows.

### The section materialises both anchors

The desktop export puts `id="profesionales"` on the section and `id="reservar-turno"` on
the grid. Both are reproduced:

- `#reservar-turno` finally resolves the forward anchors written in Stage 4 (hero CTAs
  used `#especialidades`, the hero booking card and Stage 5's "Ver turnos disponibles"
  used `#reservar-turno`).
- The grid carries `scroll-mt-20 md:scroll-mt-24` so the fixed header does not cover the
  anchored content.

### The booking button has no destination yet

The design renders a plain button. The booking flow does not exist, and a link to nowhere
would be a dead end, so the card uses the existing `Button` primitive with no handler —
the same treatment the hero booking card already has.

### Photos come from the export, through `next/image`

The six portraits are the export's `lh3.googleusercontent.com` URLs; the host is already
listed in `next.config.ts` `remotePatterns`. They are ephemeral: when they expire they are
replaced without touching the layout. Each image gets a descriptive Spanish `alt`.

## Scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/landing/professionals.tsx` | New — six-professional data plus the card and section | ~110 |
| `frontend/src/app/(public)/page.tsx` | Renders `<Professionals />` below `<BookingSteps />` | ~2 |

## Specification

**Section** — `id="profesionales"`, `py-lg` below `md` and `py-xl` from `md` up. Inner
container `mx-auto w-full max-w-page px-gutter-mobile md:px-gutter`, flex column
`gap-md md:gap-lg`.

- Kicker `text-label-sm font-semibold tracking-wider text-primary uppercase` —
  *"Cuerpo Médico"*.
- Heading `text-title-md md:text-headline-lg`, bold, `tracking-tight` —
  *"Nuestros profesionales"*.
- Subtitle `max-w-xl text-body-sm md:text-body-md text-fg-secondary` — *"Atención con
  dedicación exclusiva, rigor clínico y vocación de servicio."*.

**Grid** — `id="reservar-turno"`, `scroll-mt-20 md:scroll-mt-24`, `grid-cols-1`,
`md:grid-cols-2`, `lg:grid-cols-3`; `gap-sm` below `md`, `gap-lg` from `md` up.

**Card** — `bg-card`, rounded-lg, `shadow-card`, `p-md md:p-lg`,
`flex flex-col justify-between gap-md`.

- Photo `relative h-48 w-full overflow-hidden rounded-lg bg-surface-subtle`, `Image`
  with `fill`, `object-cover`, `sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw,
  100vw"`.
- Name `text-title-md md:text-headline-sm`, bold, `text-foreground`.
- Specialty `text-label-lg text-primary`.
- Licence and office row `mt-xs flex items-center justify-between text-body-sm
  text-fg-secondary`, rendered as *"M.P. 34.892"* and *"Consultorio 3"*.
- Button `Button` primitive, default size and `primary` variant, `w-full`, labelled
  *"Pedir turno"*.

**Content**

| Professional | Specialty | Licence | Office |
| --- | --- | --- | --- |
| Dra. Sofía Ramírez | Clínica Médica | 34.892 | 3 |
| Dr. Martín Valenzuela | Pediatría | 28.140 | 1 |
| Dra. Valentina Rossi | Ginecología | 41.502 | 4 |
| Dra. Camila Montes | Dermatología | 36.904 | 2 |
| Lic. Gonzalo Herrera | Psicología | 19.831 | 6 |
| Lic. Lucía Benítez | Nutrición | 22.415 | 5 |

## Acceptance criteria

- `pnpm lint` exit 0.
- `pnpm build` exit 0 and `/` prerenders as static.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`.
- Prerendered `/` HTML contains the six names, the six specialties, both anchors and the
  six image sources.
- Layout measured at 390px (one column), 768px (two columns) and 1280px (three columns),
  with no horizontal overflow.
- The six card images resolve (non-zero natural width) and carry a non-empty `alt`.
