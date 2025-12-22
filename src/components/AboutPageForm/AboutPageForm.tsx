"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  Upload,
  User,
  Briefcase,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  GraduationCap,
  Heart,
  Star,
  Sparkles,
  Calendar,
  Flag,
  FileText,
  BookOpen,
  Code,
  Cpu,
  MessageSquare,
  Target,
  Quote,
  ExternalLink,
  Edit2,
  Users,
  Trophy,
  Coffee,
  Camera,
  Music,
  Mountain,
  Book,
  Terminal,
  Layout,
  Type,
  Palette,
  Search,
  ChevronRight,
  X,
  Copy,
  Eye,
  Tag,
} from "lucide-react";

interface AboutData {
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    facebook: string;
    youtube: string;
    dribbble: string;
    behance: string;
  };
  favoriteQuote: {
    text: string;
    author: string;
  };
  cta: {
    text: string;
    buttonText: string;
    buttonLink: string;
  };
  content: string;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
    credentialUrl: string;
    _id?: string;
  }>;
  company: string;
  currentRole: string;
  description: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
    _id?: string;
  }>;
  email: string;
  funFacts: string[];
  hobbies: string[];
  intro: string;
  languages: Array<{
    language: string;
    proficiency: string;
    _id?: string;
  }>;
  location: string;
  mission: string;
  name: string;
  nationality: string;
  phone: string;
  profileImage: string;
  resumeUrl: string;
  softSkills: string[];
  stats: Array<{
    label: string;
    value: string;
    prefix: string;
    suffix: string;
    _id?: string;
  }>;
  subtitle: string;
  technicalSkills: Array<{
    category: string;
    skills: string[];
    _id?: string;
  }>;
  title: string;
  yearsOfExperience: number;
  keywords: string[];
  metaDescription: string;
  coverImage: string;
  dateOfBirth: string;
  tools: string[];
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const AboutPageForm = () => {
  const defaultFormData: AboutData = {
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      facebook: "",
      youtube: "",
      dribbble: "",
      behance: "",
    },
    favoriteQuote: {
      text: "",
      author: "",
    },
    cta: {
      text: "",
      buttonText: "",
      buttonLink: "",
    },
    content: "",
    certifications: [],
    company: "",
    currentRole: "",
    description: "",
    education: [],
    email: "",
    funFacts: [],
    hobbies: [],
    intro: "",
    languages: [],
    location: "",
    mission: "",
    name: "",
    nationality: "",
    phone: "",
    profileImage: "",
    resumeUrl: "",
    softSkills: [],
    stats: [],
    subtitle: "",
    technicalSkills: [],
    title: "",
    yearsOfExperience: 0,
    keywords: [],
    metaDescription: "",
    coverImage: "",
    dateOfBirth: "",
    tools: [],
  };

  const [formData, setFormData] = useState<AboutData>(defaultFormData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewCoverImage, setPreviewCoverImage] = useState<string>("");

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/about`);
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();

      setFormData({
        ...defaultFormData,
        ...data,
        socialLinks: {
          ...defaultFormData.socialLinks,
          ...data.socialLinks,
        },
        favoriteQuote: {
          ...defaultFormData.favoriteQuote,
          ...data.favoriteQuote,
        },
        cta: {
          ...defaultFormData.cta,
          ...data.cta,
        },
      });

      if (data.profileImage) {
        setPreviewImage(data.profileImage);
      }
      if (data.coverImage) {
        setPreviewCoverImage(data.coverImage);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage({ type: "error", text: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
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

      const dataToSend = {
        ...formData,
        _id: undefined,
        __v: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        certifications: formData.certifications.map(({ _id, ...rest }) => rest),
        education: formData.education.map(({ _id, ...rest }) => rest),
        languages: formData.languages.map(({ _id, ...rest }) => rest),
        stats: formData.stats.map(({ _id, ...rest }) => rest),
        technicalSkills: formData.technicalSkills.map(
          ({ _id, ...rest }) => rest
        ),
      };

      const res = await fetch(`${API_URL}/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        const savedData = await res.json();
        setFormData(savedData);
        setMessage({ type: "success", text: "About page saved successfully!" });
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
    field: "profileImage" | "coverImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      handleChange(field, base64String);
      if (field === "profileImage") {
        setPreviewImage(base64String);
      } else if (field === "coverImage") {
        setPreviewCoverImage(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    {
      id: "basic",
      label: "Basic Info",
      icon: <User size={18} />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "professional",
      label: "Professional",
      icon: <Briefcase size={18} />,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap size={18} />,
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "skills",
      label: "Skills",
      icon: <Award size={18} />,
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "personal",
      label: "Personal",
      icon: <Heart size={18} />,
      color: "from-rose-500 to-red-500",
    },
    {
      id: "stats",
      label: "Stats & Tools",
      icon: <Star size={18} />,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: "social",
      label: "Social & Quote",
      icon: <Globe size={18} />,
      color: "from-sky-500 to-blue-500",
    },
    {
      id: "seo",
      label: "SEO & Meta",
      icon: <Search size={18} />,
      color: "from-gray-600 to-slate-700",
    },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-linear-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto mb-4 text-indigo-600 animate-spin" />
          <p className="text-sm font-medium text-slate-600">
            Loading about editor...
          </p>
        </div>
      </div>
    );

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
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                      About Page Editor
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                      Manage your personal and professional information
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {formData.updatedAt && (
                  <div className="px-3 py-1.5 bg-slate-100 rounded-full">
                    <span className="text-xs font-medium text-slate-600">
                      Updated:{" "}
                      {new Date(formData.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {hasChanges && (
                  <div className="px-3 py-1.5 bg-linear-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200">
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
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
                  {formData.yearsOfExperience}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Years Exp
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.certifications?.length || 0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Certifications
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.technicalSkills?.flatMap((t) => t.skills).length ||
                    0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Tech Skills
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-slate-900">
                  {formData.languages?.length || 0}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Languages
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky p-1 space-y-2 border shadow-sm top-8 bg-linear-to-b from-white to-slate-50 rounded-3xl border-slate-200/70 backdrop-blur-sm">
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
                    {tabs.find((t) => t.id === activeTab)?.label} Settings
                  </h2>
                </div>
                <p className="text-slate-500">
                  Configure your{" "}
                  {tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}{" "}
                  information
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* BASIC INFO TAB */}
                {activeTab === "basic" && (
                  <div className="space-y-8">
                    {/* Profile Preview */}
                    <div className="p-6 text-white bg-linear-to-br from-slate-900 to-blue-900 rounded-2xl">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">Profile Preview</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Eye className="w-4 h-4" />
                          Preview Mode
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="w-32 h-32 overflow-hidden border-4 rounded-2xl border-white/20">
                            {previewImage ? (
                              <img
                                src={previewImage}
                                alt="Profile"
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-blue-500 to-cyan-500">
                                <User className="w-12 h-12 text-white/50" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h1 className="mb-2 text-3xl font-black">
                            {formData.name || "John Doe"}
                          </h1>
                          <p className="mb-3 text-xl text-blue-300">
                            {formData.currentRole ||
                              "Senior Full Stack Developer"}
                          </p>
                          <p className="text-slate-300">
                            {formData.intro ||
                              "Passionate developer with 5+ years of experience..."}
                          </p>
                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2 text-slate-300">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {formData.location || "San Francisco, CA"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <Building className="w-4 h-4" />
                              <span>
                                {formData.company || "Tech Innovations Inc."}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <User className="w-3.5 h-3.5" />
                          Full Name
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 font-semibold"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Briefcase className="w-3.5 h-3.5" />
                          Current Role
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.currentRole}
                          onChange={(e) =>
                            handleChange("currentRole", e.target.value)
                          }
                          placeholder="Senior Full Stack Developer"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Building className="w-3.5 h-3.5" />
                          Company
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.company}
                          onChange={(e) =>
                            handleChange("company", e.target.value)
                          }
                          placeholder="Tech Innovations Inc."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <MapPin className="w-3.5 h-3.5" />
                          Location
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.location}
                          onChange={(e) =>
                            handleChange("location", e.target.value)
                          }
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Calendar className="w-3.5 h-3.5" />
                          Date of Birth
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.dateOfBirth}
                          onChange={(e) =>
                            handleChange("dateOfBirth", e.target.value)
                          }
                          placeholder="January 15, 1992"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Flag className="w-3.5 h-3.5" />
                          Nationality
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.nationality}
                          onChange={(e) =>
                            handleChange("nationality", e.target.value)
                          }
                          placeholder="American"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <BookOpen className="w-3.5 h-3.5" />
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.yearsOfExperience}
                          onChange={(e) =>
                            handleChange(
                              "yearsOfExperience",
                              parseInt(e.target.value) || 0
                            )
                          }
                          placeholder="5"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Type className="w-3.5 h-3.5" />
                          Page Title
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 font-semibold"
                          value={formData.title}
                          onChange={(e) =>
                            handleChange("title", e.target.value)
                          }
                          placeholder="About Me"
                        />
                      </div>
                    </div>

                    {/* Images Section */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <User className="w-3.5 h-3.5" />
                          Profile Image
                        </label>
                        <div className="flex gap-3">
                          <input
                            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                            value={formData.profileImage}
                            onChange={(e) => {
                              handleChange("profileImage", e.target.value);
                              setPreviewImage(e.target.value);
                            }}
                            placeholder="https://images.unsplash.com/photo-..."
                          />
                          <label className="px-4 py-3.5 bg-blue-50 text-blue-600 font-medium rounded-xl cursor-pointer hover:bg-blue-100 transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(e, "profileImage")
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Layout className="w-3.5 h-3.5" />
                          Cover Image
                        </label>
                        <div className="flex gap-3">
                          <input
                            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                            value={formData.coverImage}
                            onChange={(e) => {
                              handleChange("coverImage", e.target.value);
                              setPreviewCoverImage(e.target.value);
                            }}
                            placeholder="https://images.unsplash.com/photo-..."
                          />
                          <label className="px-4 py-3.5 bg-blue-50 text-blue-600 font-medium rounded-xl cursor-pointer hover:bg-blue-100 transition-colors flex items-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleImageUpload(e, "coverImage")
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Description & Intro */}
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <MessageSquare className="w-3.5 h-3.5" />
                          Introduction
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 resize-none"
                          value={formData.intro}
                          onChange={(e) =>
                            handleChange("intro", e.target.value)
                          }
                          placeholder="A brief introduction about yourself..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <FileText className="w-3.5 h-3.5" />
                          Full Description
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 resize-none"
                          value={formData.description}
                          onChange={(e) =>
                            handleChange("description", e.target.value)
                          }
                          placeholder="Detailed description of your background and expertise..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Target className="w-3.5 h-3.5" />
                          Mission Statement
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 resize-none"
                          value={formData.mission}
                          onChange={(e) =>
                            handleChange("mission", e.target.value)
                          }
                          placeholder="Your professional mission and goals..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Code className="w-3.5 h-3.5" />
                          Short Bio Content
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900"
                          value={formData.content}
                          onChange={(e) =>
                            handleChange("content", e.target.value)
                          }
                          placeholder="I am a MERN Stack Developer."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PROFESSIONAL TAB */}
                {activeTab === "professional" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Mail className="w-3.5 h-3.5" />
                          Email Address
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900"
                          value={formData.email}
                          onChange={(e) =>
                            handleChange("email", e.target.value)
                          }
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Phone className="w-3.5 h-3.5" />
                          Phone Number
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <FileText className="w-3.5 h-3.5" />
                          Resume URL
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900"
                          value={formData.resumeUrl}
                          onChange={(e) =>
                            handleChange("resumeUrl", e.target.value)
                          }
                          placeholder="https://example.com/resume.pdf"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Type className="w-3.5 h-3.5" />
                          Subtitle
                        </label>
                        <input
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-slate-900"
                          value={formData.subtitle}
                          onChange={(e) =>
                            handleChange("subtitle", e.target.value)
                          }
                          placeholder="Full Stack Developer & UI/UX Designer"
                        />
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Award className="w-5 h-5" />
                          Certifications
                        </h3>
                        <button
                          onClick={() => {
                            const newCerts = [
                              ...formData.certifications,
                              {
                                name: "",
                                issuer: "",
                                year: "",
                                credentialUrl: "",
                              },
                            ];
                            handleChange("certifications", newCerts);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Certification
                        </button>
                      </div>
                      <div className="space-y-4">
                        {formData.certifications.map((cert, i) => (
                          <div
                            key={i}
                            className="p-4 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-2xl"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-slate-900">
                                Certification #{i + 1}
                              </h4>
                              <button
                                onClick={() => {
                                  const newCerts =
                                    formData.certifications.filter(
                                      (_, idx) => idx !== i
                                    );
                                  handleChange("certifications", newCerts);
                                }}
                                className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Certification Name
                                </label>
                                <input
                                  className="w-full px-4 py-3 font-medium transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900"
                                  value={cert.name}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "certifications",
                                      i,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="AWS Certified Solutions Architect"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Issuing Organization
                                </label>
                                <input
                                  className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900"
                                  value={cert.issuer}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "certifications",
                                      i,
                                      "issuer",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Amazon Web Services"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Year Obtained
                                </label>
                                <input
                                  className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900"
                                  value={cert.year}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "certifications",
                                      i,
                                      "year",
                                      e.target.value
                                    )
                                  }
                                  placeholder="2022"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Credential URL
                                </label>
                                <input
                                  className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-900"
                                  value={cert.credentialUrl}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "certifications",
                                      i,
                                      "credentialUrl",
                                      e.target.value
                                    )
                                  }
                                  placeholder="https://aws.amazon.com/certification/"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* EDUCATION TAB */}
                {activeTab === "education" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <GraduationCap className="w-5 h-5" />
                        Education Background
                      </h3>
                      <button
                        onClick={() => {
                          const newEdu = [
                            ...formData.education,
                            {
                              degree: "",
                              institution: "",
                              year: "",
                              description: "",
                            },
                          ];
                          handleChange("education", newEdu);
                        }}
                        className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-lg hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                        Add Education
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.education.map((edu, i) => (
                        <div
                          key={i}
                          className="p-6 border bg-linear-to-br from-emerald-50 to-white border-emerald-100 rounded-2xl"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-slate-900">
                              Education #{i + 1}
                            </h4>
                            <button
                              onClick={() => {
                                const newEdu = formData.education.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("education", newEdu);
                              }}
                              className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Degree
                              </label>
                              <input
                                className="w-full px-4 py-3 font-medium transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                                value={edu.degree}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "education",
                                    i,
                                    "degree",
                                    e.target.value
                                  )
                                }
                                placeholder="Bachelor of Science in Computer Science"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Institution
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                                value={edu.institution}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "education",
                                    i,
                                    "institution",
                                    e.target.value
                                  )
                                }
                                placeholder="Stanford University"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Years
                              </label>
                              <input
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                                value={edu.year}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "education",
                                    i,
                                    "year",
                                    e.target.value
                                  )
                                }
                                placeholder="2010 - 2014"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                Description
                              </label>
                              <textarea
                                rows={2}
                                className="w-full px-4 py-3 transition-all duration-300 bg-white border resize-none border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                                value={edu.description}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "education",
                                    i,
                                    "description",
                                    e.target.value
                                  )
                                }
                                placeholder="Specialized in Software Engineering and Human-Computer Interaction."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKILLS TAB */}
                {activeTab === "skills" && (
                  <div className="space-y-8">
                    {/* Technical Skills */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Cpu className="w-5 h-5" />
                          Technical Skills
                        </h3>
                        <button
                          onClick={() => {
                            const newSkills = [
                              ...formData.technicalSkills,
                              {
                                category: "",
                                skills: [],
                              },
                            ];
                            handleChange("technicalSkills", newSkills);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Category
                        </button>
                      </div>
                      <div className="space-y-4">
                        {formData.technicalSkills.map((category, i) => (
                          <div
                            key={i}
                            className="p-6 border bg-linear-to-br from-amber-50 to-white border-amber-100 rounded-2xl"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-bold text-slate-900">
                                Category #{i + 1}
                              </h4>
                              <button
                                onClick={() => {
                                  const newSkills =
                                    formData.technicalSkills.filter(
                                      (_, idx) => idx !== i
                                    );
                                  handleChange("technicalSkills", newSkills);
                                }}
                                className="p-2 transition-colors rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Category Name
                                </label>
                                <input
                                  className="w-full px-4 py-3 font-medium transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                  value={category.category}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "technicalSkills",
                                      i,
                                      "category",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Frontend Development"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Skills (comma separated)
                                </label>
                                <input
                                  className="w-full px-4 py-3 transition-all duration-300 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                  value={category.skills.join(", ")}
                                  onChange={(e) => {
                                    const skills = e.target.value
                                      .split(",")
                                      .map((skill) => skill.trim())
                                      .filter((skill) => skill);
                                    handleArrayChange(
                                      "technicalSkills",
                                      i,
                                      "skills",
                                      skills
                                    );
                                  }}
                                  placeholder="React, Next.js, TypeScript, Tailwind CSS"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Soft Skills */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Users className="w-5 h-5" />
                          Soft Skills
                        </h3>
                        <button
                          onClick={() => {
                            const newSkills = [...formData.softSkills, ""];
                            handleChange("softSkills", newSkills);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Skill
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {formData.softSkills.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              className="flex-1 px-4 py-3 transition-all duration-300 border bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                              value={skill}
                              onChange={(e) => {
                                const newSkills = [...formData.softSkills];
                                newSkills[i] = e.target.value;
                                handleChange("softSkills", newSkills);
                              }}
                              placeholder="Communication"
                            />
                            <button
                              onClick={() => {
                                const newSkills = formData.softSkills.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("softSkills", newSkills);
                              }}
                              className="p-3 text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Globe className="w-5 h-5" />
                          Languages
                        </h3>
                        <button
                          onClick={() => {
                            const newLangs = [
                              ...formData.languages,
                              {
                                language: "",
                                proficiency: "",
                              },
                            ];
                            handleChange("languages", newLangs);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-amber-500 to-orange-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Language
                        </button>
                      </div>
                      <div className="space-y-4">
                        {formData.languages.map((lang, i) => (
                          <div
                            key={i}
                            className="p-4 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-2xl"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-slate-700">
                                Language #{i + 1}
                              </span>
                              <button
                                onClick={() => {
                                  const newLangs = formData.languages.filter(
                                    (_, idx) => idx !== i
                                  );
                                  handleChange("languages", newLangs);
                                }}
                                className="p-1 text-slate-400 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Language
                                </label>
                                <input
                                  className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                  value={lang.language}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "languages",
                                      i,
                                      "language",
                                      e.target.value
                                    )
                                  }
                                  placeholder="English"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold tracking-wider uppercase text-slate-500">
                                  Proficiency
                                </label>
                                <select
                                  className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900"
                                  value={lang.proficiency}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "languages",
                                      i,
                                      "proficiency",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select proficiency</option>
                                  <option value="Native">Native</option>
                                  <option value="Fluent">Fluent</option>
                                  <option value="Advanced">Advanced</option>
                                  <option value="Intermediate">
                                    Intermediate
                                  </option>
                                  <option value="Basic">Basic</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PERSONAL TAB */}
                {activeTab === "personal" && (
                  <div className="space-y-8">
                    {/* Hobbies */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Heart className="w-5 h-5" />
                          Hobbies & Interests
                        </h3>
                        <button
                          onClick={() => {
                            const newHobbies = [...formData.hobbies, ""];
                            handleChange("hobbies", newHobbies);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-rose-500 to-red-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Hobby
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {formData.hobbies.map((hobby, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                              {hobby.toLowerCase().includes("photo") ? (
                                <Camera className="w-4 h-4" />
                              ) : hobby.toLowerCase().includes("music") ? (
                                <Music className="w-4 h-4" />
                              ) : hobby.toLowerCase().includes("hiking") ? (
                                <Mountain className="w-4 h-4" />
                              ) : hobby.toLowerCase().includes("read") ? (
                                <Book className="w-4 h-4" />
                              ) : (
                                <Heart className="w-4 h-4" />
                              )}
                            </div>
                            <input
                              className="flex-1 px-4 py-3 transition-all duration-300 border bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                              value={hobby}
                              onChange={(e) => {
                                const newHobbies = [...formData.hobbies];
                                newHobbies[i] = e.target.value;
                                handleChange("hobbies", newHobbies);
                              }}
                              placeholder="Photography"
                            />
                            <button
                              onClick={() => {
                                const newHobbies = formData.hobbies.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("hobbies", newHobbies);
                              }}
                              className="p-3 text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Sparkles className="w-5 h-5" />
                          Fun Facts
                        </h3>
                        <button
                          onClick={() => {
                            const newFacts = [...formData.funFacts, ""];
                            handleChange("funFacts", newFacts);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-rose-500 to-red-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Fun Fact
                        </button>
                      </div>
                      <div className="space-y-3">
                        {formData.funFacts.map((fact, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <input
                              className="flex-1 px-4 py-3 transition-all duration-300 border bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-900"
                              value={fact}
                              onChange={(e) => {
                                const newFacts = [...formData.funFacts];
                                newFacts[i] = e.target.value;
                                handleChange("funFacts", newFacts);
                              }}
                              placeholder="Visited 25+ countries"
                            />
                            <button
                              onClick={() => {
                                const newFacts = formData.funFacts.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("funFacts", newFacts);
                              }}
                              className="p-3 text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STATS & TOOLS TAB */}
                {activeTab === "stats" && (
                  <div className="space-y-8">
                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Trophy className="w-5 h-5" />
                          Statistics
                        </h3>
                        <button
                          onClick={() => {
                            const newStats = [
                              ...formData.stats,
                              {
                                label: "",
                                value: "",
                                prefix: "",
                                suffix: "",
                              },
                            ];
                            handleChange("stats", newStats);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-indigo-500 to-blue-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Stat
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {formData.stats.map((stat, i) => (
                          <div
                            key={i}
                            className="p-4 border bg-linear-to-br from-slate-50 to-white border-slate-200 rounded-2xl"
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
                                placeholder="Label"
                                className="w-full px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900"
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
                                placeholder="Value"
                                className="w-full px-3 py-2 font-bold transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900"
                                value={stat.value}
                                onChange={(e) =>
                                  handleArrayChange(
                                    "stats",
                                    i,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  placeholder="Prefix"
                                  className="px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900"
                                  value={stat.prefix}
                                  onChange={(e) =>
                                    handleArrayChange(
                                      "stats",
                                      i,
                                      "prefix",
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  placeholder="Suffix"
                                  className="px-3 py-2 transition-all duration-300 bg-white border rounded-lg border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900"
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
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tools */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                          <Terminal className="w-5 h-5" />
                          Tools & Technologies
                        </h3>
                        <button
                          onClick={() => {
                            const newTools = [...formData.tools, ""];
                            handleChange("tools", newTools);
                          }}
                          className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition-all duration-300 bg-linear-to-r from-indigo-500 to-blue-500 rounded-xl hover:shadow-lg hover:scale-105"
                        >
                          <Plus className="w-4 h-4" />
                          Add Tool
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {formData.tools.map((tool, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <input
                              className="flex-1 px-4 py-3 transition-all duration-300 border bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900"
                              value={tool}
                              onChange={(e) => {
                                const newTools = [...formData.tools];
                                newTools[i] = e.target.value;
                                handleChange("tools", newTools);
                              }}
                              placeholder="VS Code"
                            />
                            <button
                              onClick={() => {
                                const newTools = formData.tools.filter(
                                  (_, idx) => idx !== i
                                );
                                handleChange("tools", newTools);
                              }}
                              className="p-3 text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SOCIAL & QUOTE TAB */}
                {activeTab === "social" && (
                  <div className="space-y-8">
                    {/* Social Links */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-bold text-slate-900">
                        Social Media Links
                      </h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {Object.entries(formData.socialLinks).map(
                          ([platform, url]) => (
                            <div
                              key={platform}
                              className="p-4 transition-all duration-300 bg-white border border-slate-200 rounded-xl hover:border-sky-300"
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
                                      : platform === "facebook"
                                      ? "bg-blue-700"
                                      : platform === "youtube"
                                      ? "bg-red-600"
                                      : platform === "dribbble"
                                      ? "bg-pink-500"
                                      : "bg-blue-500"
                                  }`}
                                >
                                  {platform === "github" && (
                                    <Terminal className="w-5 h-5 text-white" />
                                  )}
                                  {platform === "linkedin" && (
                                    <Briefcase className="w-5 h-5 text-white" />
                                  )}
                                  {platform === "twitter" && (
                                    <MessageSquare className="w-5 h-5 text-white" />
                                  )}
                                  {platform === "instagram" && (
                                    <Camera className="w-5 h-5 text-white" />
                                  )}
                                  {platform === "facebook" && (
                                    <Users className="w-5 h-5 text-white" />
                                  )}
                                  {platform === "youtube" && (
                                    <Heart className="w-5 h-5 text-white" />
                                  )}
                                  {["dribbble", "behance"].includes(
                                    platform
                                  ) && (
                                    <Palette className="w-5 h-5 text-white" />
                                  )}
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
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Favorite Quote */}
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <Quote className="w-5 h-5" />
                        Favorite Quote
                      </h3>
                      <div className="p-6 bg-linear-to-br from-slate-900 to-blue-900 rounded-2xl">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90">
                              Quote Text
                            </label>
                            <textarea
                              rows={3}
                              className="w-full px-4 py-3 text-white transition-all duration-300 border resize-none bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/60"
                              value={formData.favoriteQuote.text}
                              onChange={(e) =>
                                handleChange(
                                  "favoriteQuote.text",
                                  e.target.value
                                )
                              }
                              placeholder="The only way to do great work is to love what you do."
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90">
                              Author
                            </label>
                            <input
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/60"
                              value={formData.favoriteQuote.author}
                              onChange={(e) =>
                                handleChange(
                                  "favoriteQuote.author",
                                  e.target.value
                                )
                              }
                              placeholder="Steve Jobs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="space-y-4">
                      <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                        <Target className="w-5 h-5" />
                        Call to Action
                      </h3>
                      <div className="p-6 bg-linear-to-br from-sky-500 to-blue-500 rounded-2xl">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-white/90">
                              CTA Text
                            </label>
                            <input
                              className="w-full px-4 py-3 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/60"
                              value={formData.cta.text}
                              onChange={(e) =>
                                handleChange("cta.text", e.target.value)
                              }
                              placeholder="Ready to bring your ideas to life?"
                            />
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white/90">
                                Button Text
                              </label>
                              <input
                                className="w-full px-4 py-3 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/60"
                                value={formData.cta.buttonText}
                                onChange={(e) =>
                                  handleChange("cta.buttonText", e.target.value)
                                }
                                placeholder="Get In Touch"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-white/90">
                                Button Link
                              </label>
                              <input
                                className="w-full px-4 py-3 text-white transition-all duration-300 border bg-white/10 border-white/20 rounded-xl focus:ring-2 focus:ring-white/30 focus:border-white/30 placeholder:text-white/60"
                                value={formData.cta.buttonLink}
                                onChange={(e) =>
                                  handleChange("cta.buttonLink", e.target.value)
                                }
                                placeholder="/contact"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SEO & META TAB */}
                {activeTab === "seo" && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">
                        SEO & Metadata
                      </h3>
                      <p className="text-sm text-slate-500">
                        Optimize your about page for search engines
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500">
                          <Search className="w-3.5 h-3.5" />
                          Meta Description
                        </label>
                        <textarea
                          rows={4}
                          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-300 text-slate-900 resize-none"
                          value={formData.metaDescription || ""}
                          onChange={(e) =>
                            handleChange("metaDescription", e.target.value)
                          }
                          placeholder="John Doe - Senior Full Stack Developer with 5+ years of experience..."
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
                          value={
                            formData.keywords
                              ? formData.keywords.join(", ")
                              : ""
                          }
                          onChange={(e) =>
                            handleChange(
                              "keywords",
                              e.target.value
                                .split(",")
                                .map((k) => k.trim())
                                .filter((k) => k !== "") // Remove empty strings
                            )
                          }
                          placeholder="full stack developer, react developer, node.js, software engineer"
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
                            {formData.name || "Your Name"} - About
                          </div>
                          <div className="text-sm text-green-400">
                            https://yourportfolio.com/about
                          </div>
                          <div className="text-sm text-slate-300">
                            {formData.metaDescription ||
                              "Your meta description will appear here in search results."}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {(formData.keywords || [])
                              .slice(0, 5)
                              .map((keyword, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs rounded bg-white/10 text-slate-300"
                                >
                                  #{keyword}
                                </span>
                              ))}
                            {formData.keywords &&
                              formData.keywords.length > 5 && (
                                <span className="px-2 py-1 text-xs rounded bg-white/10 text-slate-400">
                                  +{formData.keywords.length - 5} more
                                </span>
                              )}
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

export default AboutPageForm;
