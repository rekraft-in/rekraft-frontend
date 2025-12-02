import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { 
  Shield, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Settings,
  ArrowRight
} from 'lucide-react';

export default function WarrantyPage() {
  const stats = [
    { number: "1 Year", label: "Standard Warranty", icon: Shield },
    { number: "98%", label: "Claim Success Rate", icon: CheckCircle },
    { number: "5-7 Days", label: "Average Repair Time", icon: Clock },
    { number: "50+", label: "Service Centers", icon: MapPin }
  ];

  const coverageItems = [
    {
      icon: Zap,
      title: "What's Covered",
      items: [
        "Manufacturing defects",
        "Hardware malfunctions",
        "Battery performance issues",
        "Screen abnormalities"
      ],
      color: "text-green-700",
      bgColor: "bg-green-100"
    },
    {
      icon: AlertTriangle,
      title: "What's Not Covered",
      items: [
        "Accidental damage (drops, spills)",
        "Unauthorized modifications",
        "Normal wear and tear",
        "Cosmetic damage"
      ],
      color: "text-orange-700",
      bgColor: "bg-orange-100"
    },
    {
      icon: Settings,
      title: "Claim Process",
      items: [
        "Contact our support team",
        "Provide device details and issue",
        "Receive shipping label",
        "Free diagnostics & repair",
        "Device returned within 7 days"
      ],
      color: "text-blue-700",
      bgColor: "bg-blue-100"
    }
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: "Call Us",
      contact: "1-800-REKRAFT",
      details: "Mon-Fri, 9AM-6PM EST",
      color: "bg-[#8f1eae]"
    },
    {
      icon: Mail,
      title: "Email Us",
      contact: "support@rekraft.com",
      details: "24/7 response within 4 hours",
      color: "bg-[#8f1eae]"
    },
    {
      icon: MapPin,
      title: "Service Centers",
      contact: "50+ locations",
      details: "Find nearest center",
      color: "bg-[#8f1eae]"
    }
  ];

  const faqs = [
    {
      question: "How do I check my warranty status?",
      answer: "Visit our warranty portal and enter your device serial number found on the original packaging or in your account settings."
    },
    {
      question: "What documentation do I need for a claim?",
      answer: "You'll need your original purchase receipt and device serial number. For extended warranty claims, your protection plan certificate is required."
    },
    {
      question: "How long do repairs typically take?",
      answer: "Most repairs are completed within 5-7 business days after we receive your device. Expedited service is available for extended warranty holders."
    },
    {
      question: "Can I transfer my warranty?",
      answer: "Yes, the standard warranty is transferable to new owners. Extended warranty plans can be transferred for a small administrative fee."
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="relative bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#F5F2FA] px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#8f1eae]" />
              <span className="text-sm font-medium text-gray-700 uppercase tracking-widest font-inter">Warranty Protection</span>
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-6 tracking-wide uppercase font-poppins">
              Warranty & Support
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light font-roboto"
            >
              Comprehensive protection and dedicated support for your Rekraft devices
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F5F2FA] border-y border-gray-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded"
                >
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#8f1eae] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-semibold text-[#8f1eae] mb-2 font-poppins">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-light text-xs uppercase tracking-widest font-roboto">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Warranty Promise & Extended Plans */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Warranty Promise */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-300 p-8 group hover:border-[#8f1eae] transition-all duration-300 rounded-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#F5F2FA] rounded group-hover:bg-[#8f1eae] transition-all duration-300">
                <Shield className="w-8 h-8 text-[#8f1eae] group-hover:text-white transition-colors duration-300" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">
                  Our Warranty Promise
                </h2>
                <p className="text-gray-500 text-sm font-light mt-1 font-roboto">
                  Complete peace of mind
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed font-light mb-8 font-roboto">
              At Rekraft, we stand behind the quality of our products. Every device comes with comprehensive 
              warranty coverage designed to give you complete peace of mind.
            </p>

            <div className="bg-[#F5F2FA] p-6 border border-[#8f1eae]/20 rounded">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#8f1eae] rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-900 tracking-wide font-poppins">
                  1-Year Comprehensive Warranty
                </h3>
              </div>
              <ul className="space-y-3 text-gray-700 font-roboto">
                {[
                  "Full coverage for hardware defects and manufacturing issues",
                  "Free repair or replacement service",
                  "5-7 business day average turnaround time",
                  "Nationwide service coverage",
                  "Free shipping both ways"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-light">
                    <CheckCircle className="w-4 h-4 text-[#8f1eae] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Extended Warranty Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-gray-300 p-8 group hover:border-[#8f1eae] transition-all duration-300 rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-wide uppercase font-poppins">
              Extended Protection Plans
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "2-Year Extended Warranty",
                  price: "$49.99",
                  description: "Extend your protection with additional year of comprehensive coverage",
                  features: [
                    "All benefits of standard warranty",
                    "Accidental damage protection",
                    "Priority support service"
                  ]
                },
                {
                  title: "3-Year Premium Care",
                  price: "$79.99",
                  description: "Maximum protection with our premium care package",
                  features: [
                    "All benefits of extended warranty",
                    "On-site service option",
                    "Loaner device during repairs"
                  ]
                }
              ].map((plan, index) => (
                <div key={index} className="border border-gray-300 p-6 hover:border-[#8f1eae] transition-all duration-300 group rounded">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                      {plan.title}
                    </h3>
                    <span className="bg-[#8f1eae] text-white px-3 py-1 rounded-full text-sm font-medium font-roboto">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm font-light mb-4 font-roboto">
                    {plan.description}
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700 font-light font-roboto">
                        <CheckCircle className="w-4 h-4 text-[#8f1eae] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full mt-4 bg-white border border-[#8f1eae] text-[#8f1eae] py-3 text-sm font-medium hover:bg-[#8f1eae] hover:text-white transition-all duration-300 tracking-wide uppercase rounded font-roboto">
                    ADD TO CART
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Coverage Details */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins">
                Coverage Details
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
                Clear understanding of what's included in your warranty protection
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {coverageItems.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded-lg"
                  >
                    <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#8f1eae] transition-all duration-300">
                      <IconComponent className={`w-6 h-6 ${section.color} group-hover:text-white transition-colors duration-300`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-sm text-gray-600 font-light font-roboto">
                          <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 bg-[#F5F2FA] border-y border-gray-300">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins">
                Get Support
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
                Multiple ways to reach our dedicated support team
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {supportOptions.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">{item.title}</h3>
                    <p className="text-[#8f1eae] font-medium mb-1 font-roboto">{item.contact}</p>
                    <p className="text-gray-500 text-sm font-light font-roboto">{item.details}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
                Quick answers to common warranty questions
              </p>
            </motion.div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-300 pb-6 last:border-b-0 last:pb-0 group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-3 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                    <div className="w-2 h-2 bg-[#8f1eae] rounded-full flex-shrink-0"></div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm font-light pl-5 leading-relaxed font-roboto">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black text-white rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold mb-4 tracking-wide uppercase font-poppins"
            >
              Need Immediate Assistance?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed font-light font-roboto"
            >
              Our support team is ready to help you with any warranty claims or questions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] tracking-wide uppercase rounded font-roboto">
                CONTACT SUPPORT
              </button>
              <button className="bg-transparent text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 border border-white tracking-wide uppercase rounded font-roboto flex items-center justify-center gap-2">
                CHECK WARRANTY STATUS
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}