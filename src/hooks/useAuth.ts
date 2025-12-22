"use client";

import api from "@/lib/api";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return { login, logout };
};
