// components/Testimonials.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const total = CAMPAIGN.testimonials.length;

  useEffect(() => {
    const id = setInterval(() => setIndex((p) => (p + 1) % total), 5000);
    return () => clearInterval(id);
  }, [total]);

  const current = CAMPAIGN.testimonials[index];

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={styles.header}
        >
          <span className="section-label">Voices of the Movement</span>
          <h2 className="section-title">What People Say</h2>
        </motion.div>

        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={styles.card}
            >
              <div className={styles.quoteIcon}>&ldquo;</div>
              <p className={styles.quote}>{current.quote}</p>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  {current.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <div className={styles.authorName}>{current.name}</div>
                  <div className={styles.authorRole}>{current.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.dots}>
            {CAMPAIGN.testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === index ? styles.activeDot : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}