import { NextRequest, NextResponse } from "next/server"

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { price_amount, order_id, order_description, plate_id } = body

    if (!NOWPAYMENTS_API_KEY) {
      return NextResponse.json({ error: "NOWPayments not configured" }, { status: 500 })
    }

    const response = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount,
        price_currency: "usd",
        order_id,
        order_description,
        ipn_callback_url: `${NEXT_PUBLIC_SITE_URL}/api/nowpayments/webhook`,
        success_url: `${NEXT_PUBLIC_SITE_URL}/checkout/success?plate=${plate_id}&order=${order_id}`,
        cancel_url: `${NEXT_PUBLIC_SITE_URL}/checkout/${plate_id}`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Failed to create invoice" }, { status: response.status })
    }

    return NextResponse.json({ invoice_url: data.invoice_url, id: data.id })
  } catch (error) {
    console.error("[nowpayments] create-invoice error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
