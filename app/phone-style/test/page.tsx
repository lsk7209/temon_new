import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"
import { PHONE_QUESTIONS } from "@/data/phoneQuestions"

export default function PhoneTestPage() {
  return (
    <QuizTestTemplate
      questions={PHONE_QUESTIONS}
      testId="phone-style"
      testName="스마트폰 습관 테스트"
      gradientFrom="from-blue-50"
      gradientTo="to-indigo-100"
      emoji="📱"
      resultPath="/phone-style/result"
      autoAdvance={true}
      autoAdvanceDelay={500}
    />
  )
}