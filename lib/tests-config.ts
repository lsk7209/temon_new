import { Coffee, Soup, Heart, BookOpen, AlarmClock, Trophy, Clapperboard, Luggage, ShoppingCart, Cake, type LucideIcon } from "lucide-react"
import { getAllRegisteredQuizzes } from "./auto-test-registry"

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
  createdDate?: string
}

// 기존 수동 등록된 테스트들
const MANUAL_TESTS: Test[] = [
  {
    id: "coffee-mbti",
    title: "☕ 커피 MBTI",
    description: "당신의 커피 취향으로 알아보는 성격 유형",
    icon: Coffee,
    href: "/coffee-mbti",
    color: "from-amber-500 to-orange-600",
    participants: "12.5K",
    rating: 4.8,
    badge: "HOT",
    category: "음식",
    tags: ["커피", "음료", "취향", "성격"],
    popular: true,
  },
  {
    id: "kdrama-mbti",
    title: "🎬 K-드라마 클리셰",
    description: "드라마 속 당신은 어떤 캐릭터?",
    icon: Clapperboard,
    href: "/kdrama-mbti",
    color: "from-pink-500 to-purple-600",
    participants: "1.2K",
    rating: 5.0,
    badge: "NEW",
    category: "엔터테인먼트",
    tags: ["드라마", "캐릭터", "K-드라마", "성격"],
    new: true,
  },
  {
    id: "snowwhite-mbti",
    title: "🍎 백설공주 에겐테토",
    description: "백설공주로 알아보는 에겐 vs 테토 성향",
    icon: Heart,
    href: "/snowwhite-mbti",
    color: "from-pink-500 to-purple-600",
    participants: "3.2K",
    rating: 4.9,
    badge: "NEW",
    category: "동화",
    tags: ["백설공주", "에겐", "테토", "성격"],
    new: true,
  },
  {
    id: "ramen-mbti",
    title: "🍜 라면 MBTI",
    description: "라면 취향으로 알아보는 나의 성격",
    icon: Soup,
    href: "/ramen-mbti",
    color: "from-red-500 to-pink-600",
    participants: "10.2K",
    rating: 4.7,
    category: "음식",
    tags: ["라면", "음식", "선택", "성격"],
    popular: true,
  },
  {
    id: "pet-mbti",
    title: "🐾 반려동물 MBTI",
    description: "반려동물 성향으로 알아보는 성격 테스트",
    icon: Heart,
    href: "/pet-mbti",
    color: "from-pink-500 to-rose-600",
    participants: "8.9K",
    rating: 4.9,
    category: "관계",
    tags: ["반려동물", "관계", "성격", "동물"],
  },
  {
    id: "study-mbti",
    title: "📚 공부 MBTI",
    description: "나만의 공부 스타일 찾기",
    icon: BookOpen,
    href: "/study-mbti",
    color: "from-blue-500 to-cyan-600",
    participants: "15.3K",
    rating: 4.6,
    category: "학습",
    tags: ["공부", "학습", "스타일", "성격"],
  },
  {
    id: "alarm-habit",
    title: "⏰ 알람 습관",
    description: "아침 알람으로 보는 성격 유형",
    icon: AlarmClock,
    href: "/alarm-habit",
    color: "from-purple-500 to-indigo-600",
    participants: "7.8K",
    rating: 4.5,
    category: "생활",
    tags: ["알람", "습관", "생활", "패턴"],
  },
  {
    id: "ntrp-test",
    title: "🎾 NTRP 테스트",
    description: "테니스 실력 레벨 측정",
    icon: Trophy,
    href: "/ntrp-test",
    color: "from-green-500 to-emerald-600",
    participants: "5.6K",
    rating: 4.7,
    category: "스포츠",
    tags: ["테니스", "스포츠", "실력", "레벨"],
  },
  {
    id: "kpop-idol",
    title: "🎤 K-팝 아이돌 포지션",
    description: "아이돌 그룹에서 내 포지션은?",
    icon: Trophy,
    href: "/kpop-idol",
    color: "from-purple-500 to-pink-600",
    participants: "850",
    rating: 5.0,
    badge: "NEW",
    category: "엔터테인먼트",
    tags: ["K-팝", "아이돌", "포지션", "성격"],
    new: true,
  },
]

// 자동 등록된 퀴즈와 수동 테스트를 합쳐서 전체 테스트 목록 생성
export const ALL_TESTS: Test[] = [
  ...MANUAL_TESTS,
  ...getAllRegisteredQuizzes()
]

// Get all unique categories
export const CATEGORIES = ["전체", ...Array.from(new Set(ALL_TESTS.map((test) => test.category)))]

// Get tests for homepage (first 9)
export const getHomePageTests = () => ALL_TESTS.slice(0, 9)

// Get all tests
export const getAllTests = () => ALL_TESTS