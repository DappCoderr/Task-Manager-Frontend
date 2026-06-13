"use client";
import LoginForm from "@/components/auth/LoginForm";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const { mutate: login, isLoading } = useLogin();
  return <LoginForm onSubmit={login} isLoading={isLoading} />;
}