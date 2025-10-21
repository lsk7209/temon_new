# 퀴즈 템플릿 시스템 가이드

## 개요

테몬 MBTI 플랫폼의 퀴즈 템플릿 시스템은 일관된 사용자 경험을 제공하고 개발 효율성을 높이기 위해 설계되었습니다.

## 템플릿 구조

### 1. QuizIntroTemplate (인트로 페이지)
- 퀴즈 소개 및 시작 페이지
- 일관된 디자인과 사용자 경험 제공
- SEO 최적화된 구조

### 2. QuizTestTemplate (테스트 페이지)
- 질문과 답변을 표시하는 페이지
- 자동 진행 기능 지원
- 애니메이션과 시각적 피드백 제공

### 3. QuizResultTemplate (결과 페이지)
- 테스트 결과를 표시하는 페이지
- 공유 기능 및 관련 테스트 추천
- 구조화된 데이터 지원
- **공통 공유하기 영역**: 링크 복사 버튼만 제공

## 사용 방법

### 1. 기본 설정

```typescript
import { createQuizConfig } from "@/lib/quiz-templates"

const config = createQuizConfig({
  id: 'my-quiz',
  name: '내 퀴즈',
  description: '재미있는 테스트입니다',
  emoji: '🎯',
  category: '성격',
  estimatedTime: '5분',
  questionCount: 12,
  gradientFrom: 'from-blue-500',
  gradientTo: 'to-indigo-600',
  accentColor: 'blue'
})
```

### 2. 인트로 페이지 생성

```typescript
import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"

export default function MyQuizIntroPage() {
  return (
    <QuizIntroTemplate
      title="내 퀴즈"
      description="재미있는 테스트입니다"
      emoji="🎯"
      category="성격"
      estimatedTime="5분"
      questionCount={12}
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
      accentColor="blue"
      testPath="/my-quiz/test"
      isNew={true}
      isPopular={false}
      features={[
        "특징 1",
        "특징 2",
        "특징 3"
      ]}
      tags={[
        "태그1",
        "태그2",
        "태그3"
      ]}
    />
  )
}
```

### 3. 테스트 페이지 생성

```typescript
import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"
import { MY_QUESTIONS } from "@/data/myQuestions"
import { calculateMBTI } from "@/lib/mbti"

export default function MyQuizTestPage() {
  return (
    <QuizTestTemplate
      questions={MY_QUESTIONS}
      testId="my-quiz"
      testName="내 퀴즈"
      gradientFrom="from-blue-50"
      gradientTo="to-indigo-100"
      emoji="🎯"
      calculateResult={calculateMBTI}
      resultPath="/my-quiz/result"
      autoAdvance={true}
      autoAdvanceDelay={500}
    />
  )
}
```

### 4. 결과 페이지 생성

```typescript
import QuizResultTemplate from "@/components/quiz/QuizResultTemplate"
import { getMyQuizResult } from "@/data/myResults"

export default function MyQuizResultPage() {
  return (
    <QuizResultTemplate
      testId="my-quiz"
      testName="내 퀴즈"
      getResult={getMyQuizResult}
      gradientFrom="from-blue-50"
      gradientTo="via-indigo-50"
      sections={{
        showTraits: true,
        showHabits: false,
        showRecommendations: true
      }}
      customSections={[
        {
          title: "커스텀 섹션",
          icon: <SomeIcon className="h-5 w-5 text-blue-500" />,
          content: <div>커스텀 내용</div>
        }
      ]}
      relatedTests={[
        {
          title: "관련 테스트 1",
          description: "설명",
          emoji: "🎯",
          href: "/related-test-1"
        }
      ]}
    />
  )
}
```

## 데이터 구조

### 질문 데이터 (QuizQuestion)

```typescript
interface QuizQuestion {
  id: number
  title: string
  options: {
    label: string
    tags: string[]
  }[]
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    title: "질문 내용",
    options: [
      { label: "옵션 1", tags: ["E", "S"] },
      { label: "옵션 2", tags: ["I", "N"] }
    ]
  }
]
```

### 결과 데이터 (QuizResult)

