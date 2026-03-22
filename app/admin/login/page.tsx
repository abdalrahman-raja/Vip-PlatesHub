"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Eye, EyeOff, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAdmin } from "@/lib/admin-store"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, isAuthenticated } = useAdmin()
  const router = useRouter()

  if (isAuthenticated) {
    router.push("/admin")
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    const success = login(username.trim(), password)
    if (success) {
      router.push("/admin")
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-primary/20 bg-card">
        <CardHeader className="items-center gap-3 pb-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="text-sm text-muted-foreground">أدخل بياناتك للوصول إلى لوحة التحكم</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">اسم المستخدم</Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="أدخل اسم المستخدم"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-border bg-background pr-10 text-foreground placeholder:text-muted-foreground"
                  autoFocus
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">كلمة المرور</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-border bg-background pe-12 text-foreground placeholder:text-muted-foreground"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90">
              تسجيل الدخول
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              {"المستخدم الافتراضي: admin | كلمة المرور: admin123"}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
