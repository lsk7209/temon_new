"use client"

import { useState } from "react"
import AdminAuth from "@/components/admin-auth"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="container mx-auto py-6">
      <AnalyticsDashboard />
    </div>
  )
}
