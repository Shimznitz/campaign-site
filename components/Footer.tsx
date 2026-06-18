// components/Footer.tsx
"use client";
import { useState } from "react";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Why I'm Running", href: "#why" },
  { label: "Manifestos", href: "#manifestos" },
  { label: "Gallery", href: "#gallery" },
  { label: "News", href: "#news" },
];

interface FooterProps {
  onJoinClick: () => void;
}

export default function Footer({ onJoinClick }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const navTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        {/* Top grid */}
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoInitial}>
                {CAMPAIGN.candidate.name.split(" ").map(w => w[0]).join("")}
              </span>
              <div>
                <div className={styles.logoName}>{CAMPAIGN.candidate.name}</div>
                <div className={styles.logoFor}>for Governor, {CAMPAIGN.candidate.state}</div>
              </div>
            </div>
            <p className={styles.slogan}>&ldquo;{CAMPAIGN.candidate.quote}&rdquo;</p>
            <div className={styles.socials}>
              <a href={CAMPAIGN.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.257 5.636 5.907-5.636Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href={CAMPAIGN.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={CAMPAIGN.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href={CAMPAIGN.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <div className={styles.links}>
              {QUICK_LINKS.map((l) => (
                <button key={l.label} onClick={() => navTo(l.href)} className={styles.link}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <div className={styles.contacts}>
              <p className={styles.contactItem}>
                <span>📍</span> {CAMPAIGN.contact.address}
              </p>
              <a href={`tel:${CAMPAIGN.contact.phone}`} className={styles.contactItem}>
                <span>📞</span> {CAMPAIGN.contact.phone}
              </a>
              <a href={`mailto:${CAMPAIGN.contact.email}`} className={styles.contactItem}>
                <span>✉️</span> {CAMPAIGN.contact.email}
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Stay Updated</h4>
            <p className={styles.newsletterText}>
              Get campaign updates straight to your inbox.
            </p>
            {!newsletterDone ? (
              <div className={styles.newsletterForm}>
                <input
                  className={styles.newsletterInput}
                  type="email"
                  placeholder="Your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button
                  className={styles.newsletterBtn}
                  onClick={() => {
                    if (newsletterEmail.includes("@")) setNewsletterDone(true);
                  }}
                >
                  Subscribe
                </button>
              </div>
            ) : (
              <p className={styles.newsletterSuccess}>✅ You&apos;re subscribed!</p>
            )}
            <button className={styles.joinBtn} onClick={onJoinClick}>
              Join the Movement →
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {CAMPAIGN.candidate.name} Campaign. All rights reserved.
          </p>
          <p className={styles.party}>
            {CAMPAIGN.candidate.party} · {CAMPAIGN.candidate.state}
          </p>
        </div>
      </div>
    </footer>
  );
}