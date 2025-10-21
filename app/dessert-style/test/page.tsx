import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"
import { DESSERT_QUESTIONS } from "@/data/dessertQuestions"

export default function DessertTestPage() {
  return (
    <QuizTestTemplate
      questions={DESSERT_QUESTIONS}
      testId="dessert-style"
      testName="디저트 취향 MBTI"
      gradientFrom="from-pink-50"
      gradientTo="via-purple-50"
      emoji="🍰"
      resultPath="/dessert-style/result"
      autoAdvance={true}
      autoAdvanceDelay={500}
    />
  )
}