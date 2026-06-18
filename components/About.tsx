// components/About.tsx
"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { CAMPAIGN } from "@/lib/config";
import styles from "./About.module.css";

function TimelineItem({
  item,
  index,
}: {
  item: (typeof CAMPAIGN.about.timeline)[0];
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.timelineCard}>
        <span className={styles.year}>{item.year}</span>
        <h3 className={styles.timelineTitle}>{item.title}</h3>
        <p className={styles.timelineDesc}>{item.description}</p>
      </div>
      <div className={styles.dot} />
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        {/* Header */}
        <motion.div
          ref={ref}
          className={styles.header}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Who He Is</span>
          <h2 className="section-title">About the Candidate</h2>
          <p className="section-subtitle">{CAMPAIGN.about.bio}</p>
        </motion.div>

        {/* Profile image + bio columns */}
        <div className={styles.profileGrid}>
          <motion.div
            className={styles.profileImageWrap}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src={CAMPAIGN.candidate.profileImage}
              alt={CAMPAIGN.candidate.name}
              width={480}
              height={560}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <div className={styles.imageAccent} />
          </motion.div>

          <motion.div
            className={styles.profileDetails}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <h3 className={styles.profileName}>{CAMPAIGN.candidate.name}</h3>
            <p className={styles.profileTitle}>{CAMPAIGN.candidate.title}, {CAMPAIGN.candidate.state}</p>
            <p className={styles.profileBio}>
              A lifelong advocate for the people of Taraba, Hon. Danjuma Usman Shiddi (Danji SS) has dedicated
              decades to security reform, economic development, and community empowerment.
              His track record as a lawmaker and administrator speaks louder than promises.
            </p>
            <div className={styles.highlights}>
              {[
                { icon: "🎓", text: "BUK Political Science Alumni" },
                { icon: "🏛️", text: "Former Representative, Wukari/Ibi Federal Constituency" },
                { icon: "🛡️", text: "Former Assistant Director, DSS" },
                { icon: "🌾", text: "Champion for Rural & Local Content Interventions" },
              ].map((h) => (
                <div key={h.text} className={styles.highlight}>
                  <span className={styles.highlightIcon}>{h.icon}</span>
                  <span>{h.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className={styles.timelineHeader}>
          <span className="section-label">His Journey</span>
          <h2 className="section-title">A Life of Service</h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {CAMPAIGN.about.timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}