// lib/conversation.ts
// ============================================================
// Stores and retrieves recent chat history per WhatsApp number,
// so the bot has short-term memory of the conversation instead
// of treating every message as the first one.
// Requires a `conversations` table in Supabase (see SQL below).
// ============================================================

import { supabase } from "./supabase";

export type ChatRole = "user" | "assistant";

export interface ChatTurn {
  role: ChatRole;
  content: string;
}

const MAX_HISTORY_TURNS = 12; // last N messages (user+assistant combined) kept as context

/** Fetch recent conversation history for a phone number, oldest first. */
export async function getRecentHistory(phone: string): Promise<ChatTurn[]> {
  const { data, error } = await supabase
    .from("conversations")
    .select("role, content")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(MAX_HISTORY_TURNS);

  if (error) {
    console.error("Failed to fetch conversation history:", error);
    return [];
  }

  return (data || []).reverse() as ChatTurn[];
}

/** Persist a single turn (user message or assistant reply) to history. */
export async function saveTurn(phone: string, role: ChatRole, content: string) {
  const { error } = await supabase.from("conversations").insert([{ phone, role, content }]);
  if (error) console.error("Failed to save conversation turn:", error);
}
