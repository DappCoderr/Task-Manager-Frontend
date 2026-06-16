"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service.js"
import { useAuth } from "@/hooks/useAuth"
import { ROUTES } from "@/lib/constants"

export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { clearAuth } = useAuth()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth()
      queryClient.clear()
      router.replace(ROUTES.LOGIN)
    },
    onError: () => {
      clearAuth()
      queryClient.clear()
      router.replace(ROUTES.LOGIN)
    },
  })
}