"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'clean-style',
  name: '방 청소 스타일 테스트',
  description: '청소하는 모습으로 알아보는 나의 성격! 🧹 당신은 정리 마스터? 아니면 청소 전 구경러? 청소 습관 속에 숨은 나의 성격을 알아보세요!',
  emoji: '🧹',
  category: '라이프스타일',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-blue-500',
  gradientTo: 'to-green-600',
  accentColor: 'blue',
  keywords: "방청소 성격 테스트, 청소 습관 MBTI, 정리 스타일 테스트, 청소 성격, 방정리 테스트",
  ogImage: {
    title: "방청소 성격 테스트 | 청소 습관으로 보는 MBTI 유형",
    summary: "청소할 때마다 다른 당신의 모습! 12문항으로 알아보는 방 청소 스타일 성격 테스트",
    emoji: "🧹",
    bg: "blue-gradient"
  },
  viralExamples: [
    "나는 🧽 완벽 정리러(ISTJ)! 먼지 한 톨도 용납 못해.",
    "청소에도 성격이 있다면? 당신은 어떤 타입?"
  ],
  features: [
    { icon: "Broom", text: "나만의 청소 스타일 분석" },
    { icon: "Sparkles", text: "청소 습관으로 보는 성격" },
    { icon: "Users", text: "16가지 청소러 유형 중 나는?" },
  ]
})

export default function CleanStyleIntroPage() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("clean-style", window.location.pathname)}
    />
  )
}
