"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { trackTestProgress, trackQuestionAnswer } from "@/lib/analytics"

interface QuizQuestion {
  id: number
  title: string
  options: {
    label: string
    tags: string[]
  }[]
}

interface QuizTestTemplateProps {
  testId: string
}

const DEFAULT_AUTO_ADVANCE_DELAY = 500

export default function QuizTestTemplate({
  testId
}: QuizTestTemplateProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadedQuestions, setLoadedQuestions] = useState<QuizQuestion[]>([])
  const [isQuestionsLoaded, setIsQuestionsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // testId에 따라 동적으로 질문 데이터 로드
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setError(null)
        let questionsData: QuizQuestion[] = []
        
        switch (testId) {
          case 'room-cleaning':
            const { roomCleaningQuestions } = await import('@/data/roomCleaningQuestions')
            questionsData = roomCleaningQuestions.map(q => ({
              id: q.id,
              title: q.question,
              options: [
                { label: q.choiceA.text, tags: q.choiceA.tags },
                { label: q.choiceB.text, tags: q.choiceB.tags }
              ]
            }))
            break
          case 'phone-style':
            const { PHONE_QUESTIONS } = await import('@/data/phoneQuestions')
            questionsData = PHONE_QUESTIONS.map(q => ({
              id: q.id,
              title: q.title,
              options: q.options
            }))
            break
          case 'photo-style':
            const { PHOTO_QUESTIONS } = await import('@/data/photoQuestions')
            questionsData = PHOTO_QUESTIONS.map(q => ({
              id: q.id,
              title: q.title,
              options: q.options
            }))
            break
          case 'dessert-style':
            const { DESSERT_QUESTIONS } = await import('@/data/dessertQuestions')
            questionsData = DESSERT_QUESTIONS.map(q => ({
              id: q.id,
              title: q.title,
              options: q.options
            }))
            break
          default:
            throw new Error(`Unknown testId: ${testId}`)
        }
        
        if (questionsData.length === 0) {
          throw new Error('No questions found for this test')
        }
        
        setLoadedQuestions(questionsData)
        setIsQuestionsLoaded(true)
      } catch (error) {
        console.error('Error loading questions:', error)
        setError(error instanceof Error ? error.message : 'Failed to load questions')
        setIsQuestionsLoaded(true)
      }
    }
    
    loadQuestions()
  }, [testId])

  const currentQuestion = loadedQuestions[currentQuestionIndex]
  const totalQuestions = loadedQuestions.length
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0

  useEffect(() => {
    if (totalQuestions > 0) {
      trackTestProgress(testId, currentQuestionIndex + 1, totalQuestions, window.location.pathname)
    }
  }, [currentQuestionIndex, totalQuestions, testId])

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">오류가 발생했습니다</h2>
          <p className="text-lg text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  // 질문이 로드되지 않았으면 로딩 표시
  if (!isQuestionsLoaded || loadedQuestions.length === 0 || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">질문을 불러오는 중...</p>
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
          router.push(`/${testId}/result?type=${result}`)
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
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">결과를 계산하는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-green-600 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 진행률 표시 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>
            <span className="text-white text-sm font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        {/* 질문 카드 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            variants={questionVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-center text-gray-800">
                  {currentQuestion.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuestion.options.map((option: any, index: number) => (
                  <motion.div
                    key={index}
                    variants={optionVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      variant={selectedOption === index ? "default" : "outline"}
                      className={`w-full h-16 text-left justify-start p-4 ${
                        selectedOption === index
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-800 hover:bg-gray-50"
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnimating}
                    >
                      {option.label}
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}