// components/LoadingScreen.tsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAMPAIGN } from "@/lib/config";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1800;

    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(Math.floor(p * 100));
      if (p < 1) requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 400);
        }, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.screen}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.initial}>
              {CAMPAIGN.candidate.name.split(" ").map(w => w[0]).join("")}
            </div>
            <p className={styles.name}>{CAMPAIGN.candidate.name}</p>
            <p className={styles.title}>{CAMPAIGN.candidate.title}</p>
            <div className={styles.bar}>
              <motion.div
                className={styles.barFill}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}