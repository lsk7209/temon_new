// 퀴즈 템플릿 시스템 헬퍼 함수들

export interface QuizConfig {
  // 기본 정보
  id: string
  name: string
  description: string
  emoji: string
  category: string
  estimatedTime: string
  questionCount: number
  
  // 스타일링
  gradientFrom: string
  gradientTo: string
  accentColor: string
  
  // 경로
  introPath: string
  testPath: string
  resultPath: string
  
  // 기능
  isNew?: boolean
  isPopular?: boolean
  
  // 추가 정보
  features?: string[]
  tags?: string[]
}

export interface QuizQuestion {
  id: number
  title: string
  options: {
    label: string
    tags: string[]
  }[]
}

export interface QuizResult {
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

// 퀴즈 설정 생성 헬퍼
export function createQuizConfig(config: Partial<QuizConfig>): QuizConfig {
  return {
    id: config.id || 'quiz',
    name: config.name || '퀴즈',
    description: config.description || '재미있는 성격 테스트',
    emoji: config.emoji || '🎯',
    category: config.category || '성격',
    estimatedTime: config.estimatedTime || '5분',
    questionCount: config.questionCount || 12,
    gradientFrom: config.gradientFrom || 'from-blue-500',
    gradientTo: config.gradientTo || 'to-indigo-600',
    accentColor: config.accentColor || 'blue',
    introPath: config.introPath || `/${config.id}`,
    testPath: config.testPath || `/${config.id}/test`,
    resultPath: config.resultPath || `/${config.id}/result`,
    isNew: config.isNew || false,
    isPopular: config.isPopular || false,
    features: config.features || [],
    tags: config.tags || []
  }
}

// 퀴즈 페이지 생성 헬퍼
export function generateQuizPages(config: QuizConfig) {
  return {
    intro: {
      path: config.introPath,
      component: 'QuizIntroTemplate',
      props: {
        title: config.name,
        description: config.description,
        emoji: config.emoji,
        category: config.category,
        estimatedTime: config.estimatedTime,
        questionCount: config.questionCount,
        gradientFrom: config.gradientFrom,
        gradientTo: config.gradientTo,
        accentColor: config.accentColor,
        testPath: config.testPath,
        isNew: config.isNew,
        isPopular: config.isPopular,
        features: config.features,
        tags: config.tags
      }
    },
    test: {
      path: config.testPath,
      component: 'QuizTestTemplate',
      props: {
        testId: config.id,
        testName: config.name,
        gradientFrom: config.gradientFrom,
        gradientTo: config.gradientTo,
        emoji: config.emoji,
        resultPath: config.resultPath
      }
    },
    result: {
      path: config.resultPath,
      component: 'QuizResultTemplate',
      props: {
        testId: config.id,
        testName: config.name,
        gradientFrom: config.gradientFrom,
        gradientTo: config.gradientTo
      }
    }
  }
}

// 퀴즈 데이터 검증 헬퍼
export function validateQuizData(questions: QuizQuestion[], results: Record<string, QuizResult>): boolean {
  // 질문 데이터 검증
  if (!questions || questions.length === 0) {
    console.error('질문 데이터가 없습니다.')
    return false
  }

  // 각 질문의 옵션 검증
  for (const question of questions) {
    if (!question.options || question.options.length < 2) {
      console.error(`질문 ${question.id}의 옵션이 부족합니다.`)
      return false
    }

    for (const option of question.options) {
      if (!option.tags || option.tags.length === 0) {
        console.error(`질문 ${question.id}의 옵션 "${option.label}"에 태그가 없습니다.`)
        return false
      }
    }
  }

  // 결과 데이터 검증
  if (!results || Object.keys(results).length === 0) {
    console.error('결과 데이터가 없습니다.')
    return false
  }

  // 각 결과의 필수 필드 검증
  for (const [type, result] of Object.entries(results)) {
    const requiredFields = ['emoji', 'title', 'tagline', 'summary', 'traits', 'shareText', 'hashtags']
    for (const field of requiredFields) {
      if (!result[field as keyof QuizResult]) {
        console.error(`결과 ${type}에 필수 필드 "${field}"가 없습니다.`)
        return false
      }
    }
  }

  return true
}

// 퀴즈 통계 생성 헬퍼
export function generateQuizStats(questions: QuizQuestion[]): {
  totalQuestions: number
  totalOptions: number
  averageOptionsPerQuestion: number
  allTags: string[]
  uniqueTags: string[]
} {
  const totalQuestions = questions.length
  const totalOptions = questions.reduce((sum, q) => sum + q.options.length, 0)
  const averageOptionsPerQuestion = totalOptions / totalQuestions
  const allTags = questions.flatMap(q => q.options.flatMap(o => o.tags))
  const uniqueTags = [...new Set(allTags)]

  return {
    totalQuestions,
    totalOptions,
    averageOptionsPerQuestion,
    allTags,
    uniqueTags
  }
}

// 퀴즈 생성 가이드
export const QUIZ_CREATION_GUIDE = {
  steps: [
    {
      step: 1,
      title: '퀴즈 설정 정의',
      description: 'createQuizConfig()를 사용하여 퀴즈의 기본 정보를 정의합니다.',
      example: `
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
      `
    },
    {
      step: 2,
      title: '질문 데이터 생성',
      description: 'QuizQuestion[] 형태로 질문과 옵션을 정의합니다.',
      example: `
const questions: QuizQuestion[] = [
  {
    id: 1,
    title: '질문 내용',
    options: [
      { label: '옵션 1', tags: ['E', 'S'] },
      { label: '옵션 2', tags: ['I', 'N'] }
    ]
  }
]
      `
    },
    {
      step: 3,
      title: '결과 데이터 생성',
      description: 'Record<string, QuizResult> 형태로 결과를 정의합니다.',
      example: `
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
      `
    },
    {
      step: 4,
      title: '페이지 생성',
      description: '템플릿 컴포넌트를 사용하여 페이지를 생성합니다.',
      example: `
// 인트로 페이지
<QuizIntroTemplate {...config} />

// 테스트 페이지
<QuizTestTemplate
  questions={questions}
  testId={config.id}
  testName={config.name}
  gradientFrom={config.gradientFrom}
  gradientTo={config.gradientTo}
  emoji={config.emoji}
  calculateResult={calculateMBTI}
  resultPath={config.resultPath}
/>

// 결과 페이지
<QuizResultTemplate
  testId={config.id}
  testName={config.name}
  getResult={getResult}
  gradientFrom={config.gradientFrom}
  gradientTo={config.gradientTo}
/>
      `
    }
  ],
  bestPractices: [
    '질문은 8-16개 정도가 적당합니다.',
    '각 질문마다 2-4개의 옵션을 제공하세요.',
    'MBTI 태그는 E/I, S/N, T/F, J/P를 사용하세요.',
    '결과 설명은 3-5줄로 구성하세요.',
    '이모지는 각 퀴즈의 특성을 잘 나타내는 것을 선택하세요.',
    '그라디언트 색상은 퀴즈의 분위기와 맞춰 선택하세요.'
  ],
  commonIssues: [
    '질문 ID가 중복되지 않도록 주의하세요.',
    '모든 옵션에 태그가 있는지 확인하세요.',
    '결과 데이터의 필수 필드가 모두 있는지 확인하세요.',
    'OG 이미지 배경 색상이 올바른지 확인하세요.'
  ]
}
