// 자동 퀴즈 등록 스크립트
// 새로운 퀴즈가 개발되면 자동으로 테스트 목록에 추가하는 스크립트

const fs = require('fs');
const path = require('path');

// 퀴즈 등록 규칙 파일 경로
const REGISTRY_FILE = path.join(__dirname, '../lib/auto-test-registry.ts');
const TESTS_CONFIG_FILE = path.join(__dirname, '../lib/tests-config.ts');

// 새로운 퀴즈 등록 함수
function registerNewQuiz(quizData) {
  console.log('🔄 새로운 퀴즈 등록 중...');
  
  try {
    // auto-test-registry.ts 파일 읽기
    let registryContent = fs.readFileSync(REGISTRY_FILE, 'utf8');
    
    // 새로운 퀴즈 규칙 추가
    const newRule = `
  {
    idPattern: "${quizData.id}",
    autoGenerate: {
      title: "${quizData.title}",
      description: "${quizData.description}",
      icon: ${quizData.icon},
      color: "${quizData.color}",
      category: "${quizData.category}",
      tags: [${quizData.tags.map(tag => `"${tag}"`).join(', ')}]
    },
    optional: {
      ${quizData.badge ? `badge: "${quizData.badge}",` : ''}
      ${quizData.popular ? 'popular: true,' : ''}
      ${quizData.new ? 'new: true' : ''}
    }
  }`;

    // QUIZ_REGISTRATION_RULES 배열에 새 규칙 추가
    const insertPoint = registryContent.indexOf(']');
    const beforeInsert = registryContent.substring(0, insertPoint);
    const afterInsert = registryContent.substring(insertPoint);
    
    const updatedRegistry = beforeInsert + (beforeInsert.includes('{') ? ',' : '') + newRule + afterInsert;
    
    // 파일 업데이트
    fs.writeFileSync(REGISTRY_FILE, updatedRegistry);
    
    console.log('✅ 퀴즈 등록 완료:', quizData.id);
    console.log('📝 등록된 정보:', {
      title: quizData.title,
      category: quizData.category,
      tags: quizData.tags
    });
    
    return true;
  } catch (error) {
    console.error('❌ 퀴즈 등록 실패:', error.message);
    return false;
  }
}

// 퀴즈 등록 상태 확인
function checkQuizRegistration(quizId) {
  try {
    const registryContent = fs.readFileSync(REGISTRY_FILE, 'utf8');
    return registryContent.includes(`idPattern: "${quizId}"`);
  } catch (error) {
    console.error('❌ 퀴즈 등록 상태 확인 실패:', error.message);
    return false;
  }
}

// 모든 등록된 퀴즈 목록 출력
function listRegisteredQuizzes() {
  try {
    const registryContent = fs.readFileSync(REGISTRY_FILE, 'utf8');
    const rules = registryContent.match(/idPattern: "([^"]+)"/g);
    
    if (rules) {
      console.log('📋 등록된 퀴즈 목록:');
      rules.forEach((rule, index) => {
        const quizId = rule.match(/"([^"]+)"/)[1];
        console.log(`  ${index + 1}. ${quizId}`);
      });
    } else {
      console.log('📋 등록된 퀴즈가 없습니다.');
    }
  } catch (error) {
    console.error('❌ 퀴즈 목록 조회 실패:', error.message);
  }
}

// CLI 명령어 처리
const command = process.argv[2];
const quizId = process.argv[3];

switch (command) {
  case 'register':
    if (!quizId) {
      console.log('❌ 퀴즈 ID가 필요합니다.');
      console.log('사용법: node scripts/auto-quiz-registry.js register <quiz-id>');
      process.exit(1);
    }
    
    // 퀴즈 데이터 (실제로는 quizId에 따라 동적으로 생성되어야 함)
    const quizData = {
      id: quizId,
      title: `🎯 ${quizId} 테스트`,
      description: `${quizId}로 알아보는 성격 테스트`,
      icon: 'Coffee', // 기본 아이콘
      color: 'from-blue-500 to-purple-600',
      category: '기타',
      tags: ['성격', '테스트', 'MBTI'],
      badge: 'NEW',
      new: true
    };
    
    if (checkQuizRegistration(quizId)) {
      console.log('⚠️ 이미 등록된 퀴즈입니다:', quizId);
    } else {
      registerNewQuiz(quizData);
    }
    break;
    
  case 'list':
    listRegisteredQuizzes();
    break;
    
  case 'check':
    if (!quizId) {
      console.log('❌ 퀴즈 ID가 필요합니다.');
      console.log('사용법: node scripts/auto-quiz-registry.js check <quiz-id>');
      process.exit(1);
    }
    
    const isRegistered = checkQuizRegistration(quizId);
    console.log(`📊 퀴즈 등록 상태: ${quizId} - ${isRegistered ? '등록됨' : '미등록'}`);
    break;
    
  default:
    console.log('🔧 자동 퀴즈 등록 시스템');
    console.log('');
    console.log('사용법:');
    console.log('  node scripts/auto-quiz-registry.js register <quiz-id>  # 퀴즈 등록');
    console.log('  node scripts/auto-quiz-registry.js list                # 등록된 퀴즈 목록');
    console.log('  node scripts/auto-quiz-registry.js check <quiz-id>     # 퀴즈 등록 상태 확인');
    break;
}

module.exports = {
  registerNewQuiz,
  checkQuizRegistration,
  listRegisteredQuizzes
};
