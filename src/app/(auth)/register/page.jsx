"use client";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { mutate: register, isLoading } = useRegister();
  return <RegisterForm onSubmit={register} isLoading={isLoading} />;
}