// 사진 찍는 스타일 테스트 질문 데이터
// 12문항, 각 축(E/I, S/N, T/F, J/P) 3문항씩 총 12문항

export type MBTITag = "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P";

export type Question = {
  id: number;
  title: string;
  options: { label: string; tags: MBTITag[] }[];
};

export const PHOTO_QUESTIONS: Question[] = [
  // S vs N
  {
    id: 1,
    title: "사진 찍을 때 가장 먼저 떠오르는 건?",
    options: [
      { label: "구도와 빛", tags: ["S"] },
      { label: "감정과 분위기", tags: ["N"] }
    ]
  },
  {
    id: 2,
    title: "사진 후보정 시",
    options: [
      { label: "색감·구도 완벽 보정", tags: ["S"] },
      { label: "감성 필터로 감각 조정", tags: ["N"] }
    ]
  },
  {
    id: 3,
    title: "사진 찍는 장소 선택",
    options: [
      { label: "배경 깔끔한 곳", tags: ["S"] },
      { label: "스토리 있는 공간", tags: ["N"] }
    ]
  },
  {
    id: 4,
    title: "사진 찍는 이유",
    options: [
      { label: "기억 보관용", tags: ["S"] },
      { label: "감정 표현용", tags: ["N"] }
    ]
  },

  // J vs P
  {
    id: 5,
    title: "여행 중 사진 스타일은?",
    options: [
      { label: "관광명소 전부 기록", tags: ["J"] },
      { label: "순간의 느낌 위주", tags: ["P"] }
    ]
  },
  {
    id: 6,
    title: "찍은 사진은?",
    options: [
      { label: "바로 정리, 삭제", tags: ["J"] },
      { label: "일단 다 저장", tags: ["P"] }
    ]
  },
  {
    id: 7,
    title: "SNS 업로드는?",
    options: [
      { label: "일정 간격으로 관리", tags: ["J"] },
      { label: "즉흥적으로 감정 따라", tags: ["P"] }
    ]
  },
  {
    id: 8,
    title: "카메라 셔터 타이밍",
    options: [
      { label: "여러 번 찍어 선택", tags: ["J"] },
      { label: "한 컷에 집중", tags: ["P"] }
    ]
  },

  // T vs F
  {
    id: 9,
    title: "음식 사진 찍을 때",
    options: [
      { label: "정면에서 깔끔하게", tags: ["T"] },
      { label: "감성 조명·손샷", tags: ["F"] }
    ]
  },
  {
    id: 10,
    title: "친구 사진 요청 시",
    options: [
      { label: "각도·포즈 세심하게 조언", tags: ["T"] },
      { label: "자연스럽게 찍어줌", tags: ["F"] }
    ]
  },
  {
    id: 11,
    title: "단체사진 찍을 때",
    options: [
      { label: "전체 구도 중심", tags: ["T"] },
      { label: "인물 표정 중심", tags: ["F"] }
    ]
  },
  {
    id: 12,
    title: "풍경 사진을 보면",
    options: [
      { label: "구조적 아름다움", tags: ["T"] },
      { label: "감정적 여운", tags: ["F"] }
    ]
  }
];

export const getPhotoQuestion = (id: number): Question | undefined => {
  return PHOTO_QUESTIONS.find(q => q.id === id);
};

export const getPhotoQuestionCount = (): number => {
  return PHOTO_QUESTIONS.length;
};
