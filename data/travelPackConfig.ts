export type MBTI =
  | "ENFJ" | "ENFP" | "ENTJ" | "ENTP"
  | "ESFJ" | "ESFP" | "ESTJ" | "ESTP"
  | "INFJ" | "INFP" | "INTJ" | "INTP"
  | "ISFJ" | "ISFP" | "ISTJ" | "ISTP";

export type PackType = {
  type: MBTI;
  emoji: string;
  title: string;          // 캐릭터명
  tagline: string;        // 한 줄 요약
  summary: string[];      // 성향 3~5줄
  traits: string[];       // 키워드 태그
  packingTips: string[];  // 짐싸기 팁 3~5
  checklistTop3: string[];// 핵심 챙김템
  idealDestinations: {    // GEO/AEO: 한국/아시아/글로벌 혼합
    domestic: string[];
    asia: string[];
    global: string[];
  };
  bestCompanions: MBTI[]; // 케미 좋은 유형
  avoidCompanions: MBTI[];// 동선충돌 유형(가볍게)
  shareText: string;      // 공유 문구
  hashtags: string[];     // SEO/AEO용 해시태그
  og: {
    bg: string;           // OG 배경 hint (색상/그라디언트 키)
    icon: string;         // OG 상징 이모지/아이콘 텍스트
  };
  color?: string;         // UI 테마(선택)
};

export interface TravelPackQuestion {
  id: number
  question: string
  choiceA: {
    text: string
    tags: string[]
  }
  choiceB: {
    text: string
    tags: string[]
  }
}

export const travelPackQuestions: TravelPackQuestion[] = [
  {
    id: 1,
    question: "여행 전날 밤, 당신은?",
    choiceA: { text: "이미 다 챙겨놨다", tags: ["J"] },
    choiceB: { text: "아침에 급히 챙긴다", tags: ["P"] }
  },
  {
    id: 2,
    question: "캐리어를 열면?",
    choiceA: { text: "카테고리별 정리 완료", tags: ["S"] },
    choiceB: { text: "이게 왜 여기 있지?", tags: ["N"] }
  },
  {
    id: 3,
    question: "여행지 도착 직후",
    choiceA: { text: "일정표 확인", tags: ["J"] },
    choiceB: { text: "풍경부터 구경", tags: ["P"] }
  },
  {
    id: 4,
    question: "짐 챙길 때 우선순위",
    choiceA: { text: "실용성 중심", tags: ["T"] },
    choiceB: { text: "감성템 꼭 챙김", tags: ["F"] }
  },
  {
    id: 5,
    question: "친구가 대신 싸준다면",
    choiceA: { text: "감사하지만 다시 확인", tags: ["J"] },
    choiceB: { text: "맡기고 신뢰", tags: ["P"] }
  },
  {
    id: 6,
    question: "옷 고를 때",
    choiceA: { text: "날씨·계획 기준", tags: ["S"] },
    choiceB: { text: "느낌과 감정대로", tags: ["N"] }
  },
  {
    id: 7,
    question: "여권·지갑 등 중요물건",
    choiceA: { text: "수납공간 정해둠", tags: ["J"] },
    choiceB: { text: "필요할 때 찾음", tags: ["P"] }
  },
  {
    id: 8,
    question: "캐리어 무게 초과!",
    choiceA: { text: "침착하게 재정리", tags: ["T"] },
    choiceB: { text: "일단 들고 출발", tags: ["F"] }
  },
  {
    id: 9,
    question: "여행 중 사진은",
    choiceA: { text: "기록용으로 남김", tags: ["S"] },
    choiceB: { text: "분위기/감정 중심", tags: ["N"] }
  },
  {
    id: 10,
    question: "여행 중 변수 발생 시",
    choiceA: { text: "즉시 대처(현실)", tags: ["T"] },
    choiceB: { text: "흘러가는 대로", tags: ["F"] }
  },
  {
    id: 11,
    question: "친구와의 준비",
    choiceA: { text: "주도적 계획 세움", tags: ["E"] },
    choiceB: { text: "제안에 맞춰 참여", tags: ["I"] }
  },
  {
    id: 12,
    question: "공항 대기시간",
    choiceA: { text: "사람들과 대화", tags: ["E"] },
    choiceB: { text: "조용히 책/폰", tags: ["I"] }
  }
]

