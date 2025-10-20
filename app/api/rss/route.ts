import { NextResponse } from 'next/server'
import { ALL_TESTS } from '@/lib/tests-config'

export async function GET() {
  const baseUrl = 'https://www.temon.kr'
  const currentDate = new Date().toUTCString()

  // 최신 테스트들을 RSS 아이템으로 변환
  const rssItems = ALL_TESTS
    .filter(test => test.popular || test.new)
    .slice(0, 10) // 최신 10개만
    .map(test => {
      const pubDate = new Date().toUTCString()
      const description = `${test.description} ${test.title}로 알아보는 나만의 성격 유형을 발견해보세요.`
      
      return `  <item>
    <title>${test.title} - 테몬 MBTI</title>
    <link>${baseUrl}/${test.id}</link>
    <description><![CDATA[${description}]]></description>
    <pubDate>${pubDate}</pubDate>
    <guid isPermaLink="true">${baseUrl}/${test.id}</guid>
    <category>${test.category}</category>
    <dc:creator>테몬 MBTI 팀</dc:creator>
  </item>`
    }).join('\n')

  // RSS 피드 XML 생성
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>테몬 MBTI - 나만의 성격 유형 테스트</title>
    <link>${baseUrl}</link>
    <description>커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트</description>
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
    <managingEditor>admin@temon.kr (테몬 MBTI 팀)</managingEditor>
    <webMaster>admin@temon.kr (테몬 MBTI 팀)</webMaster>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>테몬 MBTI</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
${rssItems}
  </channel>
</rss>`

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
