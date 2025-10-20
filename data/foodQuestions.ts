// 배달 음식 선택 스타일 테스트 질문 데이터
// 12문항, 각 축(E/I, S/N, T/F, J/P) 3문항씩 총 12문항

export type MBTITag = "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P";

export type Question = {
  id: number;
  title: string;
  options: { label: string; tags: MBTITag[] }[];
};

export const FOOD_QUESTIONS: Question[] = [
  // J vs P
  {
    id: 1,
    title: "배달 앱을 켤 때",
    options: [
      { label: "먼저 카테고리부터 정함", tags: ["J"] },
      { label: "추천 메뉴부터 봄", tags: ["P"] }
    ]
  },
  {
    id: 2,
    title: "메뉴 선택 속도",
    options: [
      { label: "빠르게 결정", tags: ["J"] },
      { label: "한참 고민함", tags: ["P"] }
    ]
  },
  {
    id: 3,
    title: "음식 도착 후",
    options: [
      { label: "포장 먼저 정리", tags: ["J"] },
      { label: "바로 먹는다", tags: ["P"] }
    ]
  },
  {
    id: 4,
    title: "할인 쿠폰이 있을 때",
    options: [
      { label: "전략적으로 조합", tags: ["J"] },
      { label: "그냥 눌러서 적용", tags: ["P"] }
    ]
  },

  // S vs N
  {
    id: 5,
    title: "음식 고를 때",
    options: [
      { label: "익숙한 메뉴 위주", tags: ["S"] },
      { label: "새롭고 특이한 메뉴 도전", tags: ["N"] }
    ]
  },
  {
    id: 6,
    title: "같은 가게 주문 빈도",
    options: [
      { label: "단골 위주", tags: ["S"] },
      { label: "매번 다른 곳 탐험", tags: ["N"] }
    ]
  },

  // T vs F
  {
    id: 7,
    title: "리뷰를 볼 때",
    options: [
      { label: "별점·사진 꼼꼼히 확인", tags: ["T"] },
      { label: "평점보다 감정 리뷰 중심", tags: ["F"] }
    ]
  },
  {
    id: 8,
    title: "배달비가 비쌀 때",
    options: [
      { label: "묶음 주문으로 조정", tags: ["T"] },
      { label: "그냥 시켜! 맛이 중요", tags: ["F"] }
    ]
  },
  {
    id: 9,
    title: "맛이 별로일 때",
    options: [
      { label: "리뷰에 피드백 남김", tags: ["T"] },
      { label: "'다음엔 안 시키지 뭐'로 끝", tags: ["F"] }
    ]
  },
  {
    id: 10,
    title: "마지막 한 입 남았을 때",
    options: [
      { label: "누가 먹을지 합리적으로 정함", tags: ["T"] },
      { label: "그냥 분위기 따라 감", tags: ["F"] }
    ]
  },

  // E vs I
  {
    id: 11,
    title: "친구와 함께 주문 시",
    options: [
      { label: "다수 의견에 맞춤", tags: ["E"] },
      { label: "내가 먹고 싶은 거 주장", tags: ["I"] }
    ]
  },
  {
    id: 12,
    title: "배달 기다리는 시간",
    options: [
      { label: "방송·영상으로 시간 채움", tags: ["E"] },
      { label: "조용히 기다림", tags: ["I"] }
    ]
  }
];

export const getFoodQuestion = (id: number): Question | undefined => {
  return FOOD_QUESTIONS.find(q => q.id === id);
};

export const getFoodQuestionCount = (): number => {
  return FOOD_QUESTIONS.length;
};
