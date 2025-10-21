"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'alarm-habit',
  name: '알람 습관 테스트',
  description: '알람 끄는 방식으로 알아보는 나의 성격! 스누즈파 vs 칼기상파, 당신은 어떤 타입일까요? 재미있는 알람 습관 테스트를 지금 시작해보세요.',
  emoji: '⏰',
  category: '라이프스타일',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-yellow-500',
  gradientTo: 'to-orange-600',
  accentColor: 'yellow',
  keywords: "알람 습관, 기상 패턴, 성격 테스트, MBTI, 알람 테스트, 심리테스트",
  ogImage: {
    title: "알람 습관 MBTI",
    summary: "기상 패턴으로 보는 당신의 성격",
    emoji: "⏰",
    bg: "yellow-gradient"
  },
  viralExamples: [
    "나는 ⏰ 스누즈형 ENFP! 알람도 창의적으로!",
    "알람 습관에도 성격이 있다면? 당신은 어떤 타입?"
  ],
  features: [
    { icon: "Clock", text: "나만의 알람 습관 분석" },
    { icon: "Users", text: "기상 패턴으로 보는 성격" },
    { icon: "Sparkles", text: "스누즈파 vs 칼기상파" },
  ]
})

export default function AlarmHabitIntroPage() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("alarm-habit", window.location.pathname)}
    />
  )
}