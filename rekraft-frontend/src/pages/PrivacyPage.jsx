import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { Shield, Lock, Eye, Mail, Phone, Cookie, FileText, User, Settings, Bell, Target, CheckCircle, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  const companyInfo = {
    name: "SHREYASH VINOD SHIRSIKAR",
    address: "Row House No -2 Wadala Road, Near Tagore Abhyasica, Dgp Nagar -1, In Front Mangalmurti Apartment, Nashik, MAHARASHTRA 422010",
    email: "contact@shreyashvinod.com",
    phone: "+91 XXXXX XXXXX"
  };

  const policySections = [
    {
      icon: User,
      title: "Information We Collect",
      content: "This privacy policy sets out how SHREYASH VINOD SHIRSIKAR uses and protects any information that you give when you visit our website and/or agree to purchase from us. We are committed to ensuring that your privacy is protected.",
      points: [
        { label: "Name", detail: "Personal identification information" },
        { label: "Contact Information", detail: "Email address, phone number, and other contact details" },
        { label: "Demographic Information", detail: "Postcode, preferences, and interests (if required)" },
        { label: "Survey Information", detail: "Information relevant to customer surveys and/or offers" }
      ]
    },
    {
      icon: Settings,
      title: "How We Use Your Information",
      content: "We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:",
      points: [
        { label: "Internal Record Keeping", detail: "Maintaining accurate business records" },
        { label: "Service Improvement", detail: "Using information to improve our products and services" },
        { label: "Promotional Communications", detail: "Sending promotional emails about new products, special offers or other information" },
        { label: "Market Research", detail: "Contacting you for market research purposes via email, phone, fax or mail" },
        { label: "Website Customization", detail: "Customising the website according to your interests" }
      ]
    },
    {
      icon: Shield,
      title: "Data Security",
      content: "We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures to safeguard and secure the information we collect online.",
      points: [
        { label: "Secure Storage", detail: "Appropriate security measures for data storage" },
        { label: "Access Control", detail: "Restricted access to personal information" },
        { label: "Regular Review", detail: "Periodic review and updating of security measures" }
      ]
    },
    {
      icon: Cookie,
      title: "How We Use Cookies",
      content: "A cookie is a small file which asks permission to be placed on your computer's hard drive. Cookies help analyze web traffic and allow web applications to respond to you as an individual.",
      points: [
        { label: "Traffic Analysis", detail: "Identify which pages are being used to analyze webpage traffic" },
        { label: "Website Improvement", detail: "Improve our website to better meet customer needs" },
        { label: "Statistical Analysis", detail: "Use information only for statistical analysis purposes" },
        { label: "No Personal Access", detail: "Cookies don't give access to your computer or personal information" },
        { label: "Browser Control", detail: "You can choose to accept or decline cookies through browser settings" }
      ]
    },
    {
      icon: Bell,
      title: "Controlling Your Personal Information",
      content: "You may choose to restrict the collection or use of your personal information in the following ways:",
      points: [
        { label: "Marketing Preferences", detail: "Look for opt-out boxes in forms to indicate you don't want information used for direct marketing" },
        { label: "Change Preferences", detail: "Change your mind about marketing communications at any time by contacting us" },
        { label: "Third-Party Sharing", detail: "We won't sell, distribute or lease your personal information to third parties without your permission or legal requirement" },
        { label: "Promotional Information", detail: "We may send promotional information about third parties if you indicate interest" }
      ]
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50 font-roboto">
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded border border-gray-300 mb-6">
              <Lock className="w-4 h-4 text-[#8f1eae]" />
              <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider font-inter">
                Privacy Policy
              </span>
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 font-poppins">
              Privacy Policy
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded border border-gray-200"
            >
              <FileText className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium font-roboto">
                Last updated: <span className="font-semibold text-gray-900">December 2, 2025</span>
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Banner */}
      <section className="py-12 bg-[#F5F2FA] border-y border-gray-300">
  <div className="max-w-6xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 border border-gray-200 rounded-lg hover:border-[#8f1eae] transition-all duration-300 group hover:scale-105"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center group-hover:bg-[#8f1eae] transition-all duration-300">
              <User className="w-5 h-5 text-[#8f1eae] group-hover:text-white transition-all duration-300" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 font-poppins group-hover:text-[#8f1eae] transition-all duration-300">Data Controller</h2>
              <p className="text-gray-600 text-sm font-medium font-roboto">SHREYASH VINOD SHIRSIKAR</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-gray-400 group-hover:text-[#8f1eae] transition-all duration-300" />
            <span className="text-gray-600 text-sm font-medium font-roboto">
              Committed to protecting your privacy
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-[#F5F2FA] px-4 py-1 rounded-full mb-2 group-hover:bg-[#8f1eae] transition-all duration-300">
            <span className="text-gray-900 text-xs font-medium uppercase tracking-wider font-inter group-hover:text-white transition-all duration-300">
              Privacy First
            </span>
          </div>
          <div className="text-right">
            <div className="text-gray-600 text-xs font-medium font-roboto">Effective Date</div>
            <div className="text-gray-900 text-base font-semibold font-poppins group-hover:text-[#8f1eae] transition-all duration-300">December 2, 2025</div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Policy Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white p-8 rounded-lg border border-gray-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-[#8f1eae]/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#8f1eae]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-poppins">
                    Privacy Commitment Statement
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 text-base leading-relaxed font-medium font-roboto">
                      This privacy policy sets out how SHREYASH VINOD SHIRSIKAR uses and protects any information that 
                      you give when you visit our website and/or agree to purchase from us. We are committed to ensuring 
                      that your privacy is protected.
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm font-inter">Policy Updates</h4>
                          <p className="text-gray-700 text-sm font-medium font-roboto">
                            SHREYASH VINOD SHIRSIKAR may change this policy from time to time by updating this page. 
                            You should check this page periodically to ensure that you adhere to these changes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Policy Grid */}
          <div className="space-y-8 mb-16">
            {policySections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  id={`section-${index}`}
                  className="scroll-mt-16"
                >
                  <div className="bg-white border border-gray-300 rounded-lg p-8">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 bg-[#8f1eae]/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-[#8f1eae]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                            {section.title}
                          </h3>
                          <span className="bg-[#8f1eae]/10 text-[#8f1eae] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-inter">
                            Section {index + 1}
                          </span>
                        </div>
                        <div className="w-12 h-1 bg-gray-300 mb-4"></div>
                        <p className="text-gray-700 text-base leading-relaxed font-medium font-roboto mb-6">
                          {section.content}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.points.map((point, pointIndex) => (
                        <div 
                          key={pointIndex}
                          className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-[#8f1eae] transition-all duration-300"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-[#8f1eae]/10 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-[#8f1eae]" />
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm mb-2 font-inter">
                                {point.label}
                              </h4>
                              <p className="text-gray-700 text-sm font-medium font-roboto leading-relaxed">
                                {point.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Important Sections */}
          <div className="space-y-6 mb-16">
            {/* Correction Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-l-4 border-black-500 p-6"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-black-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                    Correction of Information
                  </h3>
                  <div className="bg-white border border-black-200 rounded-lg p-4">
                    <p className="text-gray-800 text-base leading-relaxed font-medium font-roboto">
                      If you believe that any information we are holding on you is incorrect or incomplete, please write to us at{" "}
                      <strong className="font-semibold">{companyInfo.address}</strong> or contact us as soon as possible. We will promptly correct any information found to be incorrect.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Razorpay Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-black-200 rounded-lg p-6"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-black-100 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                      Payment Processor Disclaimer
                    </h3>
                    <span className="bg-amber-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider font-inter">
                      Important Notice
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-black rounded-lg p-4">
                      <p className="text-gray-800 text-base leading-relaxed font-medium font-roboto">
                        <strong>Disclaimer:</strong> The above content is created at SHREYASH VINOD SHIRSIKAR's sole discretion. 
                        Razorpay shall not be liable for any content provided here and shall not be responsible for any claims 
                        and liability that may arise due to merchant's non-adherence to this privacy policy.
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-amber-700">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <p className="font-medium font-roboto">
                        Razorpay acts only as a payment processor and bears no responsibility for the privacy terms outlined above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#8f1eae]/10 px-4 py-2 rounded-full mb-4">
                <Mail className="w-4 h-4 text-[#8f1eae]" />
                <span className="text-xs font-semibold text-[#8f1eae] uppercase tracking-wider font-inter">
                  Contact Information
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 font-poppins">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed font-medium font-roboto">
                For privacy-related inquiries, corrections, or concerns
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#8f1eae]/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 font-poppins">
                      Contact Address
                    </h3>
                    <p className="text-gray-600 text-sm font-medium font-roboto">
                      For written correspondence
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1 font-inter">
                            Addressed To
                          </div>
                          <div className="text-gray-900 text-sm font-medium font-roboto">
                            SHREYASH VINOD SHIRSIKAR
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                          <FileText className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-1 font-inter">
                            Office Address
                          </div>
                          <div className="text-gray-900 text-sm font-medium font-roboto leading-relaxed">
                            Row House No -2 Wadala Road, Near Tagore Abhyasica, Dgp Nagar -1, In Front Mangalmurti Apartment, Nashik, MAHARASHTRA 422010
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#8f1eae]/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 font-poppins">
                      Quick Contact
                    </h3>
                    <p className="text-gray-600 text-sm font-medium font-roboto">
                      For urgent privacy matters
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed font-medium font-roboto mb-4">
                      For privacy inquiries, data correction requests, or concerns about how your information is being used, please contact us through the following channels:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                            <Mail className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-gray-900 font-semibold text-sm mb-1 font-inter">
                              Email Contact
                            </div>
                            <div className="text-gray-700 text-xs font-medium font-roboto">
                              contactrekraft@gmail.com
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-300">
                            <Phone className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-gray-900 font-semibold text-sm mb-1 font-inter">
                              Phone Contact
                            </div>
                            <div className="text-gray-700 text-xs font-medium font-roboto">
                              +91 9373712701
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border-2 border-[#8f1eae]/20 rounded-lg p-8 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-[#8f1eae]/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-[#8f1eae]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">
                Your Privacy Matters
              </h3>
              <p className="text-gray-700 text-base leading-relaxed font-medium font-roboto mb-6">
                SHREYASH VINOD SHIRSIKAR is committed to protecting your privacy and ensuring the security of your personal information. 
                We value your trust and are dedicated to maintaining the confidentiality of the information you share with us.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#8f1eae] text-white px-6 py-3 rounded-lg">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-semibold font-inter">
                  Protected by SHREYASH VINOD SHIRSIKAR Privacy Policy
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}