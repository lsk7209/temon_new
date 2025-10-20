# 🚀 테몬 MBTI 개발 가이드라인

## 📋 목차
1. [개발 환경 설정](#1-개발-환경-설정)
2. [코딩 규칙](#2-코딩-규칙)
3. [컴포넌트 개발](#3-컴포넌트-개발)
4. [페이지 구조](#4-페이지-구조)
5. [Analytics 구현](#5-analytics-구현)
6. [성능 최적화](#6-성능-최적화)
7. [테스트 작성](#7-테스트-작성)
8. [배포 프로세스](#8-배포-프로세스)

---

## 1. 개발 환경 설정

### 1.1 필수 도구
```bash
# Node.js 20.x 설치
nvm install 20
nvm use 20

# 프로젝트 클론
git clone https://github.com/lsk7209/temon_new.git
cd temon_new

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 1.2 VS Code 확장 프로그램
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json"
  ]
}
```

### 1.3 환경 변수 설정
```bash
# .env.local 파일 생성
cp env.example .env.local

# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 2. 코딩 규칙

### 2.1 TypeScript 규칙
```typescript
// ✅ 올바른 타입 정의
interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'moderator'
}

// ✅ 컴포넌트 Props 타입
interface ComponentProps {
  title: string
  description?: string
  onClick: () => void
}

// ❌ any 타입 사용 금지
const data: any = {} // 금지
```

### 2.2 파일 명명 규칙
```
// 컴포넌트: PascalCase
components/UserProfile.tsx
components/TestCard.tsx

// 페이지: kebab-case
app/coffee-mbti/page.tsx
app/admin/users/page.tsx

// 유틸리티: camelCase
lib/analytics.ts
lib/utils.ts
```

### 2.3 Import 순서
```typescript
// 1. React 관련
import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'

// 2. 외부 라이브러리
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// 3. 내부 컴포넌트
import Header from '@/components/header'
import Footer from '@/components/footer'

// 4. 유틸리티 및 타입
import { trackClick } from '@/lib/analytics'
import type { TestResult } from '@/types/test'
```

---

## 3. 컴포넌트 개발

### 3.1 컴포넌트 템플릿
```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { trackClick } from "@/lib/analytics"

interface ComponentProps {
  title: string
  description?: string
  onAction?: () => void
}

export default function Component({ 
  title, 
  description, 
  onAction 
}: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    trackClick("component_action", window.location.pathname)
    setIsLoading(true)
    onAction?.()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && (
        <p className="text-gray-600 mt-2">{description}</p>
      )}
      <Button 
        onClick={handleClick}
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? "로딩 중..." : "액션 실행"}
      </Button>
    </div>
  )
}
```

### 3.2 컴포넌트 분리 원칙
```typescript
// ✅ 작은 단위로 분리
const TestCard = ({ test }) => (
  <Card>
    <CardHeader>
      <TestTitle title={test.title} />
      <TestDescription description={test.description} />
    </CardHeader>
    <CardContent>
      <TestActions testId={test.id} />
    </CardContent>
  </Card>
)

// ❌ 하나의 큰 컴포넌트
const TestCard = ({ test }) => (
  <div>
    {/* 모든 로직이 한 곳에 */}
  </div>
)
```

### 3.3 재사용 가능한 컴포넌트
```typescript
// 공통 버튼 컴포넌트
interface ActionButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  onClick: () => void
}

export const ActionButton = ({ 
  variant, 
  size, 
  loading, 
  children, 
  onClick 
}: ActionButtonProps) => {
  const baseClasses = "font-medium rounded-lg transition-colors"
  const variantClasses = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  }
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "로딩 중..." : children}
    </button>
  )
}
```

---

## 4. 페이지 구조

### 4.1 일반 페이지 구조
```typescript
// app/[test-name]/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { trackPageVisit, trackClick } from "@/lib/analytics"
import { useEffect } from "react"

export default function TestIntroPage() {
  useEffect(() => {
    trackPageVisit(window.location.pathname)
  }, [])

  const handleStartTest = () => {
    trackClick("start_test", window.location.pathname)
    // 테스트 시작 로직
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        {/* 페이지 내용 */}
        <Button onClick={handleStartTest}>
          테스트 시작하기
        </Button>
      </div>
    </div>
  )
}
```

### 4.2 테스트 페이지 구조
```typescript
// app/[test-name]/test/page.tsx
"use client"

import { useState, useEffect } from "react"
import { trackTestStart, trackTestProgress } from "@/lib/analytics"

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])

  useEffect(() => {
    trackTestStart("test_name")
  }, [])

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    trackTestProgress("test_name", currentQuestion + 1, 12)
    
    // 0.5초 후 자동 진행
    setTimeout(() => {
      if (currentQuestion < 11) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // 테스트 완료
        calculateResult(newAnswers)
      }
    }, 500)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50">
      {/* 테스트 UI */}
    </div>
  )
}
```

### 4.3 관리자 페이지 구조
```typescript
// app/admin/[module]/page.tsx
"use client"

import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"

export default function AdminModulePage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* 모듈별 내용 */}
          </div>
        </main>
      </div>
    </div>
  )
}
```

---

## 5. Analytics 구현

### 5.1 필수 추적 이벤트
```typescript
// lib/analytics.ts
export const trackPageVisit = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title
    })
  }
}

