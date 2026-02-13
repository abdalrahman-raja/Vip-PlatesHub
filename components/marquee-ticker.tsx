"use client"

const items = [
  { title: "ELITE", subtitle: "Premium Plate Collection" },
  { title: "حصريات الأسبوع", subtitle: "أرقام محدودة متاحة للحجز المسبق" },
  { title: "خدمة شخصية", subtitle: "خبراء معتمدون لإتمام الإجراءات بسرعة" },
]

export default function MarqueeTicker() {
  const repeated = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden border-y border-primary/20 bg-card/80 py-3">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <div key={i} className="mx-8 flex shrink-0 items-center gap-3">
            <span className="rounded bg-primary/10 px-2.5 py-1 text-xs font-black text-primary">{item.title}</span>
            <span className="text-sm text-muted-foreground">{item.subtitle}</span>
            <span className="text-primary/30">{"/"}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
