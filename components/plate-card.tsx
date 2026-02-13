import Link from "next/link"
import Image from "next/image"
import { Crown, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Plate } from "@/lib/plates-data"
import {
  emirateNames,
  emirateColors,
  emirateTextColors,
  categoryNames,
  formatPrice,
} from "@/lib/plates-data"

interface PlateCardProps {
  plate: Plate
}

export default function PlateCard({ plate }: PlateCardProps) {
  return (
    <Link href={`/plate/${plate.id}`} className="group block">
      <article
        className={`plate-card relative overflow-hidden rounded-xl border-2 ${emirateColors[plate.emirate]} border-opacity-30 bg-card`}
      >
        {/* Category Badge */}
        {plate.category === "vip" && (
          <div className="absolute right-3 top-3 z-10">
            <Badge className="gap-1 bg-primary text-primary-foreground">
              <Crown className="h-3 w-3" />
              VIP
            </Badge>
          </div>
        )}

        {/* Plate Visual */}
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
          <Image
            src={plate.image}
            alt={`لوحة ${emirateNames[plate.emirate]} رقم ${plate.number}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Plate Number Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
            <span className={`mb-1 text-xs font-bold uppercase ${emirateTextColors[plate.emirate]}`}>
              {emirateNames[plate.emirate]}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-muted-foreground">{plate.code}</span>
              <span className="text-3xl font-black text-foreground md:text-4xl">{plate.number}</span>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="flex items-center justify-between p-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${emirateTextColors[plate.emirate]}`}>
                {emirateNames[plate.emirate]}
              </span>
              <span className="text-xs text-muted-foreground">
                {categoryNames[plate.category]}
              </span>
            </div>
            <p className="mt-1 text-lg font-black text-primary">{formatPrice(plate.price)}</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowLeft className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  )
}
