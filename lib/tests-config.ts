import { getAllRegisteredQuizzes } from "./auto-test-registry"

export interface Test {
  id: string
  title: string
  description: string
  icon: any // LucideIcon 타입
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

// 자동 등록 시스템에서 모든 테스트를 가져옴 (중복 제거)
export const ALL_TESTS: Test[] = getAllRegisteredQuizzes()

// Get all unique categories
export const CATEGORIES = ["전체", ...Array.from(new Set(ALL_TESTS.map((test) => test.category)))]

// Get tests for homepage (first 9)
export const getHomePageTests = () => ALL_TESTS.slice(0, 9)

// Get all tests
export const getAllTests = () => ALL_TESTS