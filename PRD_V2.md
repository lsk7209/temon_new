# 🎯 테몬 MBTI 플랫폼 PRD v2.0

## 📋 1. 프로젝트 개요

### 1.1 프로젝트명
**테몬 MBTI** - MZ세대 맞춤형 재미있는 성격 테스트 플랫폼

### 1.2 프로젝트 목표
- MZ세대가 선호하는 재미있고 직관적인 MBTI 테스트 제공
- 높은 사용자 참여도와 공유율 달성
- 지속 가능한 수익 모델 구축
- 확장 가능한 플랫폼 아키텍처 구축

### 1.3 타겟 사용자
- **주요 타겟**: 20-35세 MZ세대
- **부차 타겟**: 15-19세 Z세대, 36-45세 밀레니얼
- **사용 패턴**: 모바일 우선, 소셜 공유 선호, 빠른 결과 원함

---

## 🏗️ 2. 기술 아키텍처

### 2.1 프론트엔드 스택
```typescript
// 핵심 기술 스택
- Next.js 14 (App Router)
- TypeScript (완전한 타입 안전성)
- Tailwind CSS + shadcn/ui
- React 18 (Server Components)
```

### 2.2 백엔드 및 인프라
```yaml
Database: Supabase (PostgreSQL)
Storage: Supabase Storage
Authentication: Supabase Auth
Deployment: Vercel
CI/CD: GitHub Actions
Analytics: Google Analytics 4
Monetization: Google AdSense
```

### 2.3 개발 환경
```json
{
  "packageManager": "npm",
  "nodeVersion": "20.x",
  "typescript": "5.x",
  "eslint": "disabled",
  "prettier": "recommended"
}
```

---

## 🎨 3. 디자인 시스템

### 3.1 레이아웃 규칙 (최우선)
```typescript
// ✅ 올바른 레이아웃 구조
app/layout.tsx:
  - Header (1개만, 전역)
  - Main (flex-1)
  - Footer (1개만, 전역)

// ❌ 금지사항
- 개별 페이지에서 min-h-screen 사용 금지
- Header/Footer 중복 렌더링 금지
- 관리자 페이지는 별도 레이아웃 사용
```

### 3.2 컬러 시스템
```css
/* 테스트별 그라데이션 */
커피 MBTI: from-amber-50 to-orange-50
라면 MBTI: from-orange-50 to-red-50
반려동물 MBTI: from-pink-50 to-purple-50
공부 MBTI: from-blue-50 to-indigo-50
알람 습관: from-cyan-50 to-blue-50
NTRP 테스트: from-green-50 to-emerald-50
여행 짐싸기: from-blue-50 via-indigo-50 to-purple-50
편의점 장바구니: from-yellow-50 via-orange-50 to-red-50
```

### 3.3 컴포넌트 구조
```
components/
├── header.tsx (전역 헤더)
├── footer.tsx (전역 푸터)
├── admin-sidebar.tsx (관리자 전용)
├── admin-header.tsx (관리자 전용)
├── analytics-provider.tsx
└── ui/ (shadcn/ui 컴포넌트)
```

---

## 🧪 4. 테스트 시스템

### 4.1 표준 테스트 구조
```typescript
interface TestStructure {
  questions: 12; // 고정
  choices: 2; // A, B 고정
  autoAdvance: 0.5; // 초 (답변 클릭 시 자동으로 다음으로 이동)
  mbtiDimensions: ['E/I', 'S/N', 'T/F', 'J/P'];
}
```

### 4.1.1 퀴즈 개발 필수 규칙
```typescript
// ✅ 필수 구현 사항
const QUIZ_DEVELOPMENT_RULES = {
  // 1. 자동 진행 시스템
  autoAdvance: {
    enabled: true,
    delay: 500, // 0.5초 후 자동 진행
    animation: "fade-out then fade-in"
  },
  
  // 2. Analytics 필수 이벤트
  requiredEvents: [
    'trackTestStart',      // 테스트 시작
    'trackQuestionAnswer', // 각 질문 답변
    'trackTestComplete',   // 테스트 완료
    'trackResultView',     // 결과 조회
    'trackShare'           // 결과 공유
  ],
  
  // 3. SEO/AEO/GEO 최적화
  seoRequirements: {
    title: "테스트명 | 테몬 MBTI",
    description: "한 줄 설명 + 2분 완성 + 16유형 결과",
    keywords: "MBTI, 성격테스트, [테마]",
    ogImage: "/api/og?type={result}&title={title}&emoji={emoji}"
  },
  
  // 4. 파일 구조 표준
  fileStructure: {
    data: "data/{testName}Config.ts",     // 질문/결과 데이터
    pages: "app/{testName}/",             // 라우팅
    components: "components/{testName}/", // 테스트별 컴포넌트
    lib: "lib/mbti.ts"                    // 공통 MBTI 로직
  },
  
  // 5. 개발 완료 체크리스트
  completionChecklist: [
    "12문항 질문 데이터 구현",
    "16유형 결과 데이터 구현", 
    "인트로/테스트/결과 페이지 구현",
    "Analytics 이벤트 추가",
    "SEO 메타데이터 설정",
    "OG 이미지 생성",
    "공유 기능 구현",
    "PRD 문서 업데이트"
  ]
};
```

