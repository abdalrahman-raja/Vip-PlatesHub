import Link from "next/link"
import { CheckCircle, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "تم الدفع بنجاح | VIP Plates Hub",
  description: "تمت عملية الدفع بنجاح",
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        
        <h1 className="mb-3 text-3xl font-black text-foreground">
          {"تم الدفع بنجاح!"}
        </h1>
        
        <p className="mb-8 text-lg text-muted-foreground">
          {"شكراً لك! تمت عملية الدفع بنجاح وسيتم التواصل معك قريباً لإتمام إجراءات نقل ملكية اللوحة."}
        </p>

        <div className="mb-8 w-full rounded-xl border border-border/50 bg-card p-6 text-right">
          <h2 className="mb-4 text-lg font-bold text-foreground">{"الخطوات التالية:"}</h2>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
              {"سيتواصل معك فريقنا خلال 24 ساعة"}
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
              {"تجهيز المستندات المطلوبة لنقل الملكية"}
            </li>
            <li className="flex items-start gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span>
              {"إتمام إجراءات نقل الملكية رسمياً"}
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Home className="h-5 w-5" />
              {"العودة للرئيسية"}
            </Button>
          </Link>
          <Link href="/plates">
            <Button size="lg" variant="outline" className="gap-2 border-border/50 text-foreground hover:bg-secondary">
              {"تصفح المزيد"}
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
