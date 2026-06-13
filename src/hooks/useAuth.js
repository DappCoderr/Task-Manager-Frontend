"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginUser, registerUser, getProfile, logoutUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        queryClient.invalidateQueries(["profile"]);
        toast.success(res.message);
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    },
  });
};

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message);
        router.push("/login");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Registration failed");
    },
  });
};

export const useProfile = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!localStorage.getItem("token"));
  }, []);

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: hasToken,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      localStorage.removeItem("token");
      queryClient.removeQueries(["profile"]);
      toast.success(res.message);
      router.push("/login");
    },
    onError: () => toast.error("Logout failed"),
  });
};