"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { travelPackQuestions, calculateMBTI } from "@/data/travelPackConfig"
import { trackTestStart, trackTestProgress, trackQuestionAnswer } from "@/lib/analytics"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const AUTO_ADVANCE_DELAY = 500; // 0.5초

export default function TravelPackTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(); // 선택된 옵션
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태
  const router = useRouter()

  useEffect(() => {
    trackTestStart("travel-pack-mbti", window.location.pathname)
  }, [])

  useEffect(() => {
    // localStorage에서 진행 상황 복원
    const savedAnswers = localStorage.getItem('travel-pack-answers')
    const savedQuestion = localStorage.getItem('travel-pack-current-question')
    
    if (savedAnswers && savedQuestion) {
      setAnswers(JSON.parse(savedAnswers))
      setCurrentQuestion(parseInt(savedQuestion))
    }
  }, [])

  useEffect(() => {
    // 진행 상황 저장
    localStorage.setItem('travel-pack-answers', JSON.stringify(answers))
    localStorage.setItem('travel-pack-current-question', currentQuestion.toString())
  }, [answers, currentQuestion])

  const handleAnswerSelect = useCallback((answer: string) => {
    if (isAnimating) return; // 애니메이션 중에는 클릭 무시

    setSelectedAnswer(answer);
    setSelectedOption(answer); // 선택된 옵션 표시
    setIsAnimating(true); // 애니메이션 시작

    // 현재 질문 추적
    trackQuestionAnswer(
      "travel-pack-mbti",
      currentQuestion + 1,
      answer,
      travelPackQuestions[currentQuestion].question,
      window.location.pathname
    );

    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);

      if (currentQuestion < travelPackQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setSelectedOption(null); // 다음 질문으로 넘어가기 전에 선택 초기화
        setIsAnimating(false); // 애니메이션 종료
        trackTestProgress("travel-pack-mbti", currentQuestion + 1, travelPackQuestions.length, window.location.pathname);
      } else {
        // 테스트 완료
        setIsLoading(true);
        const result = calculateMBTI(newAnswers);
        
        // localStorage 정리
        localStorage.removeItem('travel-pack-answers');
        localStorage.removeItem('travel-pack-current-question');
        
        // 결과 페이지로 이동
        setTimeout(() => {
          router.push(`/travel-pack-mbti/test/result?type=${result}`);
        }, 1000);
      }
    }, AUTO_ADVANCE_DELAY); // 0.5초 딜레이
  }, [currentQuestion, answers, router, isAnimating]);

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("답변을 선택해주세요!")
      return
    }
    // 자동 진행으로 대체됨
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer(answers[currentQuestion - 1] || null)
    }
  }

  const progress = ((currentQuestion + 1) / travelPackQuestions.length) * 100
  const question = travelPackQuestions[currentQuestion]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">결과 분석 중...</h2>
            <p className="text-gray-600">당신의 여행자 유형을 찾고 있어요 🎒</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 진행률 바 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              질문 {currentQuestion + 1} / {travelPackQuestions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* 질문 카드 */}
        <Card className="mb-8">
          <CardHeader className="text-center pb-4">
            {/* 질문 관련 OG 이미지 */}
            <div className="mb-4">
              <img
                src={`/api/og?testType=travel-pack-mbti&question=${encodeURIComponent(question.question)}&emoji=🎒&bg=blue-gradient`}
                alt={`질문 ${currentQuestion + 1} 이미지`}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                style={{ aspectRatio: '16/9' }}
              />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* 선택지 A */}
                <motion.button
                  onClick={() => handleAnswerSelect('A')}
                  disabled={isAnimating}
                  className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedOption === 'A'
                      ? 'border-blue-500 bg-blue-50 shadow-md scale-[1.02] opacity-90'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: isAnimating ? 1 : 1.02 }}
                  whileTap={{ scale: isAnimating ? 1 : 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === 'A' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {selectedOption === 'A' && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <span className="text-lg font-medium text-gray-900">
                        {question.choiceA.text}
                      </span>
                    </div>
                    <div className="text-2xl">A</div>
                  </div>
                </motion.button>

                {/* 선택지 B */}
                <motion.button
                  onClick={() => handleAnswerSelect('B')}
                  disabled={isAnimating}
                  className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                    selectedOption === 'B'
                      ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02] opacity-90'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: isAnimating ? 1 : 1.02 }}
                  whileTap={{ scale: isAnimating ? 1 : 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === 'B' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                      }`}>
                        {selectedOption === 'B' && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <span className="text-lg font-medium text-gray-900">
                        {question.choiceB.text}
                      </span>
                    </div>
                    <div className="text-2xl">B</div>
                  </div>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            이전
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">
              {currentQuestion === travelPackQuestions.length - 1 ? "마지막 질문입니다" : "다음 질문으로"}
            </p>
            <div className="flex gap-2">
              {Array.from({ length: travelPackQuestions.length }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= currentQuestion ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentQuestion === travelPackQuestions.length - 1 ? "결과 보기" : "다음"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* 힌트 */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            💡 첫 번째로 떠오르는 답변을 선택해주세요. 정답은 없으니 편하게 답해주세요!
          </p>
        </div>
      </div>
    </div>
  )
}
