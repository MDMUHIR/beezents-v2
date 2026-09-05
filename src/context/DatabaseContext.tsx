import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppDatabase,
  Service,
  Solution,
  Project,
  CaseStudy,
  BlogPost,
  Inquiry,
  MediaItem,
  AdminUser,
  SiteSettings,
  InquiryStatus,
  UserRole,
  ProjectType,
  SolutionCategory,
  ServiceCategory,
  ProjectCategory,
  TeamMember,
  TeamMemberCategory
} from '../types';
import { initialDatabase } from '../data/seedData';
import { api } from '../api';

interface AuthSession {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ApiHealthState {
  status: 'checking' | 'online' | 'offline';
  rootHealth?: any;
  apiHealth?: any;
  dbHealth?: any;
  error?: string;
  lastChecked?: string;
}

interface DatabaseContextType {
  db: AppDatabase;
  auth: AuthSession;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string; source?: 'api' | 'local' }>;
  logout: () => void;
  hasRole: (requiredRole: UserRole) => boolean;

  // Remote Backend API (configured with VITE_API_BASE_URL)
  api: typeof api;
  apiBaseUrl: string;
  setApiBaseUrl: (url: string) => void;
  resetApiBaseUrl: () => void;
  apiHealth: ApiHealthState;
  checkApiHealth: () => Promise<void>;
  isSyncing: boolean;
  syncWithApi: () => Promise<{ success: boolean; message?: string }>;
  mutationError: string | null;
  clearMutationError: () => void;
  getSolutionCategories: () => SolutionCategory[];
  loadSolutionCategoryBySlug: (slug: string) => Promise<SolutionCategory | undefined>;
  createSolutionCategory: (data: Omit<SolutionCategory, 'id' | 'solutions'>) => Promise<SolutionCategory | undefined>;
  updateSolutionCategory: (id: string, data: Partial<Omit<SolutionCategory, 'id' | 'solutions'>>) => Promise<SolutionCategory | undefined>;
  deleteSolutionCategory: (id: string) => Promise<boolean>;
  getServiceCategories: () => ServiceCategory[];
  loadServiceCategoryBySlug: (slug: string) => Promise<ServiceCategory | undefined>;
  createServiceCategory: (data: Omit<ServiceCategory, 'id' | 'services'>) => Promise<ServiceCategory | undefined>;
  updateServiceCategory: (id: string, data: Partial<Omit<ServiceCategory, 'id' | 'services'>>) => Promise<ServiceCategory | undefined>;
  deleteServiceCategory: (id: string) => Promise<boolean>;
  getProjectCategories: () => ProjectCategory[];
  loadProjectCategoryBySlug: (slug: string) => Promise<ProjectCategory | undefined>;
  createProjectCategory: (data: Omit<ProjectCategory, 'id' | 'projects'>) => Promise<ProjectCategory | undefined>;
  updateProjectCategory: (id: string, data: Partial<Omit<ProjectCategory, 'id' | 'projects'>>) => Promise<ProjectCategory | undefined>;
  deleteProjectCategory: (id: string) => Promise<boolean>;
  getTeamMembers: (includeDrafts?: boolean) => TeamMember[];
  getTeamMemberBySlug: (slug: string) => TeamMember | undefined;
  loadTeamMemberBySlug: (slug: string) => Promise<TeamMember | undefined>;
  createTeamMember: (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>) => TeamMember;
  updateTeamMember: (id: string, data: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Services
  getServices: (includeDrafts?: boolean) => Service[];
  getServiceBySlug: (slug: string) => Service | undefined;
  loadServiceBySlug: (slug: string) => Promise<Service | undefined>;
  createService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Service;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  reorderServices: (orderedIds: string[]) => void;

  // Solutions
  getSolutions: (includeDrafts?: boolean) => Solution[];
  getSolutionBySlug: (slug: string) => Solution | undefined;
  loadSolutionBySlug: (slug: string) => Promise<Solution | undefined>;
  createSolution: (data: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>) => Solution;
  updateSolution: (id: string, data: Partial<Solution>) => void;
  deleteSolution: (id: string) => void;

  // Projects
  getProjects: (includeDrafts?: boolean) => Project[];
  getProjectBySlug: (slug: string) => Project | undefined;
  loadProjectBySlug: (slug: string) => Promise<Project | undefined>;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Case Studies
  getCaseStudies: (includeDrafts?: boolean) => CaseStudy[];
  getCaseStudyBySlug: (slug: string) => CaseStudy | undefined;
  loadCaseStudyBySlug: (slug: string) => Promise<CaseStudy | undefined>;
  createCaseStudy: (data: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>) => CaseStudy;
  updateCaseStudy: (id: string, data: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;

  // Blog
  getBlogPosts: (includeDrafts?: boolean) => BlogPost[];
  getBlogPostBySlug: (slug: string) => BlogPost | undefined;
  createBlogPost: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => BlogPost;
  updateBlogPost: (id: string, data: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Inquiries
  getInquiries: () => Inquiry[];
  getInquiryById: (id: string) => Inquiry | undefined;
  submitInquiry: (data: Omit<Inquiry, 'id' | 'status' | 'internalNotes' | 'createdAt' | 'updatedAt'>) => Promise<Inquiry>;
  updateInquiryStatus: (id: string, status: InquiryStatus) => void;
  addInquiryNote: (id: string, note: string) => void;
  deleteInquiry: (id: string) => void;

  // Media
  getMedia: () => MediaItem[];
  getMediaItems: () => MediaItem[];
  uploadMedia: (media: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  uploadMediaFile: (file: File, folder?: string, altText?: string) => Promise<MediaItem>;
  addMediaItem: (media: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  deleteMedia: (id: string) => void;
  deleteMediaItem: (id: string) => void;

  // Admin Users
  getUsers: () => AdminUser[];
  createUser: (data: Omit<AdminUser, 'id' | 'createdAt'>) => AdminUser;
  updateUser: (id: string, data: Partial<AdminUser>) => void;
  deactivateUser: (id: string) => void;
  deleteUser: (id: string) => void;

  // Settings
  getSettings: () => SiteSettings;
  updateSettings: (data: Partial<SiteSettings>) => void;

  // System
  resetDatabaseToSeed: () => void;
  resetToSeedData: () => void;
}

const STORAGE_KEY = 'beezent_db_v2';
const AUTH_KEY = 'beezent_auth_v2';

const DatabaseContext = createContext<DatabaseContextType | null>(null);

type ApiRecord = Record<string, any>;

const record = (value: unknown): ApiRecord => (value && typeof value === 'object' ? value as ApiRecord : {});
const value = (item: ApiRecord, ...keys: string[]) => keys.map(key => item[key]).find(itemValue => itemValue !== undefined);
const list = (item: ApiRecord, ...keys: string[]): any[] => {
  const result = value(item, ...keys);
  return Array.isArray(result) ? result : [];
};
const iso = (item: ApiRecord, ...keys: string[]) => String(value(item, ...keys) || new Date().toISOString());
const slugify = (raw: string) => raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const normalizeSolutionCategory = (raw: unknown): SolutionCategory => {
  const item = record(raw);
  return {
    id: String(value(item, 'id') || ''),
    name: String(value(item, 'name') || ''),
    slug: String(value(item, 'slug') || ''),
    description: value(item, 'description') || '',
    sortOrder: Number(value(item, 'sort_order', 'sortOrder') || 0),
    solutions: Array.isArray(value(item, 'solutions')) ? list(item, 'solutions').map(normalizeSolution) : undefined,
  };
};
const normalizeServiceCategory = (raw: unknown): ServiceCategory => {
  const item = record(raw);
  return {
    id: String(value(item, 'id') || ''),
    name: String(value(item, 'name') || ''),
    slug: String(value(item, 'slug') || ''),
    description: value(item, 'description') || '',
    sortOrder: Number(value(item, 'sort_order', 'sortOrder') || 0),
    services: Array.isArray(value(item, 'services')) ? list(item, 'services').map(normalizeService) : undefined,
  };
};
const normalizeProjectCategory = (raw: unknown): ProjectCategory => {
  const item = record(raw);
  return {
    id: String(value(item, 'id') || ''),
    name: String(value(item, 'name') || ''),
    slug: String(value(item, 'slug') || ''),
    description: value(item, 'description') || '',
    sortOrder: Number(value(item, 'sort_order', 'sortOrder') || 0),
    projects: Array.isArray(value(item, 'projects')) ? list(item, 'projects').map(normalizeProject) : undefined,
  };
};
const normalizeTeamMember = (raw: unknown): TeamMember => {
  const item = record(raw);
  return {
    id: String(value(item, 'id') || ''),
    name: String(value(item, 'name') || ''),
    slug: String(value(item, 'slug') || ''),
    role: String(value(item, 'role') || ''),
    bio: value(item, 'bio') || undefined,
    avatarUrl: assetUrl(value(item, 'avatar_url', 'avatarUrl')) || undefined,
    category: String(value(item, 'category') || 'talent') as TeamMemberCategory,
    featured: Boolean(value(item, 'featured') || false),
    sortOrder: Number(value(item, 'sort_order', 'sortOrder') || 0),
    status: contentStatus(item),
    createdAt: iso(item, 'created_at', 'createdAt'),
    updatedAt: iso(item, 'updated_at', 'updatedAt'),
  };
};
const assetUrl = (raw: unknown) => {
  const url = String(raw || '');
  return url.startsWith('/') ? `${api.getBaseUrl()}${url}` : url;
};
const itemsFrom = (response: any): any[] => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};
const contentStatus = (item: ApiRecord) => {
  const published = value(item, 'published', 'is_published');
  if (published !== undefined) return published ? 'PUBLISHED' : 'DRAFT';
  const status = String(value(item, 'status') || '').toLowerCase();
  return !status || ['published', 'active', 'completed', 'archived'].includes(status) ? 'PUBLISHED' : 'DRAFT';
};
const apiRole = (role: unknown): UserRole => {
  switch (String(role).toLowerCase()) {
    case 'admin': return 'SUPER_ADMIN';
    case 'staff': return 'ADMIN';
    default: return 'EDITOR';
  }
};
const normalizeUser = (raw: unknown): AdminUser => {
  const item = record(raw);
  return {
    id: String(value(item, 'id') || ''),
    name: String(value(item, 'full_name', 'name') || value(item, 'email') || 'User'),
    email: String(value(item, 'email') || ''),
    role: apiRole(value(item, 'role')),
    status: value(item, 'is_active', 'active', 'status') === false || String(value(item, 'status')).toLowerCase() === 'inactive' ? 'INACTIVE' : 'ACTIVE',
    createdAt: iso(item, 'created_at', 'createdAt'),
    lastLoginAt: value(item, 'last_login_at', 'lastLoginAt') || undefined,
  };
};
const normalizeService = (raw: unknown): Service => {
  const item = record(raw);
  const nestedCategories = list(item, 'categories').map(normalizeServiceCategory);
  const categoryValue = value(item, 'category');
  const categoryObject = record(categoryValue);
  const categoryName = nestedCategories[0]?.name || (typeof categoryValue === 'object' && categoryValue !== null
    ? String(value(categoryObject, 'name', 'title', 'slug') || '')
    : String(categoryValue || value(item, 'category_name') || ''));
  const categorySlug = nestedCategories[0]?.slug || String(value(item, 'category_slug') || value(categoryObject, 'slug') || (categoryName ? slugify(categoryName) : ''));
  const categoryIds = nestedCategories.map(category => category.id).filter(Boolean);
  return {
    id: String(value(item, 'id') || ''), title: String(value(item, 'name', 'title') || ''), slug: String(value(item, 'slug') || ''), category: categoryName, categorySlug, categoryId: categoryIds[0] || String(value(item, 'category_id') || value(categoryObject, 'id') || '') || undefined, categoryIds, categories: nestedCategories,
    shortDescription: String(value(item, 'short_description', 'shortDescription') || ''), fullDescription: String(value(item, 'description', 'full_description', 'fullDescription') || ''),
    icon: String(value(item, 'icon') || 'Bot'), heroVisual: value(item, 'hero_visual', 'heroVisual'), features: list(item, 'features'), benefits: list(item, 'benefits'),
    technologies: list(item, 'technologies'), process: list(item, 'process').map((step, index) => ({ step: Number(step.step || index + 1), title: String(step.title || ''), description: String(step.description || '') })),
    problemStatement: value(item, 'problem_statement', 'problemStatement'), ourApproach: value(item, 'our_approach', 'ourApproach'), ctaText: value(item, 'cta_text', 'ctaText'),
    seoTitle: value(item, 'seo_title', 'seoTitle'), seoDescription: value(item, 'seo_description', 'seoDescription'), status: contentStatus(item),
    sortOrder: Number(value(item, 'sort_order', 'sortOrder') || 0), createdAt: iso(item, 'created_at', 'createdAt'), updatedAt: iso(item, 'updated_at', 'updatedAt'),
  };
};
const normalizeSolution = (raw: unknown): Solution => {
  const item = record(raw);
  const nestedCategories = list(item, 'categories').map(normalizeSolutionCategory);
  const categoryValue = value(item, 'category');
  const categoryObject = record(categoryValue);
  const categoryName = nestedCategories[0]?.name || (typeof categoryValue === 'object' && categoryValue !== null
    ? String(value(categoryObject, 'name', 'title', 'slug') || '')
    : String(categoryValue || value(item, 'category_name') || ''));
  const categorySlug = nestedCategories[0]?.slug || String(value(item, 'category_slug') || value(categoryObject, 'slug') || (categoryName ? slugify(categoryName) : ''));
  const categoryIds = nestedCategories.map(category => category.id).filter(Boolean);
  return {
    id: String(value(item, 'id') || ''), title: String(value(item, 'name', 'title') || ''), slug: String(value(item, 'slug') || ''), category: categoryName, categorySlug, categoryId: categoryIds[0] || String(value(item, 'category_id') || value(categoryObject, 'id') || '') || undefined, categoryIds, categories: nestedCategories,
    shortDescription: String(value(item, 'short_description', 'shortDescription') || ''), description: String(value(item, 'description') || ''), fullDescription: value(item, 'description', 'full_description', 'fullDescription'),
    businessProblem: String(value(item, 'business_problem', 'businessProblem') || ''), problemSolved: value(item, 'business_problem', 'businessProblem'), solution: String(value(item, 'solution') || ''), howItWorks: value(item, 'solution', 'how_it_works', 'howItWorks'),
    features: list(item, 'features'), benefits: list(item, 'benefits'), workflow: list(item, 'workflow').map((step, index) => ({ step: Number(step.step || index + 1), title: String(step.title || ''), description: String(step.description || '') })),
    integrations: list(item, 'integrations'), technologies: list(item, 'technologies'), visual: value(item, 'visual'), relatedProjectIds: list(item, 'related_project_ids', 'relatedProjectIds'), ctaText: value(item, 'cta_text', 'ctaText'),
    seoTitle: value(item, 'seo_title', 'seoTitle'), seoDescription: value(item, 'seo_description', 'seoDescription'), status: contentStatus(item), featured: Boolean(value(item, 'featured') || false), createdAt: iso(item, 'created_at', 'createdAt'), updatedAt: iso(item, 'updated_at', 'updatedAt'),
  };
};
const normalizeProject = (raw: unknown): Project => {
  const item = record(raw);
  const nestedCategories = list(item, 'categories').map(normalizeProjectCategory);
  const categoryValue = value(item, 'category');
  const categoryObject = record(categoryValue);
  const categoryName = nestedCategories[0]?.name || (typeof categoryValue === 'object' && categoryValue !== null
    ? String(value(categoryObject, 'name', 'title', 'slug') || '')
    : String(categoryValue || value(item, 'category_name') || ''));
  const categorySlug = nestedCategories[0]?.slug || String(value(item, 'category_slug') || value(categoryObject, 'slug') || (categoryName ? slugify(categoryName) : ''));
  const categoryIds = nestedCategories.map(category => category.id).filter(Boolean);
  const description = String(value(item, 'description', 'full_description', 'fullDescription', 'overview') || '');
  return {
    id: String(value(item, 'id') || ''), title: String(value(item, 'title') || ''), slug: String(value(item, 'slug') || ''), shortDescription: String(value(item, 'short_description', 'shortDescription') || ''), fullDescription: description, category: categoryName, categorySlug, categoryId: categoryIds[0] || String(value(item, 'category_id') || value(categoryObject, 'id') || '') || undefined, categoryIds, categories: nestedCategories,
    projectType: String(value(item, 'project_type', 'projectType') || 'Other') as ProjectType, industry: String(value(item, 'industry') || ''), client: value(item, 'client_name', 'clientName', 'client'), clientName: value(item, 'client_name', 'clientName', 'client'), timeline: value(item, 'timeline'),
    coverImage: assetUrl(value(item, 'cover_image', 'coverImage')), gallery: list(item, 'gallery').map(assetUrl), technologies: list(item, 'technologies'), servicesUsed: list(item, 'services_used', 'servicesUsed'), features: list(item, 'features'), projectUrl: value(item, 'project_url', 'projectUrl'), liveUrl: value(item, 'live_url', 'liveUrl'), githubUrl: value(item, 'github_url', 'githubUrl'), completionDate: String(value(item, 'completion_date', 'completionDate') || ''), featured: Boolean(value(item, 'featured') || false), status: contentStatus(item), sortOrder: Number(value(item, 'sort_order', 'sortOrder') || 0), overview: String(value(item, 'overview') || description), challenge: String(value(item, 'challenge') || ''), solution: String(value(item, 'solution') || ''), implementation: String(value(item, 'implementation') || ''), results: list(item, 'results'), relatedServiceIds: list(item, 'related_service_ids', 'relatedServiceIds'), relatedCaseStudyId: value(item, 'related_case_study_id', 'relatedCaseStudyId'), seoTitle: value(item, 'seo_title', 'seoTitle'), seoDescription: value(item, 'seo_description', 'seoDescription'), ogImage: assetUrl(value(item, 'og_image', 'ogImage')), createdAt: iso(item, 'created_at', 'createdAt'), updatedAt: iso(item, 'updated_at', 'updatedAt'),
  };
};
const normalizeCaseStudy = (raw: unknown): CaseStudy => {
  const item = record(raw); const testimonial = record(value(item, 'testimonial')); const project = record(value(item, 'project'));
  return {
    id: String(value(item, 'id') || ''), title: String(value(item, 'title') || ''), slug: String(value(item, 'slug') || ''), client: String(value(item, 'client', 'client_name') || value(project, 'title') || ''), industry: String(value(item, 'industry') || ''), summary: String(value(item, 'summary') || ''), challenge: String(value(item, 'challenge') || ''), objectives: list(item, 'objectives'), solution: String(value(item, 'solution') || ''), architectureDescription: String(value(item, 'architecture_description', 'architectureDescription') || ''), architectureDetails: value(item, 'architecture_description', 'architectureDescription'), implementation: String(value(item, 'implementation') || ''), workflowSteps: list(item, 'workflow_steps', 'workflowSteps'), technologies: list(item, 'technologies'), process: list(item, 'process'), measurableResults: list(item, 'metrics', 'measurable_results', 'measurableResults'), testimonial: { quote: String(value(testimonial, 'quote') || ''), author: String(value(testimonial, 'author') || ''), role: String(value(testimonial, 'role') || ''), company: String(value(testimonial, 'company') || ''), avatar: value(testimonial, 'avatar') }, coverImage: assetUrl(value(item, 'cover_image', 'coverImage')), gallery: list(item, 'gallery').map(assetUrl), relatedProjectId: value(item, 'project_id', 'related_project_id', 'relatedProjectId'), relatedServices: list(item, 'related_services', 'relatedServices'), featured: Boolean(value(item, 'featured') || false), status: contentStatus(item), publishDate: iso(item, 'publish_date', 'publishDate'), seoTitle: value(item, 'seo_title', 'seoTitle'), seoDescription: value(item, 'seo_description', 'seoDescription'), createdAt: iso(item, 'created_at', 'createdAt'), updatedAt: iso(item, 'updated_at', 'updatedAt'),
  };
};
const normalizeLead = (raw: unknown): Inquiry => {
  const item = record(raw); const status = String(value(item, 'status') || 'new').toLowerCase();
  const notes = String(value(item, 'notes') || '');
  const mappedStatus: InquiryStatus = ({ new: 'New', contacted: 'Contacted', qualified: 'In Progress', converted: 'Converted', lost: 'Closed' } as Record<string, InquiryStatus>)[status] || 'New';
  return { id: String(value(item, 'id') || ''), name: String(value(item, 'name') || ''), email: String(value(item, 'email') || ''), company: String(value(item, 'company') || ''), phone: value(item, 'phone'), projectType: String(value(item, 'service', 'project_type', 'projectType') || 'General Inquiry'), budgetRange: String(value(item, 'budget_range', 'budgetRange') || 'Not specified'), message: String(value(item, 'message') || ''), status: mappedStatus, notes: notes ? [notes] : [], internalNotes: notes ? [{ id: `note-${item.id}`, author: 'Staff', note: notes, createdAt: iso(item, 'updated_at', 'updatedAt') }] : [], createdAt: iso(item, 'created_at', 'createdAt'), updatedAt: iso(item, 'updated_at', 'updatedAt') };
};
const normalizeMedia = (raw: unknown): MediaItem => {
  const item = record(raw); const bytes = Number(value(item, 'size') || 0);
  return { id: String(value(item, 'id') || ''), name: String(value(item, 'original_name', 'name') || ''), url: assetUrl(value(item, 'public_url', 'url')), size: bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : '', type: String(value(item, 'mime_type', 'type') || ''), alt: String(value(item, 'alt_text', 'alt') || ''), uploadedAt: iso(item, 'created_at', 'uploadedAt'), width: value(item, 'width'), height: value(item, 'height') };
};

const projectPayload = (data: Partial<Project>, isCreate = false) => ({
  title: data.title, slug: data.slug, short_description: data.shortDescription, description: data.fullDescription || data.overview,
  client_name: data.clientName || data.client, industry: data.industry, ...(data.categoryIds !== undefined ? { category_ids: data.categoryIds.filter(categoryId => !categoryId.startsWith('local-')) } : data.categoryId && !data.categoryId.startsWith('local-') ? { category_ids: [data.categoryId] } : data.category ? { category: data.category } : {}), project_type: data.projectType || (isCreate ? 'Other' : undefined), ...(isCreate ? { status: 'active' } : {}),
  ...(data.status !== undefined ? { published: data.status === 'PUBLISHED' } : {}), featured: data.featured, cover_image: data.coverImage, gallery: data.gallery || (isCreate ? [] : undefined), technologies: data.technologies || (isCreate ? [] : undefined),
  results: data.results || (isCreate ? [] : undefined), live_url: data.liveUrl, github_url: data.githubUrl, sort_order: data.sortOrder ?? (isCreate ? 0 : undefined), overview: data.overview || data.fullDescription,
  challenge: data.challenge, solution: data.solution, implementation: data.implementation, related_service_ids: data.relatedServiceIds, related_case_study_id: data.relatedCaseStudyId,
});
const servicePayload = (data: Partial<Service>) => ({
  name: data.title, slug: data.slug, ...(data.categoryIds !== undefined ? { category_ids: data.categoryIds.filter(categoryId => !categoryId.startsWith('local-')) } : data.categoryId && !data.categoryId.startsWith('local-') ? { category_ids: [data.categoryId] } : data.category ? { category: data.category } : {}), short_description: data.shortDescription, description: data.fullDescription, icon: data.icon, features: data.features, benefits: data.benefits,
  technologies: data.technologies, process: data.process, cta_text: data.ctaText, ...(data.status !== undefined ? { published: data.status === 'PUBLISHED' } : {}), sort_order: data.sortOrder, problem_statement: data.problemStatement, our_approach: data.ourApproach, seo_title: data.seoTitle, seo_description: data.seoDescription,
});
const solutionPayload = (data: Partial<Solution>) => ({
  name: data.title, slug: data.slug, ...(data.categoryIds !== undefined ? { category_ids: data.categoryIds.filter(categoryId => !categoryId.startsWith('local-')) } : data.categoryId && !data.categoryId.startsWith('local-') ? { category_ids: [data.categoryId] } : { category: data.category }), short_description: data.shortDescription, description: data.description || data.fullDescription, business_problem: data.businessProblem || data.problemSolved, solution: data.solution || data.howItWorks,
  features: data.features, benefits: data.benefits, workflow: data.workflow, integrations: data.integrations, technologies: data.technologies, visual: data.visual, featured: data.featured, ...(data.status !== undefined ? { published: data.status === 'PUBLISHED' } : {}), cta_text: data.ctaText, seo_title: data.seoTitle, seo_description: data.seoDescription,
});
const caseStudyPayload = (data: Partial<CaseStudy>, isCreate = false) => ({
  title: data.title, slug: data.slug, ...(isCreate || Object.prototype.hasOwnProperty.call(data, 'relatedProjectId') ? { project_id: data.relatedProjectId || null } : {}), summary: data.summary, challenge: data.challenge, objectives: data.objectives, solution: data.solution,
  architecture_description: data.architectureDescription || data.architectureDetails, implementation: data.implementation, workflow_steps: data.workflowSteps, technologies: data.technologies, process: data.process, metrics: data.measurableResults, testimonial: data.testimonial,
  cover_image: data.coverImage, gallery: data.gallery || (isCreate ? [] : undefined), featured: data.featured, ...(data.status !== undefined ? { published: data.status === 'PUBLISHED' } : {}), publish_date: data.publishDate, seo_title: data.seoTitle, seo_description: data.seoDescription,
});

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [db, setDb] = useState<AppDatabase>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load local database, initializing defaults', e);
    }
    return initialDatabase;
  });

