import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import './globals.css'
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/custom/header/Header';
import { Providers } from './providers';
import Footer from '@/components/custom/Footer';
import Script from 'next/script';

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
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1'>
              {children}
              <Toaster />
            </main>
            <Footer />
          </div>
        </Providers>
        {/* Yandex.Metrika counter */}
        <Script
          id="ymetrika"
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
         
            ym(96770865, "init", {
                 clickmap:true,
                 trackLinks:true,
                 accurateTrackBounce:true,
                 webvisor:true
            });`,
          }}
        />
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://mc.yandex.ru/watch/96770865" 
              style={{ position: "absolute", left: "-9999px" }}
              alt="" 
              width={1}
              height={1}
            />
          </div>
        </noscript>
        {/* Yandex.Metrika counter */}
      </body>
    </html>
  )
}
