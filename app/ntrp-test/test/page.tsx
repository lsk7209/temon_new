import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"

const NTRP_QUESTIONS = [
  {
    id: 1,
    title: "테니스 경험이 얼마나 되나요?",
    options: [
      { label: "처음 시작", tags: ["1.0"] },
      { label: "6개월 미만", tags: ["1.5"] },
      { label: "6개월 - 1년", tags: ["2.0"] },
      { label: "1-2년", tags: ["2.5"] },
      { label: "2-3년", tags: ["3.0"] },
      { label: "3년 이상", tags: ["3.5"] },
    ],
  },
  {
    id: 2,
    title: "포핸드 스트로크 실력은?",
    options: [
      { label: "공을 라켓에 맞추기 어려움", tags: ["1.0"] },
      { label: "천천히 오는 공은 칠 수 있음", tags: ["2.0"] },
      { label: "중간 속도 공도 안정적으로 처리", tags: ["3.0"] },
      { label: "빠른 공도 파워있게 리턴", tags: ["4.0"] },
      { label: "각도와 스핀을 자유자재로 구사", tags: ["5.0"] },
    ],
  },
  {
    id: 3,
    title: "백핸드 스트로크 실력은?",
    options: [
      { label: "백핸드는 거의 못침", tags: ["1.0"] },
      { label: "천천히 오는 공은 처리 가능", tags: ["2.0"] },
      { label: "안정적으로 백핸드 사용", tags: ["3.0"] },
      { label: "파워와 정확성 모두 갖춤", tags: ["4.0"] },
      { label: "원핸드/투핸드 모두 완벽", tags: ["5.0"] },
    ],
  },
  {
    id: 4,
    title: "서브 실력은?",
    options: [
      { label: "서브를 넣기 어려움", tags: ["1.0"] },
      { label: "천천히 넣을 수 있음", tags: ["2.0"] },
      { label: "1차 서브는 안정적", tags: ["3.0"] },
      { label: "파워 서브 가능", tags: ["4.0"] },
      { label: "스핀과 파워 모두 완벽", tags: ["5.0"] },
    ],
  },
  {
    id: 5,
    title: "발리 실력은?",
    options: [
      { label: "발리는 거의 못함", tags: ["1.0"] },
      { label: "천천히 오는 공은 처리", tags: ["2.0"] },
      { label: "기본적인 발리 가능", tags: ["3.0"] },
      { label: "넷플레이에서 발리 활용", tags: ["4.0"] },
      { label: "발리로 승부 결정", tags: ["5.0"] },
    ],
  },
  {
    id: 6,
    title: "이동 능력은?",
    options: [
      { label: "공을 따라가기 어려움", tags: ["1.0"] },
      { label: "천천히 이동하며 공 처리", tags: ["2.0"] },
      { label: "기본적인 이동은 가능", tags: ["3.0"] },
      { label: "빠른 이동으로 모든 공 커버", tags: ["4.0"] },
      { label: "코트 전체를 자유자재로 활용", tags: ["5.0"] },
    ],
  },
  {
    id: 7,
    title: "게임 경험은?",
    options: [
      { label: "게임을 해본 적 없음", tags: ["1.0"] },
      { label: "친구들과 가끔 게임", tags: ["2.0"] },
      { label: "정기적으로 게임 참여", tags: ["3.0"] },
      { label: "토너먼트 참여 경험", tags: ["4.0"] },
      { label: "대회에서 우수한 성적", tags: ["5.0"] },
    ],
  },
  {
    id: 8,
    title: "전술적 이해도는?",
    options: [
      { label: "공을 넘기는 것만 생각", tags: ["1.0"] },
      { label: "기본적인 코트 활용", tags: ["2.0"] },
      { label: "상대의 약점 파악", tags: ["3.0"] },
      { label: "다양한 전술 구사", tags: ["4.0"] },
      { label: "상황에 맞는 전술적 판단", tags: ["5.0"] },
    ],
  },
]

export default function NTRPTestPage() {
  return (
    <QuizTestTemplate
      questions={NTRP_QUESTIONS}
      testId="ntrp-test"
      testName="NTRP 테스트"
      gradientFrom="from-green-50"
      gradientTo="to-blue-100"
      emoji="🎾"
      resultPath="/ntrp-test/test/result"
      autoAdvance={true}
      autoAdvanceDelay={1000}
    />
  )
}