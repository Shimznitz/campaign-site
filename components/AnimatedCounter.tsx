// components/AnimatedCounter.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CAMPAIGN } from "@/lib/config";
import styles from "./AnimatedCounter.module.css";

function Counter({ target, started }: { target: number; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [started, target]);

  return <span>{count.toLocaleString()}</span>;
}

export default function AnimatedCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.inner}>
        {CAMPAIGN.stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.number}>
              <Counter target={stat.value} started={started} />
              <span className={styles.plus}>+</span>
            </div>
            <div className={styles.label}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}