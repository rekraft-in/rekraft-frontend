// src/pages/LoginPage.js - COMPLETE UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, user, loading: authLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path or default to account
  const from = location.state?.from?.pathname || '/account';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('✅ User already logged in, redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.email || !formData.password) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setLocalError('');

    console.log('📤 Submitting login form...');

    const result = await login(formData.email, formData.password);

    console.log('📥 Login result:', result);

    if (result.success) {
      console.log('✅ Login successful, redirecting to:', from);
      
      // Clear form
      setFormData({ email: '', password: '' });
      
      // Navigate to intended page
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);
    } else {
      console.log('❌ Login failed:', result.error);
      setLocalError(result.error || 'Login failed. Please try again.');
    }

    setLoading(false);
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8f1eae] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      {/* Main content area */}
      <div className="flex flex-1 pt-20 lg:pt-20">
        {/* Left Banner */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[800px]">
          <img 
            src="/images/login.png"
            alt="Rekraft Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
            }}
          />
          
          {/* Secure text overlay */}
          <div className="absolute bottom-8 left-0 right-0 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-3 text-white/90"
            >
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#8f1eae' }}></div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#8f1eae', animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#8f1eae', animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs font-light tracking-widest uppercase font-inter">
                Secure • Professional • Reliable
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F5F2FA]">
          <div className="max-w-md w-full space-y-6">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-200"
                style={{ backgroundColor: '#8f1eae' }}
              >
                <span className="text-white font-normal text-xl tracking-wide font-poppins">R</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins"
              >
                Rekraft
              </motion.h1>
            </div>

            {/* Login Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3 tracking-wide uppercase font-poppins">
                  Welcome Back
                </h2>
                <p className="text-gray-600 text-sm sm:text-base font-light">
                  Sign in to access your account
                </p>
              </div>

              {/* Error Messages */}
              {(localError || authError) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {localError || authError}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide font-inter">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f1eae] focus:border-transparent transition-all duration-300 text-base font-light placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide font-inter">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    minLength="6"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8f1eae] focus:border-transparent transition-all duration-300 text-base font-light placeholder-gray-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-[#8f1eae] focus:ring-[#8f1eae] focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-600 font-light">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium hover:underline transition-colors text-[#8f1eae]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full bg-[#8f1eae] text-white py-3.5 px-4 rounded-lg font-medium text-sm tracking-wide uppercase hover:bg-[#7a1a99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-600 text-sm font-light">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium hover:underline transition-colors text-[#8f1eae]"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Security Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#8f1eae]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#8f1eae]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-700 uppercase tracking-widest mb-1">
                    Secure Login
                  </p>
                  <p className="text-xs text-gray-600">
                    Your login information is encrypted and secure. We never share your data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}