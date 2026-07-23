"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Calendar } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="main-header" role="banner">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="header-container">
        <Link href="/" className="logo" id="nav-logo-link" aria-label="Nodewise Homepage">
          <img src="/favicon.ico" alt="" aria-hidden="true" className="logo-image" id="logo-img" />
          <span className="logo-text">Nodewise.cc</span>
        </Link>

        <div className="header-right">
          <nav
            className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}
            id="nav-menu"
            aria-label="Main Navigation"
          >
            <Link href="/portfolio" className="nav-link" id="nav-lnk-work" onClick={() => setMobileMenuOpen(false)}>Work</Link>
            <Link href="/zero-to-mvp" className="nav-link mvp-nav-link" id="nav-lnk-mvp" onClick={() => setMobileMenuOpen(false)}>Zero to MVP</Link>
            <Link href="/packages" className="nav-link" id="nav-lnk-packages" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/process" className="nav-link" id="nav-lnk-process" onClick={() => setMobileMenuOpen(false)}>Process</Link>
            <Link href="/capabilities" className="nav-link" id="nav-lnk-capabilities" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/about" className="nav-link" id="nav-lnk-about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/quality" className="nav-link" id="nav-lnk-quality" onClick={() => setMobileMenuOpen(false)}>Quality</Link>
            <Link href="/contact" className="btn btn-secondary nav-btn-cta" id="nav-btn-schedule" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>

          <button 
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            id="mobile-menu-toggle" 
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="nav-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
            <span className="bar" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
