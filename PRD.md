# 테몬 MBTI 플랫폼 PRD (Product Requirements Document)

## 📋 문서 정보
- **버전**: 2.0.0
- **작성일**: 2024년 12월
- **마지막 업데이트**: 2024년 12월
- **작성자**: 테몬 개발팀
- **상태**: 개발 진행 중

---

## 🎯 1. 프로젝트 개요

### 1.1 프로젝트 목표
- **주요 목표**: MZ세대 맞춤형 재미있는 MBTI 테스트 플랫폼 구축
- **비즈니스 목표**: 사용자 참여도 증대 및 광고 수익 창출
- **기술 목표**: 확장 가능하고 유지보수가 용이한 아키텍처 구축

### 1.2 타겟 사용자
- **주요 타겟**: 20-35세 MZ세대
- **사용 패턴**: 모바일 우선, SNS 공유 활발
- **참여 동기**: 재미, 자기 이해, 소셜 공유

### 1.3 핵심 가치 제안
- **다양한 주제**: 일상생활 기반 재미있는 테스트
- **정확한 분석**: 심리학 기반 과학적 분석
- **빠른 완료**: 2-3분 내 완료 가능
- **소셜 공유**: 결과 공유 및 비교 기능

---

## 🏗️ 2. 기술 아키텍처

### 2.1 기술 스택
```
Frontend: Next.js 14 (App Router) + TypeScript
Styling: Tailwind CSS + shadcn/ui
Database: Supabase (PostgreSQL)
Authentication: Supabase Auth
File Storage: Supabase Storage
Deployment: Vercel
Analytics: Google Analytics 4
Monetization: Google AdSense
Version Control: GitHub
CI/CD: GitHub Actions + Vercel
```

### 2.2 인프라 구조
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel CDN    │    │   GitHub Repo   │    │   Supabase      │
│                 │    │                 │    │                 │
│ • Next.js App   │◄──►│ • Source Code   │◄──►│ • PostgreSQL    │
│ • Static Assets │    │ • CI/CD Pipeline│    │ • Auth System   │
│ • Edge Functions│    │ • Issue Tracking│    │ • File Storage  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Google Services│
                    │                 │
                    │ • Analytics 4   │
                    │ • AdSense       │
                    │ • Search Console│
                    └─────────────────┘
```

### 2.3 데이터베이스 설계
```sql
-- 사용자 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE,
  name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 테스트 테이블
CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  icon VARCHAR(50),
  color_gradient VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 테스트 결과 테이블
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  test_id UUID REFERENCES tests(id),
  result_type VARCHAR(10),
  answers JSONB,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- 파일 업로드 테이블
CREATE TABLE uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  file_name VARCHAR(255),
  file_path TEXT,
  file_size INTEGER,
  mime_type VARCHAR(100),
  upload_type VARCHAR(50), -- 'test_image', 'result_image', 'avatar'
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🚀 3. 핵심 기능 요구사항

### 3.1 테스트 시스템
#### 3.1.1 테스트 구조
- **문항 수**: 12개 고정
- **보기 수**: 2개 (A, B) 고정
- **진행 방식**: 자동 진행 (0.5초 딜레이)
- **MBTI 계산**: E/I, S/N, T/F, J/P 4차원 균형

#### 3.1.2 테스트 카테고리
- **음식**: 커피, 라면, 디저트, 술
- **생활**: 알람, 운동, 여행, 쇼핑
- **관계**: 반려동물, 연애, 친구, 가족
- **엔터테인먼트**: 드라마, 영화, 음악, 게임
- **학습**: 공부, 독서, 언어, 취미

### 3.2 사용자 관리
#### 3.2.1 인증 시스템
- **소셜 로그인**: Google, Kakao, Naver
- **이메일 인증**: Supabase Auth
- **프로필 관리**: 아바타, 닉네임, 설정

#### 3.2.2 사용자 경험
- **개인화**: 맞춤 테스트 추천
- **히스토리**: 테스트 결과 저장
- **통계**: 개인 통계 대시보드

### 3.3 콘텐츠 관리
#### 3.3.1 테스트 관리
- **CRUD 기능**: 생성, 수정, 삭제, 조회
- **버전 관리**: 테스트 업데이트 히스토리
- **A/B 테스트**: 문항 및 결과 개선

#### 3.3.2 미디어 관리
- **이미지 업로드**: 테스트 썸네일, 결과 이미지
- **파일 최적화**: 자동 리사이징, WebP 변환
- **CDN 배포**: Vercel Edge Network

