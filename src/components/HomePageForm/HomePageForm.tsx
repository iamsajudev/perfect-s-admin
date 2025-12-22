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
  Link,
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
  Hash
} from 'lucide-react';

// Mock initial data from your schema
const initialData = {
  // Hero Section
  heroTitle: "Welcome to My Portfolio",
  heroSubtitle: "I'm",
  heroName: "Your Name",
  heroRole: "Full Stack Developer",
  heroDescription: "I build amazing web experiences",

  // Hero Media
  heroImage: "",
  heroVideo: "",
  heroBackground: "",

  // Call to Action Buttons
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

  // Featured Stats/Counter
  stats: [
    { number: "50", label: "Projects", suffix: "+" },
    { number: "3", label: "Years", suffix: "+" },
    { number: "100", label: "Clients", suffix: "+" },
    { number: "95", label: "Satisfaction", suffix: "%" }
  ],

  // Featured Skills/Tech Stack
  featuredSkills: ["React", "Node.js", "MongoDB", "TypeScript"],
  techStack: [
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "MongoDB", icon: "🍃", color: "#47A248" }
  ],

  // Social Links
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

  // About Preview
  aboutPreview: {
    title: "About Me",
    content: "",
    image: ""
  },

  // Services/What I Do
  services: [
    { title: "Web Development", description: "Build modern web applications", icon: "💻", color: "#3B82F6" },
    { title: "UI/UX Design", description: "Design beautiful user interfaces", icon: "🎨", color: "#8B5CF6" },
    { title: "Mobile Apps", description: "Develop cross-platform apps", icon: "📱", color: "#10B981" }
  ],

  // Featured Projects
  featuredProjects: [
    { title: "E-commerce Platform", description: "Full-featured online store", image: "", link: "", tags: ["React", "Node.js", "MongoDB"] },
    { title: "Dashboard App", description: "Admin dashboard with analytics", image: "", link: "", tags: ["Next.js", "Tailwind", "Chart.js"] }
  ],

  // Testimonials
  testimonials: [
    { name: "John Doe", role: "CEO", company: "Tech Corp", content: "Great work!", image: "", rating: 5 },
    { name: "Jane Smith", role: "Product Manager", company: "Startup Inc", content: "Excellent developer", image: "", rating: 4 }
  ],

  // Clients/Companies Worked With
  clients: [
    { name: "Google", logo: "", link: "https://google.com" },
    { name: "Microsoft", logo: "", link: "https://microsoft.com" }
  ],

  // Contact Info
  contactInfo: {
    email: "hello@example.com",
    phone: "+1 234 567 890",
    location: "New York, NY",
    availability: "Available for work"
  },

  // Resume/CV
  resume: {
    url: "",
    downloadText: "Download CV"
  },

  // SEO/Meta
  metaTitle: "My Portfolio - Full Stack Developer",
  metaDescription: "Professional portfolio showcasing my work and skills",
  keywords: ["developer", "portfolio", "web", "react", "nodejs"],

  // Theme/Styling
  theme: {
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    fontFamily: "Inter"
  },

  // Animation/Effects
  animations: {
    enabled: true,
    type: "fade"
  }
};

