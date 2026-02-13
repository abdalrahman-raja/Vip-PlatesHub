"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "كيف يمكنني شراء لوحة؟",
    answer: "يمكنك تصفح اللوحات المتاحة واختيار اللوحة المناسبة ثم الضغط على زر \"اشتري الآن\" وإكمال عملية الدفع.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "نقبل الدفع بالعملات الرقمية مثل USDT وBTC عبر منصة NOWPayments الآمنة، بالإضافة إلى البطاقات الائتمانية.",
  },
  {
    question: "كم تستغرق عملية نقل الملكية؟",
    answer: "نعالج طلباتك خلال ساعات قليلة ونوفر متابعة كاملة حتى استلام اللوحة.",
  },
  {
    question: "هل يمكنني بيع لوحتي؟",
    answer: "نعم، يمكنك تقديم طلب بيع لوحتك من خلال صفحة \"بيع لوحتك\" وسنتواصل معك قريباً.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-black text-foreground md:text-3xl">{"الأسئلة الشائعة"}</h2>
        <p className="text-sm text-muted-foreground">{"إجابات على أكثر الأسئلة شيوعاً"}</p>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="overflow-hidden rounded-xl border border-border/50 bg-card transition-colors hover:border-primary/20"
          >
            <button
              className="flex w-full items-center justify-between px-5 py-4 text-right"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <h3 className="text-sm font-bold text-foreground">{faq.question}</h3>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="border-t border-border/30 px-5 py-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
