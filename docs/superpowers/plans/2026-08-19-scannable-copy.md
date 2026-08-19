# Scannable Site Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite visible copy on every marketing route so founders can scan a heading, one support line, and a list — no paragraph walls — without changing prices, ownership claims, or contact paths.

**Architecture:** Copy-only edits in existing page components, plus one shared CSS block in `src/app/site-system.css` for measure, line-height, and list rhythm. No new routes, no new components, no CMS. JSON-LD / metadata stay fact-aligned with the visible copy but are not expanded with new claims.

**Tech Stack:** Next.js 14 App Router, React 18, existing CSS in `globals.css` / `site-system.css` / page CSS.

## Global Constraints

- Prices stay exact: Zero to MVP **₹29,999** (one-time), **10–14 days**; Starter **12k–15k INR**; Growth **25k+ INR**; Enterprise **custom**.
- Inclusions/exclusions stay exact: 30-minute consult, core MVP, live responsive web app, source + docs, ownership transfer, 2 revision rounds. Excludes: complex enterprise integrations, native mobile apps, massive scalable cloud architecture.
- Contact stays exact: WhatsApp `+91 94469 98827` / `wa.me/919446998827`, email `contact@nodewise.cc`, founders Induchoodan V S and Aalif Mohammad R S.
- Do not invent testimonials, metrics, case results, or “free” claims that are not already on the page.
- Keep CTA destinations: `/portfolio`, `/contact`, `/zero-to-mvp`, existing WhatsApp deep links (message text may stay as-is).
- Voice: calm, specific, founder-facing. No agency jargon (“engineer your growth”, “unlock paths to profit”, “operational bottlenecks”).
- Pattern per block: **heading (claim) → one support line ≤ ~18 words → list**. Delete the support line if the heading already says it.
- `.page-hero .section-subtitle` is already hidden in `site-system.css`. Do not rely on kickers; the `h1` carries the page.
- Decorative `section-subtitle` spans on inner heroes may remain in markup (hidden) or be deleted; do not add new kickers.
- Button labels stay verb + object: **View our work**, **Start your MVP**, **Contact**, **Inquire via WhatsApp**. Title-case consistently after this pass.
- Do not restyle the HeroStage 3D canvas, header nav labels, or logo.

## File map

| File | Role |
|---|---|
| `src/app/site-system.css` | Shared scannable type: subtitle measure, list rhythm on cards/quality/steps |
| `src/app/page.tsx` | Homepage hero, MVP block, packages, CTA |
| `src/app/packages/page.tsx` | Pricing page (same three tiers as home) |
| `src/app/zero-to-mvp/page.tsx` | Dedicated MVP offer |
| `src/app/portfolio/page.tsx` | Case blurbs (facts only, shorter) |
| `src/app/capabilities/page.tsx` | Services cards → short lead + bullets |
| `src/app/process/page.tsx` | Three steps, one line each |
| `src/app/quality/page.tsx` | Three standards, one line + bullets |
| `src/app/about/page.tsx` | Brand + founders |
| `src/app/contact/page.tsx` | Pitch column |
| `src/components/ContactForm.tsx` | Success / error strings |
| `src/components/Footer.tsx` | Tagline list |

Out of scope unless a string is user-facing wall text: `HeroStage.tsx` glass card facts (already labels), `Header.tsx` nav, `Preloader.tsx`, JSON-LD except where a visible heading change would contradict it.

**Copy glossary (use these nouns everywhere):** Zero to MVP · Starter · Growth · Enterprise · source code · ownership · consult · live site.

---

### Task 1: Shared scannable typography

**Files:**
- Modify: `src/app/site-system.css` (append at end)

**Interfaces:**
- Consumes: existing classes `.page-hero-subtitle`, `.card-description`, `.quality-description`, `.step-description`, `.pitch-text`, `.about-lead-text`, `.mvp-highlight-desc`, `.package-desc`, `.project-desc`, `.section-lead-desc`
- Produces: tighter measure and list styles used by later tasks’ new `<ul>` markup

- [ ] **Step 1: Append this block to `src/app/site-system.css`**

```css
/* Scannable marketing type — one idea, short measure, list over paragraph */
.page-hero-subtitle,
.section-lead-desc,
.pitch-text,
.about-lead-text,
.mvp-highlight-desc,
.package-desc,
.card-description,
.quality-description,
.step-description,
.project-desc,
.cta-banner-text {
  max-width: 36rem;
  line-height: 1.5;
}

.scan-list {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
}

.scan-list li {
  position: relative;
  padding-left: 1.1rem;
  margin-bottom: 0.4rem;
  color: var(--text-secondary, #c5c9db);
  font-size: 0.98rem;
  line-height: 1.45;
}

.scan-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
}

.capability-card .scan-list,
.quality-details .scan-list {
  margin-top: 0.65rem;
}
```

