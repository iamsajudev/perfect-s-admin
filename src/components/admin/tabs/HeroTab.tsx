import React from "react";
import { Type, User, Briefcase, HashIcon, FileText, Image as ImageIcon, Video, Palette, Sparkles, Zap, EyeIcon, Upload } from "lucide-react";
import { TabProps } from "../../types";

const HeroTab: React.FC<TabProps> = ({ formData, handleChange, handleImageUpload, previewImage }) => {
    return (
        <div className="space-y-8">
            {/* Preview */}
            <div className="p-6 text-white bg-linear-to-br from-slate-900 to-purple-900 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Live Preview</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                        <EyeIcon className="w-4 h-4" /> Preview Mode
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-black">{formData.heroTitle || "Welcome to My Digital Space"}</h1>
                        <div className="text-lg text-slate-300">
                            <span className="font-medium">{formData.heroSubtitle || "I'm"}</span>{" "}
                            <span className="font-bold text-emerald-300">{formData.heroName || "Sazeduzzaman"}</span>
                        </div>
                        <div className="text-xl font-semibold text-indigo-300">{formData.heroRole || "Full Stack Developer"}</div>
                        <p className="text-slate-300">{formData.heroDescription || "Passionate developer crafting elegant solutions..."}</p>
                        <div className="flex gap-3 pt-4">
                            <button className="flex items-center gap-2 px-6 py-3 font-bold bg-white text-slate-900 rounded-xl">
                                {formData.primaryButton.icon || "🚀"} {formData.primaryButton.text || "View My Work"}
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 font-bold text-white border-2 border-white rounded-xl">
                                {formData.secondaryButton.icon || "📧"} {formData.secondaryButton.text || "Contact Me"}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="relative w-64 h-64 overflow-hidden border-4 rounded-2xl border-white/20">
                            {previewImage ? (
                                <img src={previewImage} alt="Hero" className="object-cover w-full h-full" />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-indigo-500 to-purple-500">
                                    <ImageIcon className="w-12 h-12 text-white/50" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <Type className="w-3.5 h-3.5" /> Hero Title
                    </label>
                    <input className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 font-medium" value={formData.heroTitle} onChange={(e) => handleChange("heroTitle", e.target.value)} placeholder="Welcome to My Digital Space" />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <User className="w-3.5 h-3.5" /> Your Name
                    </label>
                    <input className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 font-semibold" value={formData.heroName} onChange={(e) => handleChange("heroName", e.target.value)} placeholder="Sazeduzzaman" />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <Briefcase className="w-3.5 h-3.5" /> Your Role
                    </label>
                    <input className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" value={formData.heroRole} onChange={(e) => handleChange("heroRole", e.target.value)} placeholder="Full Stack Developer" />
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <HashIcon className="w-3.5 h-3.5" /> Hero Subtitle
                    </label>
                    <input className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" value={formData.heroSubtitle} onChange={(e) => handleChange("heroSubtitle", e.target.value)} placeholder="I'm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <FileText className="w-3.5 h-3.5" /> Hero Description
                    </label>
                    <textarea rows={3} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 resize-none" value={formData.heroDescription} onChange={(e) => handleChange("heroDescription", e.target.value)} placeholder="Write a compelling introduction about yourself..." />
                </div>
            </div>

            {/* Image Upload */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <ImageIcon className="w-3.5 h-3.5" /> Hero Image
                    </label>
                    <div className="flex gap-3">
                        <input className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" value={formData.heroImage} onChange={(e) => handleChange("heroImage", e.target.value)} placeholder="https://example.com/image.jpg" />
                        <label className="px-4 py-3.5 bg-indigo-50 text-indigo-600 font-medium rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" /> Upload
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload?.(e, "heroImage")} />
                        </label>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <Video className="w-3.5 h-3.5" /> Hero Video URL
                    </label>
                    <input className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900" value={formData.heroVideo} onChange={(e) => handleChange("heroVideo", e.target.value)} placeholder="https://example.com/video.mp4" />
                </div>
            </div>

            {/* Buttons */}
            <div className="p-6 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-indigo-500 rounded-lg"><Sparkles className="w-4 h-4 text-white" /></div>
                            <span className="text-sm font-bold text-white">Primary Button</span>
                        </div>
                        <div className="space-y-3">
                            <input placeholder="Button Text" className="w-full px-4 py-3 text-white border bg-slate-800 border-slate-700 rounded-xl" value={formData.primaryButton.text} onChange={(e) => handleChange("primaryButton.text", e.target.value)} />
                            <input placeholder="Button Link" className="w-full px-4 py-3 text-white border bg-slate-800 border-slate-700 rounded-xl" value={formData.primaryButton.link} onChange={(e) => handleChange("primaryButton.link", e.target.value)} />
                            <input placeholder="Button Icon (emoji)" className="w-full px-4 py-3 text-white border bg-slate-800 border-slate-700 rounded-xl" value={formData.primaryButton.icon} onChange={(e) => handleChange("primaryButton.icon", e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-500 rounded-lg"><Zap className="w-4 h-4 text-white" /></div>
                            <span className="text-sm font-bold text-white">Secondary Button</span>
                        </div>
                        <div className="space-y-3">
                            <input placeholder="Button Text" className="w-full px-4 py-3 text-white border bg-slate-800 border-slate-700 rounded-xl" value={formData.secondaryButton.text} onChange={(e) => handleChange("secondaryButton.text", e.target.value)} />
                            <input placeholder="Button Link" className="w-full px-4 py-3 text-white border bg-slate-800 border-slate-700 rounded-xl" value={formData.secondaryButton.link} onChange={(e) => handleChange("secondaryButton.link", e.target.value)} />
                            <input placeholder="Button Icon (emoji)" className="w-full px-4 py-3 text-white border bg-slate-800 border-slate-700 rounded-xl" value={formData.secondaryButton.icon} onChange={(e) => handleChange("secondaryButton.icon", e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroTab;