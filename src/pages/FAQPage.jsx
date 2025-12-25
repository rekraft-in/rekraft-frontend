import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp, Search, Mail, Phone, MessageCircle, Clock, FileText, Video, ExternalLink, Headphones, Wrench, Smartphone, Laptop, Tablet, CheckCircle, Shield, Truck, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    {
      id: 'product',
      title: "Product & Quality",
      icon: Wrench,
      color: "from-[#8f1eae] to-[#6b1a8a]",
      faqs: [
        {
          question: "What quality checks do your refurbished laptops undergo?",
          answer: "Every Rekraft laptop undergoes 50+ comprehensive quality checks including hardware diagnostics, battery health testing (replaced if below 80%), screen quality assessment, keyboard functionality, performance benchmarking, and cosmetic evaluation. We only certify devices that meet 95%+ of original performance standards.",
          tags: ["quality", "testing", "refurbishment"]
        },
        {
          question: "Are the laptops genuinely refurbished or just used?",
          answer: "All our laptops are professionally refurbished, not just cleaned used devices. The refurbishment process includes component replacement where needed (batteries, keyboards, storage), thorough cleaning, software reinstallation, and comprehensive testing. Each device receives our Rekraft Certified seal upon passing all quality checks.",
          tags: ["refurbished", "certified", "process"]
        },
        {
          question: "Do you provide original accessories with the laptops?",
          answer: "Yes, each laptop comes with genuine charger, appropriate cables, and protective packaging. For Apple devices, we include genuine MagSafe or USB-C chargers. All accessories are tested and verified for functionality before shipment.",
          tags: ["accessories", "charger", "included"]
        },
        {
          question: "What brands of refurbished laptops do you offer?",
          answer: "We offer professionally refurbished laptops from leading brands including Apple MacBooks, Dell, HP, Lenovo, Microsoft Surface, ASUS, Samsung and Acer, each certified through our rigorous quality process.",
          tags: ["brands", "apple", "dell", "hp"]
        }
      ]
    },
    {
      id: 'warranty',
      title: "Warranty & Support",
      icon: Shield,
      color: "from-[#10B981] to-[#047857]",
      faqs: [
        {
          question: "What warranty do you offer on refurbished laptops?",
          answer: "All Rekraft refurbished laptops come with a comprehensive 1-year warranty covering parts and labor. This includes free repairs, component replacements, technical support, and free shipping for warranty claims. Extended warranty options (2-3 years) are available at purchase.",
          tags: ["warranty", "coverage", "support"]
        },
        {
          question: "How do I claim warranty service?",
          answer: "Contact our support team via phone +91 93737 12701, email contactrekraft@gmail.com . Provide your order ID and describe the issue. We offer doorstep pickup for warranty claims across India with 5-7 day turnaround for most repairs.",
          tags: ["claim", "repair", "support"]
        },
        {
          question: "Does warranty cover accidental damage?",
          answer: "Standard warranty covers manufacturing defects and component failures. For accidental damage protection, we offer optional Rekraft Care plans that cover screen damage, liquid spills, and accidental drops. These can be purchased within 30 days of device delivery.",
          tags: ["accidental", "damage", "protection"]
        },
        {
          question: "What technical support is included?",
          answer: "We provide comprehensive technical support including phone support (9AM-9PM daily), email support (24/7 response within 24 hours), live chat, remote assistance, and setup guidance. Support covers software issues, hardware troubleshooting, and optimization advice.",
          tags: ["technical", "support", "help"]
        }
      ]
    },
    {
      id: 'shipping',
      title: "Shipping & Delivery",
      icon: Truck,
      color: "from-[#3B82F6] to-[#1D4ED8]",
      faqs: [
        {
          question: "What are your shipping options and delivery timelines?",
          answer: "We offer free standard shipping (3-5 business days) across India. Express shipping (1-2 business days) is available for ₹299. All orders are processed within 24 hours with real-time tracking via SMS and email.",
          tags: ["shipping", "delivery", "timeline"]
        },
        {
          question: "Do you offer installation and setup assistance?",
          answer: "Yes, we provide free remote setup assistance for all customers. Our technicians can help with initial setup, data transfer from old devices, software installation, and optimization. This service is available within 7 days of delivery.",
          tags: ["setup", "installation", "assistance"]
        },
        {
          question: "Can I track my order in real-time?",
          answer: "Absolutely. Once your order ships, you'll receive tracking information via SMS and email. You can track your package in real-time through our website or the courier partner's app with live location updates.",
          tags: ["tracking", "order", "updates"]
        },
        {
          question: "What is your delivery coverage area?",
          answer: "We deliver to 25,000+ pin codes across India including tier 2/3 cities. For remote locations, delivery may take 1-2 additional days. Contact us for specific location queries before ordering.",
          tags: ["delivery", "coverage", "india"]
        }
      ]
    },
    {
      id: 'technical',
      title: "Technical Questions",
      icon: Laptop,
      color: "from-[#8B5CF6] to-[#7C3AED]",
      faqs: [
        {
          question: "What operating system comes pre-installed?",
          answer: "All Windows laptops come with genuine Windows 10/11 Pro with license activated. Apple MacBooks come with the latest compatible macOS. We can also install Linux distributions upon request at no additional charge.",
          tags: ["os", "windows", "macos", "linux"]
        },
        {
          question: "Can the RAM or storage be upgraded?",
          answer: "Most Rekraft laptops are upgradeable. We offer upgrade services at purchase - you can customize RAM and SSD storage. Post-purchase upgrades can be done through our service centers or authorized partners.",
          tags: ["upgrade", "ram", "storage", "ssd"]
        },
        {
          question: "What about battery life and health?",
          answer: "All batteries are tested and replaced if below 80% health. Typical battery life is 6-10 hours depending on model and usage. We provide battery health certification with each device showing cycle count and maximum capacity.",
          tags: ["battery", "health", "life"]
        },
        {
          question: "Do you provide data wiping certification?",
          answer: "Yes, all devices undergo secure data erasure using DoD 5220.22-M standards. We provide data wiping certification with each device ensuring complete removal of previous user data for your privacy and security.",
          tags: ["data", "security", "privacy", "wiping"]
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.id }))
  );

  const filteredFaqs = activeCategory === 'all' 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : faqCategories
        .find(cat => cat.id === activeCategory)
        ?.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        ) || [];

  const supportOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      contact: "+91 98765 43210",
      timing: "Mon-Sun, 9AM-9PM IST",
      description: "Direct technical support",
      action: "CALL NOW",
      color: "bg-[#8f1eae]",
      hoverColor: "bg-[#7a1a99]"
    },
    {
      icon: Mail,
      title: "Email Support",
      contact: "support@rekraft.in",
      timing: "24/7 (Response within 4 hours)",
      description: "Detailed queries and documentation",
      action: "SEND EMAIL",
      color: "bg-[#10B981]",
      hoverColor: "bg-[#059669]"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      contact: "Click to Start",
      timing: "Mon-Sat, 10AM-8PM IST",
      description: "Instant help from support agents",
      action: "START CHAT",
      color: "bg-[#3B82F6]",
      hoverColor: "bg-[#2563EB]"
    }
  ];

  const quickStats = [
    { label: "Avg. Response Time", value: "24 Hours", icon: Clock },
    { label: "Customer Satisfaction", value: "95%", icon: CheckCircle },
    { label: "Warranty Claims Resolved", value: "24-48 Hours", icon: Shield },
    { label: "Free Shipping", value: "Pan India", icon: Truck }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-lato">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F5F2FA] to-white py-20 border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-light text-gray-900 mb-6 tracking-tight font-montserrat"
          >
            Rekraft Support & FAQ Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-lato font-light"
          >
            Get instant answers about refurbished laptops, warranty, shipping, and technical support. 
            Find solutions for Dell, HP, Apple MacBooks, Lenovo, and other premium brands.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white p-6 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Icon className="w-5 h-5 text-[#8f1eae]" />
                    <span className="text-xs font-inter font-medium text-gray-900 uppercase tracking-wide">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-2xl font-light text-[#8f1eae] font-montserrat">
                    {stat.value}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-3 text-sm font-inter font-medium tracking-wide border rounded-[4px] transition-all duration-300 ${
              activeCategory === 'all'
                ? 'bg-[#8f1eae] text-white border-[#8f1eae] hover:bg-[#7a1a99]'
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#8f1eae] hover:text-[#8f1eae]'
            } uppercase`}
          >
            All Questions
          </button>
          {faqCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 text-sm font-inter font-medium tracking-wide border rounded-[4px] transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? 'bg-[#8f1eae] text-white border-[#8f1eae] hover:bg-[#7a1a99]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#8f1eae] hover:text-[#8f1eae]'
                } uppercase`}
              >
                {typeof Icon === 'string' ? (
                  <span>{Icon}</span>
                ) : (
                  <Icon className="w-4 h-4" />
                )}
                {category.title}
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ Results */}
        <div className="space-y-4 mb-20">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const categoryTitle = faqCategories.find(c => c.id === faq.category)?.title;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className="bg-white border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300 overflow-hidden group"
                >
                  <button
                    className="w-full text-left p-8 flex justify-between items-start gap-8 hover:bg-[#F5F2FA] transition-all duration-300"
                    onClick={() => setOpenFaq(openFaq === `${faq.category}-${index}` ? null : `${faq.category}-${index}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-inter font-medium text-[#8f1eae] bg-[#F5F2FA] px-3 py-1 rounded-[4px] uppercase tracking-wide">
                          {categoryTitle?.split(' ')[0]}
                        </span>
                        <div className="flex gap-2">
                          {faq.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-[4px] font-lato">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-lg font-inter font-medium text-gray-900 group-hover:text-[#8f1eae] transition-colors leading-relaxed">
                        {faq.question}
                      </h3>
                    </div>
                    {openFaq === `${faq.category}-${index}` ? (
                      <ChevronUp className="w-6 h-6 text-[#8f1eae] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-[#8f1eae] transition-colors flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === `${faq.category}-${index}` && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="px-8 pb-8"
                    >
                      <div className="pt-6 border-t border-gray-300">
                        <p className="text-gray-600 leading-relaxed font-lato font-light mb-6">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-3 tracking-tight font-montserrat">
                No results found
              </h3>
              <p className="text-gray-600 font-lato font-light mb-8">
                Try different keywords or browse by category above
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className="bg-transparent text-[#8f1eae] px-6 py-3 font-inter font-medium hover:text-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide"
              >
                View All Questions
              </button>
            </motion.div>
          )}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#8f1eae] rounded-[4px] p-16 text-center"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <Headphones className="w-10 h-10 text-[#8f1eae]" />
          </div>
          <h2 className="text-3xl font-light text-white mb-6 tracking-tight font-montserrat">
            Need Personalized Assistance?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto font-lato font-light opacity-90 leading-relaxed">
            Our technical experts are ready to help with specific questions about refurbished laptops, 
            configuration advice, or troubleshooting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919876543210"
              className="bg-white text-[#8f1eae] px-8 py-3 font-inter font-medium hover:bg-gray-50 transition-all duration-300 border border-white rounded-[4px] uppercase text-sm tracking-wide flex items-center gap-2 justify-center"
            >
              CALL: +91 98765 43210
            </a>
            <a
              href="mailto:support@rekraft.in"
              className="bg-transparent text-white px-8 py-3 font-inter font-medium hover:bg-white hover:text-[#8f1eae] transition-all duration-300 border border-white rounded-[4px] uppercase text-sm tracking-wide flex items-center gap-2 justify-center"
            >
              EMAIL SUPPORT
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-white text-sm mt-8 font-lato font-light">
            Average response time: 4 hours • Available 7 days a week
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}