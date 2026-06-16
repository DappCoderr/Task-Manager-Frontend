import { PublicNavbar } from "@/components/layout/PublicNavbar"

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
    </div>
  )
}