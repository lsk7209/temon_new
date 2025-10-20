#!/usr/bin/env node

/**
 * PRD 문서 자동 업데이트 스크립트
 * 퀴즈 개발 완료 시 PRD_V2.md를 자동으로 업데이트합니다.
 */

const fs = require('fs');
const path = require('path');

// 퀴즈 정보
const QUIZ_INFO = {
  name: process.argv[2] || 'new-quiz',
  title: process.argv[3] || '새로운 퀴즈',
  emoji: process.argv[4] || '🧪',
  description: process.argv[5] || '새로운 성격 테스트',
  status: process.argv[6] || 'completed' // 'completed' | 'dataOnly' | 'planned'
};

const PRD_PATH = path.join(__dirname, '..', 'PRD_V2.md');

function updatePRD() {
  try {
    let content = fs.readFileSync(PRD_PATH, 'utf8');
    
    // 1. IMPLEMENTED_TESTS 배열에 추가
    const testEntry = `  '${QUIZ_INFO.name}',    // ${QUIZ_INFO.emoji} ${QUIZ_INFO.title}`;
    
    // 배열 끝에 추가 (마지막 항목 뒤)
    const testsRegex = /(const IMPLEMENTED_TESTS = \[[\s\S]*?\]);/;
    const match = content.match(testsRegex);
    
    if (match) {
      const currentTests = match[1];
      const updatedTests = currentTests.replace(
        /(\];)/,
        `  ${testEntry}\n];`
      );
      content = content.replace(testsRegex, updatedTests);
    }
    
    // 2. DEVELOPMENT_STATUS 업데이트
    if (QUIZ_INFO.status === 'completed') {
      const completedRegex = /(completed: \[[\s\S]*?\])/;
      const completedMatch = content.match(completedRegex);
      
      if (completedMatch) {
        const currentCompleted = completedMatch[1];
        const newEntry = `    '${QUIZ_INFO.name}' // ${QUIZ_INFO.emoji} ${QUIZ_INFO.title} - 전체 구현 완료`;
        const updatedCompleted = currentCompleted.replace(
          /(\])/,
          `  ${newEntry}\n  ]`
        );
        content = content.replace(completedRegex, updatedCompleted);
      }
    } else if (QUIZ_INFO.status === 'dataOnly') {
      const dataOnlyRegex = /(dataOnly: \[[\s\S]*?\])/;
      const dataOnlyMatch = content.match(dataOnlyRegex);
      
      if (dataOnlyMatch) {
        const currentDataOnly = dataOnlyMatch[1];
        const newEntry = `    '${QUIZ_INFO.name}' // ${QUIZ_INFO.emoji} ${QUIZ_INFO.title} - 데이터 구조만 완료`;
        const updatedDataOnly = currentDataOnly.replace(
          /(\])/,
          `  ${newEntry}\n  ]`
        );
        content = content.replace(dataOnlyRegex, updatedDataOnly);
      }
    }
    
    // 3. 컬러 시스템 추가
    const colorEntry = `${QUIZ_INFO.title}: from-${getRandomColor()}-50 to-${getRandomColor()}-50`;
    const colorRegex = /(편의점 장바구니: from-yellow-50 via-orange-50 to-red-50)/;
    const colorMatch = content.match(colorRegex);
    
    if (colorMatch) {
      const updatedColor = `${colorMatch[1]}\n${colorEntry}`;
      content = content.replace(colorRegex, updatedColor);
    }
    
    // 4. 로드맵 업데이트
    if (QUIZ_INFO.status === 'completed') {
      const roadmapRegex = /(### 11\.1 Phase 1: 기반 구축 \(완료\)[\s\S]*?편의점 장바구니 테스트 데이터 구조 구현)/;
      const roadmapMatch = content.match(roadmapRegex);
      
      if (roadmapMatch) {
        const newRoadmapEntry = `- [x] ${QUIZ_INFO.title} 테스트 구현`;
        const updatedRoadmap = roadmapMatch[0] + `\n- [x] ${QUIZ_INFO.title} 테스트 구현`;
        content = content.replace(roadmapRegex, updatedRoadmap);
      }
    }
    
    // 파일 저장
    fs.writeFileSync(PRD_PATH, content, 'utf8');
    
    console.log('✅ PRD 문서 업데이트 완료!');
    console.log(`📝 추가된 퀴즈: ${QUIZ_INFO.emoji} ${QUIZ_INFO.title}`);
    console.log(`📊 상태: ${QUIZ_INFO.status}`);
    
  } catch (error) {
    console.error('❌ PRD 업데이트 실패:', error.message);
    process.exit(1);
  }
}

function getRandomColor() {
  const colors = ['blue', 'green', 'purple', 'pink', 'indigo', 'cyan', 'teal', 'lime'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 실행
if (require.main === module) {
  updatePRD();
}

module.exports = { updatePRD };
