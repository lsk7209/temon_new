import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"

const ALARM_QUESTIONS = [
  {
    id: 1,
    title: "알람은 몇 개나 맞춰두시나요?",
    options: [
      { label: "하나만 맞춰두고 바로 일어난다", tags: ["J"] },
      { label: "여러 개 맞춰두고 스누즈 활용", tags: ["P"] },
    ],
  },
  {
    id: 2,
    title: "알람이 울리면 가장 먼저 하는 행동은?",
    options: [
      { label: "바로 일어나서 화장실로", tags: ["E"] },
      { label: "폰을 확인하고 잠시 더 누워", tags: ["I"] },
    ],
  },
  {
    id: 3,
    title: "알람 소리는 어떤 걸 선호하나요?",
    options: [
      { label: "기본 알람음이나 벨소리", tags: ["S"] },
      { label: "좋아하는 노래나 특별한 소리", tags: ["N"] },
    ],
  },
  {
    id: 4,
    title: "알람을 끄는 방식은?",
    options: [
      { label: "한 번에 확실히 끈다", tags: ["T"] },
      { label: "스누즈를 여러 번 누르며 천천히", tags: ["F"] },
    ],
  },
  {
    id: 5,
    title: "알람 시간 설정은?",
    options: [
      { label: "정확한 시간에 맞춰 설정", tags: ["J"] },
      { label: "대충 7시쯤으로 설정", tags: ["P"] },
    ],
  },
  {
    id: 6,
    title: "알람이 울리기 전에 일어나는 경우",
    options: [
      { label: "알람을 끄고 바로 일어난다", tags: ["E"] },
      { label: "조용히 누워있다가 알람을 기다린다", tags: ["I"] },
    ],
  },
  {
    id: 7,
    title: "새로운 알람 앱을 쓸 때",
    options: [
      { label: "기본 설정 그대로 사용", tags: ["S"] },
      { label: "다양한 기능을 탐색하며 설정", tags: ["N"] },
    ],
  },
  {
    id: 8,
    title: "알람을 놓쳤을 때",
    options: [
      { label: "다음부터 더 확실한 방법을 찾는다", tags: ["T"] },
      { label: "운이 없었구나 하고 넘어간다", tags: ["F"] },
    ],
  },
  {
    id: 9,
    title: "주말 알람 설정은?",
    options: [
      { label: "평일과 다른 시간으로 설정", tags: ["J"] },
      { label: "그때그때 상황에 맞춰", tags: ["P"] },
    ],
  },
  {
    id: 10,
    title: "알람을 맞춰두는 이유는?",
    options: [
      { label: "시간 관리와 계획을 위해서", tags: ["E"] },
      { label: "혼자만의 시간을 보장받기 위해", tags: ["I"] },
    ],
  },
  {
    id: 11,
    title: "알람 소리 볼륨은?",
    options: [
      { label: "확실히 들릴 정도로 크게", tags: ["S"] },
      { label: "적당히 조용하게", tags: ["N"] },
    ],
  },
  {
    id: 12,
    title: "알람을 끄고 나서",
    options: [
      { label: "바로 다음 할 일을 시작한다", tags: ["T"] },
      { label: "잠시 멍하니 있다가 일어난다", tags: ["F"] },
    ],
  },
]

export default function AlarmHabitTestPage() {
  return (
    <QuizTestTemplate
      questions={ALARM_QUESTIONS}
      testId="alarm-habit"
      testName="알람 습관 테스트"
      gradientFrom="from-yellow-50"
      gradientTo="to-orange-100"
      emoji="⏰"
      resultPath="/alarm-habit/test/result"
      autoAdvance={true}
      autoAdvanceDelay={1000}
    />
  )
}