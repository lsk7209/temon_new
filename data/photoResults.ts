// 사진 찍는 스타일 테스트 결과 데이터
// 16개 MBTI 유형별 사진 스타일 분석

import { MBTI } from "@/data/travelPackConfig"; // MBTI 타입 재사용

export type PhotoType = {
  type: MBTI;
  emoji: string;
  title: string;          // 캐릭터명
  tagline: string;        // 한 줄 요약
  summary: string[];      // 성향 3~5줄
  traits: string[];       // 키워드 태그
  recommendedStyle: string[]; // 추천 촬영 스타일
  cautionPoints: string[]; // 주의 포인트
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
  "사진성격테스트","사진스타일MBTI","사진습관테스트","사진성격",
  "사진취향","포토스타일","바이럴테스트","사진추천",
  ...extras,
];

export const PHOTO_TYPES: Record<MBTI, PhotoType> = {
  ENFP: {
    type: "ENFP",
    emoji: "🎈",
    title: "감성 즉흥러",
    tagline: "감정 따라 셔터를 누르는 자유 영혼",
    summary: [
      "감정과 순간에 충실한 자유로운 사진러. 계획보다는 그때그때의 느낌을 중요하게 생각해요.",
      "사람들의 표정과 감정을 잘 포착하며, 자연스러운 순간들을 사진에 담는 것을 좋아합니다.",
      "새로운 각도와 시도를 두려워하지 않고, 창의적인 촬영 방식을 즐겨요.",
    ],
    traits: ["감성적","즉흥적","창의적","자유로움","표정포착"],
    recommendedStyle: ["인물 스냅", "여행 사진", "감성 컷"],
    cautionPoints: ["너무 즉흥적이어서 중요한 순간을 놓칠 수 있어요.", "계획적인 촬영도 가끔은 필요합니다."],
    shareText: "나는 🎈 감성 즉흥러(ENFP)! 감정 따라 셔터를 누르는 자유 영혼 📸",
    hashtags: commonTags(["ENFP","감성사진","즉흥촬영","자유영혼"]),
    og: { bg: "candy-pop", icon: "🎈" },
    color: "#FF7EB6",
  },
  ENFJ: {
    type: "ENFJ",
    emoji: "🤝",
    title: "공감 포토러",
    tagline: "사람의 표정과 감정을 잘 담는 타입",
    summary: [
      "사람들의 감정과 표정을 세심하게 관찰하며 따뜻한 사진을 찍는 것을 좋아해요.",
      "단체사진이나 커플사진에서 모든 사람이 만족할 수 있는 구도를 찾아내는 능력이 뛰어납니다.",
      "사진을 통해 사람들과의 관계와 추억을 소중히 여기며, 스토리텔링을 중시해요.",
    ],
    traits: ["따뜻함","공감형","관계중심","스토리텔링","단체사진"],
    recommendedStyle: ["커플사진", "다큐 촬영", "가족사진"],
    cautionPoints: ["모든 사람을 만족시키려다 자신의 스타일을 잃을 수 있어요.", "가끔은 자신만의 관점도 중요합니다."],
    shareText: "나는 🤝 공감 포토러(ENFJ)! 사람의 표정과 감정을 잘 담는 타입 📸",
    hashtags: commonTags(["ENFJ","공감사진","따뜻한사진","관계중심"]),
    og: { bg: "warm-pink", icon: "🤝" },
    color: "#FF9EC1",
  },
  ENTJ: {
    type: "ENTJ",
    emoji: "🧱",
    title: "완벽 프레임러",
    tagline: "구도·밝기·계획까지 통제형",
    summary: [
      "사진 촬영에 있어 완벽함을 추구하는 전략적 사진러. 구도, 조명, 타이밍까지 철저히 계획해요.",
      "효율적인 촬영을 위해 미리 장소를 조사하고, 최적의 시간대와 각도를 계산합니다.",
      "결과물의 품질을 최우선으로 생각하며, 아키텍처나 광고 사진 같은 전문적인 촬영을 선호해요.",
    ],
    traits: ["완벽주의","전략적","효율적","통제형","품질중시"],
    recommendedStyle: ["아키텍처", "광고 사진", "전문 촬영"],
    cautionPoints: ["너무 완벽을 추구하다가 자연스러운 순간을 놓칠 수 있어요.", "가끔은 즉흥적인 촬영도 즐겨보세요."],
    shareText: "나는 🧱 완벽 프레임러(ENTJ)! 구도·밝기·계획까지 통제형 📸",
    hashtags: commonTags(["ENTJ","완벽주의","전략적촬영","품질중시"]),
    og: { bg: "steel-blue", icon: "🧱" },
    color: "#4B6BFB",
  },
  ENTP: {
    type: "ENTP",
    emoji: "🧪",
    title: "실험 포토러",
    tagline: "새로운 각도와 시도 즐기는 창의러",
    summary: [
      "기존의 틀에 얽매이지 않고 새로운 시도와 실험을 즐기는 창의적인 사진러.",
      "독특한 각도나 색다른 기법을 시도하며, 예상치 못한 결과물을 만들어내는 것을 좋아해요.",
      "거리 스냅이나 콘셉트 촬영처럼 독창적인 아이디어를 사진에 담는 것을 즐깁니다.",
    ],
    traits: ["창의적","실험적","독창적","호기심","새로운시도"],
    recommendedStyle: ["거리 스냅", "콘셉트 촬영", "실험 사진"],
    cautionPoints: ["너무 실험적이어서 기본기를 놓칠 수 있어요.", "가끔은 전통적인 촬영도 중요합니다."],
    shareText: "나는 🧪 실험 포토러(ENTP)! 새로운 각도와 시도 즐기는 창의러 📸",
    hashtags: commonTags(["ENTP","실험사진","창의적","독창적"]),
    og: { bg: "neon-purple", icon: "🧪" },
    color: "#8A8AFF",
  },
  ESFJ: {
    type: "ESFJ",
    emoji: "😊",
    title: "인싸 셔터러",
    tagline: "친구와 함께 사진 남기길 좋아함",
    summary: [
      "사람들과 함께하는 순간을 소중히 여기며, 단체사진이나 브이로그 컷을 찍는 것을 좋아해요.",
      "모든 사람이 만족할 수 있는 사진을 찍기 위해 노력하며, 긍정적인 분위기를 만드는 데 능숙합니다.",
      "SNS에 올릴 사진들을 미리 계획하고, 친구들과 함께 즐거운 촬영 시간을 만드는 것을 선호해요.",
    ],
    traits: ["사교적","긍정적","협력적","관계중심","브이로그"],
    recommendedStyle: ["단체사진", "브이로그 컷", "친구사진"],
    cautionPoints: ["모든 사람을 만족시키려다 자신의 스타일을 잃을 수 있어요.", "가끔은 혼자만의 촬영도 즐겨보세요."],
    shareText: "나는 😊 인싸 셔터러(ESFJ)! 친구와 함께 사진 남기길 좋아함 📸",
    hashtags: commonTags(["ESFJ","인싸사진","단체사진","브이로그"]),
    og: { bg: "soft-yellow", icon: "😊" },
    color: "#FFC65A",
  },
  ESFP: {
    type: "ESFP",
    emoji: "📸",
    title: "감각 포토러",
    tagline: "빛과 색에 민감한 SNS형",
    summary: [
      "빛과 색감에 매우 민감하며, 트렌디하고 감각적인 사진을 찍는 것을 좋아해요.",
      "SNS에 올릴 사진을 염두에 두고 촬영하며, 패션이나 라이프스타일 사진에 강점을 보입니다.",
      "즉흥적이고 자연스러운 순간을 포착하는 능력이 뛰어나며, 감정적인 표현을 중시해요.",
    ],
    traits: ["감각적","트렌디","SNS형","즉흥적","색감중시"],
    recommendedStyle: ["패션", "라이프샷", "감성 사진"],
    cautionPoints: ["트렌드에만 치중하다가 개성 있는 사진을 놓칠 수 있어요.", "가끔은 클래식한 스타일도 시도해보세요."],
    shareText: "나는 📸 감각 포토러(ESFP)! 빛과 색에 민감한 SNS형 📸",
    hashtags: commonTags(["ESFP","감각사진","SNS형","트렌디"]),
    og: { bg: "sunset-pink", icon: "📸" },
    color: "#FF9EC1",
  },
  ESTJ: {
    type: "ESTJ",
    emoji: "📋",
    title: "기록 매니저",
    tagline: "시간대·구도·장소 다 관리",
    summary: [
      "체계적이고 계획적인 사진 촬영을 선호하며, 시간대, 구도, 장소를 모두 관리하는 것을 좋아해요.",
      "여행이나 일정에 맞춰 사진을 찍으며, 기록과 보관에 중점을 둡니다.",
      "실용적이고 현실적인 접근으로, 꾸준히 좋은 사진을 만들어내는 능력이 뛰어나요.",
    ],
    traits: ["체계적","계획적","현실적","기록중심","실용적"],
    recommendedStyle: ["여행 기록", "일정 사진", "문서화"],
    cautionPoints: ["너무 계획적이어서 즉흥적인 순간을 놓칠 수 있어요.", "가끔은 자유로운 촬영도 즐겨보세요."],
    shareText: "나는 📋 기록 매니저(ESTJ)! 시간대·구도·장소 다 관리 📸",
    hashtags: commonTags(["ESTJ","체계적촬영","기록중심","계획적"]),
    og: { bg: "clean-blue", icon: "📋" },
    color: "#5AC8FA",
  },
  ESTP: {
    type: "ESTP",
    emoji: "⚡",
    title: "액션 포토러",
    tagline: "빠른 반응, 순간 포착 강점",
    summary: [
      "빠른 반응속도와 순간 포착 능력이 뛰어난 액션형 사진러. 움직이는 피사체를 잘 담아내요.",
      "즉흥적이고 스피디한 촬영을 선호하며, 스포츠나 공연 사진 같은 역동적인 장면을 좋아합니다.",
      "고민보다는 바로 실행하는 스타일로, 생생한 순간을 사진에 담는 것을 즐겨요.",
    ],
    traits: ["빠른반응","순간포착","액션형","즉흥적","스피드"],
    recommendedStyle: ["스포츠", "공연 사진", "액션 촬영"],
    cautionPoints: ["너무 빠르게 촬영하다가 세심한 부분을 놓칠 수 있어요.", "가끔은 천천히 촬영해보세요."],
    shareText: "나는 ⚡ 액션 포토러(ESTP)! 빠른 반응, 순간 포착 강점 📸",
    hashtags: commonTags(["ESTP","액션사진","순간포착","빠른반응"]),
    og: { bg: "lime-green", icon: "⚡" },
    color: "#9AE66E",
  },
  INFP: {
    type: "INFP",
    emoji: "🌙",
    title: "몽환 스냅러",
    tagline: "감정의 결을 사진에 담음",
    summary: [
      "내면의 감정과 깊은 생각을 사진에 담는 몽환적인 사진러. 감성적이고 철학적인 접근을 해요.",
      "흑백 사진이나 자연광을 활용한 인물 사진을 선호하며, 단순함 속에서 깊은 의미를 찾습니다.",
      "사진을 통해 자신만의 세계관을 표현하며, 아름다움과 감동을 전달하는 것을 중요하게 생각해요.",
    ],
    traits: ["감성적","몽환적","내면형","철학적","깊이"],
    recommendedStyle: ["흑백", "자연광 인물", "감성 풍경"],
    cautionPoints: ["너무 감정에 치우쳐 기술적인 부분을 소홀히 할 수 있어요.", "가끔은 객관적인 시각도 필요합니다."],
    shareText: "나는 🌙 몽환 스냅러(INFP)! 감정의 결을 사진에 담음 📸",
    hashtags: commonTags(["INFP","몽환사진","감성적","내면형"]),
    og: { bg: "dreamy-violet", icon: "🌙" },
    color: "#9D7AF0",
  },
  INFJ: {
    type: "INFJ",
    emoji: "📖",
    title: "사색 포토러",
    tagline: "한 장에 이야기 담는 예술형",
    summary: [
      "사진 한 장에 깊은 이야기와 의미를 담는 사색적인 사진러. 예술적이고 철학적인 접근을 해요.",
      "풍경이나 감정적인 초상 사진을 선호하며, 단순한 기록을 넘어서 감동을 전달하는 것을 중요하게 생각합니다.",
      "몰입도가 높고 심리적인 깊이를 중시하며, 사진을 통해 세상을 바라보는 자신만의 관점을 표현해요.",
    ],
    traits: ["사색적","예술적","몰입형","심리적깊이","이야기중심"],
    recommendedStyle: ["풍경", "감정 초상", "예술 사진"],
    cautionPoints: ["너무 깊이 생각하다가 촬영 기회를 놓칠 수 있어요.", "가끔은 가벼운 마음으로 촬영해보세요."],
    shareText: "나는 📖 사색 포토러(INFJ). 한 장에 이야기 담는 예술형 📸",
    hashtags: commonTags(["INFJ","사색사진","예술적","몰입형"]),
    og: { bg: "mystic-purple", icon: "📖" },
    color: "#C1B2FF",
  },
  INTJ: {
    type: "INTJ",
    emoji: "📐",
    title: "전략 포토러",
    tagline: "빛·구도 분석 완벽주의자",
    summary: [
      "빛과 구도를 과학적으로 분석하며 완벽한 사진을 추구하는 전략적 사진러.",
      "미니멀리즘이나 아키텍처 같은 구조적인 아름다움을 선호하며, 계획적이고 체계적인 촬영을 해요.",
      "기술적인 완성도와 예술적 완성도를 모두 추구하며, 장기적인 관점에서 사진 기술을 발전시킵니다.",
    ],
    traits: ["전략적","완벽주의","분석적","구조적","기술중시"],
    recommendedStyle: ["미니멀리즘", "아키텍처", "기하학적"],
    cautionPoints: ["너무 완벽을 추구하다가 자연스러운 순간을 놓칠 수 있어요.", "가끔은 자유로운 촬영도 즐겨보세요."],
    shareText: "나는 📐 전략 포토러(INTJ). 빛·구도 분석 완벽주의자 📸",
    hashtags: commonTags(["INTJ","전략사진","완벽주의","분석적"]),
    og: { bg: "graphite", icon: "📐" },
    color: "#7B8794",
  },
  INTP: {
    type: "INTP",
    emoji: "🔬",
    title: "분석 카메러",
    tagline: "렌즈·조리개 등 기술에 몰입",
    summary: [
      "카메라의 기술적 측면에 깊이 몰입하는 분석적인 사진러. 렌즈, 조리개, 셔터스피드 등을 꼼꼼히 연구해요.",
      "기계적인 피사체나 디테일한 부분을 촬영하는 것을 좋아하며, 실험적인 촬영 기법을 시도합니다.",
      "사진의 원리와 기술에 대한 호기심이 많으며, 새로운 장비나 기법을 배우는 것을 즐겨요.",
    ],
    traits: ["분석적","기술중시","탐구적","실험적","디테일"],
    recommendedStyle: ["매크로", "기계적 피사체", "실험 촬영"],
    cautionPoints: ["기술에만 몰입하다가 감성적인 사진을 놓칠 수 있어요.", "가끔은 마음으로 촬영해보세요."],
    shareText: "나는 🔬 분석 카메러(INTP). 렌즈·조리개 등 기술에 몰입 📸",
    hashtags: commonTags(["INTP","분석사진","기술중시","탐구적"]),
    og: { bg: "ice-blue", icon: "🔬" },
    color: "#7CD4FD",
  },
  ISFJ: {
    type: "ISFJ",
    emoji: "🧸",
    title: "추억 보관러",
    tagline: "사진=기억, 정리형 보관 태도",
    summary: [
      "사진을 소중한 추억으로 여기며, 가족이나 일상의 기록을 꼼꼼히 정리하는 따뜻한 사진러.",
      "사진을 통해 소중한 사람들과의 시간을 기록하며, 나중에 돌아볼 수 있도록 체계적으로 보관해요.",
      "따뜻하고 정감 있는 사진을 선호하며, 사진을 통해 관계와 사랑을 표현하는 것을 중요하게 생각합니다.",
    ],
    traits: ["따뜻함","기록중심","정리형","관계중시","추억중심"],
    recommendedStyle: ["가족사진", "일상 기록", "정감 사진"],
    cautionPoints: ["너무 기록에만 치중하다가 순간의 즐거움을 놓칠 수 있어요.", "가끔은 즉흥적인 촬영도 즐겨보세요."],
    shareText: "나는 🧸 추억 보관러(ISFJ). 사진=기억, 정리형 보관 태도 📸",
    hashtags: commonTags(["ISFJ","추억사진","따뜻한사진","기록중심"]),
    og: { bg: "warm-cream", icon: "🧸" },
    color: "#F5CBA7",
  },
  ISFP: {
    type: "ISFP",
    emoji: "🌿",
    title: "감성 힐러러",
    tagline: "분위기 중심 감각적 촬영",
    summary: [
      "분위기와 감각을 중시하는 감성적인 사진러. 비주얼보다는 느낌과 분위기를 중요하게 생각해요.",
      "감성적인 풍경이나 플로럴 컷을 선호하며, 자연스럽고 아름다운 순간을 포착하는 능력이 뛰어납니다.",
      "직관적이고 감각적인 촬영을 하며, 사진을 통해 마음의 평화와 위로를 얻는 것을 좋아해요.",
    ],
    traits: ["감성적","분위기중시","감각적","직관적","자연스러움"],
    recommendedStyle: ["감성 풍경", "플로럴 컷", "자연 사진"],
    cautionPoints: ["너무 감정에 치우쳐 객관적인 시각을 놓칠 수 있어요.", "가끔은 기술적인 접근도 필요합니다."],
    shareText: "나는 🌿 감성 힐러러(ISFP). 분위기 중심 감각적 촬영 📸",
    hashtags: commonTags(["ISFP","감성사진","분위기중시","자연스러움"]),
    og: { bg: "sage-green", icon: "🌿" },
    color: "#9AD0B2",
  },
  ISTJ: {
    type: "ISTJ",
    emoji: "📦",
    title: "정석 포토러",
    tagline: "항상 안정된 구도와 정직한 표현",
    summary: [
      "전통적이고 안정적인 촬영 방식을 선호하는 정석적인 사진러. 기본기에 충실한 접근을 해요.",
      "풍경이나 인물의 정면 촬영을 선호하며, 정직하고 진실된 표현을 중시합니다.",
      "규칙적이고 체계적인 촬영을 하며, 꾸준히 좋은 사진을 만들어내는 능력이 뛰어나요.",
    ],
    traits: ["정석적","안정적","정직함","체계적","기본기중시"],
    recommendedStyle: ["풍경", "인물 정면", "전통적"],
    cautionPoints: ["너무 안정적이어서 새로운 시도를 놓칠 수 있어요.", "가끔은 실험적인 촬영도 즐겨보세요."],
    shareText: "나는 📦 정석 포토러(ISTJ). 항상 안정된 구도와 정직한 표현 📸",
    hashtags: commonTags(["ISTJ","정석사진","안정적","체계적"]),
    og: { bg: "navy-blue", icon: "📦" },
    color: "#2F3E46",
  },
  ISTP: {
    type: "ISTP",
    emoji: "🛠️",
    title: "실용 셔터러",
    tagline: "기능 이해 빠른 실용형 포토러",
    summary: [
      "카메라의 기능을 빠르게 이해하고 실용적으로 활용하는 독립적인 사진러.",
      "매크로 촬영이나 거리 스냅 같은 구체적이고 실용적인 촬영을 선호해요.",
      "혼자서도 잘 촬영하며, 기술적인 문제를 스스로 해결하는 능력이 뛰어납니다.",
    ],
    traits: ["실용적","독립적","기능중시","구체적","문제해결"],
    recommendedStyle: ["매크로", "거리 스냅", "기능 촬영"],
    cautionPoints: ["너무 실용적이어서 감성적인 사진을 놓칠 수 있어요.", "가끔은 마음으로 촬영해보세요."],
    shareText: "나는 🛠️ 실용 셔터러(ISTP). 기능 이해 빠른 실용형 포토러 📸",
    hashtags: commonTags(["ISTP","실용사진","독립적","기능중시"]),
    og: { bg: "charcoal", icon: "🛠️" },
    color: "#4E4E50",
  },
};

// 타입 가드: 결과 없음 방지 (잘못된 type 요청 시 fallback)
export const getPhotoResult = (t: string): PhotoType | null => {
  const key = t.toUpperCase() as MBTI;
  return (PHOTO_TYPES as any)[key] ?? null;
};

// 결과 페이지에서 사용할 공통 추천: '나와 케미 좋은 유형' (사진 테스트에는 적용 안 함)
export const getCompanionSuggestion = (t: MBTI) => {
  // 사진 테스트는 동반자 추천 로직이 없으므로 빈 배열 반환
  return [];
};
