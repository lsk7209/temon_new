"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  Moon, 
  Sun,
  ChevronDown
} from "lucide-react"
import { trackClick } from "@/lib/analytics"

export default function AdminHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications] = useState(3) // 실제로는 상태 관리에서 가져옴

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
    trackClick("admin_theme_toggle", window.location.pathname)
  }

  const handleNotificationClick = () => {
    trackClick("admin_notifications", window.location.pathname)
  }

  const handleProfileClick = () => {
    trackClick("admin_profile", window.location.pathname)
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="관리자 검색..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleThemeToggle}
            className="p-2"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNotificationClick}
            className="relative p-2"
          >
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <Settings className="w-4 h-4" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">관리자</p>
              <p className="text-xs text-gray-500">admin@temon.kr</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileClick}
              className="p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
