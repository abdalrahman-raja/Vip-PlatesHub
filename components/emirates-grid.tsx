import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import {
  type Emirate,
  emirateNames,
  emirateImages,
  plates,
} from "@/lib/plates-data"

const emirates: Emirate[] = [
  "dubai",
  "abudhabi",
  "sharjah",
  "ajman",
  "rak",
  "fujairah",
  "uaq",
]

export default function EmiratesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
          {"تصفح حسب الإمارة"}
        </h2>
        <p className="text-muted-foreground">
          {"اختر الإمارة للاطلاع على اللوحات المتاحة"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {emirates.map((emirate) => {
          const count = plates.filter((p) => p.emirate === emirate).length
          return (
            <Link
              key={emirate}
              href={`/plates?emirate=${emirate}`}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={emirateImages[emirate]}
                  alt={`لوحات ${emirateNames[emirate]}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {emirateNames[emirate]}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {count} {"لوحة متاحة"}
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
