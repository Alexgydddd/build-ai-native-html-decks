# AI-native HTML deck project

## Start in intake mode

- Read `project-brief.md` and `MATERIALS-GUIDE.md` first.
- Inspect `materials/` before planning slides.
- Reuse facts already provided by the user; do not make them re-enter known context.
- Maintain `intake-report.md` with available, optional missing, blocking missing, and conflicting inputs.
- Do not start full-deck production while narrative-critical or fact-critical inputs are blocking.
- When inputs are sufficient, create `deck-spec.md` and only the three representative slides first.

## Source of truth

- Keep audience-facing content in `content/deck.json`.
- Keep narrative decisions and unresolved facts in `deck-spec.md`.
- Do not independently maintain PPT and HTML as equal sources.

## Design and engineering rules

- Use a 1920×1080, 16:9 design baseline unless the brief says otherwise.
- Reuse shared slide components and CSS tokens.
- Avoid page-specific CSS unless a component cannot express the layout.
- Keep all stage-critical assets local under `public/assets/`.
- Do not add external fonts or iframes without explicit approval.
- Keep large videos as external local assets rather than Base64.

## Verification

- Run `npm run build`, `npm run validate`, and `npm run qa` after material changes.
- Do not declare completion before browser rendering and slide screenshots pass.
- Production output must contain no unresolved placeholders or blocked slides.
