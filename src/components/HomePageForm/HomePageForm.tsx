"use client";

import React, { useState, useEffect } from 'react';
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
  Hash,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';

// Define types based on your Mongoose schema
interface StatItem {
  number: string;
  label: string;
  suffix: string;
}

interface TechStackItem {
  name: string;
  icon: string;
  color: string;
}

interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

interface ClientItem {
  name: string;
  logo: string;
  link: string;
}

interface HomeData {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroName: string;
  heroRole: string;
  heroDescription: string;
  
  // Hero Media
  heroImage: string;
  heroVideo: string;
  heroBackground: string;
  
  // Call to Action Buttons
  primaryButton: {
    text: string;
    link: string;
    icon: string;
  };
  secondaryButton: {
    text: string;
    link: string;
    icon: string;
  };
  
  // Featured Stats/Counter
  stats: StatItem[];
  
  // Featured Skills/Tech Stack
  featuredSkills: string[];
  techStack: TechStackItem[];
  
  // Social Links
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
  
  // About Preview
  aboutPreview: {
    title: string;
    content: string;
    image: string;
  };
  
  // Services/What I Do
  services: ServiceItem[];
  
  // Featured Projects
  featuredProjects: ProjectItem[];
  
  // Testimonials
  testimonials: TestimonialItem[];
  
  // Clients/Companies Worked With
  clients: ClientItem[];
  
  // Contact Info
  contactInfo: {
    email: string;
    phone: string;
    location: string;
    availability: string;
  };
  
  // Resume/CV
  resume: {
    url: string;
    downloadText: string;
  };
  
