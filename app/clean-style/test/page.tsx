"use client"

import QuizTestTemplate from "@/components/quiz/QuizTestTemplate"

export default function CleanStyleTestPage() {
  return (
    <QuizTestTemplate
      testId="clean-style"
      questions={[]} // 동적으로 로드됨
    />
  )
}
