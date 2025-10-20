"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { trackTestProgress, trackQuestionAnswer } from "@/lib/analytics"
import { useRouter } from "next/navigation"
import { DESSERT_QUESTIONS, getDessertQuestion, getDessertQuestionCount } from "@/data/dessertQuestions"
import { calculateMBTI } from "@/lib/mbti"
import { 
  ArrowRight, 
  Coffee, 
  Cake,
  Sparkles,
  Heart,
  Zap
} from "lucide-react"

export default function DessertStyleTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const router = useRouter()

  const totalQuestions = getDessertQuestionCount()
  const progress = (currentQuestion / totalQuestions) * 100

  const question = getDessertQuestion(currentQuestion)

  useEffect(() => {
    if (showResult) {
      const result = calculateMBTI(answers)
      router.push(`/dessert-style/result?type=${result}`)
    }
  }, [showResult, answers, router])

  const handleAnswer = (optionIndex: number) => {
    if (isTransitioning) return

    const selectedOption = question?.options[optionIndex]
    if (!selectedOption) return

    // 답변 저장
    const newAnswers = {
      ...answers,
      [currentQuestion]: selectedOption.tags
    }
    setAnswers(newAnswers)

    // 분석 추적
    trackQuestionAnswer("dessert-style", currentQuestion, selectedOption.tags.join(","))

    // 전환 애니메이션
    setIsTransitioning(true)

    setTimeout(() => {
      if (currentQuestion < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1)
        trackTestProgress("dessert-style", currentQuestion + 1, totalQuestions)
      } else {
        // 마지막 질문 완료
        trackTestProgress("dessert-style", totalQuestions, totalQuestions)
        setShowResult(true)
      }
      setIsTransitioning(false)
    }, 500)
  }

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-lg text-gray-600">질문을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* 진행률 표시 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-600">
                {currentQuestion} / {totalQuestions}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-gray-200" />
          </div>

          {/* 질문 카드 */}
          <Card className={`mb-8 border-0 shadow-2xl bg-white/90 backdrop-blur-sm transition-all duration-500 ${
            isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className="text-3xl animate-bounce">🍰</div>
                <div className="text-3xl animate-pulse delay-150">☕</div>
                <div className="text-3xl animate-bounce delay-300">🍪</div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {question.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                당신의 디저트 취향을 알려주세요!
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full p-6 text-left h-auto border-2 transition-all duration-300 hover:scale-105 ${
                    isTransitioning 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:border-pink-300 hover:bg-pink-50'
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={isTransitioning}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {index === 0 ? '🍰' : '☕'}
                    </div>
                    <span className="text-lg font-medium text-gray-800">
                      {option.label}
                    </span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* 디저트 이모지 애니메이션 */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4">
              <div className="text-4xl animate-bounce">🍩</div>
              <div className="text-4xl animate-pulse delay-100">🧁</div>
              <div className="text-4xl animate-bounce delay-200">🍪</div>
              <div className="text-4xl animate-pulse delay-300">🍰</div>
              <div className="text-4xl animate-bounce delay-400">☕</div>
            </div>
          </div>

          {/* 힌트 텍스트 */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-pink-100 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-pink-500" />
                <span className="font-semibold text-gray-700">💡 팁</span>
              </div>
              <p className="text-gray-600">
                {currentQuestion <= 4 && "첫 번째 질문부터 차근차근 답해보세요! 🍰"}
                {currentQuestion > 4 && currentQuestion <= 8 && "디저트 취향이 드러나고 있어요! ☕"}
                {currentQuestion > 8 && currentQuestion <= 12 && "거의 다 왔어요! 마지막까지 화이팅! 🍪"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
