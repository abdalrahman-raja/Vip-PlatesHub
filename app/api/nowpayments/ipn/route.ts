import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error("Telegram credentials not configured")
    return
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })
  } catch (error) {
    console.error("Failed to send Telegram message:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verify IPN signature if secret is configured
    if (IPN_SECRET) {
      const signature = request.headers.get("x-nowpayments-sig")
      
      if (signature) {
        const sortedBody = JSON.stringify(body, Object.keys(body).sort())
        const hmac = crypto
          .createHmac("sha512", IPN_SECRET)
          .update(sortedBody)
          .digest("hex")
        
        if (hmac !== signature) {
          console.error("Invalid IPN signature")
          return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
        }
      }
    }

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
      created_at,
    } = body

    // Send notification to Telegram
    const message = `
<b>🔔 تحديث دفع بالعملات الرقمية</b>

<b>رقم الدفع:</b> ${payment_id}
<b>الحالة:</b> ${payment_status}
<b>رقم الطلب:</b> ${order_id || "غير محدد"}
<b>الوصف:</b> ${order_description || "غير محدد"}

<b>المبلغ المطلوب:</b> ${price_amount} ${price_currency}
<b>المبلغ بالعملة الرقمية:</b> ${pay_amount} ${pay_currency}
<b>عنوان الدفع:</b> <code>${pay_address}</code>

<b>تاريخ الإنشاء:</b> ${created_at}
`

    await sendTelegramMessage(message)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("IPN processing error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
