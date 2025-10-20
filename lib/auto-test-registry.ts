// 자동 퀴즈 등록 시스템
// 새로운 퀴즈가 개발되면 자동으로 테스트 목록에 추가되는 시스템

import { Coffee, Soup, Heart, BookOpen, AlarmClock, Trophy, Clapperboard, Luggage, ShoppingCart, Cake, Camera, type LucideIcon } from "lucide-react"

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
  // 완료된 퀴즈들
  {
    idPattern: "coffee-mbti",
    autoGenerate: {
      title: "☕ 커피 MBTI",
      description: "당신의 커피 취향으로 알아보는 성격 유형",
      icon: Coffee,
      color: "from-amber-500 to-orange-600",
      category: "음식",
      tags: ["커피", "음료", "취향", "성격"]
    },
    optional: {
      badge: "HOT",
      popular: true
    }
  },
  {
    idPattern: "ramen-mbti",
    autoGenerate: {
      title: "🍜 라면 MBTI",
      description: "라면 취향으로 알아보는 나의 성격",
      icon: Soup,
      color: "from-red-500 to-pink-600",
      category: "음식",
      tags: ["라면", "음식", "선택", "성격"]
    },
    optional: {
      popular: true
    }
  },
  {
    idPattern: "pet-mbti",
    autoGenerate: {
      title: "🐾 반려동물 MBTI",
      description: "반려동물 성향으로 알아보는 성격 테스트",
      icon: Heart,
      color: "from-pink-500 to-rose-600",
      category: "관계",
      tags: ["반려동물", "관계", "성격", "동물"]
    }
  },
  {
    idPattern: "study-mbti",
    autoGenerate: {
      title: "📚 공부 MBTI",
      description: "나만의 공부 스타일 찾기",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-600",
      category: "학습",
      tags: ["공부", "학습", "스타일", "성격"]
    }
  },
  {
    idPattern: "alarm-habit",
    autoGenerate: {
      title: "⏰ 알람 습관",
      description: "아침 알람으로 보는 성격 유형",
      icon: AlarmClock,
      color: "from-purple-500 to-indigo-600",
      category: "생활",
      tags: ["알람", "습관", "생활", "패턴"]
    }
  },
  {
    idPattern: "ntrp-test",
    autoGenerate: {
      title: "🎾 NTRP 테스트",
      description: "테니스 실력 레벨 측정",
      icon: Trophy,
      color: "from-green-500 to-emerald-600",
      category: "스포츠",
      tags: ["테니스", "스포츠", "실력", "레벨"]
    }
  },
  {
    idPattern: "kdrama-mbti",
    autoGenerate: {
      title: "🎬 K-드라마 클리셰",
      description: "드라마 속 당신은 어떤 캐릭터?",
      icon: Clapperboard,
      color: "from-pink-500 to-purple-600",
      category: "엔터테인먼트",
      tags: ["드라마", "캐릭터", "K-드라마", "성격"]
    },
    optional: {
      badge: "NEW",
      new: true
    }
  },
  {
    idPattern: "snowwhite-mbti",
    autoGenerate: {
      title: "🍎 백설공주 에겐테토",
      description: "백설공주로 알아보는 에겐 vs 테토 성향",
      icon: Heart,
      color: "from-pink-500 to-purple-600",
      category: "동화",
      tags: ["백설공주", "에겐", "테토", "성격"]
    },
    optional: {
      badge: "NEW",
      new: true
    }
  },
  {
    idPattern: "kpop-idol",
    autoGenerate: {
      title: "🎤 K-팝 아이돌 포지션",
      description: "아이돌 그룹에서 내 포지션은?",
      icon: Trophy,
      color: "from-purple-500 to-pink-600",
      category: "엔터테인먼트",
      tags: ["K-팝", "아이돌", "포지션", "성격"]
    },
    optional: {
      badge: "NEW",
      new: true
    }
  },
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
  },
  {
    idPattern: "photo-style",
    autoGenerate: {
      title: "📸 사진 찍는 스타일 테스트",
      description: "찰칵! 사진 한 장에도 성격이 보인다",
      icon: Camera,
      color: "from-purple-500 to-pink-600",
      category: "생활",
      tags: ["사진", "촬영", "스타일", "성격"]
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

  // 참여자 수와 평점을 랜덤하게 생성 (더 현실적인 데이터)
  const participants = Math.floor(Math.random() * 15000) + 1000
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1)
  
  const baseTest: Test = {
    id: quizId,
    title: rule.autoGenerate.title,
    description: rule.autoGenerate.description,
    icon: rule.autoGenerate.icon,
    href: `/${quizId}`,
    color: rule.autoGenerate.color,
    participants: participants > 1000 ? `${(participants / 1000).toFixed(1)}K` : participants.toString(),
    rating: parseFloat(rating),
    category: rule.autoGenerate.category,
    tags: rule.autoGenerate.tags,
    createdDate: new Date().toISOString().split('T')[0],
    completed: true,
    ...rule.optional,
    ...customData
  }

  return baseTest
}

// 모든 등록된 퀴즈 가져오기 (중복 제거)
export function getAllRegisteredQuizzes(): Test[] {
  const tests = QUIZ_REGISTRATION_RULES.map(rule => {
    const test = registerQuiz(rule.idPattern)
    return test!
  })
  
  // ID 기준으로 중복 제거
  const uniqueTests = tests.filter((test, index, self) => 
    index === self.findIndex(t => t.id === test.id)
  )
  
  return uniqueTests
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
