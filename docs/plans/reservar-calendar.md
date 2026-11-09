# Stage B2 — Calendar and slot selection

**Branch:** `feat/booking-calendar`
**Status:** B2a, B2b and B2c implemented, B2d pending
**Depends on:** `main` at `236c827` (B1b)

## Objective

Let the visitor pick a date and a time for the chosen professional. This stage opens the
step 2 card the Stitch export defines: the month calendar with its availability, the time
slots grouped by morning and afternoon, and the live summary that carries the pick into
step 3.

## Decisions

### B2 is four stages

The 150–200 cap forces the split by measurement, not by guess. **B2a** builds the
availability model and renders the current month with its availability marks (184
hand-authored lines). **B2b** makes the calendar interactive — month navigation, the day
pick, and the step 2 card that owns the picked date (184). **B2c** adds the slot grid for
the picked day (~110). **B2d** adds the sticky live summary (~60). Each stage leaves a
visible, reviewable result on `/reservar`, and each stays under the cap without rewriting
what the previous one built.

Selection arrived with B2b, so B2a rendered the grid without any affordance that promised a
click: no hover state and no cursor change until the days actually respond.

### Availability is a local fixture until the backend exists

The backend is deferred. Availability therefore comes from `lib/booking-availability.ts`:
Monday to Friday, 30-minute slots from 09:00 to 12:30 and from 15:00 to 19:00. Past days,
weekends and days outside the displayed month are not available. B2b marks a deterministic
subset of slots as taken (`(day + slot index) % 3 === 0`) so the export's "(No disp.)"
state exists; the rule is a stand-in, not business logic, and it is the first thing the
backend replaces.

### `today` comes from the server

A client `new Date()` would disagree with the prerendered shell around midnight and could
hydrate with a different month. The page resolves the professional inside its existing
`<Suspense>` boundary and passes `todayKey()` — the date in `America/Argentina/Cordoba` —
as a plain `YYYY-MM-DD` string. Dates stay strings end to end, so no timezone shifts and no
client clock.

Cache Components refuses `new Date()` during prerender, so the streaming component awaits
`connection()` before reading the date: the value is request-time, which is exactly what a
calendar needs, and `/reservar` keeps its partial prerender.

### The export's details that do not ship

- The address: the app already states `Av. Hipólito Yrigoyen 480` in the footer, the drawer
  and the contact section; the booking export says 320. The app's value wins.
- "Semana 42" and the duplicated "Octubre 2026" chip in the section header: the month is
  already the calendar's own heading, and the ISO week number adds noise, not information.
- "Elegido" under the selected day only renders from `sm` up; at 320 the label does not fit
  inside a 33-pixel cell, and the primary fill already marks the selection.
- Weekend days stay unavailable, as the export dims them, even though the centre opens on
  Saturday mornings.
- The month block is capped at `34rem`. Left uncapped, the seven day columns stretch to 160
  pixels each at 1280 and the cells stop reading as days; the export keeps them near 76.

## Scope — B2a

| File | Change |
| --- | --- |
| `frontend/src/lib/booking-availability.ts` | New — date keys, month grid, availability, month label |
| `frontend/src/components/booking/booking-calendar.tsx` | New — server-rendered month card |
| `frontend/src/app/(booking)/reservar/page.tsx` | Resolves `today` and renders the calendar |
| `docs/plans/reservar-calendar.md` | New — this plan |

## Specification — B2a

**Date model** — `type DateKey = string` in `YYYY-MM-DD`.

- `todayKey(now?)` formats the date in `America/Argentina/Cordoba` and returns the key.
- `parseDateKey(key)` is internal: a `Date` at UTC noon, so no daylight-saving shift can
  move it to the previous day.
- `monthOf(key)` → `{ year, month }` with `month` counted from 1.
- `monthGrid(year, month)` → 42 `MonthCell` (`key`, `day`, `inMonth`), Monday-first, built at
  UTC noon from the Monday on or before the first of the month.
- `isSelectableDay(key, today)` → `key >= today` and not Saturday or Sunday.
- `formatMonth(year, month)` → *"Octubre 2026"* with `Intl` in `es-AR`, `timeZone: "UTC"`,
  first letter capitalized.

**Calendar card** — `rounded-xl bg-card p-md shadow-card md:p-lg`.

- Header: step badge (`size-7 rounded-lg bg-primary-subtle text-label-sm font-bold
  text-primary`) reading *"2"*, `h2` *"Elegí fecha y horario disponible"* in
  `text-title-md font-bold text-foreground`, subtitle *"Seleccioná un día hábil para ver los
  turnos disponibles."* in `text-body-sm text-fg-secondary`.
- Inner month block: `mt-md max-w-[34rem] rounded-xl bg-background p-md`, headed by
  `h3` in `mb-md whitespace-nowrap text-title-md font-semibold sm:text-headline-sm`.
