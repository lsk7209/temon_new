"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  BarChart3,
  Users,
  Calendar,
  Filter
} from "lucide-react"
import { trackClick } from "@/lib/analytics"
import { ALL_TESTS } from "@/lib/tests-config"

export default function TestsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [tests] = useState(ALL_TESTS)

  const handleCreateTest = () => {
    trackClick("admin_create_test", window.location.pathname)
    // 새 테스트 생성 로직
  }

  const handleEditTest = (testId: string) => {
    trackClick(`admin_edit_test_${testId}`, window.location.pathname)
    // 테스트 편집 로직
  }

  const handleDeleteTest = (testId: string) => {
    trackClick(`admin_delete_test_${testId}`, window.location.pathname)
    // 테스트 삭제 로직
  }

  const handleToggleStatus = (testId: string) => {
    trackClick(`admin_toggle_test_${testId}`, window.location.pathname)
    // 테스트 상태 토글 로직
  }

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "active" && test.popular) ||
                         (filterStatus === "new" && test.new)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">테스트 관리</h1>
          <p className="text-gray-600 mt-1">MBTI 테스트들을 관리하고 새로운 테스트를 추가하세요</p>
        </div>
        <Button 
          onClick={handleCreateTest}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          새 테스트 추가
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 테스트</p>
                <p className="text-2xl font-bold text-gray-900">{tests.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 테스트</p>
                <p className="text-2xl font-bold text-gray-900">{tests.filter(t => t.popular).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">새 테스트</p>
                <p className="text-2xl font-bold text-gray-900">{tests.filter(t => t.new).length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 참여자</p>
                <p className="text-2xl font-bold text-gray-900">15.2K</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="테스트 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                전체
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                활성
              </Button>
              <Button
                variant={filterStatus === "new" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("new")}
              >
                신규
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => {
          const Icon = test.icon
          return (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${test.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{test.title}</CardTitle>
                      <CardDescription className="text-sm">{test.category}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {test.badge && (
                      <Badge 
                        variant={test.badge === "HOT" ? "destructive" : "default"}
                        className="text-xs"
                      >
                        {test.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{test.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span>⭐ {test.rating}</span>
                    <span>👥 {test.participants}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditTest(test.id)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    편집
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(test.id)}
                    className="flex-1"
                  >
                    {test.popular ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                    {test.popular ? "비활성" : "활성"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteTest(test.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
