# 🧪 퀴즈 개발 가이드

## 📋 개발 규칙 요약

### 1. 필수 구현 사항
- ✅ **자동 진행 시스템**: 답변 클릭 시 0.5초 후 자동으로 다음 질문으로 이동
- ✅ **Analytics 이벤트**: 모든 사용자 행동 추적
- ✅ **SEO/AEO/GEO 최적화**: 검색 엔진 최적화
- ✅ **PRD 문서 자동 업데이트**: 개발 완료 시 문서 업데이트

### 2. 개발 워크플로우

#### 2.1 데이터 구조 설계
```bash
# 1단계: 질문/결과 데이터 생성
touch data/{testName}Config.ts
```

#### 2.2 페이지 구현
```bash
# 2단계: 라우팅 및 페이지 생성
mkdir -p app/{testName}/test/result
touch app/{testName}/page.tsx
touch app/{testName}/test/page.tsx  
touch app/{testName}/test/result/page.tsx
```

#### 2.3 컴포넌트 구현
```bash
# 3단계: 재사용 가능한 컴포넌트
mkdir -p components/{testName}
touch components/{testName}/ProgressBar.tsx
touch components/{testName}/ChoiceCard.tsx
touch components/{testName}/ShareButtons.tsx
touch components/{testName}/ResultBlocks.tsx
```

#### 2.4 PRD 문서 업데이트
```bash
# 4단계: 자동 문서 업데이트
npm run update-prd {testName} "{테스트명}" "{이모지}" "{설명}" "completed"
```

## 🚀 사용 예시

### 편의점 장바구니 테스트 완료 시
```bash
npm run update-prd conbini-basket "편의점 장바구니 성격 테스트" "🛍️" "편의점에서 고르는 선택으로 성격 유형을 분석합니다" "completed"
```

### 결과
- ✅ `IMPLEMENTED_TESTS` 배열에 추가
- ✅ `DEVELOPMENT_STATUS.completed`에 추가  
- ✅ 컬러 시스템에 그라데이션 추가
- ✅ 로드맵에 완료 항목 추가

## 📝 개발 체크리스트

### 데이터 구조
- [ ] 12문항 질문 정의
- [ ] 16유형 결과 데이터
- [ ] MBTI 태깅 시스템
- [ ] SEO/AEO/GEO 키워드

### 페이지 구현
- [ ] 인트로 페이지 (SEO 최적화)
- [ ] 테스트 진행 페이지 (자동 진행)
- [ ] 결과 페이지 (공유 기능)
- [ ] Analytics 이벤트 추가

### 컴포넌트
- [ ] ProgressBar 컴포넌트
- [ ] ChoiceCard 컴포넌트
- [ ] ShareButtons 컴포넌트
- [ ] ResultBlocks 컴포넌트

### 자동 업데이트
- [ ] PRD 문서 업데이트
- [ ] 개발 상태 추적
- [ ] 컬러 시스템 추가
- [ ] 로드맵 업데이트

## 🎯 자동 진행 시스템 구현

### 핵심 코드
```typescript
const handleAnswer = (answer: string) => {
  // 답변 저장
  const newAnswers = [...answers, answer]
  setAnswers(newAnswers)
  
  // Analytics 이벤트
  trackQuestionAnswer(currentQuestion + 1, answer, window.location.pathname)
  
  // 0.5초 후 자동 진행
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
```

### 애니메이션 CSS
```css
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

## 📊 Analytics 필수 이벤트

```typescript
// 테스트 시작
trackTestStart("test-name", window.location.pathname)

// 각 질문 답변
trackQuestionAnswer(questionNumber, answer, window.location.pathname)

// 테스트 완료
trackTestComplete("test-name", result, window.location.pathname)

// 결과 조회
trackResultView("test-name", result, window.location.pathname)

// 결과 공유
trackShare("test-name", result, platform)
```

## 🔄 자동 업데이트 시스템

### 스크립트 사용법
```bash
# 기본 사용법
npm run update-prd {testName} "{title}" "{emoji}" "{description}" "{status}"

# 예시
npm run update-prd music-mbti "음악 취향 MBTI" "🎵" "음악 취향으로 알아보는 성격 유형" "completed"
```

### 업데이트 내용
1. **IMPLEMENTED_TESTS 배열**에 새 퀴즈 추가
2. **DEVELOPMENT_STATUS** 업데이트
3. **컬러 시스템**에 그라데이션 추가
4. **로드맵**에 완료 항목 추가

---

**개발 완료 시 반드시 실행**: `npm run update-prd` 명령어로 PRD 문서를 자동 업데이트하세요!
