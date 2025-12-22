// components/AuthProvider.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      const publicRoutes = ["/login", "/api", "/_next", "/favicon.ico"];
      const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));

      if (!authenticated && !isPublicRoute && pathname !== "/login") {
        router.push("/login");
      }
      
      setIsChecking(false);
    };

    // Only run on client side
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, [pathname, router, isAuthenticated]);

  // Show loading while checking auth
  if (isChecking && pathname !== "/login") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}   