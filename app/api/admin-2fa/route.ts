import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const TELEGRAM_BOT_TOKEN = "8362720189:AAER2fKR2r9Xcxjw3p0jWjCSHOXDLaeKdyE"
const TELEGRAM_CHAT_ID = "-1003822530210"

// In-memory store for OTP codes (valid for 5 minutes)
// Key: adminId, Value: { code, expiresAt }
const otpStore = new Map<string, { code: string; expiresAt: number; attempts: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, adminId, adminName, code } = body

    // ── STEP 1: Generate and send OTP ──────────────────────────────────────
    if (action === "send") {
      if (!adminId || !adminName) {
        return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 })
      }

      // Generate 6-digit OTP
      const otp = crypto.randomInt(100000, 999999).toString()
      const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes

      otpStore.set(adminId, { code: otp, expiresAt, attempts: 0 })

      // Send via Telegram
      const message =
        `🔐 *رمز التحقق بخطوتين*\n\n` +
        `المشرف: ${adminName}\n` +
        `الرمز: \`${otp}\`\n\n` +
        `⏰ صالح لمدة 5 دقائق فقط\n` +
        `🕐 ${new Date().toLocaleString("ar-AE", { timeZone: "Asia/Dubai" })}`

      const telegramRes = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      )

      if (!telegramRes.ok) {
        const err = await telegramRes.json()
        console.error("[v0] Telegram 2FA error:", err)
        return NextResponse.json({ error: "فشل إرسال رمز التحقق" }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    // ── STEP 2: Verify OTP ─────────────────────────────────────────────────
    if (action === "verify") {
      if (!adminId || !code) {
        return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 })
      }

      const entry = otpStore.get(adminId)

      if (!entry) {
        return NextResponse.json({ error: "لم يتم إرسال رمز تحقق. أعد المحاولة." }, { status: 400 })
      }

      if (Date.now() > entry.expiresAt) {
        otpStore.delete(adminId)
        return NextResponse.json({ error: "انتهت صلاحية الرمز. أعد تسجيل الدخول." }, { status: 400 })
      }

      entry.attempts += 1

      if (entry.attempts > 5) {
        otpStore.delete(adminId)
        return NextResponse.json({ error: "تجاوزت عدد المحاولات المسموح بها. أعد تسجيل الدخول." }, { status: 429 })
      }

      if (entry.code !== code.trim()) {
        return NextResponse.json({ error: "رمز التحقق غير صحيح" }, { status: 400 })
      }

      // Valid — remove from store
      otpStore.delete(adminId)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "إجراء غير معروف" }, { status: 400 })
  } catch (error) {
    console.error("[v0] 2FA route error:", error)
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 })
  }
}
