"use client";
import ProfileForm from "@/components/profile/ProfileForm";
import { useProfile } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProfile } from "@/api/auth";

export default function ProfilePage() {
  const { data: profileData, isLoading, isError } = useProfile();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      return { success: true, message: "Profile updated (mock)" };
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["profile"]);
      toast.success(res.message);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  if (isLoading) return <div className="p-8 text-center">Loading profile...</div>;
  if (isError) return <div className="p-8 text-center">Failed to load profile.</div>;

  const user = profileData?.data;
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileForm
        user={user}
        onSave={updateMutation.mutate}
        isSaving={updateMutation.isLoading}
      />
    </div>
  );
}