### 4.2 현재 구현된 테스트들
```typescript
const IMPLEMENTED_TESTS = [
  'coffee-mbti',      // ☕ 커피 MBTI
  'ramen-mbti',       // 🍜 라면 MBTI  
  'pet-mbti',         // 🐾 반려동물 MBTI
  'study-mbti',       // 📚 공부 MBTI
  'alarm-habit',      // ⏰ 알람 습관
  'ntrp-test',        // 🎾 NTRP 테스트
  'kdrama-mbti',      // 🎬 K-드라마 클리셰
  'snowwhite-mbti',   // 🍎 백설공주 에겐테토
  'kpop-idol',        // 🎤 K-팝 아이돌 포지션
  'travel-pack-mbti', // 🎒 여행 짐 싸는 스타일 테스트 (완료)
  'conbini-basket'    // 🛍️ 편의점 장바구니 성격 테스트 (데이터만 완료)
];
```

### 4.2.1 개발 상태 추적
```typescript
const DEVELOPMENT_STATUS = {
  // 완료된 테스트 (페이지 + 데이터)
  completed: [
    'travel-pack-mbti' // 🎒 여행 짐싸기 - 전체 구현 완료
  ],
  
  // 데이터만 완료 (페이지 구현 필요)
  dataOnly: [
    'conbini-basket' // 🛍️ 편의점 장바구니 - 데이터 구조만 완료
  ],
  
  // 개발 예정
  planned: [
    'music-taste-mbti',    // 🎵 음악 취향 MBTI
    'fashion-style-mbti',  // 👗 패션 스타일 MBTI
    'food-preference-mbti' // 🍽️ 음식 취향 MBTI
  ]
};
```

### 4.3 테스트 페이지 구조
```
app/[test-name]/
├── page.tsx (테스트 소개)
├── test/
│   └── page.tsx (테스트 진행)
└── test/result/
    └── page.tsx (결과 페이지)
```

---

## 🔧 5. 관리자 시스템

### 5.1 관리자 레이아웃
```typescript
// 관리자 전용 레이아웃 (헤더/푸터 없음)
app/admin/layout.tsx:
  - AdminSidebar (네비게이션)
  - AdminHeader (검색, 알림, 프로필)
  - Main Content Area
```

### 5.2 관리자 기능 모듈
```typescript
const ADMIN_MODULES = {
  dashboard: '/admin',           // 대시보드
  tests: '/admin/tests',         // 테스트 관리
  users: '/admin/users',         // 사용자 관리
  analytics: '/admin/analytics', // 분석 및 통계
  content: '/admin/content',     // 콘텐츠 관리
  uploads: '/admin/uploads',     // 파일 관리
  settings: '/admin/settings',   // 설정
  security: '/admin/security'    // 보안
};
```

### 5.3 관리자 권한 시스템
```typescript
interface AdminRole {
  admin: 'full_access';
  moderator: 'limited_access';
  editor: 'content_only';
}
```

---

## 📊 6. Analytics 및 추적

### 6.1 필수 추적 이벤트
```typescript
const REQUIRED_EVENTS = [
  'trackPageVisit',      // 페이지 방문
  'trackTestStart',      // 테스트 시작
  'trackTestProgress',   // 진행률 추적
  'trackTestComplete',   // 테스트 완료
  'trackShare',          // 결과 공유
  'trackClick',          // 클릭 추적
  'trackSearch',         // 검색 추적
  'trackEngagement',     // 참여도 추적
  'trackQuestionAnswer', // 질문 답변
  'trackError',          // 에러 추적
  'trackAdminLogin',     // 관리자 로그인
  'trackResultView',     // 결과 조회
  'trackCTAClick'        // CTA 클릭
];
```

### 6.2 Google Analytics 4 설정
```typescript
const GA4_CONFIG = {
  measurementId: 'G-2TLW7Z2VQW',
  strategy: 'afterInteractive',
  events: REQUIRED_EVENTS
};
```

---

## 💰 7. 수익화 전략

### 7.1 Google AdSense
```typescript
const ADSENSE_CONFIG = {
  clientId: 'ca-pub-3050601904412736',
  strategy: 'afterInteractive',
  placement: ['header', 'sidebar', 'footer', 'between_content']
};
```