### 3.4 분석 및 모니터링
#### 3.4.1 사용자 분석
- **Google Analytics 4**: 페이지뷰, 이벤트 추적
- **커스텀 이벤트**: 테스트 시작, 완료, 공유
- **사용자 여정**: 퍼널 분석

#### 3.4.2 비즈니스 분석
- **수익 분석**: AdSense 수익 추적
- **성과 지표**: 완료율, 공유율, 재방문율
- **A/B 테스트**: 결과 개선

---

## 📱 4. 사용자 인터페이스

### 4.1 디자인 시스템
#### 4.1.1 컬러 팔레트
```css
/* 테스트별 그라데이션 */
여행 짐싸기 MBTI: from-blue-500 to-purple-600
편의점 장바구니 MBTI: from-orange-400 to-red-500
디저트 취향 MBTI: from-pink-500 to-purple-600
사진 찍는 스타일: from-purple-500 to-pink-600
스마트폰 습관: from-blue-500 to-indigo-600
영화관 관람 스타일: from-indigo-400 to-purple-500
자취 밥상 스타일: from-amber-400 to-orange-500
음악 취향 MBTI: from-green-400 to-emerald-500
```

#### 4.1.2 컴포넌트 시스템
- **기본 컴포넌트**: shadcn/ui 기반
- **커스텀 컴포넌트**: 테스트 전용 컴포넌트
- **반응형 디자인**: 모바일 우선 설계

### 4.2 페이지 구조
#### 4.2.1 메인 페이지
- **Hero Section**: 브랜딩 및 CTA
- **인기 테스트**: 추천 테스트 카드
- **통계 섹션**: 플랫폼 성과 지표

#### 4.2.2 테스트 페이지
- **소개 페이지**: 테스트 설명 및 시작 버튼
- **진행 페이지**: 질문 및 답변 선택
- **결과 페이지**: 결과 표시 및 공유 기능

#### 4.2.3 관리자 페이지
- **대시보드**: 통계 및 분석
- **테스트 관리**: CRUD 기능
- **사용자 관리**: 사용자 정보 및 활동

---

## 🧪 4. 테스트 목록

### 4.1 완료된 테스트
| 테스트명 | 상태 | 개발일 | 설명 | 라우팅 |
|---------|------|--------|------|--------|
| **커피 MBTI** | ✅ 완료 | 2024-12 | 커피 취향으로 보는 성격 테스트 | `/coffee-mbti` |
| **라면 MBTI** | ✅ 완료 | 2024-12 | 라면 취향으로 보는 성격 테스트 | `/ramen-mbti` |
| **반려동물 MBTI** | ✅ 완료 | 2024-12 | 반려동물 성향으로 보는 성격 테스트 | `/pet-mbti` |
| **공부 MBTI** | ✅ 완료 | 2024-12 | 공부 스타일로 보는 성격 테스트 | `/study-mbti` |
| **알람 습관** | ✅ 완료 | 2024-12 | 아침 알람으로 보는 성격 유형 | `/alarm-habit` |
| **NTRP 테스트** | ✅ 완료 | 2024-12 | 테니스 실력 레벨 측정 | `/ntrp-test` |
| **K-드라마 클리셰** | ✅ 완료 | 2024-12 | 드라마 속 캐릭터 성격 테스트 | `/kdrama-mbti` |
| **백설공주 에겐테토** | ✅ 완료 | 2024-12 | 백설공주로 보는 에겐 vs 테토 성향 | `/snowwhite-mbti` |
| **K-팝 아이돌 포지션** | ✅ 완료 | 2024-12 | 아이돌 그룹에서 내 포지션 테스트 | `/kpop-idol` |
| **여행 짐싸기 MBTI** | ✅ 완료 | 2024-12 | 여행 짐싸는 스타일로 보는 성격 테스트 | `/travel-pack-mbti` |
| **편의점 장바구니 MBTI** | ✅ 완료 | 2024-12 | 편의점 쇼핑 습관으로 보는 성격 테스트 | `/conbini-basket-mbti` |
| **디저트 취향 MBTI** | ✅ 완료 | 2024-12 | 디저트 선택으로 보는 성격 테스트 | `/dessert-style` |
| **사진 찍는 스타일 테스트** | ✅ 완료 | 2024-12 | 사진 촬영 방식으로 보는 성격 테스트 | `/photo-style` |
| **스마트폰 습관 테스트** | ✅ 완료 | 2024-12 | 스마트폰 사용 패턴으로 보는 성격 테스트 | `/phone-style` |

