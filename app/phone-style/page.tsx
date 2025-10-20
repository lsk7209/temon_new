import QuizIntroTemplate from "@/components/quiz/QuizIntroTemplate"

export default function PhoneStylePage() {
  return (
    <QuizIntroTemplate
      title="스마트폰 습관 테스트"
      description="스마트폰을 켜는 순간, 당신의 성격이 드러난다"
      emoji="📱"
      category="디지털"
      estimatedTime="5분"
      questionCount={12}
      gradientFrom="from-blue-500"
      gradientTo="to-indigo-600"
      accentColor="blue"
      testPath="/phone-style/test"
      isNew={true}
      isPopular={true}
      features={[
        "스마트폰 사용 패턴 분석",
        "디지털 라이프스타일 파악",
        "앱 사용 습관 기반 성격 분석",
        "개인화된 추천 앱 스타일"
      ]}
      tags={[
        "스마트폰성격테스트",
        "폰습관MBTI",
        "디지털성격",
        "스마트폰사용성향",
        "폰성격테스트",
        "바이럴테스트"
      ]}
    />
  )
}