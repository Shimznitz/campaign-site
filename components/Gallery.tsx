// components/Gallery.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Gallery.module.css";

const CATEGORIES = ["All", "Community", "Education", "Youth", "Campaign", "Meetings", "Development"];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<null | (typeof CAMPAIGN.gallery)[0]>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered =
    filter === "All" ? CAMPAIGN.gallery : CAMPAIGN.gallery.filter((g) => g.category === filter);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">On the Ground</span>
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">Moments from the movement — communities, rallies, and real work.</p>
        </motion.div>

        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ""}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className={styles.masonry}>
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                className={styles.masonryItem}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightbox(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={420}
                  style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                />
                <div className={styles.masonryOverlay}>
                  <span className={styles.masonryCategory}>{item.category}</span>
                  <p className={styles.masonryAlt}>{item.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={900}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "auto", borderRadius: 16 }}
              />
              <p className={styles.lightboxCaption}>{lightbox.alt}</p>
              <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}