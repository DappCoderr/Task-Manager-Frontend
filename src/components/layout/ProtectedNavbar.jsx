"use client"

import Link from "next/link"
import { CheckSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { ROUTES } from "@/lib/constants"

export function ProtectedNavbar() {
  const { user } = useAuth()

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U"

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-gray-600 sm:block">
            {user?.username}
          </span>
          <Link href={ROUTES.PROFILE}>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}