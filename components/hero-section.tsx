import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 max-w-3xl text-balance text-3xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl">
            {"منصتك الأولى لبيع وشراء"}
            <br />
            <span className="gold-shimmer">{"لوحات السيارات في الإمارات"}</span>
          </h1>

          <p className="mb-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {"اختر رقمك الخاص وتمتع بتجربة شراء سهلة وسريعة"}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/plates">
              <Button size="lg" className="gap-2 bg-primary px-8 text-base font-bold text-primary-foreground hover:bg-primary/90">
                {"اكتشف العروض الآن"}
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">{"من 15,000 درهم فقط"}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
