import Link from "next/link"
import { Crown, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Crown className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">لوحات الإمارات</span>
                <span className="text-xs text-primary">VIP PLATES</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {"المتجر الأول والأفضل لبيع وشراء أرقام ولوحات السيارات المميزة في الإمارات العربية المتحدة."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">{"روابط سريعة"}</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/plates", label: "جميع اللوحات" },
                { href: "/plates?category=vip", label: "لوحات VIP" },
                { href: "/plates?category=special", label: "أرقام خاصة" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emirates */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">{"الإمارات"}</h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/plates?emirate=dubai", label: "دبي" },
                { href: "/plates?emirate=abudhabi", label: "أبوظبي" },
                { href: "/plates?emirate=sharjah", label: "الشارقة" },
                { href: "/plates?emirate=ajman", label: "عجمان" },
                { href: "/plates?emirate=rak", label: "رأس الخيمة" },
                { href: "/plates?emirate=fujairah", label: "الفجيرة" },
                { href: "/plates?emirate=uaq", label: "أم القيوين" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">{"تواصل معنا"}</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+971501234567"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  dir="ltr"
                >
                  +971 50 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:info@uaeplates.ae"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  info@uaeplates.ae
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {"دبي، الإمارات العربية المتحدة"}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {"جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()} {"لوحات الإمارات VIP"}
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {"سياسة الخصوصية"}
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {"الشروط والأحكام"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
