"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Smartphone, Battery, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { trackPageVisit, trackTestStart } from "@/lib/analytics"
import { useEffect } from "react"
import { generateStructuredData } from "@/lib/seo"

export default function PhoneStyleIntroPage() {
  useEffect(() => {
    trackPageVisit("phone-style-intro", window.location.pathname)
  }, [])

  const structuredData = generateStructuredData('quiz', {
    title: "스마트폰 습관 테스트 | 나의 폰 사용 스타일 MBTI 📲",
    description: "12문항으로 알아보는 나의 스마트폰 성격! 집중형 vs 즉흥형, 대화형 vs 탐구형 📱",
    slug: "phone-style",
    imageUrl: "/api/og?testType=phone-style&title=스마트폰 습관 MBTI&summary=스마트폰을 켜는 순간, 당신의 성격이 드러난다&emoji=📱&bg=neon-blue",
    questions: 12,
    timeRequired: "2 minutes",
    keywords: "스마트폰 성격 테스트, 폰 습관 MBTI, 스마트폰 사용 성향 테스트, 디지털 성격"
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
              <Smartphone className="w-12 h-12 text-blue-500" />
              <Battery className="w-12 h-12 text-green-500" />
              <MessageCircle className="w-12 h-12 text-purple-500" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
              스마트폰을 켜는 순간, 당신의 성격이 드러난다 📲
            </CardTitle>
            <CardDescription className="text-md text-gray-600">
              휴대폰 배터리보다 빠른 당신의 성격 분석!
              스마트폰 사용 패턴으로 알아보는 나의 성격 유형 🔋
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <Link href="/phone-style/test" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                onClick={() => trackTestStart("phone-style", window.location.pathname)}
              >
                📱 테스트 시작하기 <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="mt-6 text-center text-sm text-gray-500">
              <p className="mb-2">
                <span className="font-semibold">바이럴 문구 예시:</span>
              </p>
              <p className="italic">
                "나는 🔋 배터리 절약형 INTJ! 폰은 도구, 인생은 효율 📱"
              </p>
              <p className="italic">
                "스마트폰 습관에도 성격이 있다면? 당신은 어떤 타입?"
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
