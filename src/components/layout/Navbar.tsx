"use client";

import { Bell, ChevronDown, LogOut, User, Search, Settings, HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasUnread, setHasUnread] = useState(true);
  const { logout } = useAuth();

  const notifications = [
    { id: 1, text: "New project submission", time: "2 min ago", read: false },
    { id: 2, text: "Contact form completed", time: "1 hour ago", read: true },
    { id: 3, text: "System backup successful", time: "3 hours ago", read: true },
    { id: 4, text: "New user registered", time: "5 hours ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const markAllAsRead = () => {
    setHasUnread(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.profile-dropdown')) {
        setOpen(false);
      }
      if (!(event.target as Element).closest('.notifications-dropdown')) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 lg:px-8 shadow-sm">
      {/* Left - Title & Search */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <h1 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all hover:border-gray-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-1.5 py-0.5 text-xs border border-gray-300 rounded bg-white text-gray-500">⌘K</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Search Icon (Mobile) */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Search size={20} className="text-gray-600" />
        </button>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b p-4 md:hidden shadow-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Help */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group">
          <HelpCircle size={20} className="text-gray-600" />
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Help & Support
            <div className="absolute top-full right-2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </button>

        {/* Settings */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group">
          <Settings size={20} className="text-gray-600" />
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Settings
            <div className="absolute top-full right-2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
          </div>
        </button>

        {/* Notifications */}
        <div className="relative notifications-dropdown">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              if (hasUnread && notificationsOpen) markAllAsRead();
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative group"
          >
            <Bell size={20} className="text-gray-600" />
            {hasUnread && (
              <>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
              </>
            )}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
              Notifications
              <div className="absolute top-full right-2 -mt-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
            </div>
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{unreadCount} unread</p>
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
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 truncate">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
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
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                <User size={18} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown 
              size={16} 
              className={`text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-sm">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-500">admin@example.com</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <User size={18} className="text-gray-500" />
                  <span className="font-medium">Profile Settings</span>
                </button>
                
                <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings size={18} className="text-gray-500" />
                  <span className="font-medium">Account Settings</span>
                </button>

                <button className="flex w-full items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                  <HelpCircle size={18} className="text-gray-500" />
                  <span className="font-medium">Help Center</span>
                </button>
              </div>
              
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
              
              <div className="p-4 bg-gray-50 text-center">
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