  const [auth, setAuth] = useState<AuthSession>({
      user: null,
      token: null,
      isAuthenticated: false,
  });

  // Remote API Integration State
  const [apiBaseUrl, setApiBaseUrlState] = useState<string>(() => api.getBaseUrl());
  const [apiHealth, setApiHealth] = useState<ApiHealthState>({
    status: 'checking',
    lastChecked: undefined,
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [mutationError, setMutationError] = useState<string | null>(null);
  const [solutionCategories, setSolutionCategories] = useState<SolutionCategory[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  const clearMutationError = () => setMutationError(null);
  const reportMutationFailure = (action: string, error?: string) => {
    setMutationError(`${action} failed${error ? `: ${error}` : '.'}`);
  };

  const getSolutionCategories = (): SolutionCategory[] => {
    if (solutionCategories.length > 0) return [...solutionCategories].sort((a, b) => a.sortOrder - b.sortOrder);

    const fallback = new Map<string, SolutionCategory>();
    db.solutions.forEach(solution => {
      const name = solution.category.trim();
      if (!name) return;
      const slug = solution.categorySlug || slugify(name);
      if (!fallback.has(slug)) {
        fallback.set(slug, { id: `local-${slug}`, name, slug, description: '', sortOrder: fallback.size });
      }
    });
    return [...fallback.values()];
  };

  const loadSolutionCategoryBySlug = async (slug: string): Promise<SolutionCategory | undefined> => {
    const response = await api.getSolutionCategoryBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const category = normalizeSolutionCategory(response.data);
    setSolutionCategories(prev => [...prev.filter(item => item.id !== category.id), category]);
    if (category.solutions) {
      setDb(prev => ({
        ...prev,
        solutions: [...prev.solutions.filter(item => !category.solutions?.some(solution => solution.id === item.id)), ...category.solutions],
      }));
    }
    return category;
  };

  const createSolutionCategory = async (data: Omit<SolutionCategory, 'id' | 'solutions'>): Promise<SolutionCategory | undefined> => {
    const response = await api.createAdminSolutionCategory({
      name: data.name,
      slug: data.slug,
      description: data.description,
      sort_order: data.sortOrder,
    });
    if (!response.success || !response.data) {
      reportMutationFailure('Creating solution category', response.error);
      return undefined;
    }
    const category = normalizeSolutionCategory(response.data);
    setSolutionCategories(prev => [...prev.filter(item => item.id !== category.id), category]);
    return category;
  };

  const updateSolutionCategory = async (id: string, data: Partial<Omit<SolutionCategory, 'id' | 'solutions'>>): Promise<SolutionCategory | undefined> => {
    const response = await api.updateAdminSolutionCategory(id, {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.sortOrder !== undefined ? { sort_order: data.sortOrder } : {}),
    });
    if (!response.success || !response.data) {
      reportMutationFailure('Updating solution category', response.error);
      return undefined;
    }
    const category = normalizeSolutionCategory(response.data);
    setSolutionCategories(prev => [...prev.filter(item => item.id !== id), category]);
    return category;
  };

  const deleteSolutionCategory = async (id: string): Promise<boolean> => {
    const response = await api.deleteAdminSolutionCategory(id);
    if (!response.success) {
      reportMutationFailure('Deleting solution category', response.error);
      return false;
    }
    setSolutionCategories(prev => prev.filter(item => item.id !== id));
    setDb(prev => ({
      ...prev,
      solutions: prev.solutions.map(solution => ({
        ...solution,
        categories: solution.categories?.filter(category => category.id !== id),
        categoryIds: solution.categoryIds?.filter(categoryId => categoryId !== id),
        categoryId: solution.categoryId === id ? undefined : solution.categoryId,
      })),
    }));
    return true;
  };

  const getServiceCategories = (): ServiceCategory[] => {
    if (serviceCategories.length > 0) return [...serviceCategories].sort((a, b) => a.sortOrder - b.sortOrder);
    const fallback = new Map<string, ServiceCategory>();
    db.services.forEach(service => {
      const name = service.category || service.categories?.[0]?.name || '';
      if (!name) return;
      const slug = service.categorySlug || service.categories?.[0]?.slug || slugify(name);
      if (!fallback.has(slug)) fallback.set(slug, { id: `local-${slug}`, name, slug, description: '', sortOrder: fallback.size });
    });
    return [...fallback.values()];
  };

  const loadServiceCategoryBySlug = async (slug: string): Promise<ServiceCategory | undefined> => {
    const response = await api.getServiceCategoryBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const category = normalizeServiceCategory(response.data);
    setServiceCategories(prev => [...prev.filter(item => item.id !== category.id), category]);
    if (category.services) {
      setDb(prev => ({
        ...prev,
        services: [...prev.services.filter(item => !category.services?.some(service => service.id === item.id)), ...category.services],
      }));
    }
    return category;
  };

  const createServiceCategory = async (data: Omit<ServiceCategory, 'id' | 'services'>): Promise<ServiceCategory | undefined> => {
    const response = await api.createAdminServiceCategory({ name: data.name, slug: data.slug, description: data.description, sort_order: data.sortOrder });
    if (!response.success || !response.data) {
      reportMutationFailure('Creating service category', response.error);
      return undefined;
    }
    const category = normalizeServiceCategory(response.data);
    setServiceCategories(prev => [...prev.filter(item => item.id !== category.id), category]);
    return category;
  };

  const updateServiceCategory = async (id: string, data: Partial<Omit<ServiceCategory, 'id' | 'services'>>): Promise<ServiceCategory | undefined> => {
    const response = await api.updateAdminServiceCategory(id, {
      ...(data.name !== undefined ? { name: data.name } : {}), ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}), ...(data.sortOrder !== undefined ? { sort_order: data.sortOrder } : {}),
    });
    if (!response.success || !response.data) {
      reportMutationFailure('Updating service category', response.error);
      return undefined;
    }
    const category = normalizeServiceCategory(response.data);
    setServiceCategories(prev => [...prev.filter(item => item.id !== id), category]);
    return category;
  };

