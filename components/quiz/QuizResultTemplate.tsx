"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { trackTestComplete, trackResultView, trackShare, trackClick } from "@/lib/analytics"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Share2,
  Copy,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  MapPin,
  Heart,
  Users
} from "lucide-react"
import { generateStructuredData } from "@/lib/seo"

interface QuizResult {
  type: string
  emoji: string
  title: string
  tagline: string
  summary: string[]
  traits: string[]
  color?: string
  og: {
    bg: string
    icon: string
  }
  shareText: string
  hashtags: string[]
}

interface QuizResultTemplateProps {
  // 기본 정보
  testId: string
  testName: string
  
  // 스타일링
  gradientFrom: string
  gradientTo: string
  
  // 결과 섹션들
  sections?: {
    showTraits?: boolean
    showHabits?: boolean
    showRecommendations?: boolean
    showCompanions?: boolean
    showTips?: boolean
    showDestinations?: boolean
  }
  
  // 커스텀 섹션들
  customSections?: Array<{
    title: string
    icon: React.ReactNode
    content: React.ReactNode
  }>
  
  // 관련 테스트
  relatedTests?: Array<{
    title: string
    description: string
    emoji: string
    href: string
  }>
}

export default function QuizResultTemplate({
  testId,
  testName,
  gradientFrom,
  gradientTo,
  sections = {
    showTraits: true,
    showHabits: false,
    showRecommendations: false,
    showCompanions: false,
    showTips: false,
    showDestinations: false
  },
  customSections = [],
  relatedTests = []
}: QuizResultTemplateProps) {
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shareText, setShareText] = useState("")
  const [showCopied, setShowCopied] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      // 각 테스트별로 결과를 가져오는 로직
      let resultData: QuizResult | null = null
      
      if (testId === 'phone-style') {
        const { getPhoneResult } = require('@/data/phoneResults')
        resultData = getPhoneResult(type)
      } else if (testId === 'photo-style') {
        const { getPhotoResult } = require('@/data/photoResults')
        resultData = getPhotoResult(type)
      } else if (testId === 'dessert-style') {
        const { getDessertResult } = require('@/data/dessertResults')
        resultData = getDessertResult(type)
      } else if (testId === 'conbini') {
        const { getConbiniResult } = require('@/data/conbiniResults')
        resultData = getConbiniResult(type)
      } else if (testId === 'travel-pack-mbti') {
        const { getResultByType } = require('@/data/travelPackConfig')
        resultData = getResultByType(type)
      }
      
      if (resultData) {
        setResult(resultData)
        setShareText(resultData.shareText)

        // 결과 페이지 조회 추적
        trackResultView(testId, type, window.location.pathname)
        trackTestComplete(testId, type, window.location.pathname)
      }
      setIsLoading(false)
    } else {
      router.push(`/${testId}`)
    }
  }, [searchParams, router, testId])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = result?.title || testName

    trackShare(testId, result?.type || "unknown", platform)

    if (platform === "kakao") {
      alert("카카오톡 공유 기능은 실제 서비스에서 SDK 연동 후 작동합니다.")
      console.log(`카카오톡 공유: ${shareText} ${url}`)
    } else if (platform === "copy") {
      navigator.clipboard.writeText(`${shareText} ${url}`)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-lg text-gray-600">결과를 불러오는 중...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">결과를 찾을 수 없습니다.</h1>
        <p className="text-lg text-gray-600 mb-8">테스트를 다시 시작해주세요.</p>
        <Link href={`/${testId}`}>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            테스트 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    )
  }

  // JSON-LD 구조화된 데이터 생성
  const structuredData = generateStructuredData('quizResult', {
    title: result.title,
    description: result.tagline,
    slug: `${testId}/result?type=${result.type}`,
    imageUrl: `/api/og?testType=${testId}&type=${result.type}&title=${encodeURIComponent(result.title)}&summary=${encodeURIComponent(result.tagline)}&emoji=${result.emoji}&bg=${result.og.bg}`,
    keywords: result.hashtags.join(', '),
    resultType: result.type,
    resultSummary: result.summary.join(' '),
  })

  return (
    <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} py-12 px-4`}>
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* 결과 헤더 */}
        <Card className="mb-8 overflow-hidden">
          <div className={`bg-gradient-to-r ${result.color || `${gradientFrom} ${gradientTo}`} p-8 text-white text-center relative`}>
            {/* 텍스트 가독성을 위한 오버레이 */}
            <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4 drop-shadow-lg">{result.emoji}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg text-white">{result.title}</h1>
              <Badge className="bg-white/30 text-white border-white/50 text-lg px-4 py-2 drop-shadow-md">
                {result.type}
              </Badge>
              <p className="text-xl mt-4 opacity-95 drop-shadow-md text-white">{result.tagline}</p>
            </div>
          </div>
        </Card>

        {/* 결과 설명 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-blue-500" />
              나만의 {testName} 스타일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.summary.map((line: string, index: number) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 특징 */}
        {sections.showTraits && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                나만의 키워드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((trait: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                    {trait}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 커스텀 섹션들 */}
        {customSections.map((section, index) => (
          <Card key={index} className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {section.icon}
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {section.content}
            </CardContent>
          </Card>
        ))}

        {/* 공유 섹션 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-500" />
              결과 공유하기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              내 {testName} 스타일을 친구들에게 공유하고 함께 즐거움을 나눠보세요!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleShare("copy")} className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                {showCopied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {showCopied ? "링크 복사됨!" : "링크 복사"}
              </Button>
              <Button onClick={() => handleShare("kakao")} className="bg-yellow-400 text-gray-900 hover:bg-yellow-500">
                <Share2 className="h-4 w-4 mr-2" />
                카카오톡
              </Button>
              <Button onClick={() => handleShare("twitter")} className="bg-blue-400 text-white hover:bg-blue-500">
                <Share2 className="h-4 w-4 mr-2" />
                X (트위터)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 다시하기 및 다른 테스트 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href={`/${testId}`}>
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-blue-500 text-blue-600 hover:bg-blue-50">
              <RotateCcw className="mr-2 h-5 w-5" />
              다시 테스트하기
            </Button>
          </Link>
          <Link href="/tests">
            <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white">
              다른 테스트 보러가기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* 관련 테스트 추천 */}
        {relatedTests.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                다른 재미있는 테스트들
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedTests.map((test, index) => (
                  <Link key={index} href={test.href}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 text-center">
                        <div className="text-3xl mb-2">{test.emoji}</div>
                        <h3 className="font-semibold">{test.title}</h3>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
