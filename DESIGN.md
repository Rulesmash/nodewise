---
name: Nodewise
description: Dark premium digital product studio — cinematic glass + metallic motion on a B2B landing-page and software homepage.
colors:
  bg-main: "#0b0c10"
  bg-surface: "rgba(22, 23, 34, 0.65)"
  bg-surface-solid: "#12131a"
  text-primary: "#f8f9fc"
  text-secondary: "#c5c9db"
  text-muted: "#a3a8be"
  text-light: "#ffffff"
  border-glass: "rgba(255, 255, 255, 0.14)"
  accent-instrument: "#5b9cff"
  metal-light: "#c5cddb"
  metal-dark: "#6b7385"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 5.5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  pill: "999px"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "2rem"
  xl: "4rem"
  section: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.text-light}"
    textColor: "{colors.bg-main}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
  glass-card:
    backgroundColor: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "1.75rem 1.6rem"
---

# Design System — Nodewise

## Overview

Nodewise’s marketing surface is a **dark, category-standard product-studio homepage** elevated by a single authored motion moment: a metallic Three.js sculpture with floating frosted-glass offer cards (price, timeline, ownership). Craft bar: Raycast / Arc / Resend restraint with cinematic camera-orbit motion from the pinned design-inspo video. Homepage-only redesign; other routes inherit shared tokens and chrome.

**Visitor mode:** Persuade (B2B buyer → landing pages / business software). Zero to MVP is a side offer.

**Motion thesis:** Focal entrance = sculpture scale-in + continuous slow orbit + staggered glass-card blur-to-sharp floats (`power3.out` / `cubic-bezier(0.16, 1, 0.3, 1)`). Supporting scroll reveals are quiet. Respect `prefers-reduced-motion`.

## Colors

- **Void ground:** `#0b0c10` with soft radial instrument glows (cool blue, low opacity).
- **Glass surfaces:** translucent white gradients + `backdrop-filter: blur(16–22px)`.
- **Type:** near-white primary, cool gray secondary; no purple brand wash on homepage pricing.
- **Status:** green checks / red exclusions only on inclusion lists.
- **Metal:** silver–steel physical materials in WebGL, not flat CSS gradients as fake chrome.

## Typography

- **Display/UI:** Geist (local variable) via `--font-header`.
- **Body:** Manrope via `--font-body`.
- Tight tracking on large titles (−0.03 to −0.035em). No decorative kickers; product names (e.g. “Zero to MVP”) sit as real labels with a live instrument dot.

## Layout

- Max content width ~1200px (`.container`).
- Hero: two-column desktop (copy | HeroStage); single column mobile with copy first, stage second.
- MVP: split glass panel (features | price rail).
- Packages: three equal glass cards; Standard tier subtly highlighted with cool edge light.
- Spacing: generous section gaps; tighter within cards.

## Elevation & Depth

- Glass cards: soft offset shadow `0 16–28px` black + 1px luminous inset top edge.
- Hero stage: inset frame, inner radial glow, continuous 3D depth (not flat mock chrome).
- Avoid zero-offset neon halos and hard neubrutal offsets.

## Shapes

- Cards ~14px radius; small glass HUD chips ~12px; CTAs fully pill.
- No sharp zero-radius cards on the homepage redesign surfaces.

## Components

- **HeroStage:** WebGL torus-knot + ribbon + lattice; HTML glass HUD cards with real offer facts; pointer parallax; continuous rotation.
- **Primary button:** solid light pill, dark text, lift on hover.
- **Secondary / outline:** glass border, pill.
- **Package card:** glass body, badge pill, feature list with lucide checks.
- **MVP highlight:** large glass composite with pricing box nested inside.
- **ProjectCarousel (portfolio):** 3D coverflow of project screenshots — circular offsets, rotateY depth, soft side blur, drag/keyboard/dots, autoplay pause on hover; glass chrome window chrome; active card opens live URL.

## Do's and Don'ts

**Do**

- Lead buyers with landing pages (12k–15k INR) and business software (25k+) in hero glass and packages. Keep Zero to MVP off the first viewport.
- Keep content visible without JS; motion enhances, never gates.
- Use transform/opacity/filter for motion; bound WebGL to the hero stage.
- Preserve all commercial copy, prices, WhatsApp deep links, and SEO claims.

**Don't**

- Don’t invent testimonials, metrics, or case results.
- Don’t use purple decorative washes or gradient text on the homepage.
- Don’t scatter identical scroll-reveal on every block as the “personality.”
- Don’t hide primary CTAs below a tall mobile-only stage-first order.
- Don’t expand this visual pass to other routes without a separate scoped task.
