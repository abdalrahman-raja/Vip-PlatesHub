import { Award, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "اختيارات نخبوية",
    description: "نفتخر بتقديم خيارات محدودة ومختارة بعناية عالية لتلائم مستوى التميز الذي تبحث عنه.",
  },
  {
    icon: ShieldCheck,
    title: "إجراءات مضمونة",
    description: "متابعة كاملة لإجراءات نقل الملكية مع ضمان الشفافية في كل خطوة حتى استلام اللوحة.",
  },
  {
    icon: Zap,
    title: "سرعة في التنفيذ",
    description: "نعالج طلبك خلال ساعات قليلة لضمان تجربة سلسة وسريعة دون أي عناء إضافي عليك.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
