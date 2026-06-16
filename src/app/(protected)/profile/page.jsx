"use client"

import { LogOut, Mail, User, Shield } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import { useLogout } from "@/hooks/useLogout"
import { PageLoader, LoadingSpinner } from "@/components/shared/LoadingSpinner"
import { ErrorState } from "@/components/shared/ErrorState"
import { useProfile } from "@/hooks/useProfile"
import { formatDate } from "@/lib/utils"

export default function ProfilePage() {
  const { user } = useAuth()
  const logoutMutation = useLogout()
  const { data: profileData, isLoading, isError, refetch } = useProfile()

  const profile = profileData?.data || user
  const initials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : "U"

  if (isLoading && !profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <PageLoader />
      </div>
    )
  }

  if (isError && !profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <ErrorState
          title="Failed to load profile"
          message="There was an error loading your profile information."
          onRetry={() => refetch()}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Profile</h1>

      <Card>
        <CardHeader className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:pt-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-900">
              {profile?.username}
            </h2>
            <p className="text-sm text-gray-500">{profile?.role}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm font-medium text-gray-900">
                  {profile?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Username</p>
                <p className="text-sm font-medium text-gray-900">
                  {profile?.username}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Role</p>
                <p className="text-sm font-medium text-gray-900">
                  {profile?.role}
                </p>
              </div>
            </div>

            {profile?.createdAt && (
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Member since</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(profile.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <Button
            variant="destructive"
            className="w-full sm:w-auto"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? (
              <span className="flex items-center gap-2">
                <LoadingSpinner size="sm" />
                Logging out...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Log out
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}