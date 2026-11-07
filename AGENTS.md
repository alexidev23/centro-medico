# centro-medico

Monorepo for "Centro Médico Aurora": a public booking site and a secretary panel.

## Repository layout

- `frontend/` — Next.js 16 (App Router), React 19, Tailwind CSS v4, shadcn/ui, pnpm.
- `backend/` — not created yet.
- `docs/stitch_centro_m_dico_aurora_web/` — design source of truth, **local only** (ignored by `.gitignore`, it must exist in the working copy). Each screen folder has `code.html` and `screen.png`; `centro_m_dico_aurora/DESIGN.md` holds the full design system (palette, typography, spacing, components).
- `docs/plans/` — approved stage plans, versioned.

## Workflow (user-owned, overrides defaults)

### Branching and delivery

- One feature per branch: `feat/<name>`, always created from an up-to-date `main`.
- Never commit feature work directly on `main`.
- Never run `git push`, `git merge`, or `git rebase` without explicit approval.
- When a feature is complete, stop and hand it over for review.
- Merge into `main` only after the user approves the feature and asks for the merge.
- The user owns every push, including `main`.

### Design review before each stage

- Before starting any stage, re-read the relevant design under `docs/stitch_centro_m_dico_aurora_web/`.
- Produce a written plan for that stage before writing code.
- Do not implement anything until the plan is explicitly approved.

### Plans

- Write an approved plan to `docs/plans/<feature>.md` only after approval.
- Review artifacts do not live inside the application source tree.

### Scope limit

- A stage must not exceed 150-200 changed lines of code, under any circumstance.
- The goal is reviewability: the user must be able to review the whole stage in one sitting, without facing a dozen or more files at once.
- If a stage needs more, split it into smaller stages and plan each one separately.
- Never exceed the limit to "finish faster". Report the split instead.

## Conventions

- Generated artifacts (code, identifiers, comments, commits) are written in English.
- User-facing copy follows the design: warm Argentine Spanish (rioplatense), e.g. "Sacá tu turno".
- Package manager: pnpm. Do not introduce npm or yarn lockfiles.
- Read the bundled Next.js docs in `frontend/node_modules/next/dist/docs/` before using an API. This version has breaking changes versus model training data.
- Design tokens live in `frontend/src/app/globals.css` under `@theme`. No hardcoded colors outside that file.
