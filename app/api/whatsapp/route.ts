// app/api/whatsapp/route.ts
// ============================================================
// Called from JoinModal right after a new supporter is saved to
// Supabase. Sends them an instant WhatsApp welcome message so the
// conversation starts immediately.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeMessage } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const { phone, name } = await req.json();

    if (!phone || !name) {
      return NextResponse.json({ error: "phone and name are required" }, { status: 400 });
    }

    await sendWelcomeMessage(phone, name);

    return NextResponse.json({ status: "welcome sent" });
  } catch (err) {
    console.error("Welcome message error:", err);
    return NextResponse.json({ error: "failed to send welcome message" }, { status: 500 });
  }
}
