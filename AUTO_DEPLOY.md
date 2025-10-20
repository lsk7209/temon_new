# 🚀 자동 배포 설정 가이드

개발 완료 시 자동으로 GitHub에 업로드하는 설정입니다.

## 📋 설정된 자동 배포 기능

### 1. **GitHub Actions 자동 배포**
- `main` 브랜치에 푸시 시 자동으로 Vercel에 배포
- 빌드 및 테스트 자동 실행
- 배포 상태 알림

### 2. **로컬 자동 배포 스크립트**
- 개발 완료 시 한 번의 명령으로 GitHub 업로드
- 자동 커밋 메시지 생성
- 배포 상태 확인

## 🛠️ 사용 방법

### **방법 1: npm 스크립트 사용**
```bash
# Node.js 기반 자동 배포 (권장)
npm run deploy

# Windows용 배치 파일
npm run auto-deploy:win

# Linux/Mac용 셸 스크립트
npm run auto-deploy
```

### **방법 2: VS Code 태스크 사용**
1. `Ctrl+Shift+P` (Windows) 또는 `Cmd+Shift+P` (Mac)
2. "Tasks: Run Task" 선택
3. "Auto Deploy to GitHub" 선택

### **방법 3: 직접 스크립트 실행**
```bash
# Windows
scripts\auto-deploy.bat

# Linux/Mac
bash scripts/auto-deploy.sh

# Node.js
node scripts/deploy.js
```

## ⚙️ GitHub Actions 설정

### **필요한 Secrets 설정**
GitHub 저장소 Settings > Secrets and variables > Actions에서 다음 설정:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id  
VERCEL_PROJECT_ID=your_project_id
```

### **자동 배포 워크플로우**
- **트리거**: `main` 브랜치 푸시
- **빌드**: Next.js 프로젝트 빌드
- **배포**: Vercel 자동 배포
- **알림**: 배포 완료 상태 확인

## 📁 파일 구조

```
├── .github/workflows/
│   └── auto-deploy.yml          # GitHub Actions 워크플로우
├── scripts/
│   ├── deploy.js                # Node.js 자동 배포 스크립트
│   ├── auto-deploy.sh           # Linux/Mac 셸 스크립트
│   └── auto-deploy.bat          # Windows 배치 파일
├── .vscode/
│   └── tasks.json               # VS Code 태스크 설정
└── package.json                 # npm 스크립트 추가
```

## 🎯 자동 배포 프로세스

1. **변경사항 확인**: Git 상태 체크
2. **파일 추가**: `git add .`
3. **자동 커밋**: 타임스탬프 포함 커밋 메시지
4. **GitHub 푸시**: `git push origin main`
5. **GitHub Actions**: 자동 빌드 및 Vercel 배포
6. **완료 알림**: 배포 URL 및 상태 확인

## 🔧 커스터마이징

### **커밋 메시지 수정**
`scripts/deploy.js` 파일에서 커밋 메시지 템플릿 수정:

```javascript
const commitMsg = `feat: 자동 배포 - ${timestamp}

- 개발 완료 자동 커밋
- 새로운 기능 및 개선사항 반영
- 빌드 및 배포 준비 완료`;
```

### **배포 조건 추가**
GitHub Actions 워크플로우에서 추가 조건 설정:

```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

## 📊 배포 상태 확인

### **GitHub Actions**
- URL: https://github.com/lsk7209/temon_new/actions
- 실시간 배포 상태 확인
- 빌드 로그 및 오류 확인

### **Vercel 대시보드**
- URL: https://vercel.com/dashboard
- 배포 히스토리 확인
- 도메인 및 환경 변수 관리

## 🚨 문제 해결

### **배포 실패 시**
1. GitHub Actions 로그 확인
2. 빌드 오류 메시지 확인
3. 환경 변수 설정 확인
4. Vercel 프로젝트 설정 확인

### **자동 배포 스크립트 오류**
1. Git 상태 확인: `git status`
2. 권한 확인: 스크립트 실행 권한
3. Node.js 버전 확인: `node --version`

## ✅ 체크리스트

- [ ] GitHub Actions 워크플로우 활성화
- [ ] Vercel Secrets 설정 완료
- [ ] 자동 배포 스크립트 테스트
- [ ] VS Code 태스크 설정 확인
- [ ] 배포 URL 접근 가능 확인

## 🎉 완료!

이제 개발 완료 시 `npm run deploy` 명령어 하나로 자동으로 GitHub에 업로드되고 Vercel에 배포됩니다!
