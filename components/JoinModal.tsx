// components/JoinModal.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Supporter } from "@/lib/supabase";
import styles from "./JoinModal.module.css";

const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];

const INTERESTS = ["Supporter", "Volunteer", "Media", "Donor"];

interface JoinModalProps {
  onClose: () => void;
}

export default function JoinModal({ onClose }: JoinModalProps) {
  const [form, setForm] = useState<Supporter>({
    name: "", email: "", whatsapp: "", state: "", lga: "", occupation: "", interest: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (k: keyof Supporter, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.whatsapp || !form.state || !form.interest) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const { error: err } = await supabase.from("supporters").insert([form]);
      if (err) throw err;

      // === WhatsApp Integration Point ===
      // After saving, trigger welcome message to form.whatsapp
      // await fetch("/api/whatsapp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phone: form.whatsapp, name: form.name, type: "welcome" }),
      // });

      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {status !== "success" ? (
            <>
              <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
              <div className={styles.header}>
                <div className={styles.badge}>Join the Movement</div>
                <h2 className={styles.title}>Become Part of the Change</h2>
                <p className={styles.sub}>Together we build a better future for Taraba.</p>
              </div>

              <div className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Full Name *</label>
                    <input
                      className={styles.input}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email Address *</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>WhatsApp Number *</label>
                    <input
                      className={styles.input}
                      placeholder="+234 800 000 0000"
                      value={form.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Occupation</label>
                    <input
                      className={styles.input}
                      placeholder="What do you do?"
                      value={form.occupation}
                      onChange={(e) => update("occupation", e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>State *</label>
                    <select
                      className={styles.input}
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                    >
                      <option value="">Select state</option>
                      {STATES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>LGA</label>
                    <input
                      className={styles.input}
                      placeholder="Your local government area"
                      value={form.lga}
                      onChange={(e) => update("lga", e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>I want to be a… *</label>
                  <div className={styles.interestGroup}>
                    {INTERESTS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className={`${styles.interestBtn} ${form.interest === opt ? styles.selected : ""}`}
                        onClick={() => update("interest", opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className={styles.errorText}>{error}</p>}

                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className={styles.spinner} />
                  ) : (
                    "Join the Movement →"
                  )}
                </button>
              </div>
            </>
          ) : (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.successIcon}>🎉</div>
              <h3 className={styles.successTitle}>Welcome to the Movement</h3>
              <p className={styles.successMsg}>
                Thank you, {form.name}! You&apos;re now part of something bigger than all of us.
                Watch your WhatsApp for a welcome message.
              </p>
              <button className={styles.successClose} onClick={onClose}>
                Continue Exploring
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}