// src/services/api.js - COMPLETE UPDATED VERSION
import { API_CONFIG } from '../config/api';

class ApiService {
  constructor() {
    this.config = API_CONFIG;
    this.token = localStorage.getItem('token');
    this.baseURL = this.config.BASE_URL;
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
      console.log('✅ Token stored in localStorage');
    }
  }

  // Remove token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
    console.log('✅ Token cleared from localStorage');
  }

  // Generic fetch method with comprehensive error handling
  async fetch(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
      console.log('🔑 Adding auth token to request');
    }

    // Configure fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      console.log('🌐 Making request to:', url);
      console.log('📤 Request options:', {
        method: options.method || 'GET',
        headers: { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : undefined }
      });

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('📥 Response status:', response.status, response.statusText);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('❌ Non-JSON response:', text.substring(0, 200));
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        const errorMsg = data.error || data.message || `HTTP ${response.status}`;
        console.error('❌ API Error:', errorMsg);
        throw new Error(errorMsg);
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        console.error('⏰ Request timeout');
        throw new Error('Request timeout. Please check your connection.');
      }
      
      if (error.message.includes('Failed to fetch')) {
        console.error('🌐 Network error:', error.message);
        throw new Error('Network error. Please check your internet connection.');
      }
      
      console.error('❌ Fetch error:', error.message);
      throw error;
    }
  }

  // ========== AUTH METHODS ==========
  async register(userData) {
    try {
      console.log('🔄 Registering user:', userData.email);
      const data = await this.fetch(this.config.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      console.log('✅ Registration successful');
      return data;
    } catch (error) {
      console.error('❌ Registration failed:', error.message);
      throw error;
    }
  }

  async login(credentials) {
    try {
      console.log('🔄 Logging in user:', credentials.email);
      const data = await this.fetch(this.config.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      if (data.success && data.data?.token) {
        this.setToken(data.data.token);
        console.log('✅ Login successful, token set');
      } else {
        console.warn('⚠️ Login response missing token:', data);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      throw error;
    }
  }

  async getProfile() {
    try {
      console.log('🔄 Fetching user profile');
      const data = await this.fetch(this.config.AUTH.PROFILE);
      console.log('✅ Profile fetched successfully');
      return data;
    } catch (error) {
      console.error('❌ Profile fetch failed:', error.message);
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      console.log('🔄 Sending forgot password email to:', email);
      const data = await this.fetch(this.config.AUTH.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      console.log('✅ Forgot password email sent');
      return data;
    } catch (error) {
      console.error('❌ Forgot password failed:', error.message);
      throw error;
    }
  }

  async verifyResetOTP(email, otp) {
    try {
      console.log('🔄 Verifying OTP for:', email);
      const data = await this.fetch(this.config.AUTH.VERIFY_RESET_OTP, {
        method: 'POST',
        body: JSON.stringify({ email, otp }),
      });
      console.log('✅ OTP verification result:', data.success);
      return data;
    } catch (error) {
      console.error('❌ OTP verification failed:', error.message);
      throw error;
    }
  }

  async resetPassword(email, password) {
    try {
      console.log('🔄 Resetting password for:', email);
      const data = await this.fetch(this.config.AUTH.RESET_PASSWORD, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      console.log('✅ Password reset successful');
      return data;
    } catch (error) {
      console.error('❌ Password reset failed:', error.message);
      throw error;
    }
  }

  // ========== PRODUCT METHODS ==========
  async getProducts() {
    try {
      console.log('🔄 Fetching products');
      return await this.fetch(this.config.PRODUCTS.ALL);
    } catch (error) {
      console.error('❌ Products fetch failed:', error.message);
      throw error;
    }
  }

  async getProduct(id) {
    try {
      console.log('🔄 Fetching product:', id);
      return await this.fetch(this.config.PRODUCTS.DETAIL(id));
    } catch (error) {
      console.error('❌ Product fetch failed:', error.message);
      throw error;
    }
  }

  // ========== CART METHODS ==========
  async getCart() {
    try {
      console.log('🔄 Fetching cart');
      return await this.fetch(this.config.CART.GET);
    } catch (error) {
      console.error('❌ Cart fetch failed:', error.message);
      throw error;
    }
  }

  async addToCart(productData) {
    try {
      console.log('🔄 Adding to cart:', productData);
      return await this.fetch(this.config.CART.ADD, {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    } catch (error) {
      console.error('❌ Add to cart failed:', error.message);
      throw error;
    }
  }

  async updateCartItem(id, quantity) {
    try {
      console.log('🔄 Updating cart item:', { id, quantity });
      return await this.fetch(this.config.CART.UPDATE(id), {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
    } catch (error) {
      console.error('❌ Update cart item failed:', error.message);
      throw error;
    }
  }

  async removeCartItem(id) {
    try {
      console.log('🔄 Removing cart item:', id);
      return await this.fetch(this.config.CART.DELETE(id), {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('❌ Remove cart item failed:', error.message);
      throw error;
    }
  }

  async clearCart() {
    try {
      console.log('🔄 Clearing cart');
      return await this.fetch(this.config.CART.CLEAR, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('❌ Clear cart failed:', error.message);
      throw error;
    }
  }

  // ========== ORDER METHODS ==========
  async getOrders() {
    try {
      console.log('🔄 Fetching orders');
      return await this.fetch(this.config.ORDERS.ALL);
    } catch (error) {
      console.error('❌ Orders fetch failed:', error.message);
      throw error;
    }
  }

  async getOrder(id) {
    try {
      console.log('🔄 Fetching order:', id);
      return await this.fetch(this.config.ORDERS.DETAIL(id));
    } catch (error) {
      console.error('❌ Order fetch failed:', error.message);
      throw error;
    }
  }

  async createPaymentOrder(orderData) {
    try {
      console.log('🔄 Creating payment order');
      return await this.fetch(this.config.PAYMENTS.CREATE_ORDER, {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error('❌ Create payment order failed:', error.message);
      throw error;
    }
  }

  async verifyPayment(paymentData) {
    try {
      console.log('🔄 Verifying payment');
      return await this.fetch(this.config.PAYMENTS.VERIFY_PAYMENT, {
        method: 'POST',
        body: JSON.stringify(paymentData),
      });
    } catch (error) {
      console.error('❌ Payment verification failed:', error.message);
      throw error;
    }
  }

  // ========== ADDRESS METHODS ==========
  async getAddresses() {
    try {
      console.log('🔄 Fetching addresses');
      return await this.fetch(this.config.ADDRESSES.ALL);
    } catch (error) {
      console.error('❌ Addresses fetch failed:', error.message);
      throw error;
    }
  }

  async addAddress(addressData) {
    try {
      console.log('🔄 Adding address');
      return await this.fetch(this.config.ADDRESSES.CREATE, {
        method: 'POST',
        body: JSON.stringify(addressData),
      });
    } catch (error) {
      console.error('❌ Add address failed:', error.message);
      throw error;
    }
  }

  async updateAddress(id, addressData) {
    try {
      console.log('🔄 Updating address:', id);
      return await this.fetch(this.config.ADDRESSES.DETAIL(id), {
        method: 'PUT',
        body: JSON.stringify(addressData),
      });
    } catch (error) {
      console.error('❌ Update address failed:', error.message);
      throw error;
    }
  }

  async deleteAddress(id) {
    try {
      console.log('🔄 Deleting address:', id);
      return await this.fetch(this.config.ADDRESSES.DETAIL(id), {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('❌ Delete address failed:', error.message);
      throw error;
    }
  }

  async setDefaultAddress(id) {
    try {
      console.log('🔄 Setting default address:', id);
      return await this.fetch(this.config.ADDRESSES.DEFAULT(id), {
        method: 'PUT',
      });
    } catch (error) {
      console.error('❌ Set default address failed:', error.message);
      throw error;
    }
  }

  // ========== OTHER METHODS ==========
  async submitSellForm(formData) {
    try {
      console.log('🔄 Submitting sell form');
      return await this.fetch(this.config.SELL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('❌ Sell form submission failed:', error.message);
      throw error;
    }
  }

  async submitContactForm(formData) {
    try {
      console.log('🔄 Submitting contact form');
      return await this.fetch(this.config.CONTACT, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error('❌ Contact form submission failed:', error.message);
      throw error;
    }
  }

  // Test connection method
  async testConnection() {
    try {
      console.log('🔄 Testing backend connection');
      const response = await fetch(`${this.baseURL}/api/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('✅ Connection test result:', data);
      return data;
    } catch (error) {
      console.error('❌ Connection test failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService;