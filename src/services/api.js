// src/services/api.js
import { API_CONFIG } from '../config/api';

class ApiService {
  constructor() {
    this.config = API_CONFIG;
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Remove token
  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Generic fetch method with auth headers
  async fetch(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add auth token if available
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Handle unauthorized responses
    if (response.status === 401) {
      this.clearToken();
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async register(userData) {
    return this.fetch(this.config.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const data = await this.fetch(this.config.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data.data?.token) {
      this.setToken(data.data.token);
    }
    return data;
  }

  async getProfile() {
    return this.fetch(this.config.AUTH.PROFILE);
  }

  // Product methods
  async getProducts() {
    return this.fetch(this.config.PRODUCTS.ALL);
  }

  async getProduct(id) {
    return this.fetch(this.config.PRODUCTS.DETAIL(id));
  }

  // Cart methods
  async getCart() {
    return this.fetch(this.config.CART.GET);
  }

  async addToCart(productData) {
    return this.fetch(this.config.CART.ADD, {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateCartItem(id, quantity) {
    return this.fetch(this.config.CART.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeCartItem(id) {
    return this.fetch(this.config.CART.DELETE(id), {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.fetch(this.config.CART.CLEAR, {
      method: 'DELETE',
    });
  }

  // Order methods
  async getOrders() {
    return this.fetch(this.config.ORDERS.ALL);
  }

  async getOrder(id) {
    return this.fetch(this.config.ORDERS.DETAIL(id));
  }

  async completeOrder(id) {
    return this.fetch(this.config.ORDERS.COMPLETE(id), {
      method: 'PUT',
    });
  }

  // Address methods
  async getAddresses() {
    return this.fetch(this.config.ADDRESSES.ALL);
  }

  async addAddress(addressData) {
    return this.fetch(this.config.ADDRESSES.CREATE, {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  }

  async updateAddress(id, addressData) {
    return this.fetch(this.config.ADDRESSES.DETAIL(id), {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  }

  async deleteAddress(id) {
    return this.fetch(this.config.ADDRESSES.DETAIL(id), {
      method: 'DELETE',
    });
  }

  async setDefaultAddress(id) {
    return this.fetch(this.config.ADDRESSES.DEFAULT(id), {
      method: 'PUT',
    });
  }

  // Payment methods
  async createPaymentOrder(orderData) {
    return this.fetch(this.config.PAYMENTS.CREATE_ORDER, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async verifyPayment(paymentData) {
    return this.fetch(this.config.PAYMENTS.VERIFY_PAYMENT, {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Other methods
  async submitSellForm(formData) {
    return this.fetch(this.config.SELL, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async submitContactForm(formData) {
    return this.fetch(this.config.CONTACT, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async forgotPassword(email) {
    return this.fetch(this.config.AUTH.FORGOT_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyResetOTP(email, otp) {
    return this.fetch(this.config.AUTH.VERIFY_RESET_OTP, {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async resetPassword(email, password) {
    return this.fetch(this.config.AUTH.RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
}

// Create singleton instance
const apiService = new ApiService();
export default apiService;