export const trackTestStart = (testName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'test_start', {
      test_name: testName,
      timestamp: new Date().toISOString()
    })
  }
}

export const trackClick = (action: string, page: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      action: action,
      page: page,
      timestamp: new Date().toISOString()
    })
  }
}
```

### 5.2 컴포넌트에서 Analytics 사용
```typescript
"use client"

import { useEffect } from "react"
import { trackPageVisit, trackClick } from "@/lib/analytics"

export default function TestPage() {
  useEffect(() => {
    // 페이지 방문 추적
    trackPageVisit(window.location.pathname)
  }, [])

  const handleButtonClick = () => {
    // 클릭 이벤트 추적
    trackClick("test_button_click", window.location.pathname)
    // 버튼 액션 실행
  }

  return (
    <button onClick={handleButtonClick}>
      테스트 시작
    </button>
  )
}
```

---

## 6. 성능 최적화

### 6.1 이미지 최적화
```typescript
import Image from "next/image"

// ✅ Next.js Image 컴포넌트 사용
<Image
  src="/test-image.jpg"
  alt="테스트 이미지"
  width={400}
  height={300}
  priority={false} // 중요하지 않은 이미지는 false
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// ❌ 일반 img 태그 사용 금지
<img src="/test-image.jpg" alt="테스트 이미지" />
```

### 6.2 코드 스플리팅
```typescript
import dynamic from "next/dynamic"

// ✅ 동적 import로 코드 스플리팅
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false // 클라이언트에서만 렌더링
})

// ✅ 조건부 렌더링
{isAdmin && <AdminPanel />}
```

### 6.3 메모이제이션
```typescript
import { memo, useMemo, useCallback } from "react"

// ✅ React.memo로 불필요한 리렌더링 방지
const TestCard = memo(({ test, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(test.id)
  }, [test.id, onSelect])

  const formattedDate = useMemo(() => {
    return new Date(test.createdAt).toLocaleDateString()
  }, [test.createdAt])

  return (
    <div onClick={handleClick}>
      <h3>{test.title}</h3>
      <p>{formattedDate}</p>
    </div>
  )
})
```

---

## 7. 테스트 작성

### 7.1 단위 테스트
```typescript
// __tests__/components/TestCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import TestCard from '@/components/TestCard'

describe('TestCard', () => {
  const mockTest = {
    id: '1',
    title: '커피 MBTI',
    description: '커피 취향으로 알아보는 성격',
    icon: '☕'
  }

  it('테스트 제목이 올바르게 표시된다', () => {
    render(<TestCard test={mockTest} />)
    expect(screen.getByText('커피 MBTI')).toBeInTheDocument()
  })

  it('클릭 시 onSelect가 호출된다', () => {
    const mockOnSelect = jest.fn()
    render(<TestCard test={mockTest} onSelect={mockOnSelect} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(mockOnSelect).toHaveBeenCalledWith('1')
  })
})
```

### 7.2 E2E 테스트
```typescript
// cypress/e2e/test-flow.cy.ts
describe('테스트 플로우', () => {
  it('사용자가 테스트를 완료할 수 있다', () => {
    cy.visit('/coffee-mbti')
    cy.get('[data-testid="start-test-button"]').click()
    
    // 12개 질문에 답변
    for (let i = 0; i < 12; i++) {
      cy.get('[data-testid="choice-a"]').click()
      cy.wait(500) // 자동 진행 대기
    }
    
    // 결과 페이지 확인
    cy.url().should('include', '/result')
    cy.get('[data-testid="mbti-result"]').should('be.visible')
  })
})
```

---

## 8. 배포 프로세스

### 8.1 배포 전 체크리스트
```bash
# 1. 코드 품질 확인
npm run lint
npm run type-check

# 2. 테스트 실행
npm run test
npm run test:e2e

# 3. 빌드 테스트
npm run build

# 4. 성능 테스트
npm run lighthouse
```

### 8.2 Git 워크플로우
```bash
# 1. 기능 브랜치 생성
git checkout -b feature/new-test

# 2. 개발 및 커밋
git add .
git commit -m "feat: 새로운 테스트 추가"

# 3. 푸시 및 PR 생성
git push origin feature/new-test

# 4. 코드 리뷰 후 머지
git checkout main
git pull origin main
```

### 8.3 배포 후 확인
```bash
# 1. 배포 상태 확인
curl -I https://temon.kr

# 2. 핵심 기능 테스트
npm run test:smoke

# 3. 성능 모니터링
npm run lighthouse:ci
```

---

## 🎯 핵심 원칙

### ✅ 반드시 지켜야 할 것들
1. **TypeScript 완전 적용** - 모든 코드에 타입 정의
2. **Analytics 이벤트 필수** - 모든 사용자 액션 추적
3. **반응형 디자인** - 모바일 우선 설계
4. **성능 최적화** - 이미지, 코드 스플리팅 적용
5. **접근성 준수** - 모든 사용자가 접근 가능

### ❌ 절대 하지 말아야 할 것들
1. **min-h-screen 개별 페이지 사용** - 레이아웃 깨짐
2. **Header/Footer 중복 렌더링** - 사용자 경험 저하
3. **AdSense 중복 코드** - 광고 오류 발생
4. **any 타입 사용** - 타입 안전성 저하
5. **Analytics 이벤트 누락** - 데이터 수집 불가

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024년 12월  
**다음 리뷰**: 2025년 1월
