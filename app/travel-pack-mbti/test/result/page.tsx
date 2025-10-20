"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getResultByType, getCompanionSuggestion } from "@/data/travelPackConfig"
import { generateStructuredData } from "@/lib/seo"
import { trackTestComplete, trackResultView, trackShare, trackClick } from "@/lib/analytics"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Share2, 
  Copy, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle, 
  Heart, 
  Users, 
  Lightbulb,
  MapPin,
  Camera,
  Coffee
} from "lucide-react"

export default function TravelPackResultPage() {
  const [result, setResult] = useState<any>(null)
  const [companions, setCompanions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [shareText, setShareText] = useState("")
  const [showCopied, setShowCopied] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      const resultData = getResultByType(type)
      if (resultData) {
        setResult(resultData)
        setShareText(resultData.shareText)
        setCompanions(getCompanionSuggestion(resultData.type))
        
        // 결과 페이지 조회 추적
        trackResultView("travel-pack-mbti", type, window.location.pathname)
        trackTestComplete("travel-pack-mbti", type, window.location.pathname)
      }
      setIsLoading(false)
    } else {
      router.push('/travel-pack-mbti')
    }
  }, [searchParams, router])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = result?.title || "여행 짐 싸는 스타일 테스트"
    const text = shareText

    trackShare("travel-pack-mbti", platform, result?.type, window.location.pathname)

    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(`${text}\n${url}`)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
        break
      case 'kakao':
        // 카카오톡 공유 (실제 구현 시 Kakao SDK 필요)
        alert("카카오톡 공유 기능은 준비 중입니다!")
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
    }
  }

  const handleRetakeTest = () => {
    trackClick("travel_pack_retake", window.location.pathname)
    router.push('/travel-pack-mbti/test')
  }

  const handleOtherTests = () => {
    trackClick("travel_pack_other_tests", window.location.pathname)
    router.push('/tests')
  }

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

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">결과를 찾을 수 없습니다</h2>
            <p className="text-gray-600 mb-4">테스트를 다시 진행해주세요.</p>
            <Button onClick={() => router.push('/travel-pack-mbti/test')}>
              테스트 다시하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      {/* 구조화된 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData('result', {
            testTitle: "여행 짐 싸는 스타일 테스트",
            testSlug: "travel-pack-mbti",
            resultType: result.type,
            description: result.description
          }))
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* 결과 헤더 */}
        <Card className="mb-8 overflow-hidden">
          <div className={`bg-gradient-to-r ${result.color || 'from-blue-500 to-purple-600'} p-8 text-white text-center`}>
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{result.title}</h1>
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              {result.type}
            </Badge>
            <p className="text-xl mt-4 opacity-90">{result.tagline}</p>
          </div>
          
          {/* OG 이미지 미리보기 */}
          <div className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">공유용 이미지</h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  {showCopied ? '복사됨!' : '복사'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('kakao')}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  카카오
                </Button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={`/api/og?type=${result.type}&title=${encodeURIComponent(result.title)}&summary=${encodeURIComponent(result.tagline)}&emoji=${result.emoji}&bg=${result.og.bg}`}
                alt={`${result.title} 결과 이미지`}
                className="w-full h-auto"
                style={{ aspectRatio: '1200/630' }}
              />
            </div>
          </div>
        </Card>

        {/* 결과 설명 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              나만의 여행 스타일
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
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              나만의 여행 키워드
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

        {/* 여행 파트너 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              나와 찰떡 여행 파트너
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companions.map((companion, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{companion.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{companion.title}</h4>
                      <Badge variant="outline" className="text-xs">{companion.type}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{companion.reason}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              💡 이 유형들과 함께 여행하면 서로의 장점을 보완하며 더 즐거운 여행을 할 수 있어요!
            </p>
          </CardContent>
        </Card>

        {/* 여행 팁 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              나만의 짐싸기 팁
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.packingTips.map((tip: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 핵심 체크리스트 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              핵심 챙김템 TOP 3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.checklistTop3.map((item: string, index: number) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">#{index + 1}</div>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 추천 여행지 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              나에게 맞는 여행지
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🇰🇷 국내 여행
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.idealDestinations.domestic.map((destination: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🌏 아시아 여행
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.idealDestinations.asia.map((destination: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🌍 글로벌 여행
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.idealDestinations.global.map((destination: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {destination}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 공유 섹션 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-500" />
              결과 공유하기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">공유 텍스트:</p>
                <p className="text-gray-800 font-medium">{shareText}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-4 w-4" />
                  링크 복사
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('kakao')}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  카카오톡
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  트위터
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  페이스북
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleRetakeTest}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            다시 테스트하기
          </Button>
          
          <Button
            onClick={handleOtherTests}
            size="lg"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            다른 테스트 보기
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>

        {/* 관련 테스트 추천 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-orange-500" />
              다른 재미있는 테스트들
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/coffee-mbti" onClick={() => trackClick("related_test_coffee", window.location.pathname)}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">☕</div>
                    <h3 className="font-semibold">커피 MBTI</h3>
                    <p className="text-sm text-gray-600">커피 취향으로 보는 성격</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/ramen-mbti" onClick={() => trackClick("related_test_ramen", window.location.pathname)}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">🍜</div>
                    <h3 className="font-semibold">라면 MBTI</h3>
                    <p className="text-sm text-gray-600">라면 취향으로 보는 성격</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pet-mbti" onClick={() => trackClick("related_test_pet", window.location.pathname)}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">🐕</div>
                    <h3 className="font-semibold">반려동물 MBTI</h3>
                    <p className="text-sm text-gray-600">반려동물 취향으로 보는 성격</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
