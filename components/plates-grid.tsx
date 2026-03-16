"use client"

import { useSearchParams } from "next/navigation"
import PlateCard from "@/components/plate-card"
import {
  plates,
  type Emirate,
  type PlateCategory,
} from "@/lib/plates-data"
import { PackageOpen } from "lucide-react"

export default function PlatesGrid() {
  const searchParams = useSearchParams()

  const emirate = searchParams.get("emirate") as Emirate | null
  const category = searchParams.get("category") as PlateCategory | null
  const search = searchParams.get("q") || ""
  const sort = searchParams.get("sort") || ""

  let filtered = [...plates]

  if (emirate) {
    filtered = filtered.filter((p) => p.emirate === emirate)
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category)
  }

  if (search) {
    filtered = filtered.filter(
      (p) => p.number.includes(search) || p.code.includes(search)
    )
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price)
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageOpen className="mb-4 h-16 w-16 text-muted-foreground/50" />
        <h3 className="mb-2 text-xl font-bold text-foreground">
          {"لا توجد نتائج"}
        </h3>
        <p className="text-muted-foreground">
          {"جرب تغيير معايير البحث أو الفلاتر"}
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        {"عرض"} {filtered.length} {"لوحة"}
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((plate) => (
          <PlateCard key={plate.id} plate={plate} />
        ))}
      </div>
    </div>
  )
}
