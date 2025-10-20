// 12문항, 각 축(E/I, S/N, T/F, J/P) 3문항씩 총 12문항
// 보기 선택 시 tags에 해당 축 키 하나를 누적합니다.

export type MBTITag = "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P";

export type Question = {
  id: number;
  title: string;
  options: { label: string; tags: MBTITag[] }[];
};

export const CONBINI_QUESTIONS: Question[] = [
  // S vs N
  {
    id: 1,
    title: "편의점에 들어가면 제일 먼저 하는 행동은?",
    options: [
      { label: "오늘의 행사/전단 확인", tags: ["S"] },
      { label: "신상 코너부터 확인", tags: ["N"] },
    ],
  },
  {
    id: 2,
    title: "야식 타임, 오늘의 주력은?",
    options: [
      { label: "라면·핫바 같은 베이직", tags: ["S"] },
      { label: "이색 콤보/토핑 실험", tags: ["N"] },
    ],
  },
  {
    id: 3,
    title: "제품 정보 탐색 방식은?",
    options: [
      { label: "원재료·영양성분을 꼼꼼히", tags: ["S"] },
      { label: "스토리·콜라보·한정 포인트", tags: ["N"] },
    ],
  },

  // J vs P
  {
    id: 4,
    title: "밥 대용이 필요할 때 고르는 방식은?",
    options: [
      { label: "도시락/삼각김밥 고정 루틴", tags: ["J"] },
      { label: "그때그때 컵라면+토핑 조합", tags: ["P"] },
    ],
  },
  {
    id: 5,
    title: "1+1 행사를 보면?",
    options: [
      { label: "꼭 채운다(재고/유통기한도 본다)", tags: ["J"] },
      { label: "필요 없으면 패스한다", tags: ["P"] },
    ],
  },
  {
    id: 6,
    title: "출근길 간편식 선택은?",
    options: [
      { label: "루틴 메뉴 고정", tags: ["J"] },
      { label: "그날 기분 따라 변경", tags: ["P"] },
    ],
  },

  // E vs I
  {
    id: 7,
    title: "계산대 줄에서의 나는?",
    options: [
      { label: "옆사람과 가볍게 대화 가능", tags: ["E"] },
      { label: "조용히 대기하는 편", tags: ["I"] },
    ],
  },
  {
    id: 8,
    title: "동행이 신상 디저트를 추천했다!",
    options: [
      { label: "바로 시도!", tags: ["E"] },
      { label: "후기/평점 먼저 탐색", tags: ["I"] },
    ],
  },
  {
    id: 9,
    title: "먹을 걸 고르며 떠오르는 생각은?",
    options: [
      { label: "함께 나눌 사람과 상황", tags: ["E"] },
      { label: "내 컨디션과 루틴", tags: ["I"] },
    ],
  },

  // T vs F
  {
    id: 10,
    title: "음료를 고를 때 더 중요한 기준은?",
    options: [
      { label: "성분·칼로리·가격비교", tags: ["T"] },
      { label: "맛·무드·패키지", tags: ["F"] },
    ],
  },
  {
    id: 11,
    title: "신제품이 별로였을 때의 위로 방식은?",
    options: [
      { label: "데이터 쌓였다고 위안(경험값↑)", tags: ["T"] },
      { label: "아쉬움… 다음엔 더 맛있는 걸로", tags: ["F"] },
    ],
  },
  {
    id: 12,
    title: "계산 후 매장을 나설 때 나는?",
    options: [
      { label: "영수증·적립 체크(누락주의)", tags: ["T"] },
      { label: "바로 먹으며 이동(기분이 먼저)", tags: ["F"] },
    ],
  },
];


