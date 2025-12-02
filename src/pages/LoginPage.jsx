import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user was redirected from sell page
  const from = location.state?.from?.pathname === '/sell' ? '/sell' : '/account';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect to the intended page after successful login
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      {/* Main content area with proper spacing for dynamic navbar height */}
      <div className="flex flex-1 pt-20 lg:pt-20">
        {/* Left Banner with your PNG image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[800px]">
          {/* Your PNG Banner */}
          <img 
            src="/images/login.png"
            alt="Rekraft Banner"
            className="w-full h-full object-cover"
          />

          {/* Secure text overlay - positioned at bottom */}
          <div className="absolute bottom-8 left-0 right-0 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-3 text-white/90"
            >
              <div className="flex space-x-1">
                <div 
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: '#8f1eae' }}
                ></div>
                <div 
                  className="w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ 
                    backgroundColor: '#8f1eae',
                    animationDelay: '0.2s' 
                  }}
                ></div>
                <div 
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ 
                    backgroundColor: '#8f1eae',
                    animationDelay: '0.4s' 
                  }}
                ></div>
              </div>
              <span className="text-xs font-light tracking-widest uppercase font-inter">
                Secure • Professional • Reliable
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-[#F5F2FA]">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
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
              className="bg-white rounded-lg border border-gray-200 p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-wide uppercase font-poppins">
                  Welcome back
                </h2>
                <p className="text-gray-600 text-base font-light font-roboto">
                  {from === '/sell' ? 'Continue with your sell request' : 'Sign in to your account'}
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 rounded-lg mb-6 border-2 text-sm font-roboto"
                  style={{ 
                    backgroundColor: '#FDF2F8',
                    borderColor: '#FBCFE8',
                    color: '#BE185D'
                  }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide font-inter">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8f1eae] focus:ring-1 focus:ring-[#8f1eae] transition-all duration-300 text-sm font-light font-roboto"
                    placeholder="Enter your email"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8f1eae] focus:ring-1 focus:ring-[#8f1eae] transition-all duration-300 text-sm font-light font-roboto"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center font-roboto">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 focus:ring-[#8f1eae] focus:border-[#8f1eae] text-[#8f1eae]"
                    />
                    <span className="ml-2 text-sm text-gray-600 font-light">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium hover:underline transition-colors text-[#8f1eae] font-roboto"
                  >
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full text-white py-3 px-4 rounded-lg focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm tracking-wide uppercase border border-transparent font-roboto"
                  style={{ 
                    backgroundColor: loading ? '#9CA3AF' : '#8f1eae'
                  }}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </motion.button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm font-light font-roboto">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium hover:underline transition-colors text-[#8f1eae]"
                  >
                    REGISTER
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Additional Security Info */}
            <div className="text-center">
              <p className="text-xs text-gray-500 font-light font-roboto">
                Your login information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}