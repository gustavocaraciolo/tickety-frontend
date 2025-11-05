const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string | string[]>;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    country_id: number;
    state_id: number;
    preferred_language: string;
    role: 'buyer' | 'organizer';
  }) {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    try {
      const response = await this.request<{ user: any; token: string }>('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.success && response.data?.token) {
        this.setToken(response.data.token);
      }
      
      return response;
    } catch (error: any) {
      // Se o erro já tem uma mensagem do backend, retornar ela
      if (error.message) {
        return {
          success: false,
          message: error.message,
        };
      }
      // Se não, lançar o erro novamente
      throw error;
    }
  }

  async logout() {
    const response = await this.request('/logout', {
      method: 'POST',
    });
    this.removeToken();
    return response;
  }

  async forgotPassword(email: string) {
    try {
      const response = await this.request('/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return response;
    } catch (error: any) {
      if (error.message) {
        return {
          success: false,
          message: error.message,
        };
      }
      throw error;
    }
  }

  async getMe(): Promise<ApiResponse<any>> {
    return this.request('/user');
  }

  async updateProfile(data: {
    name: string;
    email: string;
    phone?: string;
    country_id?: number;
    state_id?: number;
  }): Promise<ApiResponse<any>> {
    return this.request('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateOrganizerProfile(data: {
    company_name?: string;
    bio?: string;
    website?: string;
    tax_id?: string;
    social_links?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      linkedin?: string;
    };
  }): Promise<ApiResponse<any>> {
    return this.request('/user/organizer-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updatePassword(data: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/user/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateLanguage(data: {
    preferred_language: string;
  }): Promise<ApiResponse<any>> {
    return this.request('/user/language', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Dashboard endpoints
  async getDashboard() {
    return this.request('/dashboard');
  }

  // Home endpoints
  async getHomeData(countryId?: number) {
    const endpoint = countryId ? `/home?country_id=${countryId}` : '/home';
    return this.request(endpoint);
  }

  // Categories endpoints
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(slug: string) {
    return this.request(`/categories/${slug}`);
  }

  // Events endpoints
  async getEvents(params?: string | {
    category_id?: number;
    country_id?: number;
    state_id?: number;
    search?: string;
    date_from?: string;
    date_to?: string;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
    per_page?: number;
    page?: number;
  }) {
    if (typeof params === 'string') {
      const endpoint = params ? `/events?${params}` : '/events';
      return this.request(endpoint);
    }
    
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/events?${queryString}` : '/events';
    
    return this.request(endpoint);
  }

  async getEvent(slug: string) {
    return this.request(`/events/${slug}`);
  }

  async createEvent(data: any) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEvent(slug: string, data: any) {
    return this.request(`/events/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEvent(slug: string) {
    return this.request(`/events/${slug}`, {
      method: 'DELETE',
    });
  }

  // Cart endpoints
  async getCart(sessionId?: string) {
    const headers: Record<string, string> = {};
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }
    return this.request('/cart', {
      headers,
    });
  }

  async addCartItem(ticketId: number, quantity: number, sessionId?: string) {
    const headers: Record<string, string> = {};
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }
    return this.request('/cart/items', {
      method: 'POST',
      headers,
      body: JSON.stringify({ ticket_id: ticketId, quantity }),
    });
  }

  async updateCartItem(itemId: number, quantity: number, sessionId?: string) {
    const headers: Record<string, string> = {};
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }
    return this.request(`/cart/items/${itemId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ quantity }),
    });
  }

  async removeCartItem(itemId: number, sessionId?: string) {
    const headers: Record<string, string> = {};
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }
    return this.request(`/cart/items/${itemId}`, {
      method: 'DELETE',
      headers,
    });
  }

  async clearCart(sessionId?: string) {
    const headers: Record<string, string> = {};
    if (sessionId) {
      headers['X-Session-Id'] = sessionId;
    }
    return this.request('/cart', {
      method: 'DELETE',
      headers,
    });
  }

  // Orders endpoints
  async getOrders() {
    return this.request('/orders');
  }

  async getOrder(orderNumber: string) {
    return this.request(`/orders/${orderNumber}`);
  }

  async createOrder(data: {
    items: Array<{
      ticket_id: number;
      quantity: number;
    }>;
    billing_address: {
      name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      country: string;
      postal_code: string;
    };
    customer_info: {
      name: string;
      email: string;
      phone: string;
    };
  }) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
