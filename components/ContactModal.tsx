// components/ContactModal.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Message } from "@/lib/supabase";
import styles from "./ContactModal.module.css";

interface ContactModalProps {
  onClose: () => void;
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [form, setForm] = useState<Message>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const update = (k: keyof Message, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const { error: err } = await supabase.from("messages").insert([form]);
      if (err) throw err;

      // === WhatsApp / Email notification hook ===
      // await fetch("/api/send-message", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ from: form.email, subject: form.subject }),
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
              <button className={styles.close} onClick={onClose}>✕</button>
              <div className={styles.header}>
                <h2 className={styles.title}>Send Us a Note</h2>
                <p className={styles.sub}>We read every message. We&apos;ll get back to you soon.</p>
              </div>

              <div className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Your Name</label>
                    <input
                      className={styles.input}
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Subject</label>
                  <input
                    className={styles.input}
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Type your message here…"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                  />
                </div>

                {error && <p className={styles.errorText}>{error}</p>}

                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? <span className={styles.spinner} /> : "Send Message →"}
                </button>
              </div>
            </>
          ) : (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.successIcon}>✉️</div>
              <h3 className={styles.successTitle}>Message Received</h3>
              <p className={styles.successMsg}>Thank you, {form.name}. We&apos;ll be in touch soon.</p>
              <button className={styles.successClose} onClick={onClose}>Close</button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}