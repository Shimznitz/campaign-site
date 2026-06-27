// app/admin/page.tsx
// ============================================================
// Private admin page — not linked anywhere on the public site.
// Access via: yoursite.com/admin
// Password is set in .env.local as ADMIN_PASSWORD
// ============================================================
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./admin.module.css";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type Supporter = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  state: string;
  lga: string;
  occupation: string;
  interest: string;
  created_at: string;
};

type Tab = "messages" | "supporters";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "danji2027admin";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const login = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    fetchData();
  }, [authed, tab]);

  const fetchData = async () => {
    setLoading(true);
    if (tab === "messages") {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });
      setMessages(data || []);
    } else {
      const { data } = await supabase
        .from("supporters")
        .select("*")
        .order("created_at", { ascending: false });
      setSupporters(data || []);
    }
    setLoading(false);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-NG", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const filteredMessages = messages.filter((m) =>
    [m.name, m.email, m.subject, m.message]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const filteredSupporters = supporters.filter((s) =>
    [s.name, s.email, s.whatsapp, s.state, s.lga, s.interest]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // ── Login screen ──────────────────────────────────────────
  if (!authed) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <div className={styles.loginLogo}>⚙️</div>
          <h1 className={styles.loginTitle}>Campaign Admin</h1>
          <p className={styles.loginSub}>Staff access only</p>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Enter password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            autoFocus
          />
          {pwError && <p className={styles.loginError}>Incorrect password</p>}
          <button className={styles.loginBtn} onClick={login}>
            Enter
          </button>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────────
  return (
    <div className={styles.wrap}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.headerTitle}>Campaign Admin</h1>
            <p className={styles.headerSub}>Danji SS · Taraba State</p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statPill}>
              <span className={styles.statNum}>{messages.length}</span>
              <span className={styles.statLbl}>Messages</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statNum}>{supporters.length}</span>
              <span className={styles.statLbl}>Supporters</span>
            </div>
            <button className={styles.logoutBtn} onClick={() => setAuthed(false)}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === "messages" ? styles.activeTab : ""}`}
            onClick={() => { setTab("messages"); setSearch(""); setExpanded(null); }}
          >
            ✉️ Messages <span className={styles.badge}>{messages.length}</span>
          </button>
          <button
            className={`${styles.tab} ${tab === "supporters" ? styles.activeTab : ""}`}
            onClick={() => { setTab("supporters"); setSearch(""); setExpanded(null); }}
          >
            🙋 Supporters <span className={styles.badge}>{supporters.length}</span>
          </button>
        </div>

        {/* Search + refresh */}
        <div className={styles.toolbar}>
          <input
            className={styles.search}
            placeholder={tab === "messages" ? "Search by name, subject, email…" : "Search by name, state, LGA, interest…"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.refreshBtn} onClick={fetchData}>
            ↻ Refresh
          </button>
        </div>

        {loading && <p className={styles.loading}>Loading…</p>}

        {/* ── Messages tab ──────────────────────────────── */}
        {!loading && tab === "messages" && (
          <div className={styles.list}>
            {filteredMessages.length === 0 && (
              <p className={styles.empty}>No messages yet.</p>
            )}
            {filteredMessages.map((m) => (
              <div
                key={m.id}
                className={`${styles.card} ${expanded === m.id ? styles.cardOpen : ""}`}
              >
                <div
                  className={styles.cardHeader}
                  onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                >
                  <div className={styles.cardLeft}>
                    <div className={styles.avatar}>
                      {m.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={styles.cardName}>{m.name}</p>
                      <p className={styles.cardMeta}>{m.email} · {formatDate(m.created_at)}</p>
                    </div>
                  </div>
                  <div className={styles.cardRight}>
                    <span className={styles.subject}>{m.subject}</span>
                    <span className={styles.chevron}>
                      {expanded === m.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>
                {expanded === m.id && (
                  <div className={styles.cardBody}>
                    <div className={styles.messageBox}>
                      <p className={styles.messageText}>{m.message}</p>
                    </div>
                    <div className={styles.cardActions}>
                      <a
                        href={`mailto:${m.email}?subject=Re: ${m.subject}`}
                        className={styles.replyBtn}
                      >
                        ✉ Reply by Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Supporters tab ────────────────────────────── */}
        {!loading && tab === "supporters" && (
          <>
            {/* Interest breakdown */}
            <div className={styles.breakdown}>
              {["Supporter", "Volunteer", "Donor", "Media"].map((i) => {
                const count = supporters.filter((s) => s.interest === i).length;
                return (
                  <div key={i} className={styles.breakdownItem}>
                    <span className={styles.breakdownNum}>{count}</span>
                    <span className={styles.breakdownLbl}>{i}s</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.list}>
              {filteredSupporters.length === 0 && (
                <p className={styles.empty}>No supporters yet.</p>
              )}
              {filteredSupporters.map((s) => (
                <div key={s.id} className={styles.supporterCard}>
                  <div className={styles.supporterLeft}>
                    <div className={`${styles.avatar} ${styles.avatarGreen}`}>
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className={styles.cardName}>{s.name}</p>
                      <p className={styles.cardMeta}>
                        {s.state}{s.lga ? ` · ${s.lga}` : ""} · {s.occupation || "—"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.supporterRight}>
                    <span className={`${styles.interestTag} ${styles[`tag_${s.interest?.toLowerCase()}`] || ""}`}>
                      {s.interest}
                    </span>
                    <div className={styles.supporterContact}>
                      <a href={`https://wa.me/${s.whatsapp?.replace(/[^0-9]/g, "")}`}
                        target="_blank" rel="noopener noreferrer"
                        className={styles.waLink}>
                        📱 {s.whatsapp}
                      </a>
                      <a href={`mailto:${s.email}`} className={styles.emailLink}>
                        ✉ {s.email}
                      </a>
                    </div>
                    <p className={styles.joinDate}>{formatDate(s.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}