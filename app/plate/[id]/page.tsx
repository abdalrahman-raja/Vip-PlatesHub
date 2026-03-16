import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import PlateDetail from "@/components/plate-detail"
import {
  getPlateById,
  emirateNames,
  formatPrice,
} from "@/lib/plates-data"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const plate = getPlateById(id)
  if (!plate) return { title: "لوحة غير موجودة" }

  return {
    title: `لوحة ${emirateNames[plate.emirate]} ${plate.code} ${plate.number} | لوحات الإمارات VIP`,
    description: `لوحة سيارة ${emirateNames[plate.emirate]} رقم ${plate.code} ${plate.number} بسعر ${formatPrice(plate.price)} - متاحة للبيع الآن`,
  }
}

export default async function PlateDetailPage({ params }: Props) {
  const { id } = await params
  const plate = getPlateById(id)

  if (!plate) {
    notFound()
  }

  return (
    <main>
      <Header />
      <PlateDetail plate={plate} />
      <Footer />
      <FloatingContact />
    </main>
  )
}
