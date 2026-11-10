# Stage P — Secretary panel

**Branch:** `feat/secretary-panel`
**Status:** roadmap approved, P1 in progress
**Depends on:** `main` at `c8219a1` (B5c)

## Objective

Build the panel behind the sign-in: a shell with the sidebar and top bar, then the dashboard,
the agenda, the patient directory and the professional roster. The public site and the sign-in
already exist; this is the staff-facing half of the product.

## The design

`docs/stitch_centro_m_dico_aurora_web/` holds five exports:

| Export | What it is | Decision |
| --- | --- | --- |
| `panel_secretar_a_inicio_dashboard` | Dashboard at 1280 | The dashboard base |
| `panel_secretar_a_inicio_dashboard_1440px` | Same dashboard at 1440, other fixtures and a sede info card | Discarded: one responsive dashboard, not two |
| `panel_secretar_a_agenda_y_nuevo_turno` | Weekly calendar plus the "new turno" modal | Grid and filters; the modal waits for a backend |
| `panel_secretar_a_pacientes_y_ficha_cl_nica` | Directory and clinical record | Directory and read-only tabs; notes and edits wait |
| `panel_secretar_a_profesionales_y_horarios` | Roster with schedules and rooms | Cards and rooms; live presence and the alta modal stay out |

The shell is identical in all five: a sidebar with `Inicio`, `Agenda`, `Pacientes`,
`Profesionales`, `Configuración`, and a top bar with a search field, a notification bell and the
signed-in user. `Configuración` has no screen in the design, so it is not shipped.

## Principles

**No live claims.** The exports sell real time: *"El consultorio se encuentra activo"*,
*"Sincronización en tiempo real"*, *"Base actualizada"*, *"Atendiendo en consultorio"* with
`animate-ping`, *"monitoreo de presencia en tiempo real"*. With fixtures none of that is true, so
none of it ships.

**No invented numbers.** Every counter is derived from the fixture dataset (`turnos.filter(...)`),
not typed into the markup. If a card cannot be derived, the card does not exist.

**No writes.** Saving a turno, marking a patient present, blocking a schedule, saving a note or
registering a professional all end in an `alert('… con éxito')` over nothing. Those actions wait
for the backend instead of pretending.

**No fake identity.** The sign-in does not authenticate, so the top bar does not invent a user:
it carries `Modo demo` and a link back to `/ingreso`.

**Fixtures are demonstration data, and the panel says so.** A single shared module feeds every
screen, so the dashboard, the agenda and the directory cannot disagree about a patient.

## Roadmap

| Stage | Content | Est. |
| --- | --- | --- |
| **P1** | `(panel)` shell with sidebar and top bar, `/panel` head, date line | ~180 |
| **P2** | Fixture module, derivations and the four KPI cards | ~155 |
| **P3** | Turnos table with status badges and the five filter tabs | ~165 |
| **P4** | Agenda toolbar and the weekly grid | ~170 |
| **P5** | Agenda filters: professional, specialty, room and legend | ~90 |
| **P6** | Patient directory with search and coverage chips | ~180 |
| **P7** | Patient record: header, actions and the Historial / Datos tabs | ~170 |
| **P8** | Professional roster with schedules, rooms and specialty chips | ~190 |

Everything the design still shows after P8 — the three modals, the notes tab, the live statuses,
the billing card — needs a real API. It is planned when the backend exists.

## Scope — P1

| File | Change |
| --- | --- |
| `frontend/src/app/(panel)/layout.tsx` | New — sidebar, top bar and content frame |
| `frontend/src/components/secretary/panel-sidebar.tsx` | New — brand, section list and sede |
| `frontend/src/components/secretary/panel-topbar.tsx` | New — demo chip, scope and way back |
| `frontend/src/app/(panel)/panel/page.tsx` | Moved from `(admin)`, now the dashboard head |
| `frontend/src/app/(admin)/panel/page.tsx` | Deleted — the stub it replaces |
| `docs/plans/secretary-panel.md` | New — this plan |

## Specification — P1

**Route group.** The shell lives in `(panel)`, so `/ingreso` keeps the centered `(admin)` layout
and the sign-in never shows a sidebar.

**Shell.** `flex min-h-dvh flex-col bg-background lg:flex-row`: the sidebar and, beside it, a
column with the top bar and `<main>` (`flex-1 px-gutter-mobile py-lg md:px-gutter`).

**Sidebar.** White card surface, `border-b` on small screens and `lg:sticky lg:h-dvh lg:w-[17rem]
lg:border-r`. Brand block: `size-10` tile in `bg-primary` with `Hospital`, *"Centro Aurora"* in
`text-title-md font-bold` and *"Secretaría Médica"* in `text-label-sm text-fg-secondary`. Below it
the sections as a row that scrolls horizontally on small screens and a column from `lg`. Each item
is a `Link` with its icon when the section exists, and an `aria-disabled` span with reduced
opacity and `title="Llega en una próxima etapa"` when it does not. Active detection with
`usePathname`, also matching nested paths. Footer: *"Sede Nueva Córdoba"*, hidden below `lg`.

**Top bar.** `Modo demo` chip with the static dot, then *"Recepción & Secretaría"* (hidden below
`sm`) and a `Volver al ingreso` link to `/ingreso`. No search field and no bell: there is nothing
to search or notify yet.

**Dashboard head.** The date line, computed per request: the page awaits `connection()` inside a
`Suspense` boundary, so the static shell never freezes a build date and the server and the client
cannot disagree. Then the `h1` *"Buen día"* — no name, because nobody signed in — and the subtitle
*"Resumen de la actividad de la sede. Datos de demostración: todavía no hay backend que los
actualice."*

## Acceptance criteria — P1

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/panel` builds as a partial
  prerender (the date line reads request time) and `/ingreso` keeps its centered layout with no
  sidebar or top bar.
- `/panel` shows the sidebar with the four sections, `Inicio` marked as current, and
  `Configuración` absent.
- Unbuilt sections are not links: they have `aria-disabled="true"` and no `href`, so clicking
  them cannot reach a 404.
- The top bar shows the demo chip and the link back to `/ingreso`; no user name, no bell, no
  search field.
- The date line renders the current date in Spanish per request and never a build-time date.
- No "en tiempo real", "Base actualizada" or live-presence string exists.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no horizontal overflow, empty
  console, `/panel` reachable from `/ingreso` and back.
