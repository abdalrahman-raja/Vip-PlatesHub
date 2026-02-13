import type { Metadata, Viewport } from 'next'
import { Tajawal } from 'next/font/google'

import './globals.css'

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  title: 'لوحات الإمارات VIP | أرقام سيارات مميزة للبيع',
  description: 'متجر لبيع أرقام ولوحات السيارات الإماراتية المميزة - دبي، أبوظبي، الشارقة، عجمان وجميع الإمارات. ادفع بالعملات الرقمية أو البطاقة الائتمانية.',
  keywords: 'لوحات سيارات, أرقام مميزة, لوحات دبي, لوحات أبوظبي, لوحات الشارقة, أرقام VIP, لوحات إمارات',
}

export const viewport: Viewport = {
  themeColor: '#d4a017',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
