# 🚀 Vercel 환경 변수 설정 가이드

## 📋 Supabase 환경 변수 설정

Vercel 배포 시 Supabase 환경 변수가 설정되지 않아 빌드가 실패하는 문제를 해결하기 위한 가이드입니다.

### 1. Vercel 대시보드에서 환경 변수 설정

1. **Vercel 프로젝트 대시보드** 접속
   - https://vercel.com/dashboard
   - `temon_new` 프로젝트 선택

2. **Settings → Environment Variables** 이동

3. **다음 환경 변수 추가**:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   ```

### 2. Supabase 프로젝트 정보 확인

1. **Supabase 대시보드** 접속
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Settings → API** 이동

3. **다음 정보 복사**:
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJ...` (긴 문자열)

### 3. 환경 변수 설정 방법

#### 방법 1: Vercel CLI 사용
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 로그인
vercel login

# 환경 변수 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# 환경 변수 확인
vercel env ls
```

#### 방법 2: Vercel 대시보드 사용
1. 프로젝트 → Settings → Environment Variables
2. "Add New" 클릭
3. Name과 Value 입력
4. Environment: Production, Preview, Development 모두 선택
5. "Save" 클릭

### 4. 환경 변수 확인

설정 후 다음 명령어로 확인:
```bash
# 로컬에서 환경 변수 확인
vercel env pull .env.local

# .env.local 파일 내용 확인
cat .env.local
```

### 5. 재배포

환경 변수 설정 후 자동으로 재배포되거나, 수동으로 재배포:
```bash
# 수동 재배포
vercel --prod
```

## 🔧 문제 해결

### 빌드 실패 시 체크리스트

- [ ] Supabase 프로젝트가 활성화되어 있는가?
- [ ] 환경 변수 이름이 정확한가? (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- [ ] 환경 변수 값이 올바른가? (URL과 키가 정확한가?)
- [ ] 모든 환경(Production, Preview, Development)에 설정되었는가?

### 일반적인 오류

#### 1. "supabaseUrl is required" 오류
```
Error: supabaseUrl is required.
```
**해결방법**: `NEXT_PUBLIC_SUPABASE_URL` 환경 변수가 설정되지 않음

#### 2. "Invalid API key" 오류
```
Error: Invalid API key
```
**해결방법**: `NEXT_PUBLIC_SUPABASE_ANON_KEY` 값이 잘못됨

#### 3. "Project not found" 오류
```
Error: Project not found
```
**해결방법**: Supabase URL이 잘못됨

## 📝 환경 변수 템플릿

### .env.local (로컬 개발용)
```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-2TLW7Z2VQW

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-3050601904412736
```

### Vercel 환경 변수 설정
```
NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🚨 중요 사항

1. **환경 변수는 대소문자를 구분합니다**
2. **`NEXT_PUBLIC_` 접두사가 필요합니다** (클라이언트에서 접근 가능)
3. **모든 환경(Production, Preview, Development)에 설정해야 합니다**
4. **환경 변수 설정 후 재배포가 필요합니다**

## 📞 지원

문제가 지속되면:
1. Vercel 로그 확인: 프로젝트 → Functions → View Function Logs
2. Supabase 로그 확인: 프로젝트 → Logs
3. GitHub Issues에 문제 보고

---

**문서 버전**: 1.0  
**최종 업데이트**: 2024년 12월
