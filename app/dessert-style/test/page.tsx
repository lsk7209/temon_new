import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"
import { DESSERT_QUESTIONS } from "@/data/dessertQuestions"
import { calculateMBTI } from "@/lib/mbti"

export default function DessertTestPage() {
  return (
    <QuizTestTemplate
      questions={DESSERT_QUESTIONS}
      testId="dessert-style"
      testName="디저트 취향 MBTI"
      gradientFrom="from-pink-50"
      gradientTo="via-purple-50"
      emoji="🍰"
      calculateResult={calculateMBTI}
      resultPath="/dessert-style/result"
      autoAdvance={true}
      autoAdvanceDelay={500}
    />
  )
}