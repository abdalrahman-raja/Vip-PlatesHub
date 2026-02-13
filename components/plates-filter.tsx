"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  type Emirate,
  type PlateCategory,
  emirateNames,
  categoryNames,
} from "@/lib/plates-data"
import { useState, useCallback } from "react"

const emirates: Emirate[] = [
  "dubai",
  "abudhabi",
  "sharjah",
  "ajman",
  "rak",
  "fujairah",
  "uaq",
]
const categories: PlateCategory[] = ["vip", "special", "regular"]

export default function PlatesFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentEmirate = searchParams.get("emirate") || ""
  const currentCategory = searchParams.get("category") || ""
  const currentSearch = searchParams.get("q") || ""
  const currentSort = searchParams.get("sort") || ""

  const [search, setSearch] = useState(currentSearch)
  const [showFilters, setShowFilters] = useState(false)

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/plates?${params.toString()}`)
    },
    [router, searchParams]
  )

  const clearAll = useCallback(() => {
    setSearch("")
    router.push("/plates")
  }, [router])

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      updateParams("q", search)
    },
    [search, updateParams]
  )

  const hasFilters = currentEmirate || currentCategory || currentSearch || currentSort

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث برقم اللوحة..."
            className="border-border/50 bg-card pr-10 text-foreground placeholder:text-muted-foreground"
            aria-label="البحث عن لوحة"
          />
        </div>
        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
          {"بحث"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-border/50 text-foreground lg:hidden"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="إظهار الفلاتر"
          aria-expanded={showFilters}
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </form>

      {/* Filters */}
      <div className={`flex-col gap-4 ${showFilters ? "flex" : "hidden lg:flex"} lg:flex-row lg:items-center`}>
        {/* Emirates Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!currentEmirate ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("emirate", "")}
            className={!currentEmirate ? "bg-primary text-primary-foreground" : "border-border/50 text-muted-foreground hover:text-foreground"}
          >
            {"كل الإمارات"}
          </Button>
          {emirates.map((emirate) => (
            <Button
              key={emirate}
              variant={currentEmirate === emirate ? "default" : "outline"}
              size="sm"
              onClick={() => updateParams("emirate", emirate === currentEmirate ? "" : emirate)}
              className={
                currentEmirate === emirate
                  ? "bg-primary text-primary-foreground"
                  : "border-border/50 text-muted-foreground hover:text-foreground"
              }
            >
              {emirateNames[emirate]}
            </Button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!currentCategory ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("category", "")}
            className={!currentCategory ? "bg-primary text-primary-foreground" : "border-border/50 text-muted-foreground hover:text-foreground"}
          >
            {"كل الفئات"}
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={currentCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => updateParams("category", cat === currentCategory ? "" : cat)}
              className={
                currentCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "border-border/50 text-muted-foreground hover:text-foreground"
              }
            >
              {categoryNames[cat]}
            </Button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <Button
            variant={currentSort === "price-asc" ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("sort", currentSort === "price-asc" ? "" : "price-asc")}
            className={
              currentSort === "price-asc"
                ? "bg-primary text-primary-foreground"
                : "border-border/50 text-muted-foreground hover:text-foreground"
            }
          >
            {"السعر: الأقل"}
          </Button>
          <Button
            variant={currentSort === "price-desc" ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams("sort", currentSort === "price-desc" ? "" : "price-desc")}
            className={
              currentSort === "price-desc"
                ? "bg-primary text-primary-foreground"
                : "border-border/50 text-muted-foreground hover:text-foreground"
            }
          >
            {"السعر: الأعلى"}
          </Button>
        </div>

        {/* Clear All */}
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="gap-1 text-destructive hover:text-destructive"
          >
            <X className="h-3 w-3" />
            {"مسح الكل"}
          </Button>
        )}
      </div>
    </div>
  )
}
