"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'coffee-mbti',
  name: '커피 MBTI',
  description: '좋아하는 커피로 알아보는 나의 성격! ☕ 16가지 커피 유형 중 당신은 어떤 커피일까요? 재미있는 커피 MBTI 테스트를 지금 시작해보세요.',
  emoji: '☕',
  category: '음식',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-amber-500',
  gradientTo: 'to-orange-600',
  accentColor: 'amber',
  keywords: "커피 MBTI, 커피 테스트, 성격 테스트, MBTI, 커피 유형, 심리테스트",
  ogImage: {
    title: "커피 MBTI - 당신의 커피 취향으로 알아보는 성격 유형",
    summary: "좋아하는 커피로 알아보는 나의 성격! 16가지 커피 유형 중 당신은 어떤 커피일까요?",
    emoji: "☕",
    bg: "amber-gradient"
  },
  viralExamples: [
    "나는 ☕ 아메리카노형 ISTJ! 단순하고 확실한 맛을 좋아해",
    "커피 취향에도 성격이 있다면? 당신은 어떤 커피 타입?"
  ],
  features: [
    { icon: "Coffee", text: "나만의 커피 취향 분석" },
    { icon: "Sparkles", text: "16가지 커피 유형 중 나는?" },
    { icon: "Users", text: "친구들과 함께 즐기기" },
  ]
})

export default function CoffeeMBTI() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("coffee-mbti", window.location.pathname)}
    />
  )
}