  const deleteServiceCategory = async (id: string): Promise<boolean> => {
    const response = await api.deleteAdminServiceCategory(id);
    if (!response.success) {
      reportMutationFailure('Deleting service category', response.error);
      return false;
    }
    setServiceCategories(prev => prev.filter(item => item.id !== id));
    setDb(prev => ({
      ...prev,
      services: prev.services.map(service => ({
        ...service,
        categories: service.categories?.filter(category => category.id !== id),
        categoryIds: service.categoryIds?.filter(categoryId => categoryId !== id),
        categoryId: service.categoryId === id ? undefined : service.categoryId,
      })),
    }));
    return true;
  };

  const getProjectCategories = (): ProjectCategory[] => {
    if (projectCategories.length > 0) return [...projectCategories].sort((a, b) => a.sortOrder - b.sortOrder);
    const fallback = new Map<string, ProjectCategory>();
    db.projects.forEach(project => {
      const name = project.category || project.categories?.[0]?.name || '';
      if (!name) return;
      const slug = project.categorySlug || project.categories?.[0]?.slug || slugify(name);
      if (!fallback.has(slug)) fallback.set(slug, { id: `local-${slug}`, name, slug, description: '', sortOrder: fallback.size });
    });
    return [...fallback.values()];
  };

  const loadProjectCategoryBySlug = async (slug: string): Promise<ProjectCategory | undefined> => {
    const response = await api.getProjectCategoryBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const category = normalizeProjectCategory(response.data);
    setProjectCategories(prev => [...prev.filter(item => item.id !== category.id), category]);
    if (category.projects) {
      setDb(prev => ({
        ...prev,
        projects: [...prev.projects.filter(item => !category.projects?.some(project => project.id === item.id)), ...category.projects],
      }));
    }
    return category;
  };

