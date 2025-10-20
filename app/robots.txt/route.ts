import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# 사이트맵
Sitemap: https://www.temon.kr/api/sitemap

# RSS 피드
Sitemap: https://www.temon.kr/api/rss

# 관리자 페이지 차단
Disallow: /admin/
Disallow: /api/

# 검색 엔진 최적화
Crawl-delay: 1

# 허용된 봇들
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: NaverBot
Allow: /

User-agent: DaumBot
Allow: /`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}
