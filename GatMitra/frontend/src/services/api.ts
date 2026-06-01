import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach locale parameter or accept-language headers automatically
api.interceptors.request.use((config) => {
  const language = localStorage.getItem('i18nextLng') || 'en';
  config.headers['Accept-Language'] = language;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

export interface BachatGatData {
  id?: string;
  name: string;
  registrationNumber: string;
  establishedDate?: string;
  description?: string;
  monthlySavingsAmount: number;
  isActive?: boolean;
}

export interface MemberData {
  id?: string;
  bachatGatId: string;
  bachatGatName?: string;
  userId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  joinDate?: string;
  status?: string;
}

export interface DashboardStats {
  totalGroups: number;
  totalMembers: number;
  totalSystemUsers: number;
  totalExpectedMonthlySavings: number;
  pendingNotifications: number;
  successfulLoginsCount: number;
  failedLoginsCount: number;
}

export interface AuditLog {
  id: string;
  username: string;
  ipAddress?: string;
  timestamp?: string;
  loginTime?: string;
  status: string;
  action?: string;
  entityName?: string;
  entityId?: string;
  details?: string;
}

// API methods
export const authApi = {
  login: (credentials: any) => api.post('/auth/login', credentials),
  requestOtp: (phone: string) => api.post('/auth/otp/request', { phoneNumber: phone }),
  verifyOtp: (phone: string, code: string) => api.post('/auth/otp/verify', { phoneNumber: phone, code })
};

export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats')
};

export const bachatGatApi = {
  getAll: () => api.get('/bachatgat'),
  getById: (id: string) => api.get(`/bachatgat/${id}`),
  create: (data: BachatGatData) => api.post('/bachatgat', data),
  update: (id: string, data: BachatGatData) => api.put(`/bachatgat/${id}`, data),
  delete: (id: string) => api.delete(`/bachatgat/${id}`)
};

export const memberApi = {
  getAll: () => api.get('/member'),
  getByGroup: (groupId: string) => api.get(`/member/group/${groupId}`),
  getById: (id: string) => api.get(`/member/${id}`),
  create: (data: MemberData) => api.post('/member', data),
  update: (id: string, data: MemberData) => api.put(`/member/${id}`, data),
  delete: (id: string) => api.delete(`/member/${id}`)
};

export const auditApi = {
  getLoginAudits: () => api.get('/audit/login'),
  getActivityAudits: () => api.get('/audit/activity')
};
