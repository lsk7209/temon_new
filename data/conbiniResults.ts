import type { ResultCard, MBTI } from "../lib/mbti";

// 16유형 전체 프리셋
export const RESULT_PRESETS: Record<MBTI, ResultCard> = {
  ENFP: {
    type:"ENFP", emoji:"🎈", title:"신상탐험가", tagline:"오늘의 재미=새로운 조합!",
    summary:[
      "한정/협업/신메뉴에 유독 약함.",
      "현장감 있는 선택, 실패도 추억 취급.",
      "디저트-음료 색감 매칭을 즐김."
    ],
    recCategories:["한정 디저트","콜라보 스낵","RTD 스페셜티"],
    bestCombos:["딸기우유+슈크림빵","요거트+그래놀라바","탄산수+상큼젤리"],
    daypart:{ morning:["그릭요거트"], afternoon:["티라미수 컵"], night:["치즈라면+김자반"]},
    geoTips:{ office:"1+1+커피 증정 이벤트 체크", campus:"SNS 해시태그로 ‘오늘 입고’ 확인", downtown:"디저트 쇼케이스 신상부터" },
    shareText:"나는 🎈 ‘신상탐험가(ENFP)’! 오늘 신상 같이 갈 사람?",
    hashtags:["편의점테스트","신상","디저트추천","ENFP","장바구니성향"],
    og:{ bg:"candy-pop", icon:"🛍️" }
  },
  ENTJ: {
    type:"ENTJ", emoji:"🧱", title:"시스템 헌터", tagline:"행사·적립·동선 최적화",
    summary:["행사/적립/쿠폰을 구조적으로 조합.","무게/가격/영양 효율의 최적점.","동선 최소, 목표 구매 집중."],
    recCategories:["도시락·샐러드","프로틴/건강","원두커피"],
    bestCombos:["샐러드+닭가슴살","프로틴바+아메리카노","고구마+그릭요거트"],
    daypart:{ morning:["원두커피+요거트"], afternoon:["견과류"], night:["프로틴바"]},
    geoTips:{ office:"런치 피크 전 미리 픽업", campus:"수업 사이 10분 루틴 리스트", downtown:"행사존 → 계산대 직행" },
    shareText:"나는 🧱 ‘시스템 헌터(ENTJ)’! 낭비 없이 꽉 채운 장바구니.",
    hashtags:["편의점도시락","건강간식","ENTJ","행사꿀조합","장바구니최적화"],
    og:{ bg:"steel-blue", icon:"📦" }
  },
  ISFJ: {
    type:"ISFJ", emoji:"🧸", title:"안정 루틴러", tagline:"늘 먹던 그 조합이 마음 편함",
    summary:[
      "배탈 없는 ‘안전 조합’ 선호.",
      "수면·속 편한 간식 루틴.",
      "티백/따뜻한 음료 호감."
    ],
    recCategories:["죽·누들","티/허브","부드러운 디저트"],
    bestCombos:["유자차+카스텔라","미역국라면","떠먹는 푸딩+꿀"],
    daypart:{ morning:["죽/누들컵"], afternoon:["허브티"], night:["우유+크래커"]},
    geoTips:{ office:"냉장고/전자레인지 가용 체크", campus:"시험기간 카페인 절반", downtown:"소음 매장은 테이크아웃" },
    shareText:"나는 🧸 ‘안정 루틴러(ISFJ)’! 속편한 조합이 최고.",
    hashtags:["편의점루틴","부드러운간식","ISFJ","허브티","속편한간식"],
    og:{ bg:"cream", icon:"🧸" }
  },
  ESFP: {
    type:"ESFP", emoji:"📸", title:"하이라이트 헌터", tagline:"맛+비주얼=콘텐츠!",
    summary:[
      "보는 맛, 찍는 맛, 먹는 맛 모두.",
      "한정 굿즈/패키지에 설렘.",
      "나눠먹기 좋은 소포장."
    ],
    recCategories:["포토제닉 디저트","스파클링","컬러 스낵"],
    bestCombos:["레인보우 젤리+스파클링","마카롱+밀크티","딸기샌드+라떼"],
    daypart:{ morning:["과일샌드"], afternoon:["스파클링"], night:["미니 디저트 2종"]},
    geoTips:{ office:"생일/이벤트 디저트 플래터", campus:"동아리 회의 간식 담당 적합", downtown:"포토스팟 앞 간식샷" },
    shareText:"나는 📸 ‘하이라이트 헌터(ESFP)’! 오늘의 간식샷 각?",
    hashtags:["포토제닉","ESFP","디저트샷","스파클링","편의점신상"],
    og:{ bg:"sunset", icon:"📸" }
  },
  // 나머지 12유형은 동일 포맷으로 작성
  ENFJ: {
    type:"ENFJ", emoji:"🧺", title:"케어패커", tagline:"동행 취향부터 챙기는 사람",
    summary:["내 간식보다 동행 간식 우선.","무난·상호호환 조합 선호.","공유·나눔에 기쁨."],
    recCategories:["베이커리","과일/샐러드","공유형 스낵팩"],
    bestCombos:["식빵+잼팩","샐러드+탄산수","쿠키팩+우유"],
    daypart:{ morning:["과일컵"], afternoon:["베이커리+라떼"], night:["미니 디저트 공유팩"]},
    geoTips:{ office:"티타임용 쿠키팩 비치", campus:"모임 전 간식 설문", downtown:"소분 가능한 간식" },
    shareText:"나는 🧺 ‘케어패커(ENFJ)’! 너 뭐 먹을래?",
    hashtags:["나눔간식","모임간식","ENFJ","공유간식","편의점추천"],
    og:{ bg:"linen", icon:"🤝" }
  },
  ENTP: {
    type:"ENTP", emoji:"🧪", title:"조합 마스터", tagline:"실험 정신으로 먹는 즐거움",
    summary:["혁신 조합 실험.","실패도 재미.","후기보다 내 실험."],
    recCategories:["라면/토핑","퓨전 스낵","신상 음료"],
    bestCombos:["라면+치즈","핫바+머스터드","탄산+아이스크림"],
    daypart:{ morning:["시리얼바"], afternoon:["신상 탄산"], night:["라면 커스텀"]},
    geoTips:{ office:"전자레인지/온수기 체크", campus:"조합 챌린지", downtown:"시식행사 탐색" },
    shareText:"나는 🧪 ‘조합 마스터(ENTP)’! 새로운 조합 제보 받음.",
    hashtags:["라면커스텀","ENTP","조합왕","신상탐험","편의점실험"],
    og:{ bg:"neon", icon:"🧪" }
  },
  ESFJ: {
    type:"ESFJ", emoji:"🤗", title:"취향 배려러", tagline:"모두가 좋아할 무난픽",
    summary:["클래식 선호.","상황 맞춤 선택.","소포장 애정."],
    recCategories:["과자/쿠키","우유/라떼","음료 믹스팩"],
    bestCombos:["쿠키+우유","카스텔라+티","스낵팩 믹스"],
    daypart:{ morning:["모닝빵"], afternoon:["라떼"], night:["쿠키/크래커"]},
    geoTips:{ office:"회의 간식 리스트", campus:"팀플 예산 분배", downtown:"인원 대비 소포장" },
    shareText:"나는 🤗 ‘취향 배려러(ESFJ)’! 모두가 좋아하는 그 맛.",
    hashtags:["무난픽","모임간식","ESFJ","소포장","편의점간식"],
    og:{ bg:"peach", icon:"🍪" }
  },
  ESTJ: {
    type:"ESTJ", emoji:"📑", title:"매뉴얼 셀렉터", tagline:"가격·용량·행사표 기준 선택",
    summary:["기준표로 빠르게 결론.","누락 제로 지향.","스테디러."],
    recCategories:["도시락/빵","커피/우유","견과/에너지"],
    bestCombos:["도시락+원두커피","식빵+우유","견과+요거트"],
    daypart:{ morning:["우유+빵"], afternoon:["아메리카노"], night:["견과류"]},
    geoTips:{ office:"정기구매/사내공구", campus:"예산표 갱신", downtown:"단가 비교" },
    shareText:"나는 📑 ‘매뉴얼 셀렉터(ESTJ)’! 기준대로 고르면 실패 없다.",
    hashtags:["가성비","ESTJ","행사체크","루틴구매","편의점도시락"],
    og:{ bg:"slate", icon:"📑" }
  },
  ESTP: {
    type:"ESTP", emoji:"⚡", title:"스피드 픽커", tagline:"보고, 집고, 나간다",
    summary:["즉시성 최우선.","먹으면서 이동.","결단력 강함."],
    recCategories:["한 손 간식","RTD 커피/에너지","그랩앤고"],
    bestCombos:["핫바+콜라","샌드+에너지드링크","주먹밥+RTD커피"],
    daypart:{ morning:["샌드/주먹밥"], afternoon:["에너지드링크"], night:["핫바"]},
    geoTips:{ office:"피크시간 우회", campus:"근접 매장 맵핑", downtown:"셀프계산대 활용" },
    shareText:"나는 ⚡ ‘스피드 픽커(ESTP)’! 고민은 계산대 앞에서 끝.",
    hashtags:["그랩앤고","ESTP","빠른선택","출근길간식","편의점동선"],
    og:{ bg:"black", icon:"⚡" }
  },
  INFJ: {
    type:"INFJ", emoji:"📖", title:"무드 큐레이터", tagline:"분위기 맞춤, 루틴 완성",
    summary:["상황·정서 맞춤.","티/디저트 페어링.","혼잡 회피."],
    recCategories:["티·허브","부드러운 디저트","라이트 스낵"],
    bestCombos:["허브티+푸딩","밀크티+버터쿠키","라이트칩+탄산수"],
    daypart:{ morning:["티+쿠키"], afternoon:["밀크티"], night:["허브티+디저트"]},
    geoTips:{ office:"조용한 대기 공간", campus:"카페인 절반", downtown:"테이크아웃" },
    shareText:"나는 📖 ‘무드 큐레이터(INFJ)’! 오늘도 분위기값 챙김.",
    hashtags:["무드간식","INFJ","티페어링","조용한간식","루틴완성"],
    og:{ bg:"indigo", icon:"📖" }
  },
  INFP: {
    type:"INFP", emoji:"🌙", title:"감성간식러", tagline:"소확행, 작은 달달함",
    summary:["작고 확실한 행복.","달달템 필수.","패키지 감성."],
    recCategories:["푸딩/젤리","코코아/라떼","부드러운 빵"],
    bestCombos:["코코아+브라우니","푸딩+과자","젤리+허브티"],
    daypart:{ morning:["라떼+빵"], afternoon:["젤리"], night:["코코아+브라우니"]},
    geoTips:{ office:"스위트 박스", campus:"도서관용 조용한 간식", downtown:"걷기 좋은 거리" },
    shareText:"나는 🌙 ‘감성간식러(INFP)’! 달달함은 마음의 연료.",
    hashtags:["소확행","INFP","디저트","달달템","편의점간식"],
    og:{ bg:"lavender", icon:"🌙" }
  },
  INTJ: {
    type:"INTJ", emoji:"📐", title:"미니멀 설계자", tagline:"낭비 최소, 효율 최대",
    summary:["카테고리 1등만.","보관/휴대/섭취 효율.","충동구매 억제."],
    recCategories:["RTD 커피","프로틴/견과","라이트 간편식"],
    bestCombos:["RTD+프로틴바","견과+요거트","라이트 샌드"],
    daypart:{ morning:["RTD+샌드"], afternoon:["견과"], night:["요거트"]},
    geoTips:{ office:"데스크 표준 구성", campus:"백팩 수납 최적화", downtown:"멀티유즈 선호" },
    shareText:"나는 📐 ‘미니멀 설계자(INTJ)’! 군더더기 0%.",
    hashtags:["미니멀","INTJ","효율구매","루틴템","편의점루틴"],
    og:{ bg:"graphite", icon:"📐" }
  },
  INTP: {
    type:"INTP", emoji:"🔬", title:"데이터 셀렉터", tagline:"성분/후기 기반 최적화",
    summary:["수치/후기 기반.","가설→검증.","기록 남김."],
    recCategories:["라이트 스낵","제로/라이트 음료","영양바"],
    bestCombos:["제로콜라+라이트칩","영양바+아메리카노","요거트+그래놀라"],
    daypart:{ morning:["요거트"], afternoon:["제로콜라"], night:["영양바"]},
    geoTips:{ office:"스프레드시트", campus:"커뮤니티 후기", downtown:"비교 앱" },
    shareText:"나는 🔬 ‘데이터 셀렉터(INTP)’! 오늘도 기록이 답.",
    hashtags:["INTP","데이터구매","제로음료","성분비교","편의점분석"],
    og:{ bg:"ice", icon:"🔬" }
  },
  ISFP: {
    type:"ISFP", emoji:"🌿", title:"포근테이스트", tagline:"은은하고 부드러운 맛",
    summary:["자극 적음.","예쁜 패키지.","조용히 음미."],
    recCategories:["티/밀크","소프트 디저트","라이트 스낵"],
    bestCombos:["밀크티+카스텔라","푸딩+비스킷","라이트칩+탄산수"],
    daypart:{ morning:["밀크티+빵"], afternoon:["푸딩"], night:["허브티"]},
    geoTips:{ office:"조용한 좌석", campus:"리딩타임", downtown:"한적한 골목" },
    shareText:"나는 🌿 ‘포근테이스트(ISFP)’! 과하지 않은 행복.",
    hashtags:["ISFP","부드러운맛","라이트간식","티타임","편의점선택"],
    og:{ bg:"sage", icon:"🌿" }
  },
  ISTJ: {
    type:"ISTJ", emoji:"📦", title:"체크리스트러", tagline:"필요한 것만 빠짐없이",
    summary:["목록대로.","유통기한 확인.","변수 싫어함."],
    recCategories:["일상용품/충전","기본 간식","우유/빵"],
    bestCombos:["충전케이블+RTD커피","주먹밥+우유","크래커+치즈"],
    daypart:{ morning:["우유+빵"], afternoon:["크래커"], night:["주먹밥"]},
    geoTips:{ office:"비상 키트", campus:"시험주간 소모품", downtown:"동선 최단" },
    shareText:"나는 📦 ‘체크리스트러(ISTJ)’! 계획한 것만.",
    hashtags:["체크리스트","ISTJ","필수템","루틴구매","편의점기본"],
    og:{ bg:"navy", icon:"📦" }
  },
  ISTP: {
    type:"ISTP", emoji:"🛠️", title:"솔루션 픽커", tagline:"상황별 실용템을 즉시 해결",
    summary:["문제 해결 중심.","건강/수선/에너지.","실속파."],
    recCategories:["건강/응급","에너지/카페인","도구/소모품"],
    bestCombos:["파스+비타민워터","핫팩+라떼","밴드+쿠키"],
    daypart:{ morning:["라떼"], afternoon:["비타민워터"], night:["핫팩+간식"]},
    geoTips:{ office:"응급키트 위치", campus:"공구 관리", downtown:"24시 매장 맵" },
    shareText:"나는 🛠️ ‘솔루션 픽커(ISTP)’! 상황 끝판왕.",
    hashtags:["ISTP","실용템","비상템","응급키트","편의점해결"],
    og:{ bg:"charcoal", icon:"🛠️" }
  },
} as const;


