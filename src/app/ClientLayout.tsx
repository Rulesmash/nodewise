"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalInteractions from "@/components/GlobalInteractions";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
    document.body.classList.remove("loading");
  };

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <div id="app-container" className={loading ? "app-hidden" : "app-visible"}>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
        <GlobalInteractions />
      </div>
    </>
  );
}
