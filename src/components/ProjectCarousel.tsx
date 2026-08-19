"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import gsap from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
  ImageOff,
} from "lucide-react";

export type CarouselSlide = {
  src: string;
  alt: string;
  label?: string;
};

type ProjectCarouselProps = {
  slides: CarouselSlide[];
  projectId: string;
  liveUrl: string;
  liveHost: string;
  /** Optional short name for chrome (avoids staging hostnames). */
  displayName?: string;
};

function wrapIndex(i: number, len: number) {
  return ((i % len) + len) % len;
}

function circularOffset(i: number, active: number, len: number) {
  let offset = i - active;
  if (offset > len / 2) offset -= len;
  if (offset < -len / 2) offset += len;
  return offset;
}

export default function ProjectCarousel({
  slides,
  projectId,
  liveUrl,
  liveHost,
  displayName,
}: ProjectCarouselProps) {
  const uid = useId();
  const safeSlides = slides?.length ? slides : [];
  const len = safeSlides.length;

  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, active: false, moved: false });
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const interactionPaused = useRef(false);

  const chromeLabel = displayName || liveHost;
  const canAutoplay = len > 1 && !reduceMotion && !userPaused;

  const goTo = useCallback(
    (next: number, animate = true) => {
      if (len < 1) return;
      const target = wrapIndex(next, len);
      setActive(target);
      const cards = trackRef.current?.querySelectorAll<HTMLElement>(".pc-card");
      if (!cards?.length) return;

      cards.forEach((card, i) => {
        const offset = circularOffset(i, target, len);
        const abs = Math.abs(offset);
        const isCenter = offset === 0;
        const xSpread = reduceMotion ? 52 : 36;
        const z = isCenter ? 120 : 40 - abs * 44;
        const rotY = reduceMotion ? 0 : offset * -30;
        const scale = isCenter ? 1 : Math.max(0.72, 0.9 - abs * 0.1);
        const opacity = abs > 1 ? 0 : isCenter ? 1 : 0.55;

        gsap.set(card, { clearProps: "filter" });
        card.style.filter = "none";
        card.classList.toggle("is-active", isCenter);
        // Off-stage cards: keep out of a11y tree without aria-hidden on focusable controls
        if (abs > 1) {
          card.setAttribute("inert", "");
          card.tabIndex = -1;
        } else {
          card.removeAttribute("inert");
          card.tabIndex = 0;
        }

        const props = {
          xPercent: -50 + offset * xSpread,
          yPercent: -50,
          z,
          rotateY: rotY,
          scale,
          opacity,
          zIndex: isCenter ? 30 : 15 - abs,
          duration: animate && !reduceMotion ? 0.85 : 0.01,
          ease: "power3.out",
          force3D: true,
          overwrite: "auto" as const,
        };

        if (animate) gsap.to(card, props);
        else gsap.set(card, props);
      });
    },
    [len, reduceMotion]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    goTo(active, false);
  }, [reduceMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (len < 1) return;
    goTo(active, true);
  }, [active, goTo, len]);

  const stopAuto = useCallback(() => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    if (!canAutoplay || !inView || interactionPaused.current) return;
    if (document.hidden) return;
    autoRef.current = setInterval(() => {
      if (
        interactionPaused.current ||
        document.hidden ||
        userPaused ||
        !inView
      ) {
        return;
      }
      setActive((a) => wrapIndex(a + 1, len));
    }, 4200);
  }, [canAutoplay, inView, len, stopAuto, userPaused]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden) stopAuto();
      else startAuto();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [startAuto, stopAuto]);

  const pauseInteraction = () => {
    interactionPaused.current = true;
    stopAuto();
  };

  const resumeInteraction = () => {
    interactionPaused.current = false;
    if (!userPaused) startAuto();
  };

  const step = (dir: -1 | 1) => {
    if (len < 2) return;
    pauseInteraction();
    setActive((a) => wrapIndex(a + dir, len));
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (len < 2) return;
    drag.current = { x: e.clientX, active: true, moved: false };
    pauseInteraction();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current.active) return;
    if (Math.abs(e.clientX - drag.current.x) > 8) drag.current.moved = true;
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(dx) > 48 && len > 1) {
      setActive((a) => wrapIndex(a + (dx < 0 ? 1 : -1), len));
    }
    window.setTimeout(resumeInteraction, 700);
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === " " || e.key === "k" || e.key === "K") {
      e.preventDefault();
      setUserPaused((p) => !p);
    } else if (e.key === "Home") {
      e.preventDefault();
      pauseInteraction();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      pauseInteraction();
      setActive(len - 1);
    }
  };

  const onCardClick = (i: number) => {
    if (drag.current.moved) return;
    if (i === active) {
      window.open(liveUrl, "_blank", "noopener,noreferrer");
      return;
    }
    pauseInteraction();
    setActive(i);
  };

  const onImgError = (i: number) => {
    setBroken((b) => ({ ...b, [i]: true }));
  };

  if (len === 0) {
    return (
      <div className="pc-root pc-root--empty" data-project={projectId}>
        <div className="pc-empty" role="status">
          <ImageOff size={22} aria-hidden="true" />
          <p>No screens available for this project.</p>
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Open live site
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    );
  }

  const activeSlide = safeSlides[wrapIndex(active, len)];
  const autoplayLabel = userPaused
    ? "Slideshow paused"
    : inView && canAutoplay
      ? "Slideshow playing"
      : "Slideshow idle";

  return (
    <div
      className="pc-root"
      ref={rootRef}
      data-project={projectId}
      onMouseEnter={pauseInteraction}
      onMouseLeave={resumeInteraction}
      onFocusCapture={pauseInteraction}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) {
          resumeInteraction();
        }
      }}
    >
      <div
        className="pc-stage"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${chromeLabel} project screens`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="pc-perspective">
          <div className="pc-track" ref={trackRef}>
            {safeSlides.map((slide, i) => {
              const isActive = i === active;
              const isBroken = broken[i];
              return (
                <button
                  key={`${uid}-${slide.src}-${i}`}
                  type="button"
                  className={`pc-card${isActive ? " is-active" : ""}${
                    isBroken ? " is-broken" : ""
                  }`}
                  aria-label={
                    isActive
                      ? `Open live site ${chromeLabel}: ${slide.label || slide.alt} (opens in a new tab)`
                      : `Show ${slide.label || slide.alt}`
                  }
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onCardClick(i)}
                >
                  <div className="pc-card-chrome" aria-hidden="true">
                    <span className="pc-dot" />
                    <span className="pc-dot" />
                    <span className="pc-dot" />
                    <span className="pc-url" title={liveHost}>
                      {chromeLabel}
                    </span>
                  </div>
                  <div className="pc-card-viewport">
                    {isBroken ? (
                      <div className="pc-img-fallback" role="img" aria-label={slide.alt}>
                        <ImageOff size={28} aria-hidden="true" />
                        <span>Image unavailable</span>
                      </div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        draggable={false}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        onError={() => onImgError(i)}
                      />
                    )}
                  </div>
                  {slide.label ? (
                    <span className="pc-card-label">{slide.label}</span>
                  ) : null}
                  {isActive ? (
                    <span className="pc-card-visit" aria-hidden="true">
                      <ExternalLink size={14} />
                      Visit
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pc-glow" aria-hidden="true" />
      </div>

      <div className="pc-controls">
        <button
          type="button"
          className="pc-nav"
          aria-label="Previous screen"
          disabled={len < 2}
          onClick={() => step(-1)}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>

        <div className="pc-dots" role="group" aria-label="Screens">
          {safeSlides.map((slide, i) => (
            <button
              key={`${uid}-dot-${i}`}
              type="button"
              aria-label={`${slide.label || `Screen ${i + 1}`}${
                i === active ? ", current" : ""
              }`}
              aria-current={i === active ? "true" : undefined}
              className={`pc-dot-btn${i === active ? " is-active" : ""}`}
              onClick={() => {
                pauseInteraction();
                setActive(i);
              }}
            />
          ))}
        </div>

        <button
          type="button"
          className="pc-nav"
          aria-label="Next screen"
          disabled={len < 2}
          onClick={() => step(1)}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        {len > 1 && !reduceMotion ? (
          <button
            type="button"
            className={`pc-nav pc-pause${userPaused ? " is-paused" : ""}`}
            aria-pressed={userPaused}
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>

      <p className="pc-status" aria-live="polite">
        <span className="pc-status-main">
          {activeSlide?.label || `Screen ${active + 1}`} · {active + 1} / {len}
        </span>
        <span className="sr-only">. {autoplayLabel}.</span>
      </p>
    </div>
  );
}
