"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authService } from "@/services/auth.service.js"
import { ROUTES } from "@/lib/constants"
import { useAuth } from "@/hooks/useAuth"

export function useLogin() {
  const router = useRouter()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      setUser(data.data)
      toast.success(data.message || "Logged in successfully")
      router.push(ROUTES.DASHBOARD)
    },
    onError: (error) => {
      const message =
        error?.message || error?.err?.message || "Login failed. Please try again."
      toast.error(message)
    },
  })
}