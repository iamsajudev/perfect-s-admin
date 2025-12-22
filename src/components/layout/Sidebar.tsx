"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  House,
  Folder,
  FileText,
  Zap,
  User,
  MessageCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },          // main dashboard
  { name: "Home", href: "/home", icon: House },               // home/projects
  { name: "Projects", href: "/projects", icon: Folder },          // folder/project collection
  { name: "Blogs", href: "/blogs", icon: FileText },              // file/blog post
  { name: "Skills", href: "/skills", icon: Zap },                 // skills/abilities
  { name: "About", href: "/about", icon: User },                  // user info / about me
  { name: "Experience", href: "/experience", icon: FileText },    // experience entries
  { name: "Contacts", href: "/contacts", icon: MessageCircle },   // contact/messages
  { name: "Settings", href: "/settings", icon: Settings },        // settings
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const handleLogout = () => {
    // Call your existing logout logic
    logout();
  };

  return (
    <aside
      className={`
        bg-linear-to-b from-gray-900 to-gray-950 
        text-white p-6 
        transition-all duration-300 ease-in-out
        border-r border-gray-800
        flex flex-col
        ${collapsed ? "w-20" : "w-64"}
        h-screen sticky top-0
        shadow-2xl shadow-black/30
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mr. Perfect
            </h2>
            <p className="text-gray-400 text-sm mt-1">Portfolio</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors hover:scale-105"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight size={20} className="text-gray-300" />
          ) : (
            <ChevronLeft size={20} className="text-gray-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setActiveHover(item.name)}
              onMouseLeave={() => setActiveHover(null)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${
                  isActive
                    ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400"
                    : "hover:bg-gray-800/50"
                }
                ${collapsed ? "justify-center px-2" : ""}
                ${activeHover === item.name ? "translate-x-1" : ""}
              `}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`
                    ${
                      isActive
                        ? "text-blue-400"
                        : "text-gray-400 group-hover:text-white"
                    }
                    transition-colors
                  `}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-blue-400/20 blur-md" />
                )}
              </div>

              {!collapsed && (
                <>
                  <span
                    className={`
                    font-medium transition-colors
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-300 group-hover:text-white"
                    }
                  `}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  )}
                </>
              )}

              {!collapsed && activeHover === item.name && (
                <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg border border-gray-700 shadow-lg">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div
        className={`
        pt-6 mt-6 border-t border-gray-800
        ${collapsed ? "px-2" : "px-4"}
      `}
      >
        {!collapsed && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              AM
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-gray-400 text-sm">admin@example.com</p>
            </div>
          </div>
        )}

        <button
          className={`
            flex items-center gap-3 w-full px-4 py-3 rounded-xl cursor-pointer
            bg-gray-800/50 hover:bg-red-500/10 
            text-gray-300 hover:text-red-400
            transition-all duration-200 group
            ${collapsed ? "justify-center px-2" : ""}
          `}
          onClick={handleLogout}
        >
          <LogOut size={22} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>

        {!collapsed && (
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">v2.5.1 • Last login: Today</p>
          </div>
        )}
      </div>
    </aside>
  );
}
