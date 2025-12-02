import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );

    if (result.success) {
      navigate('/account');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-roboto">
      {/* Main content area with proper spacing for navbar */}
      <div className="flex flex-1 pt-20 lg:pt-20">
        {/* Left Banner with your PNG image */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[800px]">
          {/* Your PNG Banner */}
          <img 
            src="/images/register.png"
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
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-xs font-light tracking-widest uppercase font-inter">SECURE • PROFESSIONAL • RELIABLE</span>
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
              className="bg-white rounded-lg border border-gray-300 p-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-widest uppercase font-poppins">CREATE ACCOUNT</h2>
                <p className="text-gray-600 text-sm font-light">Join Rekraft today</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 rounded mb-4 border border-[#EF4444]/20 text-sm"
                  style={{ 
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626'
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-[#EF4444] rounded-full"></div>
                    <span className="font-medium">{error}</span>
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] transition-colors text-sm font-light placeholder:text-gray-400"
                    placeholder="Enter your full name"
                  />
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] transition-colors text-sm font-light placeholder:text-gray-400"
                    placeholder="Enter your email"
                  />
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
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] transition-colors text-sm font-light placeholder:text-gray-400"
                    placeholder="10-digit phone number"
                  />
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
                    required
                    minLength="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] transition-colors text-sm font-light placeholder:text-gray-400"
                    placeholder="At least 6 characters"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-[#8f1eae] text-white py-3 px-4 rounded focus:outline-none transition-all duration-300 transform hover:scale-105 hover:bg-[#7a1a99] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm tracking-widest uppercase border border-[#8f1eae]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      CREATING ACCOUNT...
                    </div>
                  ) : (
                    'CREATE ACCOUNT'
                  )}
                </motion.button>
              </form>

              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <div className="px-4 text-gray-500 text-xs font-light font-inter uppercase">OR</div>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-sm font-light">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium hover:text-[#7a1a99] transition-colors text-[#8f1eae]"
                  >
                    SIGN IN HERE
                  </Link>
                </p>
              </div>
            </motion.div>

            {/* Security Features */}
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#8f1eae]/10 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1 uppercase tracking-widest font-inter">
                    SECURE & PRIVATE
                  </p>
                  <p className="text-xs text-gray-600 font-light">
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