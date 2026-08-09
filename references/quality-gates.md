# HTML deck quality gates

Run these gates before delivery. Record the result in `verification-report.md`.

## 1. Content gate

- Slide count matches the accepted `deck-spec.md`.
- Every slide has one primary takeaway.
- No `TODO`, `TBD`, `待补充`, `待确认`, `待替换`, placeholder QR code, or sample quotation remains.
- Names, dates, numbers, awards, and roles match their cited sources.
- Speaker notes exist when the user requested them.

## 2. Design gate

- Representative cover, dense-content, and complex slides were approved before scale-out.
- Typography, spacing, color, radii, borders, and shadows use shared tokens.
- Body text meets the project minimum size.
- Repeated slide types are visually consistent.
- Full-slide raster images are used only when exact reproduction is intentional.

## 3. Browser gate

- Build succeeds with no TypeScript or bundler errors.
- Browser console has no errors.
- Every local image, font, audio, and video request returns successfully.
- No slide overflows at the target viewport.
- Keyboard navigation, progress, notes, and media controls behave as specified.
- Offline-required builds work with network disabled.

## 4. Visual gate

- Render every slide at the target viewport.
- Generate a screenshot folder and inspect a contact sheet when available.
- Check cover, all section transitions, dense slides, people grids, charts, media, and closing at full size.
- Use Playwright snapshot comparison after a visual baseline is approved.
- Regenerate screenshots after any global CSS or component change.

## 5. Delivery gate

- `dist/index.html` opens through the documented local-server command.
- Relative asset paths work from the delivered folder.
- Large videos remain external assets unless single-file embedding is explicitly required.
- PDF fallback is exported and spot-checked for clipping and missing backgrounds.
- The approved baseline is committed or tagged.
- `verification-report.md` lists commands, results, external dependencies, and unresolved risks.

## Recommended command sequence

```bash
npm install
npx playwright install chromium
npm run build
npm run validate
npm run qa
```

If screenshot output differs across operating systems or browser versions, regenerate and approve the baseline in the same environment used for delivery.
