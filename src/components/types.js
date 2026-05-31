export interface HomeData {
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
    _id?: string;
    updatedAt?: string;
}

export interface TabProps {
    formData: HomeData;
    handleChange: (path: string, value: any) => void;
    handleArrayChange: (arrayPath: string, index: number, field: string, value: any) => void;
    handleImageUpload?: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
    previewImage?: string;
    setPreviewImage?: (url: string) => void;
    setSelectedImageFile?: (file: File | null) => void;
}