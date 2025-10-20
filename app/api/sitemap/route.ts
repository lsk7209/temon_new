import { NextResponse } from 'next/server'
import { ALL_TESTS } from '@/lib/tests-config'

export async function GET() {
  const baseUrl = 'https://www.temon.kr'
  const currentDate = new Date().toISOString()

  // 정적 페이지들
  const staticPages = [
    {
      url: '',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: '/tests',
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/admin',
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.3'
    }
  ]

  // 테스트 페이지들
  const testPages = ALL_TESTS.map(test => ({
    url: `/${test.id}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.8'
  }))

  // 테스트 진행 페이지들
  const testPlayPages = ALL_TESTS.map(test => ({
    url: `/${test.id}/test`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.7'
  }))

  // 모든 페이지 결합
  const allPages = [...staticPages, ...testPages, ...testPlayPages]

  // XML 사이트맵 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
