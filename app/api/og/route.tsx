import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getResultByType } from '@/data/travelPackConfig'
import { getDessertResult } from '@/data/dessertResults'
import { getPhotoResult } from '@/data/photoResults'
import { getPhoneResult } from '@/data/phoneResults'
import { roomCleaningResults } from '@/data/roomCleaningResults'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const type = (searchParams.get('type') || 'ENFP').toUpperCase()
  let emoji = searchParams.get('emoji') || '🎒'
  const overrideTitle = searchParams.get('title')
  const overrideSummary = searchParams.get('summary')
  const bg = searchParams.get('bg') || 'gradient-blue'
  const testType = searchParams.get('testType') || 'travel-pack'
  const question = searchParams.get('question')

  const backgroundGradients = {
    'gradient-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'gradient-pink': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'gradient-orange': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'gradient-green': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'gradient-gray': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'warm-gradient': 'linear-gradient(135deg, #FFB86C 0%, #FF8A80 100%)',
    'candy-pop': 'linear-gradient(135deg, #FF7EB6 0%, #FF6B9D 100%)',
    'steel-blue': 'linear-gradient(135deg, #4B6BFB 0%, #3B5BDB 100%)',
    'neon-dark': 'linear-gradient(135deg, #8A8AFF 0%, #6B6BFF 100%)',
    'soft-pink': 'linear-gradient(135deg, #FF9EC1 0%, #FF8AB3 100%)',
    'sunset-glow': 'linear-gradient(135deg, #FFC65A 0%, #FFB84D 100%)',
    'clean-white': 'linear-gradient(135deg, #5AC8FA 0%, #4AB8E9 100%)',
    'lime-flash': 'linear-gradient(135deg, #9AE66E 0%, #8AE55C 100%)',
    'fog-lilac': 'linear-gradient(135deg, #C1B2FF 0%, #B3A2FF 100%)',
    'dreamy-violet': 'linear-gradient(135deg, #9D7AF0 0%, #8E6CEF 100%)',
    'graphite': 'linear-gradient(135deg, #7B8794 0%, #6B7B8C 100%)',
    'ice-blue': 'linear-gradient(135deg, #7CD4FD 0%, #6CC4ED 100%)',
    'cream': 'linear-gradient(135deg, #F5CBA7 0%, #F5BB97 100%)',
    'sage': 'linear-gradient(135deg, #9AD0B2 0%, #8AC0A2 100%)',
    'navy': 'linear-gradient(135deg, #2F3E46 0%, #1F2E36 100%)',
    'charcoal': 'linear-gradient(135deg, #4E4E50 0%, #3E3E40 100%)',
    // 디저트 테스트용 배경
    'warm-pink': 'linear-gradient(135deg, #FF9EC1 0%, #FF8AB3 100%)',
    'candy-pop': 'linear-gradient(135deg, #FF7EB6 0%, #FF6B9D 100%)',
    'steel-blue': 'linear-gradient(135deg, #4B6BFB 0%, #3B5BDB 100%)',
    'neon-purple': 'linear-gradient(135deg, #8A8AFF 0%, #6B6BFF 100%)',
    'soft-yellow': 'linear-gradient(135deg, #FFC65A 0%, #FFB84D 100%)',
    'sunset-pink': 'linear-gradient(135deg, #FF9EC1 0%, #FF8AB3 100%)',
    'clean-blue': 'linear-gradient(135deg, #5AC8FA 0%, #4AB8E9 100%)',
    'lime-green': 'linear-gradient(135deg, #9AE66E 0%, #8AE55C 100%)',
    'mystic-purple': 'linear-gradient(135deg, #C1B2FF 0%, #B3A2FF 100%)',
    'dreamy-violet': 'linear-gradient(135deg, #9D7AF0 0%, #8E6CEF 100%)',
    'graphite': 'linear-gradient(135deg, #7B8794 0%, #6B7B8C 100%)',
    'ice-blue': 'linear-gradient(135deg, #7CD4FD 0%, #6CC4ED 100%)',
    'warm-cream': 'linear-gradient(135deg, #F5CBA7 0%, #F5BB97 100%)',
    'sage-green': 'linear-gradient(135deg, #9AD0B2 0%, #8AC0A2 100%)',
    'navy-blue': 'linear-gradient(135deg, #2F3E46 0%, #1F2E36 100%)',
    'charcoal': 'linear-gradient(135deg, #4E4E50 0%, #3E3E40 100%)',
    // 질문용 배경
    'blue-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'purple-gradient': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'pink-gradient': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'orange-gradient': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  } as const

  // 질문용 이미지인 경우
  if (question) {
    return new ImageResponse(
      (
        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: backgroundGradients[bg as keyof typeof backgroundGradients] || backgroundGradients['blue-gradient'], position: 'relative', fontFamily: 'Inter, sans-serif' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,.1) 0%, transparent 50%)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px', zIndex: 1 }}>
            <div style={{ fontSize: '80px', lineHeight: 1, marginBottom: '20px' }}>{emoji}</div>
            <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 'bold', margin: '0 0 20px 0', textShadow: '2px 2px 4px rgba(0,0,0,.3)', lineHeight: 1.2, maxWidth: '800px' }}>{question}</h1>
            <div style={{ background: 'rgba(255,255,255,.2)', borderRadius: '15px', padding: '12px 20px', border: '2px solid rgba(255,255,255,.3)', backdropFilter: 'blur(10px)' }}>
              <span style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>테몬 MBTI</span>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' } }
    )
  }

  let result, title, summary

  if (testType === 'dessert-style') {
    const dessertResult = getDessertResult(type as any)
    result = dessertResult
    title = overrideTitle || dessertResult?.title || `${type} 디저트러`
    summary = overrideSummary || dessertResult?.tagline || '디저트를 고르는 순간, 당신의 성격이 드러난다'
  } else if (testType === 'photo-style') {
    const photoResult = getPhotoResult(type as any)
    result = photoResult
    title = overrideTitle || photoResult?.title || `${type} 사진러`
    summary = overrideSummary || photoResult?.tagline || '찰칵! 사진 한 장에도 성격이 보인다'
  } else if (testType === 'phone-style') {
    const phoneResult = getPhoneResult(type as any)
    result = phoneResult
    title = overrideTitle || phoneResult?.title || `${type} 폰유저`
    summary = overrideSummary || phoneResult?.tagline || '스마트폰을 켜는 순간, 당신의 성격이 드러난다'
  } else if (testType === 'conbini') {
    // 편의점 테스트는 별도 결과 데이터가 없으므로 기본값 사용
    title = overrideTitle || `${type} 편의점러`
    summary = overrideSummary || '편의점 쇼핑 습관으로 보는 성격'
  } else if (testType === 'room-cleaning') {
    const roomCleaningResult = roomCleaningResults.find(r => r.type === type)
    if (roomCleaningResult) {
      result = roomCleaningResult
      title = overrideTitle || roomCleaningResult.name
      summary = overrideSummary || roomCleaningResult.summary
      emoji = roomCleaningResult.emoji
    } else {
      title = overrideTitle || `${type} 청소러`
      summary = overrideSummary || '청소 습관으로 보는 성격'
    }
  } else {
    const travelResult = getResultByType(type)
    result = travelResult
    title = overrideTitle || travelResult?.title || `${type} 여행자`
    summary = overrideSummary || travelResult?.tagline || '여행 짐 싸는 습관으로 보는 성격'
  }

  const backgroundStyle = backgroundGradients[bg as keyof typeof backgroundGradients] || backgroundGradients['gradient-blue']

  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: backgroundStyle, position: 'relative', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,.1) 0%, transparent 50%)' }} />
        <div style={{ display: 'flex', width: '100%', padding: '60px', zIndex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '120px', lineHeight: 1 }}>{emoji}</div>
            <div style={{ background: 'rgba(255,255,255,.2)', borderRadius: '20px', padding: '12px 24px', border: '2px solid rgba(255,255,255,.3)', backdropFilter: 'blur(10px)' }}>
              <span style={{ color: 'white', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px' }}>{type}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1, margin: '0 40px' }}>
            <h1 style={{ color: 'white', fontSize: '64px', fontWeight: 'bold', margin: '0 0 20px 0', textShadow: '2px 2px 4px rgba(0,0,0,.3)', lineHeight: 1.1 }}>{title}</h1>
            <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '32px', margin: 0, textShadow: '1px 1px 2px rgba(0,0,0,.3)', lineHeight: 1.3 }}>{summary}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(255,255,255,.2)', borderRadius: '15px', padding: '16px 20px', border: '2px solid rgba(255,255,255,.3)', backdropFilter: 'blur(10px)' }}>
              <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>테몬 MBTI</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,.8)', fontSize: '18px' }}>temon.kr</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' } }
  )
}



