import { NextResponse } from "next/server"

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1"

export async function POST(request: Request) {
  try {
    if (!NOWPAYMENTS_API_KEY) {
      return NextResponse.json(
        { error: "NOWPayments API key not configured" },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { price_amount, order_id, order_description, plate_id } = body

    if (!price_amount || !order_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create invoice via NOWPayments API
    const response = await fetch(`${NOWPAYMENTS_API_URL}/invoice`, {
      method: "POST",
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount: price_amount,
        price_currency: "aed",
        order_id: order_id,
        order_description: order_description || `Plate ${plate_id}`,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://vip-plates-hub.vercel.app"}/api/crypto/webhook`,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://vip-plates-hub.vercel.app"}/checkout/success?plate=${plate_id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://vip-plates-hub.vercel.app"}/plate/${plate_id}`,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("NOWPayments API error:", data)
      return NextResponse.json(
        { error: data.message || "Failed to create invoice" },
        { status: response.status }
      )
    }

    return NextResponse.json({
      invoice_url: data.invoice_url,
      invoice_id: data.id,
    })
  } catch (error) {
    console.error("Error creating crypto payment:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