- [ ] **Step 2: Confirm no selector fights `site-system.css` `display: none` on `.page-hero .section-subtitle`**

That hide rule must stay. New rules must not restore kickers.

- [ ] **Step 3: Visual check**

Load `/` at 1280 and 390. Subtitles should wrap to 2–3 lines max, not a full-width wall.

---

### Task 2: Homepage copy

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: Task 1 classes (`.mvp-highlight-desc`, `.package-desc`)
- Produces: homepage scan pattern reused on `/packages`

Replace **only** these strings (leave IDs, WhatsApp hrefs, structure):

| Location | From | To |
|---|---|---|
| Hero bullets | “Showcase-ready web app you can demo to users or investors” | `Demo-ready web app for users or investors` |
| Hero bullets | “Fixed scope, fixed price, India-based — worldwide delivery” | `Fixed scope and price — India-based, worldwide delivery` |
| Hero bullets | “Consultation, core build, live deploy, and two revision rounds” | `Consult, build, deploy, two revision rounds` |
| MVP `h2` | “Turn your idea into a working product in just 10–14 days” | `Live MVP in 10–14 days` |
| MVP desc | 3-sentence paragraph | `Showcase-ready product. Fixed ₹29,999. Source code and ownership included.` |
| Packages `h2` | “Service Packages” | `Packages` |
| Packages note | “Transparent Pricing” | `INR pricing, published up front` |
| Starter desc | “Ideal for small businesses launching their first digital footprint.” | `First website for a small business.` |
| Growth desc | “For growing ventures needing optimized funnels and light automation.” | `Custom site plus light automation.` |
| Enterprise desc | “Advanced software and multi-user portals for large-scale operations.” | `Multi-user platforms and integrations.` |
| CTA title | “Need a Custom Quote?” | `Need a custom quote?` |
| CTA text | “Unsure which tier fits? Let's discuss your project.” | `Unsure on the tier? We'll map it in a short call.` |

Hero title `Ship a live MVP in 10–14 days` and offer line with ₹29,999 stay.

Feature list items (What you get / Not included) stay — they are already scannable.

- [ ] **Step 1: Apply the table replacements in `src/app/page.tsx`**
- [ ] **Step 2: Grep the homepage file for leftover long sentences**

```
rg "Perfect for early-stage|digital footprint|large-scale" src/app/page.tsx
```

Expected: no matches.

- [ ] **Step 3: Load `/` desktop + mobile. Confirm heading / one line / lists; CTAs still View our work (primary) then Start your MVP.**

---

### Task 3: Packages page

**Files:**
- Modify: `src/app/packages/page.tsx`

**Interfaces:**
- Consumes: same tier names and prices as Task 2
- Produces: consistent package blurbs with homepage

| Location | From | To |
|---|---|---|
| `h1` | “Service Packages” | `Pricing` |
| subtitle | “Choose the right tier to scale your operations, from basic web presence to advanced enterprise software.” | `Three published tiers. Custom if you need more.` |
| Starter desc | “Perfect for small businesses establishing their first premium digital footprint.” | `First website for a small business.` |
| Growth desc | “For growing ventures that need optimized conversion funnels and light automation.” | `Custom site plus light automation.` |
| Enterprise desc | “Advanced custom software and complex multi-user portals for large-scale operations.” | `Multi-user platforms and integrations.` |
| CTA title | “Need a Custom Quote?” | `Need a custom quote?` |
| CTA text | “If you're unsure which tier fits your project, let's discuss it directly.” | `Unsure on the tier? We'll map it in a short call.` |

Feature bullets stay. Prices stay `12k - 15k INR` / `25k+ INR` / `Custom Pricing`.

- [ ] **Step 1: Apply replacements**
- [ ] **Step 2: Load `/packages`. Three cards scannable; WhatsApp inquire still works.**

---

### Task 4: Zero to MVP page

**Files:**
- Modify: `src/app/zero-to-mvp/page.tsx`

**Interfaces:**
- Consumes: same offer facts as homepage MVP block
- Produces: dedicated page that does not repeat paragraph walls under the lists

