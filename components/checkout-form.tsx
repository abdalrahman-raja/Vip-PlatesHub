"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CreditCard,
  Bitcoin,
  ArrowRight,
  Shield,
  Check,
  User,
  Mail,
  Phone,
  Lock,
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
  const [method, setMethod] = useState<"crypto" | "card">(
    initialMethod === "card" ? "card" : "crypto"
  )
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call NOWPayments API or Stripe
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-black text-foreground">
          {"تم استلام طلبك بنجاح!"}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          {method === "crypto"
            ? "سيتم توجيهك إلى بوابة NOWPayments لإتمام الدفع بالعملات الرقمية. ستتلقى تأكيداً عبر البريد الإلكتروني بعد إتمام الدفع."
            : "تمت معالجة الدفع بنجاح. ستتلقى تأكيداً عبر البريد الإلكتروني قريباً."}
        </p>
        <div className="mb-8 rounded-xl border border-border/50 bg-card p-6">
          <h2 className="mb-2 text-lg font-bold text-foreground">{"ملخص الطلب"}</h2>
          <p className="text-muted-foreground">
            {"لوحة"} {emirateNames[plate.emirate]} - {plate.code} {plate.number}
          </p>
          <p className="mt-2 text-2xl font-black text-primary">{formatPrice(plate.price)}</p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {"العودة للرئيسية"}
            </Button>
          </Link>
          <Link href="/plates">
            <Button variant="outline" className="border-border/50 text-foreground">
              {"تصفح المزيد"}
            </Button>
          </Link>
        </div>
      </div>
    )
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
              <h2 className="mb-4 text-lg font-bold text-foreground">{"اختر طريقة الدفع"}</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMethod("crypto")}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 text-right transition-all ${
                    method === "crypto"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-secondary/30 hover:border-border"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${method === "crypto" ? "bg-primary/20" : "bg-secondary"}`}>
                    <Bitcoin className={`h-5 w-5 ${method === "crypto" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${method === "crypto" ? "text-foreground" : "text-muted-foreground"}`}>
                      {"عملات رقمية"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"عبر NOWPayments"}
                    </p>
                  </div>
                  {method === "crypto" && (
                    <Check className="mr-auto h-5 w-5 text-primary" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`flex items-center gap-3 rounded-lg border-2 p-4 text-right transition-all ${
                    method === "card"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-secondary/30 hover:border-border"
                  }`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${method === "card" ? "bg-primary/20" : "bg-secondary"}`}>
                    <CreditCard className={`h-5 w-5 ${method === "card" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${method === "card" ? "text-foreground" : "text-muted-foreground"}`}>
                      {"بطاقة ائتمانية"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {"Visa / Mastercard"}
                    </p>
                  </div>
                  {method === "card" && (
                    <Check className="mr-auto h-5 w-5 text-primary" />
                  )}
                </button>
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

            {/* Card Details (only for card method) */}
            {method === "card" && (
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
                          maxLength={4}
                          className="border-border/50 bg-secondary/30 pr-10 text-foreground placeholder:text-muted-foreground"
                          dir="ltr"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Crypto Info */}
            {method === "crypto" && (
              <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
                <div className="flex items-start gap-3">
                  <Bitcoin className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                  <div>
                    <p className="text-sm font-bold text-foreground">{"الدفع عبر NOWPayments"}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {"بعد تأكيد الطلب، سيتم توجيهك إلى بوابة NOWPayments لإتمام الدفع. يمكنك الدفع باستخدام Bitcoin أو Ethereum أو USDT أو أي عملة رقمية مدعومة أخرى."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className={`w-full gap-2 text-lg font-bold ${
                method === "crypto"
                  ? "bg-gradient-to-l from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {method === "crypto" ? (
                <>
                  <Bitcoin className="h-5 w-5" />
                  {"تأكيد والدفع بالعملات الرقمية"}
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
                  {method === "crypto" ? "عملات رقمية" : "بطاقة ائتمانية"}
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
