import QuizResultTemplate from "@/components/quiz/QuizResultTemplate"
import { getPhoneResult } from "@/data/phoneResults"
import { Smartphone, Lightbulb, MapPin } from "lucide-react"

export default function PhoneResultPage() {
  return (
    <QuizResultTemplate
      testId="phone-style"
      testName="스마트폰 습관"
      getResult={getPhoneResult}
      gradientFrom="from-blue-50"
      gradientTo="via-indigo-50"
      sections={{
        showTraits: true,
        showHabits: true,
        showRecommendations: true
      }}
      customSections={[
        {
          title: "나만의 폰 사용 습관",
          icon: <Smartphone className="h-5 w-5 text-blue-500" />,
          content: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getPhoneResult("ENFP")?.phoneHabits?.map((habit: string, index: number) => (
                <div key={index} className="p-4 bg-blue-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">#{index + 1}</div>
                  <p className="text-gray-700 font-medium">{habit}</p>
                </div>
              )) || []}
            </div>
          )
        },
        {
          title: "나에게 찰떡궁합 앱 스타일",
          icon: <MapPin className="h-5 w-5 text-purple-500" />,
          content: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getPhoneResult("ENFP")?.recommendedApps?.map((app: string, index: number) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">📱</div>
                  <p className="text-gray-700 font-medium">{app}</p>
                </div>
              )) || []}
            </div>
          )
        }
      ]}
      relatedTests={[
        {
          title: "여행자 맞춤 성격 테스트",
          description: "여행 짐 싸는 습관으로 보는 성격",
          emoji: "🎒",
          href: "/travel-pack-mbti"
        },
        {
          title: "디저트 취향 MBTI",
          description: "디저트 취향으로 보는 성격",
          emoji: "🍰",
          href: "/dessert-style"
        },
        {
          title: "사진 찍는 스타일 테스트",
          description: "사진 촬영 스타일로 보는 성격",
          emoji: "📸",
          href: "/photo-style"
        }
      ]}
    />
  )
}