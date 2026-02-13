"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingContact from "@/components/floating-contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Send } from "lucide-react"

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <main>
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-black text-foreground">{"تم إرسال طلبك بنجاح"}</h1>
          <p className="text-muted-foreground">{"سيتواصل فريقنا معك في أقرب وقت ممكن"}</p>
        </div>
        <Footer />
        <FloatingContact />
      </main>
    )
  }

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-black text-foreground md:text-4xl">{"بيع لوحتك"}</h1>
          <p className="text-muted-foreground">{"أرسل بيانات لوحتك وسنتواصل معك لتقديم أفضل عرض"}</p>
        </div>

        <form
          className="flex flex-col gap-5 rounded-2xl border border-border/50 bg-card p-6 md:p-8"
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{"الاسم الكامل"}</Label>
              <Input id="name" placeholder="أدخل اسمك" required className="bg-secondary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">{"رقم الهاتف"}</Label>
              <Input id="phone" placeholder="+971 50 XXX XXXX" required dir="ltr" className="bg-secondary/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="emirate">{"الإمارة"}</Label>
              <Select required>
                <SelectTrigger id="emirate" className="bg-secondary/50">
                  <SelectValue placeholder="اختر الإمارة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dubai">{"دبي"}</SelectItem>
                  <SelectItem value="abudhabi">{"أبوظبي"}</SelectItem>
                  <SelectItem value="sharjah">{"الشارقة"}</SelectItem>
                  <SelectItem value="ajman">{"عجمان"}</SelectItem>
                  <SelectItem value="rak">{"رأس الخيمة"}</SelectItem>
                  <SelectItem value="fujairah">{"الفجيرة"}</SelectItem>
                  <SelectItem value="uaq">{"أم القيوين"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="plate-number">{"رقم اللوحة"}</Label>
              <Input id="plate-number" placeholder="مثال: 7777" required className="bg-secondary/50" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="plate-code">{"كود اللوحة"}</Label>
              <Input id="plate-code" placeholder="مثال: A" required className="bg-secondary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">{"السعر المطلوب (درهم)"}</Label>
              <Input id="price" type="number" placeholder="مثال: 500000" className="bg-secondary/50" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="notes">{"ملاحظات إضافية"}</Label>
            <Textarea id="notes" placeholder="أي معلومات إضافية عن اللوحة..." rows={4} className="bg-secondary/50" />
          </div>
          <Button type="submit" size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Send className="h-4 w-4" />
            {"إرسال الطلب"}
          </Button>
        </form>
      </section>
      <Footer />
      <FloatingContact />
    </main>
  )
}
