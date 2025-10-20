import type { Metadata } from 'next'

// 기본 SEO 메타데이터
export const defaultMetadata: Metadata = {
  title: {
    default: '테몬 MBTI - 나만의 성격 유형 테스트',
    template: '%s | 테몬 MBTI'
  },
  description: '커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트. MZ세대 맞춤형 성격 분석으로 나만의 성격을 발견해보세요.',
  keywords: [
    'MBTI', '성격테스트', '커피MBTI', '라면MBTI', '반려동물MBTI', 
    '공부MBTI', '알람습관', 'NTRP테스트', '성격분석', '심리테스트',
    'MZ세대', '재미있는테스트', '무료테스트', '성격유형'
  ],
  authors: [{ name: '테몬 MBTI 팀' }],
  creator: '테몬 MBTI',
  publisher: '테몬 MBTI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.temon.kr'),
  alternates: {
    canonical: '/',
    languages: {
      'ko-KR': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.temon.kr',
    siteName: '테몬 MBTI',
    title: '테몬 MBTI - 나만의 성격 유형 테스트',
    description: '커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '테몬 MBTI - 나만의 성격 유형 테스트',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '테몬 MBTI - 나만의 성격 유형 테스트',
    description: '커피, 라면, 반려동물, 공부 습관 등 다양한 주제로 알아보는 재미있는 MBTI 테스트',
    images: ['/og-image.jpg'],
    creator: '@temon_mbti',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

// 테스트별 SEO 메타데이터 생성
export function generateTestMetadata(test: {
  title: string
  description: string
  slug: string
  category: string
  icon: string
}): Metadata {
  const testUrl = `https://www.temon.kr/${test.slug}`
  
  return {
    title: `${test.title} - 테몬 MBTI`,
    description: `${test.description} ${test.title}로 알아보는 나만의 성격 유형을 발견해보세요.`,
    keywords: [
      test.title,
      'MBTI',
      '성격테스트',
      test.category,
      '무료테스트',
      '성격분석',
      '심리테스트'
    ],
    openGraph: {
      title: `${test.title} - 테몬 MBTI`,
      description: `${test.description} ${test.title}로 알아보는 나만의 성격 유형을 발견해보세요.`,
      url: testUrl,
      images: [
        {
          url: `/og-${test.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${test.title} - 테몬 MBTI`,
        },
      ],
    },
    twitter: {
      title: `${test.title} - 테몬 MBTI`,
      description: `${test.description} ${test.title}로 알아보는 나만의 성격 유형을 발견해보세요.`,
      images: [`/og-${test.slug}.jpg`],
    },
    alternates: {
      canonical: testUrl,
    },
  }
}

// 구조화된 데이터 생성 (JSON-LD)
export function generateStructuredData(type: 'website' | 'test' | 'result', data?: any) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '테몬 MBTI',
    url: 'https://www.temon.kr',
    description: 'MZ세대 맞춤형 재미있는 MBTI 테스트 플랫폼',
    inLanguage: 'ko-KR',
    publisher: {
      '@type': 'Organization',
      name: '테몬 MBTI',
      url: 'https://www.temon.kr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.temon.kr/logo.png',
        width: 200,
        height: 200
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.temon.kr/tests?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  switch (type) {
    case 'website':
      return {
        ...baseData,
        '@type': 'WebSite',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: data?.tests?.map((test: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'WebPage',
              name: test.title,
              url: `https://www.temon.kr/${test.slug}`,
              description: test.description
            }
          }))
        }
      }

    case 'test':
      return {
        ...baseData,
        '@type': 'WebApplication',
        name: data.title,
        url: `https://www.temon.kr/${data.slug}`,
        description: data.description,
        applicationCategory: 'GameApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'KRW'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '15000'
        }
      }

    case 'result':
      return {
        ...baseData,
        '@type': 'WebPage',
        name: `${data.testTitle} 결과 - ${data.resultType}`,
        url: `https://www.temon.kr/${data.testSlug}/test/result`,
        description: `${data.testTitle} 결과: ${data.resultType} 성격 유형`,
        mainEntity: {
          '@type': 'Person',
          name: data.resultType,
          description: data.description,
          additionalProperty: {
            '@type': 'PropertyValue',
            name: 'MBTI Type',
            value: data.resultType
          }
        }
      }

    default:
      return baseData
  }
}

// FAQ 구조화된 데이터 생성
export function generateFAQStructuredData(faqs: Array<{
  question: string
  answer: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Breadcrumb 구조화된 데이터 생성
export function generateBreadcrumbStructuredData(items: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

// 지역별 SEO 최적화 (GEO)
export function generateGeoMetadata(region: string, test: any) {
  const regionKeywords = {
    'seoul': ['서울', '강남', '강북', '서울시'],
    'busan': ['부산', '해운대', '부산시'],
    'daegu': ['대구', '대구시'],
    'incheon': ['인천', '인천시'],
    'gwangju': ['광주', '광주시'],
    'daejeon': ['대전', '대전시'],
    'ulsan': ['울산', '울산시'],
    'gyeonggi': ['경기도', '수원', '성남', '고양'],
    'gangwon': ['강원도', '춘천', '강릉'],
    'chungbuk': ['충청북도', '청주'],
    'chungnam': ['충청남도', '천안', '아산'],
    'jeonbuk': ['전라북도', '전주'],
    'jeonnam': ['전라남도', '광주', '여수'],
    'gyeongbuk': ['경상북도', '포항', '경주'],
    'gyeongnam': ['경상남도', '창원', '김해'],
    'jeju': ['제주도', '제주시', '서귀포']
  }

  const keywords = regionKeywords[region as keyof typeof regionKeywords] || []
  
  return {
    title: `${test.title} - ${region} 지역 맞춤 테스트 | 테몬 MBTI`,
    description: `${region} 지역 사용자들을 위한 ${test.title}. ${test.description}`,
    keywords: [
      ...keywords,
      test.title,
      'MBTI',
      '성격테스트',
      '지역맞춤',
      '무료테스트'
    ]
  }
}

// AEO (Answer Engine Optimization) 최적화
export function generateAEOContent(question: string, answer: string, relatedTests: string[]) {
  return {
    question: question,
    answer: answer,
    relatedContent: relatedTests,
    structuredAnswer: {
      '@context': 'https://schema.org',
      '@type': 'Answer',
      text: answer,
      about: {
        '@type': 'Question',
        name: question
      }
    }
  }
}
