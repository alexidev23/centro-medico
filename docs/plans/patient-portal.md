# Stage PA — Patient portal

**Branch:** `feat/patient-portal`
**Status:** PA-1a shipped (`d9ca69e`), PA-1b shipped (`ced0ccc`), PA-2 shipped (`e4afe73`), PA-3 shipped (`e3636f2`), PA-4 split and shipped, PA-5a shipped
**Depends on:** `main` at `4d1bda4` (P8-iv)

## Objective

Give the patient a place of their own: the header's person icon leads to a session, and behind it
the patient sees their turnos, their recetas and their monthly billing. Four stages, one per
delivery: **PA-1 la puerta**, **PA-2 turnos**, **PA-3 recetas**, **PA-4 facturación**.

## There is no design for this

`docs/stitch_centro_m_dico_aurora_web/` has fourteen exports: the public site, the booking flow, the
sign-in and the four secretary screens. **None of them is a patient portal.** Every earlier stage
started from an export; this one cannot. Its surface is defined with the existing tokens and the
secretary sign-in's visual language, and that deviation is approved as such.

## Principles

**The session is a demo, and says so.** There is no auth in this project: `/ingreso` only calls
`router.push("/panel")`. The portal's session is a cookie naming one fixture patient. It is not a
security boundary, so **the sign-in has no password field** — a password that validates nothing is
a worse lie than no password at all.

**Nothing promises what the product cannot open.** A section appears only when it has real content.
No empty tabs, no "próximamente" placeholders.

**Recetas and facturación have no data.** They are the only sections that must be invented, and
they arrive as demo fixtures behind a visible "Modo demo" label, never buried in a footer.

## Scope — PA-1a

| Stage | File | Change |
| --- | --- | --- |
| PA-1a | `frontend/src/lib/portal/sesion.ts` | **New**: the cookie name and `pacienteActual()` |
| PA-1a | `frontend/src/lib/portal/acciones.ts` | **New**: `entrar` and `salir` Server Actions |
| PA-1a | `frontend/src/components/portal/patient-login.tsx` | **New**: the demo sign-in, no password |
| PA-1a | `frontend/src/app/(portal)/portal/ingreso/page.tsx` | **New**: the sign-in screen |
| PA-1a | `frontend/src/app/(portal)/portal/page.tsx` | **New**: the portal, with the guard |

## Specification — PA-1a

**The guard works both ways.** `/portal` without a session redirects to `/portal/ingreso`; with a
session, `/portal/ingreso` redirects to `/portal`. The destination lives in one place: whatever
links to the portal points at `/portal`, and the guard decides.

**The cookie is a demo session.** `aurora_paciente` carries a fixture patient id, is `httpOnly` and
`sameSite=lax`, and lasts eight hours. The client cannot read it or rewrite it. `entrar` accepts
only an id that exists in `pacientes`; anything else sends the visitor back to the sign-in.

**The sign-in asks who you are, not for a password.** One `select` with the nine fixture patients
(`Nombre — DNI 12.345.678`) and a button. The screen says, in the card itself, that this is a demo,
that there is no password and that there are no real data.

**The portal greets the patient by name.** The heading is `Hola, {nombre}`, and one line carries the
full name, the document and the coverage derived with `coberturaDe()`. A closing note repeats the
demo label. No turnos, no tabs: they are PA-1b and PA-2.

**Both pages block instead of prerendering a shell.** They are user-specific from the first byte, so
they export `instant = false`; there is no shared markup worth streaming before the cookie is read.

## Acceptance criteria — PA-1a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/portal` and `/portal/ingreso` are
  dynamic (ƒ), not partial prerenders.
- `/portal` without a cookie lands on `/portal/ingreso`; the screen shows `Modo demo`, nine patients
  and no password field.
- Entering as Ana Lucero lands on `/portal`, which reads `Hola, Ana`, `28.442.119` and `OSDE 210`.
- The cookie is not readable from `document.cookie`; a reload keeps the session; `/portal/ingreso`
  with a session returns to `/portal`.
