import { Bitcoin, CreditCard, ShieldCheck, Clock } from "lucide-react"

export default function PaymentMethods() {
  return (
    <section className="border-y border-border/50 bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-black text-foreground md:text-4xl">
            {"طرق الدفع المتاحة"}
          </h2>
          <p className="text-muted-foreground">
            {"ادفع بالطريقة التي تناسبك بأمان تام"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Crypto Payment */}
          <div className="rounded-2xl border border-primary/20 bg-card p-6 md:p-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Bitcoin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              {"الدفع بالعملات الرقمية"}
            </h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {"ادفع باستخدام Bitcoin, Ethereum, USDT وأكثر من 300 عملة رقمية أخرى عبر بوابة NOWPayments الآمنة."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["BTC", "ETH", "USDT", "BNB", "SOL", "XRP"].map((coin) => (
                <span
                  key={coin}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold text-primary"
                >
                  {coin}
                </span>
              ))}
            </div>
          </div>

          {/* Card Payment */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              {"البطاقة الائتمانية"}
            </h3>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              {"ادفع باستخدام Visa, Mastercard أو أي بطاقة ائتمانية. معاملات مشفرة وآمنة 100%."}
            </p>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "Apple Pay"].map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: ShieldCheck, label: "معاملات مشفرة", desc: "SSL 256-bit" },
            { icon: Clock, label: "دعم 24/7", desc: "على مدار الساعة" },
            { icon: Bitcoin, label: "أكثر من 300 عملة", desc: "رقمية مدعومة" },
            { icon: CreditCard, label: "استرجاع مضمون", desc: "سياسة حماية المشتري" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card px-4 py-5 text-center"
            >
              <item.icon className="h-6 w-6 text-primary" />
              <span className="text-sm font-bold text-foreground">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
