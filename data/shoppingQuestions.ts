// 쇼핑 스타일 테스트 질문 데이터
// 12문항, 각 축(E/I, S/N, T/F, J/P) 3문항씩 총 12문항

export type MBTITag = "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P";

export type Question = {
  id: number;
  title: string;
  options: { label: string; tags: MBTITag[] }[];
};

export const SHOPPING_QUESTIONS: Question[] = [
  // J vs P
  {
    id: 1,
    title: "세일 문구를 보면?",
    options: [
      { label: "일단 클릭!", tags: ["P"] },
      { label: "계획에 없으면 패스", tags: ["J"] }
    ]
  },
  {
    id: 2,
    title: "구매 전 고민 시간은?",
    options: [
      { label: "충분히 비교 후 결정", tags: ["J"] },
      { label: "느낌 오면 바로 구매", tags: ["P"] }
    ]
  },
  {
    id: 3,
    title: "온라인 쇼핑 후 만족도는?",
    options: [
      { label: "예측한 그대로", tags: ["J"] },
      { label: "예상 밖 발견이 즐거움", tags: ["P"] }
    ]
  },
  {
    id: 4,
    title: "결제 직전의 나",
    options: [
      { label: "할인·적립 계산 중", tags: ["J"] },
      { label: "'몰라 그냥 사자!'", tags: ["P"] }
    ]
  },

  // S vs N
  {
    id: 5,
    title: "쇼핑할 때 우선순위는?",
    options: [
      { label: "품질, 후기", tags: ["S"] },
      { label: "디자인, 감성", tags: ["N"] }
    ]
  },
  {
    id: 6,
    title: "브랜드 고를 때",
    options: [
      { label: "신뢰도 중요", tags: ["S"] },
      { label: "새로운 브랜드 도전", tags: ["N"] }
    ]
  },
  {
    id: 7,
    title: "옷장 정리할 때",
    options: [
      { label: "주기적으로 정리", tags: ["S"] },
      { label: "입고 싶은 것만 남김", tags: ["N"] }
    ]
  },

  // T vs F
  {
    id: 8,
    title: "장바구니에 물건을 담을 때",
    options: [
      { label: "전부 계산해본다", tags: ["T"] },
      { label: "그냥 담고 기분 봐서 결정", tags: ["F"] }
    ]
  },
  {
    id: 9,
    title: "친구가 \"이거 어때?\" 물을 때",
    options: [
      { label: "냉정하게 판단", tags: ["T"] },
      { label: "\"너랑 잘 어울려!\"", tags: ["F"] }
    ]
  },
  {
    id: 10,
    title: "반품 사유가 생기면",
    options: [
      { label: "절차대로 바로 진행", tags: ["T"] },
      { label: "귀찮아서 그냥 둠", tags: ["F"] }
    ]
  },

  // E vs I
  {
    id: 11,
    title: "쇼핑몰 추천 상품을 보면",
    options: [
      { label: "참고만 함", tags: ["I"] },
      { label: "설레서 클릭", tags: ["E"] }
    ]
  },
  {
    id: 12,
    title: "할인 알림이 올 때",
    options: [
      { label: "무시하거나 저장", tags: ["I"] },
      { label: "바로 들어가봄", tags: ["E"] }
    ]
  }
];

export const getShoppingQuestion = (id: number): Question | undefined => {
  return SHOPPING_QUESTIONS.find(q => q.id === id);
};

export const getShoppingQuestionCount = (): number => {
  return SHOPPING_QUESTIONS.length;
};
