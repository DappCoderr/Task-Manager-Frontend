"use client";
import { createContext, useContext, useMemo } from "react";
import { useProfile, useUpdateProfile, useDeleteProfile } from "@/hooks/useUser";

const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const { data: profileResponse, isLoading, isError, error, refetch } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const deleteProfileMutation = useDeleteProfile();

  const profile = profileResponse?.data || null;

  const updateProfile = (data) => updateProfileMutation.mutateAsync(data);
  const deleteProfile = () => deleteProfileMutation.mutateAsync();

  const value = useMemo(
    () => ({
      profile,
      isLoading,
      isError,
      error,
      refetch,
      updateProfile,
      deleteProfile,
      isUpdating: updateProfileMutation.isPending,
      isDeleting: deleteProfileMutation.isPending,
    }),
    [
      profile,
      isLoading,
      isError,
      error,
      refetch,
      updateProfile,
      deleteProfile,
      updateProfileMutation.isPending,
      deleteProfileMutation.isPending,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};