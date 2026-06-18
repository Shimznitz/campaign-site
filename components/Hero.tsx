// components/Hero.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Hero.module.css";

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  const scrollToManifestos = () => {
    document.querySelector("#manifestos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Background image */}
      <div className={styles.imageBg}>
        <Image
          src={CAMPAIGN.candidate.heroImage}
          alt={`${CAMPAIGN.candidate.name} campaign photo`}
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* Gradient overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={styles.textBlock}
        >
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {CAMPAIGN.candidate.party} · {CAMPAIGN.candidate.title}
          </motion.span>

          <motion.h1
            className={styles.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {CAMPAIGN.candidate.name}
          </motion.h1>

          <motion.p
            className={styles.quote}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            &ldquo;{CAMPAIGN.candidate.quote}&rdquo;
          </motion.p>

          <motion.p
            className={styles.subQuote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {CAMPAIGN.candidate.subQuote}
          </motion.p>

          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            <button className={styles.ctaPrimary} onClick={onJoinClick}>
              Join the Movement
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className={styles.ctaSecondary} onClick={scrollToManifestos}>
              Read Manifestos
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className={styles.scrollLabel}>Scroll to explore</span>
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}