// components/Manifestos.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Manifestos.module.css";

type Manifesto = (typeof CAMPAIGN.manifestos)[0];

function ManifestoCard({ item, index }: { item: Manifesto; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${expanded ? styles.expanded : ""}`}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 4) * 0.08 }}
      onClick={() => setExpanded((p) => !p)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setExpanded((p) => !p)}
      aria-expanded={expanded}
    >
      <div className={styles.cardIcon}>{item.icon}</div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardSummary}>{item.summary}</p>
      <AnimatePresence>
        {expanded && (
          <motion.p
            className={styles.cardDetail}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.detail}
          </motion.p>
        )}
      </AnimatePresence>
      <div className={styles.cardToggle}>
        <span>{expanded ? "Less" : "Read More"}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Manifestos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="manifestos" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Our Plan</span>
          <h2 className="section-title">Manifestos</h2>
          <p className="section-subtitle">
            Concrete, funded commitments — not aspirations. Click any card to read the full plan.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {CAMPAIGN.manifestos.map((item, i) => (
            <ManifestoCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}