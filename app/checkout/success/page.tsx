"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

function SuccessContent() {
  const searchParams = useSearchParams()
  const plateId = searchParams.get("plate") || ""
  const orderId = searchParams.get("order") || ""

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle className="h-10 w-10 text-green-500" />
      </div>
      <h1 className="mb-4 text-3xl font-black text-foreground">{"تم الدفع بنجاح!"}</h1>
      <p className="mb-2 text-lg text-muted-foreground">
        {"شكراً لك! تم استلام دفعتك بالعملات الرقمية."}
      </p>
      {orderId && (
        <p className="mb-8 text-sm text-muted-foreground" dir="ltr">
          Order ID: {orderId}
        </p>
      )}
      <div className="flex flex-col items-center gap-4">
        <Link href="/">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            {"العودة للرئيسية"}
          </Button>
        </Link>
        <Link href="/plates">
          <Button variant="outline" className="border-border/50 text-foreground">
            {"تصفح المزيد من اللوحات"}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <main>
      <Header />
      <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center" />}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  )
}
