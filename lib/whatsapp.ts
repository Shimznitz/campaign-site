// lib/whatsapp.ts
// ============================================================
// Thin wrapper around Meta's WhatsApp Cloud API.
// Handles sending text messages and marking messages as read.
// ============================================================

const WHATSAPP_API_VERSION = "v19.0";

function apiUrl(path: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  return `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${phoneNumberId}${path}`;
}

function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
  };
}

/** Send a plain text WhatsApp message to a phone number (E.164 format, no '+'). */
export async function sendWhatsAppText(to: string, body: string) {
  const res = await fetch(apiUrl("/messages"), {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body, preview_url: false },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("WhatsApp send error:", errText);
    throw new Error(`WhatsApp API error: ${res.status}`);
  }

  return res.json();
}

/** Mark an inbound message as read (shows blue ticks). */
export async function markAsRead(messageId: string) {
  try {
    await fetch(apiUrl("/messages"), {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      }),
    });
  } catch (err) {
    console.error("Failed to mark message as read:", err);
  }
}

/** Send a one-time welcome message to a brand new supporter who just joined via the site. */
export async function sendWelcomeMessage(to: string, name: string) {
  const cleanPhone = to.replace(/[^0-9]/g, "");
  const message = `Hi ${name}! 👋 Welcome to the movement with Danjuma Usman Shiddi (Danji SS).

Thank you for joining us. I'm the campaign's WhatsApp assistant — feel free to ask me anything about Danji SS, his plans, or how to get more involved.

What would you like to know?`;
  return sendWhatsAppText(cleanPhone, message);
}
