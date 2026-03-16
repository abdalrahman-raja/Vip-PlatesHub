import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      payment_id,
      payment_status,
      pay_address,
      price_amount,
      price_currency,
      pay_amount,
      pay_currency,
      order_id,
      order_description,
    } = body

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const statusEmoji: Record<string, string> = {
        waiting: "⏳",
        confirming: "🔄",
        confirmed: "✅",
        sending: "📤",
        partially_paid: "⚠️",
        finished: "✅",
        failed: "❌",
        refunded: "↩️",
        expired: "⌛",
      }

      const emoji = statusEmoji[payment_status] || "ℹ️"

      const message =
        `${emoji} *تحديث دفع عملة رقمية*\n\n` +
        `🆔 Payment ID: ${payment_id}\n` +
        `📋 Order ID: ${order_id}\n` +
        `📝 الوصف: ${order_description}\n` +
        `💰 المبلغ: ${price_amount} ${price_currency?.toUpperCase()}\n` +
        `🪙 الدفع: ${pay_amount} ${pay_currency?.toUpperCase()}\n` +
        `📍 العنوان: ${pay_address}\n` +
        `📊 الحالة: ${payment_status}\n\n` +
        `🕐 الوقت: ${new Date().toLocaleString("ar-AE", { timeZone: "Asia/Dubai" })}`

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      })
    }

    return NextResponse.json({ status: "ok" })
  } catch (error) {
    console.error("[nowpayments] webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
