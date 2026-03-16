import { NextResponse } from "next/server"
import crypto from "crypto"

const IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const data = JSON.parse(body)
    
    // Verify signature if IPN secret is set
    if (IPN_SECRET) {
      const signature = request.headers.get("x-nowpayments-sig")
      if (signature) {
        const hmac = crypto.createHmac("sha512", IPN_SECRET)
        hmac.update(JSON.stringify(data))
        const calculatedSignature = hmac.digest("hex")
        
        if (signature !== calculatedSignature) {
          console.error("Invalid IPN signature")
          return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
        }
      }
    }

    const { payment_status, order_id, pay_amount, pay_currency, actually_paid } = data

    console.log("Crypto payment webhook received:", {
      payment_status,
      order_id,
      pay_amount,
      pay_currency,
      actually_paid,
    })

    // Handle different payment statuses
    switch (payment_status) {
      case "finished":
      case "confirmed":
        // Payment successful - update order status in database
        console.log(`Payment confirmed for order: ${order_id}`)
        // TODO: Update order status in your database
        break
      case "partially_paid":
        console.log(`Partial payment for order: ${order_id}`)
        break
      case "failed":
      case "expired":
        console.log(`Payment failed/expired for order: ${order_id}`)
        break
      default:
        console.log(`Payment status ${payment_status} for order: ${order_id}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
