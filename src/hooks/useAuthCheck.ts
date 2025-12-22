// hooks/useAuthCheck.ts
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function useAuthCheck() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if token exists in cookies
      const cookies = document.cookie.split(';');
      const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
      const token = tokenCookie ? tokenCookie.split('=')[1] : null;

      // Public routes that don't require authentication
      const publicRoutes = ["/login", "/api", "/_next", "/favicon.ico"];
      const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));

      // If no token and not on public route, redirect to login
      if (!token && !isPublicRoute && pathname !== "/login") {
        router.push("/login");
      }
      
      // If token exists and on login page, redirect to dashboard
      if (token && pathname === "/login") {
        router.push("/dashboard");
      }
    };

    // Run check on mount and when pathname changes
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, [pathname, router]);
}