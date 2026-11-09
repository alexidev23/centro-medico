# Stage B4 — Booking confirmation

**Branch:** `feat/booking-confirmation`
**Status:** B4a implemented, B4b pending
**Depends on:** `main` at `e9d1a04` (B3d)

## Objective

Close the flow: the visitor confirms the appointment and sees it, with the data they typed,
on the same page. This is the last screen of `/reservar` before the backend exists.

## Decisions

### The confirmation says only what the app can back up

The export (`turno_confirmado_centro_m_dico_aurora/code.html`) assumes a backend that issues
a booking code, sends WhatsApp and email, generates a PDF and a calendar file, and renders a
check-in QR. **None of that exists**, and printing it in a medical product tells the patient
something false — the same rule B3 followed with *"Padrón Aurora OK"*.

| The export shows | B4 ships |
| --- | --- |
| *"Código único de reserva: #AUR-84920"* and its copy button | **No** — nothing issues it |
| *"Te enviamos los detalles y el recordatorio por WhatsApp y correo electrónico."* | A note that says the data stays on screen and nothing was sent or stored |
| PDF, *"Agregar al calendario"*, QR check-in pass | **No** — those integrations do not exist |
| *"Mis Turnos"* link | **No** — there is no patient area |
| *"Plan 210"* and *"Credencial N° 210-948102-01"* | The coverage and affiliate the visitor typed |
| *"Av. Hipólito Yrigoyen 320"* | The app's address: `Av. Hipólito Yrigoyen 480` |
| *"Asistencia por WhatsApp"* | **Yes**, with the app's real number `+54 9 351 522-8900` |
| *"Volver al inicio"* | **Yes** |

Refreshing loses the booking because it lives in client memory. That is a frontend demo, and
the note says so.

### Confirmation is an in-page state, not a route

`BookingFlow` gains `confirmed`. Confirming swaps the two-column grid for the confirmation
view and moves the rail to step 4; the URL stays `/reservar` and no history entry is created.
A separate route would need the booking in the URL or in storage, and neither exists yet.

### One gate, one place

The *"Confirmar turno"* CTA lives in the summary card, where the export puts it, and stays
`disabled` until every required field has a value and the consent is checked. The gate is
computed in `BookingSummary`, which already receives the draft; `BookingFlow` only owns the
`confirmed` state and the `onConfirm` callback.

A disabled control with no explanation is a dead end, so the summary shows one line while the
gate is closed: *"Completá los datos obligatorios y aceptá los términos para confirmar."*

### Two headings, one `h1`

`BookingStepper` already renders the page `h1` (*"Sacá tu turno con nuestros especialistas"*)
on every step. The confirmation title is therefore an `h2` styled as `text-headline-lg`, so
the page keeps a single `h1`.

### No pulsing badge

The export animates the check badge with `animate-ping`, an infinite loop. A static layered
badge reads the same and does not keep moving in a medical product.

### B4 is two stages

| Stage | Content | Est. |
| --- | --- | --- |
| **B4a** | CTA + gate in the summary, `confirmed` state, rail to step 4, confirmation header (badge, title, honest note, professional card with date/time/office/address) | ~130 |
| **B4b** | Patient and coverage bento, day instructions, final actions (real WhatsApp + back home) | ~110 |

## Scope — B4a

| File | Change |
| --- | --- |
| `frontend/src/components/booking/booking-summary.tsx` | Adds the *"Confirmar turno"* CTA, the completeness gate and its hint |
| `frontend/src/components/booking/booking-confirmation.tsx` | New — confirmation header and professional card |
| `frontend/src/components/booking/booking-flow.tsx` | Owns `confirmed`; renders the confirmation view and moves the rail to step 4 |
| `docs/plans/reservar-confirmacion.md` | New — this plan |

## Specification — B4a

**Summary CTA** — after the `dl`, a `Button` (variant `primary`, `size="default"`) spanning the
card width: *"Confirmar turno"* followed by `ArrowRight` (`size-4`, `transition-transform
group-hover:translate-x-0.5`). It calls `onConfirm` and is `disabled` while
`date`, `time`, `name`, `dni`, `phone`, `email`, `insurance` or `accepted` is missing. While
disabled, a `text-[12px] text-fg-secondary` line under it reads *"Completá los datos
obligatorios y aceptá los términos para confirmar."*

**Confirmation view** — replaces the grid when `confirmed` is true: a single
`rounded-xl bg-card p-md shadow-card md:p-lg` card, `mx-auto w-full max-w-3xl`.

- Layered badge: an absolute `size-24 rounded-full bg-primary-subtle/60` behind a
  `size-20 rounded-full bg-primary text-primary-foreground shadow-card` holding a `Check`
  (`size-9`, `strokeWidth={3}`).
- `h2` *"¡Turno confirmado con éxito!"* in `text-headline-lg font-bold`.
- The honest note in `rounded-xl bg-surface-subtle p-sm text-body-sm text-fg-secondary`:
  *"Esta reserva queda solo en esta pantalla: todavía no se envía por WhatsApp ni por correo,
  y no se guardó en ningún sistema."*
- Professional card, `rounded-xl bg-background p-md`: the overline *"Profesional a cargo"* in
  uppercase, the pill *"Atención Presencial"* with a `size-2 bg-primary` dot, the photo
  (`size-16 rounded-xl object-cover`), the name in `text-title-md font-bold`, the specialty in
  `text-label-md font-semibold text-primary` and the licence in `text-body-sm text-fg-secondary`.
- Below it, two rows in the summary's rhythm: `CalendarDays` with `formatLongDate(date)` and
  *"Horario puntual: {time} hs"*; `MapPin` with `{professional.office} — Sede Central Aurora`
  and *"Av. Hipólito Yrigoyen 480, Nueva Córdoba, Córdoba"*.

**Flow** — `confirmed` starts `false`. `BookingStepper` receives
`confirmed ? 4 : date && time ? 3 : 2`. When `confirmed`, the grid is replaced by
`BookingConfirmation`; otherwise the grid renders exactly as B3 left it. The confirmation gets
`professional`, `date` and `time`; the patient draft joins in B4b with the bento that shows it.

## Acceptance criteria — B4a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/reservar` stays Partial
  Prerender.
- The CTA is disabled on arrival; it stays disabled while any required field is empty or the
  consent is unchecked, and the hint line is visible in those states.
- With every required field filled and the consent checked, the CTA is enabled; clicking it
  replaces the grid with the confirmation, moves the rail to *"Paso 4 · En curso"* /
  *"Paso 4 de 4: Confirmación 100% completado"*, and the URL is still `/reservar`.
- The confirmation shows *"¡Turno confirmado con éxito!"*, the honest note, the professional's
  name, specialty and licence, the long date, the picked time and *"Consultorio 3 — Sede
  Central Aurora"* with the app's address.
- No booking code, no PDF, no calendar, no QR, no *"Mis Turnos"*, no WhatsApp or email claim.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no overflow, empty console.

## Acceptance criteria — B4b

(to be written after B4a ships)