| Location | From | To |
|---|---|---|
| `h1` | “Turn your idea into a working product in 10–14 days” | `Live MVP in 10–14 days` |
| subtitle | “A live, showcase-ready MVP you can show users or investors—fixed price, full ownership, no agency bloat.” | `₹29,999. Source, docs, and ownership. No agency bloat.` |
| “Not included” intro `p` | “To keep timelines tight and costs low, this package excludes:” | **Delete the paragraph.** The `h2` + list is enough. |
| After MVP `p` | “Optional Growth Retainer for ongoing features, fixes, and scaling after launch—quoted separately when you need it.” | `Optional retainer after launch — quoted when you need it.` |
| Price note | “Lock in your spot and start building this week.” | `Start this week on WhatsApp.` |

Keep list items, ₹29,999, timeline 10–14 days, WhatsApp CTA.

- [ ] **Step 1: Apply replacements; delete the “Not included” intro paragraph only**
- [ ] **Step 2: Load `/zero-to-mvp`. Two-column layout still: lists left, price card right.**

---

### Task 5: Portfolio case blurbs

**Files:**
- Modify: `src/app/portfolio/page.tsx` (`PROJECTS` array + optional CTA)

**Interfaces:**
- Consumes: existing project facts (names, URLs, tags, slides)
- Produces: `description` strings ≤ 2 short sentences, no new claims

Replace `description` (and tighten `title` where it is a wall):

**Whitebull**
- title: `Charts, news, and analysis in one desk`
- description: `Research assistant for Nifty 50 and Bank Nifty. Showcase with demo data — live market backends removed.`

**Titan Residences**
- title: keep `Interactive 3D showcase for a luxury residence brand`
- description: `Buyers explore floor plans, amenities, and views in the browser — no sales call required.`

**Mavenix Studio**
- title: keep
- description: `Landing MVP: offer, services, and a clear path to contact. Credible from day one.`

**FOSS CEAL**
- title: keep
- description: `Club hub for training, events, resources, and brand kits.`

CTA banner already short; leave it.

- [ ] **Step 1: Replace those four `description` (and Whitebull `title`) fields**
- [ ] **Step 2: Load `/portfolio`. Each project: name, meta, one title, 1–2 line desc, tags, Open live site. Do not drop the Whitebull demo-data disclaimer.**

---

### Task 6: Services (capabilities)

**Files:**
- Modify: `src/app/capabilities/page.tsx`

**Interfaces:**
- Consumes: Task 1 `.scan-list`
- Produces: three cards as heading + one line + three bullets

Hero:
- `h1`: `Services`
- subtitle: `Websites, portals, and automation.`

**Card 1 — Premium web**
- Keep title `Premium Web Presences`
- Replace paragraph with:

```tsx
<p className="card-description">Marketing sites and landing pages that convert.</p>
<ul className="scan-list">
  <li>Corporate sites</li>
  <li>Landing pages</li>
  <li>Service businesses</li>
</ul>
```

**Card 2 — Portals**
- Keep title
- Lead: `Tools your team actually uses.`
- Bullets: `Client portals` · `Booking` · `Dashboards`

**Card 3 — Automation**
- Keep title
- Lead: `Cut repetitive work.`
- Bullets: `Workflows` · `Integrations` · `Internal tools`

CTA:
- title: `Need something specific?`
- text: `Book a 30-minute consult.`
- button stays `Schedule Consultation` → change label to `Schedule a consult` for consistency.

Do not add restaurant/gym/real-estate as new vertical claims beyond the existing parenthetical — those examples are dropped in this pass (they were illustrative, not a product guarantee).

- [ ] **Step 1: Replace hero + three card bodies + CTA**
- [ ] **Step 2: Load `/capabilities`. Carousel still has 3 cards; copy is list-first.**

---

### Task 7: Process

**Files:**
- Modify: `src/app/process/page.tsx`

**Interfaces:**
- Consumes: existing 3-step timeline markup (do not add a 4th step; JSON-LD has 4 names but the page has 3 — do not expand the page to match JSON-LD in this pass)
- Produces: one-line step descriptions

Hero:
- `h1`: `How we work`
- subtitle: `Discovery, build, launch.`

Steps (titles shortened; descriptions one sentence):

1. Title `Discovery` — `Goals, constraints, and success metrics in one consult.`
2. Title `Build` — `Clean, responsive software in focused sprints.`
3. Title `Launch` — `Go live, hand over source, support the first days.`

CTA:
- title: `Ready to start?`
- text: `Book a consult and we'll scope the first sprint.`

- [ ] **Step 1: Apply hero, three steps, CTA**
- [ ] **Step 2: Load `/process`. Timeline markers 1–3 still align; no paragraph wrap past 3 lines on mobile.**

---

### Task 8: Quality

**Files:**
- Modify: `src/app/quality/page.tsx`

