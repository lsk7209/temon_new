"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Camera, Zap, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { trackPageVisit, trackTestStart } from "@/lib/analytics"
import { useEffect } from "react"
import { generateStructuredData } from "@/lib/seo" // SEO 유틸리티 임포트

export default function PhotoStyleIntroPage() {
  useEffect(() => {
    trackPageVisit("photo-style-intro", window.location.pathname)
  }, [])

  const structuredData = generateStructuredData('quiz', {
    title: "사진 찍는 스타일 테스트 | 셔터 한 번으로 보는 나의 성격 📷",
    description: "12문항으로 알아보는 나의 사진 습관 성격 유형! 감성러부터 완벽주의자까지 📸",
    slug: "photo-style",
    imageUrl: "/api/og?testType=photo-style&title=사진 스타일 MBTI&summary=찰칵! 사진 한 장에도 성격이 보인다&emoji=📸&bg=neon-purple",
    questions: 12,
    timeRequired: "2 minutes",
    keywords: "사진 성격 테스트, 사진 스타일 MBTI, 사진 습관 테스트, 포토 성격, 촬영 스타일"
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-xl border-none">
          <CardHeader className="text-center p-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center items-center space-x-4 mb-4"
            >
              <Camera className="w-12 h-12 text-purple-500" />
              <Zap className="w-12 h-12 text-pink-500" />
              <Sparkles className="w-12 h-12 text-indigo-500" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              찰칵! 사진 한 장에도 성격이 보인다 📷
            </CardTitle>
            <CardDescription className="text-md text-gray-600">
              풍경, 인물, 음식… 당신이 사진을 찍는 방식으로
              숨겨진 성향을 분석해드립니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Link href="/photo-style/test" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300"
                onClick={() => trackTestStart("photo-style", window.location.pathname)}
              >
                📷 테스트 시작하기 <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p className="mb-2">
                <span className="font-semibold">바이럴 문구 예시:</span>
              </p>
              <p className="italic">
                "나는 🎞 감성 스냅러(ISFP)! 너는 어떤 사진러야?"
              </p>
              <p className="italic">
                "사진 찍는 습관만 봐도 성격이 드러난다… 진짜임!"
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
