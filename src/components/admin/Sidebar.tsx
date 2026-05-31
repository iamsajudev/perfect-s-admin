import React from "react";
import { ChevronRight } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface SidebarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="sticky p-1 space-y-2 border shadow-sm top-8 bg-gradient-to-b from-white to-slate-50 rounded-3xl border-slate-200/70">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
            activeTab === tab.id
              ? `bg-linear-to-r ${tab.color} text-white shadow-lg scale-[1.02]`
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className={`p-2 rounded-xl ${activeTab === tab.id ? "bg-white/20" : "bg-slate-100"}`}>
                {tab.icon}
              </div>
              <span className="font-semibold">{tab.label}</span>
            </div>
            {activeTab === tab.id && <ChevronRight className="w-5 h-5" />}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;