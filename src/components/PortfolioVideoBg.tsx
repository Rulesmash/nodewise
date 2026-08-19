"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PortfolioVideoBg() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.pause();

    if (reduce) {
      video.currentTime = 0;
      return;
    }

    let targetTime = 0;
    let raf = 0;
    let running = true;
    let bound = false;

    const applyFrame = () => {
      if (!running) return;
      const duration = video.duration;
      if (duration && Number.isFinite(duration)) {
        const next = Math.min(Math.max(targetTime, 0), Math.max(duration - 0.04, 0));
        if (Math.abs(video.currentTime - next) >= 0.01) {
          video.currentTime = next;
        }
      }
      raf = requestAnimationFrame(applyFrame);
    };

    const ctx = gsap.context(() => {
      const bind = () => {
        if (bound) return;
        const duration = video.duration;
        if (!duration || !Number.isFinite(duration)) return;
        const page = document.querySelector(".portfolio-page");
        if (!page) return;
        bound = true;

        const span = Math.max(duration - 0.04, 0);

        const trigger = ScrollTrigger.create({
          trigger: page,
          start: 0,
          end: "max",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.min(Math.max(self.progress, 0), 1);
            targetTime = p * span;
          },
        });

        targetTime = Math.min(Math.max(trigger.progress, 0), 1) * span;
        if (!raf) raf = requestAnimationFrame(applyFrame);
      };

      const unlock = () => {
        const play = video.play();
        const after = () => {
          video.pause();
          bind();
        };
        if (play && typeof play.then === "function") {
          play.then(after).catch(after);
        } else {
          after();
        }
      };

      if (video.readyState >= 1) unlock();
      else video.addEventListener("loadedmetadata", unlock, { once: true });
    }, wrap);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      video.pause();
      ctx.revert();
    };
  }, []);

  return (
    <div className="portfolio-video-bg" ref={wrapRef} aria-hidden="true">
      <video
        ref={videoRef}
        className="portfolio-video-bg__media"
        src="/assets/node2.mp4?v=2"
        muted
        playsInline
        preload="auto"
        tabIndex={-1}
        disablePictureInPicture
      />
      <div className="portfolio-video-bg__veil" />
    </div>
  );
}
