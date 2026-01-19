// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface DbSiteConfig {
  id: string;
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
  created_at: string;
  updated_at: string;
}

export interface DbProduct {
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
  rating: number;
  images: {
    main: string;
    gallery: string[];
  };
  specs: { label: string; value: string }[];
  best_for: string[];
  not_best_for: string[];
  brief_review: string;
  full_review: string;
  materials: { layer: string; description: string }[];
  scores: { label: string; score: number; description?: string }[];
  pros: string[];
  cons: string[];
  faqs: { question: string; answer: string }[];
  affiliate_link: string;
  cta_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbModule {
  id: string;
  enabled: boolean;
  display_order: number;
  content: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Helper to transform DB product to frontend format
export function transformProduct(dbProduct: DbProduct) {
  return {
    id: dbProduct.id,
    rank: dbProduct.rank,
    slug: dbProduct.slug,
    badge: dbProduct.badge,
    name: dbProduct.name,
    tagline: dbProduct.tagline,
    price: dbProduct.price,
    rating: dbProduct.rating,
    images: dbProduct.images,
    specs: dbProduct.specs,
    bestFor: dbProduct.best_for,
    notBestFor: dbProduct.not_best_for,
    briefReview: dbProduct.brief_review,
    fullReview: dbProduct.full_review,
    materials: dbProduct.materials,
    scores: dbProduct.scores,
    pros: dbProduct.pros,
    cons: dbProduct.cons,
    faqs: dbProduct.faqs,
    affiliateLink: dbProduct.affiliate_link,
    ctaText: dbProduct.cta_text,
    isActive: dbProduct.is_active,
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}

// Helper to transform frontend product to DB format
export function transformProductToDb(product: any) {
  return {
    rank: product.rank,
    slug: product.slug,
    badge: product.badge,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    rating: product.rating,
    images: product.images,
    specs: product.specs,
    best_for: product.bestFor,
    not_best_for: product.notBestFor,
    brief_review: product.briefReview,
    full_review: product.fullReview,
    materials: product.materials,
    scores: product.scores,
    pros: product.pros,
    cons: product.cons,
    faqs: product.faqs,
    affiliate_link: product.affiliateLink,
    cta_text: product.ctaText,
    is_active: product.isActive,
  };
}

// Helper to transform DB module to frontend format  
export function transformModule(dbModule: DbModule) {
  return {
    id: dbModule.id,
    enabled: dbModule.enabled,
    order: dbModule.display_order,
    content: dbModule.content,
  };
}
