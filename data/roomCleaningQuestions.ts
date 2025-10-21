export interface RoomCleaningQuestion {
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

export const roomCleaningQuestions: RoomCleaningQuestion[] = [
  {
    id: 1,
    question: "청소 시작 전 마음가짐은?",
    choiceA: { text: "계획부터 세운다", tags: ["J"] },
    choiceB: { text: "일단 손부터 움직인다", tags: ["P"] }
  },
  {
    id: 2,
    question: "책상 위 먼지를 보면?",
    choiceA: { text: "당장 닦는다", tags: ["S"] },
    choiceB: { text: "'나중에 해야지' 하고 넘긴다", tags: ["N"] }
  },
  {
    id: 3,
    question: "청소할 때 음악은?",
    choiceA: { text: "없으면 안 된다", tags: ["E"] },
    choiceB: { text: "조용히 집중한다", tags: ["I"] }
  },
  {
    id: 4,
    question: "버릴까 말까 고민될 때",
    choiceA: { text: "과감히 버림", tags: ["T"] },
    choiceB: { text: "추억 생각나서 보관", tags: ["F"] }
  },
  {
    id: 5,
    question: "방 구조가 바뀌면?",
    choiceA: { text: "새로 배치 시도!", tags: ["N"] },
    choiceB: { text: "원래대로가 편함", tags: ["S"] }
  },
  {
    id: 6,
    question: "먼지 청소 중 예상보다 많을 때",
    choiceA: { text: "현실 직시 후 다시 계획", tags: ["J"] },
    choiceB: { text: "그냥 대충 끝냄", tags: ["P"] }
  },
  {
    id: 7,
    question: "정리할 때 기준은?",
    choiceA: { text: "필요/불필요", tags: ["T"] },
    choiceB: { text: "예쁨/감성", tags: ["F"] }
  },
  {
    id: 8,
    question: "청소 중 연락 오면?",
    choiceA: { text: "\"청소 끝나고 보자!\"", tags: ["I"] },
    choiceB: { text: "통화하며 청소", tags: ["E"] }
  },
  {
    id: 9,
    question: "대청소 빈도는?",
    choiceA: { text: "주기적으로 함", tags: ["J"] },
    choiceB: { text: "스트레스 쌓일 때만 함", tags: ["P"] }
  },
  {
    id: 10,
    question: "청소 도구 구매 시",
    choiceA: { text: "기능/가격 비교", tags: ["T"] },
    choiceB: { text: "색감·디자인 중심", tags: ["F"] }
  },
  {
    id: 11,
    question: "갑자기 친구가 놀러 온다 하면?",
    choiceA: { text: "바로 청소 모드 ON", tags: ["J"] },
    choiceB: { text: "일단 문 닫고 수습", tags: ["P"] }
  },
  {
    id: 12,
    question: "청소 끝난 후 기분은?",
    choiceA: { text: "성취감 최고!", tags: ["S"] },
    choiceB: { text: "나름 감성 충전됨", tags: ["N"] }
  }
]
