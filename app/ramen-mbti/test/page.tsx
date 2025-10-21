import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"

const RAMEN_QUESTIONS = [
  {
    id: 1,
    title: "라면을 끓일 때 물의 양은?",
    options: [
      { label: "정확히 측정해서 넣는다", tags: ["J"] },
      { label: "대충 눈대중으로 넣는다", tags: ["P"] },
    ],
  },
  {
    id: 2,
    title: "라면 스프는 언제 넣나요?",
    options: [
      { label: "물이 끓기 시작할 때 바로", tags: ["E"] },
      { label: "면이 어느 정도 익었을 때", tags: ["I"] },
    ],
  },
  {
    id: 3,
    title: "라면에 추가 재료를 넣는다면?",
    options: [
      { label: "계란, 파 등 기본적인 재료", tags: ["S"] },
      { label: "치즈, 김치 등 특별한 재료", tags: ["N"] },
    ],
  },
  {
    id: 4,
    title: "면의 익힘 정도는?",
    options: [
      { label: "꼬들꼬들하게 덜 익혀서", tags: ["T"] },
      { label: "부드럽게 충분히 익혀서", tags: ["F"] },
    ],
  },
  {
    id: 5,
    title: "라면을 끓이는 동안 뭘 하나요?",
    options: [
      { label: "타이머 맞춰두고 다른 일", tags: ["J"] },
      { label: "계속 지켜보면서 조절", tags: ["P"] },
    ],
  },
  {
    id: 6,
    title: "라면은 어디서 먹나요?",
    options: [
      { label: "식탁에서 정식으로", tags: ["E"] },
      { label: "방에서 혼자 조용히", tags: ["I"] },
    ],
  },
  {
    id: 7,
    title: "새로운 라면 제품을 고를 때",
    options: [
      { label: "익숙한 브랜드 위주로", tags: ["S"] },
      { label: "새로운 맛에 도전", tags: ["N"] },
    ],
  },
  {
    id: 8,
    title: "라면을 다 먹고 난 후",
    options: [
      { label: "그릇을 바로 설거지", tags: ["T"] },
      { label: "잠시 쉬었다가 나중에", tags: ["F"] },
    ],
  },
  {
    id: 9,
    title: "라면 요리법을 정할 때",
    options: [
      { label: "미리 계획하고 준비", tags: ["J"] },
      { label: "그때그때 즉흥적으로", tags: ["P"] },
    ],
  },
  {
    id: 10,
    title: "라면을 먹는 이유는?",
    options: [
      { label: "간편하고 빠르게 해결", tags: ["E"] },
      { label: "혼자만의 시간을 즐기며", tags: ["I"] },
    ],
  },
  {
    id: 11,
    title: "라면 맛을 평가할 때",
    options: [
      { label: "맛, 면발 등 구체적으로", tags: ["S"] },
      { label: "전체적인 느낌으로", tags: ["N"] },
    ],
  },
  {
    id: 12,
    title: "좋아하는 라면을 못 먹게 되면",
    options: [
      { label: "다른 대안을 찾는다", tags: ["T"] },
      { label: "아쉬워하며 포기한다", tags: ["F"] },
    ],
  },
]

export default function RamenTestPage() {
  return (
    <QuizTestTemplate
      questions={RAMEN_QUESTIONS}
      testId="ramen-mbti"
      testName="라면 MBTI"
      gradientFrom="from-orange-50"
      gradientTo="to-red-100"
      emoji="🍜"
      resultPath="/ramen-mbti/test/result"
      autoAdvance={true}
      autoAdvanceDelay={1000}
    />
  )
}