### 7.2 수익 최적화
- **광고 배치**: 사용자 경험을 해치지 않는 위치
- **로딩 전략**: 페이지 성능에 영향 최소화
- **A/B 테스트**: 광고 위치 및 크기 최적화

---

## 🚀 8. 배포 및 CI/CD

### 8.1 배포 파이프라인
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v25
```

### 8.2 환경 변수 관리
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 8.3 Vercel 설정
```json
{
  "build": {
    "env": {
      "NEXT_PUBLIC_SUPABASE_URL": "@next_public_supabase_url",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@next_public_supabase_anon_key"
    }
  },
  "outputDirectory": "out"
}
```

---

## 📱 9. 반응형 디자인

### 9.1 브레이크포인트
```css
/* Tailwind CSS 브레이크포인트 */
sm: 640px   /* 모바일 가로 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 대형 데스크톱 */
2xl: 1536px /* 초대형 */
```

### 9.2 모바일 우선 설계
```typescript
// 모바일 우선 접근법
const MobileFirstDesign = {
  base: 'mobile_styles',
  sm: 'tablet_styles', 
  lg: 'desktop_styles'
};
```

---

## 🔒 10. 보안 및 성능

### 10.1 보안 조치
```typescript
const SECURITY_MEASURES = {
  authentication: 'Supabase Auth',
  authorization: 'Row Level Security (RLS)',
  dataValidation: 'Zod schemas',
  csrfProtection: 'Next.js built-in',
  xssProtection: 'React built-in'
};
```

### 10.2 성능 최적화
```typescript
const PERFORMANCE_OPTIMIZATIONS = {
  images: 'Next.js Image Optimization',
  fonts: 'Next.js Font Optimization', 
  codeSplitting: 'Dynamic imports',
  caching: 'Vercel Edge Network',
  compression: 'Gzip/Brotli'
};
```

---

## 📈 11. 개발 로드맵

### 11.1 Phase 1: 기반 구축 (완료)
- [x] Next.js 14 프로젝트 설정
- [x] 기본 테스트 시스템 구현
- [x] Analytics 시스템 구축
- [x] 관리자 시스템 구현
- [x] 배포 파이프라인 구축
- [x] 여행 짐싸기 테스트 구현
- [x] 편의점 장바구니 테스트 데이터 구조 구현

### 11.2 Phase 2: 기능 확장 (진행 중)
- [ ] 편의점 장바구니 테스트 페이지 구현
- [ ] 사용자 인증 시스템
- [ ] 파일 업로드 시스템
- [ ] 고급 Analytics 대시보드
- [ ] A/B 테스트 시스템
- [ ] PWA 기능

### 11.3 Phase 3: 고도화 (계획)
- [ ] AI 기반 개인화 분석
- [ ] 실시간 기능
- [ ] 커뮤니티 기능
- [ ] 프리미엄 구독 모델
- [ ] 다국어 지원

---

## 🎯 12. 개발 가이드라인

### 12.1 코딩 규칙
```typescript
// ✅ 권장사항
1. TypeScript 완전 적용
2. 컴포넌트 재사용성 최대화
3. Analytics 이벤트 필수 추가
4. 반응형 디자인 우선
5. 성능 최적화 고려
6. 자동 진행 시스템 구현 (0.5초 딜레이)
7. 퀴즈 완료 시 PRD 문서 자동 업데이트

// ❌ 금지사항
1. min-h-screen 개별 페이지 사용 금지
2. Header/Footer 중복 렌더링 금지
3. AdSense 중복 코드 사용 금지
4. Analytics 이벤트 누락 금지
5. 타입 정의 누락 금지
6. 수동 페이지 전환 (자동 진행 필수)
7. PRD 문서 업데이트 누락 금지
```

### 12.1.1 퀴즈 개발 워크플로우
```typescript
const QUIZ_DEVELOPMENT_WORKFLOW = {
  // 1단계: 데이터 구조 설계
  step1: {
    task: "질문/결과 데이터 구조 설계",
    files: ["data/{testName}Config.ts"],
    checklist: [
      "12문항 질문 정의",
      "16유형 결과 데이터",
      "MBTI 태깅 시스템",
      "SEO/AEO/GEO 키워드"
    ]
  },
  
  // 2단계: 페이지 구현
  step2: {
    task: "라우팅 및 페이지 구현",
    files: ["app/{testName}/page.tsx", "app/{testName}/test/page.tsx", "app/{testName}/test/result/page.tsx"],
    checklist: [
      "인트로 페이지 (SEO 최적화)",
      "테스트 진행 페이지 (자동 진행)",
      "결과 페이지 (공유 기능)",
      "Analytics 이벤트 추가"
    ]
  },
  
  // 3단계: 컴포넌트 구현
  step3: {
    task: "재사용 가능한 컴포넌트 구현",
    files: ["components/{testName}/"],
    checklist: [
      "ProgressBar 컴포넌트",
      "ChoiceCard 컴포넌트", 
      "ShareButtons 컴포넌트",
      "ResultBlocks 컴포넌트"
    ]
  },
  
  // 4단계: 자동 업데이트
  step4: {
    task: "PRD 문서 자동 업데이트",
    files: ["PRD_V2.md"],
    actions: [
      "IMPLEMENTED_TESTS 배열에 추가",
      "DEVELOPMENT_STATUS 업데이트",
      "컬러 시스템 추가",
      "로드맵 업데이트"
    ]
  }
};
```

### 12.2 파일 구조 표준
```
app/
├── layout.tsx (전역 레이아웃)
├── page.tsx (홈페이지)
├── admin/ (관리자 전용)
│   ├── layout.tsx (관리자 레이아웃)
│   ├── page.tsx (대시보드)
│   ├── tests/ (테스트 관리)
│   └── users/ (사용자 관리)
├── [test-name]/ (테스트별)
│   ├── page.tsx
│   └── test/
│       ├── page.tsx
│       └── result/page.tsx
└── api/ (API 라우트)
    └── upload/route.ts