- `Salir` returns to `/`, and `/portal` sends the visitor back to the sign-in.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280 on both screens; console clean.

## Next — PA-1b (the portal as a place)

The header icon becomes a `Link` to `/portal` (in mobile it is hidden, so the drawer also gets a
"Mi portal" entry); a shared shell carries the brand and `Salir`; and the portal page gains the
identity card and the real próximo turno derived from `pacientesDelPadron()`. ~90 lines.

## Scope — PA-1b

| Stage | File | Change |
| --- | --- | --- |
| PA-1b | `frontend/src/app/(portal)/layout.tsx` | **New**: the shell — brand, `Salir`, the page container |
| PA-1b | `frontend/src/app/(portal)/portal/page.tsx` | The identity card and the próximo turno card |
| PA-1b | `frontend/src/app/(portal)/portal/ingreso/page.tsx` | Drops its own container: the shell owns it |
| PA-1b | `frontend/src/components/layout/site-header.tsx` | The dead person button becomes a link |
| PA-1b | `frontend/src/components/layout/site-drawer.tsx` | A "Mi portal" entry, since the icon is hidden on mobile |

## Specification — PA-1b

**The door is where the patient looks for it.** The header icon is an `<a href="/portal">`, not a
button without a handler; on mobile it is `hidden sm:flex`, so the drawer carries the same
destination. Both point at `/portal` and let the guard decide, so the destination exists once.

**The shell belongs to the whole group.** One header with the brand (a link home) and `Salir`, shown
only when there is a session — the sign-in screen must not offer to leave a session it does not
have. One `<main>` container, so the sign-in stays vertically centred inside it.

**The portal carries the patient's real data.** Two cards: the identity (`Nombre`, `Documento`,
`Cobertura` via `coberturaDe()`, `Email`) and the próximo turno, taken from
`pacientesDelPadron()`, the same derivation the secretary directory uses. It prints the long date,
the hour and professional, the specialty, the room and the reason, with the existing `StatusBadge`.
When there is none, it says so instead of printing an empty card.

## Acceptance criteria — PA-1b

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; both portal routes stay dynamic.
- On `/`, the person icon is an `a[href="/portal"]`, visible at 1280 and hidden at 390; the drawer
  lists "Mi portal" pointing at `/portal`.
- The sign-in renders inside the shell with the brand and without `Salir`.
- As Ana Lucero, `/portal` reads `Hola, Ana`, `Tus datos` with her document, `OSDE 210` and her
  email, and `Tu próximo turno` with `Jueves 12 de noviembre`, `12:30 hs · Dr. Ignacio Paz`,
  `Dermatología · Consultorio 3 · Primera consulta` and the `Pendiente` badge.
- `Salir` returns to `/`, and `/portal` sends the visitor back to the sign-in.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280 on both screens; console clean.

## Scope — PA-2

| Stage | File | Change |
| --- | --- | --- |
| PA-2 | `frontend/src/lib/secretary/demo-data.ts` | **New**: `turnosDelPaciente()` and `TurnoDelPaciente` |
| PA-2 | `frontend/src/app/(portal)/portal/page.tsx` | `También tenés` and `Historial de turnos`, over a shared list |

## Specification — PA-2

**The state says whether a turno happened; the weekday only says which day.** The fixtures are one
repeating week written without a calendar, so a date-only split would print `Sábado 14 · Atendido` as
if it were ahead and `Martes 17 · Pendiente` as if it were behind. `turnosDelPaciente()` therefore
places `atendido` and `cancelado` at their most recent past occurrence and `pendiente`, `confirmado`
and `en-sala` at their next one, both relative to today, and sorts ascending by date and hour.

**The next turno is one card; the rest are a list.** The próximo turno keeps the PA-1b card. Every
other upcoming turno goes under `También tenés`, sharing one row component with the history: date and
hour, professional, specialty, room, reason and the `StatusBadge`.

