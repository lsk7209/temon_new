"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Users, Clock, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface QuizIntroTemplateProps {
  // config 객체 또는 개별 props
  config?: {
    id: string
    name: string
    description: string
    emoji: string
    category: string
    estimatedTime: string
    questionCount: number
    gradientFrom: string
    gradientTo: string
    accentColor: string
    testPath: string
    isNew?: boolean
    isPopular?: boolean
    features?: string[]
    tags?: string[]
  }
  onTestStart?: () => void
  
  // 개별 props (config가 없을 때 사용)
  title?: string
  description?: string
  emoji?: string
  category?: string
  estimatedTime?: string
  questionCount?: number
  gradientFrom?: string
  gradientTo?: string
  accentColor?: string
  testPath?: string
  isNew?: boolean
  isPopular?: boolean
  features?: string[]
  tags?: string[]
}

export default function QuizIntroTemplate({
  config,
  onTestStart,
  // 개별 props (config가 없을 때 사용)
  title,
  description,
  emoji,
  category,
  estimatedTime,
  questionCount,
  gradientFrom,
  gradientTo,
  accentColor,
  testPath,
  isNew = false,
  isPopular = false,
  features = [],
  tags = []
}: QuizIntroTemplateProps) {
  // config가 있으면 config의 값들을 사용, 없으면 개별 props 사용
  const finalTitle = config?.name || title || '퀴즈'
  const finalDescription = config?.description || description || '재미있는 성격 테스트'
  const finalEmoji = config?.emoji || emoji || '🎯'
  const finalCategory = config?.category || category || '성격'
  const finalEstimatedTime = config?.estimatedTime || estimatedTime || '5분'
  const finalQuestionCount = config?.questionCount || questionCount || 12
  const finalGradientFrom = config?.gradientFrom || gradientFrom || 'from-blue-500'
  const finalGradientTo = config?.gradientTo || gradientTo || 'to-indigo-600'
  const finalAccentColor = config?.accentColor || accentColor || 'blue'
  const finalTestPath = config?.testPath || testPath || '/test'
  const finalIsNew = config?.isNew || isNew
  const finalIsPopular = config?.isPopular || isPopular
  const finalFeatures = config?.features || features
  const finalTags = config?.tags || tags
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">{finalEmoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {finalTitle}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {finalDescription}
            </p>
          </motion.div>

          {/* 메인 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <div 
                className={`bg-gradient-to-r ${finalGradientFrom} ${finalGradientTo} p-8 text-white text-center relative`}
              >
                {/* 배지들 */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {finalIsNew && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      NEW
                    </Badge>
                  )}
                  {finalIsPopular && (
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Star className="w-3 h-3 mr-1" />
                      인기
                    </Badge>
                  )}
                </div>

                <div className="text-8xl mb-6">{finalEmoji}</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{finalTitle}</h2>
                <p className="text-xl opacity-90 mb-6">{finalDescription}</p>
                
                {/* 테스트 정보 */}
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                    <Users className="w-4 h-4" />
                    <span>{finalCategory}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                    <Clock className="w-4 h-4" />
                    <span>{finalEstimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                    <span>{finalQuestionCount}문항</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                {/* 특징 */}
                {finalFeatures.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">이 테스트의 특징</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {finalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full bg-${finalAccentColor}-500`}></div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 태그 */}
                {finalTags.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">관련 태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {finalTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* 시작 버튼 */}
                <div className="text-center">
                  <Link href={finalTestPath}>
                    <Button 
                      size="lg" 
                      className={`bg-gradient-to-r ${finalGradientFrom} ${finalGradientTo} hover:opacity-90 text-white text-lg px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105`}
                      onClick={onTestStart}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      테스트 시작하기
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500 mt-3">
                    💡 답변을 선택하면 자동으로 다음 질문으로 이동합니다
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 관련 테스트 추천 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-gray-800">
                  다른 재미있는 테스트들
                </CardTitle>
                <CardDescription className="text-center">
                  더 많은 성격 테스트를 경험해보세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/travel-pack-mbti">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">🎒</div>
                        <h3 className="font-semibold">여행자 맞춤 성격 테스트</h3>
                        <p className="text-sm text-gray-600">여행 짐 싸는 습관으로 보는 성격</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/dessert-style">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">🍰</div>
                        <h3 className="font-semibold">디저트 취향 MBTI</h3>
                        <p className="text-sm text-gray-600">디저트 취향으로 보는 성격</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/photo-style">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">📸</div>
                        <h3 className="font-semibold">사진 찍는 스타일 테스트</h3>
                        <p className="text-sm text-gray-600">사진 촬영 스타일로 보는 성격</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
