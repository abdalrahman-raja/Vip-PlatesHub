import { Star } from "lucide-react"

const testimonials = [
  {
    name: "أحمد محمد",
    text: "تجربة رائعة! حصلت على اللوحة التي أردتها بسرعة وسهولة. الخدمة ممتازة والدفع سلس.",
    initials: "أم",
  },
  {
    name: "سارة علي",
    text: "خدمة احترافية من البداية للنهاية. فريق العمل متجاوب ومتابع لكل التفاصيل.",
    initials: "سع",
  },
  {
    name: "محمد خالد",
    text: "أفضل منصة لشراء لوحات السيارات. آمنة وسريعة مع ضمان كامل.",
    initials: "مخ",
  },
]

export default function Testimonials() {
  return (
    <section className="border-y border-border/30 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-black text-foreground md:text-3xl">{"آراء عملائنا"}</h2>
          <p className="text-sm text-muted-foreground">{"ماذا يقول عملاؤنا عن خدماتنا"}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/20"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {t.initials}
                </div>
                <span className="text-sm font-bold text-foreground">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