```

### 12.3 컴포넌트 개발 규칙
```typescript
// 퀴즈 테스트 페이지 템플릿
"use client"

import { useState, useEffect } from "react"
import { trackTestStart, trackQuestionAnswer, trackTestComplete } from "@/lib/analytics"
import { useRouter } from "next/navigation"

interface QuizTestProps {
  questions: Question[]
  onComplete: (result: string) => void
}

export default function QuizTest({ questions, onComplete }: QuizTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const router = useRouter()

  // 자동 진행 시스템 (0.5초 딜레이)
  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    
    // Analytics 이벤트
    trackQuestionAnswer(currentQuestion + 1, answer, window.location.pathname)
    
    // 자동 진행
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // 테스트 완료
        const result = calculateMBTI(newAnswers)
        trackTestComplete("test-name", result, window.location.pathname)
        router.push(`/test-name/test/result?type=${result}`)
      }
    }, 500) // 0.5초 딜레이
  }

  return (
    // JSX with fade animation
  )
}
```

### 12.3.1 자동 진행 애니메이션
```css
/* 자동 진행 애니메이션 */
.question-transition {
  transition: opacity 0.3s ease-in-out;
}

.question-fade-out {
  opacity: 0;
  transform: translateY(-10px);
}

.question-fade-in {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 🔍 13. 품질 관리

### 13.1 코드 리뷰 체크리스트
- [ ] TypeScript 타입 정의 완료
- [ ] Analytics 이벤트 추가
- [ ] 반응형 디자인 적용
- [ ] 성능 최적화 고려
- [ ] 접근성 준수
- [ ] 보안 취약점 없음
- [ ] 자동 진행 시스템 구현 (0.5초 딜레이)
- [ ] PRD 문서 업데이트 완료
- [ ] SEO/AEO/GEO 최적화
- [ ] OG 이미지 생성

### 13.2 테스트 전략
```typescript
const TESTING_STRATEGY = {
  unit: 'Jest + React Testing Library',
  integration: 'Cypress',
  e2e: 'Playwright',
  performance: 'Lighthouse CI',
  accessibility: 'axe-core'
};
```

### 13.3 모니터링 지표
```typescript
const MONITORING_METRICS = {
  performance: ['LCP', 'FID', 'CLS'],
  business: ['DAU', 'MAU', 'retention'],
  technical: ['error_rate', 'response_time'],
  user: ['satisfaction', 'engagement']
};
```

---

## 📞 14. 팀 및 연락처

### 14.1 개발팀 구조
- **프로젝트 매니저**: 전체 프로젝트 관리
- **프론트엔드 개발자**: UI/UX 구현
- **백엔드 개발자**: API 및 데이터베이스
- **DevOps 엔지니어**: 배포 및 인프라

### 14.2 외부 서비스
- **Vercel**: https://vercel.com/dashboard
- **GitHub**: https://github.com/lsk7209/temon_new
- **Supabase**: https://supabase.com/dashboard
- **Google Analytics**: https://analytics.google.com

---

## 📚 15. 참고 문서

### 15.1 기술 문서
- [TECH_DOCS.md](./TECH_DOCS.md) - 상세 기술 가이드
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
- [API_DOCS.md](./API_DOCS.md) - API 문서

### 15.2 디자인 리소스
- [Figma 디자인 시스템](링크)
- [컴포넌트 스토리북](링크)
- [아이콘 라이브러리](링크)

---

**문서 버전**: 2.0  
**최종 업데이트**: 2024년 12월  
**다음 리뷰**: 2025년 1월  
**담당자**: 테몬 개발팀
