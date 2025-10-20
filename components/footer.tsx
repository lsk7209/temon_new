"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Mail, Github, Twitter, Instagram, Facebook } from "lucide-react"
import { trackClick } from "@/lib/analytics"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const handleSocialClick = (platform: string) => {
    trackClick(`footer_social_${platform}`, window.location.pathname)
  }

  const handleLinkClick = (link: string) => {
    trackClick(`footer_link_${link}`, window.location.pathname)
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-xl">테몬 MBTI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              MZ세대 맞춤형 재미있는 MBTI 테스트 플랫폼으로 
              나만의 성격을 발견해보세요.
            </p>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-sm text-gray-300">1.5만+ 참여자</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('home')}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link 
                  href="/tests" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('tests')}
                >
                  모든 테스트
                </Link>
              </li>
              <li>
                <Link 
                  href="/coffee-mbti" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('coffee_mbti')}
                >
                  커피 MBTI
                </Link>
              </li>
              <li>
                <Link 
                  href="/ramen-mbti" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('ramen_mbti')}
                >
                  라면 MBTI
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tests */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">인기 테스트</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/pet-mbti" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('pet_mbti')}
                >
                  🐾 반려동물 MBTI
                </Link>
              </li>
              <li>
                <Link 
                  href="/study-mbti" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('study_mbti')}
                >
                  📚 공부 MBTI
                </Link>
              </li>
              <li>
                <Link 
                  href="/alarm-habit" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('alarm_habit')}
                >
                  ⏰ 알람 습관
                </Link>
              </li>
              <li>
                <Link 
                  href="/ntrp-test" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  onClick={() => handleLinkClick('ntrp_test')}
                >
                  🎾 NTRP 테스트
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">연락처</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">contact@temon.kr</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500 text-white text-xs">
                  온라인
                </Badge>
                <span className="text-gray-300 text-sm">24시간 서비스</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-sm">소셜 미디어</h4>
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-white/10"
                  onClick={() => handleSocialClick('instagram')}
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-white/10"
                  onClick={() => handleSocialClick('twitter')}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-white/10"
                  onClick={() => handleSocialClick('facebook')}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 hover:bg-white/10"
                  onClick={() => handleSocialClick('github')}
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <Card className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <h3 className="font-bold text-lg mb-2">새로운 테스트 소식 받기</h3>
                  <p className="text-gray-300 text-sm">
                    새로운 MBTI 테스트가 나올 때마다 알림을 받아보세요!
                  </p>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => handleLinkClick('newsletter_signup')}
                  >
                    구독하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-black/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} 테몬 MBTI. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Made with ❤️ for MZ generation
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleLinkClick('privacy')}
              >
                개인정보처리방침
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleLinkClick('terms')}
              >
                이용약관
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => handleLinkClick('contact')}
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
