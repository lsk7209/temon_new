"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { trackPageVisit, trackClick } from "@/lib/analytics"
import { generateStructuredData } from "@/lib/seo"
import { 
  ShoppingCart, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Sparkles,
  Coffee,
  Cookie,
  Milk,
  Candy,
  Sandwich,
  IceCream
} from "lucide-react"

export default function ConbiniIntroPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    trackPageVisit("conbini-intro", window.location.pathname)
  }, [])

  const handleStartTest = () => {
    trackClick("start_test", window.location.pathname)
  }

  // JSON-LD 구조화된 데이터
  const structuredData = generateStructuredData('webPage', {
    title: "편의점 장바구니 성격 테스트",
    description: "편의점에서 고르는 선택으로 성격 유형을 분석합니다. 간편식/디저트/커피/핫바/건강템 취향까지 한 번에. 2분 완성, 16유형 결과.",
    slug: "conbini",
    keywords: "편의점, 장바구니, 성격테스트, MBTI, 야식, 간편식, 디저트, 커피, 핫바, 건강템",
  });

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 min-h-screen">
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <div className="container mx-auto px-4 py-12">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-6xl mb-6">
              <ShoppingCart className="mx-auto text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              편의점 장바구니로 보는 내 성격
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              늦은 밤, 당신의 손이 향한 그 제품. 이유가 있다면?
            </p>
          </div>
        </div>

        {/* 제품 이모지 애니메이션 */}
        <div className="flex justify-center items-center mb-12">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { icon: Coffee, delay: 0 },
              { icon: Cookie, delay: 200 },
              { icon: Milk, delay: 400 },
              { icon: Candy, delay: 600 },
              { icon: Sandwich, delay: 800 },
              { icon: IceCream, delay: 1000 }
            ].map(({ icon: Icon, delay }, index) => (
              <div
                key={index}
                className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-1000 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <Icon className="w-8 h-8 text-orange-500" />
              </div>
            ))}
          </div>
        </div>

        {/* 메인 카드 */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-xl">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center gap-4 mb-6">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                12문항
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                2분
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                16유형 결과
              </Badge>
            </div>
            <CardTitle className="text-2xl mb-4">편의점에서 고르는 선택으로 성격 유형을 분석합니다</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              간편식/디저트/커피/핫바/건강템 취향까지 한 번에. 2분 완성, 16유형 결과.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <Link href="/conbini/test">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={handleStartTest}
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                🛒 테스트 시작
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* 특징 소개 */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <Card className="text-center">
            <CardHeader>
              <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <CardTitle>신상 탐험</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                한정/협업/신메뉴에 유독 약한 당신의 선택 패턴을 분석합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Coffee className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>루틴 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                늘 먹던 그 조합부터 실험적 조합까지, 당신의 라이프스타일을 파악합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Users className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <CardTitle>케미 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                동행과의 케미, 상황별 선택 패턴으로 당신의 성격 유형을 찾아드립니다.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 신뢰 배지 */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-700 font-medium">12문항 · 2분 · 16유형 결과</span>
          </div>
        </div>
      </div>
    </div>
  )
}
