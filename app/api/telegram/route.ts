import { NextResponse } from "next/server";
import { applicationSchema } from "@/lib/application-schema";

export const runtime = "nodejs";

function getRequestAccess(request: Request) {
  const requestOrigin = request.headers.get("origin");
  const serverOrigin = new URL(request.url).origin;
  const configuredOrigins = (process.env.ALLOWED_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([serverOrigin, ...configuredOrigins]);
  const isAllowed = !requestOrigin || allowedOrigins.has(requestOrigin);
  const responseOrigin = requestOrigin && isAllowed ? requestOrigin : serverOrigin;

  return {
    isAllowed,
    headers: {
      "Access-Control-Allow-Origin": responseOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin"
    }
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function OPTIONS(request: Request) {
  const access = getRequestAccess(request);
  return new NextResponse(null, { status: access.isAllowed ? 204 : 403, headers: access.headers });
}

export async function POST(request: Request) {
  const access = getRequestAccess(request);
  const corsHeaders = access.headers;

  if (!access.isAllowed) {
    return NextResponse.json({ error: "Origin is not allowed" }, { status: 403, headers: corsHeaders });
  }

  const body = await request.json().catch(() => null);
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400, headers: corsHeaders });
  }

  // NEXT_PUBLIC_* aliases are supported for the currently supplied env file,
  // but these values must only be referenced from this server-only route.
  const token = process.env.TELEGRAM_BOT_TOKEN ?? process.env.NEXT_PUBLIC_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID ?? process.env.NEXT_PUBLIC_CHANNEL_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Telegram is not configured" },
      { status: 503, headers: corsHeaders }
    );
  }

  const values = parsed.data;
  const message = [
    "<b>Новая заявка Prince Programme</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(values.name)}`,
    `<b>Телефон:</b> ${escapeHtml(values.phone)}`,
    `<b>Email:</b> ${escapeHtml(values.email || "Не указан")}`,
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
    }),
    cache: "no-store"
  }).catch(() => null);

  if (!telegramResponse?.ok) {
    return NextResponse.json(
      { error: "Telegram request failed" },
      { status: 502, headers: corsHeaders }
    );
  }

  return NextResponse.json({ ok: true }, { headers: corsHeaders });
}
