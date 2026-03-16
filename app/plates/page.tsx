import { Suspense } from "react"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PlatesFilter from "@/components/plates-filter"
import PlatesGrid from "@/components/plates-grid"

export const metadata: Metadata = {
  title: "اللوحات المتاحة | متجر اللوحات",
  description:
    "تصفح جميع لوحات السيارات الإماراتية المتاحة للبيع - لوحات VIP وأرقام مميزة من جميع الإمارات",
}

export default function PlatesPage() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-1 text-sm font-semibold text-primary">{"تصفح اللوحات"}</p>
          <h1 className="mb-2 text-2xl font-black text-foreground md:text-3xl">
            {"جميع اللوحات المتاحة"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {"اختر رقمك المفضل من بين مجموعة حصرية من لوحات السيارات الإماراتية"}
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          }
        >
          <PlatesFilter />
          <PlatesGrid />
        </Suspense>
      </div>
      <Footer />
      <FloatingContact />
    </main>
  )
}
