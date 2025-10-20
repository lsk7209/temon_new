import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "여행 짐 싸는 스타일 테스트 | 12문항으로 알아보는 여행자 유형",
  description:
    "여행 전날 밤, 당신의 캐리어는 이미 성격을 말하고 있어요. 짐 싸는 습관으로 알아보는 MBTI 16유형",
  openGraph: {
    title: "여행 짐 싸는 스타일 테스트 | 12문항으로 알아보는 여행자 유형",
    description:
      "여행 전날 밤, 당신의 캐리어는 이미 성격을 말하고 있어요. 짐 싸는 습관으로 알아보는 MBTI 16유형",
    images: [
      {
        url: "/api/og?type=ENFP&title=즉흥%20감성%20패커&summary=짐은%20가볍게,%20순간은%20무겁게&emoji=🎒🎈&bg=candy-pop",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "여행 짐 싸는 스타일 테스트 | 12문항으로 알아보는 여행자 유형",
    description:
      "여행 전날 밤, 당신의 캐리어는 이미 성격을 말하고 있어요. 짐 싸는 습관으로 알아보는 MBTI 16유형",
    images: [
      "/api/og?type=ENFP&title=즉흥%20감성%20패커&summary=짐은%20가볍게,%20순간은%20무겁게&emoji=🎒🎈&bg=candy-pop",
    ],
  },
}

export default function TravelPackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}


