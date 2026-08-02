/**
 * Live capture for home + portfolio — desktop & mobile.
 * Playwright MCP unavailable in session; CLI fallback.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";

// Resolve playwright from temp install or NODE_PATH (project has no local dep)
const require = createRequire(
  path.join(
    process.env.PW_PKG || path.join(os.tmpdir(), "nw-playwright-check"),
    "package.json"
  )
);
const { chromium } = require("playwright");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = __dirname;
const BASE = process.env.BASE_URL || "http://localhost:3000";

const PAGES = [
  { id: "home", path: "/" },
  { id: "portfolio", path: "/portfolio" },
  { id: "zero-to-mvp", path: "/zero-to-mvp" },
  { id: "packages", path: "/packages" },
  { id: "capabilities", path: "/capabilities" },
  { id: "process", path: "/process" },
  { id: "about", path: "/about" },
  { id: "quality", path: "/quality" },
  { id: "contact", path: "/contact" },
];

const VIEWPORTS = [
  { id: "desktop", width: 1440, height: 900 },
  { id: "mobile", width: 390, height: 844 },
];

async function inspectPage(page, label) {
  const findings = await page.evaluate(() => {
    const issues = [];
    const qs = (s, r = document) => Array.from(r.querySelectorAll(s));

    // Landmarks / headings
    const h1s = qs("h1");
    if (h1s.length === 0) issues.push({ sev: "P1", cat: "a11y", msg: "No h1 on page" });
    if (h1s.length > 1)
      issues.push({
        sev: "P2",
        cat: "a11y",
        msg: `Multiple h1s (${h1s.length}): ${h1s.map((h) => h.textContent?.trim().slice(0, 60)).join(" | ")}`,
      });

    // Images without alt
    qs("img").forEach((img, i) => {
      if (!img.hasAttribute("alt")) {
        issues.push({
          sev: "P1",
          cat: "a11y",
          msg: `img[${i}] missing alt: ${img.src?.slice(-80)}`,
        });
      }
    });

    // Buttons / links without accessible name
    qs("button, a").forEach((el) => {
      const name = (
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        el.textContent ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim();
      if (!name && el.getAttribute("href") !== "#") {
        const tag = el.tagName.toLowerCase();
        const cls = el.className?.toString?.().slice(0, 40) || "";
        issues.push({
          sev: "P1",
          cat: "a11y",
          msg: `${tag}.${cls} has empty accessible name`,
        });
      }
    });

    // Touch-ish targets under 44px (interactive)
    const small = [];
    qs("a, button, [role='button']").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.width < 44 || r.height < 44) {
        const name = (el.getAttribute("aria-label") || el.textContent || "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 40);
        small.push({ w: Math.round(r.width), h: Math.round(r.height), name });
      }
    });
    if (small.length) {
      issues.push({
        sev: "P2",
        cat: "responsive",
        msg: `${small.length} interactive targets < 44×44`,
        samples: small.slice(0, 8),
      });
    }

    // Horizontal overflow
    const docW = document.documentElement.scrollWidth;
    const viewW = window.innerWidth;
    if (docW > viewW + 2) {
      issues.push({
        sev: "P1",
        cat: "responsive",
        msg: `Horizontal overflow: scrollWidth ${docW} > innerWidth ${viewW}`,
      });
    }

    // Kickers / eyebrows (craft-floor ban)
    const kickerLike = qs(
      "[class*='kicker'], [class*='eyebrow'], [class*='overline']"
    ).map((el) => ({
      cls: el.className?.toString?.().slice(0, 60),
      text: el.textContent?.trim().slice(0, 50),
    }));
    if (kickerLike.length) {
      issues.push({
        sev: "P2",
        cat: "craft-floor",
        msg: `Possible kicker/eyebrow elements (${kickerLike.length})`,
        samples: kickerLike.slice(0, 5),
      });
    }

    // Focus visibility sample on first few focusables
    const focusables = qs(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ).slice(0, 12);
    const focusNotes = [];
    for (const el of focusables) {
      el.focus();
      const cs = getComputedStyle(el);
      const outline = cs.outlineStyle;
      const outlineW = cs.outlineWidth;
      const boxShadow = cs.boxShadow;
      const hasRing =
        (outline !== "none" && parseFloat(outlineW) > 0) ||
        (boxShadow && boxShadow !== "none");
      if (!hasRing) {
        focusNotes.push({
          tag: el.tagName.toLowerCase(),
          name: (el.getAttribute("aria-label") || el.textContent || "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 40),
          outline,
          boxShadow: boxShadow?.slice(0, 40),
        });
      }
    }
    if (focusNotes.length) {
      issues.push({
        sev: "P1",
        cat: "a11y",
        msg: `${focusNotes.length}/${focusables.length} sampled focusables lack outline/box-shadow ring`,
        samples: focusNotes.slice(0, 6),
      });
    }

    // First project block on portfolio
    const firstProject = document.querySelector(
      ".project-block, .project-stack article"
    );
    const firstProjectMeta = firstProject
      ? {
          id: firstProject.id,
          title: firstProject.querySelector("h2")?.textContent?.trim().slice(0, 80),
          meta: firstProject.querySelector(".project-meta")?.textContent?.trim(),
        }
      : null;

    // Visible text contrast sample (rough)
    const textEls = qs("h1, h2, p, a, button, span").slice(0, 40);
    const contrastSamples = [];
    function luminance(r, g, b) {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    }
    function parseColor(c) {
      const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return null;
      return [+m[1], +m[2], +m[3]];
    }
    function ratio(fg, bg) {
      const L1 = luminance(...fg);
      const L2 = luminance(...bg);
      const lighter = Math.max(L1, L2);
      const darker = Math.min(L1, L2);
      return (lighter + 0.05) / (darker + 0.05);
    }
    for (const el of textEls) {
      const t = el.textContent?.trim();
      if (!t || t.length < 2) continue;
      const cs = getComputedStyle(el);
      const fg = parseColor(cs.color);
      let bgEl = el;
      let bg = null;
      for (let i = 0; i < 8 && bgEl; i++) {
        const b = parseColor(getComputedStyle(bgEl).backgroundColor);
        if (b && !(b[0] === 0 && b[1] === 0 && b[2] === 0 && getComputedStyle(bgEl).backgroundColor.includes("0)"))) {
          // still try solid-ish
        }
        if (b) {
          const alphaMatch = getComputedStyle(bgEl).backgroundColor.match(/[\d.]+\)$/);
          // use if not fully transparent
          const raw = getComputedStyle(bgEl).backgroundColor;
          if (!raw.includes("rgba") || !raw.endsWith(", 0)")) {
            bg = b;
            if (!raw.includes("rgba") || parseFloat(raw.split(",").pop()) > 0.5) break;
          }
        }
        bgEl = bgEl.parentElement;
      }
      if (!fg || !bg) continue;
      const r = ratio(fg, bg);
      if (r < 4.5) {
        contrastSamples.push({
          text: t.slice(0, 40),
          ratio: Math.round(r * 100) / 100,
          color: cs.color,
          bg: getComputedStyle(bgEl || el).backgroundColor,
        });
      }
    }
    if (contrastSamples.length) {
      issues.push({
        sev: "P1",
        cat: "a11y",
        msg: `${contrastSamples.length} text samples may be under 4.5:1 (approx)`,
        samples: contrastSamples.slice(0, 6),
      });
    }

    return {
      title: document.title,
      h1: h1s[0]?.textContent?.trim() || null,
      url: location.href,
      firstProjectMeta,
      issueCount: issues.length,
      issues,
      metrics: {
        links: qs("a").length,
        buttons: qs("button").length,
        images: qs("img").length,
        h2: qs("h2").length,
      },
    };
  });

  return { label, ...findings };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const report = { base: BASE, capturedAt: new Date().toISOString(), pages: [] };

  for (const pg of PAGES) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.id === "mobile" ? 2 : 1,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const url = `${BASE}${pg.path}`;
      const consoleErrors = [];
      page.on("pageerror", (e) => consoleErrors.push(String(e)));
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });

      const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1200);

      const shotName = `${pg.id}-${vp.id}.png`;
      const shotPath = path.join(OUT, shotName);
      await page.screenshot({ path: shotPath, fullPage: true });

      // above-the-fold only
      await page.screenshot({
        path: path.join(OUT, `${pg.id}-${vp.id}-fold.png`),
        fullPage: false,
      });

      const inspection = await inspectPage(page, `${pg.id}/${vp.id}`);
      report.pages.push({
        ...inspection,
        status: resp?.status() ?? null,
        viewport: vp,
        screenshot: shotName,
        consoleErrors: consoleErrors.slice(0, 20),
      });

      await context.close();
    }
  }

  const outJson = path.join(OUT, "live-report.json");
  await writeFile(outJson, JSON.stringify(report, null, 2), "utf8");
  console.log(JSON.stringify({ ok: true, out: outJson, pages: report.pages.length }, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
