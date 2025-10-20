"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Star, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { trackClick, trackSearch } from "@/lib/analytics"
import { getAllTests, CATEGORIES } from "@/lib/tests-config"

const TESTS_PER_PAGE = 9

export default function TestsPage() {
  const allTests = getAllTests()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
    if (term.length > 0) {
      trackSearch(term, window.location.pathname)
    }
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    trackClick(`category_${category}`, window.location.pathname)
  }

  const handleTestClick = (testId: string) => {
    trackClick(`test_card_${testId}`, window.location.pathname)
  }

  const filteredTests = allTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "전체" || test.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredTests.length / TESTS_PER_PAGE)
  const startIndex = (currentPage - 1) * TESTS_PER_PAGE
  const endIndex = startIndex + TESTS_PER_PAGE
  const paginatedTests = filteredTests.slice(startIndex, endIndex)

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">모든 테스트</h1>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          다양한 주제의 성격 테스트를 찾아보세요. 검색과 카테고리로 원하는 테스트를 쉽게 찾을 수 있습니다.
        </p>
      </section>

      {/* Search and Filter */}
      <section className="mb-8">
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="테스트 검색..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Tests Grid */}
      <section className="mb-12">
        {filteredTests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">검색 결과가 없습니다.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("전체")
              }}
            >
              필터 초기화
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedTests.map((test) => {
                const Icon = test.icon
                return (
                  <Card
                    key={test.id}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                    onClick={() => handleTestClick(test.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${test.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex gap-1">
                          {test.badge && (
                            <Badge
                              variant={test.badge === "HOT" ? "destructive" : "default"}
                              className="text-xs font-bold"
                            >
                              {test.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{test.title}</CardTitle>
                      <CardDescription className="text-sm">{test.description}</CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {test.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm">{test.rating}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{test.participants}</span>
                          </div>
                        </div>
                      </div>
                      <Link href={test.href}>
                        <Button className="w-full group-hover:bg-primary/90 transition-colors">테스트 시작하기</Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

                    if (!showPage) {
                      // Show ellipsis
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return (
                          <span key={page} className="px-2 py-2 text-muted-foreground">
                            ...
                          </span>
                        )
                      }
                      return null
                    }

                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="min-w-[40px]"
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="text-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-primary">{allTests.length}</div>
            <div className="text-sm text-muted-foreground">총 테스트</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">참여자</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">4.8</div>
            <div className="text-sm text-muted-foreground">평점</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">95%</div>
            <div className="text-sm text-muted-foreground">만족도</div>
          </div>
        </div>
      </section>
    </div>
  )
}