- Weekday row: `grid grid-cols-7 gap-1 text-center text-[13px] font-semibold
  text-fg-secondary`, labels *Lun Mar Mié Jue Vie* and *Sáb Dom* in `text-placeholder`.
- Day grid: `grid grid-cols-7 gap-1.5 text-center`, 42 `div`s with `h-11` and
  `flex-col items-center justify-center rounded-lg text-label-md`. Adjacent-month days are
  `text-placeholder/50`; past days and weekends are `text-placeholder`; available days are
  `bg-surface-subtle/60 font-semibold text-primary` with a `mt-0.5 size-1.5 rounded-full
  bg-primary` dot.

**Page** — the async function inside `<Suspense>` becomes `BookingContent`, awaits
`connection()`, resolves the slug and renders `<ProfessionalSummary>` plus
`<BookingCalendar today={todayKey()} />`. The shell (booking header + step rail) is
unchanged, so `/reservar` keeps its partial prerender.

## Specification — B2b (implemented)

`BookingScheduler` (client) owns `selectedDate` and renders the step 2 card:
`rounded-xl bg-card p-md shadow-card md:p-lg` with the step badge (*"2"*) and the
*"Elegí fecha y horario disponible"* heading. `BookingCalendar` becomes a client component
and the month block only — it no longer renders the card — and receives `today`, `value` and
`onChange`.

- Month heading plus two 32/36px buttons (`ChevronLeft` / `ChevronRight`,
  `aria-label="Mes anterior"` / `"Mes siguiente"`) that move `view` through `shiftMonth`.
  Back is disabled while the view is the current month
  (`disabled:cursor-not-allowed disabled:opacity-40`).
- Available days become `button`s: `disabled` on past days, weekends and adjacent months;
  `aria-label` from `formatLongDate` (*"Jueves, 15 de octubre de 2026"*); `aria-pressed`
  only on the selectable ones; `hover:bg-surface-subtle` on the available fill; the selected
  day takes `bg-primary text-primary-foreground shadow-card` and shows *"Elegido"* from `sm`
  up instead of the availability dot.

## Specification — B2c (implemented)

`daySchedule(key)` joins the model: Monday-to-Friday slots every 30 minutes, 09:00–12:30 and
15:00–19:00 (17 per day: eight in the morning, nine in the afternoon), with a slot marked
taken when `(day + slot index) % 3 === 0` — a deterministic stand-in, not business logic.
`BookingSlots` renders the picked day's groups — *"Turno Mañana (09:00 - 13:00 hs)"* and
*"Turno Tarde (15:00 - 19:30 hs)"*, the windows the export prints — with available, taken
(`line-through` on the time, *"(No disp.)"* from `sm` up) and selected states, plus the
*"N horarios libres"* count. The heading reads *"Horarios para el miércoles 11 de
noviembre"*: `formatDayMonth` keeps the weekday lowercase and drops the year, which the
calendar already shows. `BookingScheduler` gains `selectedTime` and resets it when the date
changes.

## Specification — B2d (after B2c)

`BookingSummary` shows the doctor snapshot, the formatted date, the time with a *Mañana* /
*Tarde* tag, and the office with the app's address. Coverage, patient and price wait for
B3/B4. Below `lg` the summary stacks after the slots, not sticky.

## Acceptance criteria — B2a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0.
- `/reservar` still builds as Partial Prerender.
- `/reservar?profesional=sofia-ramirez` renders the calendar headed by the current month.
- Past days, weekends and adjacent-month days render dimmed and without the availability
  dot; today and the future weekdays render with the dot and the primary tint.
- CDP probe at 320 / 390 / 768 / 1280 with `mobile:false`: no horizontal overflow and
  `documentElement.scrollWidth <= innerWidth`; screenshots reviewed.

## Acceptance criteria — B2b

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/reservar` stays Partial
  Prerender.
- The previous-month control is disabled on the current month; both controls move the
  heading (`Noviembre 2026` → `Diciembre 2026` and back) and enable back once away from it.
- Clicking an available day marks only it (`aria-pressed="true"`, count 1) and shows
  *"Elegido"* from `sm` up; clicking another day moves the mark.
- Past days, weekends and adjacent-month days stay `disabled`.
- CDP probe at 320 / 390 / 768 / 1280 with `mobile:false`: no overflow, empty console.

## Acceptance criteria — B2c

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/reservar` stays Partial
  Prerender.
- No slot grid renders until a day is picked; picking day 10 of November 2026 shows 17 slots
  (five taken) and *"12 horarios libres"*; picking day 11 shows *"11 horarios libres"*.
- Taken slots are `disabled` and struck; picking a free slot marks exactly one
  (`aria-pressed="true"`); picking another day clears the time.
- CDP probe at 320 / 390 / 768 / 1280 with `mobile:false`: no overflow, empty console.
