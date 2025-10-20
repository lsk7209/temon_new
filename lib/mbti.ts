// 점수 집계/타입/동점 규칙/헬퍼

export type MBTI =
  | "ENFJ"|"ENFP"|"ENTJ"|"ENTP"|"ESFJ"|"ESFP"|"ESTJ"|"ESTP"
  | "INFJ"|"INFP"|"INTJ"|"INTP"|"ISFJ"|"ISFP"|"ISTJ"|"ISTP";

export type ResultCard = {
  type: MBTI;
  emoji: string;
  title: string;
  tagline: string;
  summary: string[];
  recCategories: string[];
  bestCombos: string[];
  daypart: { morning: string[]; afternoon: string[]; night: string[] };
  geoTips: { office: string; campus: string; downtown: string };
  shareText: string;
  hashtags: string[];
  og: { bg: string; icon: string };
};

export type AxisScore = { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number };

export const initScore = (): AxisScore => ({ E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0 });

// 동점 우선순위(재현성 보장)
const TIE_BREAKER = {
  EI: ["E","I"] as const,
  SN: ["N","S"] as const,
  TF: ["F","T"] as const,
  JP: ["P","J"] as const,
};

export function decideType(score: AxisScore): MBTI {
  const ei = pick(score.E, score.I, TIE_BREAKER.EI);
  const sn = pick(score.S, score.N, TIE_BREAKER.SN);
  const tf = pick(score.T, score.F, TIE_BREAKER.TF);
  const jp = pick(score.J, score.P, TIE_BREAKER.JP);
  return (ei + sn + tf + jp) as MBTI;
}

function pick(a: number, b: number, pref: readonly string[]) {
  if (a > b) return pref[0];
  if (b > a) return pref[1];
  // 동점 시 우선순위 배열의 선호값 반환 (첫 원소가 선호 쪽)
  return pref[0];
}

// 퀴즈 템플릿에서 사용할 calculateMBTI 함수
export function calculateMBTI(answers: string[]): MBTI {
  const score = initScore();
  
  // 답변 배열에서 각 MBTI 태그의 점수를 계산
  answers.forEach(tag => {
    if (tag in score) {
      score[tag as keyof AxisScore]++;
    }
  });
  
  return decideType(score);
}


