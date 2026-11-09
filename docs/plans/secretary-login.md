# Stage B5 — Secretary sign-in

**Branch:** `feat/secretary-login`
**Status:** B5a and B5b shipped and merged into `main`; B5c on `feat/login-demo-credentials`
**Depends on:** `main` at `6cf64fd` (B4b)

## Objective

Open the door to the secretary panel: the public site's staff needs a sign-in screen before
the dashboard, the agenda and the patient records exist.

## Decisions

### A login cannot authenticate without a backend

The export (`inicio_de_sesi_n_secretar_a_escritorio/code.html`) resolves this by comparing the
input against `recepcion@centromedicoaurora.com.ar` / `demo2026` and painting *"Credenciales
validadas con éxito"* after 500 ms. The mobile export uses a different password,
`aurora2025`, for the same account. That is simulated validation around a hardcoded secret —
the exact thing B3 and B4 refused, and worse in a screen that claims security.

**The form validates shape, not identity.** It ships real browser constraints (`required`,
`type="email"`, `autoComplete="username"` / `"current-password"`) and submitting navigates to
`/panel` through a client handler that calls `preventDefault`, so the password never reaches
the URL and no credential is ever checked.

`/panel` is a stub that says the panel is not built yet. It is replaced by the dashboard
stage; until then it is the honest destination, not a fake session.

### What the export shows and B5 does not ship

| The export | B5 |
| --- | --- |
| Hardcoded credential check, success and error banners | **No** — nothing validates them |
| Demo credentials box and *"Autocompletar"* | **No** — meaningless without validation |
| *"Conexión cifrada"* / *"Conexión encriptada TLS 1.3"* | **No** — a claim we cannot back |
| *"Protocolo Ley 25.326"* seal | **No** — a legal claim on a demo with fixtures |
| *"Proyecto demo. Datos ficticios."* footer | **No** — the staff types real patient data |
| `alert()` in *"¿Olvidaste tu contraseña?"* | An inline disclosure with the same text |
| Address `320`, phone `555-0188` | `Av. Hipólito Yrigoyen 480` and `+54 351 522-8900` |
| *"Modo demo"* pill with `animate-pulse` | **Yes**, with a static dot |
| Email prefilled with the demo account | **No** — the fields start empty |

### One honest line

Under the CTA: *"Sin backend todavía: este ingreso no autentica, solo abre el panel de
demostración."* It replaces the credentials box and the fake banners with a single true
sentence.

### B5 is two stages

| Stage | Content | Est. |
| --- | --- | --- |
| **B5a** | Route, layout, card, identity, title, the two fields, the CTA and the `/panel` stub | ~140 |
| **B5b** | Remember device, password recovery, clinic metadata footer | ~90 |

## Scope — B5a

| File | Change |
| --- | --- |
| `frontend/src/app/(admin)/layout.tsx` | New — centered screen without the public header or footer |
| `frontend/src/app/(admin)/ingreso/page.tsx` | New — metadata and the sign-in card |
| `frontend/src/components/secretary/secretary-login.tsx` | New — card, identity, fields and CTA |
| `frontend/src/app/(admin)/panel/page.tsx` | New — stub that replaces the fake session |
| `docs/plans/secretary-login.md` | New — this plan |

## Specification — B5a

**Layout** — `<main>` with `min-h-dvh` centered content, `bg-background`, gutter padding. No
site header, no site footer, no mobile CTA bar.

**Card** — `relative w-full max-w-[28.75rem]`; two decorative orbs behind it
(`bg-primary-subtle/40 blur-3xl`), hidden below `sm` so they never widen a 320 px viewport. The
card itself is `rounded-xl bg-card px-md py-lg shadow-card md:px-lg md:py-xl`.

