# Stage B1a — Booking route and step rail

**Branch:** `feat/booking-step-rail`
**Status:** implemented, pending review
**Depends on:** `main` at `e621d44`

## Objective

Open the booking flow as its own route, `/reservar`, with the screen chrome the Stitch
export defines for it and the four-step indicator that carries the visitor's position.
This stage builds the frame only: the professional summary banner and the calendar arrive
in B1b and B2.

## Decisions

### The flow gets its own route group, not the landing layout

`app/(public)/layout.tsx` renders the landing header, the footer and the mobile CTA bar.
The booking export has none of those: a 20-unit tall header with the brand, the phone block
and a "Cancelar proceso" action, and no footer. `app/(booking)/layout.tsx` therefore renders
`BookingHeader` and the page, and the landing keeps its own layout untouched.

### Mobile uses the progress band of the mobile export, not a squeezed rail

The desktop export lays the four steps out as a row of four cards inside the header card.
The mobile export (`reserva_m_vil_datos_del_paciente`) does not use that rail at all: it
opens with a thin band — *"Paso 3 de 4: Tus datos"*, *"75% completado"* and a 6px progress
bar — and its header is a single 16-unit row with a back arrow, the title *"Reservar Turno"*
and a close button.

Following the precedent of the landing stages (desktop composition as the base, mobile
affordances layered on), below `md` the flow renders the mobile header and the progress
band, and from `md` up it renders the desktop header and the four-step rail. Squeezing the
rail into two columns at 390px truncates every label to "Especialidad…", which is worse
than the band the mobile export already defines.

The section heading stays visible on mobile even though the mobile export — a mid-flow
screen — does not show it: the route needs one `h1`, and hiding it in every mobile state
would leave the page without a visible title.


### The rail takes the current step as a prop

The design shows the rail mid-flow: step 1 completed, step 2 in progress, steps 3 and 4
pending. `BookingStepper` receives `current` (1-based) and derives each step's state, so B2
and B3 can move it without rewriting markup. B1a renders it with `current={2}`.

The export draws a fourth visual variant for step 3 ("parallel fill", lighter than pending).
It is dropped: the three states (done / current / pending) already encode everything the
visitor needs, and a fourth style would be decoration.

### Header actions are a subset of the export

The export header carries a nav (`Sacar Turno`, `Especialidades`, `Profesionales`,
`Mis Turnos`) and a patient avatar. None of those destinations exist yet — `Mis Turnos`
belongs to the patient area and the avatar to the future portal — so the header ships the
brand, the phone block and "Cancelar proceso" only. "Cancelar proceso" leaves the flow and
returns to `/`.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/app/(booking)/layout.tsx` | New — booking chrome |
| `frontend/src/app/(booking)/reservar/page.tsx` | New — the route, renders the rail |
| `frontend/src/components/booking/booking-header.tsx` | New — brand, phone, cancel action |
| `frontend/src/components/booking/booking-stepper.tsx` | New — four-step indicator |
| `docs/plans/reservar-step-rail.md` | New — this plan |

## Specification

**Layout** — `flex min-h-full flex-col`, `BookingHeader`, then `flex-1 pt-16 md:pt-20`
around `children`.

**Header** — `fixed inset-x-0 top-0 z-50 bg-card/90 shadow-card backdrop-blur-md`, two rows
inside it:

- Below `md`: `flex h-16 items-center justify-between px-gutter-mobile`, with a back link to
  `/` (`ArrowLeft size-6`, `aria-label="Volver"`), the title *"Reservar Turno"*
  (`text-title-md`) and a close link to `/` (`X size-5`, `aria-label="Cerrar el flujo de
  reserva"`). Both links are 44px targets.
- From `md`: `hidden h-20 max-w-page items-center justify-between gap-sm px-gutter md:flex`,
  with the brand link ( `BrandMark` plus *"Centro Médico Aurora"* in `text-title-md
  font-bold tracking-tight text-primary` and *"Nueva Córdoba · Sanatorio Boutique"* in
  `text-[12px] leading-none text-fg-secondary`, both truncated) and a right cluster with the
  phone block (*"(0351) 482-9000"* `text-label-sm font-semibold`, *"Guardia y Central
  Telefónica"* `text-[12px] text-fg-secondary`) and *"Cancelar proceso"*
  (`text-label-sm text-fg-secondary hover:text-destructive`) linking to `/`.

**Rail card** — `rounded-xl bg-card p-md shadow-card md:p-lg`.

- Below `md`: progress band from the mobile export — a row with
  `ClipboardCheck size-4` plus *"Paso N de 4: <short label>"* (`text-label-sm font-semibold
  text-primary`) on the left and the completed share on the right (`text-label-sm
  text-fg-secondary`), above a `h-1.5 rounded-full bg-surface-subtle` bar with a `bg-primary`
  fill of `N%`. The bar is a `progressbar` with `aria-valuenow` / `aria-valuemin` /
  `aria-valuemax`. Short labels: *Especialidad*, *Fecha y horario*, *Tus datos*,
  *Confirmación*. The share reads *"N%"* below `sm` and *"N% completado"* from `sm` up: next
  to the step label the full phrase does not fit at 390px and truncates the label the
  visitor needs.
- Kicker `text-label-sm font-semibold tracking-widest text-primary uppercase` —
  *"Reserva Online · Sede Nueva Córdoba"*; heading `h1 text-headline-md` —
  *"Sacá tu turno con nuestros especialistas"*. Both visible at every width.
- Right chip `flex items-center gap-xs self-start rounded-full bg-surface-subtle px-md py-xs`
  with `BadgeCheck size-4 text-primary` and `text-label-sm text-fg-secondary` —
  *"Turnos en tiempo real · Confirmación inmediata"*.
- From `md` the steps are an `ol` with `grid grid-cols-4 gap-sm pt-xs`; each `li` is
  `flex items-center gap-sm rounded-xl p-sm`.
  - Done: `bg-surface-subtle/60`, circle `bg-primary text-primary-foreground` with a
    `Check size-4`, kicker `text-primary`, title `text-foreground`.
  - Current: `bg-primary text-primary-foreground shadow-card`, circle
    `bg-primary-foreground text-primary font-bold` with the number, kicker
    `text-primary-foreground/80` reading *"Paso N · En curso"*, title `font-bold`.
  - Pending: `bg-surface-subtle/40 opacity-70`, circle `bg-surface-subtle text-fg-secondary`
    with the number, kicker and title `text-fg-secondary`.
  - Kicker `block truncate text-[11px] uppercase tracking-wider`; title `block truncate
    text-label-md`. The current step carries `aria-current="step"`.
- Step titles: *Especialidad y Profesional*, *Fecha y Horario*, *Datos del Paciente*,
  *Confirmación*.

## Acceptance criteria

- `pnpm exec tsc --noEmit` exit 0.
- `pnpm lint` exit 0.
- `pnpm build` exit 0; `/reservar` prerenders as static and `/` keeps rendering the landing
  header, footer and CTA bar.
- Prerendered `/reservar` HTML contains the four step titles, the heading, the kicker, the
  progress band copy and the two header strings; the landing HTML does not contain
  "Cancelar proceso".
- CDP probe at 320 / 390 / 768 / 1280 with `mobile:false`: no horizontal overflow and
  `documentElement.scrollWidth <= innerWidth`.
- At 320 the header is the mobile row, the progress band replaces the rail, and the four
  step labels are not rendered.

