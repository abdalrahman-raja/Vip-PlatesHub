import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-destructive/20 bg-card">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{"حدث خطأ في المصادقة"}</h2>
          <p className="text-center text-sm leading-relaxed text-muted-foreground">
            {"حدث خطأ أثناء عملية تسجيل الدخول. يرجى المحاولة مرة أخرى."}
          </p>
          <div className="mt-2 flex flex-col gap-3 w-full">
            <Link href="/auth/login" className="w-full">
              <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90">
                {"العودة لتسجيل الدخول"}
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
