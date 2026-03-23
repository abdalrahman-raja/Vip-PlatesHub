"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Crown,
  Shield,
  CreditCard,
  Bitcoin,
  Landmark,
  Phone,
  ArrowRight,
  Share2,
  Heart,
  Check,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Plate } from "@/lib/plates-data"
import {
  emirateNames,
  emirateColors,
  emirateTextColors,
  categoryNames,
  formatPrice,
  plates,
} from "@/lib/plates-data"
import PlateCard from "@/components/plate-card"
import { useAdmin } from "@/lib/admin-store"

interface PlateDetailProps {
  plate: Plate
}

export default function PlateDetail({ plate }: PlateDetailProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const { paymentSettings, siteSettings } = useAdmin()

  const whatsappNumber = paymentSettings.bankTransfer?.whatsappNumber?.replace(/\+/g, "") || siteSettings.whatsappNumber?.replace(/\+/g, "") || "971501234567"
  const whatsappMessage = encodeURIComponent(
    `مرحباً، أريد الاستفسار عن اللوحة: ${emirateNames[plate.emirate]} ${plate.code} ${plate.number} - السعر: ${formatPrice(plate.price)}`
  )

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  // Get similar plates from the same emirate, excluding current
  const similarPlates = plates
    .filter((p) => p.emirate === plate.emirate && p.id !== plate.id)
    .slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="مسار التنقل">
        <Link href="/" className="transition-colors hover:text-primary">
          {"الرئيسية"}
        </Link>
        <span>/</span>
        <Link href="/plates" className="transition-colors hover:text-primary">
          {"جميع اللوحات"}
        </Link>
        <span>/</span>
        <Link
          href={`/plates?emirate=${plate.emirate}`}
          className="transition-colors hover:text-primary"
        >
          {emirateNames[plate.emirate]}
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {plate.code} {plate.number}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Plate Visual */}
        <div className={`relative overflow-hidden rounded-2xl border-2 ${emirateColors[plate.emirate]} border-opacity-40 bg-card`}>
          {/* Category Badge */}
          {plate.category === "vip" && (
            <div className="absolute right-4 top-4 z-10">
              <Badge className="gap-1 bg-primary px-3 py-1 text-sm text-primary-foreground">
                <Crown className="h-4 w-4" />
                VIP
              </Badge>
            </div>
          )}

          <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
            <Image
              src={plate.image}
              alt={`لوحة ${emirateNames[plate.emirate]} رقم ${plate.number}`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Plate Number Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
              <span className={`mb-2 text-sm font-bold uppercase ${emirateTextColors[plate.emirate]}`}>
                {emirateNames[plate.emirate]}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-bold text-muted-foreground">{plate.code}</span>
                <span className="text-5xl font-black text-foreground md:text-7xl">{plate.number}</span>
              </div>
            </div>
          </div>

          {/* Share & Like */}
          <div className="flex items-center justify-between border-t border-border/50 p-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${emirateTextColors[plate.emirate]}`}>
                {emirateNames[plate.emirate]}
              </span>
              <span className="text-muted-foreground">|</span>
              <span className="text-sm text-muted-foreground">
                {categoryNames[plate.category]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLiked(!liked)}
                className={liked ? "text-red-500" : "text-muted-foreground"}
                aria-label="اضافة للمفضلة"
              >
                <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-muted-foreground"
                aria-label="مشاركة الرابط"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Share2 className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Details & Purchase */}
        <div className="flex flex-col gap-6">
          {/* Title & Price */}
          <div>
            <h1 className="mb-2 text-3xl font-black text-foreground md:text-4xl">
              {"لوحة"} {emirateNames[plate.emirate]}
            </h1>
            <p className="mb-4 text-lg text-muted-foreground">
              {"الكود"}: <span className="font-bold text-foreground">{plate.code}</span>{" "}
              {"- الرقم"}: <span className="font-bold text-foreground">{plate.number}</span>
            </p>
            <div className="inline-block rounded-xl bg-primary/10 px-6 py-3">
              <p className="text-sm text-muted-foreground">{"السعر"}</p>
              <p className="text-3xl font-black text-primary md:text-4xl">
                {formatPrice(plate.price)}
              </p>
            </div>
          </div>

          {/* Plate Details */}
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">{"تفاصيل اللوحة"}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground">{"الإمارة"}</p>
                <p className={`text-sm font-bold ${emirateTextColors[plate.emirate]}`}>
                  {emirateNames[plate.emirate]}
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground">{"الفئة"}</p>
                <p className="text-sm font-bold text-foreground">
                  {categoryNames[plate.category]}
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground">{"الكود"}</p>
                <p className="text-sm font-bold text-foreground">{plate.code}</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-3">
                <p className="text-xs text-muted-foreground">{"الرقم"}</p>
                <p className="text-sm font-bold text-foreground">{plate.number}</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">{"طرق الدفع"}</h2>
            <div className="flex flex-col gap-3">
              {paymentSettings.creditCard.enabled && (
                <Link href={`/checkout/${plate.id}?method=card`}>
                  <Button
                    size="lg"
                    className="w-full gap-3 bg-primary text-base font-bold text-primary-foreground hover:bg-primary/90"
                  >
                    <CreditCard className="h-5 w-5" />
                    {"الدفع بالبطاقة الائتمانية"}
                  </Button>
                </Link>
              )}
              {paymentSettings.nowpayments.enabled && (
                <Link href={`/checkout/${plate.id}?method=crypto`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-3 border-orange-500/50 bg-gradient-to-l from-orange-500/10 to-amber-500/10 text-base font-bold text-foreground hover:from-orange-500/20 hover:to-amber-500/20"
                  >
                    <Bitcoin className="h-5 w-5 text-orange-500" />
                    {"الدفع بالعملات الرقمية"}
                  </Button>
                </Link>
              )}
              {paymentSettings.bankTransfer?.enabled && (
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`مرحباً، أريد الدفع عبر التحويل البنكي للوحة: ${emirateNames[plate.emirate]} ${plate.code} ${plate.number} - السعر: ${formatPrice(plate.price)}\n\nيرجى إرسال تفاصيل الحساب البنكي للتحويل.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full gap-3 border-blue-500/50 bg-gradient-to-l from-blue-500/10 to-cyan-500/10 text-base font-bold text-foreground hover:from-blue-500/20 hover:to-cyan-500/20"
                  >
                    <Landmark className="h-5 w-5 text-blue-500" />
                    {"الدفع عبر التحويل البنكي"}
                  </Button>
                </a>
              )}
              {!paymentSettings.creditCard.enabled && !paymentSettings.nowpayments.enabled && !paymentSettings.bankTransfer?.enabled && (
                <p className="text-center text-sm text-muted-foreground">{"لا توجد طرق دفع متاحة حالياً"}</p>
              )}
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {"معاملات آمنة ومشفرة"}
            </p>
          </div>

          {/* Contact Actions */}
          <div className="rounded-xl border border-border/50 bg-card p-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">{"تواصل معنا"}</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#20BD5A]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {"استفسار عبر الواتساب"}
              </a>
              <a
                href="tel:+971501234567"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Phone className="h-5 w-5" />
                {"اتصل الآن"}
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-500" />
              {"معاملة آمنة 100%"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-green-500" />
              {"نقل ملكية رسمي"}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Copy className="h-4 w-4 text-green-500" />
              {"ضمان أصالة الرقم"}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Plates */}
      {similarPlates.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-foreground">
              {"لوحات مشابهة من"} {emirateNames[plate.emirate]}
            </h2>
            <Link
              href={`/plates?emirate=${plate.emirate}`}
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              {"عرض الكل"}
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similarPlates.map((p) => (
              <PlateCard key={p.id} plate={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