### 4.2 개발 예정 테스트
| 테스트명 | 상태 | 예정일 | 설명 | 우선순위 |
|---------|------|--------|------|----------|
| **영화관 관람 스타일** | 🔄 개발중 | 2024-12 | 영화관에서의 행동으로 보는 성격 | 높음 |
| **자취 밥상 스타일** | 📋 기획 | 2024-12 | 혼자 먹는 밥으로 보는 성격 | 높음 |
| **음악 취향 MBTI** | 📋 기획 | 2024-12 | 음악 선택으로 보는 성격 | 중간 |
| **스마트폰 사용 습관** | 📋 기획 | 2024-12 | 스마트폰 사용법으로 보는 성격 | 중간 |
| **사진 찍는 스타일** | 📋 기획 | 2024-12 | 사진 촬영 방식으로 보는 성격 | 중간 |
| **배달음식 선택 스타일** | 📋 기획 | 2024-12 | 배달음식 선택으로 보는 성격 | 낮음 |

### 4.3 테스트 개발 규칙
- **자동 진행**: 답변 선택 후 0.5초 딜레이로 자동 진행
- **12문항 고정**: 각 MBTI 축(E/I, S/N, T/F, J/P) 3문항씩
- **2지선다**: A, B 선택지로 단순화
- **MBTI 계산**: 4차원 균형 계산으로 정확한 결과 제공
- **공유 기능**: OG 이미지 생성 및 SNS 공유 지원
- **자동 등록**: 새로운 퀴즈 개발 시 자동으로 테스트 메뉴에 추가
- **페이지네이션**: 테스트 목록 페이지당 9개씩 표시

### 4.4 자동 퀴즈 등록 시스템
#### 4.4.1 시스템 개요
- **자동 등록**: 새로운 퀴즈가 개발되면 자동으로 테스트 목록에 추가
- **메타데이터 관리**: 퀴즈별 아이콘, 색상, 카테고리, 태그 자동 설정
- **중복 방지**: 이미 등록된 퀴즈는 중복 등록되지 않음

#### 4.4.2 사용 방법
```bash
# 퀴즈 등록
npm run quiz:register <quiz-id>

# 등록된 퀴즈 목록 확인
npm run quiz:list

# 퀴즈 등록 상태 확인
npm run quiz:check <quiz-id>
```

#### 4.4.3 등록 규칙
- **ID 패턴**: 라우팅 경로와 일치해야 함 (예: `dessert-style`)
- **자동 메타데이터**: 제목, 설명, 아이콘, 색상, 카테고리, 태그
- **수동 설정**: 배지, 인기도, 신규 여부 등은 선택적 설정 가능

---

## 🔧 5. 개발 프로세스

### 5.1 개발 환경
#### 5.1.1 로컬 개발
```bash
# 필수 도구
- Node.js 18+
- pnpm (패키지 매니저)
- Git
- VS Code (권장)

# 환경 설정
- .env.local 파일 생성
- Supabase 프로젝트 설정
- Google Analytics 설정
```

#### 5.1.2 코드 품질
- **TypeScript**: 엄격한 타입 체크
- **ESLint**: 코드 스타일 검사
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅 설정

### 5.2 배포 프로세스
#### 5.2.1 Vercel 배포
```yaml
# vercel.json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "outputDirectory": ".next"
}
```

#### 5.2.2 CI/CD 파이프라인
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

### 5.3 데이터베이스 관리
#### 5.3.1 Supabase 설정
- **프로젝트 생성**: Supabase 대시보드
- **데이터베이스 스키마**: SQL 마이그레이션
- **Row Level Security**: 보안 정책 설정
- **실시간 구독**: 실시간 데이터 동기화

#### 5.3.2 백업 및 복구
- **자동 백업**: 일일 백업 스케줄
- **데이터 마이그레이션**: 버전별 스키마 관리
- **복구 계획**: 장애 대응 절차

---

## 📊 6. 성능 및 최적화

### 6.1 성능 목표
- **페이지 로드 시간**: 3초 이내
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **모바일 성능**: 90점 이상 (Lighthouse)
- **SEO 점수**: 95점 이상

### 6.2 최적화 전략
#### 6.2.1 프론트엔드 최적화
- **코드 스플리팅**: 동적 import 활용
- **이미지 최적화**: Next.js Image 컴포넌트
- **캐싱 전략**: Vercel Edge Cache
- **번들 최적화**: Tree shaking, 압축

