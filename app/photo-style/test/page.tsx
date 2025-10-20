import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"
import { PHOTO_QUESTIONS } from "@/data/photoQuestions"
import { calculateMBTI } from "@/lib/mbti"

export default function PhotoTestPage() {
  return (
    <QuizTestTemplate
      questions={PHOTO_QUESTIONS}
      testId="photo-style"
      testName="사진 찍는 스타일 테스트"
      gradientFrom="from-purple-50"
      gradientTo="to-pink-100"
      emoji="📸"
      calculateResult={calculateMBTI}
      resultPath="/photo-style/result"
      autoAdvance={true}
      autoAdvanceDelay={500}
    />
  )
}