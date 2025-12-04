// src/context/AuthContext.js - COMPLETE UPDATED VERSION
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import apiService from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState('');

  // Initialize auth state from localStorage
  const initializeAuth = useCallback(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        console.log('🔍 Found stored auth data');
        apiService.setToken(token);
        const userData = JSON.parse(storedUser);
        setUser(userData);
        console.log('✅ Auth initialized from localStorage:', userData.email);
      } else {
        console.log('🔍 No stored auth data found');
        setUser(null);
      }
    } catch (err) {
      console.error('❌ Error initializing auth:', err);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  }, []);

  // Clear all auth data
  const clearAuthData = () => {
    console.log('🧹 Clearing auth data');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    apiService.clearToken();
    setUser(null);
    setCart({ items: [], totalPrice: 0 });
    setOrders([]);
    setAddresses([]);
    setError('');
  };

  // Check user authentication status
  const checkAuthStatus = useCallback(async () => {
    if (!apiService.token) {
      console.log('🔐 No token available');
      return false;
    }

    try {
      console.log('🔍 Checking auth status...');
      const data = await apiService.getProfile();
      
      if (data.success && data.data) {
        console.log('✅ User is authenticated:', data.data.email);
        setUser(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        return true;
      } else {
        console.log('❌ Auth check failed - invalid response');
        clearAuthData();
        return false;
      }
    } catch (error) {
      console.log('❌ Auth check failed:', error.message);
      if (error.message.includes('Unauthorized') || error.message.includes('401')) {
        clearAuthData();
      }
      return false;
    }
  }, []);

  // Initialize on component mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Periodically check auth status when user is logged in
  useEffect(() => {
    if (user && apiService.token) {
      const interval = setInterval(() => {
        checkAuthStatus();
      }, 5 * 60 * 1000); // Check every 5 minutes

      return () => clearInterval(interval);
    }
  }, [user, checkAuthStatus]);

  // ========== AUTH FUNCTIONS ==========
  const register = async (name, email, password, phone) => {
    setAuthLoading(true);
    setError('');
    
    try {
      console.log('📝 Starting registration for:', email);
      const data = await apiService.register({ name, email, password, phone });

      if (data.success) {
        console.log('✅ Registration successful');
        
        // Auto-login after successful registration
        const loginResult = await login(email, password);
        if (loginResult.success) {
          return { 
            success: true, 
            message: 'Registration successful! You are now logged in.' 
          };
        } else {
          return loginResult;
        }
      } else {
        const errorMsg = data.error || 'Registration failed. Please try again.';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      const errorMsg = error.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    setError('');
    
    try {
      console.log('🔐 Attempting login for:', email);
      const data = await apiService.login({ email, password });

      if (data.success && data.data?.token) {
        console.log('✅ Login successful');
        
        // Store user data
        const userData = data.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Fetch user data in background
        setTimeout(() => {
          fetchUserData();
        }, 1000);
        
        return { 
          success: true, 
          message: 'Login successful!',
          data: userData 
        };
      } else {
        const errorMsg = data.error || 'Login failed. Invalid credentials.';
        setError(errorMsg);
        return { 
          success: false, 
          error: errorMsg 
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      let errorMsg = error.message || 'Login failed. Please try again.';
      
      // User-friendly error messages
      if (errorMsg.includes('Network error') || errorMsg.includes('Failed to fetch')) {
        errorMsg = 'Network error. Please check your internet connection.';
      } else if (errorMsg.includes('Invalid email or password')) {
        errorMsg = 'Invalid email or password. Please try again.';
      } else if (errorMsg.includes('timeout')) {
        errorMsg = 'Request timeout. Please try again.';
      }
      
      setError(errorMsg);
      return { 
        success: false, 
        error: errorMsg 
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    clearAuthData();
  };

  // ========== USER DATA FUNCTIONS ==========
  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      console.log('🔄 Fetching user data...');
      await Promise.allSettled([
        fetchAddresses(),
        fetchCart(),
        fetchOrders()
      ]);
      console.log('✅ User data fetched successfully');
    } catch (error) {
      console.error('❌ Error fetching user data:', error);
    }
  };

  const fetchAddresses = async () => {
    try {
      console.log('🔄 Fetching addresses...');
      const data = await apiService.getAddresses();
      
      if (data.success) {
        const addressesList = data.data?.addresses || data.data || [];
        setAddresses(addressesList);
        console.log('✅ Addresses fetched:', addressesList.length);
        return { success: true, addresses: addressesList };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('❌ Error fetching addresses:', error);
      return { success: false, error: error.message };
    }
  };

  const fetchCart = async () => {
    try {
      console.log('🔄 Fetching cart...');
      const data = await apiService.getCart();
      
      if (data.success || data.cart) {
        setCart(data.cart || data);
        console.log('✅ Cart fetched:', data.cart || data);
        return { success: true, cart: data.cart || data };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('❌ Error fetching cart:', error);
      return { success: false, error: error.message };
    }
  };

  const fetchOrders = async () => {
    try {
      console.log('🔄 Fetching orders...');
      const data = await apiService.getOrders();
      
      if (data.success || data.data) {
        setOrders(data.data || data);
        console.log('✅ Orders fetched:', (data.data || data).length);
        return { success: true, orders: data.data || data };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      return { success: false, error: error.message };
    }
  };

  // ========== CART FUNCTIONS ==========
  const addToCart = async (productId, quantity = 1) => {
    try {
      console.log('🛒 Adding to cart:', { productId, quantity });
      const data = await apiService.addToCart({ productId, quantity });
      
      if (data.success) {
        setCart(data.cart || data);
        console.log('✅ Item added to cart');
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error };
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      return { success: false, message: error.message };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      console.log('🛒 Removing from cart:', itemId);
      const data = await apiService.removeCartItem(itemId);
      
      if (data.success) {
        setCart(data.cart || data);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error };
    } catch (error) {
      console.error('❌ Error removing from cart:', error);
      return { success: false, message: error.message };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      console.log('🛒 Updating cart item:', { itemId, quantity });
      const data = await apiService.updateCartItem(itemId, quantity);
      
      if (data.success) {
        setCart(data.cart || data);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error };
    } catch (error) {
      console.error('❌ Error updating cart:', error);
      return { success: false, message: error.message };
    }
  };

  const clearCart = async () => {
    try {
      console.log('🛒 Clearing cart');
      const data = await apiService.clearCart();
      
      if (data.success) {
        setCart(data.cart || data);
        return { success: true, message: data.message };
      }
      return { success: false, message: data.error };
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      return { success: false, message: error.message };
    }
  };

  // ========== ADDRESS FUNCTIONS ==========
  const addAddress = async (addressData) => {
    try {
      console.log('🏠 Adding address:', addressData);
      const data = await apiService.addAddress(addressData);
      
      if (data.success) {
        await fetchAddresses();
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('❌ Error adding address:', error);
      return { success: false, error: error.message };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      console.log('🏠 Updating address:', addressId);
      const data = await apiService.updateAddress(addressId, addressData);
      
      if (data.success) {
        await fetchAddresses();
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('❌ Error updating address:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      console.log('🏠 Deleting address:', addressId);
      await apiService.deleteAddress(addressId);
      await fetchAddresses();
      return { success: true, message: 'Address deleted successfully' };
    } catch (error) {
      console.error('❌ Error deleting address:', error);
      return { success: false, error: error.message };
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      console.log('🏠 Setting default address:', addressId);
      const data = await apiService.setDefaultAddress(addressId);
      
      if (data.success) {
        await fetchAddresses();
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('❌ Error setting default address:', error);
      return { success: false, error: error.message };
    }
  };

  // ========== ORDER FUNCTIONS ==========
  const createOrder = async (orderData) => {
    try {
      console.log('📦 Creating order');
      const data = await apiService.createPaymentOrder(orderData);
      
      if (data.success) {
        await fetchOrders();
        return { success: true, data: data.data, message: data.message };
      }
      return { success: false, message: data.error };
    } catch (error) {
      console.error('❌ Error creating order:', error);
      return { success: false, message: error.message };
    }
  };

  // ========== CONTEXT VALUE ==========
  const value = {
    // State
    user,
    cart,
    orders,
    addresses,
    loading,
    authLoading,
    error,
    
    // Auth functions
    register,
    login,
    logout,
    checkAuthStatus,
    clearAuthData,
    
    // Data fetching
    fetchUserData,
    fetchAddresses,
    fetchCart,
    fetchOrders,
    
    // Cart functions
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    
    // Address functions
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    
    // Order functions
    createOrder,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};