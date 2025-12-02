import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  FileText, 
  Video, 
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HeadphonesIcon,
  Wrench,
  Smartphone,
  Laptop,
  Tablet
} from 'lucide-react';

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I reset my device?",
      answer: "To reset your device, hold the power and volume down buttons simultaneously for 10 seconds until the device restarts. For a factory reset, go to Settings > System > Reset Options."
    },
    {
      question: "My device won't turn on, what should I do?",
      answer: "First, ensure the device is charged for at least 30 minutes. Try a different charging cable and adapter. If the issue persists, contact our support team for further assistance."
    },
    {
      question: "How long does battery typically last?",
      answer: "Battery life varies by usage, but most devices provide 8-12 hours of continuous use. Optimize battery by reducing screen brightness and closing unused applications."
    },
    {
      question: "Is my device water-resistant?",
      answer: "Most Rekraft devices feature IP67 water and dust resistance, meaning they can withstand immersion in up to 1 meter of water for 30 minutes. However, water damage is not covered under warranty."
    },
    {
      question: "How do I update my device software?",
      answer: "Go to Settings > System > Software Update to check for available updates. Ensure your device is connected to Wi-Fi and has at least 50% battery before updating."
    }
  ];

  const supportResources = [
    {
      icon: FileText,
      title: "User Manuals",
      description: "Download detailed user guides and manuals",
      link: "#"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for common tasks",
      link: "#"
    },
    {
      icon: Wrench,
      title: "Troubleshooting Guides",
      description: "Solve common issues with our detailed guides",
      link: "#"
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Get help from other Rekraft users",
      link: "#"
    }
  ];

  const deviceCategories = [
    {
      icon: Smartphone,
      name: "Smartphones",
      issues: ["Screen issues", "Battery problems", "Software updates"]
    },
    {
      icon: Laptop,
      name: "Laptops",
      issues: ["Performance", "Hardware issues", "OS problems"]
    },
    {
      icon: Tablet,
      name: "Tablets",
      issues: ["Touch screen", "Connectivity", "App issues"]
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-gray-900 mb-4 tracking-widest uppercase font-poppins"
          >
            Technical Support
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base text-gray-600 max-w-2xl mx-auto mb-8 font-light leading-relaxed"
          >
            Expert help for your Rekraft devices. We're here to ensure you get the most out of your technology.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for solutions, guides, or issues..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:outline-none focus:border-[#8f1eae] focus:ring-1 focus:ring-[#8f1eae] transition-all duration-300 rounded text-sm font-light"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Quick Support Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-white border border-gray-300 p-8 text-center group hover:border-[#8f1eae] transition-all duration-300 rounded-lg">
            <div className="w-16 h-16 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-colors">
              <Phone className="w-8 h-8 text-[#8f1eae] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-widest uppercase font-inter">Phone Support</h3>
            <p className="text-xl font-normal text-[#8f1eae] mb-2">+91 98765 43210</p>
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-light">Mon-Sun, 9AM-9PM IST</span>
            </div>
            <button className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-all duration-300 border border-black tracking-widest uppercase text-sm rounded">
              Call Now
            </button>
          </div>

          <div className="bg-white border border-gray-300 p-8 text-center group hover:border-[#8f1eae] transition-all duration-300 rounded-lg">
            <div className="w-16 h-16 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-colors">
              <Mail className="w-8 h-8 text-[#8f1eae] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-widest uppercase font-inter">Email Support</h3>
            <p className="text-xl font-normal text-[#8f1eae] mb-2">contactrekraft@gmail.com</p>
            <p className="text-gray-500 text-sm mb-4 font-light">24/7 response within 4 hours</p>
            <button className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-all duration-300 border border-black tracking-widest uppercase text-sm rounded">
              Send Email
            </button>
          </div>

          <div className="bg-white border border-gray-300 p-8 text-center group hover:border-[#8f1eae] transition-all duration-300 rounded-lg">
            <div className="w-16 h-16 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-colors">
              <MessageCircle className="w-8 h-8 text-[#8f1eae] group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-widest uppercase font-inter">WhatsApp Chat</h3>
            <p className="text-xl font-normal text-[#8f1eae] mb-2">+91 98765 43210</p>
            <p className="text-gray-600 mb-4 font-light text-sm">Instant help from our support agents</p>
            <button className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-all duration-300 border border-black tracking-widest uppercase text-sm rounded">
              Start Chat
            </button>
          </div>
        </motion.div>

        {/* Device Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center tracking-widest uppercase font-poppins">
            Support by Device Type
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {deviceCategories.map((device, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-300 p-6 group hover:border-[#8f1eae] transition-all duration-300 rounded"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#F5F2FA] rounded group-hover:bg-[#8f1eae] transition-colors">
                    <device.icon className="w-6 h-6 text-[#8f1eae] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-base font-medium text-gray-900 tracking-wide">{device.name}</h3>
                </div>
                <ul className="space-y-2">
                  {device.issues.map((issue, issueIndex) => (
                    <li key={issueIndex} className="flex items-center gap-2 text-gray-600 text-sm font-light">
                      <span className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full"></span>
                      {issue}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 text-[#8f1eae] font-medium py-2 border border-[#8f1eae] hover:bg-[#8f1eae] hover:text-white transition-all duration-300 tracking-widest uppercase text-sm rounded">
                  Get Help
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Support Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center tracking-widest uppercase font-poppins">
            Support Resources
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportResources.map((resource, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-300 p-6 text-center group hover:border-[#8f1eae] transition-all duration-300 rounded"
              >
                <div className="w-12 h-12 bg-[#F5F2FA] rounded flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-colors">
                  <resource.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2 tracking-widest uppercase text-sm font-inter">{resource.title}</h3>
                <p className="text-gray-600 text-xs mb-4 font-light leading-relaxed">{resource.description}</p>
                <button className="text-[#8f1eae] font-medium text-xs flex items-center justify-center gap-1 mx-auto hover:text-[#7a1a99] transition-colors tracking-widest uppercase">
                  Explore <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-300 p-8 rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center tracking-widest uppercase font-poppins">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-300 group hover:border-[#8f1eae] transition-all duration-300 rounded"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F5F2FA] transition-colors rounded"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900 group-hover:text-[#8f1eae] transition-colors text-sm">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-4 h-4 text-[#8f1eae]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#8f1eae] transition-colors" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm font-light leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#F5F2FA] border border-gray-300 p-12 text-center mt-16 rounded-lg"
        >
          <div className="w-16 h-16 bg-[#8f1eae] rounded-full flex items-center justify-center mx-auto mb-6">
            <HeadphonesIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-widest uppercase font-poppins">
            Still Need Help?
          </h2>
          <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto font-light leading-relaxed">
            Our technical support team is ready to assist you with any complex issues or questions about your Rekraft devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#8f1eae] text-white px-8 py-3 font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] tracking-widest uppercase text-sm rounded">
              Contact Support Now
            </button>
            <button className="bg-transparent text-[#8f1eae] px-8 py-3 font-medium hover:bg-[#8f1eae] hover:text-white transition-all duration-300 border border-[#8f1eae] tracking-widest uppercase text-sm rounded">
              Schedule a Call
            </button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}