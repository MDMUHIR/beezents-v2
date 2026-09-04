/**
 * The Beezent Official API Client
 * Configured API Base: http://192.168.0.109:8000/
 *
 * Implements full REST specification for:
 * - Health (/api/v1/health, /api/v1/health/db, /health)
 * - Auth (/api/v1/auth/register, /api/v1/auth/login, /api/v1/auth/logout, /api/v1/auth/me)
 * - Development (/api/v1/dev/staff, /api/v1/dev/admin)
 * - Projects (/api/v1/projects, /api/v1/projects/{slug})
 * - Case Studies (/api/v1/case-studies, /api/v1/case-studies/{slug})
 * - Services (/api/v1/services, /api/v1/services/{slug})
 * - Solutions (/api/v1/solutions, /api/v1/solutions/{slug})
 * - Leads (/api/v1/leads)
 * - Admin Projects (/api/v1/admin/projects...)
 * - Admin Services (/api/v1/admin/services...)
 * - Admin Solutions (/api/v1/admin/solutions...)
 * - Admin Case Studies (/api/v1/admin/case-studies...)
 * - Admin Leads (/api/v1/admin/leads...)
 * - Admin Files (/api/v1/admin/files...)
 */

export const DEFAULT_API_BASE_URL = 'http://192.168.0.109:8000';
export const API_BASE_STORAGE_KEY = 'beezent_api_base_url';
export const API_TOKEN_STORAGE_KEY = 'beezent_api_auth_token';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export interface HealthResponse {
  status: string;
  timestamp?: string;
  version?: string;
  environment?: string;
  database?: string;
  [key: string]: any;
}

