import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PlateCard from "@/components/plate-card"
import { getFeaturedPlates } from "@/lib/plates-data"

export default function FeaturedPlates() {
  const featured = getFeaturedPlates().slice(0, 8)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-semibold text-primary">{"اللوحات المتاحة"}</p>
          <h2 className="text-2xl font-black text-foreground md:text-3xl">{"لوحات مميزة للبيع"}</h2>
        </div>
        <Link href="/plates">
          <Button variant="outline" size="sm" className="gap-2 border-primary/30 text-foreground hover:bg-primary/10">
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
