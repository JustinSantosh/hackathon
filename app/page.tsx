"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/auth/login-screen"
import { ComplianceDashboard } from "@/components/dashboard/compliance-dashboard"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />
  }

  return <ComplianceDashboard onLogout={() => setIsAuthenticated(false)} />
}
