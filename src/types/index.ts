export type ContentStatus = 'DRAFT' | 'PUBLISHED';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR';
export const AdminRole = {
  SUPER_ADMIN: 'SUPER_ADMIN' as const,
  ADMIN: 'ADMIN' as const,
  EDITOR: 'EDITOR' as const,
};
export type AdminRole = UserRole;

export type UserStatus = 'ACTIVE' | 'INACTIVE';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed' | 'Archived';

export type ProjectType =
  | 'AI Agents'
  | 'AI Automation'
  | 'AI Solutions'
  | 'Software Development'
  | 'AI Integration'
  | 'Consulting'
  | 'Other';

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  categoryIds?: string[];
  categories?: ServiceCategory[];
  heroVisual?: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  process: { step: number; title: string; description: string }[];
  problemStatement?: string;
  ourApproach?: string;
  ctaText?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: ContentStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Solution {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug?: string;
  categoryId?: string;
  categoryIds?: string[];
  categories?: SolutionCategory[];
  shortDescription: string;
  description: string;
  fullDescription?: string;
  businessProblem: string;
  problemSolved?: string;
  solution: string;
  howItWorks?: string;
  features: string[];
  benefits: string[];
  workflow: { step: number; title: string; description: string }[];
  integrations: string[];
  technologies: string[];
  visual?: string;
  relatedProjectIds?: string[];
  ctaText?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: ContentStatus;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SolutionCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  solutions?: Solution[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  services?: Service[];
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder: number;
  projects?: Project[];
}

export type TeamMemberCategory = 'leadership' | 'talent';

export interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  avatarUrl?: string;
  category: TeamMemberCategory;
  featured: boolean;
  sortOrder: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  projectType: ProjectType;
  industry: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  categoryIds?: string[];
  categories?: ProjectCategory[];
  client?: string;
  clientName?: string;
  timeline?: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  servicesUsed: string[];
  features?: string[];
  projectUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  completionDate: string;
  featured: boolean;
  status: ContentStatus;
  sortOrder: number;
  overview: string;
  challenge: string;
  solution: string;
  implementation: string;
  results: string[];
  relatedServiceIds?: string[];
  relatedCaseStudyId?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  objectives: string[];
  solution: string;
  architectureDescription: string;
  architectureDetails?: string;
  implementation: string;
  workflowSteps: { title: string; description: string }[];
  technologies: string[];
  process: string[];
  measurableResults: { metric: string; label: string; context?: string }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
  };
  coverImage: string;
  gallery: string[];
  relatedProjectId?: string;
  relatedServices: string[];
  featured: boolean;
  status: ContentStatus;
  publishDate: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  status: ContentStatus;
  publishDate: string;
  publishedAt?: string;
  readTime: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryNote {
  id: string;
  author: string;
  note: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  projectType: ProjectType | string;
  budgetRange: string;
  message: string;
  status: InquiryStatus;
  notes?: string[];
  internalNotes: InquiryNote[];
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  alt: string;
  uploadedAt: string;
  width?: number;
  height?: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  lastLoginAt?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  description?: string;
  logoUrl: string;
  faviconUrl: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours?: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    youtube?: string;
  };
  footerText: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  googleAnalyticsId: string;
  seoDefaults?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
}

export interface AppDatabase {
  services: Service[];
  solutions: Solution[];
  projects: Project[];
  caseStudies: CaseStudy[];
  blogPosts: BlogPost[];
  inquiries: Inquiry[];
  media: MediaItem[];
  users: AdminUser[];
  settings: SiteSettings;
}
