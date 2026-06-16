"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authService } from "@/services/auth.service.js"
import { ROUTES } from "@/lib/constants"

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful! Please log in.")
      router.push(ROUTES.LOGIN)
    },
    onError: (error) => {
      const message =
        error?.message || error?.err?.message || "Registration failed. Please try again."
      toast.error(message)
    },
  })
}