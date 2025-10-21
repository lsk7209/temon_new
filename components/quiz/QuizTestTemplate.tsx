"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { trackTestProgress, trackQuestionAnswer } from "@/lib/analytics"

interface QuizOption {
  label: string
  tags: string[]
}

interface QuizQuestion {
  id: number
  title: string
  options: QuizOption[]
}

interface QuizTestTemplateProps {
  // 기본 정보
  questions: QuizQuestion[]
  testId: string
  testName: string
  
  // 스타일링
  gradientFrom: string
  gradientTo: string
  emoji: string
  
  // 결과 페이지 경로
  resultPath: string
  
  // 자동 진행 설정
  autoAdvance?: boolean
  autoAdvanceDelay?: number
}

const DEFAULT_AUTO_ADVANCE_DELAY = 500

export default function QuizTestTemplate({
  questions,
  testId,
  testName,
  gradientFrom,
  gradientTo,
  emoji,
  resultPath,
  autoAdvance = true,
  autoAdvanceDelay = DEFAULT_AUTO_ADVANCE_DELAY
}: QuizTestTemplateProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  useEffect(() => {
    trackTestProgress(testId, currentQuestionIndex + 1, totalQuestions, window.location.pathname)
  }, [currentQuestionIndex, totalQuestions, testId])

  const handleAnswer = useCallback((optionIndex: number) => {
    if (isAnimating) return

    const selectedOptionData = currentQuestion.options[optionIndex]
    if (!selectedOptionData) return

    setSelectedOption(optionIndex)
    setIsAnimating(true)

    // 답변 추적
    trackQuestionAnswer(
      testId,
      currentQuestionIndex + 1,
      selectedOptionData.tags.join(','),
      currentQuestion.title,
      window.location.pathname
    )

    if (autoAdvance) {
      setTimeout(() => {
        const newAnswers = [...answers, ...selectedOptionData.tags]
        setAnswers(newAnswers)

        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedOption(null)
          setIsAnimating(false)
        } else {
          // 테스트 완료
          setIsLoading(true)
          
          // testId에 따라 동적으로 결과 계산
          let result: string
          try {
            const { calculateMBTI } = require('@/lib/mbti')
            result = calculateMBTI(newAnswers)
          } catch (error) {
            console.error('Error calculating result:', error)
            result = 'ENFP' // 기본값
          }
          
          setTimeout(() => {
            router.push(`${resultPath}?type=${result}`)
          }, 1000)
        }
      }, autoAdvanceDelay)
    } else {
      // 수동 진행
      const newAnswers = [...answers, ...selectedOptionData.tags]
      setAnswers(newAnswers)
      setSelectedOption(null)
      setIsAnimating(false)
    }
  }, [currentQuestionIndex, answers, currentQuestion, testId, autoAdvance, autoAdvanceDelay, totalQuestions, resultPath, router, isAnimating])

  const questionVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }

  const optionVariants = {
    initial: { opacity: 1, y: 0 },
    selected: { opacity: 0.6, y: -5 },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">결과를 분석하는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${gradientFrom} ${gradientTo} py-8 px-4`}>
      <div className="max-w-2xl mx-auto">
        {/* 진행률 바 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-white/80">
              질문 {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="text-sm font-medium text-white/80">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        {/* 질문 카드 */}
        <Card className="mb-8 overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* 질문 관련 OG 이미지 */}
            <div className="mb-4">
              <img
                src={`/api/og?testType=${testId}&question=${encodeURIComponent(currentQuestion.title)}&emoji=${emoji}&bg=${gradientFrom.replace('from-', '').replace('-500', '-gradient')}`}
                alt={`질문 ${currentQuestionIndex + 1} 이미지`}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
              {currentQuestion.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                variants={questionVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <motion.div
                    key={index}
                    variants={optionVariants}
                    initial="initial"
                    animate={selectedOption === index ? "selected" : "initial"}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      className={`w-full justify-start text-left py-6 px-5 text-lg rounded-xl shadow-md transition-all duration-200 h-auto ${
                        selectedOption === index
                          ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white scale-[1.02] opacity-90`
                          : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnimating}
                    >
                      <div className="flex items-center w-full">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                          selectedOption === index 
                            ? 'bg-white/20' 
                            : 'bg-gray-100'
                        }`}>
                          <span className={`font-semibold ${
                            selectedOption === index ? 'text-white' : 'text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span className="flex-1">{option.label}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* 힌트 텍스트 */}
        <div className="text-center">
          <p className="text-white/80 text-sm">
            💡 답변을 선택하면 {autoAdvance ? '자동으로' : ''} 다음 질문으로 이동합니다
          </p>
        </div>
      </div>
    </div>
  )
}
