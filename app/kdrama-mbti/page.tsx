"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'kdrama-mbti',
  name: 'K-드라마 클리셰 테스트',
  description: '당신은 어떤 드라마 캐릭터? 🎬 재벌남/여부터 국밥 조연까지! 12문항으로 알아보는 나의 드라마 성격 유형',
  emoji: '🎬',
  category: '엔터테인먼트',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-pink-500',
  gradientTo: 'to-purple-600',
  accentColor: 'pink',
  keywords: "K-드라마 MBTI, 드라마 테스트, 성격 테스트, MBTI, 드라마 캐릭터, 심리테스트",
  ogImage: {
    title: "K-드라마 클리셰 테스트 - 당신은 어떤 드라마 캐릭터?",
    summary: "재벌남/여부터 국밥 조연까지! 12문항으로 알아보는 나의 드라마 성격 유형",
    emoji: "🎬",
    bg: "pink-gradient"
  },
  viralExamples: [
    "나는 🎬 재벌남형 ENTJ! 드라마에서도 주인공이야",
    "드라마 캐릭터에도 성격이 있다면? 당신은 어떤 타입?"
  ],
  features: [
    { icon: "Film", text: "나만의 드라마 캐릭터 분석" },
    { icon: "Sparkles", text: "재벌남/여부터 국밥 조연까지" },
    { icon: "Users", text: "친구들과 함께 즐기기" },
  ]
})

export default function KDramaMBTIIntro() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("kdrama-mbti", window.location.pathname)}
    />
  )
}
