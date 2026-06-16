"use client"

import { createContext, useState, useEffect, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { usePathname } from "next/navigation"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const queryClient = useQueryClient()
  const pathname = usePathname()

  const publicRoutes = ["/login", "/register", "/"]
  const isPublicRoute = publicRoutes.includes(pathname)

  const clearAuth = useCallback(() => {
    setUser(null)
    queryClient.clear()
  }, [queryClient])

  useEffect(() => {
    const handleClearCache = () => {
      queryClient.clear()
    }
    window.addEventListener("clear-query-cache", handleClearCache)
    return () => window.removeEventListener("clear-query-cache", handleClearCache)
  }, [queryClient])

  // Try to get user profile on mount to check if authenticated
  // SKIP on public routes to avoid infinite 401 loops
  useEffect(() => {
    if (isPublicRoute) {
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      try {
        const { getProfileRequest } = await import("@/api/users")
        const response = await getProfileRequest()
        if (response.success && response.data) {
          setUser(response.data)
        }
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [pathname, isPublicRoute])

  const value = {
    user,
    setUser,
    clearAuth,
    isLoading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}