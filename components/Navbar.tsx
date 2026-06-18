// components/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Navbar.module.css";

interface NavbarProps {
  onJoinClick: () => void;
}

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Manifestos", href: "#manifestos" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onJoinClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.solid : ""}`}>
      <div className={styles.inner}>
        <button className={styles.logo} onClick={() => handleNav("#hero")}>
          <span className={styles.logoInitial}>
            {CAMPAIGN.candidate.name.split(" ").map(w => w[0]).join("")}
          </span>
          <span className={styles.logoText}>{CAMPAIGN.candidate.name.split(" ")[0]}</span>
          <span className={styles.logoFor}>for Governor</span>
        </button>

        <nav className={styles.links}>
          {links.map((l) => (
            <button key={l.label} onClick={() => handleNav(l.href)} className={styles.link}>
              {l.label}
            </button>
          ))}
          <button className={styles.joinBtn} onClick={onJoinClick}>
            Join Us
          </button>
        </nav>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((l) => (
              <button key={l.label} onClick={() => handleNav(l.href)} className={styles.mobileLink}>
                {l.label}
              </button>
            ))}
            <button
              className={styles.mobileJoin}
              onClick={() => { setMenuOpen(false); onJoinClick(); }}
            >
              Join Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}