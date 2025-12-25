// src/config/api.js

// Use environment variable or fallback to production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://rekraft-backend.onrender.com';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  
  // Auth endpoints
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    PROFILE: `${API_BASE_URL}/api/auth/me`,
    FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
    VERIFY_RESET_OTP: `${API_BASE_URL}/api/auth/verify-reset-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  },
  
  // Product endpoints
  PRODUCTS: {
    ALL: `${API_BASE_URL}/api/products`,
    DETAIL: (id) => `${API_BASE_URL}/api/products/${id}`,
  },
  
  // Cart endpoints
  CART: {
    GET: `${API_BASE_URL}/api/cart`,
    ADD: `${API_BASE_URL}/api/cart/add`,
    UPDATE: (id) => `${API_BASE_URL}/api/cart/item/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/cart/item/${id}`,
    CLEAR: `${API_BASE_URL}/api/cart/clear`,
  },
  
  // Order endpoints
  ORDERS: {
    ALL: `${API_BASE_URL}/api/orders`,
    DETAIL: (id) => `${API_BASE_URL}/api/orders/${id}`,
    COMPLETE: (id) => `${API_BASE_URL}/api/orders/${id}/complete`,
  },
  
  // Address endpoints
  ADDRESSES: {
    ALL: `${API_BASE_URL}/api/user/addresses`,
    DETAIL: (id) => `${API_BASE_URL}/api/user/addresses/${id}`,
    DEFAULT: (id) => `${API_BASE_URL}/api/user/addresses/${id}/default`,
    CREATE: `${API_BASE_URL}/api/user/addresses`,
  },
  
  // Payment endpoints
  PAYMENTS: {
    CREATE_ORDER: `${API_BASE_URL}/api/payments/create-order`,
    VERIFY_PAYMENT: `${API_BASE_URL}/api/payments/verify-payment`,
  },
  
  // Other endpoints
  SELL: `${API_BASE_URL}/api/sell`,
  CONTACT: `${API_BASE_URL}/api/contact/send`,
};

export default API_CONFIG;