import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getResultByType } from '@/data/travelPackConfig'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = (searchParams.get('type') || 'ENFP').toUpperCase()
    const emoji = searchParams.get('emoji') || '🎒'
    const overrideTitle = searchParams.get('title')
    const overrideSummary = searchParams.get('summary')
    const bg = searchParams.get('bg') || 'gradient-blue'

    const result = getResultByType(type)
    const title = overrideTitle || result?.title || `${type} 여행자`
    const summary = overrideSummary || result?.summary || '여행 짐 싸는 습관으로 보는 성격'

    // 배경 그라디언트 설정
    const backgroundGradients = {
      'gradient-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'gradient-pink': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'gradient-orange': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'gradient-green': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'gradient-gray': 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    }

    const backgroundStyle = backgroundGradients[bg as keyof typeof backgroundGradients] || backgroundGradients['gradient-blue']

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: backgroundStyle,
            position: 'relative',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {/* 배경 패턴 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* 메인 콘텐츠 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '60px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* 좌측: 이모지와 타입 배지 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <div
                style={{
                  fontSize: '120px',
                  lineHeight: 1,
                }}
              >
                {emoji}
              </div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '12px 24px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                  }}
                >
                  {type}
                </span>
              </div>
            </div>

            {/* 중앙: 타이틀과 요약 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                margin: '0 40px',
              }}
            >
              <h1
                style={{
                  color: 'white',
                  fontSize: '64px',
                  fontWeight: 'bold',
                  margin: '0 0 20px 0',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                  lineHeight: 1.1,
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '32px',
                  margin: '0',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                  lineHeight: 1.3,
                }}
              >
                {summary}
              </p>
            </div>

            {/* 우측: 사이트 로고 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '15px',
                  padding: '16px 20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  테몬 MBTI
                </span>
              </div>
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '18px',
                }}
              >
                temon.kr
              </span>
            </div>
          </div>

          {/* 하단 장식 */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
            }}
          >
            {['✈️', '🎒', '🗺️', '📸', '🌍'].map((icon, index) => (
              <span
                key={index}
                style={{
                  fontSize: '24px',
                  opacity: 0.7,
                  animation: `float ${2 + index * 0.5}s ease-in-out infinite`,
                }}
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
        },
      }
    )
  } catch (error) {
    console.error('OG 이미지 생성 오류:', error)
    
    // 오류 시 기본 이미지 반환
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎒</div>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>여행 짐 싸는 스타일 테스트</h1>
          <p style={{ fontSize: '24px', margin: '0' }}>테몬 MBTI - temon.kr</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=3600',
        },
      }
    )
  }
}
