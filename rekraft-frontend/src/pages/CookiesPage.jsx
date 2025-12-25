import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { Shield, Settings, BarChart, Target, Lock, Cookie, RefreshCw, FileText } from "lucide-react";

export default function CookiesPage() {
  const cookieFeatures = [
    { number: "Full Control", label: "Manage Preferences", icon: <Settings className="w-6 h-6" /> },
    { number: "Transparent", label: "Clear Information", icon: <FileText className="w-6 h-6" /> },
    { number: "Secure", label: "Data Protection", icon: <Lock className="w-6 h-6" /> },
    { number: "Optional", label: "Most Cookies Optional", icon: <Cookie className="w-6 h-6" /> }
  ];

  const cookieTypes = [
    {
      step: "01",
      title: "Essential Cookies",
      description: "Required for basic website functionality and security features.",
      icon: <Lock className="w-6 h-6" />,
      status: "Always Active"
    },
    {
      step: "02",
      title: "Performance Cookies",
      description: "Help us understand how visitors interact with our website.",
      icon: <BarChart className="w-6 h-6" />,
      status: "Optional"
    },
    {
      step: "03",
      title: "Functional Cookies",
      description: "Remember your preferences and provide enhanced features.",
      icon: <Settings className="w-6 h-6" />,
      status: "Optional"
    },
    {
      step: "04",
      title: "Targeting Cookies",
      description: "Used to show you relevant advertisements and content.",
      icon: <Target className="w-6 h-6" />,
      status: "Optional"
    }
  ];

  const managementOptions = [
    {
      method: "Browser Settings",
      description: "Control cookies through your browser preferences"
    },
    {
      method: "Cookie Preference Center",
      description: "Use our built-in tool to manage preferences"
    },
    {
      method: "Third-Party Tools",
      description: "Browser extensions for enhanced control"
    }
  ];

  const thirdPartyServices = [
    { service: "Google Analytics", purpose: "Website analytics" },
    { service: "Payment Processors", purpose: "Secure transactions" },
    { service: "Social Media", purpose: "Social features" },
    { service: "Advertising Networks", purpose: "Relevant ads" }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-lato">
      {/* Hero Section */}
      <section className="relative bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Cookie Policy
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-lato font-light"
            >
              Transparent cookie usage with full control over your preferences.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cookieFeatures.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white border border-gray-200 hover:border-[#8f1eae] transition-all duration-300 rounded-[4px] group"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-[#F5F2FA] text-[#8f1eae] rounded-[4px] flex items-center justify-center group-hover:bg-[#8f1eae] group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-xl font-light text-gray-900 mb-2 font-montserrat">{stat.number}</div>
                <div className="text-gray-600 font-inter font-medium text-sm uppercase tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cookie Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-tight font-montserrat">Cookie Categories</h2>
              <div className="space-y-6">
                <div className="bg-green-50 p-8 border border-green-100 rounded-[4px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-[4px] flex items-center justify-center">
                      <Lock className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 font-inter">Essential Cookies</h3>
                  </div>
                  <ul className="space-y-3 text-gray-600 text-sm font-lato font-light">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Required for website functionality
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Security and authentication
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Shopping cart and session management
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cannot be disabled
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-blue-50 p-8 border border-blue-100 rounded-[4px] h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-[4px] flex items-center justify-center">
                    <Settings className="w-6 h-6 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 font-inter">Optional Cookies</h3>
                </div>
                <ul className="space-y-3 text-gray-600 text-sm font-lato font-light">
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Performance and analytics
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Personalization and preferences
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Advertising and targeting
                  </li>
                  <li className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Can be managed in preferences
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cookie Details Section */}
      <section className="py-20 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">Types of Cookies We Use</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg font-lato font-light">
              Understand the different cookies we use and how they enhance your experience.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white border border-gray-200 p-8 hover:border-[#8f1eae] transition-all duration-300 rounded-[4px]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center text-sm font-inter font-medium flex-shrink-0 group-hover:bg-[#8f1eae] transition-colors duration-300 rounded-[4px]">
                      {cookie.step}
                    </div>
                    <div className="w-10 h-10 bg-[#F5F2FA] text-[#8f1eae] flex items-center justify-center group-hover:bg-[#8f1eae] group-hover:text-white transition-colors duration-300 rounded-[4px]">
                      {cookie.icon}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-inter font-medium rounded-[4px] ${
                    cookie.status === 'Always Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {cookie.status}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4 font-inter tracking-wide uppercase group-hover:text-[#8f1eae] transition-colors duration-300">
                  {cookie.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base font-lato font-light">{cookie.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management & Third Party Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-tight font-montserrat">Manage Your Preferences</h2>
              <div className="space-y-4">
                {managementOptions.map((option, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200 last:border-b-0">
                    <div>
                      <span className="text-gray-900 font-inter font-medium text-base block mb-1">{option.method}</span>
                      <span className="text-gray-600 font-lato font-light text-sm">{option.description}</span>
                    </div>
                    <button className="text-[#8f1eae] font-inter font-medium text-sm hover:text-[#7a1a99] transition-colors duration-300 uppercase tracking-wide">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-[#F5F2FA] p-8 border border-gray-200 h-full rounded-[4px]">
                <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">Third-Party Services</h3>
                <div className="space-y-4">
                  {thirdPartyServices.map((service, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300">
                      <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <span className="text-gray-900 text-base font-inter font-medium block">{service.service}</span>
                        <span className="text-gray-600 text-sm font-lato font-light">{service.purpose}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Control Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-light mb-6 tracking-tight font-montserrat"
          >
            Control Your Cookie Preferences
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-lato font-light"
          >
            Take control of your privacy. Manage which cookies we can use to enhance your experience.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button 
              onClick={() => {/* Open cookie preferences modal */}}
              className="bg-[#8f1eae] text-white px-8 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide"
            >
              Manage Cookie Preferences
            </button>
            <button 
              onClick={() => window.location.href = '/privacy'}
              className="bg-transparent text-white px-8 py-3 font-inter font-medium hover:bg-white hover:text-black transition-all duration-300 border border-white rounded-[4px] uppercase text-sm tracking-wide"
            >
              Privacy Policy
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-gray-300 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <p className="font-inter font-medium mb-2 uppercase tracking-wide">Last Updated</p>
              <p className="font-lato font-light">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <p className="font-inter font-medium mb-2 uppercase tracking-wide">Policy Version</p>
              <p className="font-lato font-light">2.1</p>
            </div>
            <div className="text-center">
              <p className="font-inter font-medium mb-2 uppercase tracking-wide">Review</p>
              <p className="font-lato font-light">Annual</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}