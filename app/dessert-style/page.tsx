"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { trackPageVisit, trackTestStart } from "@/lib/analytics"
import Link from "next/link"
import { 
  ArrowRight, 
  Heart, 
  Coffee, 
  Cake,
  Sparkles,
  Users,
  Star,
  Zap
} from "lucide-react"

export default function DessertStyleIntroPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    trackPageVisit("dessert-style", window.location.pathname)
  }, [])

  const handleStartTest = () => {
    trackTestStart("dessert-style", window.location.pathname)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* 메인 헤더 */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="text-6xl animate-bounce">🍰</div>
              <div className="text-6xl animate-pulse">☕</div>
              <div className="text-6xl animate-bounce delay-300">🍪</div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              디저트를 고르는 순간,<br />
              당신의 성격이 드러난다 🍩
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              달콤함 속에도 개성이 있다!<br />
              당신의 디저트 취향으로 알아보는 나의 성격 유형 🍰
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-pink-100 text-pink-700">
                🍰 달콤한 취향
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-purple-100 text-purple-700">
                ☕ 카페 문화
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2 bg-indigo-100 text-indigo-700">
                🍪 MBTI 성격
              </Badge>
            </div>
          </div>

          {/* 테스트 소개 카드 */}
          <Card className="mb-12 border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                🍮 테스트 시작하기
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                12개의 간단한 질문으로 당신만의 디저트 성격을 발견해보세요!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/dessert-style/test">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={handleStartTest}
                >
                  🍮 테스트 시작하기
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 테스트 특징 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">빠른 테스트</h3>
              <p className="text-gray-600">12문항, 3분이면 완료!</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">정확한 분석</h3>
              <p className="text-gray-600">MBTI 기반 과학적 결과</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
              <div className="text-4xl mb-4">🍰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">맞춤 추천</h3>
              <p className="text-gray-600">나에게 어울리는 디저트</p>
            </Card>

            <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">공유하기</h3>
              <p className="text-gray-600">친구들과 결과 공유</p>
            </Card>
          </div>

          {/* 디저트 유형 미리보기 */}
          <Card className="mb-12 border-0 shadow-xl bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
                🍩 16가지 디저트 성격 유형
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                당신은 어떤 디저트러일까요?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">🎈</div>
                  <p className="font-semibold text-sm">즉흥 스위트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">🤝</div>
                  <p className="font-semibold text-sm">배려 디저트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">🧱</div>
                  <p className="font-semibold text-sm">완벽 디저트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">🧪</div>
                  <p className="font-semibold text-sm">실험 디저트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">😊</div>
                  <p className="font-semibold text-sm">함께 먹는 디저트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">📸</div>
                  <p className="font-semibold text-sm">감성 디저트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">📋</div>
                  <p className="font-semibold text-sm">실속 디저트러</p>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="font-semibold text-sm">빠른 결정러</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 바이럴 문구 예시 */}
          <Card className="mb-12 border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
                💬 바이럴 문구 예시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white/70 rounded-lg border-l-4 border-pink-400">
                  <p className="text-gray-700 font-medium">
                    "나는 🍫 감성 초코러(INFP)! 달콤함 속에 철학이 있지 🍫"
                  </p>
                </div>
                <div className="p-4 bg-white/70 rounded-lg border-l-4 border-purple-400">
                  <p className="text-gray-700 font-medium">
                    "디저트 취향에도 성격이 숨어있다면? 🍩"
                  </p>
                </div>
                <div className="p-4 bg-white/70 rounded-lg border-l-4 border-indigo-400">
                  <p className="text-gray-700 font-medium">
                    "나는 🎈 즉흥 스위트러(ENFP)! 오늘은 어떤 달콤함이 기다릴까? 🍩"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA 버튼들 */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dessert-style/test">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xl px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
                  onClick={handleStartTest}
                >
                  🍮 테스트 시작하기
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              
              <Link href="/tests">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 text-xl px-8 py-6 rounded-2xl w-full sm:w-auto"
                >
                  다른 테스트 보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
