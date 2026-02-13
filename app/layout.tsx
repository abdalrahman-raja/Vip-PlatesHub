import type { Metadata, Viewport } from 'next'

import './globals.css'

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
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