export interface AuthLoginResponse {
  token?: string;
  access_token?: string;
  token_type?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = this.getInitialBaseUrl();
    this.token = this.getInitialToken();
  }

  private getInitialBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(API_BASE_STORAGE_KEY);
      if (stored && stored.trim()) {
        return this.sanitizeUrl(stored.trim());
      }
    }
    const envUrl = (import.meta as any).env?.VITE_API_BASE_URL;
    if (envUrl && typeof envUrl === 'string') {
      return this.sanitizeUrl(envUrl);
    }
    return DEFAULT_API_BASE_URL;
  }

  private getInitialToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(API_TOKEN_STORAGE_KEY) || null;
    }
    return null;
  }

  private sanitizeUrl(url: string): string {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string): void {
    const cleanUrl = this.sanitizeUrl(url.trim() || DEFAULT_API_BASE_URL);
    this.baseUrl = cleanUrl;
    if (typeof window !== 'undefined') {
      localStorage.setItem(API_BASE_STORAGE_KEY, cleanUrl);
    }
  }

  public resetBaseUrl(): string {
    this.setBaseUrl(DEFAULT_API_BASE_URL);
    return DEFAULT_API_BASE_URL;
  }

  public getToken(): string | null {
    return this.token;
  }

  public setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem(API_TOKEN_STORAGE_KEY, token);
      } else {
        localStorage.removeItem(API_TOKEN_STORAGE_KEY);
      }
    }
  }

  /**
   * Internal HTTP request dispatcher with timeout and bearer auth headers
   */
  private async request<T = any>(
    path: string,
    options: {
      method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
      body?: any;
      headers?: Record<string, string>;
      timeoutMs?: number;
      isFormData?: boolean;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, timeoutMs = 8000, isFormData = false } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const fullUrl = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

    const reqHeaders: Record<string, string> = { ...headers };

    if (!isFormData && body && !reqHeaders['Content-Type']) {
      reqHeaders['Content-Type'] = 'application/json';
    }

    if (this.token && !reqHeaders['Authorization']) {
      reqHeaders['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: reqHeaders,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: any = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = null;
        }
      } else {
        try {
          data = await response.text();
        } catch {
          data = null;
        }
      }

      if (!response.ok) {
        const errorMsg =
          (data && (data.detail || data.message || data.error)) ||
          `Request failed with status ${response.status} (${response.statusText})`;
        return {
          success: false,
          error: errorMsg,
          data,
          status: response.status,
        };
      }

      return {
        success: true,
        data,
        status: response.status,
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      const isAbort = err.name === 'AbortError';
      const isFailedFetch = err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError');

      let errorMsg = err.message || 'Unknown network error occurred';
      if (isAbort) {
        errorMsg = `Connection timed out after ${timeoutMs}ms trying to reach ${fullUrl}`;
      } else if (isFailedFetch) {
        errorMsg = `Unable to connect to ${fullUrl}. Ensure your backend server is active at ${this.baseUrl} and CORS is allowed.`;
      }

      return {
        success: false,
        error: errorMsg,
        status: 0,
      };
    }
  }

  // ==========================================
  // 1. HEALTH ENDPOINTS
  // ==========================================

  /** GET /api/v1/health - System API Health */
  public async getHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/api/v1/health');
  }

  /** GET /api/v1/health/db - Database Connectivity Health */
  public async getDbHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/api/v1/health/db');
  }

  /** GET /health - Root Health */
  public async getRootHealth(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/health');
  }

  // ==========================================
  // 2. AUTH ENDPOINTS
  // ==========================================

  /** POST /api/v1/auth/register - Register new administrator/user */
  public async register(payload: {
    email: string;
    password: string;
    name?: string;
    role?: string;
    [key: string]: any;
  }): Promise<ApiResponse<any>> {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: payload,
    });
  }

  /** POST /api/v1/auth/login - Authenticate with credentials */
  public async login(credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<AuthLoginResponse>> {
    const res = await this.request<AuthLoginResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: credentials,
    });

    if (res.success && res.data) {
      const token = res.data.token || res.data.access_token;
      if (token) {
        this.setToken(token);
      }
    }

    return res;
  }

  /** POST /api/v1/auth/logout - Invalidate current session */
  public async logout(): Promise<ApiResponse<any>> {
    const res = await this.request('/api/v1/auth/logout', {
      method: 'POST',
    });
    this.setToken(null);
    return res;
  }

  /** GET /api/v1/auth/me - Current authenticated user */
  public async getMe(): Promise<ApiResponse<any>> {
    return this.request('/api/v1/auth/me');
  }

  // ==========================================
  // 3. DEVELOPMENT ROLE ENDPOINTS
  // ==========================================

  /** GET /api/v1/dev/staff - Staff Only Diagnostic Check */
  public async getDevStaff(): Promise<ApiResponse<any>> {
    return this.request('/api/v1/dev/staff');
  }

  /** GET /api/v1/dev/admin - Admin Only Diagnostic Check */
  public async getDevAdmin(): Promise<ApiResponse<any>> {
    return this.request('/api/v1/dev/admin');
  }

  // ==========================================
  // 4. PUBLIC PROJECTS
  // ==========================================

  /** GET /api/v1/projects - List Projects */
  public async getProjects(params?: Record<string, string>): Promise<ApiResponse<any[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<any[]>(`/api/v1/projects${query}`);
  }

  /** GET /api/v1/projects/{slug} - Get Project by slug */
  public async getProjectBySlug(slug: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/projects/${encodeURIComponent(slug)}`);
  }

  // ==========================================
  // 5. PUBLIC CASE STUDIES
  // ==========================================

  /** GET /api/v1/case-studies - List Case Studies */
  public async getCaseStudies(params?: Record<string, string>): Promise<ApiResponse<any[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<any[]>(`/api/v1/case-studies${query}`);
  }

  /** GET /api/v1/case-studies/{slug} - Get Case Study by slug */
  public async getCaseStudyBySlug(slug: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/case-studies/${encodeURIComponent(slug)}`);
  }

  // ==========================================
  // 6. PUBLIC SERVICES
  // ==========================================

  /** GET /api/v1/services - List Services */
  public async getServices(params?: Record<string, string>): Promise<ApiResponse<any[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<any[]>(`/api/v1/services${query}`);
  }

  /** GET /api/v1/services/{slug} - Get Service by slug */
  public async getServiceBySlug(slug: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/services/${encodeURIComponent(slug)}`);
  }

  // ==========================================
  // 7. PUBLIC SOLUTIONS
  // ==========================================

  /** GET /api/v1/solutions - List Solutions */
  public async getSolutions(params?: Record<string, string>): Promise<ApiResponse<any[]>> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<any[]>(`/api/v1/solutions${query}`);
  }

  /** GET /api/v1/solutions/{slug} - Get Solution by slug */
  public async getSolutionBySlug(slug: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/solutions/${encodeURIComponent(slug)}`);
  }

  // ==========================================
  // 8. LEADS
  // ==========================================

  /** POST /api/v1/leads - Create Lead / Inquiry */
  public async createLead(leadData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    projectType?: string;
    budgetRange?: string;
    message: string;
    [key: string]: any;
  }): Promise<ApiResponse<any>> {
    return this.request('/api/v1/leads', {
      method: 'POST',
      body: leadData,
    });
  }

  // ==========================================
  // 9. ADMIN PROJECTS
  // ==========================================

  /** GET /api/v1/admin/projects - List Projects (Admin) */
  public async listAdminProjects(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/admin/projects');
  }

  /** POST /api/v1/admin/projects - Create Project (Admin) */
  public async createAdminProject(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/v1/admin/projects', {
      method: 'POST',
      body: data,
    });
  }

  /** GET /api/v1/admin/projects/{project_id} - Get Project (Admin) */
  public async getAdminProject(projectId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/projects/${encodeURIComponent(projectId)}`);
  }

  /** PATCH /api/v1/admin/projects/{project_id} - Update Project (Admin) */
  public async updateAdminProject(projectId: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/projects/${encodeURIComponent(projectId)}`, {
      method: 'PATCH',
      body: data,
    });
  }

  /** DELETE /api/v1/admin/projects/{project_id} - Delete Project (Admin) */
  public async deleteAdminProject(projectId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/projects/${encodeURIComponent(projectId)}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // 10. ADMIN SERVICES
  // ==========================================

  /** GET /api/v1/admin/services - List Services (Admin) */
  public async listAdminServices(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/admin/services');
  }

  /** POST /api/v1/admin/services - Create Service (Admin) */
  public async createAdminService(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/v1/admin/services', {
      method: 'POST',
      body: data,
    });
  }

  /** GET /api/v1/admin/services/{service_id} - Get Service (Admin) */
  public async getAdminService(serviceId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/services/${encodeURIComponent(serviceId)}`);
  }

  /** PATCH /api/v1/admin/services/{service_id} - Update Service (Admin) */
  public async updateAdminService(serviceId: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/services/${encodeURIComponent(serviceId)}`, {
      method: 'PATCH',
      body: data,
    });
  }

  /** DELETE /api/v1/admin/services/{service_id} - Delete Service (Admin) */
  public async deleteAdminService(serviceId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/services/${encodeURIComponent(serviceId)}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // 11. ADMIN SOLUTIONS
  // ==========================================

  /** GET /api/v1/admin/solutions - List Solutions (Admin) */
  public async listAdminSolutions(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/admin/solutions');
  }

  /** POST /api/v1/admin/solutions - Create Solution (Admin) */
  public async createAdminSolution(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/v1/admin/solutions', {
      method: 'POST',
      body: data,
    });
  }

  /** GET /api/v1/admin/solutions/{solution_id} - Get Solution (Admin) */
  public async getAdminSolution(solutionId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/solutions/${encodeURIComponent(solutionId)}`);
  }

  /** PATCH /api/v1/admin/solutions/{solution_id} - Update Solution (Admin) */
  public async updateAdminSolution(solutionId: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/solutions/${encodeURIComponent(solutionId)}`, {
      method: 'PATCH',
      body: data,
    });
  }

  /** DELETE /api/v1/admin/solutions/{solution_id} - Delete Solution (Admin) */
  public async deleteAdminSolution(solutionId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/solutions/${encodeURIComponent(solutionId)}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // 12. ADMIN CASE STUDIES
  // ==========================================

  /** GET /api/v1/admin/case-studies - List Case Studies (Admin) */
  public async listAdminCaseStudies(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/admin/case-studies');
  }

  /** POST /api/v1/admin/case-studies - Create Case Study (Admin) */
  public async createAdminCaseStudy(data: any): Promise<ApiResponse<any>> {
    return this.request('/api/v1/admin/case-studies', {
      method: 'POST',
      body: data,
    });
  }

  /** GET /api/v1/admin/case-studies/{case_study_id} - Get Case Study (Admin) */
  public async getAdminCaseStudy(caseStudyId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/case-studies/${encodeURIComponent(caseStudyId)}`);
  }

  /** PATCH /api/v1/admin/case-studies/{case_study_id} - Update Case Study (Admin) */
  public async updateAdminCaseStudy(caseStudyId: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/case-studies/${encodeURIComponent(caseStudyId)}`, {
      method: 'PATCH',
      body: data,
    });
  }

  /** DELETE /api/v1/admin/case-studies/{case_study_id} - Delete Case Study (Admin) */
  public async deleteAdminCaseStudy(caseStudyId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/case-studies/${encodeURIComponent(caseStudyId)}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // 13. ADMIN LEADS
  // ==========================================

  /** GET /api/v1/admin/leads - List Leads (Admin) */
  public async listAdminLeads(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/admin/leads');
  }

  /** GET /api/v1/admin/leads/{lead_id} - Get Lead (Admin) */
  public async getAdminLead(leadId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/leads/${encodeURIComponent(leadId)}`);
  }

  /** PATCH /api/v1/admin/leads/{lead_id} - Update Lead (Admin) */
  public async updateAdminLead(leadId: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/leads/${encodeURIComponent(leadId)}`, {
      method: 'PATCH',
      body: data,
    });
  }

  /** DELETE /api/v1/admin/leads/{lead_id} - Delete Lead (Admin) */
  public async deleteAdminLead(leadId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/leads/${encodeURIComponent(leadId)}`, {
      method: 'DELETE',
    });
  }

  // ==========================================
  // 14. ADMIN FILES / MEDIA
  // ==========================================

  /** GET /api/v1/admin/files - List Media Files (Admin) */
  public async listAdminFiles(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/v1/admin/files');
  }

  /** POST /api/v1/admin/files - Upload Media File (Admin) */
  public async uploadAdminFile(formDataOrFile: FormData | File, alt?: string): Promise<ApiResponse<any>> {
    let body: FormData;
    if (formDataOrFile instanceof FormData) {
      body = formDataOrFile;
    } else {
      body = new FormData();
      body.append('file', formDataOrFile);
      if (alt) {
        body.append('alt', alt);
      }
    }

    return this.request('/api/v1/admin/files', {
      method: 'POST',
      body,
      isFormData: true,
    });
  }

  /** GET /api/v1/admin/files/{media_id} - Get Media File (Admin) */
  public async getAdminFile(mediaId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/files/${encodeURIComponent(mediaId)}`);
  }

  /** PATCH /api/v1/admin/files/{media_id} - Update Media File (Admin) */
  public async updateAdminFile(mediaId: string, data: any): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/files/${encodeURIComponent(mediaId)}`, {
      method: 'PATCH',
      body: data,
    });
  }

  /** DELETE /api/v1/admin/files/{media_id} - Delete Media File (Admin) */
  public async deleteAdminFile(mediaId: string): Promise<ApiResponse<any>> {
    return this.request(`/api/v1/admin/files/${encodeURIComponent(mediaId)}`, {
      method: 'DELETE',
    });
  }
}

// Singleton API instance export
export const api = new ApiClient();
