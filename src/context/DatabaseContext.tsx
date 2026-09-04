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
  UserRole
} from '../types';
import { initialDatabase } from '../data/seedData';
import { api, DEFAULT_API_BASE_URL } from '../api';

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

  // Remote Backend API (Base: http://192.168.0.109:8000/)
  api: typeof api;
  apiBaseUrl: string;
  setApiBaseUrl: (url: string) => void;
  resetApiBaseUrl: () => void;
  apiHealth: ApiHealthState;
  checkApiHealth: () => Promise<void>;
  isSyncing: boolean;
  syncWithApi: () => Promise<{ success: boolean; message?: string }>;

  // Services
  getServices: (includeDrafts?: boolean) => Service[];
  getServiceBySlug: (slug: string) => Service | undefined;
  createService: (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => Service;
  updateService: (id: string, data: Partial<Service>) => void;
  deleteService: (id: string) => void;
  reorderServices: (orderedIds: string[]) => void;

  // Solutions
  getSolutions: (includeDrafts?: boolean) => Solution[];
  getSolutionBySlug: (slug: string) => Solution | undefined;
  createSolution: (data: Omit<Solution, 'id' | 'createdAt' | 'updatedAt'>) => Solution;
  updateSolution: (id: string, data: Partial<Solution>) => void;
  deleteSolution: (id: string) => void;

  // Projects
  getProjects: (includeDrafts?: boolean) => Project[];
  getProjectBySlug: (slug: string) => Project | undefined;
  createProject: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Project;
  updateProject: (id: string, data: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Case Studies
  getCaseStudies: (includeDrafts?: boolean) => CaseStudy[];
  getCaseStudyBySlug: (slug: string) => CaseStudy | undefined;
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

  const [auth, setAuth] = useState<AuthSession>(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_KEY);
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        return {
          user: parsed.user || null,
          token: parsed.token || null,
          isAuthenticated: !!parsed.user,
        };
      }
    } catch (e) {
      console.warn('Failed to load auth session', e);
    }
    // Default logged in as Super Admin for instant preview demonstration
    return {
      user: initialDatabase.users[0],
      token: 'session-demo-token-alex-chen',
      isAuthenticated: true,
    };
  });

  // Remote API Integration State (Base URL: http://192.168.0.109:8000/)
  const [apiBaseUrl, setApiBaseUrlState] = useState<string>(() => api.getBaseUrl());
  const [apiHealth, setApiHealth] = useState<ApiHealthState>({
    status: 'checking',
    lastChecked: undefined,
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

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

  // Sync data from remote backend API if active
  const syncWithApi = async (): Promise<{ success: boolean; message?: string }> => {
    setIsSyncing(true);
    try {
      const [servicesRes, solutionsRes, projectsRes, caseStudiesRes] = await Promise.all([
        api.getServices(),
        api.getSolutions(),
        api.getProjects(),
        api.getCaseStudies(),
      ]);

      let importedCount = 0;
      setDb(prev => {
        const next = { ...prev };
        if (servicesRes.success && Array.isArray(servicesRes.data) && servicesRes.data.length > 0) {
          next.services = servicesRes.data;
          importedCount += servicesRes.data.length;
        }
        if (solutionsRes.success && Array.isArray(solutionsRes.data) && solutionsRes.data.length > 0) {
          next.solutions = solutionsRes.data;
          importedCount += solutionsRes.data.length;
        }
        if (projectsRes.success && Array.isArray(projectsRes.data) && projectsRes.data.length > 0) {
          next.projects = projectsRes.data;
          importedCount += projectsRes.data.length;
        }
        if (caseStudiesRes.success && Array.isArray(caseStudiesRes.data) && caseStudiesRes.data.length > 0) {
          next.caseStudies = caseStudiesRes.data;
          importedCount += caseStudiesRes.data.length;
        }
        return next;
      });

      setIsSyncing(false);
      const isHealthy = servicesRes.success || solutionsRes.success || projectsRes.success || caseStudiesRes.success;
      if (isHealthy) {
        setApiHealth(prev => ({ ...prev, status: 'online', lastChecked: new Date().toLocaleTimeString() }));
        return { success: true, message: `Synchronized ${importedCount} records from backend API` };
      } else {
        return {
          success: false,
          message: servicesRes.error || 'Backend API is currently unreachable. Using local storage.',
        };
      }
    } catch (err: any) {
      setIsSyncing(false);
      return { success: false, message: err.message || 'Failed to synchronize with backend API' };
    }
  };

  // Run initial health check on startup
  useEffect(() => {
    checkApiHealth();
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
      if (auth.token) {
        api.setToken(auth.token);
      } else {
        api.setToken(null);
      }
    } catch (e) {
      console.error('Error saving auth to localStorage', e);
    }
  }, [auth]);

  const login = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string; source?: 'api' | 'local' }> => {
    const trimmedEmail = email.trim().toLowerCase();

    // 1. Attempt official remote backend login via POST /api/v1/auth/login
    try {
      const apiRes = await api.login({ email: trimmedEmail, password: pass });
      if (apiRes.success && apiRes.data) {
        const token = apiRes.data.token || apiRes.data.access_token || `tok_api_${Date.now()}`;
        const rawUser = apiRes.data.user;
        const userData: AdminUser = {
          id: rawUser?.id || `usr-remote-${Date.now()}`,
          name: rawUser?.name || trimmedEmail.split('@')[0],
          email: rawUser?.email || trimmedEmail,
          role: (rawUser?.role as UserRole) || 'ADMIN',
          status: (rawUser?.status as any) || 'ACTIVE',
          createdAt: rawUser?.createdAt || new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };

        const session: AuthSession = {
          user: userData,
          token,
          isAuthenticated: true,
        };

        setAuth(session);
        setApiHealth(prev => ({ ...prev, status: 'online' }));
        return { success: true, source: 'api' };
      }
    } catch (apiErr) {
      console.warn('API authentication attempt failed, trying local fallback credentials', apiErr);
    }

    // 2. Local fallback authentication
    const user = db.users.find(u => u.email.toLowerCase() === trimmedEmail && u.status === 'ACTIVE');
    
    if (!user) {
      return { success: false, error: 'No active user found with this email address.' };
    }

    // In demo environment, accept any non-empty password or standard 'admin'
    if (!pass || pass.length < 3) {
      return { success: false, error: 'Password must be at least 3 characters.' };
    }

    const updatedUser = {
      ...user,
      lastLoginAt: new Date().toISOString(),
    };

    setDb(prev => ({
      ...prev,
      users: prev.users.map(u => (u.id === user.id ? updatedUser : u)),
    }));

    const session: AuthSession = {
      user: updatedUser,
      token: `auth_tok_${Date.now()}_${user.id}`,
      isAuthenticated: true,
    };

    setAuth(session);
    return { success: true, source: 'local' };
  };

  const logout = () => {
    // Dispatch remote logout call
    api.logout().catch(() => {});
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
    return db.services.find(s => s.slug === slug);
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
    // Sync with remote API
    api.createAdminService(newService).catch(() => {});
    return newService;
  };

  const updateService = (id: string, data: Partial<Service>) => {
    setDb(prev => ({
      ...prev,
      services: prev.services.map(s =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      ),
    }));
    // Sync with remote API
    api.updateAdminService(id, data).catch(() => {});
  };

  const deleteService = (id: string) => {
    setDb(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id),
    }));
    // Sync with remote API
    api.deleteAdminService(id).catch(() => {});
  };

  const reorderServices = (orderedIds: string[]) => {
    setDb(prev => {
      const updated = prev.services.map(s => {
        const index = orderedIds.indexOf(s.id);
        return index !== -1 ? { ...s, sortOrder: index + 1 } : s;
      });
      return { ...prev, services: updated };
    });
  };

  // ---------------- Solutions ----------------
  const getSolutions = (includeDrafts = false): Solution[] => {
    return includeDrafts ? db.solutions : db.solutions.filter(s => s.status === 'PUBLISHED');
  };

  const getSolutionBySlug = (slug: string): Solution | undefined => {
    return db.solutions.find(s => s.slug === slug);
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
    // Sync with remote API
    api.createAdminSolution(newSolution).catch(() => {});
    return newSolution;
  };

  const updateSolution = (id: string, data: Partial<Solution>) => {
    setDb(prev => ({
      ...prev,
      solutions: prev.solutions.map(s =>
        s.id === id ? { ...s, ...data, updatedAt: new Date().toISOString() } : s
      ),
    }));
    // Sync with remote API
    api.updateAdminSolution(id, data).catch(() => {});
  };

  const deleteSolution = (id: string) => {
    setDb(prev => ({
      ...prev,
      solutions: prev.solutions.filter(s => s.id !== id),
    }));
    // Sync with remote API
    api.deleteAdminSolution(id).catch(() => {});
  };

  // ---------------- Projects ----------------
  const getProjects = (includeDrafts = false): Project[] => {
    const list = includeDrafts ? db.projects : db.projects.filter(p => p.status === 'PUBLISHED');
    return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const getProjectBySlug = (slug: string): Project | undefined => {
    return db.projects.find(p => p.slug === slug);
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
    // Sync with remote API
    api.createAdminProject(newProject).catch(() => {});
    return newProject;
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setDb(prev => ({
      ...prev,
      projects: prev.projects.map(p =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p
      ),
    }));
    // Sync with remote API
    api.updateAdminProject(id, data).catch(() => {});
  };

  const deleteProject = (id: string) => {
    setDb(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
    // Sync with remote API
    api.deleteAdminProject(id).catch(() => {});
  };

  // ---------------- Case Studies ----------------
  const getCaseStudies = (includeDrafts = false): CaseStudy[] => {
    return includeDrafts ? db.caseStudies : db.caseStudies.filter(c => c.status === 'PUBLISHED');
  };

  const getCaseStudyBySlug = (slug: string): CaseStudy | undefined => {
    return db.caseStudies.find(c => c.slug === slug);
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
    // Sync with remote API
    api.createAdminCaseStudy(newCaseStudy).catch(() => {});
    return newCaseStudy;
  };

  const updateCaseStudy = (id: string, data: Partial<CaseStudy>) => {
    setDb(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.map(c =>
        c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c
      ),
    }));
    // Sync with remote API
    api.updateAdminCaseStudy(id, data).catch(() => {});
  };

  const deleteCaseStudy = (id: string) => {
    setDb(prev => ({
      ...prev,
      caseStudies: prev.caseStudies.filter(c => c.id !== id),
    }));
    // Sync with remote API
    api.deleteAdminCaseStudy(id).catch(() => {});
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
    // Artificial latency for tactile response
    await new Promise(res => setTimeout(res, 500));

    const now = new Date().toISOString();
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      status: 'New',
      internalNotes: [],
      createdAt: now,
      updatedAt: now,
    };

    setDb(prev => ({
      ...prev,
      inquiries: [newInquiry, ...prev.inquiries],
    }));

    // Dispatch real lead creation to POST /api/v1/leads at http://192.168.0.109:8000/
    api
      .createLead({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        projectType: data.projectType,
        budgetRange: data.budgetRange,
        message: data.message,
      })
      .then(res => {
        if (res.success) {
          console.info('Successfully synced lead to POST /api/v1/leads:', res.data);
        }
      })
      .catch(() => {});

    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: InquiryStatus) => {
    setDb(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(i =>
        i.id === id ? { ...i, status, updatedAt: new Date().toISOString() } : i
      ),
    }));
    // Sync with remote API PATCH /api/v1/admin/leads/{lead_id}
    api.updateAdminLead(id, { status }).catch(() => {});
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
              internalNotes: [...i.internalNotes, newNote],
              updatedAt: new Date().toISOString(),
            }
          : i
      ),
    }));
  };

  const deleteInquiry = (id: string) => {
    setDb(prev => ({
      ...prev,
      inquiries: prev.inquiries.filter(i => i.id !== id),
    }));
    // Sync with remote API DELETE /api/v1/admin/leads/{lead_id}
    api.deleteAdminLead(id).catch(() => {});
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

  const deleteMedia = (id: string) => {
    setDb(prev => ({
      ...prev,
      media: prev.media.filter(m => m.id !== id),
    }));
    // Sync with remote API DELETE /api/v1/admin/files/{media_id}
    api.deleteAdminFile(id).catch(() => {});
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

        // Remote Backend API (http://192.168.0.109:8000/)
        api,
        apiBaseUrl,
        setApiBaseUrl,
        resetApiBaseUrl,
        apiHealth,
        checkApiHealth,
        isSyncing,
        syncWithApi,

        getServices,
        getServiceBySlug,
        createService,
        updateService,
        deleteService,
        reorderServices,

        getSolutions,
        getSolutionBySlug,
        createSolution,
        updateSolution,
        deleteSolution,

        getProjects,
        getProjectBySlug,
        createProject,
        updateProject,
        deleteProject,

        getCaseStudies,
        getCaseStudyBySlug,
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