**The history reads newest first.** That is the order a patient looks for, so `turnosDelPaciente()`'s
ascending order is reversed for the history only. The section states in one line that the history
covers a week of test data.

**An empty section does not render.** `También tenés` and `Historial de turnos` appear only when they
have rows; a patient without turnos keeps the `No tenés turnos agendados.` line and nothing else.

## Acceptance criteria — PA-2

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; both portal routes stay dynamic.
- As Ana Lucero: `Tu próximo turno` reads `Jueves 12 de noviembre`, `12:30 hs · Dr. Ignacio Paz`;
  `También tenés` lists `Lun 16 nov, 12:00 hs` and `Mar 17 nov, 12:00 hs`; `Historial de turnos` lists
  `Lun 9 nov, 08:00 hs` then `Sáb 7 nov, 11:00 hs`, newest first, both `Atendido`.
- The history never prints a future date and `También tenés` never prints a past one.
- As Hernán Ruiz: the próximo turno reads `En sala` and there is no history section.
- As Irene Salas: `No tenés turnos agendados.`, with neither of the two new sections.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280; console clean.

## Scope — PA-3

| Stage | File | Change |
| --- | --- | --- |
| PA-3 | `frontend/src/lib/secretary/demo-data.ts` | **New**: `Receta`, `Medicamento`, the `recetas` fixture and `recetasDelPaciente()` |
| PA-3 | `frontend/src/app/(portal)/portal/page.tsx` | The `Tus recetas` section, after the history |

## Specification — PA-3

**A receta hangs from the consultation that emitted it, and has no date of its own.** Each fixture
entry carries a `turnoId`; the date and the professional come from `turnosDelPaciente()`, the same
placement PA-2 established. A receta whose turno is not `atendido` — pending, confirmed, in room or
cancelled — is not shown, so the section can never date a receta in the future.

**The section says what it is.** Under the heading, one fixed line: `Emitidas en la demo: no tienen
validez médica.` A fake prescription is the most dangerous invented content in this product, and a
label the patient can only find in a footer is not a label.

**Nothing promises a document.** There is no download, print or send control: there is no file
behind them, and a control that cannot open anything is the defect this portal keeps refusing.

**Each receta reads like the paper it imitates.** Date and hour, the professional, the specialty and
the consultation reason, `M.P. {matricula}`, then the medicamentos — name in bold, the indication
under it — and the general indications. Newest first, like the history.

**No content, no section.** A patient without attended consultations does not see `Tus recetas`; the
empty case is silence, not an empty card.

## Acceptance criteria — PA-3

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; both portal routes stay dynamic.
- As Ana Lucero: `Tus recetas` lists `Lun 9 nov, 08:00 hs` with `Ibuprofeno 400 mg` and
  `Paracetamol 500 mg`, then `Sáb 7 nov, 11:00 hs` with `Vitamina D 25.000 UI`; both read
  `M.P. 34.892`, `Dra. Lucía Ferrero · Clínica médica · Control anual` and the demo line.
- No receta prints a future date, and every receta's date matches a turno in the history.
- As Hernán Vega and Irene Salas: no `Tus recetas` section.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280; console clean.

## Scope — PA-4a

| Stage | File | Change |
| --- | --- | --- |
| PA-4a | `frontend/src/lib/secretary/demo-data.ts` | **New**: the tariffs, `TurnoFacturado`, `MesFacturado`, `pesos()` and `facturacionDelPaciente()` |

## Specification — PA-4a

**The bill is arithmetic over data that already exists.** The monthly view was chosen over issued
invoices because an invoice promises a document; a monthly summary is derived from the attended
consultations, the provider's coverage and a tariff, and invents nothing beyond the numbers.

