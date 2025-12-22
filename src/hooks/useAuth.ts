// hooks/useAuth.ts
"use client";

import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Your actual API call here
    // For now, we'll just set the cookie based on hardcoded credentials
    if (email === "mrperfect@gmail.com" && password === "perfect96") {
      // Generate a simple auth token (demo purposes)
      const authToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      
      // Save token in cookie (valid for 1 day)
      document.cookie = `token=${authToken}; path=/; max-age=${60 * 60 * 24}`;
      
      // Also store in localStorage for client-side checks if needed
      localStorage.setItem("token", authToken);
      
      router.push("/dashboard");
      return { success: true };
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    // Remove token from cookie
    document.cookie = "token=; path=/; max-age=0";
    
    // Remove from localStorage
    localStorage.removeItem("token");
    
    router.push("/login");
  };

  const isAuthenticated = (): boolean => {
    if (typeof window === "undefined") return false;
    
    // Check cookie first
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
    
    if (tokenCookie) {
      return true;
    }
    
    // Fallback to localStorage (optional)
    const token = localStorage.getItem("token");
    return !!token;
  };

  const checkAuth = (): boolean => {
    const authenticated = isAuthenticated();
    if (!authenticated && window.location.pathname !== "/login") {
      router.push("/login");
      return false;
    }
    return authenticated;
  };

  return { login, logout, isAuthenticated, checkAuth };
};