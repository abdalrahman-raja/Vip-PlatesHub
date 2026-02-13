import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PlateCard from "@/components/plate-card"
import { getFeaturedPlates } from "@/lib/plates-data"

export default function FeaturedPlates() {
  const featured = getFeaturedPlates().slice(0, 8)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div>
          <h2 className="text-3xl font-black text-foreground md:text-4xl">
            {"لوحات مميزة"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {"أفخم الأرقام المعروضة للبيع حالياً"}
          </p>
        </div>
        <Link href="/plates?category=vip">
          <Button variant="outline" className="gap-2 border-primary/30 text-foreground hover:bg-primary/10">
            {"عرض الكل"}
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((plate) => (
          <PlateCard key={plate.id} plate={plate} />
        ))}
      </div>
    </section>
  )
}
