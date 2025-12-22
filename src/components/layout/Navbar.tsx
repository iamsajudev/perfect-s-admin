"use client";

import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Search,
  Settings,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnread, setHasUnread] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { logout, checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    checkAuth(); // Check authentication on mount
  }, []);

  const notifications = [
    { id: 1, text: "New project submission", time: "2 min ago", read: false },
    { id: 2, text: "Contact form completed", time: "1 hour ago", read: true },
    {
      id: 3,
      text: "System backup successful",
      time: "3 hours ago",
      read: true,
    },
    { id: 4, text: "New user registered", time: "5 hours ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    // Call your existing logout logic
    logout();

    // Remove the auth token cookie (already done in logout)
    // Close any open menus or modals
    setOpen(false);

    // Note: The logout function already redirects to /login
  };

  const markAllAsRead = () => {
    setHasUnread(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".profile-dropdown")) {
        setOpen(false);
      }
      if (!(event.target as Element).closest(".notifications-dropdown")) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 border-b border-gray-100 shadow-sm bg-white/90 backdrop-blur-md lg:px-8">
      {/* Left - Title & Search */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <h1 className="text-lg font-semibold text-transparent bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text">
            Dashboard
          </h1>
          <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="items-center hidden md:flex">
          <div className="relative group">
            <Search
              className="absolute text-gray-400 transition-colors transform -translate-y-1/2 left-3 top-1/2 group-hover:text-gray-600"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 py-2 pl-10 pr-4 text-black transition-all border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 hover:border-gray-300"
            />
            <div className="absolute transform -translate-y-1/2 right-3 top-1/2">
              <kbd className="px-1.5 py-0.5 text-xs border border-gray-300 rounded bg-white text-gray-500">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Search Icon (Mobile) */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 transition-colors rounded-lg md:hidden hover:bg-gray-100"
        >
          <Search size={20} className="text-gray-600" />
        </button>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="absolute left-0 right-0 p-4 bg-white border-b shadow-lg top-16 md:hidden">
            <div className="relative">
              <Search
                className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Help */}
        <button className="relative p-2 transition-colors rounded-lg hover:bg-gray-100 group">
          <HelpCircle size={20} className="text-gray-600" />
          <div className="absolute top-10 right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Help & Support
            <div className="absolute bottom-0 w-0 h-0 -mt-1 border-t-4 border-l-4 border-r-4 right-2 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </button>

        {/* Settings */}
        <button className="relative p-2 transition-colors rounded-lg hover:bg-gray-100 group">
          <Settings size={20} className="text-gray-600" />
          <div className="absolute top-10 right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Settings
            <div className="absolute bottom-0 w-0 h-0 -mt-1 border-t-4 border-l-4 border-r-4 right-2 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </button>

        {/* Notifications */}
        <div className="relative notifications-dropdown">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (hasUnread && notificationsOpen) markAllAsRead();
            }}
            className="relative p-2 transition-colors rounded-lg hover:bg-gray-100 group"
          >
            <Bell size={20} className="text-gray-600" />
            {hasUnread && (
              <>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              </>
            )}
            <div className="absolute top-10 right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Notifications
              <div className="absolute bottom-0 w-0 h-0 -mt-1 border-t-4 border-l-4 border-r-4 right-2 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 z-50 mt-2 overflow-hidden duration-200 bg-white border border-gray-200 shadow-xl w-80 rounded-xl animate-in fade-in slide-in-from-top-5">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Notifications
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {unreadCount} unread
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>
              <div className="overflow-y-auto max-h-96">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      !notification.read ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 shrink-0 w-2 h-2 rounded-full ${
                          !notification.read ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 truncate">
                          {notification.text}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center bg-gray-50">
                <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative profile-dropdown">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 transition-colors group border border-transparent hover:border-gray-200"
          >
            <div className="relative">
              <div className="flex items-center justify-center rounded-full shadow-sm w-9 h-9 bg-linear-to-br from-blue-500 to-purple-500">
                <User size={18} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium text-gray-800">Mr. Perfect</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 z-50 mt-2 overflow-hidden duration-200 bg-white border border-gray-200 shadow-xl w-60 rounded-xl animate-in fade-in slide-in-from-top-5">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center px-3 rounded-full shadow-sm w-11 h-11 bg-linear-to-br from-blue-500 to-purple-500">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-500">szamansaju@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
                  <User size={18} className="text-gray-500" />
                  <span className="font-medium">Profile Settings</span>
                </button>

                <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
                  <Settings size={18} className="text-gray-500" />
                  <span className="font-medium">Account Settings</span>
                </button>

                <button className="flex items-center w-full gap-3 px-4 py-3 text-gray-700 transition-colors hover:bg-gray-50">
                  <HelpCircle size={18} className="text-gray-500" />
                  <span className="font-medium">Help Center</span>
                </button>
              </div>

              <div className="py-2 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full gap-3 px-4 py-3 text-red-600 transition-colors cursor-pointer hover:bg-red-50"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>

              <div className="p-4 text-center bg-gray-50">
                <p className="text-xs text-gray-500">
                  v2.5.1 • Last active: Now
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
