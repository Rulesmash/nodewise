"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

export default function IdleThreeBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => {
      const run = () => setReady(true);
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(run, { timeout: 1800 });
      } else {
        window.setTimeout(run, 400);
      }
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }, []);

  if (!ready) return null;
  return <ThreeBackground />;
}
