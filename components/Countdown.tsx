// components/Countdown.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CAMPAIGN } from "@/lib/config";
import styles from "./Countdown.module.css";

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const tick = () => setTime(getTimeLeft(CAMPAIGN.candidate.electionDate));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.inner} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.label}>Election Day</span>
          <h2 className={styles.title}>The Clock is Ticking</h2>
          <p className={styles.subtitle}>
            {new Date(CAMPAIGN.candidate.electionDate).toLocaleDateString("en-NG", {
              weekday: "long", year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </motion.div>

        <div className={styles.grid}>
          {units.map((u, i) => (
            <motion.div
              key={u.label}
              className={styles.unit}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.value}>
                {String(u.value).padStart(2, "0")}
              </div>
              <div className={styles.unitLabel}>{u.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.cta}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Every day counts. Join the movement and make your voice heard.
        </motion.p>
      </div>
    </section>
  );
}