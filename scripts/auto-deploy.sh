#!/bin/bash

# 자동 배포 스크립트
# 개발 완료 시 자동으로 GitHub에 업로드

echo "🚀 자동 배포 시작..."

# 현재 시간 가져오기
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# 변경사항 확인
if git diff --quiet && git diff --cached --quiet; then
    echo "📝 변경사항이 없습니다."
    exit 0
fi

# 변경사항 추가
echo "📦 변경사항 추가 중..."
git add .

# 커밋 메시지 생성
COMMIT_MSG="feat: 자동 배포 - $TIMESTAMP

- 개발 완료 자동 커밋
- 새로운 기능 및 개선사항 반영
- 빌드 및 배포 준비 완료"

# 커밋
echo "💾 커밋 중..."
git commit -m "$COMMIT_MSG"

# 푸시
echo "📤 GitHub에 푸시 중..."
git push origin main

# 결과 확인
if [ $? -eq 0 ]; then
    echo "✅ 자동 배포 완료!"
    echo "🌐 배포 URL: https://temon.kr"
    echo "📊 GitHub Actions: https://github.com/lsk7209/temon_new/actions"
    echo "⏰ 배포 시간: $TIMESTAMP"
else
    echo "❌ 배포 실패"
    exit 1
fi
