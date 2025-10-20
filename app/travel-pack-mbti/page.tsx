"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateStructuredData } from "@/lib/seo"
import { trackPageVisit, trackClick } from "@/lib/analytics"
import Link from "next/link"
import { ArrowRight, Users, Clock, Star, CheckCircle, HelpCircle, Share2, Heart } from "lucide-react"



const features = [
  {
    icon: "🎒",
    title: "12문항 간단 테스트",
    description: "짐 싸는 습관만으로 정확한 성격 분석"
  },
  {
    icon: "✈️",
    title: "여행자 맞춤 결과",
    description: "16가지 여행자 유형으로 나만의 스타일 발견"
  },
  {
    icon: "🤝",
    title: "여행 파트너 추천",
    description: "찰떡궁합 여행 동반자 유형까지 알려드려요"
  },
  {
    icon: "💡",
    title: "실용적인 여행 팁",
    description: "나만의 성격에 맞는 여행 준비 가이드"
  }
]

const faqs = [
  {
    question: "테스트는 무료인가요?",
    answer: "네, 완전 무료입니다. 회원가입 없이도 언제든지 테스트할 수 있어요."
  },
  {
    question: "결과를 공유할 수 있나요?",
    answer: "네, 결과는 소셜 미디어를 통해 쉽게 공유할 수 있습니다. 친구들과 함께 비교해보세요!"
  },
  {
    question: "테스트 결과는 정확한가요?",
    answer: "심리학 기반의 과학적 분석을 통해 정확한 결과를 제공합니다. 12개의 질문으로 4차원을 균형있게 측정해요."
  },
  {
    question: "여행 관련 테스트만 있나요?",
    answer: "아니요, 커피, 라면, 반려동물 등 다양한 주제의 MBTI 테스트가 더 있어요!"
  }
]

export default function TravelPackMBTIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    trackPageVisit(window.location.pathname)
  }, [])

  const handleStartTest = () => {
    trackClick("travel_pack_test_start", window.location.pathname)
  }

  const handleFaqToggle = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
    trackClick(`travel_pack_faq_${index}`, window.location.pathname)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('test', {
            title: "여행 짐 싸는 스타일 테스트",
            description: "여행 전날 밤, 당신의 캐리어는 이미 성격을 말하고 있어요. 짐 싸는 습관으로 알아보는 MBTI 16유형",
            slug: "travel-pack-mbti"
          }))
        }}
      />

      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-6 py-2 text-lg">
            🎒 여행자 맞춤 성격 테스트
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            여행 짐 싸는 방식에도<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              성격이 있다면?
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            비행 전날 밤, 당신의 캐리어는 이미 성격을 말하고 있어요 🎒<br />
            <span className="text-lg text-gray-500">12문항으로 알아보는 나만의 여행자 유형</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/travel-pack-mbti/test">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={handleStartTest}
              >
                <span className="mr-2">🎒</span>
                테스트 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>15,000+ 참여</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>약 3분</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>4.8/5</span>
              </div>
            </div>
          </div>

          {/* 시각적 요소 */}
          <div className="flex justify-center items-center gap-8 mb-12">
            <div className="text-6xl animate-bounce">✈️</div>
            <div className="text-8xl animate-pulse">🎒</div>
            <div className="text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>🗺️</div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            왜 여행 짐 싸는 스타일 테스트일까요?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 테스트 미리보기 */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            이런 질문들로 알아봐요
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="text-2xl mb-4">🌙</div>
              <h3 className="font-semibold mb-2">여행 전날 밤, 당신은?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>이미 다 챙겨놨다</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>아침에 급히 챙긴다</span>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="text-2xl mb-4">🎒</div>
              <h3 className="font-semibold mb-2">캐리어를 열면?</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>카테고리별 정리 완료</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>이게 왜 여기 있지?</span>
                </div>
              </div>
            </Card>
          </div>
          
          <p className="text-gray-600 mb-8">
            총 12개의 질문으로 E/I, S/N, T/F, J/P 4차원을 균형있게 측정합니다
          </p>
          
          <Link href="/travel-pack-mbti/test">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              onClick={handleStartTest}
            >
              <span className="mr-2">🚀</span>
              지금 시작하기
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ 섹션 */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            자주 묻는 질문
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleFaqToggle(index)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-500" />
                      {faq.question}
                    </span>
                    <span className="text-2xl text-gray-400">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </CardTitle>
                </CardHeader>
                {openFaq === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            나만의 여행자 유형을 발견해보세요
          </h2>
          <p className="text-xl mb-8 opacity-90">
            짐 싸는 습관만으로도 당신의 성격을 정확히 분석할 수 있어요
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/travel-pack-mbti/test">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={handleStartTest}
              >
                <span className="mr-2">🎒</span>
                테스트 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>무료</span>
              </div>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                <span>공유 가능</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>3분 완료</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
