#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 자동 배포 시작...');

// 현재 시간 가져오기
const timestamp = new Date().toLocaleString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

try {
  // Git 상태 확인
  console.log('📋 Git 상태 확인 중...');
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (!gitStatus.trim()) {
    console.log('📝 변경사항이 없습니다.');
    process.exit(0);
  }

  // 변경사항 추가
  console.log('📦 변경사항 추가 중...');
  execSync('git add .', { stdio: 'inherit' });

  // 커밋 메시지 생성
  const commitMsg = `feat: 자동 배포 - ${timestamp}

- 개발 완료 자동 커밋
- 새로운 기능 및 개선사항 반영
- 빌드 및 배포 준비 완료`;

  // 커밋
  console.log('💾 커밋 중...');
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

  // 푸시
  console.log('📤 GitHub에 푸시 중...');
  execSync('git push origin main', { stdio: 'inherit' });

  // 성공 메시지
  console.log('✅ 자동 배포 완료!');
  console.log('🌐 배포 URL: https://temon.kr');
  console.log('📊 GitHub Actions: https://github.com/lsk7209/temon_new/actions');
  console.log('⏰ 배포 시간:', timestamp);

} catch (error) {
  console.error('❌ 배포 실패:', error.message);
  process.exit(1);
}
