"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CONBINI_QUESTIONS } from "@/data/conbiniQuestions"
import { initScore, decideType, AxisScore } from "@/lib/mbti"
import { trackTestStart, trackQuestionAnswer, trackTestComplete } from "@/lib/analytics"
import { ArrowRight, ShoppingCart } from "lucide-react"

export default function ConbiniTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [score, setScore] = useState<AxisScore>(initScore())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    trackTestStart("conbini-basket", window.location.pathname)
  }, [])

  const handleAnswer = (answer: string, tags: string[]) => {
    if (isTransitioning) return

    // 답변 저장
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    // 점수 업데이트
    const newScore = { ...score }
    tags.forEach(tag => {
      if (tag in newScore) {
        newScore[tag as keyof AxisScore]++
      }
    })
    setScore(newScore)

    // Analytics 이벤트
    trackQuestionAnswer(currentQuestion + 1, answer, window.location.pathname)

    // 전환 애니메이션 시작
    setIsTransitioning(true)

    // 0.5초 후 자동 진행
    setTimeout(() => {
      if (currentQuestion < CONBINI_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setIsTransitioning(false)
      } else {
        // 테스트 완료
        const result = decideType(newScore)
        trackTestComplete("conbini-basket", result, window.location.pathname)
        router.push(`/conbini/test/result?type=${result}`)
      }
    }, 500)
  }

  const currentQ = CONBINI_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / CONBINI_QUESTIONS.length) * 100

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* 진행바 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">질문 {currentQuestion + 1} / {CONBINI_QUESTIONS.length}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* 질문 카드 */}
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-orange-500 mr-3" />
              <span className="text-lg font-semibold text-gray-700">편의점 장바구니 테스트</span>
            </div>
            {/* 질문 관련 OG 이미지 */}
            <div className="mb-4">
              <img
                src={`/api/og?testType=conbini&question=${encodeURIComponent(currentQ.title)}&emoji=🛒&bg=orange-gradient`}
                alt={`질문 ${currentQuestion + 1} 이미지`}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-gray-900 leading-relaxed">
              {currentQ.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-left justify-start p-6 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                  onClick={() => handleAnswer(option.label, option.tags)}
                  disabled={isTransitioning}
                >
                  <div className="flex items-center w-full">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-orange-600 font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-lg">{option.label}</span>
                    <ArrowRight className="w-5 h-5 ml-auto text-gray-400" />
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 힌트 텍스트 */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            💡 답변을 선택하면 자동으로 다음 질문으로 이동합니다
          </p>
        </div>
      </div>
    </div>
  )
}
