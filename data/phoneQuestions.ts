// 스마트폰 사용 습관 테스트 질문 데이터
// 12문항, 각 축(E/I, S/N, T/F, J/P) 3문항씩 총 12문항

export type MBTITag = "E"|"I"|"S"|"N"|"T"|"F"|"J"|"P";

export type Question = {
  id: number;
  title: string;
  options: { label: string; tags: MBTITag[] }[];
};

export const PHONE_QUESTIONS: Question[] = [
  // E vs I
  {
    id: 1,
    title: "아침에 눈 뜨자마자 하는 일",
    options: [
      { label: "폰 확인부터", tags: ["E"] },
      { label: "스트레칭이나 생각 정리", tags: ["I"] }
    ]
  },
  {
    id: 2,
    title: "SNS 알림이 뜨면",
    options: [
      { label: "바로 확인", tags: ["E"] },
      { label: "나중에 한꺼번에 봄", tags: ["I"] }
    ]
  },
  {
    id: 3,
    title: "친구와 채팅할 때",
    options: [
      { label: "바로 답장", tags: ["E"] },
      { label: "생각나면 답장", tags: ["I"] }
    ]
  },
  {
    id: 4,
    title: "새로운 앱 설치",
    options: [
      { label: "필요할 때만", tags: ["S"] },
      { label: "재밌어 보여서 시도", tags: ["N"] }
    ]
  },

  // J vs P
  {
    id: 5,
    title: "배터리 10% 남았을 때",
    options: [
      { label: "불안해서 바로 충전", tags: ["J"] },
      { label: "그냥 버틸 때까지 사용", tags: ["P"] }
    ]
  },
  {
    id: 6,
    title: "사진 정리할 때",
    options: [
      { label: "주기적으로 삭제", tags: ["J"] },
      { label: "쌓여도 그대로 둠", tags: ["P"] }
    ]
  },
  {
    id: 7,
    title: "폰 사용 시간 알림을 보면",
    options: [
      { label: "관리해야겠다 생각", tags: ["J"] },
      { label: "'에이 뭐 어때'", tags: ["P"] }
    ]
  },
  {
    id: 8,
    title: "폰이 없어졌을 때",
    options: [
      { label: "바로 찾기모드 ON", tags: ["J"] },
      { label: "'언젠가 나오겠지'", tags: ["P"] }
    ]
  },

  // T vs F
  {
    id: 9,
    title: "폰 배경화면",
    options: [
      { label: "깔끔·심플", tags: ["T"] },
      { label: "감성·사진형", tags: ["F"] }
    ]
  },
  {
    id: 10,
    title: "앱 정리 기준",
    options: [
      { label: "효율·생산성 중심", tags: ["T"] },
      { label: "감정·분위기 중심", tags: ["F"] }
    ]
  },
  {
    id: 11,
    title: "화면 밝기",
    options: [
      { label: "낮게 조정", tags: ["T"] },
      { label: "눈부시게 밝게", tags: ["F"] }
    ]
  },
  {
    id: 12,
    title: "폰으로 하는 일",
    options: [
      { label: "일정·업무 확인", tags: ["S"] },
      { label: "음악·영상 감상", tags: ["N"] }
    ]
  }
];

export const getPhoneQuestion = (id: number): Question | undefined => {
  return PHONE_QUESTIONS.find(q => q.id === id);
};

export const getPhoneQuestionCount = (): number => {
  return PHONE_QUESTIONS.length;
};
