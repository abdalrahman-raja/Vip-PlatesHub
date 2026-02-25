"use client"

import { useState } from "react"
import Link from "next/link"
import { Crown, Eye, EyeOff, UserPlus, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    // Validations
    if (!fullName.trim()) {
      setError("يرجى إدخال الاسم الكامل")
      return
    }

    if (!phone.trim()) {
      setError("يرجى إدخال رقم الهاتف")
      return
    }

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      return
    }

    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة")
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    })

    if (error) {
      if (error.message.includes("already registered")) {
        setError("هذا البريد الإلكتروني مسجل بالفعل")
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <Card className="relative w-full max-w-md border-primary/20 bg-card">
          <CardContent className="flex flex-col items-center gap-4 py-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{"تم إنشاء الحساب بنجاح!"}</h2>
            <p className="text-center text-sm leading-relaxed text-muted-foreground">
              {"تم إرسال رابط التفعيل إلى بريدك الإلكتروني"}{" "}
              <span className="font-bold text-foreground" dir="ltr">{email}</span>
              {". يرجى التحقق من بريدك لتفعيل حسابك."}
            </p>
            <div className="mt-2 flex flex-col gap-3 w-full">
              <Link href="/auth/login" className="w-full">
                <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                  {"الذهاب لتسجيل الدخول"}
                </Button>
              </Link>
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full h-12 border-border text-foreground hover:bg-secondary">
                  {"العودة للرئيسية"}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Background decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-primary/20 bg-card">
        <CardHeader className="items-center gap-4 pb-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Crown className="h-6 w-6 text-primary-foreground" />
            </div>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">{"إنشاء حساب جديد"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {"أنشئ حسابك للوصول إلى جميع الخدمات"}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                {"الاسم الكامل"}
              </label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 border-border bg-background pe-12 text-foreground placeholder:text-muted-foreground"
                  required
                  autoFocus
                />
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {"البريد الإلكتروني"}
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-border bg-background pe-12 text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                />
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                {"رقم الهاتف"}
              </label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+971 50 XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12 border-border bg-background pe-12 text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                />
                <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                {"كلمة المرور"}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="6 أحرف على الأقل"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-border bg-background pe-12 text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                {"تأكيد كلمة المرور"}
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="أعد إدخال كلمة المرور"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 border-border bg-background pe-12 text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  {"جاري إنشاء الحساب..."}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  {"إنشاء حساب"}
                </span>
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-4 text-muted-foreground">{"أو"}</span>
              </div>
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-muted-foreground">
              {"لديك حساب بالفعل؟"}{" "}
              <Link
                href="/auth/login"
                className="font-bold text-primary transition-colors hover:text-primary/80"
              >
                {"تسجيل الدخول"}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
