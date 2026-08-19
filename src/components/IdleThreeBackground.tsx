"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

export default function IdleThreeBackground() {
  const pathname = usePathname();
  const onPortfolio = pathname === "/portfolio";
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (onPortfolio) return;

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
  }, [onPortfolio]);

  if (onPortfolio || !ready) return null;
  return <ThreeBackground />;
}
