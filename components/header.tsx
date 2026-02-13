"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/plates", label: "جميع اللوحات" },
  { href: "/plates?category=vip", label: "لوحات VIP" },
  { href: "/plates?category=special", label: "أرقام خاصة" },
  { href: "/plates?category=regular", label: "أرقام عادية" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Crown className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">
              لوحات الإمارات
            </span>
            <span className="text-xs font-medium text-primary">VIP PLATES</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="التنقل الرئيسي">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href="/plates">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
              aria-label="البحث"
            >
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/plates" className="hidden sm:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              تصفح اللوحات
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
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
        <nav
          className="border-t border-border/50 bg-background lg:hidden"
          role="navigation"
          aria-label="التنقل الرئيسي - الهاتف"
        >
          <div className="flex flex-col px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
