// 디저트 취향 테스트 결과 데이터
// 16개 MBTI 유형별 결과

export type MBTI = 
  | "ENFJ" | "ENFP" | "ENTJ" | "ENTP"
  | "ESFJ" | "ESFP" | "ESTJ" | "ESTP"
  | "INFJ" | "INFP" | "INTJ" | "INTP"
  | "ISFJ" | "ISFP" | "ISTJ" | "ISTP";

export type DessertResult = {
  type: MBTI;
  emoji: string;
  title: string;
  tagline: string;
  summary: string[];
  traits: string[];
  recommendedDesserts: string[];
  cafeStyle: string;
  shareText: string;
  hashtags: string[];
  og: {
    bg: string;
    icon: string;
  };
  color?: string;
};

export const DESSERT_RESULTS: Record<MBTI, DessertResult> = {
  ENFJ: {
    type: "ENFJ",
    emoji: "🤝",
    title: "배려 디저트러",
    tagline: "친구 취향까지 챙기는 따뜻한 사람",
    summary: [
      "모두가 좋아할 만한 디저트를 선택하는 배려형",
      "함께 먹는 즐거움을 가장 중요하게 생각해요",
      "친구들의 취향을 기억하고 맞춤형 추천을 해주는 타입"
    ],
    traits: ["배려형", "공감능력", "리더십", "따뜻함", "협력적"],
    recommendedDesserts: ["생크림 케이크", "티라미수", "마카롱 세트"],
    cafeStyle: "모두가 좋아할 만한 안전한 메뉴가 많은 카페",
    shareText: "나는 🤝 배려 디저트러(ENFJ)! 너의 취향도 내 취향이야 🍰",
    hashtags: ["디저트테스트", "ENFJ", "배려형", "친구취향", "따뜻한사람"],
    og: { bg: "warm-pink", icon: "🤝" },
    color: "#FF9EC1"
  },

  ENFP: {
    type: "ENFP",
    emoji: "🎈",
    title: "즉흥 스위트러",
    tagline: "오늘의 기분에 따라 선택!",
    summary: [
      "매일 다른 디저트를 시도하는 자유로운 영혼",
      "오늘의 기분과 감정에 따라 메뉴를 정해요",
      "새로운 맛과 조합을 발견하는 것을 즐기는 타입"
    ],
    traits: ["즉흥적", "창의적", "감성적", "자유로운", "호기심많은"],
    recommendedDesserts: ["마카롱", "크로플", "수플레 팬케이크"],
    cafeStyle: "신메뉴가 자주 나오는 트렌디한 카페",
    shareText: "나는 🎈 즉흥 스위트러(ENFP)! 오늘은 어떤 달콤함이 기다릴까? 🍩",
    hashtags: ["디저트테스트", "ENFP", "즉흥형", "자유로운", "트렌디"],
    og: { bg: "candy-pop", icon: "🎈" },
    color: "#FF7EB6"
  },

  ENTJ: {
    type: "ENTJ",
    emoji: "🧱",
    title: "완벽 디저트러",
    tagline: "맛, 가격, 브랜드 모두 분석",
    summary: [
      "디저트 선택에도 전략적 사고를 적용하는 타입",
      "품질과 가격을 모두 고려한 합리적 선택을 해요",
      "목표 지향적이고 효율적인 디저트 소비를 선호"
    ],
    traits: ["전략적", "효율적", "완벽주의", "리더십", "분석적"],
    recommendedDesserts: ["치즈케이크", "바스크 치즈케이크", "프로피테롤"],
    cafeStyle: "고품질 브랜드의 프리미엄 카페",
    shareText: "나는 🧱 완벽 디저트러(ENTJ)! 완벽한 디저트는 완벽한 계획에서 나와 🎯",
    hashtags: ["디저트테스트", "ENTJ", "완벽주의", "전략적", "효율적"],
    og: { bg: "steel-blue", icon: "🧱" },
    color: "#4B6BFB"
  },

  ENTP: {
    type: "ENTP",
    emoji: "🧪",
    title: "실험 디저트러",
    tagline: "신메뉴·이색 조합을 시도",
    summary: [
      "가장 독특하고 새로운 디저트를 찾아다니는 탐험가",
      "기존의 틀을 깨는 창의적인 조합을 선호해요",
      "도전적이고 혁신적인 맛을 추구하는 타입"
    ],
    traits: ["창의적", "도전적", "혁신적", "호기심많은", "유머러스"],
    recommendedDesserts: ["수플레 팬케이크", "이색 조합 디저트", "분자요리 디저트"],
    cafeStyle: "실험적 메뉴가 많은 아방가르드 카페",
    shareText: "나는 🧪 실험 디저트러(ENTP)! 새로운 맛의 발견은 내 특기야 🔬",
    hashtags: ["디저트테스트", "ENTP", "실험적", "창의적", "도전적"],
    og: { bg: "neon-purple", icon: "🧪" },
    color: "#8A8AFF"
  },

  ESFJ: {
    type: "ESFJ",
    emoji: "😊",
    title: "함께 먹는 디저트러",
    tagline: "모두가 좋아할 맛을 선택",
    summary: [
      "함께하는 즐거움을 가장 중요하게 생각하는 타입",
      "모든 사람이 만족할 수 있는 안전한 선택을 해요",
      "사교적이고 따뜻한 분위기를 만드는 것을 좋아해"
    ],
    traits: ["사교적", "배려심", "협력적", "따뜻함", "긍정적"],
    recommendedDesserts: ["티라미수", "생크림 케이크", "프루트 타르트"],
    cafeStyle: "가족이나 친구들과 함께 가기 좋은 분위기 좋은 카페",
    shareText: "나는 😊 함께 먹는 디저트러(ESFJ)! 함께 먹으면 더 맛있어 🍰",
    hashtags: ["디저트테스트", "ESFJ", "사교적", "배려심", "함께하는즐거움"],
    og: { bg: "soft-yellow", icon: "😊" },
    color: "#FFC65A"
  },

  ESFP: {
    type: "ESFP",
    emoji: "📸",
    title: "감성 디저트러",
    tagline: "맛보다 예쁜 게 먼저!",
    summary: [
      "시각적으로 아름다운 디저트를 선호하는 감성파",
      "인스타그램에 올릴 만한 예쁜 디저트를 찾아다녀요",
      "분위기와 감정에 따라 디저트를 선택하는 타입"
    ],
    traits: ["감성적", "예술적", "즉흥적", "사교적", "창의적"],
    recommendedDesserts: ["딸기 쇼트케이크", "마카롱", "플라워 케이크"],
    cafeStyle: "인테리어가 예쁘고 사진 찍기 좋은 인스타 카페",
    shareText: "나는 📸 감성 디저트러(ESFP)! 예쁜 디저트는 마음까지 달콤하게 해줘 💕",
    hashtags: ["디저트테스트", "ESFP", "감성적", "예쁜디저트", "인스타카페"],
    og: { bg: "sunset-pink", icon: "📸" },
    color: "#FF9EC1"
  },

  ESTJ: {
    type: "ESTJ",
    emoji: "📋",
    title: "실속 디저트러",
    tagline: "가격·양·만족도 기준",
    summary: [
      "실용적이고 합리적인 기준으로 디저트를 선택하는 타입",
      "가성비와 만족도를 모두 고려한 현실적 선택을 해요",
      "계획적이고 체계적인 디저트 소비를 선호"
    ],
    traits: ["실용적", "현실적", "계획적", "체계적", "효율적"],
    recommendedDesserts: ["카스텔라", "롤케이크", "크림빵"],
    cafeStyle: "가성비 좋고 맛있는 검증된 카페",
    shareText: "나는 📋 실속 디저트러(ESTJ)! 가성비 좋은 디저트가 최고야 💰",
    hashtags: ["디저트테스트", "ESTJ", "실속형", "가성비", "현실적"],
    og: { bg: "clean-blue", icon: "📋" },
    color: "#5AC8FA"
  },

  ESTP: {
    type: "ESTP",
    emoji: "⚡",
    title: "빠른 결정러",
    tagline: "보고 바로 주문!",
    summary: [
      "즉석에서 빠르게 결정하는 행동파",
      "복잡한 고민 없이 직감적으로 선택해요",
      "실행력이 뛰어나고 적극적인 디저트 소비를 선호"
    ],
    traits: ["즉흥적", "행동적", "직감적", "적극적", "실행력"],
    recommendedDesserts: ["도넛", "쿠키", "크로아상"],
    cafeStyle: "빠른 서비스와 간편한 메뉴가 있는 카페",
    shareText: "나는 ⚡ 빠른 결정러(ESTP)! 고민은 그만, 바로 주문! 🚀",
    hashtags: ["디저트테스트", "ESTP", "즉흥적", "빠른결정", "행동파"],
    og: { bg: "lime-green", icon: "⚡" },
    color: "#9AE66E"
  },

  INFJ: {
    type: "INFJ",
    emoji: "📖",
    title: "사색 디저트러",
    tagline: "분위기와 의미를 중요시",
    summary: [
      "디저트를 먹는 순간의 분위기와 의미를 중시하는 철학자",
      "깊이 있는 사색과 함께하는 디저트를 선호해요",
      "내면의 평화와 조화를 추구하는 타입"
    ],
    traits: ["철학적", "내성적", "직관적", "이상주의", "사색적"],
    recommendedDesserts: ["밀크티 케이크", "다크초콜릿", "허브티 디저트"],
    cafeStyle: "조용하고 분위기 좋은 힐링 카페",
    shareText: "나는 📖 사색 디저트러(INFJ)! 디저트와 함께하는 사색의 시간이 최고야 🧘‍♀️",
    hashtags: ["디저트테스트", "INFJ", "사색적", "철학적", "분위기중시"],
    og: { bg: "mystic-purple", icon: "📖" },
    color: "#C1B2FF"
  },

  INFP: {
    type: "INFP",
    emoji: "🌙",
    title: "감성 초코러",
    tagline: "디저트에 감정을 담는 낭만파",
    summary: [
      "디저트에 자신만의 감정과 의미를 부여하는 낭만주의자",
      "개인적이고 특별한 경험을 중시하는 타입",
      "창의적이고 예술적인 디저트를 선호해요"
    ],
    traits: ["감성적", "낭만적", "창의적", "개인적", "예술적"],
    recommendedDesserts: ["다크초콜릿", "브라우니", "아티스틱 디저트"],
    cafeStyle: "개성 있고 아늑한 분위기의 독립 카페",
    shareText: "나는 🌙 감성 초코러(INFP)! 디저트는 내 마음을 담는 그릇이야 💝",
    hashtags: ["디저트테스트", "INFP", "감성적", "낭만적", "개인적"],
    og: { bg: "dreamy-violet", icon: "🌙" },
    color: "#9D7AF0"
  },

  INTJ: {
    type: "INTJ",
    emoji: "📐",
    title: "전략 디저트러",
    tagline: "효율과 품질 중심 선택",
    summary: [
      "체계적이고 논리적인 기준으로 디저트를 선택하는 전략가",
      "장기적 관점에서 효율적인 소비를 추구해요",
      "완벽주의적이고 분석적인 접근을 선호"
    ],
    traits: ["전략적", "논리적", "완벽주의", "분석적", "독립적"],
    recommendedDesserts: ["바스크 치즈케이크", "고급 초콜릿", "정교한 파티시"],
    cafeStyle: "고품질과 전문성을 중시하는 프리미엄 카페",
    shareText: "나는 📐 전략 디저트러(INTJ)! 완벽한 디저트는 완벽한 계획에서 나와 🎯",
    hashtags: ["디저트테스트", "INTJ", "전략적", "논리적", "완벽주의"],
    og: { bg: "graphite", icon: "📐" },
    color: "#7B8794"
  },

  INTP: {
    type: "INTP",
    emoji: "🔬",
    title: "분석 디저트러",
    tagline: "원재료와 조합까지 분석",
    summary: [
      "디저트의 원재료와 조합을 과학적으로 분석하는 탐구자",
      "새로운 지식과 정보를 추구하는 타입",
      "논리적이고 객관적인 기준으로 디저트를 평가해요"
    ],
    traits: ["분석적", "탐구적", "논리적", "객관적", "지식추구"],
    recommendedDesserts: ["쿠키 & 크럼블", "분자요리 디저트", "실험적 조합"],
    cafeStyle: "특별하고 독특한 메뉴가 있는 컨셉 카페",
    shareText: "나는 🔬 분석 디저트러(INTP)! 디저트도 과학이야 🧪",
    hashtags: ["디저트테스트", "INTP", "분석적", "탐구적", "과학적"],
    og: { bg: "ice-blue", icon: "🔬" },
    color: "#7CD4FD"
  },

  ISFJ: {
    type: "ISFJ",
    emoji: "🧸",
    title: "따뜻한 디저트러",
    tagline: "정 붙은 단골 디저트만 고수",
    summary: [
      "안정적이고 신뢰할 수 있는 디저트를 선호하는 보호자",
      "검증된 맛과 품질을 중시하는 타입",
      "전통적이고 클래식한 디저트를 좋아해요"
    ],
    traits: ["안정적", "신뢰성", "전통적", "보호적", "따뜻함"],
    recommendedDesserts: ["크림빵", "카라멜 라떼", "클래식 케이크"],
    cafeStyle: "안정적이고 신뢰할 수 있는 단골 카페",
    shareText: "나는 🧸 따뜻한 디저트러(ISFJ)! 검증된 맛이 가장 안전해 🛡️",
    hashtags: ["디저트테스트", "ISFJ", "안정적", "신뢰성", "전통적"],
    og: { bg: "warm-cream", icon: "🧸" },
    color: "#F5CBA7"
  },

  ISFP: {
    type: "ISFP",
    emoji: "🌷",
    title: "감각 힐링러",
    tagline: "디저트=위로와 쉼",
    summary: [
      "디저트를 통해 마음의 평화와 위로를 찾는 힐링러",
      "개인적이고 감성적인 경험을 중시하는 타입",
      "자연스럽고 건강한 디저트를 선호해요"
    ],
    traits: ["감성적", "힐링", "자연스러운", "개인적", "예술적"],
    recommendedDesserts: ["말차 케이크", "플로럴 티", "허브 디저트"],
    cafeStyle: "자연스럽고 힐링되는 분위기의 카페",
    shareText: "나는 🌷 감각 힐링러(ISFP)! 디저트는 내 마음의 비타민이야 💚",
    hashtags: ["디저트테스트", "ISFP", "힐링", "감성적", "자연스러운"],
    og: { bg: "sage-green", icon: "🌷" },
    color: "#9AD0B2"
  },

  ISTJ: {
    type: "ISTJ",
    emoji: "📦",
    title: "정석 디저트러",
    tagline: "늘 같은 메뉴, 변함 없는 취향",
    summary: [
      "검증된 메뉴와 안정적인 선택을 고수하는 신뢰형",
      "일관성 있고 예측 가능한 디저트를 선호해요",
      "전통적이고 클래식한 맛을 중시하는 타입"
    ],
    traits: ["일관성", "신뢰성", "전통적", "안정적", "예측가능"],
    recommendedDesserts: ["카스텔라", "롤케이크", "클래식 쿠키"],
    cafeStyle: "안정적이고 일관된 품질의 전통 카페",
    shareText: "나는 📦 정석 디저트러(ISTJ)! 검증된 맛이 최고야 ✅",
    hashtags: ["디저트테스트", "ISTJ", "일관성", "신뢰성", "전통적"],
    og: { bg: "navy-blue", icon: "📦" },
    color: "#2F3E46"
  },

  ISTP: {
    type: "ISTP",
    emoji: "🛠",
    title: "실용 디저트러",
    tagline: "빠르고 깔끔한 선택",
    summary: [
      "효율적이고 실용적인 디저트를 선호하는 솔루션러",
      "복잡한 것보다는 간단하고 맛있는 것을 선택해요",
      "독립적이고 개인적인 디저트 시간을 중시하는 타입"
    ],
    traits: ["실용적", "효율적", "독립적", "간단함", "솔루션"],
    recommendedDesserts: ["쿠키샌드", "크로아상", "간단한 케이크"],
    cafeStyle: "빠르고 효율적인 서비스의 모던 카페",
    shareText: "나는 🛠 실용 디저트러(ISTP)! 간단하고 맛있는 게 최고야 ⚡",
    hashtags: ["디저트테스트", "ISTP", "실용적", "효율적", "간단함"],
    og: { bg: "charcoal", icon: "🛠" },
    color: "#4E4E50"
  }
};

export const getDessertResult = (type: MBTI): DessertResult | null => {
  return DESSERT_RESULTS[type] || null;
};

export const getAllDessertResults = (): DessertResult[] => {
  return Object.values(DESSERT_RESULTS);
};
