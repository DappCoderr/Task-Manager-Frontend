"use client"

import Link from "next/link"
import { CheckCircle, LayoutDashboard, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

const features = [
  {
    icon: CheckCircle,
    title: "Task Management",
    description: "Create, organize, and track your tasks with ease. Set priorities and due dates.",
  },
  {
    icon: LayoutDashboard,
    title: "Intuitive Dashboard",
    description: "Get a clear overview of all your tasks in one place with a clean interface.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description: "Your data is protected with secure, cookie-based authentication.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with modern technology for a smooth and responsive experience.",
  },
]

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="px-4 pb-20 pt-20 sm:px-6 lg:px-8 sm:pt-28 lg:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Manage your tasks with{" "}
            <span className="text-primary">confidence</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 sm:text-xl">
            TaskFlow helps you stay organized, meet deadlines, and accomplish
            more. Simple, fast, and built for productivity.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={ROUTES.REGISTER}>
              <Button size="lg" className="w-full px-8 sm:w-auto">
                Start for free
              </Button>
            </Link>
            <Link href={ROUTES.LOGIN}>
              <Button size="lg" variant="outline" className="w-full px-8 sm:w-auto">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-gray-50/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay productive
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features to help you manage your tasks efficiently.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
    </div>
  )
}