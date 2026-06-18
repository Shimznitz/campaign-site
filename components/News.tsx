// components/News.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CAMPAIGN } from "@/lib/config";
import styles from "./News.module.css";

export default function News() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="news" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Stay Informed</span>
          <h2 className="section-title">Latest News</h2>
          <p className="section-subtitle">Campaign updates, press releases, and community activities.</p>
        </motion.div>

        <div className={styles.timeline}>
          {CAMPAIGN.news.map((item, i) => (
            <motion.article
              key={item.id}
              className={styles.item}
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.dateBadge}>
                <span className={styles.day}>
                  {new Date(item.date).toLocaleDateString("en-NG", { day: "2-digit" })}
                </span>
                <span className={styles.month}>
                  {new Date(item.date).toLocaleDateString("en-NG", { month: "short" })}
                </span>
                <span className={styles.year2}>
                  {new Date(item.date).getFullYear()}
                </span>
              </div>
              <div className={styles.itemContent}>
                <span className={styles.category}>{item.category}</span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemExcerpt}>{item.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}