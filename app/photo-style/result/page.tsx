"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPhotoResult, PhotoType, MBTI } from "@/data/photoResults"
import { trackTestComplete, trackResultView, trackShare, trackClick } from "@/lib/analytics"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Share2,
  Copy,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Camera,
  Lightbulb,
  MapPin,
  AlertCircle
} from "lucide-react"
import { generateStructuredData } from "@/lib/seo"

export default function PhotoResultPage() {
  const [result, setResult] = useState<PhotoType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [shareText, setShareText] = useState("")
  const [showCopied, setShowCopied] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const type = searchParams.get('type')
    if (type) {
      const resultData = getPhotoResult(type)
      if (resultData) {
        setResult(resultData)
        setShareText(resultData.shareText)

        // 결과 페이지 조회 추적
        trackResultView("photo-style", type, window.location.pathname)
        trackTestComplete("photo-style", type, window.location.pathname)
      }
      setIsLoading(false)
    } else {
      router.push('/photo-style')
    }
  }, [searchParams, router])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = result?.title || "사진 스타일 테스트"
    const description = result?.tagline || "찰칵! 사진 한 장에도 성격이 보인다"

    trackShare("photo-style", result?.type || "unknown", platform)

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
        <Link href="/photo-style">
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
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
    slug: `photo-style/test/result?type=${result.type}`,
    imageUrl: `/api/og?testType=photo-style&type=${result.type}&title=${encodeURIComponent(result.title)}&summary=${encodeURIComponent(result.tagline)}&emoji=${result.emoji}&bg=${result.og.bg}`,
    keywords: result.hashtags.join(', '),
    resultType: result.type,
    resultSummary: result.summary.join(' '),
  });

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-12 px-4">
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
          <div className={`bg-gradient-to-r ${result.color || 'from-purple-500 to-pink-600'} p-8 text-white text-center`}>
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
                <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
                  {showCopied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {showCopied ? "복사됨!" : "링크 복사"}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleShare("kakao")}>
                  <Share2 className="h-4 w-4" />
                  카카오
                </Button>
              </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <img
                  src={`/api/og?type=${result.type}&title=${encodeURIComponent(result.title)}&summary=${encodeURIComponent(result.tagline)}&emoji=${result.emoji}&bg=${result.og.bg}&testType=photo-style`}
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
              <Camera className="h-5 w-5 text-purple-500" />
              나만의 사진 스타일
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
              나만의 사진 키워드
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

        {/* 추천 촬영 스타일 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              나에게 찰떡궁합 촬영 스타일
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendedStyle.map((item: string, index: number) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">#{index + 1}</div>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 주의 포인트 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              이것만 조심하면 완벽!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.cautionPoints.map((point: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
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
              내 사진 스타일을 친구들에게 공유하고 함께 촬영의 즐거움을 나눠보세요!
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
          <Link href="/photo-style">
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-purple-500 text-purple-600 hover:bg-purple-50">
              <RotateCcw className="mr-2 h-5 w-5" />
              다시 테스트하기
            </Button>
          </Link>
          <Link href="/tests">
            <Button size="lg" className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white">
              다른 테스트 보러가기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
