"use client"

import { useState } from "react"
import { LoginScreen } from "@/components/auth/login-screen"
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()
    return <LoginScreen onLogin={() => router.push('/dashboard')} />

}
