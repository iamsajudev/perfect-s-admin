import React from "react";
import { Layout, Save, Loader2, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { HomeData } from "../types";

interface DashboardHeaderProps {
    heroName: string;
    updatedAt?: string;
    hasChanges: boolean;
    saving: boolean;
    message: { type: "success" | "error"; text: string } | null;
    onSave: () => void;
    formData: HomeData;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    heroName,
    updatedAt,
    hasChanges,
    saving,
    message,
    onSave,
    formData
}) => {
    return (
        <>
            {message && (
                <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-sm border ${message.type === "success"
                    ? "bg-linear-to-r from-emerald-50 to-green-50 border-emerald-200 text-emerald-700"
                    : "bg-linear-to-r from-rose-50 to-red-50 border-rose-200 text-rose-700"
                    }`}>
                    <div className="flex items-center gap-3">
                        {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-medium">{message.text}</span>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-6 p-8 border shadow-sm bg-linear-to-br from-white to-slate-50 rounded-3xl border-slate-200/70">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2.5 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl">
                                <Layout className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tight text-slate-900">Portfolio Dashboard</h1>
                                <p className="text-sm font-medium text-slate-500">Welcome back, {heroName || "Admin"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {updatedAt && (
                            <div className="px-3 py-1.5 bg-slate-100 rounded-full">
                                <span className="text-xs font-medium text-slate-600">
                                    Last updated: {new Date(updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                        {hasChanges && (
                            <div className="px-3 py-1.5 bg-linear-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
                                <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                                    <Zap className="w-3 h-3" /> UNSAVED CHANGES
                                </span>
                            </div>
                        )}
                        <button
                            onClick={onSave}
                            disabled={saving || !hasChanges}
                            className="px-8 py-3.5 font-bold text-white transition-all duration-300 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2.5"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            {saving ? "Saving..." : "Save All Changes"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50/80 rounded-2xl">
                    <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{formData?.services?.length || 0}</div>
                        <div className="text-xs font-medium text-slate-500">Services</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{formData?.featuredProjects?.length || 0}</div>
                        <div className="text-xs font-medium text-slate-500">Projects</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{formData?.testimonials?.length || 0}</div>
                        <div className="text-xs font-medium text-slate-500">Reviews</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-black text-slate-900">{formData?.techStack?.length || 0}</div>
                        <div className="text-xs font-medium text-slate-500">Tech Stack</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardHeader;