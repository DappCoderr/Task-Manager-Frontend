"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { ProtectedNavbar } from "@/components/layout/ProtectedNavbar"
import { PageLoader } from "@/components/shared/LoadingSpinner"
import { ROUTES } from "@/lib/constants"

export default function ProtectedLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN)
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProtectedNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}