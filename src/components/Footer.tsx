"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-container grid">
        <div className="footer-brand">
          <img src="/favicon.ico" alt="Nodewise Logo" className="footer-logo" />
          <p className="footer-tagline">Smarter Code. Better Solutions.</p>
          <ul className="footer-about" style={{ listStyle: 'none', padding: 0 }}>
            <li>▪ Custom Web Platforms</li>
            <li>▪ High-Performance Software</li>
            <li>▪ Business Optimization</li>
          </ul>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/nodewise-cc" target="_blank" rel="noopener noreferrer"
              className="footer-social-link" id="footer-linkedin" aria-label="Nodewise on LinkedIn">
              <Linkedin className="footer-social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-links-group grid">
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Navigation</h4>
            <Link href="/" className="footer-link">Home</Link>
            <Link href="/packages" className="footer-link">Packages</Link>
            <Link href="/capabilities" className="footer-link">Capabilities</Link>
            <Link href="/portfolio" className="footer-link">Case Studies</Link>
          </div>
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Process & Team</h4>
            <Link href="/quality" className="footer-link">Quality Standards</Link>
            <Link href="/process" className="footer-link">Our Process</Link>
            <Link href="/about" className="footer-link">About Us</Link>
            <Link href="/contact" className="footer-link">Contact</Link>
          </div>
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Core Coordinates</h4>
            <span className="footer-link text-muted">nodewise.cc</span>
            <span className="footer-link text-muted">Based Worldwide</span>
            <span className="footer-link text-muted">&copy; {new Date().getFullYear()} Nodewise Team.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
