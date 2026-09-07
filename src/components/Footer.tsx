import Link from "next/link";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="container footer-container grid">
        <div className="footer-brand">
          <img
            src="/favicon.ico"
            alt=""
            aria-hidden="true"
            className="footer-logo"
          />
          <p className="footer-tagline">Smarter Code. Better Solutions.</p>
          <ul className="footer-about" style={{ listStyle: "none", padding: 0 }}>
            <li>B2B website engineering</li>
            <li>Web application engineering</li>
            <li>India studio, worldwide delivery</li>
          </ul>
          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/company/nodewise-cc"
              target="_blank"
              rel="me noopener noreferrer"
              className="footer-social-link"
              id="footer-linkedin"
              aria-label="Nodewise on LinkedIn"
            >
              <Linkedin className="footer-social-icon" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="footer-links-group grid">
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Explore</h4>
            <Link href="/" className="footer-link">
              Home
            </Link>
            <Link href="/portfolio" className="footer-link">
              Work
            </Link>
            <Link href="/packages" className="footer-link">
              Pricing
            </Link>
            <Link href="/website-development" className="footer-link">
              Websites
            </Link>
            <Link href="/software-development" className="footer-link">
              Web apps
            </Link>
          </div>
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Studio</h4>
            <Link href="/about" className="footer-link">
              About
            </Link>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
          </div>
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Contact</h4>
            <a href="https://nodewise.cc" className="footer-link">
              nodewise.cc
            </a>
            <a href="mailto:contact@nodewise.cc" className="footer-link">
              contact@nodewise.cc
            </a>
            <a
              href="https://wa.me/919446998827"
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 94469 98827
              <span className="sr-only">(WhatsApp, opens in a new tab)</span>
            </a>
            <span className="footer-link text-muted">India · Worldwide</span>
            <span className="footer-link text-muted">
              &copy; {new Date().getFullYear()} Nodewise.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
