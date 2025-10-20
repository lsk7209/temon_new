"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PHOTO_QUESTIONS, MBTITag } from "@/data/photoQuestions"
import { calculateMBTI } from "@/lib/mbti"
import { trackTestProgress, trackQuestionAnswer } from "@/lib/analytics"
import { motion, AnimatePresence } from "framer-motion"

const AUTO_ADVANCE_DELAY = 500; // 0.5초

export default function PhotoTestPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<MBTITag[]>([])
  const [progress, setProgress] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(); // 선택된 옵션 인덱스
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 상태

  const currentQuestion = PHOTO_QUESTIONS[currentQuestionIndex]
  const totalQuestions = PHOTO_QUESTIONS.length

  useEffect(() => {
    setProgress(((currentQuestionIndex + 1) / totalQuestions) * 100)
    trackTestProgress("photo-style", currentQuestionIndex + 1, totalQuestions, window.location.pathname)
  }, [currentQuestionIndex, totalQuestions])

  const handleAnswer = useCallback((tags: MBTITag[], optionIndex: number) => {
    if (isAnimating) return; // 애니메이션 중에는 클릭 무시

    setSelectedOption(optionIndex); // 선택된 옵션 표시
    setIsAnimating(true); // 애니메이션 시작

    trackQuestionAnswer("photo-style", currentQuestion.id, tags.join(','), window.location.pathname);

    setTimeout(() => {
      setAnswers((prev) => [...prev, ...tags]);

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption(null); // 다음 질문으로 넘어가기 전에 선택 초기화
        setIsAnimating(false); // 애니메이션 종료
      } else {
        // 테스트 완료
        const mbtiResult = calculateMBTI(answers);
        router.push(`/photo-style/result?type=${mbtiResult}`);
      }
    }, AUTO_ADVANCE_DELAY); // 0.5초 딜레이
  }, [currentQuestionIndex, totalQuestions, answers, router, currentQuestion, isAnimating]);

  const questionVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const optionVariants = {
    initial: { opacity: 1, y: 0 },
    selected: { opacity: 0.6, y: -5 },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl border-none">
        <CardHeader className="text-center p-6 pb-4">
          <Progress value={progress} className="w-full mb-4 h-2" />
          <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
            {currentQuestionIndex + 1}. {currentQuestion.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
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
                    className={`w-full justify-start text-left py-7 px-5 text-lg rounded-xl shadow-md transition-all duration-200
                      ${selectedOption === index
                        ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white scale-[1.02] opacity-90"
                        : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-200"
                      }`}
                    onClick={() => handleAnswer(option.tags, index)}
                    disabled={isAnimating} // 애니메이션 중 버튼 비활성화
                  >
                    {option.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
