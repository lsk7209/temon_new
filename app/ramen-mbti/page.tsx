"use client"

import { QuizIntroTemplate } from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'ramen-mbti',
  name: '라면 MBTI',
  description: '좋아하는 라면으로 알아보는 나의 성격! 16가지 라면 유형 중 당신은 어떤 라면일까요? 재미있는 라면 MBTI 테스트를 지금 시작해보세요.',
  emoji: '🍜',
  category: '음식',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-orange-500',
  gradientTo: 'to-red-600',
  accentColor: 'orange',
  keywords: "라면 MBTI, 라면 테스트, 성격 테스트, MBTI, 라면 유형, 심리테스트",
  ogImage: {
    title: "라면 MBTI",
    summary: "당신의 라면 취향으로 알아보는 성격 유형",
    emoji: "🍜",
    bg: "orange-gradient"
  },
  viralExamples: [
    "나는 🍜 신라면형 ENFP! 라면도 창의적으로!",
    "라면 취향에도 성격이 있다면? 당신은 어떤 라면?"
  ],
  features: [
    { icon: "Coffee", text: "나만의 라면 취향 분석" },
    { icon: "Heart", text: "라면으로 보는 성격 특성" },
    { icon: "Users", text: "16가지 라면 유형 발견" },
  ]
})

export default function RamenMBTIIntroPage() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("ramen-mbti", window.location.pathname)}
    />
  )
}