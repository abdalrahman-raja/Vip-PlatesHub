import { NextRequest, NextResponse } from "next/server"

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { price_amount, price_currency, order_id, order_description, success_url, cancel_url } = body

    if (!NOWPAYMENTS_API_KEY) {
      return NextResponse.json(
        { error: "NOWPayments API key not configured" },
        { status: 500 }
      )
    }

    // Create invoice using NOWPayments API
    const response = await fetch(`${NOWPAYMENTS_API_URL}/invoice`, {
      method: "POST",
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_amount,
        price_currency: price_currency || "USD",
        order_id,
        order_description,
        ipn_callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://vip-plates-hub.vercel.app"}/api/nowpayments/ipn`,
        success_url: success_url || `${process.env.NEXT_PUBLIC_BASE_URL || "https://vip-plates-hub.vercel.app"}/checkout/success`,
        cancel_url: cancel_url || `${process.env.NEXT_PUBLIC_BASE_URL || "https://vip-plates-hub.vercel.app"}/checkout/cancel`,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("NOWPayments error:", errorData)
      return NextResponse.json(
        { error: "Failed to create payment invoice" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("NOWPayments API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// Get available currencies
export async function GET() {
  try {
    if (!NOWPAYMENTS_API_KEY) {
      return NextResponse.json(
        { error: "NOWPayments API key not configured" },
        { status: 500 }
      )
    }

    const response = await fetch(`${NOWPAYMENTS_API_URL}/currencies`, {
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch currencies" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("NOWPayments currencies error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
