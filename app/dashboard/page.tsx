"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import { ComplianceDashboard } from "@/components/dashboard/compliance-dashboard"

export default function Page() {
    const router = useRouter()
    return <ComplianceDashboard onLogout={() => router.push('/login')} />

}
