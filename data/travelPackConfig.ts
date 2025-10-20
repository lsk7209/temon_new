export interface TravelPackQuestion {
  id: number
  question: string
  choiceA: {
    text: string
    tags: string[]
  }
  choiceB: {
    text: string
    tags: string[]
  }
}

export interface TravelPackResult {
  type: string
  title: string
  emoji: string
  summary: string
  description: string
  traits: string[]
  tips: string[]
  partners: string[]
  color: string
}

export const travelPackQuestions: TravelPackQuestion[] = [
  {
    id: 1,
    question: "여행 전날 밤, 당신은?",
    choiceA: { text: "이미 다 챙겨놨다", tags: ["J"] },
    choiceB: { text: "아침에 급히 챙긴다", tags: ["P"] }
  },
  {
    id: 2,
    question: "캐리어를 열면?",
    choiceA: { text: "카테고리별 정리 완료", tags: ["S"] },
    choiceB: { text: "이게 왜 여기 있지?", tags: ["N"] }
  },
  {
    id: 3,
    question: "여행지 도착 직후",
    choiceA: { text: "일정표 확인", tags: ["J"] },
    choiceB: { text: "풍경부터 구경", tags: ["P"] }
  },
  {
    id: 4,
    question: "짐 챙길 때 우선순위",
    choiceA: { text: "실용성 중심", tags: ["T"] },
    choiceB: { text: "감성템 꼭 챙김", tags: ["F"] }
  },
  {
    id: 5,
    question: "친구가 대신 싸준다면",
    choiceA: { text: "감사하지만 다시 확인", tags: ["J"] },
    choiceB: { text: "맡기고 신뢰", tags: ["P"] }
  },
  {
    id: 6,
    question: "옷 고를 때",
    choiceA: { text: "날씨·계획 기준", tags: ["S"] },
    choiceB: { text: "느낌과 감정대로", tags: ["N"] }
  },
  {
    id: 7,
    question: "여권·지갑 등 중요물건",
    choiceA: { text: "수납공간 정해둠", tags: ["J"] },
    choiceB: { text: "필요할 때 찾음", tags: ["P"] }
  },
  {
    id: 8,
    question: "캐리어 무게 초과!",
    choiceA: { text: "침착하게 재정리", tags: ["T"] },
    choiceB: { text: "일단 들고 출발", tags: ["F"] }
  },
  {
    id: 9,
    question: "여행 중 사진은",
    choiceA: { text: "기록용으로 남김", tags: ["S"] },
    choiceB: { text: "분위기/감정 중심", tags: ["N"] }
  },
  {
    id: 10,
    question: "여행 중 변수 발생 시",
    choiceA: { text: "즉시 대처(현실)", tags: ["T"] },
    choiceB: { text: "흘러가는 대로", tags: ["F"] }
  },
  {
    id: 11,
    question: "친구와의 준비",
    choiceA: { text: "주도적 계획 세움", tags: ["E"] },
    choiceB: { text: "제안에 맞춰 참여", tags: ["I"] }
  },
  {
    id: 12,
    question: "공항 대기시간",
    choiceA: { text: "사람들과 대화", tags: ["E"] },
    choiceB: { text: "조용히 책/폰", tags: ["I"] }
  }
]

