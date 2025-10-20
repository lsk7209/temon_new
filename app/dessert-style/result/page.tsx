"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getDessertResult, MBTI } from "@/data/dessertResults"
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
  Coffee,
  Cake,
  Sparkles,
  MapPin,
  Star
} from "lucide-react"
import { generateStructuredData } from "@/lib/seo"

export default function DessertStyleResultPage() {
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shareText, setShareText] = useState("")
  const [showCopied, setShowCopied] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      const resultData = getDessertResult(type as MBTI)
      if (resultData) {
        setResult(resultData)
        setShareText(resultData.shareText)
        
        // 결과 페이지 조회 추적
        trackResultView("dessert-style", type, window.location.pathname)
        trackTestComplete("dessert-style", type, window.location.pathname)
      }
      setIsLoading(false)
    } else {
      router.push('/dessert-style')
    }
  }, [searchParams, router])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = result?.title || "디저트 취향 성격 테스트"
    const description = result?.tagline || "디저트를 고르는 순간, 당신의 성격이 드러난다"

    trackShare("dessert-style", result?.type || "unknown", platform)

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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">결과를 찾을 수 없습니다.</h1>
        <p className="text-lg text-gray-600 mb-8">테스트를 다시 시작해주세요.</p>
        <Link href="/dessert-style">
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
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
    slug: `dessert-style/result?type=${result.type}`,
    imageUrl: `/api/og?type=${result.type}&title=${encodeURIComponent(result.title)}&summary=${encodeURIComponent(result.tagline)}&emoji=${result.emoji}&bg=${result.og.bg}`,
    keywords: result.hashtags.join(', '),
    resultType: result.type,
    resultSummary: result.summary.join(' '),
  });

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-12 px-4">
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
          <div className={`bg-gradient-to-r ${result.color || 'from-pink-500 to-purple-600'} p-8 text-white text-center relative`}>
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
              <Cake className="h-5 w-5 text-pink-500" />
              나만의 디저트 성격
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
              <Sparkles className="h-5 w-5 text-yellow-500" />
              나만의 디저트 키워드
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

        {/* 추천 디저트 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              나에게 어울리는 디저트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendedDesserts.map((dessert: string, index: number) => (
                <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg text-center">
                  <div className="text-3xl mb-2">🍰</div>
                  <p className="font-semibold text-gray-900">{dessert}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 카페 스타일 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-brown-500" />
              나에게 어울리는 카페 스타일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
              <p className="text-gray-700 font-medium">{result.cafeStyle}</p>
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
              내 디저트 성격을 친구들에게 공유하고 함께 달콤한 시간을 보내보세요!
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
          <Link href="/dessert-style">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-pink-500 text-pink-600 hover:bg-pink-50">
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
