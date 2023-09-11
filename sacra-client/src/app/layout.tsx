import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/custom/header/Header';

const montserrat = Montserrat({ subsets: ['cyrillic'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Сакра",
    description: "Виртуальный путеводитель по сакральным местам Красноярского края, Республики Тывы и Республики Хакасии.",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "Сакра",
  },
  title: {
    default: "Сакра",
    template: "%s | Сакра",
  },
  description: "Виртуальный путеводитель по сакральным местам Красноярского края, Республики Тывы и Республики Хакасии.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning className='dark'>
      <body className={montserrat.className}>
        <Header />
        <main>
          {children}
          <Toaster />
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
