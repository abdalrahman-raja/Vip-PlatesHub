import { Percent, Zap, ShieldCheck } from "lucide-react"

const offers = [
  {
    icon: Percent,
    title: "عرض المميز",
    description: "خصم خاص على اللوحات المميزة عند الشراء خلال هذا الشهر",
    badge: "خصم 15%",
    badgeColor: "bg-primary/10 text-primary",
  },
  {
    icon: Zap,
    title: "عرض الدفع السريع",
    description: "دفع آمن وسريع بالعملات الرقمية مع معالجة فورية",
    badge: "فوري",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    icon: ShieldCheck,
    title: "ضمان الجودة",
    description: "ضمان كامل على جميع اللوحات مع خدمة عملاء على مدار الساعة",
    badge: "100%",
    badgeColor: "bg-sky-500/10 text-sky-400",
  },
]

export default function SpecialOffers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-black text-foreground md:text-3xl">{"عروض خاصة"}</h2>
        <p className="text-sm text-muted-foreground">{"استفد من عروضنا الحصرية على اللوحات المميزة"}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.title}
            className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <offer.icon className="h-5 w-5" />
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${offer.badgeColor}`}>
                {offer.badge}
              </span>
            </div>
            <h3 className="mb-2 text-base font-bold text-foreground">{offer.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
