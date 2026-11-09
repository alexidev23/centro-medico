# Stage B3 — Patient data

**Branch:** `feat/booking-patient`
**Status:** B3a and B3b implemented, B3c–B3d pending
**Depends on:** `main` at `e53ad9d` (B2d)

## Objective

Open the step 3 card of the Stitch export: the form that registers who the appointment
belongs to. The visitor reaches it only after picking a date and a time, and what they type
feeds the live summary on the right.

## Decisions

### B3 is four stages

The first measurement bundled the rail with the identity card and reported 287
hand-authored lines: over the repository's 150–200 cap, partly because the card forced the
step 2 section into a new wrapper and git stopped pairing the moved file. The split follows
the measurement:

| Stage | Content | Measured |
| --- | --- | --- |
| **B3a** | The rail follows the pick: `BookingScheduler` becomes `BookingFlow`, owns the rail and derives the step | 130 |
| **B3b** | Field primitive, patient draft, step 3 card with the identity row | 168 |
| **B3c** | Contact row and coverage row | pending |
| **B3d** | Consultation reason, consent, and the summary rows | pending |

The rail goes first because it is a visible lie today: the page hardcodes `current={2}`, so
a visitor typing into step 3 still reads *"Paso 2 · En curso"*.

### No simulated validation

The export shows *"Válido"*, *"Padrón Aurora OK"*, *"Identidad validada con Historia Clínica"*
and a typo warning for `@gmaill.com`. None of that exists before the backend, and stating it
in a medical product tells the patient something false. The form ships real browser
constraints instead: `required`, `type="email"`, `inputMode="numeric"`, `autoComplete`, and
the required asterisks the export uses.

### What the export shows and B3 does not ship

- The price box (*"$ 0,00"*, *"100% Cubierto"*): the centre cannot compute an arancel yet.
  The confirmation stage decides it with the backend.
- The *"Confirmar turno"* button: it belongs to B4 with the confirmation screen. A button
  with no destination is worse than none.
- The urgent-care note: it repeats contact details with the export's wrong address (`320`)
  and claims a 24-hour guardia the app cannot back up.
- The terms links: the sentence stays, but as styled text, not anchors. Those pages do not
  exist.
- The DNI mask: the value is stored exactly as typed. Its format belongs to the backend.

### One state owner

The flow owns the three pieces of the booking — date, time and the patient draft. The
summary needs the patient and the rail needs the progress, so both live under the same client
boundary.

Moving the rail into `BookingFlow` costs the prerendered page heading: the shell keeps only
`<main>` and the heading arrives with the streamed content. `/reservar` stays Partial
Prerender. The alternative — a rail stuck on *"Paso 2 · En curso"* while the visitor types
into step 3 — is a visible lie.

### Patient draft

`PatientDraft` lives in `lib/booking-patient.ts`: `name`, `dni`, `phone`, `email`,
`insurance`, `affiliate`, `reason`, `accepted`. Every value starts empty; `insurance` starts
empty too, so the select asks for the coverage instead of pre-selecting one.

## Scope — B3a

| File | Change |
| --- | --- |
| `frontend/src/components/booking/booking-flow.tsx` | Renamed from `booking-scheduler.tsx` — renders the rail and derives the step |
| `frontend/src/app/(booking)/reservar/page.tsx` | Renders `BookingFlow`; the rail leaves the shell |
| `docs/plans/reservar-paciente.md` | New — this plan |

## Specification — B3a

`BookingScheduler` keeps its state and its grid verbatim; it becomes `BookingFlow` and returns
a fragment: `BookingStepper` followed by the 12-column grid. The step is derived —
`date && time ? 3 : 2` — so the rail marks step 2 as done and step 3 as current only once
both picks exist.

`ReservarPage` keeps only `<main>` and the `<Suspense fallback={null}>`; `BookingContent`
renders `<ProfessionalSummary>` and `<BookingFlow>`. The rail no longer lives in the shell.

## Acceptance criteria — B3a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/reservar` stays Partial
  Prerender.
- The rail reads *"Paso 2 · En curso"* before a time is picked and *"Paso 3 · En curso"*
  after, with step 2 marked done.
- The mobile progress bar reads *"Paso 3 de 4: Tus datos"* and 75 %.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no overflow, empty console.

## Scope — B3b

| File | Change |
| --- | --- |
| `frontend/src/lib/booking-patient.ts` | New — `PatientDraft` and `EMPTY_PATIENT` |
| `frontend/src/components/booking/booking-field.tsx` | New — label, required mark, hint and icon adornment |
| `frontend/src/components/booking/booking-patient.tsx` | New — step 3 card with the identity row |
| `frontend/src/components/booking/booking-flow.tsx` | Owns the patient draft and renders the card in the left column |

## Specification — B3b

`BookingField` takes `id`, `label`, `required`, `hint`, `icon` and `children`. The label sits
in `text-label-md font-semibold text-foreground` with the asterisk in `text-primary`; the
control lives in a `relative` wrapper whose `[&_input]:pr-11` leaves room for the adornment;
the icon is `size-5 text-fg-secondary`, pinned right, `pointer-events-none` and `aria-hidden`;
the hint reads in `text-[12px] text-fg-secondary`.

`BookingPatient` is the step 3 card: `rounded-xl bg-card p-md shadow-card md:p-lg`, the step
badge *"3"* in `bg-primary-subtle text-primary`, `h2` *"Datos del Paciente"* in
`text-title-md font-bold`, the subtitle *"Completá los datos para registrar la reserva
médica."*, and the chip *"Campos obligatorios \*"* in `bg-surface-subtle`. The identity row is
a `grid grid-cols-1 gap-md sm:grid-cols-2`: *"Nombre y Apellido"* (`autoComplete="name"`,
`User` icon) and *"DNI / Documento"* (`inputMode="numeric"`, `IdCard` icon), both `required`
and built on the shadcn `Input`. The value comes from the draft and every keystroke returns
the whole draft through `onChange`.

`BookingFlow` adds `patient` (`useState<PatientDraft>(EMPTY_PATIENT)`) and renders the card —
wrapped in a `lg:col-span-8` div — only when `date && time` are set. The summary column gains
explicit placement, `lg:col-start-9 lg:row-start-1 lg:row-span-2`, so it starts at the top of
the grid and stays sticky across both cards instead of dropping to the second row.

## Acceptance criteria — B3b

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/reservar` stays Partial
  Prerender.
- No step 3 card renders until a date and a time are picked; then it shows the badge *"3"*,
  *"Datos del Paciente"*, the subtitle, the *"Campos obligatorios \*"* chip and the two
  identity fields, each with its required mark and its icon.
- Typing in either field keeps the value across re-renders and leaves the summary untouched.
- From `lg` up the card sits directly under the step 2 card with the same width, and the
  summary starts level with the step 2 card (sticky at `top-24` across both); below `lg` the
  summary stacks after the card.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no overflow, empty console.
