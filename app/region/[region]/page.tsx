"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateGeoMetadata, generateStructuredData } from "@/lib/seo"
import { ALL_TESTS } from "@/lib/tests-config"
import { trackPageVisit, trackClick } from "@/lib/analytics"
import Link from "next/link"

interface RegionPageProps {
  params: {
    region: string
  }
}

const regionInfo = {
  'seoul': { name: '서울', emoji: '🏙️', description: '서울시민을 위한 맞춤 테스트' },
  'busan': { name: '부산', emoji: '🌊', description: '부산시민을 위한 맞춤 테스트' },
  'daegu': { name: '대구', emoji: '🏔️', description: '대구시민을 위한 맞춤 테스트' },
  'incheon': { name: '인천', emoji: '✈️', description: '인천시민을 위한 맞춤 테스트' },
  'gwangju': { name: '광주', emoji: '🌾', description: '광주시민을 위한 맞춤 테스트' },
  'daejeon': { name: '대전', emoji: '🔬', description: '대전시민을 위한 맞춤 테스트' },
  'ulsan': { name: '울산', emoji: '🏭', description: '울산시민을 위한 맞춤 테스트' },
  'gyeonggi': { name: '경기도', emoji: '🏘️', description: '경기도민을 위한 맞춤 테스트' },
  'gangwon': { name: '강원도', emoji: '⛰️', description: '강원도민을 위한 맞춤 테스트' },
  'chungbuk': { name: '충청북도', emoji: '🏛️', description: '충청북도민을 위한 맞춤 테스트' },
  'chungnam': { name: '충청남도', emoji: '🌊', description: '충청남도민을 위한 맞춤 테스트' },
  'jeonbuk': { name: '전라북도', emoji: '🌾', description: '전라북도민을 위한 맞춤 테스트' },
  'jeonnam': { name: '전라남도', emoji: '🌊', description: '전라남도민을 위한 맞춤 테스트' },
  'gyeongbuk': { name: '경상북도', emoji: '🏔️', description: '경상북도민을 위한 맞춤 테스트' },
  'gyeongnam': { name: '경상남도', emoji: '🌊', description: '경상남도민을 위한 맞춤 테스트' },
  'jeju': { name: '제주도', emoji: '🏝️', description: '제주도민을 위한 맞춤 테스트' }
}

export default function RegionPage({ params }: RegionPageProps) {
  const [regionData, setRegionData] = useState(regionInfo[params.region as keyof typeof regionInfo])
  const [popularTests, setPopularTests] = useState(ALL_TESTS.filter(test => test.popular))

  useEffect(() => {
    trackPageVisit(window.location.pathname)
  }, [])

  if (!regionData) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">지역을 찾을 수 없습니다</h1>
        <Link href="/" className="text-purple-600 hover:text-purple-700">
          홈으로 돌아가기
        </Link>
      </div>
    )
  }

  const handleTestClick = (testId: string) => {
    trackClick(`region_test_${testId}`, window.location.pathname)
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 via-pink-50 to-cyan-50">
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('website', { 
            tests: popularTests,
            region: regionData.name 
          }))
        }}
      />

      <div className="container mx-auto px-4 py-16">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0 px-6 py-2 text-lg">
            {regionData.emoji} {regionData.name} 지역 맞춤
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {regionData.name} 맞춤 MBTI 테스트
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {regionData.description}. {regionData.name} 지역 특성을 반영한 재미있는 성격 테스트를 경험해보세요.
          </p>
        </div>

        {/* 지역 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">1.2K+</div>
              <div className="text-gray-600">{regionData.name} 참여자</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
              <div className="text-gray-600">평균 만족도</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">완료율</div>
            </CardContent>
          </Card>
        </div>

        {/* 인기 테스트 */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {regionData.name}에서 인기 있는 테스트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTests.slice(0, 6).map((test) => {
              const Icon = test.icon
              return (
                <Card 
                  key={test.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleTestClick(test.id)}
                >
                  <Link href={`/${test.id}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${test.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{test.title}</CardTitle>
                          <CardDescription>{test.category}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{test.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">⭐ {test.rating}</span>
                          <span className="text-sm text-gray-500">👥 {test.participants}</span>
                        </div>
                        {test.badge && (
                          <Badge variant={test.badge === "HOT" ? "destructive" : "default"}>
                            {test.badge}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>

        {/* 지역별 특별 콘텐츠 */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {regionData.name}만의 특별한 테스트
            </h3>
            <p className="text-gray-600 mb-6">
              {regionData.name} 지역의 특색을 반영한 맞춤형 테스트를 준비 중입니다.
            </p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => trackClick('region_notify', window.location.pathname)}
            >
              알림 받기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
