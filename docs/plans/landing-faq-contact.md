# Stage 8 - Landing FAQ and contact

**Branch:** `feat/landing-faq-contact`
**Status:** E8a implemented, pending review. E8b deferred to its own stage.
**Depends on:** `main` at `82496f2`
**Origin:** desktop-fidelity audit of the landing. Sections 6 and 7 of
`landing_escritorio_centro_m_dico_aurora/code.html` were never built, and the header's
"Contacto" link has been pointing at a non-existent `#contacto` anchor since Stage C1.

Both sections together are 224 hand-authored lines, above the 150-200 limit in
`AGENTS.md`. The work is therefore split: **E8a** ships the FAQ and the section anchors,
**E8b** ships the location/hours/WhatsApp section on the next branch.

## Decisions

### Desktop composition only, responsive by stacking

The desktop export is the single design reference. The mobile export is not used: both
sections adopt the desktop composition and stack below `lg`, following the section patterns
already used on the page (kicker, title, lead, container and padding).

### One data set

The export's section 7 still carries the old address, phone and hours (Yrigoyen 320,
555-0188, 8:00-20:00). The adopted set from the footer is used instead: Yrigoyen 480,
WhatsApp 522-8900, weekday 07:30-20:30 and Saturday 08:00-13:00. The FAQ answer that mentions
the WhatsApp number is updated to the same number.

### The accordion is a client component

`faq.tsx` is the third client component in the app (after the header and drawer): it toggles
each item independently and opens the first one by default, as the export does. Panels use
`hidden` plus `aria-expanded` and `aria-controls`.

### Section 8 of the export is skipped

The export contains a duplicate footer inside `<main>` with the legacy data; the real page
footer is already implemented in Stage C2. Nothing is taken from it.

### Anchors

The drawer's dead entries are pointed at the sections that exist from this stage:
Especialidades, Profesionales and Cómo funciona (`#como-funciona`, added to the booking
steps). Ubicación and Contacto stay at `#` until E8b adds `#contacto`.

## E8a scope

| File | Change | ~Lines |
| --- | --- | --- |
| `frontend/src/components/landing/faq.tsx` | New client accordion | ~100 |
| `frontend/src/app/(public)/page.tsx` | Render the section | ~2 |
| `frontend/src/components/layout/site-drawer.tsx` | Real section hrefs | ~6 |
| `frontend/src/components/landing/specialties.tsx` | Scroll offset | ~2 |
| `frontend/src/components/landing/booking-steps.tsx` | `#como-funciona` plus scroll offset | ~5 |
| `docs/plans/landing-faq-contact.md` | This plan | - |

## Specification

**FAQ** - `<section id="preguntas-frecuentes" class="w-full py-lg md:py-xl">`; inner container
`mx-auto w-full max-w-page px-gutter-mobile md:px-gutter`, column `mx-auto w-full max-w-[48rem]
flex flex-col gap-lg`. Header centred: kicker "Resolvé tus dudas", `h2` "Preguntas frecuentes"
and lead "Todo lo que necesitás saber antes de acercarte a tu cita médica." Items
`overflow-hidden rounded-xl bg-card shadow-card`; toggle `flex w-full items-center
justify-between gap-sm p-md text-left text-title-md hover:text-primary` with an
`aria-expanded` and a `ChevronDown` that rotates 180 when open; panel `px-md pb-md
text-body-sm md:text-body-md`. Four questions copied verbatim from the export, with the
WhatsApp number updated.

**E8b (deferred)** - `<section id="contacto" ...>` with a `lg:grid-cols-12` split: details
(kicker "Ubicación estratégica", `h2` "Vení a visitarnos", lead, address and hours rows with
icon tiles, WhatsApp CTA) and the location map with the floating address card.

## Acceptance criteria

E8a:

- `pnpm lint` exit 0 and `pnpm build` exit 0.
- 390px and 768px: the accordion stacks and opens/closes, no horizontal overflow.
- 1024px and 1280px: the FAQ keeps its 48rem column and no horizontal overflow.
- Drawer entries scroll to existing sections; `/` header "Contacto" still points to the
  anchor added in E8b.
- `git grep -nE '#[0-9a-fA-F]{6}' -- frontend/src` still matches only `globals.css`.