```typescript
interface QuizResult {
  type: string
  emoji: string
  title: string
  tagline: string
  summary: string[]
  traits: string[]
  color?: string
  og: {
    bg: string
    icon: string
  }
  shareText: string
  hashtags: string[]
}

const results: Record<string, QuizResult> = {
  ENFP: {
    type: 'ENFP',
    emoji: '🎈',
    title: '결과 제목',
    tagline: '한 줄 설명',
    summary: ['설명 1', '설명 2'],
    traits: ['특징1', '특징2'],
    color: '#FF7EB6',
    og: { bg: 'candy-pop', icon: '🎈' },
    shareText: '공유 텍스트',
    hashtags: ['태그1', '태그2']
  }
}
```

## 스타일링 가이드

### 그라디언트 색상

```typescript
// 파란색 계열
gradientFrom: "from-blue-500"
gradientTo: "to-indigo-600"

// 보라색 계열
gradientFrom: "from-purple-500"
gradientTo: "to-pink-600"

// 오렌지 계열
gradientFrom: "from-orange-500"
gradientTo: "to-red-500"

// 핑크 계열
gradientFrom: "from-pink-500"
gradientTo: "to-purple-600"
```

### 이모지 선택

- 퀴즈의 주제와 관련된 이모지 선택
- 사용자가 직관적으로 이해할 수 있는 것
- 일관성 있는 스타일 유지

## 베스트 프랙티스

### 1. 질문 설계
- 질문은 8-16개 정도가 적당
- 각 질문마다 2-4개의 옵션 제공
- MBTI 태그는 E/I, S/N, T/F, J/P 사용

### 2. 결과 작성
- 결과 설명은 3-5줄로 구성
- 특징은 5-8개 정도가 적당
- 공유 텍스트는 재미있고 공유하고 싶게 작성

### 3. 성능 최적화
- 이미지 최적화
- 애니메이션 성능 고려
- SEO 최적화

## 문제 해결

### 자주 발생하는 문제

1. **질문 ID 중복**
   - 각 질문의 ID가 고유한지 확인

2. **태그 누락**
   - 모든 옵션에 태그가 있는지 확인

3. **결과 데이터 누락**
   - 필수 필드가 모두 있는지 확인

4. **OG 이미지 오류**
   - 배경 색상이 올바른지 확인

### 디버깅 팁

```typescript
import { validateQuizData } from "@/lib/quiz-templates"

// 데이터 검증
const isValid = validateQuizData(questions, results)
if (!isValid) {
  console.error('퀴즈 데이터에 문제가 있습니다.')
}
```

## 마이그레이션 가이드

기존 퀴즈를 템플릿으로 마이그레이션하는 방법:

1. **기존 코드 분석**
   - 현재 구조 파악
   - 공통 패턴 식별

2. **데이터 구조 변환**
   - 질문 데이터를 QuizQuestion 형태로 변환
   - 결과 데이터를 QuizResult 형태로 변환

3. **템플릿 적용**
   - 각 페이지를 해당 템플릿으로 교체
   - 커스텀 로직이 있다면 customSections 활용

4. **테스트 및 검증**
   - 모든 기능이 정상 작동하는지 확인
   - 데이터 검증 함수로 검증

## 확장 가능성

템플릿 시스템은 다음과 같이 확장할 수 있습니다:

1. **새로운 템플릿 추가**
   - 특별한 기능이 필요한 경우 새로운 템플릿 생성

2. **커스텀 섹션 확장**
   - 더 많은 섹션 타입 추가

3. **애니메이션 커스터마이징**
   - 다양한 애니메이션 옵션 제공

4. **다국어 지원**
   - 국제화 기능 추가

## 예제 프로젝트

완전한 예제는 다음 파일들을 참고하세요:

- `app/phone-style/page.tsx` - 인트로 페이지 예제
- `app/phone-style/test/page.tsx` - 테스트 페이지 예제
- `app/phone-style/result/page.tsx` - 결과 페이지 예제
- `data/phoneQuestions.ts` - 질문 데이터 예제
- `data/phoneResults.ts` - 결과 데이터 예제

## 최근 개선사항 (v3.1.0)