**Interfaces:**
- Consumes: Task 1 `.scan-list`; keep `quality-num` 01–03 (sequence is meaningful here)
- Produces: each block = short title + one line + 3 bullets

Hero:
- `h1`: `Quality`
- subtitle: `Performance, ownership, and clear communication.`

**01** title `Shipped on short timelines`
- p: `Hackathon-trained. Advanced work without cutting stability.`
- bullets: `Fast delivery` · `Stable systems` · `Clean interfaces`

**02** title `Custom code you own`
- p: `No page builders. Source is yours.`
- bullets: `Custom architecture` · `Fast page loads` · `Mobile-ready`

**03** title `Business-first communication`
- p: `We talk outcomes, not jargon.`
- bullets: `Clear updates` · `Operational fit` · `Code you can extend`

CTA:
- title: `See the bar`
- text: `Start with Zero to MVP or a scoped build.`
- button: `Start a project` linking `/contact` (href unchanged)

- [ ] **Step 1: Replace hero + three quality blocks + CTA; add `.scan-list` uls**
- [ ] **Step 2: Load `/quality`. No paragraph longer than two lines at 390px width.**

---

### Task 9: About + contact + chrome

**Files:**
- Modify: `src/app/about/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/components/ContactForm.tsx`
- Modify: `src/components/Footer.tsx`

**About**
- `h1`: keep `About Nodewise` or shorten to `About` — use `About`
- subtitle: `India-based studio. Worldwide delivery.`
- `h2`: keep `Built for Results` → `Built for results`
- lead: `Custom web platforms and software, engineered to ship fast.`
- highlights stay (already one line)
- founders lead: `Two founders. We ship fast.`
- CTA title: `Have a project?`
- CTA text: `Tell us what you need live.`
- Founder names and LinkedIn URLs unchanged

**Contact**
- `h1`: `Contact`
- subtitle: `WhatsApp, email, or a short brief.`
- pitch `h2`: `Start a conversation`
- pitch `p`: `Tell us the product. We'll reply within one business day.`
- meta lines stay (architecture review, 1 business day, phone)

**ContactForm success**
- `h3`: `Request received`
- `p`: `Thanks, {name}. We'll reply within one business day.`
- error string: keep meaning; shorten to `Could not send. Try again or WhatsApp us.`

**Footer**
- tagline stays `Smarter Code. Better Solutions.`
- list:
  - `Custom web platforms`
  - `Startup MVPs`
  - `Business software`
- Remove the `▪` prefix (icons/CSS, not unicode bullets)

- [ ] **Step 1: Apply about, contact, form, footer replacements**
- [ ] **Step 2: Load `/about` and `/contact`. Form still submits; success copy is two lines.**

---

### Task 10: Site-wide pass and verify

**Files:** all files from Tasks 2–9

- [ ] **Step 1: Grep leftover wall-text phrases**

```
rg -n "operational bottleneck|bottom line|unlock new paths|engineer your business|page builders or clunky|high-intensity technical hackathons|organic site visitors|premium digital footprint|no agency bloat" src/app src/components --glob "*.tsx"
```

Expected: no matches (except this plan file).

- [ ] **Step 2: Grep prices still present**

```
rg -n "29,999|12k|25k" src/app --glob "*.tsx"
```

Expected: still on home, packages, zero-to-mvp, portfolio CTA.

- [ ] **Step 3: Browser pass (390 and 1280)**

Visit `/`, `/portfolio`, `/zero-to-mvp`, `/packages`, `/capabilities`, `/process`, `/about`, `/quality`, `/contact`.

For each: heading is readable in ≤3 lines; no paragraph > ~3 lines; primary CTA visible; WhatsApp/contact links work.

- [ ] **Step 4: Do not change HeroStage geometry, colors, or zoom in this pass.**

---

## Self-review

1. **Spec coverage:** All marketing routes in PRODUCT.md (`/`, `/portfolio`, `/zero-to-mvp`, `/packages`, `/capabilities`, `/process`, `/about`, `/quality`, `/contact`) have a task. Shared chrome: footer + contact form. Header nav left unchanged (already short).
2. **Placeholders:** None. Every replacement string is written out.
3. **Consistency:** Starter/Growth/Enterprise blurbs identical on home and packages. Zero to MVP facts identical on home highlight and `/zero-to-mvp`. Glossary nouns used throughout.
4. **Known non-goal:** Process page has 3 steps; JSON-LD HowTo lists 4. This plan does not add a fourth visible step.

## Out of scope

- Hero 3D model, lighting, camera zoom
- New pages or blog
- Rewriting `src/lib/seo.ts` SITE keywords list
- Changing WhatsApp prefill message bodies
- i18n
