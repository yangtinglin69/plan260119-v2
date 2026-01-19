// src/types/index.ts

// ============================================
// Site Configuration Types
// ============================================

export interface SiteConfig {
  name: string;
  tagline: string;
  logo: string;
  favicon: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  adsense: {
    enabled: boolean;
    publisherId: string;
    slots: {
      header: string;
      sidebar: string;
      inFeed: string;
      inArticle: string;
      footer: string;
    };
  };
  analytics: {
    gaId: string;
  };
  footer: {
    disclaimer: string;
    copyright: string;
  };
}

// ============================================
// Product Types
// ============================================

export interface ProductScore {
  label: string;
  score: number; // 1-5
  description?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  rank: number;
  slug: string;
  badge: string;
  name: string;
  tagline: string;
  price: {
    original: number;
    current: number;
    currency: string;
  };
  rating: number; // 1-10
  images: {
    main: string;
    gallery: string[];
  };
  specs: ProductSpec[];
  bestFor: string[];
  notBestFor: string[];
  briefReview: string;
  fullReview: string;
  materials: {
    layer: string;
    description: string;
  }[];
  scores: ProductScore[];
  pros: string[];
  cons: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  affiliateLink: string;
  ctaText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Module Types
// ============================================

export interface HeroModule {
  id: 'hero';
  enabled: boolean;
  order: number;
  content: {
    badge: string;
    headline: string;
    subheadline: string;
    highlight: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
  };
}

export interface PainPointsModule {
  id: 'painPoints';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    image: string;
    points: {
      icon: string;
      text: string;
    }[];
  };
}

export interface StoryModule {
  id: 'story';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    image: string;
    paragraphs: string[];
  };
}

export interface MethodModule {
  id: 'method';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    subtitle: string;
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

export interface ComparisonModule {
  id: 'comparison';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    subtitle: string;
    rows: {
      type: string;
      product: string;
      benefit: string;
    }[];
  };
}

export interface ProductsModule {
  id: 'products';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    subtitle: string;
    showCount: number; // How many products to show (default 10)
  };
}

export interface TestimonialsModule {
  id: 'testimonials';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      avatar: string;
      product: string;
      rating: number;
      text: string;
    }[];
  };
}

export interface FAQModule {
  id: 'faq';
  enabled: boolean;
  order: number;
  content: {
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
}

export type Module = 
  | HeroModule 
  | PainPointsModule 
  | StoryModule 
  | MethodModule 
  | ComparisonModule 
  | ProductsModule 
  | TestimonialsModule 
  | FAQModule;

export interface ModulesConfig {
  modules: Module[];
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// Admin Types
// ============================================

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

export interface EditHistory {
  id: string;
  userId: string;
  action: 'create' | 'update' | 'delete';
  target: 'product' | 'module' | 'site';
  targetId: string;
  changes: Record<string, unknown>;
  timestamp: string;
}
