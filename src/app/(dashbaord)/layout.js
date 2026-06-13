"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function DashboardLayout({ children }) {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 border-b px-6 py-3 flex items-center justify-between">
        <nav className="flex gap-4">
          <Link href={ROUTES.DASHBOARD} className="font-medium">Dashboard</Link>
          <Link href={ROUTES.ACTIVITY} className="font-medium">Activity</Link>
          <Link href={ROUTES.PROFILE} className="font-medium">Profile</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm">Hello, {user.username}</span>}
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}