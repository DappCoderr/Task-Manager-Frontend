"use client"

import Link from "next/link"
import { CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-3">
          <Link href={ROUTES.LOGIN}>
            <Button variant="ghost">Log in</Button>
          </Link>
          <Link href={ROUTES.REGISTER}>
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}