### 개선된 퀴즈 목록
다음 5개 퀴즈의 인트로 페이지가 템플릿 시스템으로 개선되었습니다:

1. **📸 사진 찍는 스타일 테스트** (`app/photo-style/page.tsx`)
   - 풍부한 설명과 바이럴 예시 추가
   - 사진 촬영 스타일 분석 기능 강조

2. **☕ 커피 MBTI** (`app/coffee-mbti/page.tsx`)
   - 16가지 커피 유형 소개
   - 커피 취향 분석 기능 강조

3. **🎬 K-드라마 클리셰 테스트** (`app/kdrama-mbti/page.tsx`)
   - 드라마 캐릭터 포지션 소개
   - 재벌남/여부터 국밥 조연까지

4. **🍎 백설공주 에겐테토 테스트** (`app/snowwhite-mbti/page.tsx`)
   - 감정파 에겐 vs 효율파 테토 대비
   - 백설공주 이야기 기반 성격 분석

5. **🎤 K-팝 아이돌 포지션 테스트** (`app/kpop-idol/page.tsx`)
   - 아이돌 그룹 포지션 소개
   - 카리스마 리더부터 4차원 막내까지

### 개선된 디자인 요소

**일관된 템플릿 시스템**
- 모든 퀴즈가 동일한 디자인 패턴 적용
- 각 퀴즈별 고유한 색상 조합과 그라데이션
- 시각적으로 매력적인 아이콘과 이모지 사용

**풍부한 콘텐츠**
- 각 퀴즈의 특징과 목적을 명확히 설명
- SNS 공유용 바이럴 예시 문구 제공
- 퀴즈의 핵심 가치와 기능을 리스트로 소개

**사용자 경험 개선**
- 모든 퀴즈에서 일관된 네비게이션 경험
- 소요시간, 문항수, 카테고리 정보 명확히 표시
- 애니메이션과 호버 효과로 시각적 피드백 제공

### 기술적 성과

**코드 품질 향상**
- 템플릿 재사용으로 중복 코드 제거
- TypeScript 타입 안전성 보장
- 관심사 분리로 코드 가독성 향상

**성능 최적화**
- 동적 임포트로 필요한 컴포넌트만 로드
- OG 이미지 자동 생성으로 SEO 최적화
- 템플릿 시스템으로 번들 크기 최적화

## 자동 등록 시스템 (v3.2.0)

### 새로운 퀴즈 자동 등록
새로운 퀴즈를 개발하면 자동으로 테스트 목록에 추가되는 시스템이 구축되었습니다.

#### 자동 등록 방법
1. **`lib/auto-test-registry.ts`에 등록 규칙 추가**:
```typescript
{
  idPattern: "your-quiz-id",
  autoGenerate: {
    title: "퀴즈 제목",
    description: "퀴즈 설명",
    icon: YourIcon,
    color: "from-color-500 to-color-600",
    category: "카테고리",
    tags: ["태그1", "태그2", "태그3"]
  },
  optional: {
    badge: "NEW", // 또는 "HOT"
    new: true,
    popular: true
  }
}
```

2. **자동으로 테스트 페이지에 표시**:
- 퀴즈 개발 완료 시 자동으로 `/tests` 페이지에 추가
- 검색 및 카테고리 필터링 지원
- 참여자 수, 평점, 배지 자동 생성

#### 방청소 퀴즈 등록 예시
```typescript
{
  idPattern: "clean-style",
  autoGenerate: {
    title: "🧹 방 청소 스타일 테스트",
    description: "청소하는 모습으로 알아보는 나의 성격!",
    icon: Broom,
    color: "from-blue-500 to-green-600",
    category: "라이프스타일",
    tags: ["청소", "정리", "방", "성격"]
  },
  optional: {
    badge: "NEW",
    new: true
  }
}
```

### 자동 등록 시스템의 장점
- **개발 효율성**: 퀴즈 개발 후 수동 등록 불필요
- **일관성**: 모든 퀴즈가 동일한 형식으로 등록
- **확장성**: 새로운 퀴즈 추가 시 자동으로 시스템에 반영
- **유지보수**: 중앙화된 등록 시스템으로 관리 용이