#### 6.2.2 백엔드 최적화
- **데이터베이스 인덱싱**: 쿼리 성능 최적화
- **API 최적화**: 응답 시간 단축
- **캐싱**: Redis 캐시 활용
- **CDN**: 정적 자산 배포

### 6.3 모니터링
#### 6.3.1 성능 모니터링
- **Vercel Analytics**: 실시간 성능 지표
- **Google PageSpeed**: 성능 점수 추적
- **Web Vitals**: 사용자 경험 지표

#### 6.3.2 에러 모니터링
- **Sentry**: 에러 추적 및 알림
- **Vercel Functions**: 서버리스 함수 모니터링
- **Supabase**: 데이터베이스 에러 추적

---

## 🔒 7. 보안 및 개인정보보호

### 7.1 보안 정책
#### 7.1.1 인증 및 권한
- **JWT 토큰**: Supabase Auth
- **Row Level Security**: 데이터베이스 레벨 보안
- **API 보안**: Rate limiting, CORS 설정
- **관리자 권한**: 역할 기반 접근 제어

#### 7.1.2 데이터 보호
- **개인정보 암호화**: 민감 정보 암호화
- **HTTPS**: 모든 통신 암호화
- **데이터 보존**: GDPR 준수
- **백업 보안**: 암호화된 백업

### 7.2 개인정보보호
#### 7.2.1 GDPR 준수
- **동의 관리**: 쿠키 및 추적 동의
- **데이터 삭제**: 사용자 요청 시 데이터 삭제
- **투명성**: 개인정보 처리 방침
- **데이터 이식성**: 사용자 데이터 내보내기

#### 7.2.2 쿠키 정책
- **필수 쿠키**: 기능 동작 필수
- **분석 쿠키**: Google Analytics
- **광고 쿠키**: Google AdSense
- **선택적 쿠키**: 사용자 선택 기반

---

## 💰 8. 수익화 전략

### 8.1 광고 수익
#### 8.1.1 Google AdSense
- **배치 전략**: 사용자 경험 최적화
- **수익 최적화**: A/B 테스트를 통한 개선
- **모니터링**: 수익 지표 추적
- **정책 준수**: AdSense 정책 위반 방지

#### 8.1.2 광고 최적화
- **위치 최적화**: 클릭률 향상
- **타이밍 최적화**: 사용자 행동 기반
- **콘텐츠 연관성**: 관련성 높은 광고
- **모바일 최적화**: 모바일 광고 경험

### 8.2 프리미엄 기능
#### 8.2.1 유료 기능 (향후)
- **상세 분석**: 개인별 상세 리포트
- **무제한 테스트**: 모든 테스트 무제한 이용
- **광고 제거**: 광고 없는 경험
- **우선 지원**: 고객 지원 우선권

#### 8.2.2 구독 모델
- **월 구독**: 월 4,900원
- **연 구독**: 연 49,000원 (2개월 무료)
- **가족 플랜**: 최대 5명 공유
- **학생 할인**: 50% 할인

---

## 📈 9. 성장 전략

### 9.1 사용자 확보
#### 9.1.1 마케팅 채널
- **SNS 마케팅**: 인스타그램, 틱톡, 유튜브
- **인플루언서**: MBTI 관련 인플루언서 협업
- **SEO**: 검색 엔진 최적화
- **바이럴**: 공유 기능을 통한 자연 확산

#### 9.1.2 사용자 참여
- **커뮤니티**: 결과 공유 및 토론
- **이벤트**: 정기적인 테스트 이벤트
- **리워드**: 참여 보상 시스템
- **개인화**: 맞춤형 추천 시스템

### 9.2 콘텐츠 확장
#### 9.2.1 테스트 다양화
- **트렌드 반영**: 최신 트렌드 기반 테스트
- **계절성**: 계절별 특별 테스트
- **협업**: 브랜드와의 협업 테스트
- **사용자 제작**: UGC 테스트 플랫폼

#### 9.2.2 기능 확장
- **AI 분석**: GPT 기반 개인화 분석
- **AR/VR**: 몰입형 테스트 경험
- **음성 인식**: 음성 기반 테스트
- **실시간**: 실시간 멀티플레이어 테스트

---

## 🎯 10. 성공 지표 (KPI)

### 10.1 사용자 지표
- **일일 활성 사용자 (DAU)**: 1,000명 목표
- **월간 활성 사용자 (MAU)**: 10,000명 목표
- **사용자 유지율**: 30일 후 20% 유지
- **평균 세션 시간**: 5분 이상

