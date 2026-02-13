import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Shield, CreditCard, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-primary">
              {"المتجر الأول لأرقام السيارات في الإمارات"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 max-w-4xl text-balance text-4xl font-black leading-tight text-foreground md:text-6xl lg:text-7xl">
            <span className="gold-shimmer">أرقام مميزة</span>
            <br />
            <span>{"لسيارتك في الإمارات"}</span>
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {"اكتشف أفخم وأندر أرقام لوحات السيارات من جميع إمارات الدولة. ادفع بالعملات الرقمية أو البطاقة الائتمانية بكل سهولة وأمان."}
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/plates">
              <Button
                size="lg"
                className="gap-2 bg-primary px-8 text-lg font-bold text-primary-foreground hover:bg-primary/90"
              >
                تصفح اللوحات
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/plates?category=vip">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 px-8 text-lg text-foreground hover:bg-primary/10"
              >
                {"لوحات VIP المميزة"}
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-5 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">معاملات آمنة</p>
                <p className="text-xs text-muted-foreground">{"حماية كاملة للمشتري"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-5 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">دفع مرن</p>
                <p className="text-xs text-muted-foreground">{"كريبتو أو بطاقة ائتمانية"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/50 px-5 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">نقل فوري</p>
                <p className="text-xs text-muted-foreground">{"إجراءات سريعة وموثوقة"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
