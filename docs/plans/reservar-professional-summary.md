# Stage B1b — Selected professional and entry wiring

**Branch:** `feat/booking-step-rail`
**Status:** implemented in two work units, pending review
**Depends on:** `ad2904d` (B1a)

## Objective

Show the professional the visitor picked at the top of the booking flow, and wire the
landing entry points so "Pedir turno" lands on `/reservar?profesional=<slug>` with the
banner already filled. The calendar and the rest of the flow stay for B2.

## Decisions

### The fixture moves to `lib/professionals.ts`

The professional records live inside the landing card module (`components/landing/
professionals.tsx`). The booking route needs the same records, and a page must not depend
on a landing presentation module: that inverts the dependency direction and couples the
flow to a section of the landing.

The records move to `lib/professionals.ts` with a `slug`, plus `getProfessionalBySlug`.
`components/landing/professionals.tsx` keeps only the card and imports the data. The move is
verbatim except for the added slugs, so it lands as its own commit: together with the banner
the stage would reach 244 changed lines, over the 150–200 cap. Splitting it leaves two
reviewable units, 146 lines (the move) and 105 (the behavior), each inside the limit.

### The page keeps its static shell; `searchParams` is read behind Suspense

`cacheComponents` is enabled. Awaiting `searchParams` at the page level opts the whole route
into dynamic rendering. Instead the page stays synchronous and passes the promise down to an
async banner inside `<Suspense>`, the pattern the bundled caching guide prescribes: the
shell (booking header plus step rail) still prerenders and only the banner streams.

Because the shell has already started streaming when the banner resolves, Next degrades a
`redirect()` inside the boundary to a client-side redirect. That is acceptable here: the
only reachable path into the flow is a card click, which always carries a valid slug.

### A missing or unknown slug returns to the professional grid

`?profesional=` absent, repeated, or not matching a fixture slug redirects to
`/#reservar-turno`, the landing's professional grid. A visitor who lands on the flow with no
professional gets to pick one instead of facing step 2 with an empty banner.

### The banner shows only data the fixture has

The export adds a per-doctor headline (*"Especialista en Medicina Interna y Prevención
Cardiovascular"*) and *"Sede Central"*. Neither exists in the fixture, and inventing them
would put unverified claims on a medical site. The banner renders the specialty chip, the
licence, the name, `Sede Nueva Córdoba · <office>` and the export's constant
*"30 minutos presencial"*. "Cambiar profesional" links back to `/#reservar-turno`.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/lib/professionals.ts` | New — fixture, slugs, `getProfessionalBySlug` |
| `frontend/src/components/landing/professionals.tsx` | Imports the fixture; "Pedir turno" becomes a link |
| `frontend/src/components/booking/professional-summary.tsx` | New — the banner |
| `frontend/src/app/(booking)/reservar/page.tsx` | Reads `?profesional=`, renders the banner |
| `docs/plans/reservar-professional-summary.md` | New — this plan |

## Specification

**Fixture** — `type Professional` keeps `name`, `specialty`, `licence`, `office`, `photo`,
`alt` and adds `slug`. Slugs are kebab-case names without the title: `sofia-ramirez`,
`martin-valenzuela`, `valentina-rossi`, `camila-montes`, `gonzalo-herrera`,
`lucia-benitez`. `getProfessionalBySlug(slug)` returns the record or `undefined`.

**Landing card** — "Pedir turno" is a `Link` to `/reservar?profesional=<slug>` styled with
`buttonVariants({ className: "w-full" })`, so it keeps the button look. The `id="reservar-turno"`
anchor and the section composition are unchanged.

**Banner** — `rounded-xl bg-card p-md shadow-card md:p-lg`, `flex flex-col gap-md
md:flex-row md:items-center md:justify-between`.

- Left: the photo at 64px (`size-16 rounded-xl object-cover`) with a `-right-1 -bottom-1`
  `size-5 rounded-full bg-primary text-primary-foreground` badge holding `CircleCheck`;
  then the specialty chip (`rounded-full bg-surface-subtle px-xs py-0.5 text-[12px]
  font-semibold text-primary`), the licence (`text-[12px] text-fg-secondary`), the name as
  `h2 text-headline-sm font-bold` and `Sede Nueva Córdoba · <office>` in
  `text-body-sm text-fg-secondary`.
- Right: duration block (`text-right`, hidden below `sm`) — *"Duración de consulta"* in
  `text-[12px] text-fg-secondary`, *"30 minutos presencial"* in
  `text-label-md font-bold text-primary`; and the *"Cambiar profesional"* link to
  `/#reservar-turno` (`rounded-xl bg-surface-subtle px-md py-xs text-label-md text-primary
  hover:bg-secondary`, with a `RefreshCw size-4`). On mobile the duration hides and the link
  sits next to nothing, so the row still reads.

**Page** — synchronous `ReservarPage(props: PageProps<"/reservar">)` renders the `main`
column with `gap-lg`: `<BookingStepper current={2} />` and a `<Suspense fallback={null}>`
around the async banner. The banner reads `props.searchParams`, keeps the value only when it
is a string, resolves it with `getProfessionalBySlug` and redirects to `/#reservar-turno`
when there is no match.

## Acceptance criteria

- `pnpm exec tsc --noEmit` exit 0.
- `pnpm lint` exit 0.
- `pnpm build` exit 0; `/reservar` keeps a prerendered shell and `/` still prerenders.
- `/reservar?profesional=sofia-ramirez` contains the name, specialty, licence, office,
  duration and "Cambiar profesional"; all six slugs resolve.
- Opening `/reservar` without a slug, or with an unknown one, ends at `/#reservar-turno`.
- Each landing "Pedir turno" links to `/reservar?profesional=<its slug>`.
- CDP probe at 320 / 390 / 768 / 1280 with `mobile:false`: no horizontal overflow and
  `documentElement.scrollWidth <= innerWidth`.
- Screenshots at 320 / 390 / 1280 show the banner above the fold, readable and unclipped.
