---
target: portfolio
total_score: 19
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-02T10-19-57Z
slug: src-app-portfolio-page-tsx
---
# Portfolio critique — src/app/portfolio/page.tsx

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Status line + dots solid; no visible autoplay pause state |
| 2 | Match System / Real World | 2 | “Visit the Link”; SEO titles; client brochure prose |
| 3 | User Control and Freedom | 3 | Drag/arrows/keyboard good; hover-only pause; accidental center open |
| 4 | Consistency and Standards | 3 | Matches home glass; Work vs Case Studies label drift |
| 5 | Error Prevention | 2 | Drag guard OK; no empty/broken image path; easy mis-open tab |
| 6 | Recognition Rather Than Recall | 3 | Labels/status good; 7px dots hard to hit |
| 7 | Flexibility and Efficiency | n/a | Experience browse surface |
| 8 | Aesthetic and Minimalist Design | 2 | Coverflow craft undercut by card/text collision + triple autoplay |
| 9 | Error Recovery | 1 | No recovery for failed assets/dead URLs |
| 10 | Help and Documentation | n/a | Experience portfolio |
| **Total** | | **19/32** | **Acceptable (~59%)** |

## Design Specificity Verdict

**Partially authored.** Visual system (void, instrument blue, coverflow chrome, glass CTA) is Nodewise. Narrative + CTA copy are category-interchangeable agency portfolio. No bridge from proof → Zero to MVP (₹29,999 / 10–14 days).

**Detector:** 25 findings — 17 color drift, 7 font-size, 1 font (Menlo). 24 advisory / 1 warning. Mostly token documentation debt + intentional window-chrome reds/yellows/greens (false-positive-ish).

## Overall Impression

Coverflow is the peak. Layout collision, mobile copy-first order, and weak founder copy stop the page from converting craft into trust.

## What's Working

1. ProjectCarousel — circular coverflow, sharp center card, multi-input, a11y region/status, reduced-motion.
2. Real multi-slide artifacts + live URLs (no invented metrics).
3. Visual continuity with homepage glass/dark system.

## Priority Issues

### [P1] Coverflow bleeds over project copy (desktop)
Side cards overpaint `.project-info` (measured leftmost card ~568px vs info right ~604px). Stage overflow visible + wide spread.
**Fix:** Clip stage or tighten xSpread/card width; protect text column.
**Command:** `$impeccable layout`

### [P1] Mobile violates Experience mode (artifact does not lead)
Full copy + CTA before carousel below fold.
**Fix:** Meta + short name → carousel → condensed desc/CTA.
**Command:** `$impeccable adapt`

### [P1] Copy + CTA fail founder job
“Visit the Link”; SEO H2s; client product poetry; no soft bridge to Zero to MVP.
**Fix:** “Open live site”; problem→shipped→for whom; optional offer chip.
**Command:** `$impeccable clarify`

### [P2] Triple autoplay motion noise
All three carousels tick off-screen.
**Fix:** Autoplay only in-viewport carousel.
**Command:** `$impeccable animate` or `$impeccable quieter`

### [P2] Dot hit targets ~7×7px
**Fix:** 44×44 hit area, keep visual size.
**Command:** `$impeccable harden` / `$impeccable audit`

### [P3] Staging hostnames in chrome
vercel/netlify URLs in `.pc-url` undercut investor demos.
**Fix:** Product name in chrome; full URL on visit action.
**Command:** `$impeccable polish`

## Persona Red Flags

- **Jordan:** Unclear CTA; brochure prose; no offer after proof.
- **Casey:** Artifact buried; tiny dots; triple motion while scrolling.
- **Sam:** Strong labels overall; no named pause; center open new-tab not fully announced; tabs without tabpanels.
- **Founder→investor:** Hostnames + mid-carousel text occlusion on screenshare.

## Minor Observations

Tags low value (“Prototype” trust risk); dual visit affordances; cover crops UI chrome; bottom CTA doesn’t reference seen work; nav Work vs footer Case Studies.

## Questions

1. If artifact must lead, why 200+ words before first mobile screenshot?
2. Would “Open live Titan” + delivery blurb beat building poetry?
3. Is coverflow proving craft or hiding thin case narrative?
4. One in-view autoplay only — does the page feel more expensive?
5. Should /portfolio convert or only impress?

## Cognitive Load

4 checklist failures → high extraneous load for Experience mode.
