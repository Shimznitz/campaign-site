// components/WhyRunning.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CAMPAIGN } from "@/lib/config";
import styles from "./WhyRunning.module.css";

export default function WhyRunning() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="why" className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.inner} ref={ref}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>In His Own Words</span>
          <h2 className={styles.title}>Why I&apos;m Running</h2>
          <div className={styles.quoteBar} />
          {CAMPAIGN.about.whyRunning.split("\n\n").map((para, i) => (
            <motion.p
              key={i}
              className={styles.para}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
            >
              {para}
            </motion.p>
          ))}
          <motion.p
            className={styles.signature}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            — {CAMPAIGN.candidate.name}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}