  // SEO/Meta
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  
  // Theme/Styling
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  
  // Animation/Effects
  animations: {
    enabled: boolean;
    type: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
console.log(API_URL, "API_URL   ")
const HomePageForm = () => {
  const [formData, setFormData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch home data from your backend API
  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/home`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch home data: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(data, "data")
      setFormData(data);
    } catch (error) {
      console.error('Error fetching home data:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to load home data: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  // Save home data to your backend API
  const saveHomeData = async () => {
    if (!formData) return;

    try {
      setSaving(true);
      const response = await fetch(`${API_URL}/home`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save home data: ${response.status}`);
      }

      const result = await response.json();
      setMessage({ 
        type: 'success', 
        text: result.message || 'Home data saved successfully!' 
      });
      setHasChanges(false);
      
      // Refresh data from server to get any server-side modifications
      await fetchHomeData();
      
      return result;
    } catch (error) {
      console.error('Error saving home data:', error);
      setMessage({ 
        type: 'error', 
        text: `Failed to save home data: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
      throw error;
    } finally {
      setSaving(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchHomeData();
  }, []);

  // Reset form to original data from server
  const resetForm = async () => {
    await fetchHomeData();
    setHasChanges(false);
    setMessage({ type: 'success', text: 'Form reset to original data' });
  };

  // Handle text input changes
  const handleChange = (path: string, value: any) => {
    if (!formData) return;

    setFormData(prev => {
      if (!prev) return prev;
      
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      const lastKey = keys[keys.length - 1];
      if (Array.isArray(current[lastKey]) && !Array.isArray(value)) {
        // Handle comma-separated string to array conversion
        current[lastKey] = value.split(',').map((item: string) => item.trim()).filter(Boolean);
      } else {
        current[lastKey] = value;
      }
      
      return newData;
    });
    
    setHasChanges(true);
  };

  // Handle nested object changes
  const handleNestedChange = (parent: keyof HomeData, field: string, value: any) => {
    if (!formData) return;

    setFormData(prev => ({
      ...prev!,
      [parent]: {
        ...(prev![parent] as any),
        [field]: value
      }
    }));
    
    setHasChanges(true);
  };

  // Handle array item changes
  const handleArrayItemChange = (arrayName: keyof HomeData, index: number, field: string, value: any) => {
    if (!formData) return;

    setFormData(prev => ({
      ...prev!,
      [arrayName]: (prev![arrayName] as any[]).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
    
    setHasChanges(true);
  };

  // Add new item to array
  const addArrayItem = (arrayName: keyof HomeData, template: any) => {
    if (!formData) return;

    setFormData(prev => ({
      ...prev!,
      [arrayName]: [...(prev![arrayName] as any[]), { ...template }]
    }));
    
    setHasChanges(true);
  };

  // Remove item from array
  const removeArrayItem = (arrayName: keyof HomeData, index: number) => {
    if (!formData) return;

    setFormData(prev => ({
      ...prev!,
      [arrayName]: (prev![arrayName] as any[]).filter((_, i) => i !== index)
    }));
    
    setHasChanges(true);
  };

  // Handle save button click
  const handleSave = async () => {
    await saveHomeData();
  };

  // Tab navigation
  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: <Star size={18} /> },
    { id: 'about', label: 'About', icon: <User size={18} /> },
    { id: 'services', label: 'Services', icon: <Briefcase size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'skills', label: 'Skills & Tech', icon: <TrendingUp size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
    { id: 'clients', label: 'Clients', icon: <Building size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
    { id: 'social', label: 'Social Links', icon: <Globe size={18} /> },
    { id: 'theme', label: 'Theme', icon: <Palette size={18} /> },
    { id: 'seo', label: 'SEO', icon: <Eye size={18} /> }
  ];

  // Default templates for array items
  const arrayTemplates = {
    stats: { number: '0', label: 'New Stat', suffix: '' },
    techStack: { name: '', icon: '', color: '#000000' },
    services: { title: '', description: '', icon: '', color: '#3B82F6' },
    featuredProjects: { title: '', description: '', image: '', link: '', tags: [] },
    testimonials: { name: '', role: '', company: '', content: '', image: '', rating: 5 },
    clients: { name: '', logo: '', link: '' }
  };

  // Default empty form data (if API returns null)
  const defaultFormData: HomeData = {
    heroTitle: "Welcome to My Portfolio",
    heroSubtitle: "I'm",
    heroName: "Your Name",
    heroRole: "Full Stack Developer",
    heroDescription: "I build amazing web experiences",
    heroImage: "",
    heroVideo: "",
    heroBackground: "",
    primaryButton: {
      text: "View My Work",
      link: "/projects",
      icon: ""
    },
    secondaryButton: {
      text: "Contact Me",
      link: "/contact",
      icon: ""
    },
    stats: [
      { number: "50", label: "Projects", suffix: "+" },
      { number: "3", label: "Years", suffix: "+" },
      { number: "100", label: "Clients", suffix: "+" }
    ],
    featuredSkills: ["React", "Node.js", "MongoDB", "TypeScript"],
    techStack: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "Node.js", icon: "🟢", color: "#339933" }
    ],
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      youtube: "",
      codepen: "",
      dribbble: "",
      behance: ""
    },
    aboutPreview: {
      title: "About Me",
      content: "",
      image: ""
    },
    services: [
      { title: "Web Development", description: "Build modern web applications", icon: "💻", color: "#3B82F6" },
      { title: "UI/UX Design", description: "Design beautiful user interfaces", icon: "🎨", color: "#8B5CF6" }
    ],
    featuredProjects: [],
    testimonials: [],
    clients: [],
    contactInfo: {
      email: "hello@example.com",
      phone: "+1 234 567 890",
      location: "New York, NY",
      availability: "Available for work"
    },
    resume: {
      url: "",
      downloadText: "Download CV"
    },
    metaTitle: "My Portfolio - Full Stack Developer",
    metaDescription: "Professional portfolio showcasing my work and skills",
    keywords: ["developer", "portfolio", "web", "react", "nodejs"],
    theme: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      fontFamily: "Inter"
    },
    animations: {
      enabled: true,
      type: "fade"
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading home data from API...</p>
        </div>
      </div>
    );
  }

  // Use form data or default if API returns null
  const data = formData || defaultFormData;

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Home Page Settings</h1>
            <p className="text-gray-600 mt-2">Manage your portfolio homepage content and appearance</p>
          </div>
          <div className="text-sm text-gray-500">
            API: {API_URL}/home
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span>{message.text}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
            
            {/* Save Status */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Unsaved changes</span>
                <div className={`w-3 h-3 rounded-full ${hasChanges ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
              </div>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className={`w-full mt-4 px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${
                  hasChanges
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                } ${saving ? 'opacity-50' : ''}`}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="flex-1">
          <div className="space-y-8">
            {/* Hero Section */}
            {activeTab === 'hero' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Hero Section</h3>
                  <span className="text-sm text-gray-500">First impression area</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                    <input
                      type="text"
                      value={data.heroTitle}
                      onChange={(e) => handleChange('heroTitle', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Welcome to My Portfolio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                    <input
                      type="text"
                      value={data.heroSubtitle}
                      onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={data.heroName}
                      onChange={(e) => handleChange('heroName', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                    <input
                      type="text"
                      value={data.heroRole}
                      onChange={(e) => handleChange('heroRole', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full Stack Developer"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                    <textarea
                      value={data.heroDescription}
                      onChange={(e) => handleChange('heroDescription', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="I build amazing web experiences"
                    />
                  </div>
                </div>

                {/* Media Uploads */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Hero Media</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={data.heroImage}
                          onChange={(e) => handleChange('heroImage', e.target.value)}
                          className="flex-1 px-4 text-black py-2 border border-gray-300 rounded-lg"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button type="button" className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                          <Upload size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hero Video URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={data.heroVideo}
                          onChange={(e) => handleChange('heroVideo', e.target.value)}
                          className="flex-1 px-4 text-black py-2 border border-gray-300 rounded-lg"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                        <button type="button" className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                          <Film size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={data.heroBackground}
                          onChange={(e) => handleChange('heroBackground', e.target.value)}
                          className="flex-1 px-4 text-black py-2 border border-gray-300 rounded-lg"
                          placeholder="Background image URL"
                        />
                        <button type="button" className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                          <ImageIcon size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Call to Action Buttons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900">Primary Button</h5>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={data.primaryButton.text}
                          onChange={(e) => handleNestedChange('primaryButton', 'text', e.target.value)}
                          className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                          placeholder="View My Work"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={data.primaryButton.link}
                          onChange={(e) => handleNestedChange('primaryButton', 'link', e.target.value)}
                          className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                          placeholder="/projects"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                      <h5 className="font-medium text-gray-900">Secondary Button</h5>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Button Text</label>
                        <input
                          type="text"
                          value={data.secondaryButton.text}
                          onChange={(e) => handleNestedChange('secondaryButton', 'text', e.target.value)}
                          className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                          placeholder="Contact Me"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={data.secondaryButton.link}
                          onChange={(e) => handleNestedChange('secondaryButton', 'link', e.target.value)}
                          className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">Featured Stats</h4>
                    <button
                      type="button"
                      onClick={() => addArrayItem('stats', arrayTemplates.stats)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <Plus size={16} /> Add Stat
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {data.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Number</label>
                            <input
                              type="text"
                              value={stat.number}
                              onChange={(e) => handleArrayItemChange('stats', index, 'number', e.target.value)}
                              className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                              placeholder="50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => handleArrayItemChange('stats', index, 'label', e.target.value)}
                              className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                              placeholder="Projects"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Suffix</label>
                            <input
                              type="text"
                              value={stat.suffix}
                              onChange={(e) => handleArrayItemChange('stats', index, 'suffix', e.target.value)}
                              className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                              placeholder="+"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('stats', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* About Section */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">About Section</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Title</label>
                  <input
                    type="text"
                    value={data.aboutPreview.title}
                    onChange={(e) => handleNestedChange('aboutPreview', 'title', e.target.value)}
                    className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="About Me"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Content</label>
                  <textarea
                    value={data.aboutPreview.content}
                    onChange={(e) => handleNestedChange('aboutPreview', 'content', e.target.value)}
                    className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={6}
                    placeholder="Write about yourself here..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={data.aboutPreview.image}
                      onChange={(e) => handleNestedChange('aboutPreview', 'image', e.target.value)}
                      className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                      placeholder="https://example.com/about-image.jpg"
                    />
                    <button type="button" className="px-4 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200">
                      <Upload size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Services Section */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Services Section</h3>
                  <button
                    type="button"
                    onClick={() => addArrayItem('services', arrayTemplates.services)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    <Plus size={16} /> Add Service
                  </button>
                </div>
                
                <div className="space-y-6">
                  {data.services.map((service, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Service #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeArrayItem('services', index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Service Title</label>
                          <input
                            type="text"
                            value={service.title}
                            onChange={(e) => handleArrayItemChange('services', index, 'title', e.target.value)}
                            className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                            placeholder="Web Development"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Icon (emoji or class)</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => handleArrayItemChange('services', index, 'icon', e.target.value)}
                            className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                            placeholder="💻"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Description</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleArrayItemChange('services', index, 'description', e.target.value)}
                          className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                          rows={2}
                          placeholder="Describe your service..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Color</label>
                        <div className="flex items-center gap-4">
                          <input
                            type="color"
                            value={service.color}
                            onChange={(e) => handleArrayItemChange('services', index, 'color', e.target.value)}
                            className="w-12 h-12 cursor-pointer"
                          />
                          <input
                            type="text"
                            value={service.color}
                            onChange={(e) => handleArrayItemChange('services', index, 'color', e.target.value)}
                            className="flex-1 text-black px-3 py-2 border border-gray-300 rounded font-mono"
                            placeholder="#3B82F6"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills & Tech Section */}
            {activeTab === 'skills' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Skills & Tech Stack</h3>
                  <button
                    type="button"
                    onClick={() => addArrayItem('techStack', arrayTemplates.techStack)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    <Plus size={16} /> Add Tech
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Skills (comma separated)</label>
                  <input
                    type="text"
                    value={data.featuredSkills.join(', ')}
                    onChange={(e) => handleChange('featuredSkills', e.target.value)}
                    className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                    placeholder="React, Node.js, MongoDB, TypeScript"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Tech Stack Items</h4>
                  {data.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Technology Name</label>
                          <input
                            type="text"
                            value={tech.name}
                            onChange={(e) => handleArrayItemChange('techStack', index, 'name', e.target.value)}
                            className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                            placeholder="React"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Icon (emoji or class)</label>
                          <input
                            type="text"
                            value={tech.icon}
                            onChange={(e) => handleArrayItemChange('techStack', index, 'icon', e.target.value)}
                            className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                            placeholder="⚛️"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Color</label>
                          <input
                            type="color"
                            value={tech.color}
                            onChange={(e) => handleArrayItemChange('techStack', index, 'color', e.target.value)}
                            className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('techStack', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {activeTab === 'social' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Social Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(data.socialLinks).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {platform} URL
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleNestedChange('socialLinks', platform, e.target.value)}
                        className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                        placeholder={`https://${platform}.com/yourusername`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeTab === 'contact' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-400" size={20} />
                      <input
                        type="email"
                        value={data.contactInfo.email}
                        onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                        className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="text-gray-400" size={20} />
                      <input
                        type="tel"
                        value={data.contactInfo.phone}
                        onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                        className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-400" size={20} />
                      <input
                        type="text"
                        value={data.contactInfo.location}
                        onChange={(e) => handleNestedChange('contactInfo', 'location', e.target.value)}
                        className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
                    <input
                      type="text"
                      value={data.contactInfo.availability}
                      onChange={(e) => handleNestedChange('contactInfo', 'availability', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                      placeholder="Available for work"
                    />
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Resume/CV</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL</label>
                      <div className="flex items-center gap-2">
                        <Download className="text-gray-400" size={20} />
                        <input
                          type="url"
                          value={data.resume.url}
                          onChange={(e) => handleNestedChange('resume', 'url', e.target.value)}
                          className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                          placeholder="https://example.com/resume.pdf"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Download Button Text</label>
                      <input
                        type="text"
                        value={data.resume.downloadText}
                        onChange={(e) => handleNestedChange('resume', 'downloadText', e.target.value)}
                        className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                        placeholder="Download CV"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Theme Section */}
            {activeTab === 'theme' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">Theme & Styling</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={data.theme.primaryColor}
                        onChange={(e) => handleNestedChange('theme', 'primaryColor', e.target.value)}
                        className="w-16 h-16 cursor-pointer rounded-lg"
                      />
                      <input
                        type="text"
                        value={data.theme.primaryColor}
                        onChange={(e) => handleNestedChange('theme', 'primaryColor', e.target.value)}
                        className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg font-mono"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={data.theme.secondaryColor}
                        onChange={(e) => handleNestedChange('theme', 'secondaryColor', e.target.value)}
                        className="w-16 h-16 cursor-pointer rounded-lg"
                      />
                      <input
                        type="text"
                        value={data.theme.secondaryColor}
                        onChange={(e) => handleNestedChange('theme', 'secondaryColor', e.target.value)}
                        className="flex-1 px-4 text-black py-2.5 border border-gray-300 rounded-lg font-mono"
                        placeholder="#10B981"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                    <select
                      value={data.theme.fontFamily}
                      onChange={(e) => handleNestedChange('theme', 'fontFamily', e.target.value)}
                      className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                    >
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Open Sans">Open Sans</option>
                    </select>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Animations</h4>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={data.animations.enabled}
                        onChange={(e) => handleNestedChange('animations', 'enabled', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">Enable Animations</span>
                    </label>
                    
                    <div className="flex-1">
                      <label className="block text-sm text-gray-700 mb-1">Animation Type</label>
                      <select
                        value={data.animations.type}
                        onChange={(e) => handleNestedChange('animations', 'type', e.target.value)}
                        className="w-full px-3 text-black py-2 border border-gray-300 rounded"
                        disabled={!data.animations.enabled}
                      >
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                        <option value="bounce">Bounce</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Section */}
            {activeTab === 'seo' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <h3 className="text-xl font-semibold text-gray-900">SEO & Meta Tags</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={data.metaTitle}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                    placeholder="My Portfolio - Full Stack Developer"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">{data.metaTitle.length}/60 characters</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={data.metaDescription}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Professional portfolio showcasing my work and skills"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">{data.metaDescription.length}/160 characters</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={data.keywords.join(', ')}
                    onChange={(e) => handleChange('keywords', e.target.value)}
                    className="w-full px-4 text-black py-2.5 border border-gray-300 rounded-lg"
                    placeholder="developer, portfolio, web, react, nodejs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form Actions Footer */}
          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  disabled={saving}
                >
                  Reset to Original
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || saving}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                    hasChanges
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  } ${saving ? 'opacity-50' : ''}`}
                >
                  {saving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save All Changes
                    </>
                  )}
                </button>
              </div>
              
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${hasChanges ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`} />
                {hasChanges ? 'Unsaved changes' : 'All changes saved'}
                <span className="text-xs text-gray-400 ml-2">
                  {formData ? 'Connected to API' : 'Using default data'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageForm;