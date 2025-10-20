import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnalyticsProvider from "@/components/analytics-provider"
import Script from "next/script"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "테몬 MBTI - 나만의 성격 유형 테스트",
  description: "커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트",
  keywords: "MBTI, 성격테스트, 커피MBTI, 라면MBTI, 반려동물MBTI, 공부MBTI, 알람습관, NTRP테스트",
  metadataBase: new URL("https://www.temon.kr"),
  openGraph: {
    title: "테몬 MBTI - 나만의 성격 유형 테스트",
    description: "커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트",
    url: "https://www.temon.kr",
    siteName: "테몬 MBTI",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-2TLW7Z2VQW" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2TLW7Z2VQW');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3050601904412736"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <AnalyticsProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}
