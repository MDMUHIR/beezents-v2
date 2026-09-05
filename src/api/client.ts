/** Small, cookie-authenticated client for the Beezents FastAPI backend. */

export const DEFAULT_API_BASE_URL = 'http://localhost:8000';
export const API_BASE_STORAGE_KEY = 'beezent_api_base_url';
// Kept as an export for callers from older UI code. Sessions are cookies now.
export const API_TOKEN_STORAGE_KEY = 'beezent_api_auth_token';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface HealthResponse {
  status: string;
  [key: string]: unknown;
}

export interface UserResponse {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'client' | 'staff' | 'admin';
  is_active: boolean;
  last_login_at: string | null;
}

export interface LeadCreateResponse {
  id: string;
  message: string;
}

export interface MediaAdminResponse {
  id: string;
  original_name: string;
  storage_key: string;
  public_url: string;
  mime_type: string;
  size: number;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  folder: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export type QueryParams = Record<string, string | number | boolean | undefined | null>;

const queryString = (params?: QueryParams) => {
  if (!params) return '';
  const values = Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '');
  return values.length ? `?${new URLSearchParams(values.map(([key, value]) => [key, String(value)]))}` : '';
};

const errorMessage = (data: unknown, response: Response) => {
  if (typeof data === 'object' && data !== null && 'detail' in data) {
    const detail = (data as { detail?: unknown }).detail;
    if (Array.isArray(detail)) {
      return detail.map(item => (typeof item === 'object' && item !== null && 'msg' in item ? String(item.msg) : String(item))).join(', ');
    }
    if (detail) return String(detail);
  }
  return `Request failed with status ${response.status}${response.statusText ? ` (${response.statusText})` : ''}`;
};

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = this.getInitialBaseUrl();
  }

  private sanitizeUrl(url: string) {
    return url.trim().replace(/\/$/, '');
  }

  private getInitialBaseUrl() {
    const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env || {} as Record<string, string>;
    const envUrl = env.VITE_API_BASE_URL;
    // A configured dev proxy must win over an old absolute URL saved by the CMS.
    if (env.VITE_API_PROXY_TARGET && envUrl?.startsWith('/')) return this.sanitizeUrl(envUrl);
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(API_BASE_STORAGE_KEY);
      if (stored) return this.sanitizeUrl(stored);
    }
    return this.sanitizeUrl(envUrl || DEFAULT_API_BASE_URL);
  }

  public getBaseUrl() { return this.baseUrl; }

  public setBaseUrl(url: string) {
    this.baseUrl = this.sanitizeUrl(url || DEFAULT_API_BASE_URL);
    if (typeof window !== 'undefined') window.localStorage.setItem(API_BASE_STORAGE_KEY, this.baseUrl);
  }

  public resetBaseUrl() {
    const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env || {} as Record<string, string>;
    this.setBaseUrl(env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL);
    return this.baseUrl;
  }

  // Compatibility no-ops: FastAPI authenticates with an HttpOnly cookie.
  public getToken() { return null; }
  public setToken(_token: string | null) { return; }

  /** Public for the diagnostics screen and all typed endpoint methods. */
  public async request<T = unknown>(path: string, options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
    body?: unknown;
    headers?: Record<string, string>;
    timeoutMs?: number;
    isFormData?: boolean;
  } = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', body, headers = {}, timeoutMs = 15000, isFormData = false } = options;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const url = `${this.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
    const requestHeaders = { ...headers };
    if (body && !isFormData && !requestHeaders['Content-Type']) requestHeaders['Content-Type'] = 'application/json';

    try {
      const response = await fetch(url, {
        method,
        headers: requestHeaders,
        credentials: 'include',
        body: isFormData ? body as BodyInit : body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      let data: unknown = null;
      if (response.status !== 204) {
        const contentType = response.headers.get('content-type') || '';
        data = contentType.includes('json') ? await response.json().catch(() => null) : await response.text().catch(() => null);
      }
      if (!response.ok) return { success: false, error: errorMessage(data, response), data: data as T, status: response.status };
      return { success: true, data: data as T, status: response.status };
    } catch (error) {
      clearTimeout(timeoutId);
      const message = error instanceof DOMException && error.name === 'AbortError'
        ? `Connection timed out while reaching ${url}`
        : `Unable to connect to ${this.baseUrl}. Ensure the backend is running and CORS allows this frontend origin.`;
      return { success: false, error: message, status: 0 };
    }
  }

  public getRootHealth() { return this.request<HealthResponse>('/health'); }
  public getHealth() { return this.request<HealthResponse>('/api/v1/health'); }
  public getDbHealth() { return this.request<HealthResponse>('/api/v1/health/db'); }

  public register(payload: { email: string; password: string; full_name: string }) {
    return this.request<UserResponse>('/api/v1/auth/register', { method: 'POST', body: payload });
  }

  public login(credentials: { email: string; password: string }) {
    return this.request<UserResponse>('/api/v1/auth/login', { method: 'POST', body: credentials });
  }

  public logout() { return this.request('/api/v1/auth/logout', { method: 'POST' }); }
  public getMe() { return this.request<UserResponse>('/api/v1/auth/me'); }
  public getDevStaff() { return this.request('/api/v1/dev/staff'); }
  public getDevAdmin() { return this.request('/api/v1/dev/admin'); }

  public getProjects(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/projects${queryString(params)}`); }
  public getProjectBySlug(slug: string) { return this.request<unknown>(`/api/v1/projects/${encodeURIComponent(slug)}`); }
  public getCaseStudies(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/case-studies${queryString(params)}`); }
  public getCaseStudyBySlug(slug: string) { return this.request<unknown>(`/api/v1/case-studies/${encodeURIComponent(slug)}`); }
  public getServices(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/services${queryString(params)}`); }
  public getServiceBySlug(slug: string) { return this.request<unknown>(`/api/v1/services/${encodeURIComponent(slug)}`); }
  public getSolutions(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/solutions${queryString(params)}`); }
  public getSolutionBySlug(slug: string) { return this.request<unknown>(`/api/v1/solutions/${encodeURIComponent(slug)}`); }

  public createLead(lead: { name: string; email: string; phone?: string; company?: string; service?: string; message: string; source?: string }) {
    return this.request<LeadCreateResponse>('/api/v1/leads', { method: 'POST', body: lead });
  }

  public listAdminProjects(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/admin/projects${queryString(params)}`); }
  public createAdminProject(data: unknown) { return this.request<unknown>('/api/v1/admin/projects', { method: 'POST', body: data }); }
  public getAdminProject(id: string) { return this.request<unknown>(`/api/v1/admin/projects/${encodeURIComponent(id)}`); }
  public updateAdminProject(id: string, data: unknown) { return this.request<unknown>(`/api/v1/admin/projects/${encodeURIComponent(id)}`, { method: 'PATCH', body: data }); }
  public deleteAdminProject(id: string) { return this.request(`/api/v1/admin/projects/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  public listAdminServices(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/admin/services${queryString(params)}`); }
  public createAdminService(data: unknown) { return this.request<unknown>('/api/v1/admin/services', { method: 'POST', body: data }); }
  public getAdminService(id: string) { return this.request<unknown>(`/api/v1/admin/services/${encodeURIComponent(id)}`); }
  public updateAdminService(id: string, data: unknown) { return this.request<unknown>(`/api/v1/admin/services/${encodeURIComponent(id)}`, { method: 'PATCH', body: data }); }
  public deleteAdminService(id: string) { return this.request(`/api/v1/admin/services/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  public listAdminSolutions(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/admin/solutions${queryString(params)}`); }
  public createAdminSolution(data: unknown) { return this.request<unknown>('/api/v1/admin/solutions', { method: 'POST', body: data }); }
  public getAdminSolution(id: string) { return this.request<unknown>(`/api/v1/admin/solutions/${encodeURIComponent(id)}`); }
  public updateAdminSolution(id: string, data: unknown) { return this.request<unknown>(`/api/v1/admin/solutions/${encodeURIComponent(id)}`, { method: 'PATCH', body: data }); }
  public deleteAdminSolution(id: string) { return this.request(`/api/v1/admin/solutions/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  public listAdminCaseStudies(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/admin/case-studies${queryString(params)}`); }
  public createAdminCaseStudy(data: unknown) { return this.request<unknown>('/api/v1/admin/case-studies', { method: 'POST', body: data }); }
  public getAdminCaseStudy(id: string) { return this.request<unknown>(`/api/v1/admin/case-studies/${encodeURIComponent(id)}`); }
  public updateAdminCaseStudy(id: string, data: unknown) { return this.request<unknown>(`/api/v1/admin/case-studies/${encodeURIComponent(id)}`, { method: 'PATCH', body: data }); }
  public deleteAdminCaseStudy(id: string) { return this.request(`/api/v1/admin/case-studies/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  public listAdminLeads(params?: QueryParams) { return this.request<PaginatedResponse<unknown>>(`/api/v1/admin/leads${queryString(params)}`); }
  public getAdminLead(id: string) { return this.request<unknown>(`/api/v1/admin/leads/${encodeURIComponent(id)}`); }
  public updateAdminLead(id: string, data: unknown) { return this.request<unknown>(`/api/v1/admin/leads/${encodeURIComponent(id)}`, { method: 'PATCH', body: data }); }
  public deleteAdminLead(id: string) { return this.request(`/api/v1/admin/leads/${encodeURIComponent(id)}`, { method: 'DELETE' }); }

  public listAdminFiles(params?: QueryParams) { return this.request<PaginatedResponse<MediaAdminResponse>>(`/api/v1/admin/files${queryString(params)}`); }
  public uploadAdminFile(file: File | FormData, folder?: string, altText?: string) {
    const form = file instanceof FormData ? file : new FormData();
    if (!(file instanceof FormData)) {
      form.append('file', file);
      if (folder) form.append('folder', folder);
      if (altText) form.append('alt_text', altText);
    }
    return this.request<unknown>('/api/v1/admin/files', { method: 'POST', body: form, isFormData: true });
  }
  public getAdminFile(id: string) { return this.request<unknown>(`/api/v1/admin/files/${encodeURIComponent(id)}`); }
  public updateAdminFile(id: string, data: unknown) { return this.request<unknown>(`/api/v1/admin/files/${encodeURIComponent(id)}`, { method: 'PATCH', body: data }); }
  public deleteAdminFile(id: string) { return this.request(`/api/v1/admin/files/${encodeURIComponent(id)}`, { method: 'DELETE' }); }
}

export const api = new ApiClient();
