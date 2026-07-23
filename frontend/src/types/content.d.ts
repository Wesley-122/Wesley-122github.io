// LKtechnology Website - Content Type Definitions
// All types match Strapi CMS data models

export interface SEOData {
  metaTitle: string;
  metaDescription: string;
  ogImage?: { url: string; alt: string };
  canonicalUrl?: string;
  noindex: boolean;
}

export interface LocalizedContent {
  zh: string;
  en: string;
}

export interface Product {
  id: number;
  slug: string;
  title: LocalizedContent;
  description: LocalizedContent;
  icon: { url: string; alt: string };
  coverImage: { url: string; alt: string };
  category: 'data_products' | 'enterprise_apps' | 'talent_services';
  features: LocalizedContent & { items: string[] };
  order: number;
  isFeatured: boolean;
  seo: SEOData;
}

export interface Solution {
  id: number;
  slug: string;
  title: LocalizedContent;
  industryIcon: { url: string; alt: string };
  description: LocalizedContent;
  coverImage: { url: string; alt: string };
  relatedProducts: Product[];
  benefits: { title: LocalizedContent; desc: LocalizedContent }[];
  caseStudies: Case[];
  order: number;
  seo: SEOData;
}

export interface Case {
  id: number;
  slug: string;
  title: LocalizedContent;
  clientName: LocalizedContent;
  industry: 'manufacturing' | 'metallurgy' | 'energy' | 'public_service' | 'logistics' | 'chemical' | 'automotive' | 'agriculture';
  thumbnail: { url: string; alt: string };
  gallery: { url: string; alt: string }[];
  summary: LocalizedContent;
  content: LocalizedContent;
  challenge: LocalizedContent;
  solution: LocalizedContent;
  results: LocalizedContent;
  technologies: string[];
  clientLogo: { url: string; alt: string };
  order: number;
  isFeatured: boolean;
  seo: SEOData;
}

export interface Article {
  id: number;
  slug: string;
  title: LocalizedContent;
  category: 'company_news' | 'tech_article' | 'industry_insight';
  coverImage: { url: string; alt: string };
  excerpt: LocalizedContent;
  content: LocalizedContent;
  author: string;
  publishDate: string;
  tags: string[];
  isFeatured: boolean;
  seo: SEOData;
}

export interface Job {
  id: number;
  slug: string;
  title: LocalizedContent;
  department: LocalizedContent;
  location: LocalizedContent;
  type: 'full_time' | 'part_time' | 'internship' | 'contract';
  description: LocalizedContent;
  requirements: LocalizedContent;
  salaryRange: LocalizedContent;
  isActive: boolean;
  postedDate: string;
  closingDate?: string;
  order: number;
  seo: SEOData;
}

export interface TeamMember {
  id: number;
  name: LocalizedContent;
  title: LocalizedContent;
  photo: { url: string; alt: string };
  bio: LocalizedContent;
  order: number;
  isLeadership: boolean;
}

export interface Certification {
  id: number;
  name: LocalizedContent;
  issuingBody: LocalizedContent;
  image: { url: string; alt: string };
  dateObtained: string;
  order: number;
  isFeatured: boolean;
}

export interface ClientLogo {
  id: number;
  name: LocalizedContent;
  logoImage: { url: string; alt: string };
  websiteUrl?: string;
  order: number;
  isFeatured: boolean;
}

export interface PdfDownload {
  id: number;
  title: LocalizedContent;
  fileUrl: string;
  coverImage: { url: string; alt: string };
  category: 'brochure' | 'whitepaper' | 'product_sheet' | 'annual_report';
  description: LocalizedContent;
  order: number;
}

export interface HomePageData {
  heroTitle: LocalizedContent;
  heroSubtitle: LocalizedContent;
  heroCtaPrimary: LocalizedContent;
  heroCtaSecondary: LocalizedContent;
  heroBgImage: { url: string; alt: string };
  stats: { number: number; suffix: string; label: LocalizedContent }[];
  featuredProducts: Product[];
  featuredCases: Case[];
  featuredArticles: Article[];
  seo: SEOData;
}

export interface AboutPageData {
  companyIntro: LocalizedContent;
  mission: LocalizedContent;
  vision: LocalizedContent;
  values: { icon: string; title: LocalizedContent; desc: LocalizedContent }[];
  milestones: { year: string; title: LocalizedContent; desc: LocalizedContent }[];
  seo: SEOData;
}

export interface GlobalSettings {
  siteName: string;
  siteDescription: LocalizedContent;
  logoBlack: { url: string; alt: string };
  logoWhite: { url: string; alt: string };
  favicon: { url: string };
  ogImage: { url: string };
  contactAddress: LocalizedContent;
  contactPhone: string;
  contactEmail: string;
  wechatQr: { url: string };
  icpNumber: string;
  copyrightText: LocalizedContent;
  socialLinks: { platform: string; url: string }[];
  footerCta: LocalizedContent;
}

export interface NavItem {
  key: string;
  label: LocalizedContent;
  href: LocalizedContent;
  children?: NavItem[];
}

export type Locale = 'zh-CN' | 'en';
