import React, { createContext, useState, useContext, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);

  // Check if user is logged in on app start
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUserData = localStorage.getItem('user');

      if (token && storedUserData) {
        console.log('🔄 Checking user login...');
        try {
          const data = await apiService.getProfile();
          const userData = data.data;
          
          console.log('✅ User data from API:', userData);
          setUser(userData);
          
          // Fetch all user data after login
          await fetchUserData();
        } catch (error) {
          console.log('❌ API call failed, clearing storage');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('🔐 No token or user data found');
      }
    } catch (error) {
      console.error('❌ Error checking auth:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all user data (addresses, cart, orders)
  const fetchUserData = async () => {
    try {
      // Fetch addresses
      await fetchAddresses();
      
      // Fetch cart
      await fetchCart();
      
      // Fetch orders
      await fetchOrders();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // ========== ADDRESS FUNCTIONS ==========
  const addAddress = async (addressData) => {
    try {
      const data = await apiService.addAddress(addressData);
      
      if (data.success) {
        // Refresh addresses after adding
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Add address error:', error);
      return { success: false, error: error.message || 'Failed to add address' };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      const data = await apiService.updateAddress(addressId, addressData);
      
      if (data.success) {
        // Refresh addresses after updating
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Update address error:', error);
      return { success: false, error: error.message || 'Failed to update address' };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      await apiService.deleteAddress(addressId);
      
      // Refresh addresses after deleting
      await fetchAddresses();
      return { success: true, message: 'Address deleted successfully' };
    } catch (error) {
      console.error('Delete address error:', error);
      return { success: false, error: error.message || 'Failed to delete address' };
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const data = await apiService.setDefaultAddress(addressId);
      
      if (data.success) {
        // Refresh addresses after setting default
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Set default address error:', error);
      return { success: false, error: error.message || 'Failed to set default address' };
    }
  };

  const fetchAddresses = async () => {
    try {
      const data = await apiService.getAddresses();
      
      if (data.success) {
        console.log('🏠 Addresses fetched successfully:', data.data?.addresses);
        
        const addressesList = data.data?.addresses || data.data || [];
        setAddresses(addressesList);
        
        // Update user state with addresses
        setUser(prevUser => {
          if (prevUser) {
            return {
              ...prevUser,
              addresses: addressesList
            };
          }
          return prevUser;
        });
        
        return { success: true, addresses: addressesList };
      } else {
        console.log('Failed to fetch addresses');
        return { success: false, error: data.error || 'Failed to fetch addresses' };
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return { success: false, error: error.message || 'Network error fetching addresses' };
    }
  };

  // ========== ORDER FUNCTIONS ==========
  const fetchOrders = async () => {
    try {
      const data = await apiService.getOrders();
      setOrders(data.data || data);
      console.log('📦 Orders fetched successfully:', data.data || data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const data = await apiService.getOrder(orderId);
      
      if (data.success) {
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.error || 'Failed to fetch order' };
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, message: error.message || 'Network error. Please try again.' };
    }
  };

  const createOrder = async (orderData) => {
    try {
      const data = await apiService.createPaymentOrder(orderData);
      
      if (data.success) {
        // Refresh orders after creating new one
        await fetchOrders();
        return { success: true, data: data.data, message: data.message };
      } else {
        return { success: false, message: data.error || 'Failed to create order' };
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, message: error.message || 'Network error. Please try again.' };
    }
  };

  // ========== CART FUNCTIONS ==========
  const fetchCart = async () => {
    try {
      const data = await apiService.getCart();
      setCart(data.cart || data);
      console.log('🛒 Cart fetched successfully:', data.cart || data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const data = await apiService.addToCart({ productId, quantity });
      
      if (data.success) {
        setCart(data.cart || data);
        console.log('✅ Item added to cart:', data.cart || data);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Failed to add to cart' };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: error.message || 'Network error. Please try again.' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const data = await apiService.removeCartItem(itemId);
      
      if (data.success) {
        setCart(data.cart || data);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Failed to remove item' };
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, message: error.message || 'Failed to remove item' };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const data = await apiService.updateCartItem(itemId, quantity);
      
      if (data.success) {
        setCart(data.cart || data);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Failed to update cart' };
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      return { success: false, message: error.message || 'Failed to update cart' };
    }
  };

  const clearCart = async () => {
    try {
      const data = await apiService.clearCart();
      
      if (data.success) {
        setCart(data.cart || data);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Failed to clear cart' };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, message: error.message || 'Failed to clear cart' };
    }
  };

  // ========== AUTH FUNCTIONS ==========
  const register = async (name, email, password, phone) => {
    try {
      const data = await apiService.register({ name, email, password, phone });

      if (data.success) {
        // apiService.login already sets the token internally
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        // Fetch all user data after registration
        await fetchUserData();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error. Please try again.' };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiService.login({ email, password });

      if (data.success) {
        // apiService.login already sets the token internally
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        // Fetch all user data after login
        await fetchUserData();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: error.message || 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    apiService.clearToken();
    localStorage.removeItem('user');
    setUser(null);
    setCart({ items: [], totalPrice: 0 });
    setOrders([]);
    setAddresses([]);
  };

  const updateProfile = async (name, phone) => {
    try {
      // Note: You'll need to add updateProfile method to apiService
      // For now, we'll update local state
      const updatedUser = { ...user, name, phone };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      return { success: false, error: error.message || 'Network error. Please try again.' };
    }
  };

  // ========== CONTEXT VALUE ==========
  const value = {
    // User state
    user,
    cart,
    orders,
    addresses,
    loading,
    
    // Auth functions
    register,
    login,
    logout,
    updateProfile,
    
    // Cart functions
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    fetchCart,
    
    // Order functions
    fetchOrders,
    getOrderById,
    createOrder,
    
    // Address functions
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    fetchAddresses
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};