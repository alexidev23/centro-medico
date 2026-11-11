# Stage PA — Patient portal

**Branch:** `feat/patient-portal`
**Status:** PA-1a shipped; PA-1b planned
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
