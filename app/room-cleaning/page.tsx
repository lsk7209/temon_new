"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"
import { Home } from "lucide-react"

const config = createQuizConfig({
  id: 'room-cleaning',
  name: '🧹 방 청소 스타일 테스트',
  description: '당신은 정리 마스터? 아니면 청소 전 구경러? 청소 습관 속에 숨은 나의 성격을 알아보세요!',
  emoji: '🧽',
  category: '라이프스타일',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-blue-500',
  gradientTo: 'to-green-600',
  accentColor: 'blue',
  keywords: "청소 테스트, 방정리 MBTI, 성격별 청소 스타일, 청소 습관",
  ogImage: {
    title: "방청소 성격 테스트 | 청소 습관으로 보는 MBTI 유형",
    summary: "청소할 때마다 다른 당신의 모습! 12문항으로 알아보는 방 청소 스타일 성격 테스트 🧼",
    emoji: "🧽",
    bg: "blue-gradient"
  },
  viralExamples: [
    "나는 🧽 완벽 정리러(ISTJ)! 먼지 한 톨도 용납 못해.",
    "청소에도 성격이 있다면? 당신은 어떤 타입?"
  ],
  features: [
    { icon: Home, text: "나만의 청소 스타일 분석" },
    { icon: "Sparkles", text: "청소 습관 속에 숨은 성격" },
    { icon: "Users", text: "친구들과 함께 즐기기" },
  ]
})

export default function RoomCleaningIntroPage() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("room-cleaning", window.location.pathname)}
    />
  )
}
