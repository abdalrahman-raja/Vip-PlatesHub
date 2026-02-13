"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Crown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/plates", label: "اللوحات" },
  { href: "/sell", label: "بيع لوحتك" },
  { href: "/about", label: "من نحن" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Top RTA Badge Bar */}
      <div className="border-b border-border/30 bg-card/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
              RTA
            </span>
            <span className="hidden sm:inline">{"مرخص ومعتمد من هيئة الطرق والمواصلات"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-bold">{"عروض افتتاحية"}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Crown className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-extrabold text-foreground">{"متجر اللوحات"}</span>
              <span className="mt-0.5 text-[10px] font-semibold tracking-widest text-primary">PLATES STORE</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="التنقل الرئيسي">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                {"الإمارات"}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-48 rounded-xl border border-border/50 bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
                {[
                  { href: "/plates?emirate=dubai", label: "دبي" },
                  { href: "/plates?emirate=abudhabi", label: "أبوظبي" },
                  { href: "/plates?emirate=sharjah", label: "الشارقة" },
                  { href: "/plates?emirate=ajman", label: "عجمان" },
                  { href: "/plates?emirate=rak", label: "رأس الخيمة" },
                  { href: "/plates?emirate=fujairah", label: "الفجيرة" },
                  { href: "/plates?emirate=uaq", label: "أم القيوين" },
                ].map((e) => (
                  <Link
                    key={e.href}
                    href={e.href}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/plates" className="hidden sm:block">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {"تصفح اللوحات"}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="border-t border-border/30 bg-background lg:hidden" role="navigation" aria-label="التنقل - الهاتف">
            <div className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-border/30 pt-2">
                <p className="px-4 py-2 text-xs font-bold text-primary">{"الإمارات"}</p>
                {[
                  { href: "/plates?emirate=dubai", label: "دبي" },
                  { href: "/plates?emirate=abudhabi", label: "أبوظبي" },
                  { href: "/plates?emirate=sharjah", label: "الشارقة" },
                  { href: "/plates?emirate=ajman", label: "عجمان" },
                  { href: "/plates?emirate=rak", label: "رأس الخيمة" },
                  { href: "/plates?emirate=fujairah", label: "الفجيرة" },
                  { href: "/plates?emirate=uaq", label: "أم القيوين" },
                ].map((e) => (
                  <Link
                    key={e.href}
                    href={e.href}
                    className="block rounded-lg px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {e.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
