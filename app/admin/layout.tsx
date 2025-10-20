import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import AnalyticsProvider from "@/components/analytics-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "테몬 MBTI 관리자 - Admin Dashboard",
  description: "테몬 MBTI 플랫폼 관리자 대시보드",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
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
      </head>
      <body className={inter.className}>
        <AnalyticsProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
