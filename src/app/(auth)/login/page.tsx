"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Sparkles,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const DEFAULT_EMAIL = "szamansaju@gmail.com";
  const DEFAULT_PASSWORD = "perfect96";

  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      // Check credentials
      if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        // Generate a simple auth token (demo purposes)
        const authToken =
          Math.random().toString(36).substring(2) + Date.now().toString(36);

        // Save token in cookie (valid for 1 day)
        document.cookie = `token=${authToken}; path=/; max-age=${60 * 60 * 24}`;

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email && password) {
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-linear-to-br from-gray-50 via-white to-blue-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-purple-300 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bg-blue-300 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-pink-300 rounded-full top-1/2 left-1/4 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Decorative Elements */}
        <div className="absolute w-12 h-12 -top-6 -right-6 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl rotate-12"></div>
        <div className="absolute w-10 h-10 rounded-full -bottom-6 -left-6 bg-linear-to-br from-orange-400 to-pink-500"></div>

        <div className="overflow-hidden border border-gray-100 shadow-2xl bg-white/90 backdrop-blur-sm rounded-2xl">
          {/* Header */}
          <div className="px-8 pt-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="flex items-center justify-center w-16 h-16 shadow-lg bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <Shield className="text-white" size={32} />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="text-yellow-500" size={20} />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text">
              Admin Portal
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="flex items-start gap-3 p-4 mx-8 mt-6 border border-green-200 bg-green-50 rounded-xl animate-in fade-in">
              <CheckCircle
                className="text-green-500 flex-shrink-0 mt-0.5"
                size={20}
              />
              <span className="text-sm text-green-700">{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 p-4 mx-8 mt-6 border border-red-200 bg-red-50 rounded-xl animate-in fade-in">
              <AlertCircle
                className="text-red-500 flex-shrink-0 mt-0.5"
                size={20}
              />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute transform -translate-y-1/2 left-3 top-1/2">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <Input
                    type="email"
                    placeholder="szamansaju@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full py-3 pr-4 text-gray-800 transition-all border-gray-200 pl-11 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                    disabled={isLoading || isDemoLoading}
                  />
                  {email === DEFAULT_EMAIL && (
                    <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute transform -translate-y-1/2 left-3 top-1/2">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full py-3 text-gray-800 transition-all border-gray-200 pl-11 pr-11 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    required
                    disabled={isLoading || isDemoLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute p-1 transition-colors transform -translate-y-1/2 rounded right-10 top-1/2 hover:bg-gray-100"
                    disabled={isLoading || isDemoLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400" size={20} />
                    ) : (
                      <Eye className="text-gray-400" size={20} />
                    )}
                  </button>
                  {password === DEFAULT_PASSWORD && (
                    <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    disabled={isLoading || isDemoLoading}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full cursor-pointer py-3 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || isDemoLoading || !email || !password}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  "Sign in to Dashboard"
                )}
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">
                  Secure access
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                This portal is protected with advanced security measures
              </p>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-gray-200 bg-linear-to-r from-gray-50 to-gray-100/50">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Status: Active</span>
              </div>
              <span>•</span>
              <span>v2.5.1</span>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
