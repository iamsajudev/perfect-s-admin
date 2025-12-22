"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Upload,
  Save,
  Palette,
  Film,
  Image as ImageIcon,
  Code,
  User,
  Briefcase,
  MessageSquare,
  Star,
  Building,
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  Globe,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronRight,
  Hash,
  Sparkles,
  Layout,
  Settings,
  Type,
  Tag,
  Award,
  Users,
  BriefcaseBusiness,
  FileText,
  Link,
  Globe2,
  Palette as PaletteIcon,
  Search,
  Zap,
  X,
  Edit,
  Copy,
  ExternalLink,
  Eye as EyeIcon,
  Hash as HashIcon,
  Image,
  Video,
} from "lucide-react";

// --- Interface ---
interface HomeData {
  heroTitle: string;
  heroSubtitle: string;
  heroName: string;
  heroRole: string;
  heroDescription: string;
  heroImage: string;
  heroVideo: string;
  heroBackground: string;
  primaryButton: { text: string; link: string; icon: string };
  secondaryButton: { text: string; link: string; icon: string };
  stats: { number: string; label: string; suffix: string; _id?: string }[];
  featuredSkills: string[];
  techStack: { name: string; icon: string; color: string; _id?: string }[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube: string;
    codepen: string;
    dribbble: string;
    behance: string;
  };
  aboutPreview: { title: string; content: string; image: string };
  services: {
    title: string;
    description: string;
    icon: string;
    color: string;
    _id?: string;
  }[];
  featuredProjects: {
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
    _id?: string;
  }[];
  testimonials: {
    name: string;
    role: string;
    company: string;
    content: string;
    image: string;
    rating: number;
    _id?: string;
  }[];
  clients: { name: string; logo: string; link: string; _id?: string }[];
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    availability: string;
  };
  resume: { url: string; downloadText: string };
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  theme: { primaryColor: string; secondaryColor: string; fontFamily: string };
  animations: { enabled: boolean; type: string };
  image?: string;
  subtitle?: string;
  title?: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const HomePageForm = () => {
  const defaultFormData: HomeData = {
    heroTitle: "",
    heroSubtitle: "",
    heroName: "",
    heroRole: "",
    heroDescription: "",
    heroImage: "",
    heroVideo: "",
    heroBackground: "",
    primaryButton: { text: "", link: "", icon: "" },
    secondaryButton: { text: "", link: "", icon: "" },
    stats: [],
    featuredSkills: [],
    techStack: [],
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
      codepen: "",
      dribbble: "",
      behance: "",
    },
    aboutPreview: { title: "", content: "", image: "" },
    services: [],
    featuredProjects: [],
    testimonials: [],
    clients: [],
    contactInfo: { email: "", phone: "", location: "", availability: "" },
    resume: { url: "", downloadText: "" },
    metaTitle: "",
    metaDescription: "",
    keywords: [],
    theme: {
      primaryColor: "#6366f1",
      secondaryColor: "#10b981",
      fontFamily: "Inter, system-ui, sans-serif",
    },
    animations: { enabled: true, type: "fade" },
    image: "",
    subtitle: "",
    title: "",
  };

  const [formData, setFormData] = useState<HomeData>(defaultFormData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/home`);
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();

      setFormData({
        ...defaultFormData,
        ...data,
        primaryButton: {
          ...defaultFormData.primaryButton,
          ...data.primaryButton,
        },
        secondaryButton: {
          ...defaultFormData.secondaryButton,
          ...data.secondaryButton,
        },
        socialLinks: { ...defaultFormData.socialLinks, ...data.socialLinks },
        contactInfo: { ...defaultFormData.contactInfo, ...data.contactInfo },
        aboutPreview: { ...defaultFormData.aboutPreview, ...data.aboutPreview },
        resume: { ...defaultFormData.resume, ...data.resume },
        theme: { ...defaultFormData.theme, ...data.theme },
        animations: { ...defaultFormData.animations, ...data.animations },
        featuredSkills: data.featuredSkills || [],
        techStack: data.techStack || [],
        services: data.services || [],
        featuredProjects: data.featuredProjects || [],
        testimonials: data.testimonials || [],
        clients: data.clients || [],
        stats: data.stats || [],
      });

      if (data.heroImage) {
        setPreviewImage(data.heroImage);
      }
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
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
    setHasChanges(true);
  };

  const handleArrayChange = (
    arrayPath: string,
    index: number,
    field: string,
    value: any
  ) => {
    setFormData((prev) => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = arrayPath.split(".");
      let current = newData;
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      current[index][field] = value;
      return newData;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Prepare data for API
      const dataToSend = {
        ...formData,
        // Remove MongoDB internal fields
        _id: undefined,
        __v: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        // Remove _id from nested arrays
        stats: formData.stats.map(({ _id, ...rest }) => rest),
        techStack: formData.techStack.map(({ _id, ...rest }) => rest),
        services: formData.services.map(({ _id, ...rest }) => rest),
        featuredProjects: formData.featuredProjects.map(
          ({ _id, ...rest }) => rest
        ),
        testimonials: formData.testimonials.map(({ _id, ...rest }) => rest),
        clients: formData.clients.map(({ _id, ...rest }) => rest),
      };

      const res = await fetch(`${API_URL}/home`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        const savedData = await res.json();
        setFormData(savedData);
        setMessage({ type: "success", text: "Settings saved successfully!" });
        setHasChanges(false);
        setTimeout(() => setMessage(null), 3000);
      } else {
        throw new Error("Save failed");
      }
    } catch (e) {
      setMessage({ type: "error", text: "Failed to save changes." });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload to cloud storage
    // For demo, we'll create a local URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handleChange(field, base64String);
      if (field === "heroImage") {
        setPreviewImage(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-indigo-600 animate-spin" />
          <p className="text-sm font-medium text-slate-600">
            Loading editor...
          </p>
        </div>
      </div>
    );

  const tabs = [
    {
      id: "hero",
      label: "Hero",
      icon: <Star size={18} />,
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: "about",
      label: "About",
      icon: <User size={18} />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "services",
      label: "Services",
      icon: <BriefcaseBusiness size={18} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "projects",
      label: "Projects",
      icon: <Code size={18} />,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "skills",
      label: "Skills & Tech",
      icon: <TrendingUp size={18} />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <MessageSquare size={18} />,
      color: "from-rose-500 to-pink-500",
    },
    {
      id: "clients",
      label: "Clients",
      icon: <Building size={18} />,
      color: "from-slate-600 to-slate-700",
    },
    {
      id: "contact",
      label: "Contact",
      icon: <Mail size={18} />,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "social",
      label: "Social",
      icon: <Globe2 size={18} />,
      color: "from-sky-500 to-blue-500",
    },
    {
      id: "theme",
      label: "Theme",
      icon: <PaletteIcon size={18} />,
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      id: "seo",
      label: "SEO",
      icon: <Search size={18} />,
      color: "from-gray-600 to-slate-700",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      {/* Floating Message */}
      {message && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl backdrop-blur-sm border ${
            message.type === "success"
              ? "bg-linear-to-r from-emerald-50 to-green-50 border-emerald-200 text-emerald-700"
              : "bg-linear-to-r from-rose-50 to-red-50 border-rose-200 text-rose-700"
          }`}
        >
          <div className="flex items-center gap-3">
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-6 p-8 border shadow-sm bg-linear-to-br from-white to-slate-50 rounded-3xl border-slate-200/70 backdrop-blur-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl">
                    <Layout className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                      Portfolio Dashboard
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                      Welcome back, {formData.heroName || "Admin"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {formData.updatedAt && (
                  <div className="px-3 py-1.5 bg-slate-100 rounded-full">
                    <span className="text-xs font-medium text-slate-600">
                      Last updated:{" "}
                      {new Date(formData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {hasChanges && (
                  <div className="px-3 py-1.5 bg-linear-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      UNSAVED CHANGES
                    </span>
                  </div>
                )}

                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="px-8 py-3.5 font-bold text-white transition-all duration-300 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2.5"
                >
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {saving ? "Saving..." : "Save All Changes"}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50/80 rounded-2xl">
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.services?.length || 0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Services
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.featuredProjects?.length || 0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Projects
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.testimonials?.length || 0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Reviews
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.techStack?.length || 0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Tech Stack
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky p-1 space-y-2 border shadow-sm top-8 bg-gradient-to-b from-white to-slate-50 rounded-3xl border-slate-200/70 backdrop-blur-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-linear-to-r ${tab.color} text-white shadow-lg scale-[1.02]`
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2 rounded-xl ${
                          activeTab === tab.id ? "bg-white/20" : "bg-slate-100"
                        }`}
                      >
                        {tab.icon}
                      </div>
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <div className="overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-200/70 backdrop-blur-sm">
              {/* Tab Header */}
              <div className="p-8 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`p-2.5 rounded-xl bg-linear-to-r ${
                      tabs.find((t) => t.id === activeTab)?.color
                    }`}
                  >
                    {tabs.find((t) => t.id === activeTab)?.icon}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {tabs.find((t) => t.id === activeTab)?.label} Configuration
                  </h2>
                </div>
                <p className="text-slate-500">
                  Manage all{" "}
                  {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}{" "}
                  settings
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* HERO SECTION */}
                {activeTab === "hero" && (
                  <div className="space-y-8 animate-in fade-in">
                    {/* Hero Preview Card */}
                    <div className="p-6 text-white bg-linear-to-br from-slate-900 to-purple-900 rounded-2xl">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Live Preview</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <EyeIcon className="w-4 h-4" />
                          Preview Mode
                        </div>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <h1 className="text-3xl font-black">
                            {formData.heroTitle ||
                              "Welcome to My Digital Space"}
                          </h1>
                          <div className="text-lg text-slate-300">
                            <span className="font-medium">
                              {formData.heroSubtitle || "I'm"}
                            </span>{" "}
                            <span className="font-bold text-emerald-300">
                              {formData.heroName || "Sazeduzzaman"}
                            </span>
                          </div>
                          <div className="text-xl font-semibold text-indigo-300">
                            {formData.heroRole || "Full Stack Developer"}
                          </div>
                          <p className="text-slate-300">
                            {formData.heroDescription ||
                              "Passionate developer crafting elegant solutions..."}
                          </p>
                          <div className="flex gap-3 pt-4">
                            <button className="flex items-center gap-2 px-6 py-3 font-bold bg-white text-slate-900 rounded-xl">
                              {formData.primaryButton.icon || "🚀"}{" "}
                              {formData.primaryButton.text || "View My Work"}
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 font-bold text-white border-2 border-white rounded-xl">
                              {formData.secondaryButton.icon || "📧"}{" "}
                              {formData.secondaryButton.text || "Contact Me"}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="w-64 h-64 overflow-hidden border-4 rounded-2xl border-white/20">
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Hero"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-indigo-500 to-purple-500">
                                <ImageIcon className="w-12 h-12 text-white/50" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hero Form */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Type className="w-3.5 h-3.5" />
                          Hero Title
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900 font-medium"
                          value={formData.heroTitle}
                          onChange={(e) =>
                            handleChange("heroTitle", e.target.value)
                          }
                          placeholder="Welcome to My Digital Space"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <User className="w-3.5 h-3.5" />
                          Your Name
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900 font-semibold"
                          value={formData.heroName}
                          onChange={(e) =>
                            handleChange("heroName", e.target.value)
                          }
                          placeholder="Sazeduzzaman"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Briefcase className="w-3.5 h-3.5" />
                          Your Role
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900"
                          value={formData.heroRole}
                          onChange={(e) =>
                            handleChange("heroRole", e.target.value)
                          }
                          placeholder="Full Stack Developer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <HashIcon className="w-3.5 h-3.5" />
                          Hero Subtitle
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900"
                          value={formData.heroSubtitle}
                          onChange={(e) =>
                            handleChange("heroSubtitle", e.target.value)
                          }
                          placeholder="I'm"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <FileText className="w-3.5 h-3.5" />
                          Hero Description
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900 resize-none"
                          value={formData.heroDescription}
                          onChange={(e) =>
                            handleChange("heroDescription", e.target.value)
                          }
                          placeholder="Write a compelling introduction about yourself..."
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Image className="w-3.5 h-3.5" />
                          Hero Image
                        </label>
                        <div className="flex gap-3">
                          <input
                            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900"
                            value={formData.heroImage}
                            onChange={(e) => {
                              handleChange("heroImage", e.target.value);
                              setPreviewImage(e.target.value);
                            }}
                            placeholder="https://example.com/image.jpg"
                          />
                          <label className="px-4 py-3.5 bg-indigo-50 text-indigo-600 font-medium rounded-xl cursor-pointer hover:bg-indigo-100 transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(e, "heroImage")
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Video className="w-3.5 h-3.5" />
                          Hero Video URL (Optional)
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900"
                          value={formData.heroVideo}
                          onChange={(e) =>
                            handleChange("heroVideo", e.target.value)
                          }
                          placeholder="https://example.com/video.mp4"
                        />
                      </div>
                    </div>

                    {/* Background */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <Palette className="w-3.5 h-3.5" />
                        Hero Background
                      </label>
                      <input
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 text-slate-900"
                        value={formData.heroBackground}
                        onChange={(e) =>
                          handleChange("heroBackground", e.target.value)
                        }
                        placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      />
                    </div>

                    {/* Buttons Section */}
                    <div className="p-6 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-indigo-500 rounded-lg">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold text-white">
                              Primary Button
                            </span>
                          </div>
                          <div className="space-y-3">
                            <input
                              placeholder="Button Text"
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
                              value={formData.primaryButton.text}
                              onChange={(e) =>
                                handleChange(
                                  "primaryButton.text",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              placeholder="Button Link"
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
                              value={formData.primaryButton.link}
                              onChange={(e) =>
                                handleChange(
                                  "primaryButton.link",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              placeholder="Button Icon (emoji)"
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-400"
                              value={formData.primaryButton.icon}
                              onChange={(e) =>
                                handleChange(
                                  "primaryButton.icon",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-500 rounded-lg">
                              <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold text-white">
                              Secondary Button
                            </span>
                          </div>
                          <div className="space-y-3">
                            <input
                              placeholder="Button Text"
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400"
                              value={formData.secondaryButton.text}
                              onChange={(e) =>
                                handleChange(
                                  "secondaryButton.text",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              placeholder="Button Link"
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400"
                              value={formData.secondaryButton.link}
                              onChange={(e) =>
                                handleChange(
                                  "secondaryButton.link",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              placeholder="Button Icon (emoji)"
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-slate-800 border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-400"
                              value={formData.secondaryButton.icon}
                              onChange={(e) =>
                                handleChange(
                                  "secondaryButton.icon",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ABOUT PREVIEW */}
                {activeTab === "about" && (
                  <div className="space-y-6">
                    <div className="p-6 border bg-linear-to-br from-emerald-50 to-green-50 rounded-2xl border-emerald-100">
                      <h3 className="mb-4 text-lg font-bold text-slate-900">
                        About Section Preview
                      </h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-3 text-xl font-bold text-slate-900">
                            {formData.aboutPreview.title || "About Me"}
                          </h4>
                          <p className="mb-4 text-slate-700">
                            {formData.aboutPreview.content ||
                              "Full Stack Developer passionate about creating efficient, scalable web applications..."}
                          </p>
                          <div className="space-y-2">
                            <h5 className="font-bold text-slate-900">
                              Featured Skills:
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {formData.featuredSkills?.map((skill, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 text-sm bg-white border rounded-full border-slate-200 text-slate-700"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <div className="w-48 h-48 overflow-hidden border-4 border-white shadow-lg rounded-2xl">
                            {formData.aboutPreview.image ? (
                              <img
                                src={formData.aboutPreview.image}
                                alt="About"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-emerald-500 to-teal-500">
                                <User className="w-12 h-12 text-white/50" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <Type className="w-3.5 h-3.5" />
                        About Section Title
                      </label>
                      <input
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-semibold"
                        value={formData.aboutPreview.title}
                        onChange={(e) =>
                          handleChange("aboutPreview.title", e.target.value)
                        }
                        placeholder="About Me"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <FileText className="w-3.5 h-3.5" />
                        Bio Content
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 resize-none"
                        value={formData.aboutPreview.content}
                        onChange={(e) =>
                          handleChange("aboutPreview.content", e.target.value)
                        }
                        placeholder="Write about yourself..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                        <ImageIcon className="w-3.5 h-3.5" />
                        About Image URL
                      </label>
                      <input
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900"
                        value={formData.aboutPreview.image}
                        onChange={(e) =>
                          handleChange("aboutPreview.image", e.target.value)
                        }
                        placeholder="https://example.com/about-image.jpg"
                      />
                    </div>

                    {/* Featured Skills */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Award className="w-3.5 h-3.5" />
                          Featured Skills
                        </label>
                        <button
                          onClick={() => {
                            const newSkills = [
                              ...(formData.featuredSkills || []),
                              "",
                            ];
                            handleChange("featuredSkills", newSkills);
                          }}
                          className="px-3 py-1.5 text-xs bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                        >
                          + Add Skill
                        </button>
                      </div>
                      <div className="space-y-2">
                        {formData.featuredSkills?.map((skill, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              className="flex-1 px-4 py-3 transition-all duration-300 border bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                              value={skill}
                              onChange={(e) => {
                                const newSkills = [...formData.featuredSkills];
                                newSkills[i] = e.target.value;
                                handleChange("featuredSkills", newSkills);
                              }}
                              placeholder="e.g., JavaScript, React, Node.js"
                            />
                            <button
                              onClick={() => {
                                const newSkills =
                                  formData.featuredSkills.filter(
                                    (_, idx) => idx !== i
                                  );
                                handleChange("featuredSkills", newSkills);
                              }}
                              className="px-4 py-3 font-medium text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SERVICES */}
                {activeTab === "services" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Services Offered
                        </h3>
                        <p className="text-sm text-slate-500">
                          Manage your professional services
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newServices = [
                            ...formData.services,
                            {
                              title: "",
                              description: "",
                              icon: "🚀",
                              color: "#6366f1",
                            },
                          ];
                          handleChange("services", newServices);
                        }}
                        className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Service
                      </button>
                    </div>

                    {/* Services Preview */}
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
                      {formData.services?.map((service, i) => (
                        <div
                          key={i}
                          className="p-4 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-xl"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-2xl">{service.icon}</div>
                            <h4 className="font-bold text-slate-900">
                              {service.title}
                            </h4>
                          </div>
                          <p className="text-sm text-slate-600">
                            {service.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Services Editor */}
                    <div className="space-y-4">
                      {formData.services?.map((service, i) => (
                        <div
                          key={i}
                          className="p-6 transition-all duration-300 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-2xl hover:border-blue-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-slate-900">
                              Service #{i + 1}
                            </h4>
                            <button
                              onClick={() => {
                                const newServices = formData.services.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("services", newServices);
                              }}
                              className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Title
                              </label>
                              <input
                                className="w-full px-4 py-3 font-medium transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                                value={service.title}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "services",
                                    i,
                                    "title",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., Web Development"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Icon (emoji)
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                                value={service.icon}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "services",
                                    i,
                                    "icon",
                                    e.target.value
                                  )
                                }
                                placeholder="💻"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Description
                              </label>
                              <textarea
                                rows={2}
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border resize-none border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                                value={service.description}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "services",
                                    i,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Describe this service..."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Color
                              </label>
                              <div className="flex gap-3">
                                <input
                                  type="color"
                                  className="w-12 h-12 border cursor-pointer rounded-xl border-slate-200"
                                  value={service.color}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "services",
                                      i,
                                      "color",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  className="flex-1 px-4 py-3 font-mono transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
                                  value={service.color}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "services",
                                      i,
                                      "color",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PROJECTS */}
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Featured Projects
                        </h3>
                        <p className="text-sm text-slate-500">
                          Showcase your best work
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newProjects = [
                            ...formData.featuredProjects,
                            {
                              title: "",
                              description: "",
                              image: "",
                              link: "",
                              tags: [],
                            },
                          ];
                          handleChange("featuredProjects", newProjects);
                        }}
                        className="px-5 py-2.5 bg-linear-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Project
                      </button>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                      {formData.featuredProjects?.map((project, i) => (
                        <div
                          key={i}
                          className="relative overflow-hidden border group rounded-2xl border-slate-200"
                        >
                          <div className="h-40 overflow-hidden bg-slate-100">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-violet-500 to-purple-500">
                                <Code className="w-12 h-12 text-white/50" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="mb-2 font-bold text-slate-900">
                              {project.title || "Project Title"}
                            </h4>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {project.tags?.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Projects Editor */}
                    <div className="space-y-6">
                      {formData.featuredProjects?.map((project, i) => (
                        <div
                          key={i}
                          className="p-6 space-y-4 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-2xl"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900">
                              Project #{i + 1}
                            </h4>
                            <button
                              onClick={() => {
                                const newProjects =
                                  formData.featuredProjects.filter(
                                    (_, idx) => idx !== i
                                  );
                                handleChange("featuredProjects", newProjects);
                              }}
                              className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Project Title
                              </label>
                              <input
                                className="w-full px-4 py-3 font-semibold transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900"
                                value={project.title}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "featuredProjects",
                                    i,
                                    "title",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., E-commerce Platform"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Project URL
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900"
                                value={project.link}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "featuredProjects",
                                    i,
                                    "link",
                                    e.target.value
                                  )
                                }
                                placeholder="https://github.com/username/project"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Image URL
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900"
                                value={project.image}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "featuredProjects",
                                    i,
                                    "image",
                                    e.target.value
                                  )
                                }
                                placeholder="https://example.com/project-image.jpg"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Description
                              </label>
                              <textarea
                                rows={3}
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border resize-none border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900"
                                value={project.description}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "featuredProjects",
                                    i,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Describe your project..."
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Tags (comma separated)
                              </label>
                              <input
                                className="w-full px-4 py-3 text-sm transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 text-slate-900"
                                value={project.tags?.join(", ") || ""}
                                onChange={(e) => {
                                  const tags = e.target.value
                                    .split(",")
                                    .map((tag) => tag.trim())
                                    .filter((tag) => tag);
                                  handleArrayChange(
                                    "featuredProjects",
                                    i,
                                    "tags",
                                    tags
                                  );
                                }}
                                placeholder="React, Node.js, MongoDB, Tailwind CSS"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKILLS & TECH */}
                {activeTab === "skills" && (
                  <div className="space-y-8">
                    {/* Stats Section */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">
                            Statistics
                          </h4>
                          <p className="text-sm text-slate-500">
                            Showcase your achievements
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const newStats = [
                              ...formData.stats,
                              { number: "0", label: "", suffix: "+" },
                            ];
                            handleChange("stats", newStats);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Stat
                        </button>
                      </div>

                      {/* Stats Preview */}
                      <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                        {formData.stats?.map((stat, i) => (
                          <div
                            key={i}
                            className="p-4 text-center text-white bg-linear-to-br from-slate-900 to-amber-900 rounded-2xl"
                          >
                            <div className="text-2xl font-black text-amber-400">
                              {stat.number}
                              {stat.suffix}
                            </div>
                            <div className="mt-1 text-xs font-bold tracking-wider uppercase text-slate-300">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stats Editor */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {formData.stats?.map((stat, i) => (
                          <div
                            key={i}
                            className="p-4 border bg-slate-50 border-slate-200 rounded-xl"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-700">
                                Stat #{i + 1}
                              </span>
                              <button
                                onClick={() => {
                                  const newStats = formData.stats.filter(
                                    (_, idx) => idx !== i
                                  );
                                  handleChange("stats", newStats);
                                }}
                                className="p-1 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-3">
                              <input
                                placeholder="Number"
                                className="w-full px-3 py-2 font-bold transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                value={stat.number}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "stats",
                                    i,
                                    "number",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                placeholder="Label"
                                className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                value={stat.label}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "stats",
                                    i,
                                    "label",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                placeholder="Suffix (+, %, etc)"
                                className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                value={stat.suffix}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "stats",
                                    i,
                                    "suffix",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Tech Stack Section */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">
                            Tech Stack
                          </h4>
                          <p className="text-sm text-slate-500">
                            Technologies you work with
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const newTech = [
                              ...formData.techStack,
                              { name: "", icon: "", color: "#6366f1" },
                            ];
                            handleChange("techStack", newTech);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Technology
                        </button>
                      </div>

                      {/* Tech Stack Preview */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {formData.techStack?.map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl"
                          >
                            <span className="text-lg">{tech.icon}</span>
                            <span className="font-medium text-slate-900">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Editor */}
                      <div className="space-y-4">
                        {formData.techStack?.map((tech, i) => (
                          <div
                            key={i}
                            className="p-4 border bg-slate-50 border-slate-200 rounded-xl"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-700">
                                Technology #{i + 1}
                              </span>
                              <button
                                onClick={() => {
                                  const newTech = formData.techStack.filter(
                                    (_, idx) => idx !== i
                                  );
                                  handleChange("techStack", newTech);
                                }}
                                className="p-1 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Icon (emoji)
                                </label>
                                <input
                                  className="w-full px-3 py-2 text-lg text-center transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                  value={tech.icon}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "techStack",
                                      i,
                                      "icon",
                                      e.target.value
                                    )
                                  }
                                  placeholder="⚛️"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Name
                                </label>
                                <input
                                  className="w-full px-3 py-2 font-medium transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                  value={tech.name}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "techStack",
                                      i,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="React"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Color
                                </label>
                                <div className="flex gap-2">
                                  <input
                                    type="color"
                                    className="w-10 h-10 border rounded-lg cursor-pointer border-slate-200"
                                    value={tech.color}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "techStack",
                                        i,
                                        "color",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <input
                                    className="flex-1 px-3 py-2 font-mono text-sm transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                    value={tech.color}
                                    onChange={(e) =>
                                      handleArrayChange(
                                        "techStack",
                                        i,
                                        "color",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* TESTIMONIALS */}
                {activeTab === "testimonials" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Client Testimonials
                        </h3>
                        <p className="text-sm text-slate-500">
                          Showcase client feedback
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newTestimonials = [
                            ...formData.testimonials,
                            {
                              name: "",
                              role: "",
                              company: "",
                              content: "",
                              image: "",
                              rating: 5,
                            },
                          ];
                          handleChange("testimonials", newTestimonials);
                        }}
                        className="px-5 py-2.5 bg-linear-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Testimonial
                      </button>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
                      {formData.testimonials?.map((testimonial, i) => (
                        <div
                          key={i}
                          className="p-4 border bg-linear-to-br from-rose-50 to-pink-50 border-rose-100 rounded-xl"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 overflow-hidden rounded-full bg-slate-200">
                              {testimonial.image ? (
                                <img
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="object-cover w-full h-full"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full text-white bg-linear-to-br from-rose-500 to-pink-500">
                                  <User className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900">
                                {testimonial.name}
                              </h4>
                              <p className="text-sm text-slate-600">
                                {testimonial.role}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                          <p className="italic text-slate-700">
                            "{testimonial.content}"
                          </p>
                          <div className="flex items-center gap-1 mt-3">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 ${
                                  idx < testimonial.rating
                                    ? "text-amber-400 fill-amber-400"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonials Editor */}
                    <div className="space-y-6">
                      {formData.testimonials?.map((testimonial, i) => (
                        <div
                          key={i}
                          className="p-6 space-y-4 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-2xl"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-slate-900">
                              Testimonial #{i + 1}
                            </h4>
                            <button
                              onClick={() => {
                                const newTestimonials =
                                  formData.testimonials.filter(
                                    (_, idx) => idx !== i
                                  );
                                handleChange("testimonials", newTestimonials);
                              }}
                              className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Client Name
                              </label>
                              <input
                                className="w-full px-4 py-3 font-semibold transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                                value={testimonial.name}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "testimonials",
                                    i,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="John Doe"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Role
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                                value={testimonial.role}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "testimonials",
                                    i,
                                    "role",
                                    e.target.value
                                  )
                                }
                                placeholder="Project Manager"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Company
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                                value={testimonial.company}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "testimonials",
                                    i,
                                    "company",
                                    e.target.value
                                  )
                                }
                                placeholder="Tech Company Inc."
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Image URL
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                                value={testimonial.image}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "testimonials",
                                    i,
                                    "image",
                                    e.target.value
                                  )
                                }
                                placeholder="https://example.com/avatar.jpg"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Rating (1-5)
                              </label>
                              <select
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                                value={testimonial.rating}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "testimonials",
                                    i,
                                    "rating",
                                    parseInt(e.target.value)
                                  )
                                }
                              >
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <option key={num} value={num}>
                                    {num} Star{num !== 1 ? "s" : ""}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Testimonial Content
                              </label>
                              <textarea
                                rows={3}
                                className="w-full px-4 py-3 italic transition-all duration-300 bg-white border resize-none border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                                value={testimonial.content}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "testimonials",
                                    i,
                                    "content",
                                    e.target.value
                                  )
                                }
                                placeholder="Client feedback..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CLIENTS */}
                {activeTab === "clients" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Brand Partners
                        </h3>
                        <p className="text-sm text-slate-500">
                          Companies you've worked with
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newClients = [
                            ...formData.clients,
                            { name: "", logo: "", link: "" },
                          ];
                          handleChange("clients", newClients);
                        }}
                        className="px-5 py-2.5 bg-linear-to-r from-slate-600 to-slate-700 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Add Client
                      </button>
                    </div>

                    {/* Clients Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
                      {formData.clients?.map((client, i) => (
                        <div
                          key={i}
                          className="p-4 transition-all duration-300 bg-white border border-slate-200 rounded-xl hover:shadow-md"
                        >
                          <div className="flex items-center justify-center h-16 mb-3">
                            {client.logo ? (
                              <img
                                src={client.logo}
                                alt={client.name}
                                className="object-contain max-w-full max-h-12"
                              />
                            ) : (
                              <div className="text-sm text-center text-slate-400">
                                No Logo
                              </div>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-center text-slate-900">
                            {client.name}
                          </h4>
                        </div>
                      ))}
                    </div>

                    {/* Clients Editor */}
                    <div className="space-y-4">
                      {formData.clients?.map((client, i) => (
                        <div
                          key={i}
                          className="p-4 border bg-slate-50 border-slate-200 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-700">
                              Client #{i + 1}
                            </span>
                            <button
                              onClick={() => {
                                const newClients = formData.clients.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("clients", newClients);
                              }}
                              className="p-1 text-slate-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Company Name
                              </label>
                              <input
                                className="w-full px-3 py-2 font-medium transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 text-slate-900"
                                value={client.name}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "clients",
                                    i,
                                    "name",
                                    e.target.value
                                  )
                                }
                                placeholder="Google"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Logo URL
                              </label>
                              <input
                                className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 text-slate-900"
                                value={client.logo}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "clients",
                                    i,
                                    "logo",
                                    e.target.value
                                  )
                                }
                                placeholder="https://logo.clearbit.com/google.com"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Website Link
                              </label>
                              <input
                                className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 text-slate-900"
                                value={client.link}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "clients",
                                    i,
                                    "link",
                                    e.target.value
                                  )
                                }
                                placeholder="https://google.com"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CONTACT */}
                {activeTab === "contact" && (
                  <div className="space-y-8">
                    <section>
                      <h3 className="mb-6 text-lg font-bold text-slate-900">
                        Contact Information
                      </h3>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                            <Mail className="w-3.5 h-3.5" />
                            Email Address
                          </label>
                          <input
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900"
                            value={formData.contactInfo.email}
                            onChange={(e) =>
                              handleChange("contactInfo.email", e.target.value)
                            }
                            placeholder="hello@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                            <Phone className="w-3.5 h-3.5" />
                            Phone Number
                          </label>
                          <input
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900"
                            value={formData.contactInfo.phone}
                            onChange={(e) =>
                              handleChange("contactInfo.phone", e.target.value)
                            }
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            Location
                          </label>
                          <input
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900"
                            value={formData.contactInfo.location}
                            onChange={(e) =>
                              handleChange(
                                "contactInfo.location",
                                e.target.value
                              )
                            }
                            placeholder="San Francisco, CA"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Availability Status
                          </label>
                          <input
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-slate-900 font-semibold text-emerald-600"
                            value={formData.contactInfo.availability}
                            onChange={(e) =>
                              handleChange(
                                "contactInfo.availability",
                                e.target.value
                              )
                            }
                            placeholder="Available for freelance work"
                          />
                        </div>
                      </div>
                    </section>

                    <section className="p-6 bg-linear-to-br from-emerald-600 to-green-500 rounded-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-white/20">
                          <Download className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-white">
                          Resume & CV Settings
                        </h4>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/90">
                            Resume PDF URL
                          </label>
                          <input
                            placeholder="https://drive.google.com/your-resume.pdf"
                            className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 text-white placeholder:text-white/60"
                            value={formData.resume.url}
                            onChange={(e) =>
                              handleChange("resume.url", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-white/90">
                            Download Button Text
                          </label>
                          <input
                            placeholder="Download Resume"
                            className="w-full px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all duration-300 text-white placeholder:text-white/60"
                            value={formData.resume.downloadText}
                            onChange={(e) =>
                              handleChange(
                                "resume.downloadText",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        {formData.resume.url && (
                          <a
                            href={formData.resume.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 font-medium transition-colors bg-white rounded-lg text-emerald-600 hover:bg-white/90"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Preview Resume
                          </a>
                        )}
                      </div>
                    </section>
                  </div>
                )}

                {/* SOCIAL LINKS */}
                {activeTab === "social" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      Social Media Links
                    </h3>
                    <p className="mb-6 text-sm text-slate-500">
                      Connect your social media profiles
                    </p>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {Object.entries(formData.socialLinks).map(
                        ([platform, url]) => (
                          <div
                            key={platform}
                            className="p-4 transition-all duration-300 bg-white border border-slate-200 rounded-xl hover:border-blue-300"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`p-3 rounded-xl ${
                                  platform === "github"
                                    ? "bg-slate-900"
                                    : platform === "linkedin"
                                    ? "bg-blue-600"
                                    : platform === "twitter"
                                    ? "bg-sky-500"
                                    : platform === "instagram"
                                    ? "bg-linear-to-br from-pink-500 to-purple-500"
                                    : platform === "youtube"
                                    ? "bg-red-600"
                                    : "bg-slate-600"
                                }`}
                              >
                                {platform === "github" && (
                                  <Globe className="w-5 h-5 text-white" />
                                )}
                                {platform === "linkedin" && (
                                  <Briefcase className="w-5 h-5 text-white" />
                                )}
                                {platform === "twitter" && (
                                  <MessageSquare className="w-5 h-5 text-white" />
                                )}
                                {platform === "instagram" && (
                                  <ImageIcon className="w-5 h-5 text-white" />
                                )}
                                {platform === "youtube" && (
                                  <Film className="w-5 h-5 text-white" />
                                )}
                                {["codepen", "dribbble", "behance"].includes(
                                  platform
                                ) && <Globe className="w-5 h-5 text-white" />}
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  {platform}
                                </div>
                                <input
                                  className="w-full mt-1 text-sm font-medium bg-transparent outline-none text-slate-900"
                                  value={url}
                                  onChange={(e) =>
                                    handleChange(
                                      `socialLinks.${platform}`,
                                      e.target.value
                                    )
                                  }
                                  placeholder={`https://${platform}.com/username`}
                                />
                              </div>
                              {url && (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* THEME */}
                {activeTab === "theme" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">
                        Brand Colors & Typography
                      </h3>
                      <p className="text-sm text-slate-500">
                        Customize the visual appearance of your portfolio
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: formData.theme.primaryColor,
                            }}
                          />
                          Primary Color
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            className="w-20 h-20 border cursor-pointer rounded-2xl border-slate-200"
                            value={formData.theme.primaryColor}
                            onChange={(e) =>
                              handleChange("theme.primaryColor", e.target.value)
                            }
                          />
                          <input
                            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                            value={formData.theme.primaryColor}
                            onChange={(e) =>
                              handleChange("theme.primaryColor", e.target.value)
                            }
                          />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <div className="mb-2 text-sm font-medium text-slate-700">
                            Preview:
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="px-4 py-2 font-medium text-white rounded-lg"
                              style={{
                                backgroundColor: formData.theme.primaryColor,
                              }}
                            >
                              Primary Button
                            </button>
                            <div
                              className="px-4 py-2 font-medium rounded-lg"
                              style={{
                                color: formData.theme.primaryColor,
                                border: `2px solid ${formData.theme.primaryColor}`,
                              }}
                            >
                              Text Color
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: formData.theme.secondaryColor,
                            }}
                          />
                          Secondary Color
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            className="w-20 h-20 border cursor-pointer rounded-2xl border-slate-200"
                            value={formData.theme.secondaryColor}
                            onChange={(e) =>
                              handleChange(
                                "theme.secondaryColor",
                                e.target.value
                              )
                            }
                          />
                          <input
                            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono"
                            value={formData.theme.secondaryColor}
                            onChange={(e) =>
                              handleChange(
                                "theme.secondaryColor",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <div className="mb-2 text-sm font-medium text-slate-700">
                            Preview:
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="px-4 py-2 font-medium text-white rounded-lg"
                              style={{
                                backgroundColor: formData.theme.secondaryColor,
                              }}
                            >
                              Secondary Button
                            </button>
                            <div
                              className="px-4 py-2 font-medium rounded-lg"
                              style={{ color: formData.theme.secondaryColor }}
                            >
                              Accent Text
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">
                          Font Family
                        </label>
                        <select
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all duration-300 text-slate-900"
                          value={formData.theme.fontFamily.split(",")[0].trim()}
                          onChange={(e) =>
                            handleChange(
                              "theme.fontFamily",
                              `${e.target.value}, system-ui, sans-serif`
                            )
                          }
                        >
                          <option>Inter</option>
                          <option>Poppins</option>
                          <option>Montserrat</option>
                          <option>Roboto</option>
                          <option>SF Pro Display</option>
                          <option>Open Sans</option>
                        </select>
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <div className="mb-2 text-sm font-medium text-slate-700">
                            Preview:
                          </div>
                          <div
                            style={{ fontFamily: formData.theme.fontFamily }}
                          >
                            <h4 className="text-xl font-bold text-slate-900">
                              Sample Heading
                            </h4>
                            <p className="mt-2 text-slate-600">
                              This is how your text will appear with the
                              selected font family.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/20">
                            <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white">Animations</h4>
                            <p className="text-sm text-slate-300">
                              Enable smooth page transitions and effects
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.animations.enabled}
                            onChange={(e) =>
                              handleChange(
                                "animations.enabled",
                                e.target.checked
                              )
                            }
                          />
                          <div className="w-12 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-fuchsia-500"></div>
                        </label>
                      </div>
                      {formData.animations.enabled && (
                        <div className="pt-4 mt-4 border-t border-white/10">
                          <label className="text-sm font-medium text-white/90">
                            Animation Type
                          </label>
                          <select
                            className="w-full px-4 py-3 mt-2 text-white border bg-white/10 border-white/20 rounded-xl"
                            value={formData.animations.type}
                            onChange={(e) =>
                              handleChange("animations.type", e.target.value)
                            }
                          >
                            <option value="fade">Fade</option>
                            <option value="slide">Slide</option>
                            <option value="scale">Scale</option>
                            <option value="bounce">Bounce</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* SEO */}
                {activeTab === "seo" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">
                        SEO & Metadata
                      </h3>
                      <p className="text-sm text-slate-500">
                        Optimize your portfolio for search engines
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Search className="w-3.5 h-3.5" />
                          Meta Title
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 text-slate-900 font-semibold"
                          value={formData.metaTitle}
                          onChange={(e) =>
                            handleChange("metaTitle", e.target.value)
                          }
                          placeholder="Sazeduzzaman - Full Stack Developer Portfolio"
                        />
                        <p className="text-xs text-slate-500">
                          Recommended: 50-60 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <FileText className="w-3.5 h-3.5" />
                          Meta Description
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 text-slate-900 resize-none"
                          value={formData.metaDescription}
                          onChange={(e) =>
                            handleChange("metaDescription", e.target.value)
                          }
                          placeholder="Portfolio of Sazeduzzaman, a Full Stack Developer specializing in JavaScript, React, Node.js, and MongoDB"
                        />
                        <p className="text-xs text-slate-500">
                          Recommended: 150-160 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Tag className="w-3.5 h-3.5" />
                          Keywords
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 text-slate-900"
                          value={formData.keywords?.join(", ") || ""}
                          onChange={(e) =>
                            handleChange(
                              "keywords",
                              e.target.value.split(",").map((k) => k.trim())
                            )
                          }
                          placeholder="developer, portfolio, full stack, react, node.js, mongodb"
                        />
                        <p className="text-xs text-slate-500">
                          Separate with commas
                        </p>
                      </div>

                      {/* SEO Preview */}
                      <div className="p-6 bg-slate-900 rounded-2xl">
                        <h4 className="mb-4 text-lg font-bold text-white">
                          Search Result Preview
                        </h4>
                        <div className="space-y-2">
                          <div className="font-medium text-blue-300">
                            {formData.metaTitle || "Your Meta Title"}
                          </div>
                          <div className="text-sm text-green-400">
                            https://yourportfolio.com
                          </div>
                          <div className="text-sm text-slate-300">
                            {formData.metaDescription ||
                              "Your meta description will appear here in search results."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
