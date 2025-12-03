// Add import at the top:
import apiService from '../services/api';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Key, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1); // 1: email input, 2: OTP input, 3: new password

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. First call - Send OTP:
      // AFTER:
      const data = await apiService.forgotPassword(email);

      // Note: The apiService already parses JSON and handles the response
      // so we can directly use the data
      if (data.success) {
        setSuccess('Password reset OTP has been sent to your email');
        setStep(2);
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      // The apiService might throw an error or return an error object
      setError(error.message || error.error || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-lato">
      <div className="flex flex-1 pt-20">
        {/* Left Banner */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden h-[800px]">
          <img 
            src="/images/login.png"
            alt="Rekraft Banner"
            className="w-full h-full object-cover"
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
              <span className="text-xs font-light tracking-widest uppercase">
                Secure • Professional • Reliable
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-[#F5F2FA]">
          <div className="max-w-md w-full space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-14 h-14 rounded-[4px] flex items-center justify-center mx-auto mb-4 border border-gray-200"
                style={{ backgroundColor: '#8f1eae' }}
              >
                <span className="text-white font-inter font-medium text-xl tracking-wide">R</span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-light text-gray-900 tracking-tight font-montserrat uppercase"
              >
                Rekraft
              </motion.h1>
            </div>

            {/* Forgot Password Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-[4px] p-8"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-[#8f1eae]" />
                </div>
                <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight font-montserrat">
                  Reset Your Password
                </h2>
                <p className="text-gray-600 text-sm font-light">
                  Enter your email to receive a password reset OTP
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 rounded-[4px] mb-6 border text-sm font-inter"
                  style={{ 
                    backgroundColor: '#FEE2E2',
                    borderColor: '#FCA5A5',
                    color: '#DC2626'
                  }}
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-3 rounded-[4px] mb-6 border text-sm font-inter font-medium"
                  style={{ 
                    backgroundColor: '#D1FAE5',
                    borderColor: '#6EE7B7',
                    color: '#065F46'
                  }}
                >
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={step > 1}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your registered email"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || step > 1}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-[#8f1eae] text-white py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending OTP...
                    </div>
                  ) : (
                    'Send Reset OTP'
                  )}
                </motion.button>
              </form>

              {step === 2 && (
                <OTPVerification 
                  email={email} 
                  onSuccess={() => setStep(3)} 
                />
              )}

              {step === 3 && (
                <NewPasswordForm 
                  email={email} 
                  onSuccess={() => navigate('/login')} 
                />
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm font-light">
                  Remember your password?{' '}
                  <Link
                    to="/login"
                    className="font-inter font-medium hover:underline transition-colors text-[#8f1eae]"
                  >
                    Back to login
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// OTP Verification Component
const OTPVerification = ({ email, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  React.useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');

    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 2. Second call - Verify OTP:
      // AFTER:
      const data = await apiService.verifyResetOTP(email, otpValue);

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (error) {
      setError(error.message || error.error || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');
    setCanResend(false);
    setTimer(60);

    try {
      // 3. Third call - Resend OTP:
      // AFTER:
      const data = await apiService.forgotPassword(email);

      if (!data.success) {
        setError(data.error || 'Failed to resend OTP');
      }
    } catch (error) {
      setError(error.message || error.error || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="space-y-6 pt-6 border-t border-gray-200"
    >
      <div className="text-center">
        <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-3">
          <Shield className="w-6 h-6 text-[#8f1eae]" />
        </div>
        <h3 className="text-lg font-inter font-medium text-gray-900 mb-2 tracking-wide uppercase">
          Enter Verification Code
        </h3>
        <p className="text-gray-600 text-sm font-light">
          We sent a 6-digit code to {email}
        </p>
      </div>

      <form onSubmit={handleVerifyOTP} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-12 border border-gray-300 rounded-[4px] text-center text-lg font-inter font-medium focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] transition-all duration-300"
            />
          ))}
        </div>

        {error && (
          <div className="text-center text-sm text-red-600 font-light">
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full bg-[#8f1eae] text-white py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Verifying...
            </div>
          ) : (
            'Verify OTP'
          )}
        </motion.button>
      </form>

      <div className="text-center">
        <p className="text-gray-600 text-sm font-light">
          Didn't receive the code?{' '}
          {canResend ? (
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="font-inter font-medium hover:underline transition-colors text-[#8f1eae] disabled:opacity-50"
            >
              Resend OTP
            </button>
          ) : (
            <span className="font-inter font-medium text-gray-500">
              Resend in {timer}s
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

// New Password Form Component
const NewPasswordForm = ({ email, onSuccess }) => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 4. Fourth call - Reset password:
      // AFTER:
      const data = await apiService.resetPassword(email, formData.password);

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (error) {
      setError(error.message || error.error || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      className="space-y-6 pt-6 border-t border-gray-200"
    >
      <div className="text-center">
        <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-3">
          <Lock className="w-6 h-6 text-[#8f1eae]" />
        </div>
        <h3 className="text-lg font-inter font-medium text-gray-900 mb-2 tracking-wide uppercase">
          Create New Password
        </h3>
        <p className="text-gray-600 text-sm font-light">
          Your new password must be different from previous used passwords
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {error && (
          <div className="text-center text-sm text-red-600 font-light">
            {error}
          </div>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full bg-[#8f1eae] text-white py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Resetting...
            </div>
          ) : (
            'Reset Password'
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};