# Stage 5 — Landing specialties

**Branch:** `feat/landing-specialties`
**Status:** implemented, pending review
**Depends on:** `feat/landing-hero` (merged in `f2d419f`)

## Objective

Append the specialties block below the landing hero: the six areas the centre offers,
each linking the visitor towards booking. It is the first screen section to carry real
navigation intent, so the `#especialidades` anchor becomes the landing's main target.

## Decisions

### One responsive composition instead of the two design exports

The Stitch export ships two different compositions for this block. Desktop
(`landing_escritorio_…`) renders a three-column grid of cards with an icon tile, a title,
a description and an "Ver turnos disponibles" link. Mobile (`landing_m_vil_…`) renders the
same six areas as a single column, each row carrying a category chip ("Adultos",
"0 a 16 años", …) and a chevron link, and it also changes the heading copy.

Following the precedent set by the hero in Stage 4, the section is one responsive
composition built from the desktop copy, with the mobile affordances layered on:

- The category chip renders below `md` only (`md:hidden`), because the mobile export is the
  only one that shows it.
- The trailing icon is `ArrowRight` at every size. The chevron of the mobile export is
  dropped: it encodes the same "go forward" gesture and duplicating it per breakpoint would
  add markup for no behavioural difference.
- The mobile-only heading copy is dropped in favour of the desktop one.

### Tokens replace the design's surface names

| Design | Utility |
| --- | --- |
| `bg-surface-container-lowest` | `bg-card` |
| `bg-surface-container` / `-high` | `bg-surface-subtle` |
| `bg-surface-container-low/40` | `bg-surface-subtle/40` |
| `text-on-surface` | `text-foreground` |
| `text-on-surface-variant` | `text-fg-secondary` |
| `shadow-sm` / `hover:shadow-md` | `shadow-card` / `hover:shadow-raised` |

No hex colour is introduced; every value already lives in `globals.css`.

### Material Symbols are replaced by `lucide-react`

| Design | Component |
| --- | --- |
| `vital_signs` | `Stethoscope` |
| `child_care` | `Baby` |
| `female` | `Venus` |
| `dermatology` | `Sparkles` |
| `psychology` | `Brain` |
| `nutrition` | `Salad` |
| `arrow_forward` | `ArrowRight` |

### The section anchor is renamed to `#especialidades`

The Stage 4 hero pointed both CTAs at `#especialidades-section`, a placeholder that did not
exist yet. The section now exists with `id="especialidades"`, so both hero anchors are
updated to match and the placeholder is gone.

### The card link points forward to `#reservar-turno`

"Ver turnos disponibles" targets `#reservar-turno`, which arrives with the booking stage.
Same forward-anchor precedent the hero used in Stage 4: the link is written once and becomes
live when the destination lands.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/components/landing/specialties.tsx` | New — six-area data plus the card and section |
| `frontend/src/app/(public)/page.tsx` | Renders `<Specialties />` below `<StatsStrip />` |
| `frontend/src/components/landing/hero.tsx` | CTAs retargeted from `#especialidades-section` to `#especialidades` |

## Specification

**Section** — `id="especialidades"`, `bg-surface-subtle/40` below `md` and transparent from
`md` up, `py-lg` below `md` and `py-xl` from `md` up. Inner container
`mx-auto w-full max-w-page px-gutter-mobile md:px-gutter`.

- Kicker `text-label-sm font-semibold tracking-wider text-primary uppercase` —
  *"Especialidades médicas"*.
- Heading `text-title-md md:text-headline-lg`, bold, `tracking-tight` —
  *"Cuidado integral para cada etapa"*.
- Subtitle `text-body-sm md:text-body-md text-fg-secondary max-w-xl` — *"Enfoque
  preventivo, seguimiento coordinado y consultorios equipados en un único lugar."*
- Grid `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`; `gap-sm` below `md`, `gap-lg`
  from `md` up.

**Card** — `bg-card`, rounded-lg, `shadow-card`, `hover:shadow-raised`, `transition-shadow`,
`p-md md:p-lg`, `gap-sm md:gap-md`, `flex flex-col`.

- Icon tile `size-10 md:size-12`, rounded-xl, `bg-surface-subtle text-primary`, icon
  `size-5 md:size-6`, `aria-hidden`.
- Title `text-title-md md:text-headline-sm`, bold, `text-foreground`.
- Category chip, `md:hidden`, rounded-full, `bg-surface-subtle`, `text-label-sm`,
  `text-primary`.
- Description `text-body-sm md:text-body-md text-fg-secondary`.
- Link `mt-auto`, `text-label-md font-semibold text-primary hover:text-primary-dark`,
  "Ver turnos disponibles" plus `ArrowRight size-4`.

**Content** (desktop copy)

| Area | Description | Chip |
| --- | --- | --- |
| Clínica Médica | Atención integral, prevención y chequeos anuales para adultos. | Adultos |
| Pediatría | Cuidado del crecimiento, control del recién nacido y vacunas en un entorno contenedor. | 0 a 16 años |
| Ginecología | Salud integral de la mujer y controles preventivos de rutina con calidez profesional. | Integral |
| Dermatología | Diagnóstico clínico, control de lunares y cuidado de la piel en niños y adultos. | Clínica & Estética |
| Psicología | Espacio terapéutico cálido, seguro y confidencial orientado a la escucha activa. | Terapia |
| Nutrición | Planes alimentarios personalizados y educación nutricional para hábitos sostenibles. | Hábitos |

## Acceptance criteria

- `pnpm lint` exit 0.
- `pnpm build` exit 0 and `/` prerenders as static.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`.
- Prerendered `/` HTML contains `id="especialidades"`, the six area names, the six chip
  labels and the section heading.
- Both hero CTAs resolve to `#especialidades` and that element exists in the prerendered
  HTML.
- Layout holds at 390px, 768px and 1280px.