### 10.2 비즈니스 지표
- **테스트 완료율**: 70% 이상
- **결과 공유율**: 30% 이상
- **월간 수익**: 100만원 목표
- **사용자당 수익 (ARPU)**: 1,000원 목표

### 10.3 기술 지표
- **페이지 로드 시간**: 3초 이내
- **에러율**: 1% 이하
- **가동률**: 99.9% 이상
- **보안 사고**: 0건 목표

---

## 📅 11. 개발 로드맵

### 11.1 Phase 1: 기반 구축 (1-2개월)
- [ ] Supabase 데이터베이스 구축
- [ ] 사용자 인증 시스템 구현
- [ ] 기본 테스트 CRUD 기능
- [ ] 파일 업로드 시스템
- [ ] 관리자 대시보드

### 11.2 Phase 2: 기능 확장 (2-3개월)
- [ ] 개인화 추천 시스템
- [ ] 사용자 통계 대시보드
- [ ] 소셜 공유 기능 강화
- [ ] A/B 테스트 시스템
- [ ] 모바일 앱 (PWA)

### 11.3 Phase 3: 고도화 (3-4개월)
- [ ] AI 기반 개인화 분석
- [ ] 실시간 기능
- [ ] 커뮤니티 기능
- [ ] 프리미엄 구독 모델
- [ ] 다국어 지원

### 11.4 Phase 4: 확장 (4-6개월)
- [ ] API 플랫폼화
- [ ] 파트너십 프로그램
- [ ] 글로벌 진출
- [ ] 엔터프라이즈 솔루션
- [ ] IPO 준비

---

## 🔄 12. 유지보수 및 운영

### 12.1 정기 점검
#### 12.1.1 일일 점검
- [ ] 시스템 가동률 확인
- [ ] 에러 로그 검토
- [ ] 성능 지표 모니터링
- [ ] 보안 알림 확인

#### 12.1.2 주간 점검
- [ ] 사용자 피드백 검토
- [ ] 성능 최적화 검토
- [ ] 콘텐츠 업데이트
- [ ] 백업 상태 확인

#### 12.1.3 월간 점검
- [ ] 비즈니스 지표 분석
- [ ] 보안 감사
- [ ] 시스템 업데이트
- [ ] 재해 복구 테스트

### 12.2 장애 대응
#### 12.2.1 장애 분류
- **Critical**: 서비스 완전 중단
- **High**: 주요 기능 장애
- **Medium**: 일부 기능 장애
- **Low**: 사용자 경험 저하

#### 12.2.2 대응 절차
1. **감지**: 모니터링 시스템 알림
2. **분석**: 장애 원인 파악
3. **대응**: 임시 조치 및 복구
4. **복구**: 정상 서비스 복구
5. **후속**: 원인 분석 및 개선

---

## 📞 13. 연락처 및 지원

### 13.1 개발팀
- **프로젝트 매니저**: [이름] - [이메일]
- **프론트엔드 개발자**: [이름] - [이메일]
- **백엔드 개발자**: [이름] - [이메일]
- **UI/UX 디자이너**: [이름] - [이메일]

### 13.2 외부 서비스
- **Vercel**: [프로젝트 URL]
- **GitHub**: [저장소 URL]
- **Supabase**: [프로젝트 URL]
- **Google Analytics**: [계정 정보]

### 13.3 문서 및 리소스
- **기술 문서**: [TECH_DOCS.md](./TECH_DOCS.md)
- **API 문서**: [API_DOCS.md](./API_DOCS.md)
- **디자인 시스템**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **배포 가이드**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📝 14. 부록

### 14.1 용어 정의
- **MBTI**: Myers-Briggs Type Indicator
- **PRD**: Product Requirements Document
- **CRUD**: Create, Read, Update, Delete
- **API**: Application Programming Interface
- **CDN**: Content Delivery Network
- **CI/CD**: Continuous Integration/Continuous Deployment

### 14.2 참고 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Vercel 공식 문서](https://vercel.com/docs)
- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)

## 15. 퀴즈 템플릿 시스템

### 15.1 개요
테몬 MBTI 플랫폼의 퀴즈 템플릿 시스템은 일관된 사용자 경험을 제공하고 개발 효율성을 높이기 위해 설계되었습니다.

### 15.2 템플릿 구조

#### 15.2.1 QuizIntroTemplate (인트로 페이지)
- **목적**: 퀴즈 소개 및 시작 페이지
- **기능**: 
  - 일관된 디자인과 사용자 경험 제공
  - SEO 최적화된 구조
  - 퀴즈 정보 표시 (시간, 문항 수, 특징 등)
  - 관련 테스트 추천

