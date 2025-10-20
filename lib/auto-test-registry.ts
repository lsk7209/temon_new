// 자동 퀴즈 등록 시스템
// 새로운 퀴즈가 개발되면 자동으로 테스트 목록에 추가되는 시스템

import { Coffee, Soup, Heart, BookOpen, AlarmClock, Trophy, Clapperboard, Luggage, ShoppingCart, Cake, type LucideIcon } from "lucide-react"

export interface Test {
  id: string
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
  participants: string
  rating: number
  badge?: string
  category: string
  tags: string[]
  popular?: boolean
  new?: boolean
  completed?: boolean
  createdDate: string
}

// 퀴즈 등록 규칙
export interface QuizRegistrationRule {
  // 퀴즈 ID 패턴 (라우팅 경로와 일치해야 함)
  idPattern: string
  // 자동 생성될 메타데이터
  autoGenerate: {
    title: string
    description: string
    icon: LucideIcon
    color: string
    category: string
    tags: string[]
  }
  // 수동 설정 가능한 옵션들
  optional?: {
    badge?: string
    popular?: boolean
    new?: boolean
  }
}

// 퀴즈 자동 등록 규칙 정의
export const QUIZ_REGISTRATION_RULES: QuizRegistrationRule[] = [
  {
    idPattern: "travel-pack-mbti",
    autoGenerate: {
      title: "🎒 여행 짐싸는 스타일 테스트",
      description: "여행 전날 밤, 당신의 캐리어는 이미 성격을 말하고 있어요",
      icon: Luggage,
      color: "from-blue-400 to-purple-500",
      category: "여행",
      tags: ["여행", "짐싸기", "캐리어", "여행준비"]
    },
    optional: {
      badge: "HOT",
      popular: true,
      new: true
    }
  },
  {
    idPattern: "conbini-basket-mbti",
    autoGenerate: {
      title: "🛒 편의점 장바구니 MBTI",
      description: "편의점 쇼핑 습관으로 보는 성격 테스트",
      icon: ShoppingCart,
      color: "from-orange-400 to-red-500",
      category: "쇼핑",
      tags: ["편의점", "쇼핑", "장바구니", "성격"]
    },
    optional: {
      badge: "NEW",
      new: true
    }
  },
  {
    idPattern: "dessert-style",
    autoGenerate: {
      title: "🍰 디저트 취향 MBTI",
      description: "디저트를 고르는 순간, 당신의 성격이 드러난다",
      icon: Cake,
      color: "from-pink-500 to-purple-600",
      category: "음식",
      tags: ["디저트", "카페", "달콤함", "성격"]
    },
    optional: {
      badge: "NEW",
      new: true
    }
  }
]

// 퀴즈 자동 등록 함수
export function registerQuiz(quizId: string, customData?: Partial<Test>): Test | null {
  const rule = QUIZ_REGISTRATION_RULES.find(rule => rule.idPattern === quizId)
  
  if (!rule) {
    console.warn(`No registration rule found for quiz: ${quizId}`)
    return null
  }

  const baseTest: Test = {
    id: quizId,
    title: rule.autoGenerate.title,
    description: rule.autoGenerate.description,
    icon: rule.autoGenerate.icon,
    href: `/${quizId}`,
    color: rule.autoGenerate.color,
    participants: "0", // 초기값
    rating: 5.0, // 초기값
    category: rule.autoGenerate.category,
    tags: rule.autoGenerate.tags,
    createdDate: new Date().toISOString().split('T')[0],
    completed: true,
    ...rule.optional,
    ...customData
  }

  return baseTest
}

// 모든 등록된 퀴즈 가져오기
export function getAllRegisteredQuizzes(): Test[] {
  return QUIZ_REGISTRATION_RULES.map(rule => {
    const test = registerQuiz(rule.idPattern)
    return test!
  })
}

// 퀴즈 존재 여부 확인
export function isQuizRegistered(quizId: string): boolean {
  return QUIZ_REGISTRATION_RULES.some(rule => rule.idPattern === quizId)
}

// 퀴즈 등록 상태 확인
export function getQuizRegistrationStatus(quizId: string): {
  isRegistered: boolean
  rule?: QuizRegistrationRule
  test?: Test
} {
  const rule = QUIZ_REGISTRATION_RULES.find(rule => rule.idPattern === quizId)
  
  if (!rule) {
    return { isRegistered: false }
  }

  const test = registerQuiz(quizId)
  return {
    isRegistered: true,
    rule,
    test
  }
}
