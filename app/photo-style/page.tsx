"use client"

import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"
import { createQuizConfig } from "@/lib/quiz-templates"
import { trackTestStart } from "@/lib/analytics"

const config = createQuizConfig({
  id: 'photo-style',
  name: '사진 찍는 스타일 테스트',
  description: '찰칵! 사진 한 장에도 성격이 보인다 📸 12문항으로 알아보는 나의 사진 습관 성격 유형! 감성러부터 완벽주의자까지',
  emoji: '📸',
  category: '라이프스타일',
  estimatedTime: '3분',
  questionCount: 12,
  gradientFrom: 'from-purple-500',
  gradientTo: 'to-pink-600',
  accentColor: 'purple',
  keywords: "사진 성격 테스트, 사진 스타일 MBTI, 사진 습관 테스트, 포토 성격, 촬영 스타일",
  ogImage: {
    title: "사진 찍는 스타일 테스트 - 셔터 한 번으로 보는 나의 성격",
    summary: "찰칵! 사진 한 장에도 성격이 보인다. 12문항으로 알아보는 나의 사진 습관 성격 유형!",
    emoji: "📸",
    bg: "purple-gradient"
  },
  viralExamples: [
    "나는 📸 감성러 INFP! 사진 한 장에도 내 마음이 담겨있어",
    "사진 찍는 스타일에도 성격이 있다면? 당신은 어떤 타입?"
  ],
  features: [
    { icon: "Camera", text: "나만의 사진 촬영 스타일 분석" },
    { icon: "Sparkles", text: "셔터 한 번으로 보는 성격" },
    { icon: "Users", text: "감성러부터 완벽주의자까지" },
  ]
})

export default function PhotoStyleIntroPage() {
  return (
    <QuizIntroTemplate
      config={config}
      onTestStart={() => trackTestStart("photo-style", window.location.pathname)}
    />
  )
}
