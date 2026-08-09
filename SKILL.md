---
name: build-ai-native-html-decks
description: Create stage-ready, client-facing, or internal HTML presentations from briefs, documents, PDFs, PPT references, brand assets, images, videos, and structured data. Use when Codex is asked to build, redesign, convert, or update an HTML slide deck, kickoff deck, launch presentation, competition or event deck, training deck, report, or interactive presentation; especially when the user wants an AI-native workflow that avoids manual PowerPoint or Figma editing and requires reusable components, local or offline assets, browser QA, screenshots, PDF fallback, and versioned delivery.
---

# Build AI-Native HTML Decks

## Operating principle

Treat the deck as a generated product, not a collection of hand-authored pages.

Maintain one source of truth for content, one reusable component system for layout, and one automated QA loop. Keep the user at high-leverage approval points: narrative, representative visual direction, and final sign-off.

Do not generate the full deck before content structure and representative slides are accepted unless the user explicitly requests a one-pass draft.

## Default stack

Use this stack unless the existing project or user constraints require another:

- Vite + TypeScript for development and static builds.
- Reveal.js for slide navigation, speaker notes, transitions, and PDF export.
- Structured JSON or YAML for slide content.
- CSS custom properties and reusable slide components for the design system.
- Playwright for browser checks, screenshots, overflow detection, and console-error detection.
- Git for version history and rollback.

Avoid React unless the deck contains application-like state or interactions that justify it. Avoid external fonts, remote iframes, and network-dependent assets in stage-critical builds.

## Workflow

### 0. Initialize the creation workspace

When the user is starting a new presentation, has not organized the source material yet, or asks what to prepare, enter **intake mode** before visual production.

Create the project with:

```bash
<skill-dir>/scripts/scaffold_deck.sh <target-directory>
```

The scaffold includes a `materials/` intake area and `MATERIALS-GUIDE.md`. Explain the purpose of each folder to the user and ask them to place whatever is available there; empty optional folders must not block progress.

In intake mode:

1. create the workspace and material folders;
2. fill in known fields in `project-brief.md` from the conversation instead of asking the user to repeat them;
3. tell the user the exact folder paths for the next materials they should add;
4. inspect files already present and create `intake-report.md` with `available`, `missing but optional`, `missing and blocking`, and `conflicts`;
5. stop before full production if narrative-critical or fact-critical inputs are blocking;
6. otherwise proceed to the content contract and representative slides.

Do not require the user to manually create the folder tree. Do not force every project to provide every material category. A clear brief plus usable content is enough to begin; brand and visual references may be inferred or proposed when absent.

### 1. Inspect and inventory

Inspect the workspace and identify:

- briefs, source documents, existing PPT/PDF/HTML references;
- brand assets, logos, fonts, photos, charts, audio, and video;
- confirmed facts versus unresolved dates, names, numbers, awards, links, and permissions;
- final playback environment, resolution, offline requirement, and delivery deadline;
- protected baselines and current working versions.

Check `materials/` first when the scaffolded structure exists. Update `intake-report.md` after new material arrives so the user can see readiness without reading the implementation files.

Do not overwrite user files or protected baselines. If source files conflict, preserve provenance and report the conflict.

### 2. Create the content contract

Create `deck-spec.md` before full visual production. Define for every slide:

- objective;
- one takeaway;
- slide type;
- supporting content and data;
- required assets;
- speaker notes;
- confirmation status.

Create the machine-readable content file from the accepted structure. Use `content/deck.json` by default. Read [references/deck-schema.md](references/deck-schema.md) when defining or extending the schema.

Do not silently invent high-risk facts. Mark unresolved content explicitly in the spec, but block production delivery while unresolved markers remain.

### 3. Prove the visual system with representative slides

Build only these representative slides first:

1. cover or hero slide;
2. normal information-dense slide;
3. most complex slide, such as people, timeline, comparison, chart, or media.

If no visual direction exists, produce two or three distinct directions using the same content. Render screenshots and let the user choose. If the user supplied a reference, reproduce its visual logic instead of creating unrelated directions.

Use image generation for hero art or supporting illustrations when useful. Keep audience-facing text and core diagrams as editable HTML/SVG, not flattened full-slide images.

### 4. Build from reusable components

If no suitable project exists, scaffold the bundled starter:

```bash
<skill-dir>/scripts/scaffold_deck.sh <target-directory>
```

Implement slide types as reusable components. Add a new component only when an existing type cannot express the content cleanly. Keep page-specific CSS exceptional and documented.

Localize assets under `public/assets/`. Treat `index.html` as the single entry point, not necessarily a physically monolithic file. Inline CSS, JavaScript, icons, and small assets only when a single-file deliverable is explicitly required; keep large videos external.

### 5. Run the AI QA loop

Run the build and validation commands after representative-slide approval and after every material full-deck change:

```bash
npm run build
npm run validate
npm run qa
```

Use the Codex browser or Playwright to inspect the rendered local URL. Generate one screenshot per slide and a contact sheet when tools are available. Check the desktop presentation viewport first; check mobile only when the user requests responsive viewing.

Read [references/quality-gates.md](references/quality-gates.md) before declaring completion. Fix failures and rerun the affected checks. Do not claim success based only on source-code inspection.

### 6. Deliver

Default deliverables:

- `dist/index.html`;
- `dist/assets/`;
- `deck.pdf` as a stage fallback when PDF export is supported;
- slide screenshots or a contact sheet;
- `verification-report.md` listing commands, results, unresolved items, and external dependencies.

Use Git tags or commits for approved baselines. Do not create a new version folder for every small edit unless the user requests that retention model.

## Required quality boundaries

- One slide, one primary takeaway.
- No unresolved placeholders in production output.
- No missing local assets or browser console errors.
- No content overflow at the target viewport.
- No network dependency in an offline-critical deck.
- No independent editing of both PPT and HTML as equal sources of truth.
- No full-deck production before representative visual approval, unless explicitly waived.
- No completion claim without rendered-browser verification.

## Resource routing

- Read [references/deck-schema.md](references/deck-schema.md) when creating the content model or new slide types.
- Read [references/quality-gates.md](references/quality-gates.md) during QA and delivery.
- Copy `assets/starter/` or run `scripts/scaffold_deck.sh` for a new project.
- Read the scaffolded `MATERIALS-GUIDE.md` and use `project-brief.md` when onboarding a new project.
- Run `scripts/validate_deck.mjs` directly for an existing static build, or use the copied `tools/validate-deck.mjs` in a scaffolded project.