  const createProjectCategory = async (data: Omit<ProjectCategory, 'id' | 'projects'>): Promise<ProjectCategory | undefined> => {
    const response = await api.createAdminProjectCategory({ name: data.name, slug: data.slug, description: data.description, sort_order: data.sortOrder });
    if (!response.success || !response.data) {
      reportMutationFailure('Creating project category', response.error);
      return undefined;
    }
    const category = normalizeProjectCategory(response.data);
    setProjectCategories(prev => [...prev.filter(item => item.id !== category.id), category]);
    return category;
  };

  const updateProjectCategory = async (id: string, data: Partial<Omit<ProjectCategory, 'id' | 'projects'>>): Promise<ProjectCategory | undefined> => {
    const response = await api.updateAdminProjectCategory(id, {
      ...(data.name !== undefined ? { name: data.name } : {}), ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}), ...(data.sortOrder !== undefined ? { sort_order: data.sortOrder } : {}),
    });
    if (!response.success || !response.data) {
      reportMutationFailure('Updating project category', response.error);
      return undefined;
    }
    const category = normalizeProjectCategory(response.data);
    setProjectCategories(prev => [...prev.filter(item => item.id !== id), category]);
    return category;
  };

  const deleteProjectCategory = async (id: string): Promise<boolean> => {
    const response = await api.deleteAdminProjectCategory(id);
    if (!response.success) {
      reportMutationFailure('Deleting project category', response.error);
      return false;
    }
    setProjectCategories(prev => prev.filter(item => item.id !== id));
    setDb(prev => ({
      ...prev,
      projects: prev.projects.map(project => ({
        ...project,
        categories: project.categories?.filter(category => category.id !== id),
        categoryIds: project.categoryIds?.filter(categoryId => categoryId !== id),
        categoryId: project.categoryId === id ? undefined : project.categoryId,
      })),
    }));
    return true;
  };

  const setApiBaseUrl = (newUrl: string) => {
    api.setBaseUrl(newUrl);
    setApiBaseUrlState(api.getBaseUrl());
    checkApiHealth();
  };

  const resetApiBaseUrl = () => {
    const defaultUrl = api.resetBaseUrl();
    setApiBaseUrlState(defaultUrl);
    checkApiHealth();
  };

  // Check health against configured API base URL (GET /health, GET /api/v1/health, GET /api/v1/health/db)
  const checkApiHealth = async (): Promise<void> => {
    setApiHealth(prev => ({ ...prev, status: 'checking' }));
    try {
      const [rootRes, apiRes, dbRes] = await Promise.all([
        api.getRootHealth(),
        api.getHealth(),
        api.getDbHealth(),
      ]);

      const isOnline = rootRes.success || apiRes.success || dbRes.success;
      const errorMsg = !isOnline
        ? apiRes.error || dbRes.error || rootRes.error || 'API server offline or unreachable'
        : undefined;

      setApiHealth({
        status: isOnline ? 'online' : 'offline',
        rootHealth: rootRes.data,
        apiHealth: apiRes.data,
        dbHealth: dbRes.data,
        error: errorMsg,
        lastChecked: new Date().toLocaleTimeString(),
      });
    } catch (err: any) {
      setApiHealth({
        status: 'offline',
        error: err.message || 'Failed to ping backend health',
        lastChecked: new Date().toLocaleTimeString(),
      });
    }
  };

  // Public content is available without a session. Admin lists are loaded after /auth/me.
  const syncWithApi = async (): Promise<{ success: boolean; message?: string }> => {
    setIsSyncing(true);
    try {
      const [servicesRes, projectsRes, caseStudiesRes, categoriesRes, serviceCategoriesRes, projectCategoriesRes, teamMembersRes] = await Promise.all([
        api.getServices({ page: 1, page_size: 50, sort: 'sort_order', order: 'asc' }),
        api.getProjects({ page: 1, page_size: 50, sort: 'created_at', order: 'desc' }),
        api.getCaseStudies({ page: 1, page_size: 50, sort: 'created_at', order: 'desc' }),
        api.getSolutionCategories(),
        api.getServiceCategories(),
        api.getProjectCategories(),
        api.getTeamMembers({ page: 1, page_size: 50, sort: 'sort_order', order: 'asc' }),
      ]);

      const categories = categoriesRes.success && Array.isArray(categoriesRes.data)
        ? categoriesRes.data.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            sortOrder: category.sort_order,
          }))
        : [];
      if (categoriesRes.success && categories.length > 0) setSolutionCategories(categories);

      const serviceCategories = serviceCategoriesRes.success && Array.isArray(serviceCategoriesRes.data)
        ? serviceCategoriesRes.data.map(category => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            sortOrder: category.sort_order,
          }))
        : [];
      if (serviceCategoriesRes.success && serviceCategories.length > 0) setServiceCategories(serviceCategories);

      const projectCategories = projectCategoriesRes.success && Array.isArray(projectCategoriesRes.data)
        ? projectCategoriesRes.data.map(category => ({ id: category.id, name: category.name, slug: category.slug, description: category.description || '', sortOrder: category.sort_order }))
        : [];
      if (projectCategoriesRes.success && projectCategories.length > 0) setProjectCategories(projectCategories);

      const syncedTeamMembers = teamMembersRes.success ? itemsFrom(teamMembersRes).map(normalizeTeamMember) : [];
      if (teamMembersRes.success) setTeamMembers(syncedTeamMembers);

      let serviceItems = servicesRes.success ? itemsFrom(servicesRes) : [];
      let servicesHealthy = servicesRes.success;
      if (serviceCategories.length > 0) {
        const categoryResponses = await Promise.all(serviceCategories.map(category => api.getServiceCategoryBySlug(category.slug)));
        if (categoryResponses.every(response => response.success)) {
          const categoryServiceItems = categoryResponses.flatMap(response => Array.isArray(response.data?.services) ? response.data.services : []);
          const hasFullServiceFields = categoryServiceItems.every(item => {
            const service = record(item);
            return service.short_description !== undefined || service.description !== undefined;
          });
          if (hasFullServiceFields) {
            serviceItems = categoryServiceItems;
          } else {
            const fullCategoryResponses = await Promise.all(serviceCategories.map(category => api.getServicesByCategory(category.slug, { page: 1, page_size: 50, sort: 'sort_order', order: 'asc' })));
            if (fullCategoryResponses.every(response => response.success)) serviceItems = fullCategoryResponses.flatMap(response => itemsFrom(response));
          }
          serviceItems = [...new Map(serviceItems.map(item => {
            const service = record(item);
            return [String(service.id || service.slug), item] as const;
          })).values()];
          servicesHealthy = true;
        }
      }

      let projectItems = projectsRes.success ? itemsFrom(projectsRes) : [];
      let projectsHealthy = projectsRes.success;
      if (projectCategories.length > 0) {
        const categoryResponses = await Promise.all(projectCategories.map(category => api.getProjectCategoryBySlug(category.slug)));
        if (categoryResponses.every(response => response.success)) {
          const categoryProjectItems = categoryResponses.flatMap(response => Array.isArray(response.data?.projects) ? response.data.projects : []);
          const hasFullProjectFields = categoryProjectItems.every(item => {
            const project = record(item);
            return project.short_description !== undefined || project.description !== undefined;
          });
          if (hasFullProjectFields) {
            projectItems = categoryProjectItems;
          } else {
            const fullCategoryResponses = await Promise.all(projectCategories.map(category => api.getProjectsByCategory(category.slug, { page: 1, page_size: 50, sort: 'created_at', order: 'desc' })));
            if (fullCategoryResponses.every(response => response.success)) projectItems = fullCategoryResponses.flatMap(response => itemsFrom(response));
          }
          projectItems = [...new Map(projectItems.map(item => {
            const project = record(item);
            return [String(project.id || project.slug), item] as const;
          })).values()];
          projectsHealthy = true;
        }
      }

      let solutionItems: any[] = [];
      let solutionsHealthy = false;
      if (categories.length > 0) {
        const categoryResponses = await Promise.all(
          categories.map(category => api.getSolutionCategoryBySlug(category.slug))
        );
        if (categoryResponses.every(response => response.success)) {
          const seen = new Set<string>();
          const categorySolutionItems = categoryResponses.flatMap(response => Array.isArray(response.data?.solutions) ? response.data.solutions : []);
          const hasFullSolutionFields = categorySolutionItems.every(item => {
            const solution = record(item);
            return solution.short_description !== undefined || solution.description !== undefined;
          });
          solutionItems = categorySolutionItems.filter(item => {
            const id = String(record(item).id || record(item).slug || '');
            if (seen.has(id)) return false;
            seen.add(id);
            return true;
          });
          if (!hasFullSolutionFields) {
            const fullCategoryResponses = await Promise.all(
              categories.map(category => api.getSolutionsByCategory(category.slug, { page: 1, page_size: 50, sort: 'sort_order', order: 'asc' }))
            );
            if (fullCategoryResponses.every(response => response.success)) {
              solutionItems = fullCategoryResponses.flatMap(response => itemsFrom(response));
            }
          }
          solutionItems = [...new Map(solutionItems.map(item => {
            const solution = record(item);
            return [String(solution.id || solution.slug), item] as const;
          })).values()];
          solutionsHealthy = true;
        }
      }
      if (!solutionsHealthy) {
        const solutionsRes = await api.getSolutions({ page: 1, page_size: 50, sort: 'sort_order', order: 'asc' });
        solutionItems = solutionsRes.success ? itemsFrom(solutionsRes) : [];
        solutionsHealthy = solutionsRes.success;
      }

      let importedCount = 0;
      setDb(prev => {
        const next = { ...prev };
        const services = serviceItems.map(normalizeService).map(service => {
          const category = serviceCategories.find(item => item.id === service.categoryId || item.slug === service.categorySlug || item.slug === service.category || item.name === service.category);
          return category ? { ...service, category: category.name, categorySlug: category.slug, categoryId: category.id } : service;
        });
        const solutions = solutionItems.map(normalizeSolution).map(solution => {
          const category = categories.find(item =>
            item.id === solution.categoryId || item.slug === solution.categorySlug || item.slug === solution.category || item.name === solution.category
          );
          return category
            ? { ...solution, category: category.name, categorySlug: category.slug, categoryId: category.id }
            : solution;
        });
        const projects = projectItems.map(normalizeProject).map(project => {
          const category = projectCategories.find(item => item.id === project.categoryId || item.slug === project.categorySlug || item.slug === project.category || item.name === project.category);
          return category ? { ...project, category: category.name, categorySlug: category.slug, categoryId: category.id } : project;
        });
        const caseStudies = caseStudiesRes.success ? itemsFrom(caseStudiesRes).map(normalizeCaseStudy) : [];
        if (servicesHealthy) { next.services = services; importedCount += services.length; }
        if (solutionsHealthy) { next.solutions = solutions; importedCount += solutions.length; }
        if (projectsHealthy) { next.projects = projects; importedCount += projects.length; }
        if (caseStudiesRes.success) { next.caseStudies = caseStudies; importedCount += caseStudies.length; }
        return next;
      });

      setIsSyncing(false);
      const isHealthy = servicesHealthy || solutionsHealthy || projectsHealthy || caseStudiesRes.success || categoriesRes.success || serviceCategoriesRes.success || projectCategoriesRes.success || teamMembersRes.success;
      if (isHealthy) {
        setApiHealth(prev => ({ ...prev, status: 'online', lastChecked: new Date().toLocaleTimeString() }));
        return { success: true, message: `Synchronized ${importedCount} records from backend API` };
      } else {
        return {
          success: false,
          message: servicesRes.error || categoriesRes.error || serviceCategoriesRes.error || projectCategoriesRes.error || teamMembersRes.error || 'Backend API is currently unreachable. Using local storage.',
        };
      }
    } catch (err: any) {
      setIsSyncing(false);
      return { success: false, message: err.message || 'Failed to synchronize with backend API' };
    }
  };

  const syncAdminWithApi = async () => {
    const [projects, services, solutions, caseStudies, leads, files] = await Promise.all([
      api.listAdminProjects({ page: 1, page_size: 50, sort: 'created_at', order: 'desc' }), api.listAdminServices({ page: 1, page_size: 50, sort: 'sort_order', order: 'asc' }), api.listAdminSolutions({ page: 1, page_size: 50, sort: 'sort_order', order: 'asc' }),
      api.listAdminCaseStudies({ page: 1, page_size: 50, sort: 'created_at', order: 'desc' }), api.listAdminLeads({ page: 1, page_size: 50, sort: 'created_at', order: 'desc' }), api.listAdminFiles({ page: 1, page_size: 50, sort: 'created_at', order: 'desc' }),
    ]);
    setDb(prev => ({
      ...prev,
      projects: projects.success ? itemsFrom(projects).map(normalizeProject) : prev.projects,
      services: services.success ? itemsFrom(services).map(normalizeService) : prev.services,
      solutions: solutions.success ? itemsFrom(solutions).map(normalizeSolution) : prev.solutions,
      caseStudies: caseStudies.success ? itemsFrom(caseStudies).map(normalizeCaseStudy) : prev.caseStudies,
      inquiries: leads.success ? itemsFrom(leads).map(normalizeLead) : prev.inquiries,
      media: files.success ? itemsFrom(files).map(normalizeMedia) : prev.media,
    }));
  };

  useEffect(() => {
    void checkApiHealth();
    void syncWithApi();
    void api.getMe().then(response => {
      if (!response.success || !response.data) return;
      const user = normalizeUser(response.data);
      if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
        void api.logout();
        return;
      }
      setAuth({ user, token: null, isAuthenticated: true });
      void syncAdminWithApi();
    });
  }, []);

  // Persist DB updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error('Error saving DB to localStorage', e);
    }
  }, [db]);

  // Persist Auth updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      api.setToken(null);
    } catch (e) {
      console.error('Error saving auth to localStorage', e);
    }
  }, [auth]);

  const login = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string; source?: 'api' | 'local' }> => {
    const trimmedEmail = email.trim().toLowerCase();

    const apiRes = await api.login({ email: trimmedEmail, password: pass });
    if (!apiRes.success || !apiRes.data) {
      return { success: false, error: apiRes.error || 'Invalid email or password.' };
    }

    const user = normalizeUser(apiRes.data);
    if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
      void api.logout();
      return { success: false, error: 'Your account does not have CMS access.' };
    }
    setAuth({ user, token: null, isAuthenticated: true });
    setApiHealth(prev => ({ ...prev, status: 'online' }));
    void syncAdminWithApi();
    return { success: true, source: 'api' };
  };

  const logout = () => {
    void api.logout();
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem(AUTH_KEY);
  };

  const hasRole = (requiredRole: UserRole): boolean => {
    if (!auth.user) return false;
    if (auth.user.role === 'SUPER_ADMIN') return true;
    if (requiredRole === 'ADMIN' && auth.user.role === 'ADMIN') return true;
    if (requiredRole === 'EDITOR' && (auth.user.role === 'ADMIN' || auth.user.role === 'EDITOR')) return true;
    return false;
  };

  // ---------------- Services ----------------
  const getServices = (includeDrafts = false): Service[] => {
    const list = includeDrafts ? db.services : db.services.filter(s => s.status === 'PUBLISHED');
    return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const getServiceBySlug = (slug: string): Service | undefined => {
    return db.services.find(s => s.slug === slug && s.status === 'PUBLISHED');
  };

  const loadServiceBySlug = async (slug: string): Promise<Service | undefined> => {
    const response = await api.getServiceBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const service = normalizeService(response.data);
    setDb(prev => ({ ...prev, services: [...prev.services.filter(item => item.id !== service.id), service] }));
    return service;
  };

  const createService = (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service => {
    const now = new Date().toISOString();
    const newService: Service = {
      ...data,
      id: `srv-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setDb(prev => ({
      ...prev,
      services: [...prev.services, newService],
    }));
    void api.createAdminService(servicePayload(newService)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, services: prev.services.map(item => item.id === newService.id ? normalizeService(res.data) : item) }));
      else { reportMutationFailure('Creating service', res.error); void syncAdminWithApi(); }
    });
    return newService;
  };

  const updateService = (id: string, data: Partial<Service>) => {
    setDb(prev => ({
      ...prev,
      services: prev.services.map(s =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      ),
    }));
    void api.updateAdminService(id, servicePayload(data)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, services: prev.services.map(item => item.id === id ? normalizeService(res.data) : item) }));
      else { reportMutationFailure('Updating service', res.error); void syncAdminWithApi(); }
    });
  };

  const deleteService = (id: string) => {
    setDb(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id),
    }));
    void api.deleteAdminService(id).then(res => {
      if (!res.success) { reportMutationFailure('Deleting service', res.error); void syncAdminWithApi(); }
    });
  };

  const reorderServices = (orderedIds: string[]) => {
    setDb(prev => {
      const updated = prev.services.map(s => {
        const index = orderedIds.indexOf(s.id);
        return index !== -1 ? { ...s, sortOrder: index + 1 } : s;
      });
      return { ...prev, services: updated };
    });
    orderedIds.forEach((id, index) => void api.updateAdminService(id, { sort_order: index + 1 }).then(res => {
      if (!res.success) { reportMutationFailure('Reordering services', res.error); void syncAdminWithApi(); }
    }));
  };

  // ---------------- Solutions ----------------
  const getSolutions = (includeDrafts = false): Solution[] => {
    return includeDrafts ? db.solutions : db.solutions.filter(s => s.status === 'PUBLISHED');
  };

  const getSolutionBySlug = (slug: string): Solution | undefined => {
    return db.solutions.find(s => s.slug === slug && s.status === 'PUBLISHED');
  };

  const loadSolutionBySlug = async (slug: string): Promise<Solution | undefined> => {
    const response = await api.getSolutionBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const solution = normalizeSolution(response.data);
    setDb(prev => ({ ...prev, solutions: [...prev.solutions.filter(item => item.id !== solution.id), solution] }));
    return solution;
  };

  const createSolution = (data: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>): Solution => {
    const now = new Date().toISOString();
    const newSolution: Solution = {
      ...data,
      id: `sol-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setDb(prev => ({
      ...prev,
      solutions: [...prev.solutions, newSolution],
    }));
    void api.createAdminSolution(solutionPayload(newSolution)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, solutions: prev.solutions.map(item => item.id === newSolution.id ? normalizeSolution(res.data) : item) }));
      else { reportMutationFailure('Creating solution', res.error); void syncAdminWithApi(); }
    });
    return newSolution;
  };

  const updateSolution = (id: string, data: Partial<Solution>) => {
    setDb(prev => ({
      ...prev,
      solutions: prev.solutions.map(s =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      ),
    }));
    void api.updateAdminSolution(id, solutionPayload(data)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, solutions: prev.solutions.map(item => item.id === id ? normalizeSolution(res.data) : item) }));
      else { reportMutationFailure('Updating solution', res.error); void syncAdminWithApi(); }
    });
  };

  const deleteSolution = (id: string) => {
    setDb(prev => ({
      ...prev,
      solutions: prev.solutions.filter(s => s.id !== id),
    }));
    void api.deleteAdminSolution(id).then(res => {
      if (!res.success) { reportMutationFailure('Deleting solution', res.error); void syncAdminWithApi(); }
    });
  };

  // ---------------- Projects ----------------
  const getProjects = (includeDrafts = false): Project[] => {
    const list = includeDrafts ? db.projects : db.projects.filter(p => p.status === 'PUBLISHED');
    return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const getProjectBySlug = (slug: string): Project | undefined => {
    return db.projects.find(p => p.slug === slug && p.status === 'PUBLISHED');
  };

  const loadProjectBySlug = async (slug: string): Promise<Project | undefined> => {
    const response = await api.getProjectBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const project = normalizeProject(response.data);
    setDb(prev => ({ ...prev, projects: [...prev.projects.filter(item => item.id !== project.id), project] }));
    return project;
  };

  const createProject = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...data,
      id: `prj-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setDb(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
    void api.createAdminProject(projectPayload(newProject, true)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, projects: prev.projects.map(item => item.id === newProject.id ? normalizeProject(res.data) : item) }));
      else { reportMutationFailure('Creating project', res.error); void syncAdminWithApi(); }
    });
    return newProject;
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setDb(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      ),
    }));
    void api.updateAdminProject(id, projectPayload(data)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, projects: prev.projects.map(item => item.id === id ? normalizeProject(res.data) : item) }));
      else { reportMutationFailure('Updating project', res.error); void syncAdminWithApi(); }
    });
  };

  const deleteProject = (id: string) => {
    setDb(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
    void api.deleteAdminProject(id).then(res => {
      if (!res.success) { reportMutationFailure('Deleting project', res.error); void syncAdminWithApi(); }
    });
  };

  const getTeamMembers = (includeDrafts = false): TeamMember[] => {
    const members = includeDrafts ? teamMembers : teamMembers.filter(member => member.status === 'PUBLISHED');
    return [...members].sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
  };

  const getTeamMemberBySlug = (slug: string): TeamMember | undefined => {
    return teamMembers.find(member => member.slug === slug && member.status === 'PUBLISHED');
  };

  const loadTeamMemberBySlug = async (slug: string): Promise<TeamMember | undefined> => {
    const response = await api.getTeamMemberBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const member = normalizeTeamMember(response.data);
    setTeamMembers(prev => [...prev.filter(item => item.id !== member.id), member]);
    return member;
  };

  const teamMemberPayload = (data: Partial<TeamMember>) => ({
    name: data.name,
    slug: data.slug,
    role: data.role,
    bio: data.bio,
    avatar_url: data.avatarUrl,
    category: data.category,
    featured: data.featured,
    published: data.status === undefined ? undefined : data.status === 'PUBLISHED',
    sort_order: data.sortOrder,
  });

  const createTeamMember = (data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember => {
    const now = new Date().toISOString();
    const member: TeamMember = { ...data, id: `team-${Date.now()}`, createdAt: now, updatedAt: now };
    setTeamMembers(prev => [...prev, member]);
    void api.createAdminTeamMember(teamMemberPayload(member)).then(response => {
      if (response.success && response.data) setTeamMembers(prev => prev.map(item => item.id === member.id ? normalizeTeamMember(response.data) : item));
      else { reportMutationFailure('Creating team member', response.error); }
    });
    return member;
  };

  const updateTeamMember = (id: string, data: Partial<TeamMember>) => {
    setTeamMembers(prev => prev.map(item => item.id === id ? { ...item, ...data, updatedAt: new Date().toISOString() } : item));
    void api.updateAdminTeamMember(id, teamMemberPayload(data)).then(response => {
      if (response.success && response.data) setTeamMembers(prev => prev.map(item => item.id === id ? normalizeTeamMember(response.data) : item));
      else { reportMutationFailure('Updating team member', response.error); }
    });
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers(prev => prev.filter(item => item.id !== id));
    void api.deleteAdminTeamMember(id).then(response => {
      if (!response.success) reportMutationFailure('Deleting team member', response.error);
    });
  };

  // ---------------- Case Studies ----------------
  const getCaseStudies = (includeDrafts = false): CaseStudy[] => {
    return includeDrafts ? db.caseStudies : db.caseStudies.filter(c => c.status === 'PUBLISHED');
  };

  const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
    return db.caseStudies.find(c => c.slug === slug && c.status === 'PUBLISHED');
  };

  const loadCaseStudyBySlug = async (slug: string): Promise<CaseStudy | undefined> => {
    const response = await api.getCaseStudyBySlug(slug);
    if (!response.success || !response.data) return undefined;
    const caseStudy = normalizeCaseStudy(response.data);
    setDb(prev => ({ ...prev, caseStudies: [...prev.caseStudies.filter(item => item.id !== caseStudy.id), caseStudy] }));
    return caseStudy;
  };

  const createCaseStudy = (data: Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>): CaseStudy => {
    const now = new Date().toISOString();
    const newCaseStudy: CaseStudy = {
      ...data,
      id: `cs-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setDb(prev => ({
      ...prev,
      caseStudies: [...prev.caseStudies, newCaseStudy],
    }));
    void api.createAdminCaseStudy(caseStudyPayload(newCaseStudy, true)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, caseStudies: prev.caseStudies.map(item => item.id === newCaseStudy.id ? normalizeCaseStudy(res.data) : item) }));
      else { reportMutationFailure('Creating case study', res.error); void syncAdminWithApi(); }
    });
    return newCaseStudy;
  };

  const updateCaseStudy = (id: string, data: Partial<CaseStudy>) => {
    setDb(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.map(c =>
        c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c
      ),
    }));
    void api.updateAdminCaseStudy(id, caseStudyPayload(data)).then(res => {
      if (res.success && res.data) setDb(prev => ({ ...prev, caseStudies: prev.caseStudies.map(item => item.id === id ? normalizeCaseStudy(res.data) : item) }));
      else { reportMutationFailure('Updating case study', res.error); void syncAdminWithApi(); }
    });
  };

  const deleteCaseStudy = (id: string) => {
    setDb(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.filter(c => c.id !== id),
    }));
    void api.deleteAdminCaseStudy(id).then(res => {
      if (!res.success) { reportMutationFailure('Deleting case study', res.error); void syncAdminWithApi(); }
    });
  };

  // ---------------- Blog Posts ----------------
  const getBlogPosts = (includeDrafts = false): BlogPost[] => {
    return includeDrafts ? db.blogPosts : db.blogPosts.filter(b => b.status === 'PUBLISHED');
  };

  const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return db.blogPosts.find(b => b.slug === slug);
  };

  const createBlogPost = (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): BlogPost => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...data,
      id: `post-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setDb(prev => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts],
    }));
    return newPost;
  };

  const updateBlogPost = (id: string, data: Partial<BlogPost>) => {
    setDb(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(b =>
        b.id === id ? { ...b, ...data, updatedAt: new Date().toISOString() } : b
      ),
    }));
  };

  const deleteBlogPost = (id: string) => {
    setDb(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(b => b.id !== id),
    }));
  };

  // ---------------- Inquiries & Leads ----------------
  const getInquiries = (): Inquiry[] => {
    return [...db.inquiries].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const getInquiryById = (id: string): Inquiry | undefined => {
    return db.inquiries.find(i => i.id === id);
  };

  const submitInquiry = async (
    data: Omit<Inquiry, 'id' | 'status' | 'internalNotes' | 'createdAt' | 'updatedAt'>
  ): Promise<Inquiry> => {
    const now = new Date().toISOString();
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'New',
      internalNotes: [],
      createdAt: now,
      updatedAt: now,
    };

    const response = await api.createLead({
      name: data.name, email: data.email, company: data.company, phone: data.phone,
      service: data.projectType, source: 'website', message: `${data.message}\n\nProject type: ${data.projectType}. Budget: ${data.budgetRange}.`,
    });
    if (!response.success) throw new Error(response.error || 'Failed to submit inquiry.');
    const savedInquiry = { ...newInquiry, id: String(response.data?.id || newInquiry.id) };
    setDb(prev => ({ ...prev, inquiries: [savedInquiry, ...prev.inquiries] }));
    return savedInquiry;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setDb(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(i =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i
      ),
    }));
    const apiStatus = ({ New: 'new', Contacted: 'contacted', 'In Progress': 'qualified', Converted: 'converted', Closed: 'lost', Archived: 'lost' } as Record<InquiryStatus, string>)[status];
    void api.updateAdminLead(id, { status: apiStatus }).then(res => {
      if (!res.success) { reportMutationFailure('Updating lead status', res.error); void syncAdminWithApi(); }
    });
  };

  const addInquiryNote = (id: string, note: string) => {
    if (!auth.user) return;
    const newNote = {
      id: `note-${Date.now()}`,
      author: auth.user.name,
      note,
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(i =>
              i.id === id
          ? {
              ...i,
              notes: [...(i.notes || []), note],
              internalNotes: [...i.internalNotes, newNote],
              updatedAt: new Date().toISOString(),
            }
          : i
      ),
    }));
    const existing = db.inquiries.find(inquiry => inquiry.id === id);
    const notes = [...(existing?.notes || []), note].join('\n');
    void api.updateAdminLead(id, { notes }).then(res => {
      if (!res.success) { reportMutationFailure('Saving lead note', res.error); void syncAdminWithApi(); }
    });
  };

  const deleteInquiry = (id: string) => {
    setDb(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(i => i.id !== id),
    }));
    void api.deleteAdminLead(id).then(res => {
      if (!res.success) { reportMutationFailure('Deleting lead', res.error); void syncAdminWithApi(); }
    });
  };

  // ---------------- Media ----------------
  const getMedia = (): MediaItem[] => {
    return db.media;
  };

  const uploadMedia = (data: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem => {
    const newMedia: MediaItem = {
      ...data,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      media: [newMedia, ...prev.media],
    }));
    return newMedia;
  };

  const uploadMediaFile = async (file: File, folder?: string, altText?: string): Promise<MediaItem> => {
    const response = await api.uploadAdminFile(file, folder, altText);
    if (!response.success || !response.data) {
      reportMutationFailure('Uploading media', response.error);
      throw new Error(response.error || 'Media upload failed.');
    }
    const media = normalizeMedia(response.data);
    setDb(prev => ({ ...prev, media: [media, ...prev.media] }));
    return media;
  };

  const deleteMedia = (id: string) => {
    setDb(prev => ({
      ...prev,
      media: prev.media.filter(m => m.id !== id),
    }));
    // Sync with remote API DELETE /api/v1/admin/files/{media_id}
    void api.deleteAdminFile(id).then(res => {
      if (!res.success) { reportMutationFailure('Deleting media', res.error); void syncAdminWithApi(); }
    });
  };

  // ---------------- Admin Users ----------------
  const getUsers = (): AdminUser[] => {
    return db.users;
  };

  const createUser = (data: Omit<AdminUser, 'id' | 'createdAt'>): AdminUser => {
    const newUser: AdminUser = {
      ...data,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setDb(prev => ({
      ...prev,
      users: [...prev.users, newUser],
    }));
    return newUser;
  };

  const updateUser = (id: string, data: Partial<AdminUser>) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => (u.id === id ? { ...u, ...data } : u)),
    }));
  };

  const deactivateUser = (id: string) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.map(u =>
        u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u
      ),
    }));
  };

  const deleteUser = (id: string) => {
    setDb(prev => ({
      ...prev,
      users: prev.users.filter(u => u.id !== id),
    }));
  };

  // ---------------- Settings ----------------
  const getSettings = (): SiteSettings => {
    return db.settings;
  };

  const updateSettings = (data: Partial<SiteSettings>) => {
    setDb(prev => ({
      ...prev,
      settings: { ...prev.settings, ...data },
    }));
  };

  const resetDatabaseToSeed = () => {
    setDb(initialDatabase);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDatabase));
  };

  return (
    <DatabaseContext.Provider
      value={{
        db,
        auth,
        login,
        logout,
        hasRole,

        // Remote Backend API
        api,
        apiBaseUrl,
        setApiBaseUrl,
        resetApiBaseUrl,
        apiHealth,
        checkApiHealth,
        isSyncing,
        syncWithApi,
        mutationError,
        clearMutationError,
        getSolutionCategories,
        loadSolutionCategoryBySlug,
        createSolutionCategory,
        updateSolutionCategory,
        deleteSolutionCategory,
        getServiceCategories,
        loadServiceCategoryBySlug,
        createServiceCategory,
        updateServiceCategory,
        deleteServiceCategory,
        getProjectCategories,
        loadProjectCategoryBySlug,
        createProjectCategory,
        updateProjectCategory,
        deleteProjectCategory,

         getServices,
         getServiceBySlug,
         loadServiceBySlug,
         createService,
        updateService,
        deleteService,
        reorderServices,

         getSolutions,
         getSolutionBySlug,
         loadSolutionBySlug,
         createSolution,
        updateSolution,
        deleteSolution,

         getProjects,
         getProjectBySlug,
         loadProjectBySlug,
         createProject,
         updateProject,
         deleteProject,
         getTeamMembers,
         getTeamMemberBySlug,
         loadTeamMemberBySlug,
         createTeamMember,
         updateTeamMember,
         deleteTeamMember,

         getCaseStudies,
         getCaseStudyBySlug,
         loadCaseStudyBySlug,
         createCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,

        getBlogPosts,
        getBlogPostBySlug,
        createBlogPost,
        updateBlogPost,
        deleteBlogPost,

        getInquiries,
        getInquiryById,
        submitInquiry,
        updateInquiryStatus,
        addInquiryNote,
        deleteInquiry,

        getMedia,
        getMediaItems: getMedia,
         uploadMedia,
         uploadMediaFile,
        addMediaItem: uploadMedia,
        deleteMedia,
        deleteMediaItem: deleteMedia,

        getUsers,
        createUser,
        updateUser,
        deactivateUser,
        deleteUser,

        getSettings,
        updateSettings,

        resetDatabaseToSeed,
        resetToSeedData: resetDatabaseToSeed,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
