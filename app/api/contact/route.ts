import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, correo y mensaje son requeridos" },
        { status: 400 }
      );
    }

    const db = getEnv().DB;

    const result = await db
      .prepare(
        "INSERT INTO contact_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)"
      )
      .bind(name.trim(), email.trim(), phone?.trim() ?? "", message.trim())
      .run();

    const id = result.meta.last_row_id;

    // Send Telegram alert
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text = [
        "📩 *Nuevo mensaje de contacto*",
        "",
        `*Nombre:* ${escapeTelegram(name)}`,
        `*Email:* ${escapeTelegram(email)}`,
        `*Teléfono:* ${phone ? escapeTelegram(phone) : "—"}`,
        "",
        `*Mensaje:*`,
        escapeTelegram(message),
      ].join("\n");

      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }),
        }
      );
    }

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

function escapeTelegram(text: string): string {
  return text.replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1");
}
