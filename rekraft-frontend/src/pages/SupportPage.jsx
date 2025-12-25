import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Wrench, 
  Package, 
  RefreshCw, 
  ShoppingBag,
  MessageSquare,
  FileText,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  HeadphonesIcon,
  CheckCircle,
  Star,
  Award,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  MessageCircle,
  AlertCircle,
  Send
} from 'lucide-react';

export default function SupportPage() {
  const [openSection, setOpenSection] = useState(null);
  const [activeIssue, setActiveIssue] = useState(null);

  const supportSections = [
    {
      id: 'warranty',
      icon: Shield,
      title: "Warranty & Support",
      subtitle: "Need help with a Rekraft-certified device?",
      features: [
        "Warranty claim assistance",
        "Repair & replacement updates",
        "Free diagnostics during warranty",
        "Priority service queue",
        "Pickup & drop support (select locations)"
      ],
      actionText: "Start Your Warranty Claim",
      actionLink: "/warranty-claim",
      badge: "Priority"
    },
    {
      id: 'troubleshooting',
      icon: Wrench,
      title: "Troubleshooting & Guides",
      subtitle: "Facing a problem with your laptop?",
      features: [
        "Heating & Performance",
        "Battery & Power",
        "Wi-Fi & connectivity",
        "System & Boot",
        "Display & Input"
      ],
      actionText: "View Troubleshooting Guides",
      actionLink: "/guides",
      badge: "Help"
    },
    {
      id: 'order',
      icon: Package,
      title: "Order & Delivery Support",
      subtitle: "Track or fix any issue related to your order",
      features: [
        "Delivery delays",
        "Wrong product",
        "Missing accessories",
        "Packaging issues",
        "Payment problems",
        "Order confirmation or invoice support"
      ],
      actionText: "Check Order Status",
      actionLink: "/orders",
      badge: "Track"
    },
    {
      id: 'selling',
      icon: ShoppingBag,
      title: "Support for Selling Your Device",
      subtitle: "Sold your laptop to Rekraft and need help?",
      features: [
        "Pickup issues",
        "Payment status",
        "Device inspection questions",
        "Document/ID verification",
        "Price estimate doubts"
      ],
      actionText: "Get Seller Support",
      actionLink: "/seller-support",
      badge: "Sell"
    }
  ];

  const supportPromise = [
    {
      icon: Clock,
      title: "Fast Responses",
      description: "24–48 hour support ticket response time"
    },
    {
      icon: ShieldCheck,
      title: "Transparent Process",
      description: "Clear repair tracking and updates"
    },
    {
      icon: Award,
      title: "Genuine Parts",
      description: "Original components for lasting quality"
    },
    {
      icon: CheckCircle,
      title: "No Hidden Charges",
      description: "Upfront pricing, no surprises"
    },
    {
      icon: Sparkles,
      title: "Ethical Refurbishment",
      description: "Environmentally responsible practices"
    },
    {
      icon: Star,
      title: "Customer-First Service",
      description: "Your satisfaction matters most"
    }
  ];

  const quickContact = [
    {
      icon: Phone,
      title: "PHONE SUPPORT",
      details: "+91 9373712701",
      description: "Mon to Sat, 9AM to 6PM",
      action: "tel:+919373712701",
      badge: "Call"
    },
    {
      icon: Mail,
      title: "EMAIL SUPPORT",
      details: "contactrekraft@gmail.com",
      description: "Response within 4 hours",
      action: "mailto:contactrekraft@gmail.com",
      badge: "Email"
    },
    {
      icon: MessageCircle,
      title: "WHATSAPP CHAT",
      details: "+91 9373712701",
      description: "Instant help from agents",
      action: "https://wa.me/919373712701",
      badge: "Chat"
    }
  ];

  const deviceIssues = [
    {
      type: "Laptops",
      common: ["Battery", "MotherBoard", "Keyboard/touchpad issues", "Speakers"],
      icon: Wrench
    }
  ];

  const toggleIssue = (index) => {
    setActiveIssue(activeIssue === index ? null : index);
  };

  return (
    <div className="pt-16 min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="border-b border-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#F5F2FA] text-[#8f1eae] text-xs font-inter font-medium uppercase tracking-wider rounded-full">
                Support Center
              </span>
            </div>
            <h1 className="text-3xl font-poppins font-semibold text-gray-900">
              We're Here to Help
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-roboto font-light">
              Your one-stop place for warranty help, repairs, order issues, returns, device troubleshooting, and product guidance.
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-4xl mx-auto"
          >
            <div className="bg-[#F5F2FA] border border-gray-300 px-6 py-4 rounded">
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="font-inter font-medium text-gray-900">Need Help?</span>
                {["Warranty", "Repair", "Returns", "Order Issues", "Troubleshooting"].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 font-roboto font-light">{item}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-lg font-poppins font-semibold text-gray-900 mb-3 uppercase tracking-tight">
              Quick Contact Options
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-roboto font-light">
              Get immediate help through our preferred contact methods
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickContact.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.action}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="group relative bg-white border border-gray-300 rounded p-6 text-center hover:border-[#8f1eae] transition-all duration-300 cursor-pointer"
                >
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-[#F5F2FA] text-[#8f1eae] text-xs font-inter font-medium uppercase rounded-full">
                      {method.badge}
                    </span>
                  </div>
                  
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-xs font-inter font-medium text-gray-900 mb-2 group-hover:text-[#8f1eae] transition-colors duration-300 uppercase tracking-wide">
                    {method.title}
                  </h3>
                  
                  <p className="font-roboto font-medium text-gray-900 mb-1 text-base">
                    {method.details}
                  </p>
                  
                  <p className="text-gray-600 text-sm font-roboto font-light">
                    {method.description}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200 group-hover:border-[#8f1eae] transition-colors duration-300">
                    <span className="inline-flex items-center text-[#8f1eae] text-xs font-inter font-medium">
                      Contact Now
                      <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Support Sections */}
      <section className="py-12 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-lg font-poppins font-semibold text-gray-900 mb-3 uppercase tracking-tight">
              Support Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-roboto font-light">
              Select your support category for specialized assistance
            </p>
          </motion.div>

          <div className="space-y-4">
            {supportSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-300 rounded hover:border-gray-400 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-start justify-between hover:bg-gray-50 transition-colors duration-200 rounded"
                  onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#F5F2FA] rounded flex-shrink-0">
                      <section.icon className="w-5 h-5 text-[#8f1eae]" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-poppins font-semibold text-gray-900 text-base">
                          {section.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-[#F5F2FA] text-[#8f1eae] text-xs font-inter font-medium uppercase rounded-full">
                          {section.badge}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm font-roboto font-light mb-2">
                        {section.subtitle}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {section.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-roboto font-light rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {openSection === section.id ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-2" />
                  )}
                </button>
                
                {openSection === section.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <div className="pl-14 border-t border-gray-300 pt-4">
                      <div className="mb-4">
                        <h4 className="font-inter font-medium text-gray-900 mb-2 text-xs uppercase tracking-wide">
                          Services Included:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                              <span className="text-gray-600 text-xs font-roboto font-light">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-1 gap-6">
            {/* Right Column - Info Sections */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Common Device Issues */}
              <div className="bg-white border border-gray-300 rounded p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#F5F2FA] rounded flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-poppins font-semibold text-gray-900">
                      Common Device Issues
                    </h3>
                    <p className="text-gray-600 text-xs font-roboto font-light">
                      Quick troubleshooting tips
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {deviceIssues.map((device, index) => {
                    const IconComponent = device.icon;
                    return (
                      <div 
                        key={index} 
                        className="border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200"
                      >
                        <button
                          onClick={() => toggleIssue(index)}
                          className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#F5F2FA] rounded">
                              <IconComponent className="w-3 h-3 text-[#8f1eae]" />
                            </div>
                            <span className="font-roboto font-medium text-gray-900 text-sm">
                              {device.type} Issues
                            </span>
                          </div>
                          <ChevronRight 
                            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                              activeIssue === index ? 'rotate-90' : ''
                            }`}
                          />
                        </button>
                        {activeIssue === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-3 pb-2"
                          >
                            <div className="flex flex-wrap gap-1 pt-2">
                              {device.common.map((issue, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-roboto font-light rounded">
                                  {issue}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Our Support Promise */}
              <div className="bg-white border border-gray-300 rounded p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#F5F2FA] rounded flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-poppins font-semibold text-gray-900">
                      Our Support Promise
                    </h3>
                    <p className="text-gray-600 text-xs font-roboto font-light">
                      What you can expect from us
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {supportPromise.map((promise, index) => {
                    const IconComponent = promise.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded">
                        <IconComponent className="w-4 h-4 text-[#8f1eae] flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-inter font-medium text-gray-900 text-sm mb-1">
                            {promise.title}
                          </h4>
                          <p className="text-gray-600 text-xs font-roboto font-light">
                            {promise.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Support */}
              <div className="bg-gray-900 border border-gray-800 rounded p-4 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                    <HeadphonesIcon className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-poppins font-semibold text-white">
                      Urgent Technical Support
                    </h3>
                    <p className="text-gray-400 text-xs font-roboto font-light">
                      For critical device issues
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed text-xs font-roboto font-light">
                  If your device is completely non-functional or has critical issues.
                </p>
                <div className="bg-gray-800 px-4 py-3 rounded text-center mb-3">
                  <p className="text-xl font-poppins font-semibold text-white">
                    +91 9373712701
                  </p>
                  <p className="text-gray-400 text-xs font-roboto font-light mt-1">
                    24/7 for warranty claims
                  </p>
                </div>
                <a 
                  href="tel:+919373712701"
                  className="block w-full py-2 bg-transparent text-white font-inter font-medium hover:bg-white hover:text-gray-900 transition-all duration-300 border border-white rounded uppercase text-xs tracking-wider text-center"
                >
                  Call Now for Urgent Support
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-300">
              <Star className="w-8 h-8 text-[#8f1eae]" />
            </div>
            <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-4">
              Your Satisfaction Matters Most
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm font-roboto font-light max-w-2xl mx-auto">
              At Rekraft, support doesn't end after the sale. We're committed to providing you with exceptional service every step of the way.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[#8f1eae] text-white px-6 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded uppercase text-xs tracking-wider"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}