**Only what happened is billed.** The source is `turnosDelPaciente()` filtered to `atendido`, so a
pending, confirmed, in-room or cancelled consultation never reaches a bill, and no bill can be dated
ahead of today. The group key is the month of the turno's placed date, newest month first.

**The tariff lives with the fixtures.** A default honorario per professional, keyed by id — 10.000
Pediatría up to 20.000 Traumatología — and a fixed coseguro per provider: OSDE 4.500, Swiss Medical
4.000, Apross 3.000, PAMI 0. A provider missing from that table has no coverage: the patient pays the
whole honorario, and `cobertura` comes back `null` instead of pretending otherwise.

**Money is formatted on the server.** `pesos()` wraps one `Intl.NumberFormat` for `es-AR`/`ARS`
without decimals, so the browser's timezone and locale cannot change an amount.

## Acceptance criteria — PA-4a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0.
- As Ana Lucero: one month, `Noviembre de 2026`, two consultas, `$ 9.000 a cargo` in total and
  `Cubierto por OSDE 210: $ 15.000`.
- As Carla Domínguez (Particular): `$ 22.000 a cargo` in total and `cobertura` `null`.
- No month contains a turno that has not happened.

## Scope — PA-4b

| Stage | File | Change |
| --- | --- | --- |
| PA-4b | `frontend/src/app/(portal)/portal/page.tsx` | The `Facturación` section, after the recetas |

## Specification — PA-4b

**Each month is a statement.** The month and its consultation count, one row per consultation with
what the patient owes and what the coverage paid, and a closing block with the month's total and the
provider that covered it — or `Sin cobertura: el honorario completo queda a tu cargo.` A row only
shows the covered amount when it is above zero, so a particular patient does not read `$ 0 cubierto`.

**The section says what it is.** Under the heading, fixed: `Montos de demo: no son importes reales ni
un comprobante de pago.` No download, print or pay control: there is no receipt behind them.

**No coverage, no section.** A patient without attended consultations does not see `Facturación`.

## Acceptance criteria — PA-4b

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; both portal routes stay dynamic.
- As Ana Lucero: `Facturación` with the demo line, `Noviembre de 2026`, `2 consultas`, two rows of
  `$ 4.500 a cargo` and `$ 7.500 cubierto`, and `Total del mes: $ 9.000 a cargo` /
  `Cubierto por OSDE 210: $ 15.000`.
- As Carla Domínguez: `Sin cobertura: el honorario completo queda a tu cargo.`, no covered amount.
- As Hernán Vega and Irene Salas: no `Facturación` section.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280; console clean.

## Next — PA-5 to PA-9 (the portal as navigation)

The patient asked (2026-11-12) for a header with tabs, one thing per tab, and a home that shows only
updates: what to pay this month, the próximo turno, and any cancelled turno near today. Tabs are
**routes**, not client state, so each one has a URL, the back button works, and it reads the session
on the server. The plan splits into five stages because moving a section counts its lines twice:

| Stage | Deliverable |
| --- | --- |
| PA-5a | `/portal/turnos`, and the home drops the turnos sections |
| PA-5b | The header's tab bar, starting with `Inicio` and `Turnos` |
| PA-5c | `/portal/recetas` |
| PA-5d | `/portal/facturacion`, with the coverage heading `Cuenta` |
| PA-5e | The home as a board: próximo turno, month to pay, cancellations |

The nav lists only tabs that exist, so no stage ships an empty tab.

## Scope — PA-5a

| Stage | File | Change |
| --- | --- | --- |
| PA-5a | `frontend/src/app/(portal)/portal/turnos/page.tsx` | **New**: próximos + historial, moved out of the home |
| PA-5a | `frontend/src/components/portal/demo-note.tsx` | **New**: the closing demo label, written once |
| PA-5a | `frontend/src/app/(portal)/portal/page.tsx` | Drops the turnos sections and the row list; the próximo card links to the page |

## Specification — PA-5a

**The turnos get their own address.** `/portal/turnos` carries the próximos and the history that
used to sit under the próximo card, with the same rows, the same badges and the same order; the page
guards itself like every portal page.