export const travelPackResults: Record<string, TravelPackResult> = {
  ENFP: {
    type: "ENFP",
    title: "🌈 즉흥 여행가",
    emoji: "🌈",
    summary: "준비보다 경험을 중시하는 자유로운 여행자",
    description: "계획에 얽매이지 않고 순간의 영감으로 여행을 즐기는 타입입니다. 짐도 필요할 때마다 챙기고, 여행 중에도 즉흥적인 결정을 내리는 것을 선호합니다.",
    traits: [
      "여행 전날 밤에 급하게 짐을 챙긴다",
      "감성적인 아이템을 꼭 챙긴다",
      "일정보다는 분위기를 중시한다",
      "친구들과 함께 계획을 세운다",
      "여행 중 변수가 생겨도 흘러가는 대로 받아들인다"
    ],
    tips: [
      "중요한 물건은 미리 체크리스트로 정리",
      "여행지 날씨를 미리 확인해두기",
      "비상금은 따로 준비해두기",
      "충전기와 어댑터는 필수"
    ],
    partners: ["ISFJ", "ESFJ", "ISTJ"],
    color: "from-pink-400 to-purple-500"
  },
  INFP: {
    type: "INFP",
    title: "🌙 감성 탐험가",
    emoji: "🌙",
    summary: "혼자만의 시간을 소중히 여기는 감성적인 여행자",
    description: "조용한 곳에서 혼자만의 감정을 느끼며 여행하는 것을 좋아합니다. 짐도 개인적인 의미가 있는 것들을 중심으로 챙기고, 여행 중에도 깊이 있는 경험을 추구합니다.",
    traits: [
      "개인적인 의미가 있는 물건들을 챙긴다",
      "조용한 곳에서 혼자만의 시간을 즐긴다",
      "감성적인 사진을 많이 찍는다",
      "여행지의 분위기를 깊이 느낀다",
      "계획보다는 감정에 따라 움직인다"
    ],
    tips: [
      "일기장이나 책을 챙겨가기",
      "조용한 카페나 공원 정보 미리 확인",
      "개인적인 소지품은 따로 정리",
      "충분한 휴식 시간 확보"
    ],
    partners: ["ENFJ", "ESFJ", "ISFJ"],
    color: "from-indigo-400 to-purple-500"
  },
  ESTJ: {
    type: "ESTJ",
    title: "🗂️ 체계 여행가",
    emoji: "🗂️",
    summary: "완벽한 계획과 체계적인 준비로 여행하는 리더형",
    description: "여행의 모든 것을 미리 계획하고 체계적으로 준비하는 타입입니다. 짐도 카테고리별로 정리하고, 일정도 세밀하게 계획하여 효율적인 여행을 추구합니다.",
    traits: [
      "여행 전날 밤에 모든 것을 미리 챙긴다",
      "캐리어를 카테고리별로 정리한다",
      "일정표를 꼼꼼히 확인한다",
      "친구들과 함께 계획을 주도한다",
      "변수가 생기면 즉시 대처한다"
    ],
    tips: [
      "체크리스트를 만들어 놓기",
      "여행지 정보를 미리 충분히 조사",
      "비상 연락처와 약국 위치 확인",
      "여행 보험 가입 고려"
    ],
    partners: ["ISFP", "ESFP", "ISTP"],
    color: "from-blue-400 to-indigo-500"
  },
  ISTJ: {
    type: "ISTJ",
    title: "📏 철저한 준비형",
    emoji: "📏",
    summary: "신중하고 꼼꼼한 준비로 안전한 여행을 추구하는 타입",
    description: "모든 것을 신중하게 계획하고 꼼꼼하게 준비하는 타입입니다. 짐도 실용성을 중심으로 챙기고, 여행 중에도 안전과 효율을 최우선으로 생각합니다.",
    traits: [
      "여행 전날 밤에 모든 것을 미리 챙긴다",
      "실용적인 물건들을 중심으로 챙긴다",
      "중요한 물건은 수납공간을 정해둔다",
      "조용히 혼자서 계획을 세운다",
      "변수가 생기면 침착하게 대처한다"
    ],
    tips: [
      "여행지 날씨와 교통편 미리 확인",
      "여권과 항공권은 따로 보관",
      "비상약과 응급처치용품 준비",
      "여행지 현지 정보 충분히 조사"
    ],
    partners: ["ESFP", "ESTP", "ENFP"],
    color: "from-gray-400 to-blue-500"
  },
  ENFJ: {
    type: "ENFJ",
    title: "🤝 케어 리더형",
    emoji: "🤝",
    summary: "동행자들을 챙기며 함께하는 여행을 즐기는 타입",
    description: "동행자들의 만족을 최우선으로 생각하며 여행을 계획하는 타입입니다. 짐도 다른 사람들을 위한 것들을 챙기고, 여행 중에도 모두가 즐거울 수 있도록 배려합니다.",
    traits: [
      "동행자들을 위한 물건들을 챙긴다",
      "모든 사람이 즐거울 수 있도록 계획한다",
      "감성적인 아이템을 꼭 챙긴다",
      "친구들과 함께 계획을 주도한다",
      "변수가 생겨도 모두를 배려한다"
    ],
    tips: [
      "동행자들의 취향과 필요사항 미리 파악",
      "그룹 여행용 공용 물품 준비",
      "모든 사람이 참여할 수 있는 활동 계획",
      "비상시 연락처와 만남 장소 정하기"
    ],
    partners: ["ISFP", "INFP", "ISTP"],
    color: "from-green-400 to-teal-500"
  },
  INFJ: {
    type: "INFJ",
    title: "🔮 사색 여행자",
    emoji: "🔮",
    summary: "깊이 있는 경험과 의미를 추구하는 철학적인 여행자",
    description: "여행의 의미와 깊이를 중시하며, 혼자만의 시간을 통해 내적 성장을 추구하는 타입입니다. 짐도 개인적인 의미가 있는 것들을 중심으로 챙기고, 여행 중에도 사색과 성찰을 즐깁니다.",
    traits: [
      "개인적인 의미가 있는 물건들을 챙긴다",
      "조용한 곳에서 혼자만의 시간을 즐긴다",
      "여행의 의미와 깊이를 중시한다",
      "계획보다는 감정에 따라 움직인다",
      "변수가 생겨도 흘러가는 대로 받아들인다"
    ],
    tips: [
      "일기장이나 책을 챙겨가기",
      "조용한 명소나 문화재 정보 미리 확인",
      "개인적인 소지품은 따로 정리",
      "충분한 사색과 성찰 시간 확보"
    ],
    partners: ["ENFP", "ESFP", "ESTP"],
    color: "from-purple-400 to-pink-500"
  },
  ENTJ: {
    type: "ENTJ",
    title: "🚀 전략 탐험가",
    emoji: "🚀",
    summary: "효율성과 성과를 중시하는 전략적인 여행자",
    description: "여행을 하나의 프로젝트로 여기며, 최대한의 효율과 성과를 추구하는 타입입니다. 짐도 실용성을 중심으로 챙기고, 여행 중에도 목표 달성을 위한 전략을 세웁니다.",
    traits: [
      "여행 전날 밤에 모든 것을 미리 챙긴다",
      "실용적인 물건들을 중심으로 챙긴다",
      "일정표를 꼼꼼히 확인한다",
      "친구들과 함께 계획을 주도한다",
      "변수가 생기면 즉시 대처한다"
    ],
    tips: [
      "여행 목표와 우선순위 명확히 설정",
      "효율적인 이동 경로와 교통편 조사",
      "시간 단위로 세밀한 일정 계획",
      "비상시 대안 계획 미리 준비"
    ],
    partners: ["ISFP", "INFP", "ISTP"],
    color: "from-red-400 to-orange-500"
  },
  INTJ: {
    type: "INTJ",
    title: "🧠 계산적 플래너",
    emoji: "🧠",
    summary: "논리적 분석과 장기적 계획으로 여행하는 전략가",
    description: "여행을 체계적으로 분석하고 장기적인 관점에서 계획하는 타입입니다. 짐도 논리적인 기준으로 챙기고, 여행 중에도 효율성과 목표 달성을 최우선으로 생각합니다.",
    traits: [
      "여행 전날 밤에 모든 것을 미리 챙긴다",
      "논리적인 기준으로 물건들을 챙긴다",
      "중요한 물건은 수납공간을 정해둔다",
      "조용히 혼자서 계획을 세운다",
      "변수가 생기면 침착하게 대처한다"
    ],
    tips: [
      "여행지 정보를 체계적으로 분석",
      "비용 효율성과 시간 효율성 고려",
      "장기적인 여행 목표 설정",
      "비상시 대안 계획과 리스크 관리"
    ],
    partners: ["ESFP", "ESTP", "ENFP"],
    color: "from-slate-400 to-gray-500"
  },
  ESFP: {
    type: "ESFP",
    title: "🎉 파티 여행러",
    emoji: "🎉",
    summary: "즐거움과 재미를 최우선으로 하는 활발한 여행자",
    description: "여행의 즐거움과 재미를 최우선으로 생각하는 타입입니다. 짐도 분위기와 감정에 따라 챙기고, 여행 중에도 사람들과의 교류와 즐거운 경험을 추구합니다.",
    traits: [
      "아침에 급히 짐을 챙긴다",
      "감성적인 아이템을 꼭 챙긴다",
      "풍경부터 구경한다",
      "친구들과 함께 계획을 세운다",
      "변수가 생겨도 흘러가는 대로 받아들인다"
    ],
    tips: [
      "즐거운 활동과 이벤트 정보 미리 확인",
      "사진 찍기 좋은 장소들 체크",
      "친구들과 함께할 수 있는 활동 계획",
      "비상시 연락처와 만남 장소 정하기"
    ],
    partners: ["ISTJ", "ISFJ", "INTJ"],
    color: "from-yellow-400 to-orange-500"
  },
  ISFP: {
    type: "ISFP",
    title: "🌷 감성 일상러",
    emoji: "🌷",
    summary: "조용하고 감성적인 여행을 즐기는 개성 있는 여행자",
    description: "조용한 곳에서 개인적인 감정을 느끼며 여행하는 것을 좋아합니다. 짐도 개인적인 취향과 감정에 따라 챙기고, 여행 중에도 자신만의 페이스로 여행을 즐깁니다.",
    traits: [
      "개인적인 취향에 따라 물건들을 챙긴다",
      "조용한 곳에서 혼자만의 시간을 즐긴다",
      "감성적인 사진을 많이 찍는다",
      "제안에 맞춰 참여한다",
      "변수가 생겨도 흘러가는 대로 받아들인다"
    ],
    tips: [
      "개인적인 취향에 맞는 장소들 찾기",
      "조용한 카페나 공원 정보 미리 확인",
      "개인적인 소지품은 따로 정리",
      "충분한 휴식과 감상 시간 확보"
    ],
    partners: ["ESTJ", "ESFJ", "ENFJ"],
    color: "from-pink-400 to-rose-500"
  },
  ESTP: {
    type: "ESTP",
    title: "⚡ 액션 여행가",
    emoji: "⚡",
    summary: "즉흥적이고 활발한 모험을 즐기는 에너지 넘치는 여행자",
    description: "즉흥적이고 활발한 모험을 즐기는 타입입니다. 짐도 필요할 때마다 챙기고, 여행 중에도 새로운 경험과 도전을 추구하며 사람들과의 교류를 즐깁니다.",
    traits: [
      "아침에 급히 짐을 챙긴다",
      "이게 왜 여기 있지? 하며 찾는다",
      "풍경부터 구경한다",
      "친구들과 함께 계획을 세운다",
      "변수가 생기면 즉시 대처한다"
    ],
    tips: [
      "즉흥적인 활동과 모험 정보 확인",
      "사진 찍기 좋은 장소들 체크",
      "친구들과 함께할 수 있는 활동 계획",
      "비상시 연락처와 만남 장소 정하기"
    ],
    partners: ["ISFJ", "ISTJ", "INFJ"],
    color: "from-orange-400 to-red-500"
  },
  ISTP: {
    type: "ISTP",
    title: "🥾 솔로 탐험가",
    emoji: "🥾",
    summary: "독립적이고 실용적인 여행을 즐기는 개인주의자",
    description: "독립적이고 실용적인 여행을 선호하는 타입입니다. 짐도 실용성을 중심으로 챙기고, 여행 중에도 혼자만의 시간을 소중히 여기며 효율적인 여행을 추구합니다.",
    traits: [
      "실용적인 물건들을 중심으로 챙긴다",
      "조용한 곳에서 혼자만의 시간을 즐긴다",
      "중요한 물건은 수납공간을 정해둔다",
      "제안에 맞춰 참여한다",
      "변수가 생기면 침착하게 대처한다"
    ],
    tips: [
      "혼자만의 시간을 즐길 수 있는 장소 찾기",
      "실용적인 소지품 중심으로 준비",
      "개인적인 소지품은 따로 정리",
      "충분한 휴식과 감상 시간 확보"
    ],
    partners: ["ESFJ", "ESTJ", "ENFJ"],
    color: "from-teal-400 to-cyan-500"
  },
  ESFJ: {
    type: "ESFJ",
    title: "🍪 따뜻한 챙김러",
    emoji: "🍪",
    summary: "동행자들을 세심하게 챙기며 따뜻한 여행을 만드는 타입",
    description: "동행자들을 세심하게 챙기며 따뜻한 여행을 만드는 타입입니다. 짐도 다른 사람들을 위한 것들을 챙기고, 여행 중에도 모두가 편안하고 즐거울 수 있도록 배려합니다.",
    traits: [
      "동행자들을 위한 물건들을 챙긴다",
      "모든 사람이 편안할 수 있도록 계획한다",
      "감성적인 아이템을 꼭 챙긴다",
      "친구들과 함께 계획을 세운다",
      "변수가 생겨도 모두를 배려한다"
    ],
    tips: [
      "동행자들의 취향과 필요사항 미리 파악",
      "그룹 여행용 공용 물품 준비",
      "모든 사람이 참여할 수 있는 활동 계획",
      "비상시 연락처와 만남 장소 정하기"
    ],
    partners: ["ISTP", "INTP", "ISFP"],
    color: "from-emerald-400 to-green-500"
  },
  ISFJ: {
    type: "ISFJ",
    title: "🧸 안정 추구형",
    emoji: "🧸",
    summary: "안전하고 편안한 여행을 추구하는 신뢰할 수 있는 여행자",
    description: "안전하고 편안한 여행을 추구하는 타입입니다. 짐도 실용성을 중심으로 챙기고, 여행 중에도 동행자들을 배려하며 안정적인 여행을 만듭니다.",
    traits: [
      "여행 전날 밤에 모든 것을 미리 챙긴다",
      "실용적인 물건들을 중심으로 챙긴다",
      "중요한 물건은 수납공간을 정해둔다",
      "제안에 맞춰 참여한다",
      "변수가 생겨도 모두를 배려한다"
    ],
    tips: [
      "안전한 숙소와 교통편 미리 확인",
      "여행지 현지 정보 충분히 조사",
      "비상약과 응급처치용품 준비",
      "동행자들의 안전과 편안함 고려"
    ],
    partners: ["ESTP", "ESFP", "ENTP"],
    color: "from-amber-400 to-yellow-500"
  },
  ENTP: {
    type: "ENTP",
    title: "🧪 모험 발명가",
    emoji: "🧪",
    summary: "새로운 아이디어와 모험을 추구하는 창의적인 여행자",
    description: "새로운 아이디어와 모험을 추구하는 창의적인 타입입니다. 짐도 필요할 때마다 챙기고, 여행 중에도 새로운 경험과 창의적인 활동을 즐기며 사람들과의 교류를 추구합니다.",
    traits: [
      "아침에 급히 짐을 챙긴다",
      "이게 왜 여기 있지? 하며 찾는다",
      "풍경부터 구경한다",
      "친구들과 함께 계획을 주도한다",
      "변수가 생겨도 즉시 대처한다"
    ],
    tips: [
      "새로운 경험과 창의적인 활동 정보 확인",
      "즉흥적인 아이디어와 모험 계획",
      "친구들과 함께할 수 있는 활동 계획",
      "비상시 연락처와 만남 장소 정하기"
    ],
    partners: ["ISFJ", "ISTJ", "INFJ"],
    color: "from-violet-400 to-purple-500"
  },
  INTP: {
    type: "INTP",
    title: "📚 관찰 여행자",
    emoji: "📚",
    summary: "호기심과 분석을 통해 여행을 즐기는 지적 탐험가",
    description: "호기심과 분석을 통해 여행을 즐기는 지적 탐험가입니다. 짐도 논리적인 기준으로 챙기고, 여행 중에도 혼자만의 시간을 소중히 여기며 깊이 있는 관찰과 분석을 즐깁니다.",
    traits: [
      "논리적인 기준으로 물건들을 챙긴다",
      "조용한 곳에서 혼자만의 시간을 즐긴다",
      "여행의 의미와 깊이를 중시한다",
      "제안에 맞춰 참여한다",
      "변수가 생기면 침착하게 대처한다"
    ],
    tips: [
      "여행지 정보를 체계적으로 분석",
      "조용한 명소나 문화재 정보 미리 확인",
      "개인적인 소지품은 따로 정리",
      "충분한 관찰과 분석 시간 확보"
    ],
    partners: ["ESFJ", "ESTJ", "ENFJ"],
    color: "from-blue-400 to-indigo-500"
  }
}

export function getResultByType(type: string): TravelPackResult | null {
  return travelPackResults[type.toUpperCase()] || null
}

export function calculateMBTI(answers: string[]): string {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  
  answers.forEach((answer, index) => {
    const question = travelPackQuestions[index]
    if (!question) return
    
    if (answer === 'A') {
      question.choiceA.tags.forEach(tag => {
        if (tag in scores) scores[tag as keyof typeof scores]++
      })
    } else if (answer === 'B') {
      question.choiceB.tags.forEach(tag => {
        if (tag in scores) scores[tag as keyof typeof scores]++
      })
    }
  })
  
  const result = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')
  
  return result
}
