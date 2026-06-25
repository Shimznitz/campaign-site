// lib/aiReply.ts
// ============================================================
// Generates a natural, conversational reply using the Claude API,
// grounded in the campaign knowledge base + recent chat history.
// ============================================================

import { BOT_KNOWLEDGE } from "./botKnowledge";
import type { ChatTurn } from "./conversation";

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
const CLAUDE_MODEL = "claude-sonnet-4-6";

export async function generateReply(history: ChatTurn[], newUserMessage: string): Promise<string> {
  const systemPrompt = `${BOT_KNOWLEDGE}

You are replying inside a real WhatsApp conversation. Keep formatting plain —
no markdown headers, no asterisk bullet lists unless it truly reads better as
a short list. Write the way a thoughtful, warm staffer would text on WhatsApp.`;

  const messages = [
    ...history.map((h) => ({ role: h.role, content: h.content })),
    { role: "user" as const, content: newUserMessage },
  ];

  const res = await fetch(CLAUDE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system: systemPrompt,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Claude API error:", errText);
    return "Sorry, I'm having a little trouble responding right now. Please try again in a moment, or reach out to the campaign team directly through the website.";
  }

  const data = await res.json();
  const textBlock = data.content?.find((b: { type: string }) => b.type === "text");
  return textBlock?.text?.trim() || "Sorry, I didn't quite catch that — could you rephrase?";
}