**The home stops being an archive.** It keeps the greeting, the identity card, the próximo turno,
the recetas and the facturación, and its próximo card links to `/portal/turnos` so the new page is
never reachable only by typing the URL. The tab bar arrives in PA-5b; until then the link is the way in.

**The demo label is written once.** `DemoNote` replaces the copy that each page would otherwise
repeat, so the portal says the same thing on every tab.

## Acceptance criteria — PA-5a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/portal/turnos` is dynamic (ƒ).
- Without a session, `/portal/turnos` lands on `/portal/ingreso`.
- The home no longer prints `Historial de turnos` or `También tenés`; it still prints `Tus recetas`
  and `Facturación`, and its `Ver todos tus turnos` link points at `/portal/turnos`.
- As Ana Lucero, `/portal/turnos` lists `Jue 12 nov, 12:30 hs`, `Lun 16 nov, 12:00 hs` and
  `Mar 17 nov, 12:00 hs`, then the history `Lun 9 nov` before `Sáb 7 nov`.
- As Irene Salas, `/portal/turnos` says `No tenés turnos agendados.` and shows no history.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280; console clean.

## Scope — PA-5b

| Stage | File | Change |
| --- | --- | --- |
| PA-5b | `frontend/src/components/portal/portal-nav.tsx` | **New**: the tab bar, as links with the active tab marked |
| PA-5b | `frontend/src/app/(portal)/layout.tsx` | Renders the nav under the brand, only when there is a session |

## Specification — PA-5b

**Tabs are routes, and the active one is the current path.** `PortalNav` is a client component only
because it needs `usePathname` to mark the current tab with `aria-current="page"`; every tab is a
`Link`, so each has a URL, the back button works and the server still renders the page.

**The nav appears only with a session.** It hangs from the shell, and the shell only paints it when
`pacienteActual()` found a patient, so the sign-in screen has no tabs to press. It grows one tab per
stage: `Inicio` and `Turnos` now, the rest as their pages land, because a tab without a page is the
same lie as a button without a handler.

**The active tab is styled without `cn()`.** The base classes and the active/inactive ones are
concatenated by hand: `cn()` would read `text-label-md` as a colour and silently drop the size.

## Acceptance criteria — PA-5b

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0.
- With a session, every portal page shows the tab bar with `Inicio` and `Turnos`; the current one
  carries `aria-current="page"` and the primary colour.
- `/portal/ingreso` shows no tab bar.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280; console clean.

## Scope — PA-5c

| Stage | File | Change |
| --- | --- | --- |
| PA-5c | `frontend/src/app/(portal)/portal/recetas/page.tsx` | **New**: the recetas page, moved out of the home |
| PA-5c | `frontend/src/app/(portal)/portal/page.tsx` | Drops the recetas section |
| PA-5c | `frontend/src/components/portal/portal-nav.tsx` | Adds the `Recetas` tab |

## Specification — PA-5c

**The recetas get an address and a voice of their own.** One card per receta, as before, with the
page heading saying what the list is: `Una por cada consulta atendida. Emitidas en la demo: no tienen
validez médica.` The per-section note disappears because the page already carries it once.

**The empty case is a sentence, not a card.** A patient without attended consultations reads
`Todavía no tenés recetas: aparecen acá cuando una consulta deja una.` Nothing renders a blank list.

## Acceptance criteria — PA-5c

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/portal/recetas` is dynamic (ƒ).
- As Ana Lucero, `/portal/recetas` lists both recetas, newest first, with `M.P. 34.892` and the demo
  line; the home no longer prints `Tus recetas`.
- As Irene Salas, `/portal/recetas` reads the empty sentence.
- The tab bar lists `Inicio`, `Turnos` and `Recetas`, and marks the current one.
- No horizontal overflow at 320 / 390 / 768 / 1024 / 1280; console clean.


