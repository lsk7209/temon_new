// 스마트폰 사용 습관 테스트 결과 데이터
// 16개 MBTI 유형별 스마트폰 사용 패턴 분석

import { MBTI } from "@/data/travelPackConfig"; // MBTI 타입 재사용

export type PhoneType = {
  type: MBTI;
  emoji: string;
  title: string;          // 캐릭터명
  tagline: string;        // 한 줄 요약
  summary: string[];      // 성향 3~5줄
  traits: string[];       // 키워드 태그
  phoneHabits: string[];  // 폰 사용 습관
  recommendedApps: string[]; // 추천 앱 스타일
  shareText: string;      // 공유 문구
  hashtags: string[];     // SEO/AEO용 해시태그
  og: {
    bg: string;           // OG 배경 hint (색상/그라디언트 키)
    icon: string;         // OG 상징 이모지/아이콘 텍스트
  };
  color?: string;         // UI 테마(선택)
};

// 공통 해시태그 빌더
const commonTags = (extras: string[]) => [
  "스마트폰성격테스트","폰습관MBTI","스마트폰사용성향","폰성격테스트",
  "스마트폰습관","폰사용패턴","바이럴테스트","디지털성격",
  ...extras,
];

export const PHONE_TYPES: Record<MBTI, PhoneType> = {
  ENFP: {
    type: "ENFP",
    emoji: "🎈",
    title: "즉흥 탐험러",
    tagline: "새로운 앱은 일단 깔고 봐야지!",
    summary: [
      "새로운 앱과 기능에 대한 호기심이 넘치는 즉흥적인 스마트폰 유저.",
      "트렌드에 민감하며, 재미있어 보이는 앱은 일단 설치해보는 것을 좋아해요.",
      "SNS와 소셜 기능을 적극 활용하며, 창의적인 콘텐츠 제작을 즐깁니다.",
    ],
    traits: ["즉흥적","창의적","감각적","트렌드중시","호기심"],
    phoneHabits: ["새 앱 즉시 설치", "SNS 적극 활용", "창의적 콘텐츠 제작"],
    recommendedApps: ["틱톡", "인스타그램", "스냅챗"],
    shareText: "나는 🎈 즉흥 탐험러(ENFP)! 새로운 앱은 일단 깔고 봐야지 📱",
    hashtags: commonTags(["ENFP","즉흥적","트렌드","창의적"]),
    og: { bg: "candy-pop", icon: "🎈" },
    color: "#FF7EB6",
  },
  ENFJ: {
    type: "ENFJ",
    emoji: "🤝",
    title: "공감 커뮤니케이터",
    tagline: "친구 알림엔 즉시 반응",
    summary: [
      "사람들과의 소통을 중시하며, 친구들의 알림에 즉시 반응하는 따뜻한 스마트폰 유저.",
      "단체 채팅방을 활발하게 관리하며, 모든 사람이 참여할 수 있도록 배려해요.",
      "감정적인 소통을 중요하게 생각하며, 이모티콘과 스티커를 적극 활용합니다.",
    ],
    traits: ["사교적","리더형","배려심","소통중시","감정적"],
    phoneHabits: ["알림 즉시 확인", "단체채팅 관리", "이모티콘 적극 활용"],
    recommendedApps: ["카카오톡", "단체채팅", "인스타그램"],
    shareText: "나는 🤝 공감 커뮤니케이터(ENFJ)! 친구 알림엔 즉시 반응 📱",
    hashtags: commonTags(["ENFJ","사교적","소통","배려심"]),
    og: { bg: "warm-pink", icon: "🤝" },
    color: "#FF9EC1",
  },
  ENTJ: {
    type: "ENTJ",
    emoji: "🧱",
    title: "전략 관리자",
    tagline: "폰은 도구, 관리가 목적",
    summary: [
      "스마트폰을 효율적인 도구로 활용하는 전략적인 관리자형 유저.",
      "앱들을 체계적으로 정리하고, 생산성을 높이는 도구들을 선호해요.",
      "불필요한 알림은 차단하고, 중요한 정보만 선별적으로 받아봅니다.",
    ],
    traits: ["효율적","통제형","계획적","전략적","생산성중시"],
    phoneHabits: ["앱 체계적 정리", "알림 선별적 수신", "생산성 도구 활용"],
    recommendedApps: ["노션", "캘린더", "할일관리"],
    shareText: "나는 🧱 전략 관리자(ENTJ)! 폰은 도구, 관리가 목적 📱",
    hashtags: commonTags(["ENTJ","효율적","전략적","생산성"]),
    og: { bg: "steel-blue", icon: "🧱" },
    color: "#4B6BFB",
  },
  ENTP: {
    type: "ENTP",
    emoji: "🧪",
    title: "실험 기술러",
    tagline: "신기한 기능, 새로운 OS에 열광",
    summary: [
      "최신 기술과 새로운 기능에 대한 열정이 넘치는 실험적인 스마트폰 유저.",
      "베타 버전 앱이나 새로운 OS 업데이트를 가장 먼저 시도해보는 것을 좋아해요.",
      "기술적인 문제를 해결하는 것을 즐기며, 다양한 앱의 숨겨진 기능을 찾아냅니다.",
    ],
    traits: ["탐구적","도전적","기술중시","실험적","혁신적"],
    phoneHabits: ["베타 앱 시도", "새 기능 탐구", "기술 문제 해결"],
    recommendedApps: ["베타 앱", "테크 유틸", "개발툴"],
    shareText: "나는 🧪 실험 기술러(ENTP)! 신기한 기능, 새로운 OS에 열광 📱",
    hashtags: commonTags(["ENTP","실험적","기술중시","탐구적"]),
    og: { bg: "neon-purple", icon: "🧪" },
    color: "#8A8AFF",
  },
  ESFJ: {
    type: "ESFJ",
    emoji: "😊",
    title: "따뜻한 소통러",
    tagline: "연락 먼저 하는 세심형",
    summary: [
      "가족과 친구들과의 소통을 가장 중요하게 생각하는 따뜻한 스마트폰 유저.",
      "연락을 먼저 하는 것을 좋아하며, 모든 사람의 생일과 기념일을 기억해요.",
      "사진과 추억을 소중히 여기며, 가족 앨범이나 그룹 채팅을 활발하게 관리합니다.",
    ],
    traits: ["따뜻함","세심함","소통형","배려심","기억력"],
    phoneHabits: ["연락 먼저 하기", "기념일 관리", "사진 정리"],
    recommendedApps: ["인스타그램", "밴드", "가족앨범"],
    shareText: "나는 😊 따뜻한 소통러(ESFJ)! 연락 먼저 하는 세심형 📱",
    hashtags: commonTags(["ESFJ","따뜻함","소통","배려심"]),
    og: { bg: "soft-yellow", icon: "😊" },
    color: "#FFC65A",
  },
  ESFP: {
    type: "ESFP",
    emoji: "📸",
    title: "감성 트렌더",
    tagline: "폰은 나의 일기장",
    summary: [
      "스마트폰을 감성적인 표현 도구로 활용하는 트렌드 민감형 유저.",
      "아름다운 필터와 효과를 활용한 사진 촬영을 좋아하며, SNS에 적극적으로 공유해요.",
      "현재의 순간을 소중히 여기며, 감정에 따라 앱 사용 패턴이 달라집니다.",
    ],
    traits: ["감성적","트렌드형","표현력","즉흥적","현재중시"],
    phoneHabits: ["필터 사진 촬영", "SNS 적극 공유", "감정적 앱 사용"],
    recommendedApps: ["스냅챗", "필터 앱", "인스타그램"],
    shareText: "나는 📸 감성 트렌더(ESFP)! 폰은 나의 일기장 📱",
    hashtags: commonTags(["ESFP","감성적","트렌드","표현력"]),
    og: { bg: "sunset-pink", icon: "📸" },
    color: "#FF9EC1",
  },
  ESTJ: {
    type: "ESTJ",
    emoji: "📋",
    title: "실속 관리자",
    tagline: "폴더 정리 완벽, 효율 최고",
    summary: [
      "스마트폰을 체계적으로 관리하며, 실용적인 앱들을 선호하는 현실적인 유저.",
      "폴더 정리와 앱 배치에 신경을 쓰며, 업무와 일정 관리에 집중해요.",
      "불필요한 앱은 과감히 삭제하고, 필요한 기능만 효율적으로 활용합니다.",
    ],
    traits: ["현실적","실용적","체계적","효율적","관리형"],
    phoneHabits: ["폴더 체계적 정리", "업무 앱 중심", "불필요한 앱 삭제"],
    recommendedApps: ["이메일", "할일관리", "캘린더"],
    shareText: "나는 📋 실속 관리자(ESTJ)! 폴더 정리 완벽, 효율 최고 📱",
    hashtags: commonTags(["ESTJ","현실적","실용적","체계적"]),
    og: { bg: "clean-blue", icon: "📋" },
    color: "#5AC8FA",
  },
  ESTP: {
    type: "ESTP",
    emoji: "⚡",
    title: "속전속결러",
    tagline: "빠르고 직관적인 사용",
    summary: [
      "빠르고 직관적인 스마트폰 사용을 선호하는 실행력 있는 유저.",
      "복잡한 설정보다는 간단하고 빠른 기능을 좋아하며, 즉석에서 문제를 해결해요.",
      "리워드나 혜택이 있는 앱을 적극 활용하며, 실용적인 정보 수집에 능숙합니다.",
    ],
    traits: ["빠른실행","직관적","즉흥적","실용적","효율적"],
    phoneHabits: ["빠른 앱 전환", "리워드 앱 활용", "즉석 문제 해결"],
    recommendedApps: ["리워드 앱", "퀵서치", "지도앱"],
    shareText: "나는 ⚡ 속전속결러(ESTP)! 빠르고 직관적인 사용 📱",
    hashtags: commonTags(["ESTP","빠른실행","직관적","실용적"]),
    og: { bg: "lime-green", icon: "⚡" },
    color: "#9AE66E",
  },
  INFP: {
    type: "INFP",
    emoji: "🌙",
    title: "감성 기록러",
    tagline: "노트에 생각 적고 사진 저장",
    summary: [
      "스마트폰을 개인적인 감정과 생각을 기록하는 도구로 활용하는 내면형 유저.",
      "일기나 메모 앱을 자주 사용하며, 의미 있는 순간들을 사진으로 남겨요.",
      "조용한 환경에서 혼자만의 시간을 즐기며, 감성적인 콘텐츠를 선호합니다.",
    ],
    traits: ["내면형","감성형","기록중시","개인적","의미추구"],
    phoneHabits: ["일기 작성", "의미있는 사진 저장", "감성 콘텐츠 소비"],
    recommendedApps: ["다이어리", "포토 앱", "음악 앱"],
    shareText: "나는 🌙 감성 기록러(INFP)! 노트에 생각 적고 사진 저장 📱",
    hashtags: commonTags(["INFP","내면형","감성형","기록중시"]),
    og: { bg: "dreamy-violet", icon: "🌙" },
    color: "#9D7AF0",
  },
  INFJ: {
    type: "INFJ",
    emoji: "📖",
    title: "사색형 관찰러",
    tagline: "조용히 폰으로 세상을 관찰",
    summary: [
      "스마트폰을 통해 세상을 조용히 관찰하고 사색하는 철학적인 유저.",
      "독서나 명상 앱을 즐겨 사용하며, 깊이 있는 콘텐츠를 선호해요.",
      "사람들의 행동 패턴을 분석하며, 인사이트를 얻는 것을 좋아합니다.",
    ],
    traits: ["사색적","관찰형","철학적","분석적","깊이추구"],
    phoneHabits: ["독서 앱 활용", "명상 앱 사용", "깊이있는 콘텐츠 소비"],
    recommendedApps: ["독서 앱", "명상 앱", "분석 도구"],
    shareText: "나는 📖 사색형 관찰러(INFJ). 조용히 폰으로 세상을 관찰 📱",
    hashtags: commonTags(["INFJ","사색적","관찰형","철학적"]),
    og: { bg: "mystic-purple", icon: "📖" },
    color: "#C1B2FF",
  },
  INTJ: {
    type: "INTJ",
    emoji: "📐",
    title: "효율 분석러",
    tagline: "앱 구조·생산성 극대화",
    summary: [
      "스마트폰의 모든 기능을 효율적으로 분석하고 활용하는 전략적인 유저.",
      "앱의 구조와 생산성을 극대화하는 방법을 연구하며, 자동화 도구를 선호해요.",
      "불필요한 요소는 과감히 제거하고, 핵심 기능만 최적화해서 사용합니다.",
    ],
    traits: ["효율적","분석적","전략적","최적화","자동화"],
    phoneHabits: ["앱 구조 분석", "생산성 극대화", "자동화 도구 활용"],
    recommendedApps: ["캘린더", "자동화 앱", "분석 도구"],
    shareText: "나는 📐 효율 분석러(INTJ). 앱 구조·생산성 극대화 📱",
    hashtags: commonTags(["INTJ","효율적","분석적","전략적"]),
    og: { bg: "graphite", icon: "📐" },
    color: "#7B8794",
  },
  INTP: {
    type: "INTP",
    emoji: "🔬",
    title: "실험적 분석러",
    tagline: "앱 기능 분석이 취미",
    summary: [
      "앱의 기능과 작동 원리를 분석하는 것을 취미로 하는 실험적인 유저.",
      "AI 앱이나 개발 도구에 관심이 많으며, 새로운 기술을 탐구하는 것을 좋아해요.",
      "논리적이고 체계적인 접근으로 문제를 해결하며, 복잡한 설정도 두려워하지 않습니다.",
    ],
    traits: ["실험적","분석적","논리적","탐구적","기술중시"],
    phoneHabits: ["앱 기능 분석", "AI 앱 탐구", "복잡한 설정 활용"],
    recommendedApps: ["AI 앱", "개발툴", "분석 도구"],
    shareText: "나는 🔬 실험적 분석러(INTP). 앱 기능 분석이 취미 📱",
    hashtags: commonTags(["INTP","실험적","분석적","논리적"]),
    og: { bg: "ice-blue", icon: "🔬" },
    color: "#7CD4FD",
  },
  ISFJ: {
    type: "ISFJ",
    emoji: "🧸",
    title: "정리형 힐러",
    tagline: "사진·메시지 정리 잘함",
    summary: [
      "사진과 메시지를 체계적으로 정리하며, 소중한 추억을 보관하는 세심한 유저.",
      "가족과 친구들의 사진을 꼼꼼히 정리하고, 중요한 메시지는 따로 저장해요.",
      "안정적이고 예측 가능한 앱 환경을 선호하며, 변화보다는 일관성을 중시합니다.",
    ],
    traits: ["정리형","세심함","안정적","보관중시","일관성"],
    phoneHabits: ["사진 체계적 정리", "메시지 보관", "안정적 앱 사용"],
    recommendedApps: ["앨범", "메모", "백업 앱"],
    shareText: "나는 🧸 정리형 힐러(ISFJ). 사진·메시지 정리 잘함 📱",
    hashtags: commonTags(["ISFJ","정리형","세심함","안정적"]),
    og: { bg: "warm-cream", icon: "🧸" },
    color: "#F5CBA7",
  },
  ISFP: {
    type: "ISFP",
    emoji: "🌷",
    title: "감성 소비러",
    tagline: "감정에 따라 앱 사용 변화",
    summary: [
      "감정과 기분에 따라 앱 사용 패턴이 달라지는 감성적인 유저.",
      "음악이나 디자인 앱을 즐겨 사용하며, 아름다운 것들에 대한 감수성이 뛰어나요.",
      "조용하고 개인적인 공간에서 혼자만의 시간을 즐기며, 감정을 표현하는 것을 좋아합니다.",
    ],
    traits: ["감성적","감각적","감정형","개인적","아름다움추구"],
    phoneHabits: ["감정적 앱 사용", "음악/디자인 앱 활용", "개인적 공간 선호"],
    recommendedApps: ["음악 앱", "디자인 앱", "감성 앱"],
    shareText: "나는 🌷 감성 소비러(ISFP). 감정에 따라 앱 사용 변화 📱",
    hashtags: commonTags(["ISFP","감성적","감각적","감정형"]),
    og: { bg: "sage-green", icon: "🌷" },
    color: "#9AD0B2",
  },
  ISTJ: {
    type: "ISTJ",
    emoji: "📦",
    title: "질서 유지러",
    tagline: "폴더 구조 완벽, 반복형",
    summary: [
      "스마트폰의 폴더 구조와 앱 배치를 완벽하게 정리하는 체계적인 유저.",
      "일정과 업무를 꼼꼼히 관리하며, 반복적인 패턴을 선호해요.",
      "신뢰할 수 있고 안정적인 앱만 사용하며, 새로운 변화보다는 검증된 것을 선호합니다.",
    ],
    traits: ["체계적","보수적","반복형","안정적","신뢰성"],
    phoneHabits: ["폴더 완벽 정리", "일정 꼼꼼 관리", "안정적 앱만 사용"],
    recommendedApps: ["생산성 도구", "캘린더", "메모"],
    shareText: "나는 📦 질서 유지러(ISTJ). 폴더 구조 완벽, 반복형 📱",
    hashtags: commonTags(["ISTJ","체계적","보수적","안정적"]),
    og: { bg: "navy-blue", icon: "📦" },
    color: "#2F3E46",
  },
  ISTP: {
    type: "ISTP",
    emoji: "🛠️",
    title: "기능 실용러",
    tagline: "필요한 기능만 딱 사용",
    summary: [
      "스마트폰의 핵심 기능만 실용적으로 활용하는 냉철한 유저.",
      "불필요한 앱은 설치하지 않으며, 필요한 기능만 효율적으로 사용해요.",
      "문제가 생기면 스스로 해결하려고 하며, 기술적인 부분에 관심이 많습니다.",
    ],
    traits: ["실용적","냉철함","독립적","기능중시","문제해결"],
    phoneHabits: ["핵심 기능만 사용", "불필요한 앱 제거", "스스로 문제 해결"],
    recommendedApps: ["계산기", "파일 앱", "유틸리티"],
    shareText: "나는 🛠️ 기능 실용러(ISTP). 필요한 기능만 딱 사용 📱",
    hashtags: commonTags(["ISTP","실용적","냉철함","기능중시"]),
    og: { bg: "charcoal", icon: "🛠️" },
    color: "#4E4E50",
  },
};

// 타입 가드: 결과 없음 방지 (잘못된 type 요청 시 fallback)
export const getPhoneResult = (t: string): PhoneType | null => {
  const key = t.toUpperCase() as MBTI;
  return (PHONE_TYPES as any)[key] ?? null;
};

// 결과 페이지에서 사용할 공통 추천: '나와 케미 좋은 유형' (폰 테스트에는 적용 안 함)
export const getCompanionSuggestion = (t: MBTI) => {
  // 폰 테스트는 동반자 추천 로직이 없으므로 빈 배열 반환
  return [];
};
