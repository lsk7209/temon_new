"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'kpop-idol',
  name: 'K-팝 아이돌 포지션 테스트',
  description: '아이돌 그룹에서 내 포지션은? 🎤 카리스마 리더부터 4차원 막내까지! 12문항으로 알아보는 나의 아이돌 성격 유형',
  emoji: '🎤',
  category: '엔터테인먼트',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-purple-500',
  gradientTo: 'to-pink-600',
  accentColor: 'purple',
  keywords: "K-팝 아이돌, 포지션 테스트, 성격 테스트, MBTI, 아이돌 그룹, 심리테스트",
  ogImage: {
    title: "K-팝 아이돌 포지션 테스트 - 아이돌 그룹에서 내 포지션은?",
    summary: "카리스마 리더부터 4차원 막내까지! 12문항으로 알아보는 나의 아이돌 성격 유형",
    emoji: "🎤",
    bg: "purple-gradient"
  },
  viralExamples: [
    "나는 🎤 카리스마 리더형 ENTJ! 그룹의 중심이 될 거야",
    "아이돌 그룹에서 내 포지션은? 당신은 어떤 타입?"
  ],
  features: [
    { icon: "Mic", text: "나만의 아이돌 포지션 분석" },
    { icon: "Sparkles", text: "카리스마 리더부터 4차원 막내까지" },
    { icon: "Users", text: "친구들과 함께 즐기기" },
  ]
})

export default function KpopIdolIntro() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("kpop-idol", window.location.pathname)}
    />
  )
}
