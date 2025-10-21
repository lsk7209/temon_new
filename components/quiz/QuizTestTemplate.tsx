"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { trackTestProgress, trackQuestionAnswer } from "@/lib/analytics"

interface QuizTestTemplateProps {
  testId: string
  questions?: any[] // 동적으로 로드됨
}

const DEFAULT_AUTO_ADVANCE_DELAY = 500

export default function QuizTestTemplate({
  testId,
  questions = []
}: QuizTestTemplateProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadedQuestions, setLoadedQuestions] = useState<any[]>([])

  // testId에 따라 동적으로 질문 데이터 로드
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        let questionsData: any[] = []
        
        console.log('Loading questions for testId:', testId)
        
        switch (testId) {
          case 'clean-style':
            console.log('Loading clean-style questions...')
            try {
              const { cleanQuestions } = await import('@/data/cleanQuestions')
              console.log('Clean questions loaded:', cleanQuestions)
              questionsData = cleanQuestions.map(q => ({
                id: q.id,
                title: q.question,
                options: [
                  { label: q.choiceA.text, tags: q.choiceA.tags },
                  { label: q.choiceB.text, tags: q.choiceB.tags }
                ]
              }))
              console.log('Mapped questions data:', questionsData)
            } catch (importError) {
              console.error('Error importing cleanQuestions:', importError)
              questionsData = []
            }
            break
          case 'phone-style':
            try {
              const { phoneQuestions } = await import('@/data/phoneQuestions')
              questionsData = phoneQuestions
            } catch (importError) {
              console.error('Error importing phoneQuestions:', importError)
              questionsData = []
            }
            break
          case 'photo-style':
            try {
              const { photoQuestions } = await import('@/data/photoQuestions')
              questionsData = photoQuestions
            } catch (importError) {
              console.error('Error importing photoQuestions:', importError)
              questionsData = []
            }
            break
          case 'dessert-style':
            try {
              const { dessertQuestions } = await import('@/data/dessertQuestions')
              questionsData = dessertQuestions
            } catch (importError) {
              console.error('Error importing dessertQuestions:', importError)
              questionsData = []
            }
            break
          default:
            questionsData = questions
        }
        
        console.log('Final questions data:', questionsData)
        setLoadedQuestions(questionsData)
      } catch (error) {
        console.error('Error loading questions:', error)
        setLoadedQuestions(questions)
      }
    }
    
    loadQuestions()
  }, [testId, questions])

  const currentQuestion = loadedQuestions[currentQuestionIndex]
  const totalQuestions = loadedQuestions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  useEffect(() => {
    if (totalQuestions > 0) {
      trackTestProgress(testId, currentQuestionIndex + 1, totalQuestions, window.location.pathname)
    }
  }, [currentQuestionIndex, totalQuestions, testId])

  // 질문이 로드되지 않았으면 로딩 표시
  if (loadedQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">질문을 불러오는 중...</p>
          <p className="text-sm text-gray-500 mt-2">testId: {testId}</p>
        </div>
      </div>
    )
  }

  const handleAnswer = useCallback((optionIndex: number) => {
    if (isAnimating || !currentQuestion) return

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
          router.push(`/clean-style/result?type=${result}`)
        }, 1000)
      }
    }, DEFAULT_AUTO_ADVANCE_DELAY)
  }, [currentQuestionIndex, answers, currentQuestion, testId, totalQuestions, router, isAnimating])

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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-600 py-8 px-4">
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
