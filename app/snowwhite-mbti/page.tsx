"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'snowwhite-mbti',
  name: '백설공주 에겐테토 테스트',
  description: '백설공주와 일곱 난장이 이야기로 알아보는 나의 성향! 🍎 감정파 에겐일까? 효율파 테토일까? 재미있는 병맛 테스트를 지금 시작해보세요.',
  emoji: '🍎',
  category: '엔터테인먼트',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-pink-500',
  gradientTo: 'to-purple-600',
  accentColor: 'pink',
  keywords: "백설공주, 에겐테토, 성격 테스트, MBTI, 병맛 테스트, 심리테스트",
  ogImage: {
    title: "백설공주 에겐테토 테스트 - 나는 누구일까?",
    summary: "백설공주와 일곱 난장이 이야기로 알아보는 나의 성향! 감정파 에겐일까? 효율파 테토일까?",
    emoji: "🍎",
    bg: "pink-gradient"
  },
  viralExamples: [
    "나는 🍎 감정파 에겐! 백설공주도 내 마음 알아줄 거야",
    "백설공주 이야기로 보는 성격? 당신은 에겐일까 테토일까?"
  ],
  features: [
    { icon: "Heart", text: "감정파 에겐 vs 효율파 테토" },
    { icon: "Sparkles", text: "백설공주 이야기로 보는 성격" },
    { icon: "Users", text: "친구들과 함께 즐기기" },
  ]
})

export default function SnowWhiteMBTI() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("snowwhite-mbti", window.location.pathname)}
    />
  )
}
