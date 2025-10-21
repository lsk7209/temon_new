"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'ntrp-test',
  name: 'NTRP 테스트',
  description: '당신의 테니스 실력을 정확하게 측정해보세요! NTRP 공식 기준으로 1.0부터 7.0까지 정확한 레벨을 알아보는 테스트입니다.',
  emoji: '🎾',
  category: '스포츠',
  estimatedTime: '5분',
  questionCount: 8,
  gradientFrom: 'from-green-500',
  gradientTo: 'to-blue-600',
  accentColor: 'green',
  keywords: "NTRP, 테니스 실력, 테니스 레벨, 테니스 테스트, 스포츠 테스트",
  ogImage: {
    title: "NTRP 테스트",
    summary: "정확한 테니스 실력 레벨 측정",
    emoji: "🎾",
    bg: "green-gradient"
  },
  viralExamples: [
    "나는 🎾 NTRP 3.5! 테니스 실력이 드디어 확인됐어!",
    "테니스 실력이 궁금하다면? NTRP로 정확히 측정해보세요!"
  ],
  features: [
    { icon: "Trophy", text: "NTRP 공식 기준 측정" },
    { icon: "Users", text: "1.0부터 7.0까지 정확한 레벨" },
    { icon: "Clock", text: "전문적인 실력 분석" },
  ]
})

export default function NTRPTestIntroPage() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("ntrp-test", window.location.pathname)}
    />
  )
}