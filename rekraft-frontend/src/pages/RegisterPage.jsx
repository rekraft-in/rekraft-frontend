// src/pages/RegisterPage.js - COMPLETE UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const { register, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log('✅ User already logged in, redirecting to account');
      navigate('/account', { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'email':
        if (!value) error = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'phone':
        if (!value) error = 'Phone number is required';
        else if (!/^\d{10}$/.test(value)) error = 'Phone must be 10 digits';
        break;
      case 'password':
        if (!value) error = 'Password is required';
        else if (value.length < 6) error = 'Password must be at least 6 characters';
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password';
        else if (value !== formData.password) error = 'Passwords do not match';
        break;
      default:
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    // Validate form
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }
    
    setLoading(true);
    console.log('📤 Submitting registration form...');

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );

    console.log('📥 Registration result:', result);

    if (result.success) {
      console.log('✅ Registration successful, redirecting...');
      // Form will be cleared by the redirect
      navigate('/account', { replace: true });
    } else {
      console.log('❌ Registration failed:', result.error);
      // Show error at the top of form
      setErrors(prev => ({ ...prev, form: result.error }));
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
    <div className="min-h-screen bg-white flex flex-col font-roboto">
      {/* Main content area */}
      <div className="flex flex-1 pt-20 lg:pt-20">
        {/* Left Banner */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[800px]">
          <img 
            src="/images/register.png"
            alt="Rekraft Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
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
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs font-light tracking-widest uppercase font-inter">
                SECURE • PROFESSIONAL • RELIABLE
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Register Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F5F2FA]">
          <div className="max-w-md w-full space-y-6">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 border border-gray-300"
                style={{ backgroundColor: '#8f1eae' }}
              >
                <span className="text-white font-semibold text-xl tracking-wide font-poppins">R</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-semibold text-gray-900 tracking-widest uppercase font-poppins"
              >
                REKRAFT
              </motion.h1>
            </div>

            {/* Register Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 tracking-widest uppercase font-poppins">
                  CREATE ACCOUNT
                </h2>
                <p className="text-gray-600 text-sm font-light">
                  Join Rekraft today and get started
                </p>
              </div>

              {/* Form Error */}
              {errors.form && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        {errors.form}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-widest font-inter">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-light placeholder-gray-400 disabled:bg-gray-50 ${
                      errors.name && touched.name
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8f1eae] focus:border-transparent'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && touched.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-widest font-inter">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-light placeholder-gray-400 disabled:bg-gray-50 ${
                      errors.email && touched.email
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8f1eae] focus:border-transparent'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && touched.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-widest font-inter">
                    PHONE NUMBER
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-light placeholder-gray-400 disabled:bg-gray-50 ${
                      errors.phone && touched.phone
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8f1eae] focus:border-transparent'
                    }`}
                    placeholder="10-digit phone number"
                  />
                  {errors.phone && touched.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-widest font-inter">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-light placeholder-gray-400 disabled:bg-gray-50 ${
                      errors.password && touched.password
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8f1eae] focus:border-transparent'
                    }`}
                    placeholder="At least 6 characters"
                  />
                  {errors.password && touched.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-widest font-inter">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                    className={`w-full px-4 py-3.5 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-light placeholder-gray-400 disabled:bg-gray-50 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-200 focus:ring-[#8f1eae] focus:border-transparent'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="pt-2">
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
                        Creating Account...
                      </div>
                    ) : (
                      'CREATE ACCOUNT'
                    )}
                  </motion.button>
                </div>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <div className="px-4 text-gray-500 text-xs font-light uppercase">OR</div>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm font-light">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium hover:underline transition-colors text-[#8f1eae]"
                  >
                    SIGN IN HERE
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Security Features */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#8f1eae]/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#8f1eae]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-700 uppercase tracking-widest mb-1">
                    SECURE & PRIVATE
                  </p>
                  <p className="text-xs text-gray-600">
                    Your information is encrypted and never shared with third parties.
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