Inside, top to bottom: the *"Modo demo"* pill (`bg-surface-subtle text-primary`, `size-2`
static dot); the identity block (`size-12` tile in `bg-primary text-primary-foreground` with
`ShieldPlus`, *"Centro Médico Aurora"* in `text-headline-sm font-bold` and *"Gestión &
Secretaría Médica"* in `text-label-md text-primary`); the `h1` *"Ingreso a secretaría"* in
`text-headline-md font-bold` with the subtitle *"Acceso exclusivo para el personal de recepción
y administración clínica."*.

**Fields** — `label` row in `text-label-lg` with the right-hand note in
`text-label-sm text-fg-secondary` (*"Obligatorio"* / *"Sensible"*). Both controls are
`h-12 rounded-lg bg-surface-subtle pl-11` with a left icon (`Mail`, `KeyRound`, `size-5
text-fg-secondary`) and a `pr-4` (`pr-12` for the password). Focus paints `bg-card` and
`ring-[3px] ring-ring/15`. The password toggles between `password` and `text` with an
`Eye` / `EyeOff` button (`aria-label="Mostrar u ocultar contraseña"`, `aria-pressed`).

**CTA** — `Button type="submit"` in `w-full gap-xs`: *"Ingresar al sistema"* and `ArrowRight`.
`onSubmit` calls `preventDefault` and `router.push("/panel")`.

**Stub** — `/panel` renders a centered `rounded-xl bg-card` card titled *"Panel de secretaría"*
with *"Esta pantalla todavía no está construida."* and a `secondary` link back to `/ingreso`.

## Acceptance criteria — B5a

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0; `/ingreso` and `/panel` build
  as static routes.
- `/ingreso` shows no public header, no site footer and no mock CTA.
- The email field rejects an empty value and a malformed address; the password field rejects an
  empty value; submitting with a valid shape lands on `/panel` without any query string.
- No credential is compared, no success or error banner exists, and the honest line is visible.
- `/panel` says the panel is not built and links back to `/ingreso`.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no overflow, empty console.

## Specification — B5b

**Utility row** — between the last field and the CTA, `flex flex-wrap items-center justify-between
gap-x-sm gap-y-1` so the pair wraps instead of overflowing at 320 px. Left: a `<label>` for a
`type="checkbox"` named `remember`, checked by default as in the export, `size-5 accent-primary`,
with *"Recordar este equipo"* in `text-body-sm text-fg-secondary`. Right: a `type="button"` with
*"¿Olvidaste tu contraseña?"* in `text-label-md text-primary`. Both keep a 44 px touch target
(`min-h-11`).

**Recovery** — no `alert()`. The button toggles an inline disclosure, `aria-expanded` and
`aria-controls` included, rendered only while open, in `bg-surface-subtle`, with the export's
text: *"Para restablecer tu acceso administrativo, comunicate con soporte interno de IT
(int. 104) o coordiná la verificación con la jefatura médica."*

**Clinic metadata** — inside the card, after the form, separated by `border-t
border-surface-subtle` and centered: `Building2` plus *"Sede Nueva Córdoba"* in
`text-label-sm font-semibold`, then *"Av. Hipólito Yrigoyen 480 · Tel: +54 351 522-8900"* and
*"Horario de atención presencial: lunes a viernes de 07:30 a 20:30 hs."* in `text-body-sm
text-fg-secondary`. The address, phone and hours come from the app's own data, not the export's
`320` / `555-0188`.

## Acceptance criteria — B5b

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0.
- The utility row fits at 320 px without horizontal scroll, wrapping if it needs to.
- Toggling "¿Olvidaste tu contraseña?" shows and hides the inline note, and no browser dialog
  appears.
- The metadata footer shows Yrigoyen 480, +54 351 522-8900 and the landing hours; no TLS, Ley
  25.326 or "datos ficticios" string exists.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no overflow, empty console, and
  a filled submit still lands on `/panel` without a query string.

## B5c — Demo credentials

**Why.** The user asked for the test credentials to be visible, so the screen can actually be
tried. B5 dropped that box because nothing compared a credential; it comes back as a reference,
not as a gate.

**What changes.** A box inside the card, between the form and the clinic metadata:
*"Acceso de prueba"* with `recepcion@centromedicoaurora.com.ar` and `demo2026`. The honest line
under the CTA grows one clause, so the box cannot be read as a requirement: *"Sin backend
todavía: este ingreso no autentica y cualquier correo y clave abre el panel de demostración."*
No credential is compared, there is no error state, and nothing is persisted.

**Layout.** `bg-surface-subtle` with `BadgeCheck`, the values in `bg-card` chips with `break-all`
so the address fits a 320 px viewport, and `select-all` so a click grabs the whole value.

### Acceptance criteria — B5c

- `pnpm exec tsc --noEmit`, `pnpm lint` and `pnpm build` exit 0.
- The box shows both values at 320 px without horizontal scroll or clipped text.
- No credential is compared: no success or error banner exists, and the value appears as plain
  text only.
- An empty submit stays on `/ingreso`; a filled one still lands on `/panel` without a query
  string.
- CDP probe at 320 / 390 / 768 / 1024 / 1280 with `mobile:false`: no overflow, empty console.
