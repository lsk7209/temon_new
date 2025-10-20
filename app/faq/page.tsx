"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateFAQStructuredData } from "@/lib/seo"
import { trackPageVisit, trackClick } from "@/lib/analytics"
import { useEffect } from "react"

const faqs = [
  {
    question: "테몬 MBTI는 무엇인가요?",
    answer: "테몬 MBTI는 MZ세대를 위한 재미있고 직관적인 성격 테스트 플랫폼입니다. 커피, 라면, 반려동물 등 일상적인 주제로 MBTI 성격 유형을 분석해드립니다."
  },
  {
    question: "테스트는 무료인가요?",
    answer: "네, 모든 테스트는 완전 무료입니다. 회원가입 없이도 언제든지 테스트를 진행하실 수 있습니다."
  },
  {
    question: "테스트 결과는 정확한가요?",
    answer: "테몬 MBTI는 심리학 기반의 과학적 분석을 통해 정확한 결과를 제공합니다. 12개의 질문으로 E/I, S/N, T/F, J/P 4차원을 균형있게 측정합니다."
  },
  {
    question: "테스트 결과를 공유할 수 있나요?",
    answer: "네, 테스트 결과는 소셜 미디어를 통해 쉽게 공유하실 수 있습니다. 친구들과 함께 재미있게 비교해보세요!"
  },
  {
    question: "새로운 테스트는 언제 추가되나요?",
    answer: "정기적으로 새로운 테스트를 추가하고 있습니다. 최신 소식을 받아보시려면 뉴스레터에 구독해주세요."
  },
  {
    question: "모바일에서도 사용할 수 있나요?",
    answer: "네, 테몬 MBTI는 모바일 우선으로 설계되어 있습니다. 스마트폰, 태블릿, 데스크톱 모든 기기에서 최적화된 경험을 제공합니다."
  },
  {
    question: "개인정보는 안전한가요?",
    answer: "개인정보 보호를 최우선으로 생각합니다. 테스트 결과는 개인 식별이 불가능한 형태로만 저장되며, 제3자와 공유되지 않습니다."
  },
  {
    question: "테스트 결과를 저장할 수 있나요?",
    answer: "현재는 테스트 결과를 임시로만 저장합니다. 향후 계정 기능을 통해 결과를 영구 저장할 수 있는 기능을 준비 중입니다."
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  useEffect(() => {
    trackPageVisit(window.location.pathname)
  }, [])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
    trackClick(`faq_toggle_${index}`, window.location.pathname)
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      <div className="container mx-auto px-4 py-16">
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQStructuredData(faqs))
          }}
        />

        {/* 헤더 */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 px-6 py-2 text-lg">
            ❓ 자주 묻는 질문
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FAQ
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            테몬 MBTI에 대해 궁금한 점들을 모았습니다
          </p>
        </div>

        {/* FAQ 목록 */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="text-gray-900">{faq.question}</span>
                  <span className="text-2xl text-gray-400">
                    {openItems.includes(index) ? '−' : '+'}
                  </span>
                </CardTitle>
              </CardHeader>
              {openItems.includes(index) && (
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* 추가 문의 */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                더 궁금한 점이 있으신가요?
              </h3>
              <p className="text-gray-600 mb-6">
                FAQ에서 답을 찾지 못하셨다면 언제든지 문의해주세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => trackClick('contact_email', window.location.pathname)}
                >
                  📧 이메일 문의
                </button>
                <button 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => trackClick('contact_social', window.location.pathname)}
                >
                  💬 소셜 미디어
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