// 공통 해시태그 빌더
const commonTags = (extras: string[]) => [
  "여행MBTI","짐싸는스타일","여행테스트","여행성향",
  "여행팁","체크리스트","바이럴테스트","여행준비",
  ...extras,
];

export const TRAVEL_PACK_TYPES: Record<MBTI, PackType> = {
  ENFJ: {
    type: "ENFJ",
    emoji: "🧳✨",
    title: "케어풀 플래너",
    tagline: "내 짐보다 동행의 짐부터 챙기는 사람",
    summary: [
      "동행 우선, 모두의 편안함을 챙기는 리더형.",
      "공용 아이템(멀티탭/상비약/물티슈)은 기본으로 준비.",
      "일정표와 역할분담을 공유하며 팀 밸런스를 맞춰요.",
    ],
    traits: ["배려형","공유아이템러","일정관리","리더십","협업"],
    packingTips: [
      "공용템은 지퍼백으로 카테고리화(약·위생·IT).",
      "공유 드라이브에 체크리스트 링크(실시간 완료 체크).",
      "'비상 키트'(파스/지사제/연고/밴드)를 소형 파우치로.",
    ],
    checklistTop3: ["멀티탭","상비약 키트","여분 마스크/물티슈"],
    idealDestinations: {
      domestic: ["전주 한옥마을", "강릉 주문진", "여수 낭만포차"],
      asia: ["오사카", "타이베이", "다낭"],
      global: ["바르셀로나", "리스본", "시드니"],
    },
    bestCompanions: ["ISFP","ISTJ","INFP"],
    avoidCompanions: ["ENTP","ESTP"],
    shareText: "나는 🧳✨ '케어풀 플래너(ENFJ)'! 내 짐보다 너 짐이 더 신경 쓰임 😆",
    hashtags: commonTags(["ENFJ","여행리더","공유아이템","상비약체크"]),
    og: { bg: "warm-gradient", icon: "🧳" },
    color: "#FFB86C",
  },

  ENFP: {
    type: "ENFP",
    emoji: "🎒🎈",
    title: "즉흥 감성 패커",
    tagline: "짐은 가볍게, 순간은 무겁게",
    summary: [
      "설렘에 우선순위를 두는 라이트 패커.",
      "현지에서 발견하고 채우는 재미를 좋아해요.",
      "짐보다 '에너지'를 들고 가는 편.",
    ],
    traits: ["라이트패킹","즉흥","현지구매","감성샷"],
    packingTips: [
      "만능템 3개 원칙(슬링백·우산겸용 방수자켓·보조배터리).",
      "세면도구·화장품은 현지 드럭스토어 플랜 세팅.",
      "기념품 여유를 위해 20% 빈 공간 확보.",
    ],
    checklistTop3: ["보조배터리", "다용도 자켓", "슬링백"],
    idealDestinations: {
      domestic: ["부산 영도", "속초 청초호", "서울 성수"],
      asia: ["방콕", "하노이", "세부"],
      global: ["암스테르담", "LA", "멕시코시티"],
    },
    bestCompanions: ["ISFJ","ESTJ","INFJ"],
    avoidCompanions: ["ISTJ","INTJ"],
    shareText: "나는 🎒🎈 즉흥 감성 패커(ENFP)! 짐은 가벼울수록 설렘은 커진다 🌈",
    hashtags: commonTags(["ENFP","라이트패킹","감성여행","즉흥여행"]),
    og: { bg: "candy-pop", icon: "🎒" },
    color: "#FF7EB6",
  },

  ENTJ: {
    type: "ENTJ",
    emoji: "🧱🗺️",
    title: "시스템 마스터",
    tagline: "무게·부피·활용도, 최적해로 포장완료",
    summary: [
      "압축팩/큐브로 무게-부피 최적화를 즐김.",
      "예상 시나리오별 모듈 구성(비즈·액티브·캐주얼).",
      "현지 이동·시간 단축에 강박적으로 진심.",
    ],
    traits: ["최적화","압축팩","모듈화","업무겸여행"],
    packingTips: [
      "의류 큐브(상·하·이너) 색상별로 분할.",
      "전자기기·문서 파우치 따로(보안검색 스트레스↓).",
      "호텔/항공/교통 바코드는 오프라인 지갑에 저장.",
    ],
    checklistTop3: ["압축팩 세트","여권/서류 파우치","멀티어댑터"],
    idealDestinations: {
      domestic: ["판교-송도 비즈트립", "서울 국제포럼권"],
      asia: ["상하이", "싱가포르", "도쿄"],
      global: ["뉴욕", "런던", "프랑크푸르트"],
    },
    bestCompanions: ["ISFP","ESFJ","ISTP"],
    avoidCompanions: ["ENFP","INFP"],
    shareText: "나는 🧱🗺️ 시스템 마스터(ENTJ)! 내 캐리어엔 낭비가 없다.",
    hashtags: commonTags(["ENTJ","압축팩","비즈트립","여행최적화"]),
    og: { bg: "steel-blue", icon: "🧱" },
    color: "#4B6BFB",
  },

  ENTP: {
    type: "ENTP",
    emoji: "🧪📦",
    title: "실험적 패킹러",
    tagline: "새로운 팁은 일단 써본다",
    summary: [
      "신박템 테스트를 여행에서 실전 투입.",
      "'가능하면 한 번에' 롤링 전략 선호.",
      "돌발상황은 즉석 변주로 해결.",
    ],
    traits: ["기술템","신박템","롤링","변주"],
    packingTips: [
      "케이블 올인원 허브/멀티충전기 사용.",
      "의류는 '롤링+밴드' 콤보로 주름·공간 동시 관리.",
      "기내용 배터리 규정은 출발 전 마지막으로 재확인.",
    ],
    checklistTop3: ["멀티충전허브","케이블 올인원","여분 파우치"],
    idealDestinations: {
      domestic: ["대구 근대골목", "광주 양림동", "부산 서면"],
      asia: ["홍콩", "쿠알라룸푸르", "타이중"],
      global: ["베를린", "텔아비브", "샌프란시스코"],
    },
    bestCompanions: ["ISFJ","ESFJ","ISTJ"],
    avoidCompanions: ["INFJ","ISFP"],
    shareText: "나는 🧪📦 실험적 패킹러(ENTP)! 신박템은 실전에서 검증한다.",
    hashtags: commonTags(["ENTP","신박템","여행기술템","롤링포장"]),
    og: { bg: "neon-dark", icon: "🧪" },
    color: "#8A8AFF",
  },

  ESFJ: {
    type: "ESFJ",
    emoji: "🧼💗",
    title: "클린 케어러",
    tagline: "위생·편안함·동행 배려 풀옵션",
    summary: [
      "위생/편안함/공유 간식까지 완비.",
      "숙소 동선, 수납 동선까지 배려형 설계.",
      "사진 찍을 때 필요한 소소템도 챙겨줌.",
    ],
    traits: ["위생","편안","공유간식","사진서포트"],
    packingTips: [
      "지퍼백 사이즈 3종으로 쓰레기/젖은물건 구분.",
      "개인 수건·슬리퍼·파자마는 초경량 제품 추천.",
      "공유 간식은 1~2인분 소포장으로 여러 맛.",
    ],
    checklistTop3: ["슬리퍼","개인 수건/파자마","소포장 간식"],
    idealDestinations: {
      domestic: ["제주 애월", "남해 독일마을", "여수 카페거리"],
      asia: ["다낭", "푸켓", "코타키나발루"],
      global: ["하와이", "괌", "니스"],
    },
    bestCompanions: ["INTJ","ISTJ","ENFJ"],
    avoidCompanions: ["ESTP","ENTP"],
    shareText: "나는 🧼💗 클린 케어러(ESFJ)! 너 편하면 나도 행복해.",
    hashtags: commonTags(["ESFJ","여행위생","숙소준비","공유간식"]),
    og: { bg: "soft-pink", icon: "🧼" },
    color: "#FF9EC1",
  },

  ESFP: {
    type: "ESFP",
    emoji: "📸🎊",
    title: "하이라이트 헌터",
    tagline: "짐보다 사진, 순간이 우선!",
    summary: [
      "포토스팟과 TPO 맞춤 코디가 핵심.",
      "액세서리는 가볍게, 색 포인트는 확실히.",
      "충전·저장 장비는 필수.",
    ],
    traits: ["포토스팟","TPO코디","액세서리","콘텐츠"],
    packingTips: [
      "코디는 상·하·아우터 3룩 조합으로 6벌 효과.",
      "휴대용 조명/삼각대는 미니 버전으로.",
      "여분 SD·클라우드 백업 동시 준비.",
    ],
    checklistTop3: ["미니 삼각대", "휴대용 조명", "여분 SD/클라우드"],
    idealDestinations: {
      domestic: ["경주 황리단길", "제주 협재", "여수 해변"],
      asia: ["푸꾸옥", "대만 지우펀", "교토"],
      global: ["산토리니", "파리", "두브로브니크"],
    },
    bestCompanions: ["INTP","ISFJ","ENFJ"],
    avoidCompanions: ["ISTJ","INTJ"],
    shareText: "나는 📸🎊 하이라이트 헌터(ESFP)! 오늘의 하이라이트는 내가 만든다.",
    hashtags: commonTags(["ESFP","포토스팟","여행코디","콘텐츠여행"]),
    og: { bg: "sunset-glow", icon: "📸" },
    color: "#FFC65A",
  },

  ESTJ: {
    type: "ESTJ",
    emoji: "📑🧰",
    title: "정석 매뉴얼러",
    tagline: "매뉴얼대로, 계획대로, 완벽하게",
    summary: [
      "체크리스트·타임라인·예산표를 철저히.",
      "위탁/기내 규정·보험·환율까지 사전 점검.",
      "짐은 '필수→선택' 계층화로 누락 제로.",
    ],
    traits: ["체크리스트","규정준수","보험","예산관리"],
    packingTips: [
      "출발-귀국 '2단 리스트'(소모품 리필 항목 분리).",
      "액체 규정은 파우치 2개로(보안·기내).",
      "수하물 지연 대비 1일 치 착장 기내에 분산.",
    ],
    checklistTop3: ["체크리스트 앱", "액체파우치x2", "여행자보험 서류"],
    idealDestinations: {
      domestic: ["서울 박람회/컨벤션", "부산 MICE"],
      asia: ["도쿄", "싱가포르", "타이베이"],
      global: ["취리히", "밴쿠버", "스톡홀름"],
    },
    bestCompanions: ["INFP","ISFP","ENFJ"],
    avoidCompanions: ["ENTP","ESFP"],
    shareText: "나는 📑🧰 정석 매뉴얼러(ESTJ)! 누락? 내 사전에 그런 단어 없음.",
    hashtags: commonTags(["ESTJ","여행매뉴얼","규정준수","체크리스트앱"]),
    og: { bg: "clean-white", icon: "📑" },
    color: "#5AC8FA",
  },

  ESTP: {
    type: "ESTP",
    emoji: "🛵⚡",
    title: "스피드 최적화러",
    tagline: "가볍게, 빠르게, 바로 출발!",
    summary: [
      "기내용 1캐리어 원칙, 반복 코디로 부담↓.",
      "대형템은 현지조달·대여 전략.",
      "이동-체험 타이트한 일정에 강함.",
    ],
    traits: ["라이트","현지조달","대여","속도"],
    packingTips: [
      "코디 색상 통일→세탁/건조 스트레스↓.",
      "수영·액티비티 장비는 렌탈 우선.",
      "유심/eSIM, 교통카드는 출발 전에 세팅.",
    ],
    checklistTop3: ["eSIM/유심", "교통카드", "경량 캐리어"],
    idealDestinations: {
      domestic: ["양양 서핑", "강촌 레저", "여수 액티비티"],
      asia: ["세부", "보홀", "치앙마이"],
      global: ["골드코스트", "퀸스타운", "마우이"],
    },
    bestCompanions: ["INFJ","ISFJ","ENFJ"],
    avoidCompanions: ["ISFP","INFP"],
    shareText: "나는 🛵⚡ 스피드 최적화러(ESTP)! 가볍게 가고 크게 즐긴다.",
    hashtags: commonTags(["ESTP","라이트캐리","액티비티","현지대여"]),
    og: { bg: "lime-flash", icon: "⚡" },
    color: "#9AE66E",
  },

  INFJ: {
    type: "INFJ",
    emoji: "🌫️📖",
    title: "무드 큐레이터",
    tagline: "분위기가 짐을 고르게 한다",
    summary: [
      "무드·테마 중심으로 소품을 큐레이션.",
      "독서/카페/걷기 동선에 최적화.",
      "소란보다 침잠을 택하는 편.",
    ],
    traits: ["테마여행","소품","정적루트","감성"],
    packingTips: [
      "리딩 키트(전자책·이어플러그·필기구) 고정.",
      "스카프/가디건 1개로 모든 코디에 무드 부여.",
      "사진은 RAW+HEIC 동시 저장(후보정 대비).",
    ],
    checklistTop3: ["전자책/이어플러그", "스카프", "메모킷"],
    idealDestinations: {
      domestic: ["통영 동피랑", "강릉 안목해변", "담양 메타세쿼이아"],
      asia: ["가고시마", "가나자와", "순천/여수 연계"],
      global: ["프라하", "부다페스트", "에든버러"],
    },
    bestCompanions: ["ENFJ","ISFJ","INTP"],
    avoidCompanions: ["ESTP","ENTP"],
    shareText: "나는 🌫️📖 무드 큐레이터(INFJ). 조용한 설렘, 오래 남는 기억.",
    hashtags: commonTags(["INFJ","감성여행","리딩키트","테마여행"]),
    og: { bg: "fog-lilac", icon: "📖" },
    color: "#C1B2FF",
  },

  INFP: {
    type: "INFP",
    emoji: "🌙🪄",
    title: "드림 포켓러",
    tagline: "작지만 소중한 것들로 가득",
    summary: [
      "작은 파우치에 의미 있는 물건을 담음.",
      "일정은 여백을 남겨 감정을 따라감.",
      "일기/스티커/엽서로 기억을 수집.",
    ],
    traits: ["여백일정","감정기록","소소템","수집가"],
    packingTips: [
      "감정 키트(미니노트·펜·폴라로이드) 고정.",
      "불필요한 케이블은 2in1 타입으로 최소화.",
      "기념품 예산 소액봉투로 분리 지출.",
    ],
    checklistTop3: ["미니노트/펜", "폴라로이드/스티커", "2in1 케이블"],
    idealDestinations: {
      domestic: ["양양 서피비치 오프시즌", "군산 경암동 철길마을", "목포 근대역사"],
      asia: ["치바", "쿠마모토", "치앙마이"],
      global: ["포틀랜드", "레이캬비크", "나폴리 소도시권"],
    },
    bestCompanions: ["ESTJ","ESFJ","ENFJ"],
    avoidCompanions: ["ENTJ","ESTP"],
    shareText: "나는 🌙🪄 드림 포켓러(INFP). 여행은 마음에 담는 것.",
    hashtags: commonTags(["INFP","감성기록","여행일기","여행굿즈"]),
    og: { bg: "dreamy-violet", icon: "🌙" },
    color: "#9D7AF0",
  },

  INTJ: {
    type: "INTJ",
    emoji: "📐🧠",
    title: "전략 큐브러",
    tagline: "계획은 단순, 실행은 정확",
    summary: [
      "의사결정 피로 최소화를 위한 '큐브·룩' 고정.",
      "미니멀+확장성(겹침·레이어) 조합 선호.",
      "동선/보안/체력 관리에 냉정함.",
    ],
    traits: ["미니멀","룩고정","동선설계","보안집중"],
    packingTips: [
      "룩 2세트(도시/자연)로 레이어 변형.",
      "보안구역 분리 수납(전자·문서·액체).",
      "건강보조제는 데일리 파우치로 일자 포장.",
    ],
    checklistTop3: ["의류 큐브", "여권/문서 파우치", "데일리 서플리"],
    idealDestinations: {
      domestic: ["서울 북촌·성수", "부산 해운대 비수기", "대전 성심당 투어"],
      asia: ["교토", "타카야마", "싱가포르"],
      global: ["취리히", "빈", "밴쿠버"],
    },
    bestCompanions: ["ESFJ","ENFJ","ISFJ"],
    avoidCompanions: ["ENFP","ESFP"],
    shareText: "나는 📐🧠 전략 큐브러(INTJ). 적게 가져도 충분히 완벽하다.",
    hashtags: commonTags(["INTJ","미니멀여행","큐브정리","동선설계"]),
    og: { bg: "graphite", icon: "📐" },
    color: "#7B8794",
  },

  INTP: {
    type: "INTP",
    emoji: "🔬🧴",
    title: "리서치 테스트러",
    tagline: "템은 근거로, 팁은 데이터로",
    summary: [
      "템 선택에 논리·후기를 중요시.",
      "미용/세면은 리필·소분으로 실험하듯 구성.",
      "장비는 최소, 효율은 최대.",
    ],
    traits: ["리뷰분석","소분","효율집중","미니멀기기"],
    packingTips: [
      "리필 가능한 공병만 사용(용량 표기 필수).",
      "체크리스트는 '왜' 칼럼 포함(삭제 판단 빠름).",
      "보조배터리는 Wh 기준으로 기내 규정 확인.",
    ],
    checklistTop3: ["리필 공병", "보조배터리(Wh 표기)", "체크리스트 스프레드시트"],
    idealDestinations: {
      domestic: ["과천 국립현대미술관", "대전 한빛탑", "춘천 공지천"],
      asia: ["가오슝", "우치하라", "다카마쓰"],
      global: ["보스턴", "시애틀", "헬싱키"],
    },
    bestCompanions: ["ESFP","ENFJ","ISFJ"],
    avoidCompanions: ["ESTP","ENTP"],
    shareText: "나는 🔬🧴 리서치 테스트러(INTP). 품목엔 이유가 있다.",
    hashtags: commonTags(["INTP","리뷰기반","소분공병","효율여행"]),
    og: { bg: "ice-blue", icon: "🔬" },
    color: "#7CD4FD",
  },

  ISFJ: {
    type: "ISFJ",
    emoji: "🧸🧼",
    title: "하우스 키퍼",
    tagline: "어디서든 집처럼",
    summary: [
      "숙소 위생·수납·수면환경을 안정적으로 셋업.",
      "티백/간단한 야식/핫팩 등 편안템 챙김.",
      "동행 피로를 낮추는 '안정 담당'.",
    ],
    traits: ["숙소셋업","수면환경","편안템","안정감"],
    packingTips: [
      "베개커버/아이마스크/귀마개로 수면 루틴 유지.",
      "휴대용 세탁세제·빨래줄로 장기 체류 대비.",
      "티백/스낵은 소분 지퍼백으로 정리.",
    ],
    checklistTop3: ["아이마스크/귀마개", "티백/스낵", "휴대 세탁세제"],
    idealDestinations: {
      domestic: ["강릉 카페촌", "순천만 습지", "담양 한옥스테이"],
      asia: ["후쿠오카", "오키나와", "대만 가오슝"],
      global: ["코펜하겐", "멜버른", "밴프"],
    },
    bestCompanions: ["ENFP","ENTJ","INTJ"],
    avoidCompanions: ["ENTP","ESTP"],
    shareText: "나는 🧸🧼 하우스 키퍼(ISFJ). 어디서든 안락함 ON.",
    hashtags: commonTags(["ISFJ","숙소루틴","편안여행","수면템"]),
    og: { bg: "cream", icon: "🧸" },
    color: "#F5CBA7",
  },

  ISFP: {
    type: "ISFP",
    emoji: "🌿📷",
    title: "포근한 감성러",
    tagline: "조용히, 예쁘게, 그리고 가볍게",
    summary: [
      "소형 카메라/에코백/니트 같은 포근템 선호.",
      "루즈핏·소프트톤 중심 TPO.",
      "복잡한 장비보다 감정 채집을 우선.",
    ],
    traits: ["감성템","루즈핏","소프트톤","소형카메라"],
    packingTips: [
      "룩은 '편안+포인트' 2개 축으로.",
      "미니 삼각대 대신 림 그립/스트랩 활용.",
      "양말/이너는 파우치 2개로 세탁 분리.",
    ],
    checklistTop3: ["소형 카메라", "에코백", "포근 이너웨어"],
    idealDestinations: {
      domestic: ["담양 죽녹원", "청송 주왕산", "제주 녹차밭"],
      asia: ["나고야 근교", "타로코 협곡", "고베"],
      global: ["에든버러", "브뤼헤", "코르도바"],
    },
    bestCompanions: ["ENTJ","ENFJ","ESTJ"],
    avoidCompanions: ["ESTP","ENTP"],
    shareText: "나는 🌿📷 포근한 감성러(ISFP). 조용히 담아도 빛나는 순간.",
    hashtags: commonTags(["ISFP","감성코디","소형카메라","포근여행"]),
    og: { bg: "sage", icon: "🌿" },
    color: "#9AD0B2",
  },

  ISTJ: {
    type: "ISTJ",
    emoji: "📦✅",
    title: "체크 큐레이터",
    tagline: "빠짐없이, 과하지 않게",
    summary: [
      "리스트 기반으로 정확히 챙기는 타입.",
      "기능성과 내구성이 최고 가치.",
      "예비 부품/예비 케이블까지 '만일'을 대비.",
    ],
    traits: ["정확","내구성","예비부품","리스트중심"],
    packingTips: [
      "사용빈도 기준으로 위상 정렬(가장 위 자주쓰는템).",
      "예비 케이블은 길이 다른 2종으로.",
      "중요 문서는 인쇄본 1부 추가.",
    ],
    checklistTop3: ["예비 케이블", "여권/예약 인쇄본", "방수 파우치"],
    idealDestinations: {
      domestic: ["포항 영일대", "서울 박물관 루트", "대전 성심당"],
      asia: ["나리타/하네다 환승", "가오슝", "타이중"],
      global: ["뮌헨", "취리히", "토론토"],
    },
    bestCompanions: ["ENFP","ESFP","ENFJ"],
    avoidCompanions: ["ENTP","ESTP"],
    shareText: "나는 📦✅ 체크 큐레이터(ISTJ). 과하지 않게, 빠짐없이.",
    hashtags: commonTags(["ISTJ","체크리스트","예비템","내구성템"]),
    og: { bg: "navy", icon: "📦" },
    color: "#2F3E46",
  },

  ISTP: {
    type: "ISTP",
    emoji: "🛠️🧢",
    title: "툴킷 솔버",
    tagline: "문제 생기면 내가 고친다",
    summary: [
      "멀티툴/테이프/스트랩 등 해결 키트 보유.",
      "액티비티 장비 세팅·수선에 강함.",
      "불필요한 말보다 빠른 실행.",
    ],
    traits: ["멀티툴","수선","액티비티","현장해결"],
    packingTips: [
      "멀티툴은 규정상 위탁수하물로(기내 반입 X 체크).",
      "스트랩/테이프 소형 릴 버전 추천.",
      "액티비티 보험 약관은 사전 체크.",
    ],
    checklistTop3: ["멀티툴(위탁)", "스트랩/테이프", "액티비티 보험"],
    idealDestinations: {
      domestic: ["정선 레일바이크", "제천 패러글라이딩", "포항 스쿠버"],
      asia: ["보홀", "보라카이", "다낭"],
      global: ["퀸스타운", "시드니 북부해안", "칸쿤"],
    },
    bestCompanions: ["ENFJ","ESFJ","ISFJ"],
    avoidCompanions: ["INFP","INFJ"],
    shareText: "나는 🛠️🧢 툴킷 솔버(ISTP). 고장? 내 툴킷에 답이 있다.",
    hashtags: commonTags(["ISTP","멀티툴","수선키트","액티비티여행"]),
    og: { bg: "charcoal", icon: "🛠️" },
    color: "#4E4E50",
  },
};

