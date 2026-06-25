// app/api/webhook/route.ts
// ============================================================
// This is the endpoint Meta calls in two situations:
//
// 1. GET  — Meta verifies your webhook URL when you first set it up.
// 2. POST — Meta sends you an incoming WhatsApp message.
//
// Flow on POST:
//   incoming message → load recent history → ask Claude for a
//   reply → save both turns → send reply back via WhatsApp.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppText, markAsRead } from "@/lib/whatsapp";
import { getRecentHistory, saveTurn } from "@/lib/conversation";
import { generateReply } from "@/lib/aiReply";

// --- Step 1: Webhook verification (Meta calls this once when you configure the URL) ---
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// --- Step 2: Incoming message handler ---
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    // Ignore non-message events (e.g. delivery/read status updates)
    if (!message) {
      return NextResponse.json({ status: "ignored" });
    }

    const from = message.from; // sender's phone number, no '+'
    const messageId = message.id;
    const text = message.text?.body;

    // Only handle plain text messages for now
    if (!text) {
      await sendWhatsAppText(
        from,
        "I can only read text messages right now — could you type your question?"
      );
      return NextResponse.json({ status: "non-text handled" });
    }

    // Mark as read (nice UX — shows blue ticks)
    await markAsRead(messageId);

    // Load short-term memory for this number
    const history = await getRecentHistory(from);

    // Ask Claude for a grounded, conversational reply
    const reply = await generateReply(history, text);

    // Persist both sides of the exchange
    await saveTurn(from, "user", text);
    await saveTurn(from, "assistant", reply);

    // Send the reply back on WhatsApp
    await sendWhatsAppText(from, reply);

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error:", err);
    // Always return 200 to Meta even on internal errors, otherwise Meta will
    // retry the same message repeatedly.
    return NextResponse.json({ status: "error logged" });
  }
}
