import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [orders, setOrders] = useState([]);

  // Check if user is logged in on app start
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        console.log('🔄 Checking user login...');
        const response = await fetch('http://localhost:3000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('✅ User data from /api/auth/me:', userData.data);
          
          setUser(userData.data);
          
          // Fetch all user data after login
          await fetchUserData(token);
        } else {
          console.log('❌ /api/auth/me failed, clearing storage');
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
  const fetchUserData = async (token) => {
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

  const addAddress = async (addressData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, error: 'Please login to manage addresses' };
      }

      const response = await fetch('http://localhost:3000/api/user/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh addresses after adding
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Add address error:', error);
      return { success: false, error: 'Failed to add address' };
    }
  };

  const updateAddress = async (addressId, addressData) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3000/api/user/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh addresses after updating
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Update address error:', error);
      return { success: false, error: 'Failed to update address' };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3000/api/user/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh addresses after deleting
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Delete address error:', error);
      return { success: false, error: 'Failed to delete address' };
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`http://localhost:3000/api/user/addresses/${addressId}/default`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Refresh addresses after setting default
        await fetchAddresses();
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error('Set default address error:', error);
      return { success: false, error: 'Failed to set default address' };
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log('No token available for fetching addresses');
        return { success: false, error: 'Please login to fetch addresses' };
      }

      const response = await fetch('http://localhost:3000/api/user/addresses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🏠 Addresses fetched successfully:', data.data?.addresses);
        
        // Update user state with addresses
        setUser(prevUser => {
          if (prevUser) {
            return {
              ...prevUser,
              addresses: data.data?.addresses || []
            };
          }
          return prevUser;
        });
        
        return { success: true, addresses: data.data?.addresses || [] };
      } else {
        console.log('Failed to fetch addresses');
        return { success: false, error: 'Failed to fetch addresses' };
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      return { success: false, error: 'Network error fetching addresses' };
    }
  };

  // ========== ORDER FUNCTIONS ==========
  const fetchOrders = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log('No token available for fetching orders');
        return;
      }

      const response = await fetch('http://localhost:3000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data);
        console.log('📦 Orders fetched successfully:', data.data);
      } else if (response.status === 401) {
        console.log('User not authenticated for orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: 'Please login to view orders' };
      }

      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, data: data.data };
      } else {
        const error = await response.json();
        return { success: false, message: error.error };
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const createOrder = async (orderData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { success: false, message: 'Please login to create order' };
      }

      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const data = await response.json();
        // Refresh orders after creating new one
        await fetchOrders();
        return { success: true, data: data.data, message: data.message };
      } else {
        const error = await response.json();
        return { success: false, message: error.error };
      }
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  // ========== CART FUNCTIONS ==========
  const fetchCart = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.log('No token available for fetching cart');
        return;
      }

      const response = await fetch('http://localhost:3000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        console.log('🛒 Cart fetched successfully:', data.cart);
      } else if (response.status === 401) {
        console.log('User not authenticated for cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return { 
          success: false, 
          message: 'Please login to add items to cart' 
        };
      }

      const response = await fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        console.log('✅ Item added to cart:', data.cart);
        return { success: true, message: data.message };
      } else if (response.status === 401) {
        return { success: false, message: 'Please login to add items to cart' };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`http://localhost:3000/api/cart/item/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`http://localhost:3000/api/cart/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ quantity })
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch('http://localhost:3000/api/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCart(data.cart);
        return { success: true, message: data.message };
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // ========== AUTH FUNCTIONS ==========
  const register = async (name, email, password, phone) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        // Fetch all user data after registration
        await fetchUserData(data.data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data));
        setUser(data.data);
        // Fetch all user data after login
        await fetchUserData(data.data.token);
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCart({ items: [], totalPrice: 0 });
    setOrders([]); // Clear orders on logout
  };

  const updateProfile = async (name, phone) => {
    try {
      const token = getAuthToken();
      const response = await fetch('http://localhost:3000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, name, phone };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, message: data.message };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // ========== CONTEXT VALUE ==========
  const value = {
    // User state
    user,
    cart,
    orders,
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
    
    // Address functions (NEW)
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