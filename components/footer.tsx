import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2.5">
              <Image
                src="/logo.ico"
                alt="VIP Plates Hub Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-base font-extrabold text-foreground">{"متجر اللوحات"}</span>
                <span className="mt-0.5 text-[10px] font-semibold tracking-widest text-primary">PLATES STORE</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {"منصتك الأولى لبيع وشراء لوحات السيارات المميزة في الإمارات. مرخص ومعتمد من هيئة الطرق والمواصلات."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">{"روابط سريعة"}</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: "/", label: "الرئيسية" },
                { href: "/plates", label: "اللوحات" },
                { href: "/sell", label: "بيع لوحتك" },
                { href: "/about", label: "من نحن" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emirates */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-foreground">{"الإمارات"}</h3>
            <ul className="flex flex-col gap-2.5">
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
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
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
                <a href="tel:+971501234567" className="text-sm text-muted-foreground transition-colors hover:text-primary" dir="ltr">
                  +971 50 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@plates-store.ae" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  info@plates-store.ae
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{"دبي، الإمارات العربية المتحدة"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {"جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()} {"متجر اللوحات"}
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">{"سياسة الخصوصية"}</Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-primary">{"الشروط والأحكام"}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
