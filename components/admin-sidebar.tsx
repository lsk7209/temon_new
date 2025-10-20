"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  LayoutDashboard, 
  Users, 
  TestTube, 
  BarChart3, 
  Settings, 
  FileText,
  Upload,
  Shield,
  LogOut,
  Menu,
  X
} from "lucide-react"
import { useState } from "react"
import { trackClick } from "@/lib/analytics"

interface SidebarItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  badgeColor?: string
}

const sidebarItems: SidebarItem[] = [
  {
    href: "/admin",
    label: "대시보드",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/tests",
    label: "테스트 관리",
    icon: TestTube,
    badge: "9",
    badgeColor: "bg-blue-500",
  },
  {
    href: "/admin/users",
    label: "사용자 관리",
    icon: Users,
    badge: "1.5K+",
    badgeColor: "bg-green-500",
  },
  {
    href: "/admin/analytics",
    label: "분석 및 통계",
    icon: BarChart3,
  },
  {
    href: "/admin/content",
    label: "콘텐츠 관리",
    icon: FileText,
  },
  {
    href: "/admin/uploads",
    label: "파일 관리",
    icon: Upload,
  },
  {
    href: "/admin/settings",
    label: "설정",
    icon: Settings,
  },
  {
    href: "/admin/security",
    label: "보안",
    icon: Shield,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const handleLogout = () => {
    trackClick("admin_logout", pathname)
    // 로그아웃 로직 구현
    window.location.href = "/"
  }

  const handleNavClick = (item: string) => {
    trackClick(`admin_nav_${item}`, pathname)
  }

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? "w-16" : "w-64"
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <div>
                <h1 className="font-bold text-lg">테몬 MBTI</h1>
                <p className="text-xs text-gray-500">관리자 패널</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => handleNavClick(item.label)}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-purple-50 text-purple-700 border border-purple-200"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge 
                      className={`text-xs ${item.badgeColor || "bg-gray-500"} text-white`}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {!isCollapsed && "로그아웃"}
        </Button>
      </div>
    </div>
  )
}
