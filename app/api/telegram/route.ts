import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/application-schema";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ error: "Telegram is not configured" }, { status: 503 });
  }

  const values = parsed.data;
  const message = [
    "<b>Новая заявка Prince Programme</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(values.name)}`,
    `<b>Телефон:</b> ${escapeHtml(values.phone)}`,
    `<b>Email:</b> ${escapeHtml(values.email)}`,
    `<b>Направление:</b> ${escapeHtml(values.interest)}`,
    `<b>Комментарий:</b> ${escapeHtml(values.comment || "Не указан")}`
  ].join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML"
    })
  });

  if (!telegramResponse.ok) {
    return NextResponse.json({ error: "Telegram request failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
