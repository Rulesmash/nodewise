"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV = [
  { href: "/portfolio", label: "Work", id: "nav-lnk-work" },
  { href: "/packages", label: "Pricing", id: "nav-lnk-packages" },
  { href: "/about", label: "About", id: "nav-lnk-about" },
] as const;

const MOBILE_MQ = "(max-width: 768px)";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname() || "/";

  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMenu = () => setMobileMenuOpen((o) => !o);

  const isActive = (href: string) =>
    mounted &&
    (pathname === href || (href !== "/" && pathname.startsWith(href)));

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileMenuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // inert ONLY when mobile drawer is closed. Never on desktop (was blocking clicks).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const syncInert = () => {
      const isMobile = window.matchMedia(MOBILE_MQ).matches;
      if (isMobile && !mobileMenuOpen) {
        nav.setAttribute("inert", "");
      } else {
        nav.removeAttribute("inert");
      }
    };

    syncInert();
    const mq = window.matchMedia(MOBILE_MQ);
    mq.addEventListener("change", syncInert);
    return () => mq.removeEventListener("change", syncInert);
  }, [mobileMenuOpen]);

  return (
    <header className="main-header" role="banner">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="header-container">
        <Link
          href="/"
          className="logo"
          id="nav-logo-link"
          aria-label="Nodewise software studio home"
          onClick={closeMenu}
        >
          <img
            src="/favicon.ico"
            alt=""
            aria-hidden="true"
            className="logo-image"
            id="logo-img"
          />
          <span className="logo-text">Nodewise.cc</span>
        </Link>

        <div className="header-right">
          <nav
            ref={navRef}
            className={`nav-menu${mobileMenuOpen ? " active" : ""}`}
            id="nav-menu"
            aria-label="Main Navigation"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                id={item.id}
                onClick={closeMenu}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-secondary nav-btn-cta"
              id="nav-btn-schedule"
              onClick={closeMenu}
              aria-current={isActive("/contact") ? "page" : undefined}
            >
              Contact
            </Link>
          </nav>

          <button
            type="button"
            className={`mobile-toggle${mobileMenuOpen ? " active" : ""}`}
            id="mobile-menu-toggle"
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="nav-menu"
            onClick={toggleMenu}
          >
            <span className="bar" aria-hidden="true" />
            <span className="bar" aria-hidden="true" />
            <span className="bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