const HomePageForm = () => {
  const [formData, setFormData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Handle nested object changes
  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  // Handle array item changes
  const handleArrayItemChange = (arrayName: string, index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName as keyof typeof prev] as any[]).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add new item to array
  const addArrayItem = (arrayName: string, template: any) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...(prev[arrayName as keyof typeof prev] as any[]), template]
    }));
  };

  // Remove item from array
  const removeArrayItem = (arrayName: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: (prev[arrayName as keyof typeof prev] as any[]).filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would typically make an API call to save the data
      console.log('Saving data:', formData);
      // await api.post('/api/home', formData);
      
      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving settings');
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Home Page Sections</h2>
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
          </div>
        </div>

        {/* Main Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-8">
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
                      value={formData.heroTitle}
                      onChange={(e) => handleChange('heroTitle', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Welcome to My Portfolio"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                    <input
                      type="text"
                      value={formData.heroSubtitle}
                      onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="I'm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.heroName}
                      onChange={(e) => handleChange('heroName', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Role</label>
                    <input
                      type="text"
                      value={formData.heroRole}
                      onChange={(e) => handleChange('heroRole', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Full Stack Developer"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                    <textarea
                      value={formData.heroDescription}
                      onChange={(e) => handleChange('heroDescription', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                          value={formData.heroImage}
                          onChange={(e) => handleChange('heroImage', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
                          value={formData.heroVideo}
                          onChange={(e) => handleChange('heroVideo', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
                          value={formData.heroBackground}
                          onChange={(e) => handleChange('heroBackground', e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
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
                          value={formData.primaryButton.text}
                          onChange={(e) => handleNestedChange('primaryButton', 'text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          placeholder="View My Work"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={formData.primaryButton.link}
                          onChange={(e) => handleNestedChange('primaryButton', 'link', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
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
                          value={formData.secondaryButton.text}
                          onChange={(e) => handleNestedChange('secondaryButton', 'text', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
                          placeholder="Contact Me"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Button Link</label>
                        <input
                          type="text"
                          value={formData.secondaryButton.link}
                          onChange={(e) => handleNestedChange('secondaryButton', 'link', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
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
                      onClick={() => addArrayItem('stats', { number: '0', label: 'New Stat', suffix: '' })}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <Plus size={16} /> Add Stat
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {formData.stats.map((stat, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Number</label>
                            <input
                              type="text"
                              value={stat.number}
                              onChange={(e) => handleArrayItemChange('stats', index, 'number', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded"
                              placeholder="50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => handleArrayItemChange('stats', index, 'label', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded"
                              placeholder="Projects"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Suffix</label>
                            <input
                              type="text"
                              value={stat.suffix}
                              onChange={(e) => handleArrayItemChange('stats', index, 'suffix', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded"
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
                    value={formData.aboutPreview.title}
                    onChange={(e) => handleNestedChange('aboutPreview', 'title', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="About Me"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Content</label>
                  <textarea
                    value={formData.aboutPreview.content}
                    onChange={(e) => handleNestedChange('aboutPreview', 'content', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={6}
                    placeholder="Write about yourself here..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.aboutPreview.image}
                      onChange={(e) => handleNestedChange('aboutPreview', 'image', e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
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
                    onClick={() => addArrayItem('services', { title: '', description: '', icon: '', color: '#3B82F6' })}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    <Plus size={16} /> Add Service
                  </button>
                </div>
                
                <div className="space-y-6">
                  {formData.services.map((service, index) => (
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
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="Web Development"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Icon (emoji or class)</label>
                          <input
                            type="text"
                            value={service.icon}
                            onChange={(e) => handleArrayItemChange('services', index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="💻"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm text-gray-700 mb-1">Description</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleArrayItemChange('services', index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded"
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
                            className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono"
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
                    onClick={() => addArrayItem('techStack', { name: '', icon: '', color: '#000000' })}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    <Plus size={16} /> Add Tech
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured Skills (comma separated)</label>
                  <input
                    type="text"
                    value={formData.featuredSkills.join(', ')}
                    onChange={(e) => handleChange('featuredSkills', e.target.value.split(', '))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    placeholder="React, Node.js, MongoDB, TypeScript"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Tech Stack Items</h4>
                  {formData.techStack.map((tech, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Technology Name</label>
                          <input
                            type="text"
                            value={tech.name}
                            onChange={(e) => handleArrayItemChange('techStack', index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            placeholder="React"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Icon (emoji or class)</label>
                          <input
                            type="text"
                            value={tech.icon}
                            onChange={(e) => handleArrayItemChange('techStack', index, 'icon', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
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
                  {Object.entries(formData.socialLinks).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {platform} URL
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleNestedChange('socialLinks', platform, e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                        value={formData.contactInfo.email}
                        onChange={(e) => handleNestedChange('contactInfo', 'email', e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
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
                        value={formData.contactInfo.phone}
                        onChange={(e) => handleNestedChange('contactInfo', 'phone', e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
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
                        value={formData.contactInfo.location}
                        onChange={(e) => handleNestedChange('contactInfo', 'location', e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
                    <input
                      type="text"
                      value={formData.contactInfo.availability}
                      onChange={(e) => handleNestedChange('contactInfo', 'availability', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                          value={formData.resume.url}
                          onChange={(e) => handleNestedChange('resume', 'url', e.target.value)}
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg"
                          placeholder="https://example.com/resume.pdf"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Download Button Text</label>
                      <input
                        type="text"
                        value={formData.resume.downloadText}
                        onChange={(e) => handleNestedChange('resume', 'downloadText', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                        value={formData.theme.primaryColor}
                        onChange={(e) => handleNestedChange('theme', 'primaryColor', e.target.value)}
                        className="w-16 h-16 cursor-pointer rounded-lg"
                      />
                      <input
                        type="text"
                        value={formData.theme.primaryColor}
                        onChange={(e) => handleNestedChange('theme', 'primaryColor', e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-mono"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={formData.theme.secondaryColor}
                        onChange={(e) => handleNestedChange('theme', 'secondaryColor', e.target.value)}
                        className="w-16 h-16 cursor-pointer rounded-lg"
                      />
                      <input
                        type="text"
                        value={formData.theme.secondaryColor}
                        onChange={(e) => handleNestedChange('theme', 'secondaryColor', e.target.value)}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-mono"
                        placeholder="#10B981"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                    <select
                      value={formData.theme.fontFamily}
                      onChange={(e) => handleNestedChange('theme', 'fontFamily', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
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
                        checked={formData.animations.enabled}
                        onChange={(e) => handleNestedChange('animations', 'enabled', e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">Enable Animations</span>
                    </label>
                    
                    <div className="flex-1">
                      <label className="block text-sm text-gray-700 mb-1">Animation Type</label>
                      <select
                        value={formData.animations.type}
                        onChange={(e) => handleNestedChange('animations', 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        disabled={!formData.animations.enabled}
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
                    value={formData.metaTitle}
                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    placeholder="My Portfolio - Full Stack Developer"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60 characters</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Professional portfolio showcasing my work and skills"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma separated)</label>
                  <input
                    type="text"
                    value={formData.keywords.join(', ')}
                    onChange={(e) => handleChange('keywords', e.target.value.split(', '))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    placeholder="developer, portfolio, web, react, nodejs"
                  />
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye size={18} />
                  <span className="text-sm">Changes are saved automatically</span>
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(initialData)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Reset to Default
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save size={18} />
                    {loading ? 'Saving...' : 'Save All Changes'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePageForm;