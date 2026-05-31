"use client";

import React, { useState, useEffect } from "react";
import { Star, User, BriefcaseBusiness, Code, TrendingUp, MessageSquare, Building, Mail, Globe2, Palette as PaletteIcon, Search, Loader2 } from "lucide-react";
import { HomeData } from "../types";
import HeroTab from "../admin/tabs/HeroTab";
import AboutTab from "../admin/tabs/AboutTab";
import ServicesTab from "../admin/tabs/ServicesTab";
import ProjectsTab from "../admin/tabs/ProjectsTab";
import SkillsTab from "../admin/tabs/SkillsTab";
import TestimonialsTab from "../admin/tabs/TestimonialsTab";
import ClientsTab from "../admin/tabs/ClientsTab";
import ContactTab from "../admin/tabs/ContactTab";
import SocialTab from "../admin/tabs/SocialTab";
import ThemeTab from "../admin/tabs/ThemeTab";
import SEOTab from "../admin/tabs/SEOTab";
import Sidebar from "../admin/Sidebar";
import DashboardHeader from "../admin/DashboardHeader";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const HomePageForm = () => {
  const [formData, setFormData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const tabs = [
    { id: "hero", label: "Hero", icon: <Star size={18} />, color: "from-indigo-500 to-purple-500" },
    { id: "about", label: "About", icon: <User size={18} />, color: "from-emerald-500 to-teal-500" },
    { id: "services", label: "Services", icon: <BriefcaseBusiness size={18} />, color: "from-blue-500 to-cyan-500" },
    { id: "projects", label: "Projects", icon: <Code size={18} />, color: "from-violet-500 to-purple-500" },
    { id: "skills", label: "Skills", icon: <TrendingUp size={18} />, color: "from-amber-500 to-orange-500" },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare size={18} />, color: "from-rose-500 to-pink-500" },
    { id: "clients", label: "Clients", icon: <Building size={18} />, color: "from-slate-600 to-slate-700" },
    { id: "contact", label: "Contact", icon: <Mail size={18} />, color: "from-green-500 to-emerald-500" },
    { id: "social", label: "Social", icon: <Globe2 size={18} />, color: "from-sky-500 to-blue-500" },
    { id: "theme", label: "Theme", icon: <PaletteIcon size={18} />, color: "from-fuchsia-500 to-pink-500" },
    { id: "seo", label: "SEO", icon: <Search size={18} />, color: "from-gray-600 to-slate-700" },
  ];

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/home`);
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      setFormData(data);
      if (data.heroImage) setPreviewImage(data.heroImage);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage({ type: "error", text: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const handleChange = (path: string, value: any) => {
    if (!formData) return;
    const keys = path.split(".");
    const newData = { ...formData };
    let current: any = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setFormData(newData);
    setHasChanges(true);
  };

  const handleArrayChange = (arrayPath: string, index: number, field: string, value: any) => {
    if (!formData) return;
    const keys = arrayPath.split(".");
    const newData = { ...formData };
    let current: any = newData;
    for (let i = 0; i < keys.length; i++) {
      current = current[keys[i]];
    }
    current[index][field] = value;
    setFormData(newData);
    setHasChanges(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size too large! Maximum 5MB." });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setSelectedImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      const formDataToSend = new FormData();

      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === "heroImage" && selectedImageFile) {
          formDataToSend.append("heroImage", selectedImageFile);
        } else if (key === "heroImage" && !selectedImageFile && formData.heroImage) {
          formDataToSend.append("heroImage", formData.heroImage);
        } else if (typeof formData[key as keyof HomeData] === "object" && formData[key as keyof HomeData] !== null) {
          formDataToSend.append(key, JSON.stringify(formData[key as keyof HomeData]));
        } else if (formData[key as keyof HomeData] !== undefined && formData[key as keyof HomeData] !== null) {
          formDataToSend.append(key, String(formData[key as keyof HomeData]));
        }
      });

      const res = await fetch(`${API_URL}/home`, {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        const savedData = await res.json();
        setFormData(savedData);
        setSelectedImageFile(null);
        setMessage({ type: "success", text: "Settings saved successfully!" });
        setHasChanges(false);
        setTimeout(() => setMessage(null), 3000);
        fetchHomeData();
      } else {
        const error = await res.json();
        throw new Error(error.error || "Save failed");
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to save changes." });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-indigo-600 animate-spin" />
          <p className="text-sm font-medium text-slate-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <div className="container px-4 py-8 mx-auto">
        <DashboardHeader
          heroName={formData.heroName}
          updatedAt={formData.updatedAt}
          hasChanges={hasChanges}
          saving={saving}
          message={message}
          onSave={handleSave}
          formData={formData}
        />

        <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Sidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="lg:col-span-9">
            <div className="overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-200/70">
              <div className="p-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-linear-to-r ${tabs.find(t => t.id === activeTab)?.color}`}>
                    {tabs.find(t => t.id === activeTab)?.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      {tabs.find(t => t.id === activeTab)?.label} Configuration
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Manage your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} section settings
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {activeTab === "hero" && (
                  <HeroTab
                    formData={formData}
                    handleChange={handleChange}
                    handleImageUpload={handleImageUpload}
                    previewImage={previewImage}
                  />
                )}
                {activeTab === "about" && (
                  <AboutTab
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                )}
                {activeTab === "services" && (
                  <ServicesTab
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                )}
                {activeTab === "projects" && (
                  <ProjectsTab
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                )}
                {activeTab === "skills" && (
                  <SkillsTab
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                )}
                {activeTab === "testimonials" && (
                  <TestimonialsTab
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                )}
                {activeTab === "clients" && (
                  <ClientsTab
                    formData={formData}
                    handleChange={handleChange}
                    handleArrayChange={handleArrayChange}
                  />
                )}
                {activeTab === "contact" && (
                  <ContactTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === "social" && (
                  <SocialTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === "theme" && (
                  <ThemeTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
                {activeTab === "seo" && (
                  <SEOTab
                    formData={formData}
                    handleChange={handleChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageForm;