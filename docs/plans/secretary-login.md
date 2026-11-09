# Stage B5 — Secretary sign-in

**Branch:** `feat/secretary-login`
**Status:** plan approved, B5a in progress
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

## Acceptance criteria — B5b

(to be written after B5a ships)
