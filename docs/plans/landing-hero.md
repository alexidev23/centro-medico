# Stage 4 — Landing hero

**Branch:** `feat/landing-hero`
**Status:** implemented, pending review
**Depends on:** `feat/public-shell` (merged in `55823c6`)

## Objective

Replace the temporary component preview at `/` with the real landing page, starting with
the above-the-fold block: hero and trust indicators. Later stages append the remaining
sections below it.

## Decisions

### Images come from Stitch asset URLs

The design references `https://lh3.googleusercontent.com/...` for the facilities photo.
These assets are not in the repository (`docs/` is local only), so `next.config.ts`
allows that host through `images.remotePatterns` and the photo is rendered with
`next/image`. If the URLs expire, the photo is the only thing to replace.

### `Badge` gains a `brand` variant

The hero pill (mint background, deep teal text) matches no clinical status, so `brand` is
added to `badgeVariants`. It is additive: the three existing variants are untouched.

### "Disponible hoy" reuses the clinical badge

The available-slot pill uses the existing `confirmed` variant plus `BadgeDot` with
`animate-pulse`, instead of a new colour.

### Material Symbols are replaced by `lucide-react`

| Design | Component |
| --- | --- |
| `verified` | `ShieldCheck` |
| `calendar_month` | `CalendarDays` |
| `medical_services` | `Stethoscope` |
| `stethoscope` | `Stethoscope` |
| `arrow_forward` | `ArrowRight` |
| `spa` | `Flower2` |

### The CTA anchor points forward

Both CTAs point to `#especialidades-section`, which does not exist yet. It arrives with the
specialties section in the next stage.

## Scope

| File | Change |
| --- | --- |
| `frontend/src/components/landing/hero.tsx` | New — pill, headline, copy, CTAs, next-slot card, photo |
| `frontend/src/components/landing/stats-strip.tsx` | New — three trust indicators |
| `frontend/src/app/(public)/page.tsx` | Replaced by the real landing (removes the E2 preview) |
| `frontend/src/components/ui/badge.tsx` | `brand` variant |
| `frontend/next.config.ts` | `images.remotePatterns` for `lh3.googleusercontent.com` |

## Specification

**Hero** — `px-gutter-mobile`, `pt-md`, `pb-lg`, stacked with `gap-lg`.

- Pill: `bg-primary-light`, `text-primary-dark`, rounded-full, `ShieldCheck` at 16px,
  "Centro Médico en Nueva Córdoba", `self-start`.
- H1: `text-headline-lg-mobile`, `tracking-tight` — *"Atención médica humana, cercana y sin
  esperas innecesarias"*.
- Copy: `text-body-md text-fg-secondary` — *"Tu salud y la de tu familia en el corazón de
  Nueva Córdoba. Profesionales dedicados, turnos puntuales e instalaciones pensadas para tu
  bienestar."*
- CTAs, full width, 48px, rounded-lg:
  - primary, `CalendarDays`, "Sacar turno online" → `#especialidades-section`
  - secondary, `Stethoscope`, "Ver especialidades" → `#especialidades-section`
- Next-slot card: `bg-card`, `shadow-card`, rounded-lg, `p-md`, `gap-sm`.
  - Row: `confirmed` badge with pulsing dot and "Disponible hoy"; right side
    "Sin costo adicional" in `text-muted-foreground`.
  - `size-10` icon tile on `surface-subtle` with `Stethoscope`; title
    "Clínica Médica · Hoy 16:30 hs" (`text-label-lg` bold); subtitle
    "Dra. Sofía Ramírez (M.P. 34.892)" (`text-body-sm`).
  - Ghost action, full width, 44px, `bg-surface-subtle` → `hover:bg-muted`: "Reservar este
    turno" + `ArrowRight`.
- Photo: `relative h-56 w-full`, rounded-lg, `overflow-hidden`; `next/image` with `fill`
  and `object-cover`; bottom gradient `from-foreground/60`; caption in white
  `text-label-sm` with `Flower2` — "Espacios diseñados para tu tranquilidad y confort".

**Stats strip** — `bg-surface-subtle`, `px-gutter-mobile`, `py-md`.

- Three columns, `gap-xs`, each a `bg-card` card with `shadow-card`, `p-sm`, centred.
- Value `text-headline-sm` bold `text-primary`: `12+`, `28`, `+45k`.
- Label `text-label-sm text-fg-secondary`, tight leading: "Años de trayectoria",
  "Médicos especialistas", "Pacientes cuidados".

## Acceptance criteria

- `pnpm lint` exit 0.
- `pnpm build` exit 0 and `/` prerenders as static.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` returns matches only in `globals.css`.
- Prerendered `/` HTML contains the H1, both CTAs, the next-slot card and the three stats.
- `next/image` emits no unconfigured-host error for the facilities photo.
- Layout holds at 390px and 768px.
