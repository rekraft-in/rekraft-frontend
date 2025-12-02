import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SellPage() {
  const { user, login, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    deviceType: "laptop",
    brand: "",
    model: "",
    year: "",
    condition: "",
    processor: "",
    ram: "",
    storage: "",
    storageType: "ssd",
    screenSize: "",
    graphics: "",
    operatingSystem: "",
    scratches: "",
    dents: "",
    screenCondition: "",
    keyboardCondition: "working",
    batteryHealth: "",
    chargerIncluded: true,
    originalBox: false,
    functionalIssues: "",
    name: "",
    email: "",
    phone: "",
    pincode: "",
    city: "",
    address: ""
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const formRef = useRef(null);
  const submitButtonRef = useRef(null);

  const brands = {
    laptop: [
      "Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Samsung", 
      "Toshiba", "Sony", "Compaq", "IBM", "HCL", "Micromax", "iBall",
      "Microsoft", "Google", "Razer", "LG", "Panasonic", "Fujitsu", "Other"
    ]
  };

  const years = Array.from({length: new Date().getFullYear() - 1999}, (_, i) => new Date().getFullYear() - i);

  const conditions = [
    "Like New - No signs of use",
    "Excellent - Minor cosmetic wear",
    "Very Good - Light scratches",
    "Good - Visible wear but fully functional",
    "Fair - Significant wear, works well",
    "Poor - Major issues but working",
    "For Parts - Not working"
  ];

  const operatingSystems = [
    "Windows 11",
    "Windows 10",
    "Windows 8/8.1",
    "Windows 7",
    "macOS Latest",
    "macOS Older",
    "Linux",
    "Chrome OS",
    "DOS/No OS"
  ];

  // Check for saved form data on component mount and after login
  useEffect(() => {
    const savedFormData = localStorage.getItem('rekraftPendingSubmission');
    const savedStep = localStorage.getItem('rekraftPendingStep');
    const savedImages = localStorage.getItem('rekraftPendingImages');
    
    if (savedFormData && user) {
      // Restore form data and step
      setFormData(JSON.parse(savedFormData));
      setCurrentStep(parseInt(savedStep) || 1);
      
      if (savedImages) {
        setImagePreviews(JSON.parse(savedImages));
      }
      
      // Clear the saved data
      localStorage.removeItem('rekraftPendingSubmission');
      localStorage.removeItem('rekraftPendingStep');
      localStorage.removeItem('rekraftPendingImages');
      
      console.log('✅ Restored pending submission after login');
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  // Save form progress to localStorage
  const saveFormProgress = () => {
    localStorage.setItem('rekraftPendingSubmission', JSON.stringify(formData));
    localStorage.setItem('rekraftPendingStep', currentStep.toString());
    localStorage.setItem('rekraftPendingImages', JSON.stringify(imagePreviews));
    console.log('💾 Saved form progress before login');
  };

  const calculateEstimate = (data = formData) => {
    if (!data.brand || !data.condition) return 0;

    const brandPrices = {
      "Apple": { base: 35000, min: 5000, max: 200000 },
      "Dell": { base: 18000, min: 3000, max: 120000 },
      "HP": { base: 15000, min: 2500, max: 100000 },
      "Lenovo": { base: 16000, min: 2800, max: 110000 },
      "Asus": { base: 14000, min: 2600, max: 95000 },
      "Acer": { base: 12000, min: 2200, max: 80000 },
      "MSI": { base: 20000, min: 4000, max: 150000 },
      "Samsung": { base: 17000, min: 3000, max: 100000 },
      "Toshiba": { base: 8000, min: 1500, max: 40000 },
      "Sony": { base: 10000, min: 1800, max: 60000 },
      "Compaq": { base: 5000, min: 800, max: 20000 },
      "IBM": { base: 6000, min: 1000, max: 25000 },
      "Other": { base: 8000, min: 1000, max: 50000 }
    };

    const brandData = brandPrices[data.brand] || { base: 8000, min: 1000, max: 40000 };
    let basePrice = brandData.base;

    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(data.year || currentYear);
    const ageDepreciation = Math.min(0.8, age * 0.12);
    basePrice *= (1 - ageDepreciation);

    const conditionMultipliers = {
      "Like New - No signs of use": 1.0,
      "Excellent - Minor cosmetic wear": 0.85,
      "Very Good - Light scratches": 0.75,
      "Good - Visible wear but fully functional": 0.6,
      "Fair - Significant wear, works well": 0.45,
      "Poor - Major issues but working": 0.25,
      "For Parts - Not working": 0.1
    };
    
    basePrice *= conditionMultipliers[data.condition] || 0.5;

    if (data.ram === "4GB") basePrice += 1000;
    if (data.ram === "8GB") basePrice += 2500;
    if (data.ram === "16GB") basePrice += 5000;
    if (data.ram === "32GB") basePrice += 10000;
    if (data.ram === "64GB") basePrice += 15000;

    if (data.storageType === "ssd") basePrice += 2000;
    if (data.storageType === "nvme") basePrice += 3500;
    
    const storageSize = parseInt(data.storage) || 0;
    if (storageSize >= 512) basePrice += 3000;
    if (storageSize >= 1000) basePrice += 5000;

    if (data.chargerIncluded) basePrice += 500;
    if (data.originalBox) basePrice += 300;

    basePrice = Math.max(brandData.min, Math.min(brandData.max, basePrice));

    return Math.round(basePrice / 500) * 500;
  };

  const estimatedPrice = calculateEstimate();

  const isStepValid = () => {
    // If we're on success step, always return true
    if (currentStep === 5) return true;
    
    switch(currentStep) {
      case 1:
        return !!(formData.brand?.trim() && formData.model?.trim() && formData.year?.trim() && formData.condition?.trim());
      case 2:
        return !!(formData.processor?.trim() && formData.ram?.trim() && formData.storage?.trim() && formData.screenSize?.trim());
      case 3:
        return !!(formData.scratches?.trim() && formData.dents?.trim() && formData.screenCondition?.trim() && formData.batteryHealth?.trim());
      case 4:
        return !!(formData.name?.trim() && formData.email?.trim() && formData.phone?.trim() && formData.pincode?.trim() && formData.address?.trim() && formData.city?.trim());
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced validation - check if form is actually empty
    const requiredFields = ['brand', 'model', 'year', 'condition', 'name', 'email', 'phone', 'pincode', 'city', 'address'];
    const emptyFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (emptyFields.length > 0) {
      console.error('❌ Required fields missing:', emptyFields);
      alert(`Please fill all required fields: ${emptyFields.join(', ')}`);
      return;
    }

    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true);
      saveFormProgress();
      return;
    }
    
    // Prevent duplicate submissions
    if (isSubmitting) {
      console.log('⏳ Already submitting, preventing duplicate');
      return;
    }
    
    setIsSubmitting(true);
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }
    
    console.log('🚀 Starting submission process with data:', {
      brand: formData.brand,
      model: formData.model,
      year: formData.year,
      condition: formData.condition,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      pincode: formData.pincode,
      city: formData.city,
      address: formData.address
    });
    
    const finalPrice = calculateEstimate();
    
    try {
      const submissionData = {
        ...formData,
        images: imagePreviews,
        estimatedPrice: finalPrice,
        userId: user.id
      };

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Submission successful:', result.data.submissionId);
        
        setSubmittedData({
          price: finalPrice,
          submissionId: result.data.submissionId,
          formData: { ...formData },
          isDuplicate: false
        });
        
        setCurrentStep(5);
        console.log('🎉 Success! Moving to step 5');
        
        // Clear any pending submission data
        localStorage.removeItem('rekraftPendingSubmission');
        localStorage.removeItem('rekraftPendingStep');
        localStorage.removeItem('rekraftPendingImages');
        
      } else {
        console.error('❌ Submission failed:', result.error);
        alert(`Submission failed: ${result.error}`);
      }
      
    } catch (error) {
      console.error("❌ Submission error:", error);
      
      const submissionId = 'RK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
      const submissionData = {
        id: submissionId,
        formData: { ...formData },
        price: finalPrice,
        timestamp: new Date().toISOString(),
        status: 'submitted',
        userId: user.id
      };
      
      const existingSubmissions = JSON.parse(localStorage.getItem('rekraftSubmissions') || '[]');
      existingSubmissions.push(submissionData);
      localStorage.setItem('rekraftSubmissions', JSON.stringify(existingSubmissions));
      
      console.log('💾 Submission saved locally as fallback:', submissionId);
      
      setSubmittedData({
        price: finalPrice,
        submissionId: submissionId,
        formData: { ...formData },
        isDuplicate: false
      });
      
      setCurrentStep(5);
      
      // Clear pending data
      localStorage.removeItem('rekraftPendingSubmission');
      localStorage.removeItem('rekraftPendingStep');
      localStorage.removeItem('rekraftPendingImages');
      
    } finally {
      setIsSubmitting(false);
      if (submitButtonRef.current) {
        submitButtonRef.current.disabled = false;
      }
      console.log('🏁 Submission process finished');
    }
  };

  const startNewSale = () => {
    console.log('🔄 Starting new sale - resetting form...');
    
    // Clear all form data and reset
    setFormData({
      deviceType: "laptop",
      brand: "",
      model: "",
      year: "",
      condition: "",
      processor: "",
      ram: "",
      storage: "",
      storageType: "ssd",
      screenSize: "",
      graphics: "",
      operatingSystem: "",
      scratches: "",
      dents: "",
      screenCondition: "",
      keyboardCondition: "working",
      batteryHealth: "",
      chargerIncluded: true,
      originalBox: false,
      functionalIssues: "",
      name: "",
      email: "",
      phone: "",
      pincode: "",
      city: "",
      address: ""
    });
    
    // Clear image previews and revoke URLs
    imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    setImagePreviews([]);
    
    // Reset to step 1
    setCurrentStep(1);
    setSubmittedData(null);
    
    // Reset any submission state
    setIsSubmitting(false);
    
    // Force a small delay to ensure state updates complete
    setTimeout(() => {
      console.log('✅ Form reset complete - ready for new submission');
      console.log('📋 Current form data:', {
        brand: formData.brand,
        model: formData.model,
        year: formData.year,
        condition: formData.condition,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      });
    }, 100);
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleLoginRedirect = () => {
    // Save current form state
    saveFormProgress();
    
    // Redirect to login with return URL to sell page
    navigate('/login', { 
      state: { 
        from: { 
          pathname: '/sell',
          search: '?returnToSell=true'
        } 
      } 
    });
  };

  // Auto-fill user details when logged in and on step 4
  useEffect(() => {
    if (user && currentStep === 4) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user, currentStep]);

  // Clean up image URLs and reset form state
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
      // Clear any pending submissions if user leaves the page
      localStorage.removeItem('rekraftPendingSubmission');
      localStorage.removeItem('rekraftPendingStep');
      localStorage.removeItem('rekraftPendingImages');
    };
  }, [imagePreviews]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#8f1eae] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-gray-600 font-light tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  const stepTitles = ["DEVICE INFO", "SPECIFICATIONS", "CONDITION", "YOUR DETAILS"];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded p-6 max-w-md w-full"
            >
              <h3 className="text-base font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins">
                Login Required
              </h3>
              <p className="text-sm text-gray-600 mb-6 font-light tracking-wide leading-relaxed">
                Please log in to submit your sell request. Your form progress has been saved and will be restored after login.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLoginRedirect}
                  className="bg-[#8f1eae] text-white px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded flex-1 font-roboto"
                >
                  Login Now
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded flex-1 font-roboto"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - Clean & Minimal */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins"
          >
            Sell Your Laptop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-600 mb-8 max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
          >
            {user ? `Welcome, ${user.name}! Get the best value for your used laptop.` : 'Get the best value for your used laptop. Please log in to submit your request.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {["Accept All Brands", "2000+ Models", "Free Pickup", "Instant Payment"].map((item, index) => (
              <span 
                key={index} 
                className="bg-[#F5F2FA] px-4 py-2 rounded-full text-xs font-medium text-gray-600 tracking-wide font-inter"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Progress Bar - Clean & Minimal */}
      {currentStep >= 1 && currentStep <= 4 && (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      step <= currentStep 
                        ? 'text-white' 
                        : 'text-gray-400 bg-gray-50 border border-gray-200'
                    }`}
                    style={{ 
                      backgroundColor: step <= currentStep ? '#8f1eae' : 'transparent'
                    }}
                  >
                    {step}
                  </div>
                  <span 
                    className={`text-xs font-medium mt-3 tracking-wider uppercase ${
                      step <= currentStep ? 'text-[#8f1eae]' : 'text-gray-400'
                    } font-inter`}
                  >
                    {stepTitles[step-1]}
                  </span>
                </div>
                
                {/* Connector line */}
                {index < 3 && (
                  <div 
                    className={`w-20 h-0.5 mx-2 transition-all duration-300 ${
                      step < currentStep ? 'bg-[#8f1eae]' : 'bg-gray-200'
                    }`} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form Steps */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <form ref={formRef} onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Device Information */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 tracking-wider uppercase font-poppins">Device Information</h2>
                  <p className="text-sm text-gray-600 font-light tracking-wide">Tell us about your laptop to get an accurate valuation</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Brand <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => handleInputChange('brand', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                      required
                    >
                      <option value="">Select Brand</option>
                      {brands.laptop.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => handleInputChange('model', e.target.value)}
                      placeholder="MacBook Air M1, Dell Inspiron 15, ThinkPad T420"
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                      required
                    >
                      <option value="">Select Year</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Condition <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => handleInputChange('condition', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                      required
                    >
                      <option value="">Select Condition</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded disabled:bg-gray-300 disabled:cursor-not-allowed font-roboto"
                    disabled={!isStepValid()}
                  >
                    Next: Specifications →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Specifications */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 tracking-wider uppercase font-poppins">Technical Specifications</h2>
                  <p className="text-sm text-gray-600 font-light tracking-wide">Help us understand your laptop's capabilities</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Processor (CPU) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.processor}
                      onChange={(e) => handleInputChange('processor', e.target.value)}
                      placeholder="Intel Core i5 8th Gen, AMD Ryzen 5, Apple M1"
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        RAM <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.ram}
                        onChange={(e) => handleInputChange('ram', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                      >
                        <option value="">Select RAM</option>
                        <option value="2GB">2GB</option>
                        <option value="4GB">4GB</option>
                        <option value="8GB">8GB</option>
                        <option value="16GB">16GB</option>
                        <option value="32GB">32GB</option>
                        <option value="64GB">64GB or more</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Operating System
                      </label>
                      <select
                        value={formData.operatingSystem}
                        onChange={(e) => handleInputChange('operatingSystem', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                      >
                        <option value="">Select OS</option>
                        {operatingSystems.map(os => (
                          <option key={os} value={os}>{os}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Storage <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.storage}
                        onChange={(e) => handleInputChange('storage', e.target.value)}
                        placeholder="128, 256, 500, 1000"
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Storage Type
                      </label>
                      <select
                        value={formData.storageType}
                        onChange={(e) => handleInputChange('storageType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                      >
                        <option value="hdd">HDD</option>
                        <option value="ssd">SSD</option>
                        <option value="nvme">NVMe SSD</option>
                        <option value="emmc">eMMC</option>
                        <option value="unknown">Don't Know</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Screen Size <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.screenSize}
                        onChange={(e) => handleInputChange('screenSize', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                      >
                        <option value="">Select Size</option>
                        <option value="11">11 inch</option>
                        <option value="12">12 inch</option>
                        <option value="13">13 inch</option>
                        <option value="14">14 inch</option>
                        <option value="15.6">15.6 inch</option>
                        <option value="16">16 inch</option>
                        <option value="17">17 inch</option>
                        <option value="18">18 inch+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Graphics Card
                      </label>
                      <input
                        type="text"
                        value={formData.graphics}
                        onChange={(e) => handleInputChange('graphics', e.target.value)}
                        placeholder="Intel HD, NVIDIA GTX, AMD Radeon"
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded font-roboto"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded disabled:bg-gray-300 disabled:cursor-not-allowed font-roboto"
                    disabled={!isStepValid()}
                  >
                    Next: Condition →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Physical Condition */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 tracking-wider uppercase font-poppins">Physical Condition</h2>
                  <p className="text-sm text-gray-600 font-light tracking-wide">Tell us about your laptop's physical state</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Scratches <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.scratches}
                        onChange={(e) => handleInputChange('scratches', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                      >
                        <option value="">Select Level</option>
                        <option value="none">None - Pristine</option>
                        <option value="minor">Minor - Hard to notice</option>
                        <option value="visible">Visible - Noticeable</option>
                        <option value="significant">Significant - Clearly visible</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Dents <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.dents}
                        onChange={(e) => handleInputChange('dents', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                      >
                        <option value="">Select Level</option>
                        <option value="none">None</option>
                        <option value="minor">Minor dents</option>
                        <option value="visible">Visible dents</option>
                        <option value="significant">Major dents</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Screen <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.screenCondition}
                        onChange={(e) => handleInputChange('screenCondition', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                      >
                        <option value="">Select Condition</option>
                        <option value="perfect">Perfect - No issues</option>
                        <option value="minor_scratches">Minor scratches</option>
                        <option value="visible_scratches">Visible scratches</option>
                        <option value="dead_pixels">Dead pixels</option>
                        <option value="lines">Lines on display</option>
                        <option value="cracks">Cracks/damage</option>
                        <option value="flickering">Flickering issues</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Battery <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.batteryHealth}
                        onChange={(e) => handleInputChange('batteryHealth', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                      >
                        <option value="">Select Health</option>
                        <option value="excellent">Excellent (80-100%)</option>
                        <option value="good">Good (60-79%)</option>
                        <option value="fair">Fair (40-59%)</option>
                        <option value="poor">Poor (below 40%)</option>
                        <option value="dead">Dead/Not working</option>
                        <option value="removed">Battery removed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Functional Issues
                    </label>
                    <textarea
                      value={formData.functionalIssues}
                      onChange={(e) => handleInputChange('functionalIssues', e.target.value)}
                      placeholder="Describe any functional issues like overheating, slow performance, WiFi problems, etc."
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 resize-none font-light tracking-wide"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center space-x-4 p-4 rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.chargerIncluded}
                        onChange={(e) => handleInputChange('chargerIncluded', e.target.checked)}
                        className="w-5 h-5 text-[#8f1eae] rounded focus:ring-[#8f1eae]"
                      />
                      <span className="font-medium text-gray-900 text-sm tracking-wide">Original Charger Included</span>
                    </label>
                    <label className="flex items-center space-x-4 p-4 rounded border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.originalBox}
                        onChange={(e) => handleInputChange('originalBox', e.target.checked)}
                        className="w-5 h-5 text-[#8f1eae] rounded focus:ring-[#8f1eae]"
                      />
                      <span className="font-medium text-gray-900 text-sm tracking-wide">Original Box & Packaging</span>
                    </label>
                  </div>

                  {/* Price Estimate */}
                  <div className="bg-[#F5F2FA] p-6 rounded border border-[#8f1eae]">
                    <h3 className="font-semibold text-gray-900 text-sm mb-3 tracking-wider uppercase font-poppins">Estimated Value</h3>
                    <p className="text-2xl font-semibold text-[#8f1eae] mb-4">₹{estimatedPrice.toLocaleString()}</p>
                    <p className="text-xs text-[#8f1eae] font-light tracking-wide">
                      This is an estimated price. Final offer may vary after physical inspection.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded font-roboto"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded disabled:bg-gray-300 disabled:cursor-not-allowed font-roboto"
                    disabled={!isStepValid()}
                  >
                    Next: Your Details →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Personal Details */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="text-center mb-12">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 tracking-wider uppercase font-poppins">Your Details</h2>
                  <p className="text-sm text-gray-600 font-light tracking-wide">
                    {user ? "We'll use this information to schedule pickup and payment" : "Please log in to submit your request"}
                  </p>
                </div>
                
                {!user && (
                  <div className="bg-yellow-50 border border-yellow-200 p-6 rounded text-center">
                    <p className="text-sm text-yellow-800 mb-4 font-light tracking-wide leading-relaxed">
                      You need to be logged in to submit your sell request. Your form progress will be saved.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowLoginPrompt(true)}
                      className="bg-[#8f1eae] text-white px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded font-roboto"
                    >
                      Login to Continue
                    </button>
                  </div>
                )}
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                        disabled={!user}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                        disabled={!user}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                      required
                      disabled={!user}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                        disabled={!user}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
                        required
                        disabled={!user}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 resize-none font-light tracking-wide"
                      required
                      disabled={!user}
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded font-roboto"
                  >
                    ← Back
                  </button>
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded disabled:bg-gray-300 disabled:cursor-not-allowed font-roboto flex items-center gap-3 min-w-32 justify-center"
                    disabled={!isStepValid() || isSubmitting || !user}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </>
                    ) : !user ? (
                      "Login to Submit"
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Success Step */}
            {currentStep === 5 && submittedData && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-3xl text-green-600">✓</span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-wider uppercase font-poppins">
                  Request Submitted
                </h2>
                <p className="text-base text-gray-600 mb-12 max-w-md mx-auto leading-relaxed font-light tracking-wide">
                  Thank you for choosing Rekraft! Your device information has been saved and we'll contact you within 24 hours to schedule a free pickup.
                </p>
                <div className="bg-[#F5F2FA] p-8 rounded border border-[#8f1eae] max-w-md mx-auto mb-12">
                  <h3 className="font-semibold text-gray-900 text-lg mb-4 tracking-wider uppercase font-poppins">Estimated Value</h3>
                  <p className="text-4xl font-semibold text-[#8f1eae] mb-6">₹{submittedData.price.toLocaleString()}</p>
                  <p className="text-xs text-[#8f1eae] font-light tracking-wide">
                    Final offer may vary after physical inspection
                  </p>
                </div>
                <p className="text-xs text-gray-500 mb-12 font-medium tracking-wide font-inter">
                  Reference ID: {submittedData.submissionId}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={startNewSale}
                    type="button"
                    className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] rounded font-roboto"
                  >
                    Sell Another Device
                  </button>
                  <button
                    onClick={() => window.print()}
                    type="button"
                    className="border border-gray-300 text-gray-700 px-8 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded font-roboto"
                  >
                    Print Details
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Benefits Section */}
      {currentStep >= 1 && currentStep <= 4 && (
        <section className="bg-white border-t border-gray-200 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-16 text-center tracking-wider uppercase font-poppins">Why Sell With Rekraft?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  icon: "💰",
                  title: "Best Price",
                  description: "Get the highest value with our competitive pricing"
                },
                {
                  icon: "🚚",
                  title: "Free Pickup",
                  description: "We pick up from your location across India"
                },
                {
                  icon: "⚡",
                  title: "Instant Payment",
                  description: "Receive payment within hours after inspection"
                },
                {
                  icon: "🛡️",
                  title: "Secure & Safe",
                  description: "Complete data wiping and secure process"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-6">{feature.icon}</div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wider uppercase font-poppins">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-light tracking-wide">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}