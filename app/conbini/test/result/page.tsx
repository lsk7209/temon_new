"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RESULT_PRESETS } from "@/data/conbiniResults"
import { trackResultView, trackShare, trackClick } from "@/lib/analytics"
import { generateStructuredData } from "@/lib/seo"
import { 
  ShoppingCart, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Copy, 
  CheckCircle,
  Heart,
  Users,
  Lightbulb,
  MapPin,
  Clock,
  Coffee,
  Cookie,
  Moon
} from "lucide-react"

export default function ConbiniResultPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shareText, setShareText] = useState("")
  const [showCopied, setShowCopied] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      const resultData = RESULT_PRESETS[type as keyof typeof RESULT_PRESETS]
      if (resultData) {
        setResult(resultData)
        setShareText(resultData.shareText)
        
        // 결과 페이지 조회 추적
        trackResultView("conbini-basket", type, window.location.pathname)
      }
      setIsLoading(false)
    } else {
      router.push('/conbini')
    }
  }, [searchParams, router])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = result?.title || "편의점 장바구니 성격 테스트"
    const description = result?.tagline || "편의점에서 고르는 선택으로 성격 유형을 분석합니다"

    trackShare("conbini-basket", result?.type || "unknown", platform)

    if (platform === "kakao") {
      // 카카오톡 공유 (실제 구현 시 Kakao SDK 필요)
      alert("카카오톡 공유 기능은 실제 서비스에서 SDK 연동 후 작동합니다.")
      console.log(`카카오톡 공유: ${shareText} ${url}`)
    } else if (platform === "copy") {
      navigator.clipboard.writeText(`${shareText} ${url}`)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } else {
      // 기타 플랫폼 (X, Facebook 등)
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
        <Link href="/conbini">
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
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
    slug: `conbini/test/result?type=${result.type}`,
    imageUrl: `/api/og?type=${result.type}&title=${encodeURIComponent(result.title)}&summary=${encodeURIComponent(result.tagline)}&emoji=${result.emoji}&bg=${result.og.bg}`,
    keywords: result.hashtags.join(', '),
    resultType: result.type,
    resultSummary: result.summary.join(' '),
  });

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 py-12 px-4">
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
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white text-center relative">
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
              <ShoppingCart className="h-5 w-5 text-orange-500" />
              나만의 편의점 스타일
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

        {/* 추천 카테고리 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              나에게 맞는 추천 카테고리
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.recCategories.map((category: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {category}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 베스트 조합 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              나만의 베스트 조합
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.bestCombos.map((combo: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{combo}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 시간대별 추천 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              시간대별 추천
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Coffee className="h-4 w-4" />
                  아침
                </h4>
                <div className="space-y-1">
                  {result.daypart.morning.map((item: string, index: number) => (
                    <p key={index} className="text-sm text-gray-600">• {item}</p>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Cookie className="h-4 w-4" />
                  오후
                </h4>
                <div className="space-y-1">
                  {result.daypart.afternoon.map((item: string, index: number) => (
                    <p key={index} className="text-sm text-gray-600">• {item}</p>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  저녁
                </h4>
                <div className="space-y-1">
                  {result.daypart.night.map((item: string, index: number) => (
                    <p key={index} className="text-sm text-gray-600">• {item}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 상권별 팁 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              상권별 꿀팁
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🏢 오피스 상권</h4>
                <p className="text-gray-700">{result.geoTips.office}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🎓 캠퍼스 상권</h4>
                <p className="text-gray-700">{result.geoTips.campus}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🏙️ 도심 상권</h4>
                <p className="text-gray-700">{result.geoTips.downtown}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 공유 섹션 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-purple-500" />
              결과 공유하기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              내 편의점 스타일을 친구들에게 공유하고 함께 쇼핑할 파트너를 찾아보세요!
            </p>
            <div className="flex justify-center">
              <Button onClick={() => handleShare("copy")} className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-8">
                {showCopied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {showCopied ? "링크 복사됨!" : "링크 복사"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 다시하기 및 다른 테스트 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/conbini">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-orange-500 text-orange-600 hover:bg-orange-50">
              <RotateCcw className="mr-2 h-5 w-5" />
              다시 테스트하기
            </Button>
          </Link>
          <Link href="/tests">
            <Button size="lg" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">
              다른 테스트 보러가기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
