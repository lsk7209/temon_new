"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateAEOContent } from "@/lib/seo"
import { ALL_TESTS } from "@/lib/tests-config"
import { trackPageVisit, trackClick, trackSearch } from "@/lib/analytics"
import Link from "next/link"
import { Search, HelpCircle, Lightbulb } from "lucide-react"

const qnaData = [
  {
    question: "MBTI 테스트는 어떻게 작동하나요?",
    answer: "MBTI는 4가지 차원(E/I, S/N, T/F, J/P)으로 성격을 분석합니다. 각 차원에서 12개의 질문을 통해 균형있게 측정하여 정확한 성격 유형을 도출합니다.",
    relatedTests: ["coffee-mbti", "ramen-mbti", "pet-mbti"],
    category: "기본"
  },
  {
    question: "커피 MBTI와 일반 MBTI의 차이점은 무엇인가요?",
    answer: "커피 MBTI는 커피 취향을 통해 성격을 분석하는 재미있는 방식입니다. 일반 MBTI와 동일한 4차원 분석을 사용하지만, 일상적인 커피 선택을 통해 더 직관적으로 성격을 파악할 수 있습니다.",
    relatedTests: ["coffee-mbti", "ramen-mbti", "study-mbti"],
    category: "테스트"
  },
  {
    question: "테스트 결과가 정확하지 않다면 어떻게 하나요?",
    answer: "MBTI는 성격의 한 측면을 보여주는 도구입니다. 결과가 예상과 다르다면 다른 테스트도 시도해보시거나, 시간을 두고 다시 테스트해보세요. 성격은 고정적이지 않고 상황에 따라 변할 수 있습니다.",
    relatedTests: ["pet-mbti", "alarm-habit", "study-mbti"],
    category: "결과"
  },
  {
    question: "무료로 사용할 수 있나요?",
    answer: "네, 테몬 MBTI의 모든 테스트는 완전 무료입니다. 회원가입이나 결제 없이 언제든지 자유롭게 이용하실 수 있습니다.",
    relatedTests: ["coffee-mbti", "ramen-mbti", "pet-mbti", "study-mbti"],
    category: "이용"
  },
  {
    question: "모바일에서도 잘 작동하나요?",
    answer: "테몬 MBTI는 모바일 우선으로 설계되어 있습니다. 스마트폰, 태블릿, 데스크톱 모든 기기에서 최적화된 사용자 경험을 제공합니다.",
    relatedTests: ["coffee-mbti", "ramen-mbti", "pet-mbti"],
    category: "기술"
  },
  {
    question: "테스트 결과를 공유할 수 있나요?",
    answer: "네, 테스트 결과는 소셜 미디어를 통해 쉽게 공유하실 수 있습니다. 친구들과 함께 재미있게 비교해보세요!",
    relatedTests: ["coffee-mbti", "ramen-mbti", "pet-mbti", "study-mbti"],
    category: "공유"
  }
]

export default function QnAPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredQnA, setFilteredQnA] = useState(qnaData)
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const categories = ["전체", "기본", "테스트", "결과", "이용", "기술", "공유"]

  useEffect(() => {
    trackPageVisit(window.location.pathname)
  }, [])

  useEffect(() => {
    let filtered = qnaData

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
      trackSearch(searchTerm, window.location.pathname)
    }

    if (selectedCategory !== "전체") {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredQnA(filtered)
  }, [searchTerm, selectedCategory])

  const handleQuestionClick = (question: string) => {
    trackClick(`qna_question_${question}`, window.location.pathname)
  }

  const handleTestClick = (testId: string) => {
    trackClick(`qna_related_test_${testId}`, window.location.pathname)
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 px-6 py-2 text-lg">
            💡 질문과 답변
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Q&A
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            테몬 MBTI에 대해 궁금한 모든 것을 찾아보세요
          </p>
        </div>

        {/* 검색 및 필터 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="궁금한 것을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Q&A 목록 */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredQnA.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle 
                      className="text-lg text-gray-900 cursor-pointer hover:text-purple-600 transition-colors"
                      onClick={() => handleQuestionClick(item.question)}
                    >
                      <HelpCircle className="inline w-5 h-5 mr-2 text-purple-500" />
                      {item.question}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {item.answer}
                </p>
                
                {/* 관련 테스트 */}
                <div className="border-t pt-4">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">관련 테스트</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.relatedTests.map(testId => {
                      const test = ALL_TESTS.find(t => t.id === testId)
                      if (!test) return null
                      
                      return (
                        <Link 
                          key={testId}
                          href={`/${testId}`}
                          onClick={() => handleTestClick(testId)}
                        >
                          <Badge 
                            variant="secondary" 
                            className="cursor-pointer hover:bg-purple-100 transition-colors"
                          >
                            {test.title}
                          </Badge>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 검색 결과가 없을 때 */}
        {filteredQnA.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              다른 키워드로 검색해보시거나 카테고리를 변경해보세요
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("전체")
              }}
              variant="outline"
            >
              전체 보기
            </Button>
          </div>
        )}

        {/* 추가 문의 */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                원하는 답을 찾지 못하셨나요?
              </h3>
              <p className="text-gray-600 mb-6">
                더 궁금한 점이 있으시면 언제든지 문의해주세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => trackClick('contact_email', window.location.pathname)}
                >
                  📧 이메일 문의
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => trackClick('contact_social', window.location.pathname)}
                >
                  💬 소셜 미디어
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
