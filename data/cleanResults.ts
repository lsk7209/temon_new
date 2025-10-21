export interface CleanResult {
  type: string
  name: string
  emoji: string
  summary: string
  description: string
  features: string[]
  playlist: string
  recommendedItems: string[]
  shareText: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
}

export const cleanResults: CleanResult[] = [
  {
    type: "ENFP",
    name: "감성 청소러",
    emoji: "🎈",
    summary: "기분 따라 움직이는 즉흥 청소러",
    description: "당신은 감정이 들면 대청소를 하는 타입이에요. 청소는 단순한 정리가 아니라 감정 리셋의 시간이죠. 기분이 좋을 때는 온 집안을 정리하고, 우울할 때는 더욱 열심히 청소해요.",
    features: [
      "감정에 따라 청소 강도가 달라짐",
      "청소 중 새로운 아이디어가 떠오름",
      "음악 없이는 청소할 수 없음",
      "청소 후 기분이 한결 좋아짐"
    ],
    playlist: "BTS - 'Home' 🎵",
    recommendedItems: ["무선 이어폰", "감성 향초", "예쁜 청소 도구"],
    shareText: "나는 🎈 감성 청소러(ENFP)! 청소도 감정이야!",
    gradientFrom: "from-pink-500",
    gradientTo: "to-purple-600",
    accentColor: "pink"
  },
  {
    type: "ENFJ",
    name: "배려 청소러",
    emoji: "🤝",
    summary: "동거인·가족 중심 정리",
    description: "당신은 타인을 배려하는 청소러예요. '같이 살아서 깨끗해야지!'라는 마음으로 청소를 해요. 가족이나 룸메이트를 생각하며 정리하는 당신의 모습이 정말 따뜻해요.",
    features: [
      "타인을 위한 청소가 주 목적",
      "공용 공간 정리에 신경 씀",
      "청소 스케줄을 함께 정함",
      "깨끗한 환경의 중요성을 잘 앎"
    ],
    playlist: "아이유 - '좋은 날' 🎵",
    recommendedItems: ["공용 청소 도구", "친환경 세제", "정리함"],
    shareText: "나는 🤝 배려 청소러(ENFJ)! 함께 사는 공간은 함께 정리해야지!",
    gradientFrom: "from-green-500",
    gradientTo: "to-blue-600",
    accentColor: "green"
  },
  {
    type: "ENTJ",
    name: "전략 청소러",
    emoji: "🎯",
    summary: "계획적·효율적 정리",
    description: "당신은 청소도 미션처럼 접근하는 전략가예요. 도구와 시간을 체계적으로 관리하며, 가장 효율적인 방법을 찾아 청소를 해요. 청소 계획표까지 세우는 당신의 모습이 인상적이에요.",
    features: [
      "청소 계획을 세우고 실행",
      "도구와 시간을 효율적으로 관리",
      "결과 중심의 청소 방식",
      "청소 후 만족도가 높음"
    ],
    playlist: "에픽하이 - 'Fly' 🎵",
    recommendedItems: ["고성능 청소기", "타이머", "청소 계획표"],
    shareText: "나는 🎯 전략 청소러(ENTJ)! 청소도 전략이 필요해!",
    gradientFrom: "from-red-500",
    gradientTo: "to-orange-600",
    accentColor: "red"
  },
  {
    type: "ENTP",
    name: "실험 청소러",
    emoji: "🧪",
    summary: "새 방식 시도",
    description: "당신은 신박한 정리법을 탐구하는 실험가예요. '이건 과학이다!'라며 새로운 청소 방법을 시도하고, 어떤 도구가 가장 효과적인지 연구해요. 청소도 창의적으로 접근하는 당신의 모습이 멋져요.",
    features: [
      "새로운 청소 방법을 시도",
      "도구의 효과를 분석",
      "창의적인 정리법 개발",
      "청소 과정을 즐김"
    ],
    playlist: "방탄소년단 - 'Dynamite' 🎵",
    recommendedItems: ["다양한 청소 도구", "실험용 세제", "측정 도구"],
    shareText: "나는 🧪 실험 청소러(ENTP)! 청소도 과학이야!",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-red-600",
    accentColor: "yellow"
  },
  {
    type: "ESFJ",
    name: "따뜻한 청소러",
    emoji: "😊",
    summary: "가족·친구를 위한 청소",
    description: "당신은 정성스럽게 청소하는 따뜻한 마음을 가진 사람이에요. 향초를 피우고 공간의 분위기를 중요하게 생각하며, 가족과 친구들이 편안하게 지낼 수 있도록 청소를 해요.",
    features: [
      "정성스러운 청소 방식",
      "공간의 분위기를 중시",
      "향초나 촛불을 활용",
      "타인을 위한 청소"
    ],
    playlist: "태연 - 'I' 🎵",
    recommendedItems: ["향초", "촛불", "예쁜 정리함"],
    shareText: "나는 😊 따뜻한 청소러(ESFJ)! 정성스럽게 청소하는 마음이야!",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600",
    accentColor: "pink"
  },
  {
    type: "ESFP",
    name: "감각 청소러",
    emoji: "📸",
    summary: "인스타 감성 청소",
    description: "당신은 인스타에 올릴 만한 예쁜 공간을 만드는 감각적인 청소러예요. 청소보다는 인테리어에 진심을 다하고, 사진 찍기 좋은 공간을 만드는 것이 목표예요. 시각적 만족도가 최우선이에요.",
    features: [
      "시각적 만족도를 중시",
      "인테리어에 진심",
      "사진 찍기 좋은 공간 연출",
      "예쁜 소품 활용"
    ],
    playlist: "NewJeans - 'Hype Boy' 🎵",
    recommendedItems: ["예쁜 소품", "조명", "인테리어 아이템"],
    shareText: "나는 📸 감각 청소러(ESFP)! 청소도 예술이야!",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-600",
    accentColor: "purple"
  },
  {
    type: "ESTJ",
    name: "효율 청소러",
    emoji: "📋",
    summary: "루틴·체계적 정리",
    description: "당신은 '토요일 10시, 청소 시간'이라고 정해놓고 체계적으로 청소하는 효율적인 사람이에요. 청소 스케줄이 있고, 루틴을 철저히 지켜요. 청소 전후 비교가 삶의 낙이에요.",
    features: [
      "정해진 청소 스케줄 유지",
      "체계적인 청소 방식",
      "루틴을 철저히 지킴",
      "청소 전후 비교를 즐김"
    ],
    playlist: "에이핑크 - 'No No No' 🎵",
    recommendedItems: ["청소 스케줄표", "고성능 청소기", "정리함"],
    shareText: "나는 📋 효율 청소러(ESTJ)! 청소도 계획이 필요해!",
    gradientFrom: "from-blue-500",
    gradientTo: "to-indigo-600",
    accentColor: "blue"
  },
  {
    type: "ESTP",
    name: "스피드 청소러",
    emoji: "⚡",
    summary: "빠르고 실용적",
    description: "당신은 '결과만 좋으면 됨'이라는 마음으로 빠르게 청소하는 실용주의자예요. 보기 싫은 것만 치우고, 핵심만 정리해요. 스피드가 생명이고, 실용성이 최우선이에요.",
    features: [
      "빠른 청소 속도",
      "실용적인 청소 방식",
      "핵심만 정리",
      "결과 중심적"
    ],
    playlist: "ITZY - 'WANNABE' 🎵",
    recommendedItems: ["무선 청소기", "빠른 정리 도구", "휴대용 청소 세트"],
    shareText: "나는 ⚡ 스피드 청소러(ESTP)! 빠르게 끝내는 게 최고야!",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-orange-600",
    accentColor: "yellow"
  },
  {
    type: "INFP",
    name: "사색 청소러",
    emoji: "🌙",
    summary: "청소하며 생각 정리",
    description: "당신은 청소하면서 내면을 성찰하는 사색적인 사람이에요. '이 먼지처럼 나도 정리돼야...'라며 청소를 통해 마음도 정리해요. 청소는 단순한 정리가 아니라 내적 치유의 시간이에요.",
    features: [
      "청소 중 내면 성찰",
      "감정적 치유의 시간",
      "조용한 환경 선호",
      "깊이 있는 사고"
    ],
    playlist: "아이유 - '밤편지' 🎵",
    recommendedItems: ["조용한 청소 도구", "향초", "일기장"],
    shareText: "나는 🌙 사색 청소러(INFP)! 청소하며 마음도 정리해!",
    gradientFrom: "from-indigo-500",
    gradientTo: "to-purple-600",
    accentColor: "indigo"
  },
  {
    type: "INFJ",
    name: "완벽 미니멀러",
    emoji: "📖",
    summary: "공간의 의미 중시",
    description: "당신은 '버림의 미학'을 실천하는 완벽한 미니멀리스트예요. 공간의 의미를 중시하며, 깔끔하고 정제된 환경을 추구해요. 불필요한 것은 과감히 버리고, 필요한 것만 남겨두는 철학을 가지고 있어요.",
    features: [
      "미니멀한 라이프스타일",
      "버림의 미학 실천",
      "공간의 의미 중시",
      "완벽한 정리"
    ],
    playlist: "백예린 - 'Square' 🎵",
    recommendedItems: ["미니멀 정리함", "단색 소품", "다이어리"],
    shareText: "나는 📖 완벽 미니멀러(INFJ)! 버림의 미학을 실천해!",
    gradientFrom: "from-gray-500",
    gradientTo: "to-slate-600",
    accentColor: "gray"
  },
  {
    type: "INTJ",
    name: "최적화 청소러",
    emoji: "🧠",
    summary: "구조·동선 중심",
    description: "당신은 '청소 알고리즘'이 존재하는 최적화 전문가예요. 구조와 동선을 중심으로 청소 계획을 세우고, 가장 효율적인 시스템을 구축해요. 청소도 전략적으로 접근하는 당신의 모습이 인상적이에요.",
    features: [
      "체계적인 청소 시스템",
      "동선을 고려한 정리",
      "최적화된 청소 방법",
      "장기적 계획 수립"
    ],
    playlist: "에픽하이 - 'Born Hater' 🎵",
    recommendedItems: ["청소 시스템 도구", "측정 도구", "계획표"],
    shareText: "나는 🧠 최적화 청소러(INTJ)! 청소도 시스템이야!",
    gradientFrom: "from-blue-500",
    gradientTo: "to-cyan-600",
    accentColor: "blue"
  },
  {
    type: "INTP",
    name: "실험적 청소러",
    emoji: "🔬",
    summary: "도중에 딴짓多",
    description: "당신은 '왜 먼지는 위에서 쌓일까?'라며 청소 중에도 탐구하는 실험가예요. 청소하다가 다른 것에 관심이 가서 딴짓을 하기 일쑤지만, 그 과정에서 새로운 발견을 하기도 해요.",
    features: [
      "청소 중 탐구 활동",
      "새로운 발견을 즐김",
      "딴짓을 자주 함",
      "분석적 사고"
    ],
    playlist: "방탄소년단 - 'DNA' 🎵",
    recommendedItems: ["분석 도구", "실험용 청소 도구", "노트"],
    shareText: "나는 🔬 실험적 청소러(INTP)! 청소도 연구야!",
    gradientFrom: "from-green-500",
    gradientTo: "to-teal-600",
    accentColor: "green"
  },
  {
    type: "ISFJ",
    name: "따뜻한 정리러",
    emoji: "🧸",
    summary: "가족 위한 유지형",
    description: "당신은 '집이 마음의 안식처'라고 생각하며 꾸준히 정리하는 따뜻한 사람이에요. 가족을 위한 유지형 청소를 하며, 섬세하고 꼼꼼한 정리를 통해 가족의 편안함을 추구해요.",
    features: [
      "가족을 위한 청소",
      "꾸준한 유지 관리",
      "섬세하고 꼼꼼함",
      "가족의 편안함 추구"
    ],
    playlist: "태연 - 'Fine' 🎵",
    recommendedItems: ["가족용 정리함", "섬세한 청소 도구", "편안한 소품"],
    shareText: "나는 🧸 따뜻한 정리러(ISFJ)! 가족을 위한 청소야!",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-600",
    accentColor: "pink"
  },
  {
    type: "ISFP",
    name: "감성 인테리어러",
    emoji: "🌷",
    summary: "미적 중심 청소",
    description: "당신은 정리보다 꾸미기에 진심인 감성적인 인테리어러예요. 향, 조명, 배치를 중요하게 생각하며, 공간의 미적 감각을 살리는 청소를 해요. 청소도 예술이에요.",
    features: [
      "미적 감각을 중시",
      "인테리어에 진심",
      "향과 조명을 중요하게 생각",
      "공간의 분위기 연출"
    ],
    playlist: "백예린 - '우주를 건너' 🎵",
    recommendedItems: ["예쁜 조명", "향초", "인테리어 소품"],
    shareText: "나는 🌷 감성 인테리어러(ISFP)! 청소도 예술이야!",
    gradientFrom: "from-rose-500",
    gradientTo: "to-pink-600",
    accentColor: "rose"
  },
  {
    type: "ISTJ",
    name: "완벽 정리러",
    emoji: "📦",
    summary: "체계·규칙형 청소",
    description: "당신은 '청소 전후 비교가 삶의 낙'이라고 말하는 완벽한 정리러예요. 먼지 한 톨도 허용하지 않고, 청소 루틴을 철저히 지켜요. 다른 사람 방을 보면 속으로 '이건 아닌데...'라고 생각하는 완벽주의자예요.",
    features: [
      "완벽한 청소 루틴",
      "먼지 한 톨도 허용하지 않음",
      "체계적인 정리 방식",
      "청소 전후 비교를 즐김"
    ],
    playlist: "에이핑크 - 'Mr. Chu' 🎵",
    recommendedItems: ["고성능 청소기", "밀폐 수납함", "미니 먼지청소기"],
    shareText: "나는 📦 완벽 정리러(ISTJ)! 먼지 한 톨도 용납 못해!",
    gradientFrom: "from-slate-500",
    gradientTo: "to-gray-600",
    accentColor: "slate"
  },
  {
    type: "ISTP",
    name: "실용 청소러",
    emoji: "🛠",
    summary: "필요할 때만 행동",
    description: "당신은 '필요 없으면 버림'이라는 철학을 가진 실용적인 청소러예요. 간결하고 효율적인 청소를 하며, 필요할 때만 행동하는 당신의 모습이 인상적이에요. 실용성이 최우선이에요.",
    features: [
      "실용적인 청소 방식",
      "필요할 때만 청소",
      "간결하고 효율적",
      "불필요한 것은 과감히 버림"
    ],
    playlist: "ITZY - 'ICY' 🎵",
    recommendedItems: ["다용도 청소 도구", "휴대용 청소 세트", "간편 정리 도구"],
    shareText: "나는 🛠 실용 청소러(ISTP)! 필요할 때만 청소해!",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-600",
    accentColor: "orange"
  }
]
