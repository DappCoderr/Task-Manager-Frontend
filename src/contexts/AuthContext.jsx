"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useProfile, useLogout } from "@/hooks/useAuth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const { data: profile, isLoading, isError } = useProfile();
  const { mutate: logout } = useLogout();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const value = {
    user: profile?.data || null,
    isLoading,
    isError,
    isAuthenticated: !!token && !!profile?.data,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};