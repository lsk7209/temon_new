// 디저트 취향 테스트 질문 데이터
// 12문항, 각 축(E/I, S/N, T/F, J/P) 3문항씩 총 12문항

export type MBTITag = "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P";

export type Question = {
  id: number;
  title: string;
  options: { label: string; tags: MBTITag[] }[];
};

export const DESSERT_QUESTIONS: Question[] = [
  // S vs N
  {
    id: 1,
    title: "카페에서 메뉴를 고를 때",
    options: [
      { label: "늘 먹는 메뉴", tags: ["S"] },
      { label: "오늘은 새로운 메뉴!", tags: ["N"] }
    ]
  },
  {
    id: 2,
    title: "사진 찍을 때",
    options: [
      { label: "음식 중심 구도", tags: ["S"] },
      { label: "감성 분위기 중심", tags: ["N"] }
    ]
  },
  {
    id: 3,
    title: "쿠키 2개 중 1개를 고른다면",
    options: [
      { label: "초코칩 쿠키", tags: ["S"] },
      { label: "말차 쿠키", tags: ["N"] }
    ]
  },
  {
    id: 4,
    title: "디저트를 고르는 기준",
    options: [
      { label: "가성비", tags: ["S"] },
      { label: "감성비", tags: ["N"] }
    ]
  },

  // T vs F
  {
    id: 5,
    title: "디저트 취향",
    options: [
      { label: "달콤·진한 맛", tags: ["F"] },
      { label: "담백·깔끔한 맛", tags: ["T"] }
    ]
  },
  {
    id: 6,
    title: "친구가 고른 디저트가 더 맛있을 때",
    options: [
      { label: "나도 그걸 시킬 걸 후회", tags: ["F"] },
      { label: "그냥 참고 내 것 먹음", tags: ["T"] }
    ]
  },
  {
    id: 7,
    title: "빵집에서 고를 때",
    options: [
      { label: "식사빵 위주", tags: ["T"] },
      { label: "달달한 디저트빵 위주", tags: ["F"] }
    ]
  },
  {
    id: 8,
    title: "다이어트 중 디저트 제안받으면",
    options: [
      { label: "미련 없이 거절", tags: ["T"] },
      { label: "\"오늘만 괜찮겠지?\"", tags: ["F"] }
    ]
  },

  // E vs I
  {
    id: 9,
    title: "카페 자리를 고를 때",
    options: [
      { label: "창가 자리 필수", tags: ["I"] },
      { label: "아무 자리나 상관없음", tags: ["E"] }
    ]
  },
  {
    id: 10,
    title: "디저트 먹는 속도",
    options: [
      { label: "천천히 음미", tags: ["I"] },
      { label: "빠르게 흡입", tags: ["E"] }
    ]
  },
  {
    id: 11,
    title: "디저트 카페 고를 때",
    options: [
      { label: "후기를 꼼꼼히 확인", tags: ["I"] },
      { label: "즉흥적으로 들어감", tags: ["E"] }
    ]
  },

  // J vs P
  {
    id: 12,
    title: "케이크 고를 때",
    options: [
      { label: "생크림 고전파", tags: ["J"] },
      { label: "무스·티라미수 등 신메뉴", tags: ["P"] }
    ]
  }
];

export const getDessertQuestion = (id: number): Question | undefined => {
  return DESSERT_QUESTIONS.find(q => q.id === id);
};

export const getDessertQuestionCount = (): number => {
  return DESSERT_QUESTIONS.length;
};