#### 15.2.2 QuizTestTemplate (테스트 페이지)
- **목적**: 질문과 답변을 표시하는 페이지
- **기능**:
  - 자동 진행 기능 지원
  - 애니메이션과 시각적 피드백 제공
  - 진행률 표시
  - OG 이미지 표시

#### 15.2.3 QuizResultTemplate (결과 페이지)
- **목적**: 테스트 결과를 표시하는 페이지
- **기능**:
  - 공유 기능 및 관련 테스트 추천
  - 구조화된 데이터 지원
  - 커스텀 섹션 지원
  - 텍스트 가독성 최적화

### 15.3 데이터 구조

#### 15.3.1 QuizQuestion
```typescript
interface QuizQuestion {
  id: number
  title: string
  options: {
    label: string
    tags: string[]
  }[]
}
```

#### 15.3.2 QuizResult
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
```

### 15.4 사용 방법

#### 15.4.1 기본 설정
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

#### 15.4.2 페이지 생성
1. **인트로 페이지**: `QuizIntroTemplate` 사용
2. **테스트 페이지**: `QuizTestTemplate` 사용
3. **결과 페이지**: `QuizResultTemplate` 사용

### 15.5 스타일링 가이드

#### 15.5.1 그라디언트 색상
- **파란색 계열**: `from-blue-500` to `to-indigo-600`
- **보라색 계열**: `from-purple-500` to `to-pink-600`
- **오렌지 계열**: `from-orange-500` to `to-red-500`
- **핑크 계열**: `from-pink-500` to `to-purple-600`

#### 15.5.2 이모지 선택
- 퀴즈의 주제와 관련된 이모지 선택
- 사용자가 직관적으로 이해할 수 있는 것
- 일관성 있는 스타일 유지

### 15.6 베스트 프랙티스

#### 15.6.1 질문 설계
- 질문은 8-16개 정도가 적당
- 각 질문마다 2-4개의 옵션 제공
- MBTI 태그는 E/I, S/N, T/F, J/P 사용

#### 15.6.2 결과 작성
- 결과 설명은 3-5줄로 구성
- 특징은 5-8개 정도가 적당
- 공유 텍스트는 재미있고 공유하고 싶게 작성

#### 15.6.3 성능 최적화
- 이미지 최적화
- 애니메이션 성능 고려
- SEO 최적화

#### 15.6.4 공유하기 영역
- **공통 공유하기 영역**: 모든 퀴즈 결과페이지 하단에 일관된 공유하기 영역 제공
- **링크 복사 버튼만 제공**: 복잡한 소셜 공유 버튼 대신 간단한 링크 복사 기능
- **중앙 정렬**: 버튼을 중앙에 배치하여 깔끔한 UI 제공
- **피드백 제공**: 복사 완료 시 시각적 피드백 제공

### 15.7 마이그레이션 가이드

기존 퀴즈를 템플릿으로 마이그레이션하는 방법:

1. **기존 코드 분석**: 현재 구조 파악, 공통 패턴 식별
2. **데이터 구조 변환**: 질문/결과 데이터를 표준 형태로 변환
3. **템플릿 적용**: 각 페이지를 해당 템플릿으로 교체
4. **테스트 및 검증**: 모든 기능이 정상 작동하는지 확인

### 15.8 확장 가능성

- **새로운 템플릿 추가**: 특별한 기능이 필요한 경우
- **커스텀 섹션 확장**: 더 많은 섹션 타입 추가
- **애니메이션 커스터마이징**: 다양한 애니메이션 옵션 제공
- **다국어 지원**: 국제화 기능 추가

### 15.9 참고 문서
- 상세한 사용 가이드: `docs/QUIZ_TEMPLATE_GUIDE.md`
- 예제 프로젝트: `app/phone-style/` 디렉토리

### 14.3 변경 이력
| 버전 | 날짜 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 1.0.0 | 2024-12 | 초기 PRD 작성 | 개발팀 |
| 2.0.0 | 2024-12 | Vercel/GitHub/Supabase 통합 | 개발팀 |
| 3.0.0 | 2024-12 | 퀴즈 템플릿 시스템 구축 | 개발팀 |

---

**문서 끝**

*이 PRD는 지속적인 개발과 균일한 개발을 위한 가이드라인입니다. 프로젝트 진행에 따라 지속적으로 업데이트됩니다.*