// 타입 가드: 결과 없음 방지 (잘못된 type 요청 시 fallback)
export const getPackType = (t: string): PackType | null => {
  const key = t.toUpperCase() as MBTI;
  return (TRAVEL_PACK_TYPES as any)[key] ?? null;
};

// 결과 페이지에서 사용할 공통 추천: '나와 케미 좋은 유형'
export const getCompanionSuggestion = (t: MBTI) => {
  const me = TRAVEL_PACK_TYPES[t];
  const best = me.bestCompanions.map((k) => TRAVEL_PACK_TYPES[k]);
  return best.slice(0, 2).map((b) => ({
    type: b.type,
    title: b.title,
    emoji: b.emoji,
    reason: `여행 스타일 상호보완 (${me.title} x ${b.title})`,
  }));
};

export function getResultByType(type: string): PackType | null {
  return getPackType(type);
}

export function calculateMBTI(answers: string[]): string {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  
  answers.forEach((answer, index) => {
    const question = travelPackQuestions[index]
    if (!question) return
    
    if (answer === 'A') {
      question.choiceA.tags.forEach(tag => {
        if (tag in scores) scores[tag as keyof typeof scores]++
      })
    } else if (answer === 'B') {
      question.choiceB.tags.forEach(tag => {
        if (tag in scores) scores[tag as keyof typeof scores]++
      })
    }
  })
  
  const result = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')
  
  return result
}