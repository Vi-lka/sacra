import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/custom/header/Header';
import { Providers } from './providers';

const montserrat = Montserrat({ 
  subsets: ['cyrillic'],
  variable: "--Montserrat",
})

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
    images: ["/images/image-placeholder-sacra.png"],
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
    <html 
      lang="ru" 
      suppressHydrationWarning
      className={`dark ${montserrat.variable}`}
    >
      <body className='font-Montserrat gradient'>
      <Providers>
        <Header />
        <main>
          {children}
          <Toaster />
        </main>
        {/* <Footer /> */}
      </Providers>
      </body>
    </html>
  )
}
