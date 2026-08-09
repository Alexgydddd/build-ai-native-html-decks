# Deck content schema

## Purpose

Keep content separate from layout so copy changes do not require page-level HTML edits and design changes propagate across the deck.

## Recommended project structure

```text
project/
├── AGENTS.md
├── deck-spec.md
├── content/
│   └── deck.json
├── public/
│   └── assets/
├── src/
│   ├── main.ts
│   └── styles.css
├── tests/
│   └── deck.spec.ts
├── outputs/
│   └── slides/
└── dist/
```

## Root schema

```json
{
  "meta": {
    "title": "Deck title",
    "event": "Event name",
    "date": "YYYY-MM-DD",
    "version": "V1.0",
    "viewport": { "width": 1920, "height": 1080 },
    "offlineRequired": true
  },
  "theme": {
    "name": "Theme name",
    "background": "#07111f",
    "surface": "#102238",
    "text": "#f7fbff",
    "muted": "#9fb2c3",
    "primary": "#3370ff",
    "accent": "#24d7c4",
    "highlight": "#ffc861"
  },
  "slides": []
}
```

## Slide schema

Every slide should contain:

```json
{
  "id": "06",
  "type": "cards",
  "eyebrow": "WHY NOW",
  "title": "为什么是现在？",
  "takeaway": "把零散尝试变成公司级落地机制",
  "status": "confirmed",
  "notes": "Speaker notes",
  "source": "sources/brief.docx#section-3"
}
```

Use `status` values:

- `confirmed`: safe for production.
- `draft`: wording may change; allowed in review builds.
- `blocked`: fact or asset is missing; forbidden in production builds.

## Common slide types

- `title`: cover or section opener.
- `statement`: one high-impact argument or quotation.
- `cards`: two to six comparable points.
- `comparison`: explicit mapping between options or states.
- `timeline`: ordered milestones.
- `process`: dependent steps or workflow.
- `people`: portraits, names, and roles.
- `chart`: quantitative evidence with source.
- `media`: local image or video with fallback poster.
- `closing`: final call to action or thank-you page.

## Type-specific fields

### Cards

```json
{
  "type": "cards",
  "items": [
    { "number": "01", "title": "真实问题", "body": "来自业务现场" }
  ]
}
```

### Timeline

```json
{
  "type": "timeline",
  "items": [
    { "date": "08.06", "title": "开营", "body": "明确方向和资源" }
  ]
}
```

### Media

```json
{
  "type": "media",
  "asset": "/assets/video.mp4",
  "poster": "/assets/video-poster.jpg",
  "alt": "Opening video",
  "fallbackText": "视频无法播放时的说明"
}
```

## Content rules

- Keep one primary takeaway per slide.
- Keep titles as conclusions when possible, not category labels.
- Preserve names, dates, numbers, awards, and quotations with provenance.
- Do not encode layout coordinates in the content file.
- Do not store large binary assets as Base64 in the content file.
- Split overloaded slides before shrinking text below the design system minimum.
