import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import CheckoutForm from "@/components/checkout-form"
import { getPlateById, emirateNames } from "@/lib/plates-data"

interface Props {
  params: Promise<{ id: string }>
  searchParams: Promise<{ method?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const plate = getPlateById(id)
  if (!plate) return { title: "لوحة غير موجودة" }

  return {
    title: `إتمام الشراء - ${emirateNames[plate.emirate]} ${plate.code} ${plate.number} | لوحات الإمارات VIP`,
    description: `إتمام شراء لوحة ${emirateNames[plate.emirate]} رقم ${plate.code} ${plate.number}`,
  }
}

export default async function CheckoutPage({ params, searchParams }: Props) {
  const { id } = await params
  const { method } = await searchParams
  const plate = getPlateById(id)

  if (!plate) {
    notFound()
  }

  return (
    <main>
      <Header />
      <CheckoutForm plate={plate} initialMethod={method || "crypto"} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
