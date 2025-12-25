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
  XCircle,
  Zap,
  Settings,
  ArrowRight,
  Battery,
  Cpu,
  HardDrive,
  Keyboard,
  SmartphoneCharging,
  Thermometer,
  Monitor,
  Wrench,
  AlertTriangle,
  FileText
} from 'lucide-react';

export default function WarrantyPage() {
  const stats = [
    { number: "2 Years", label: "Warranty Protection", icon: Shield },
    { number: "40+", label: "Quality Checkpoints", icon: CheckCircle },
    { number: "24-48 Hours", label: "Diagnosis Time", icon: Clock },
    { number: "OEM Grade", label: "Parts Quality", icon: Cpu }
  ];

  const coverageDetails = [
    {
      icon: Cpu,
      title: "Motherboard",
      description: "Non-physical issues covered",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: HardDrive,
      title: "SSD/HDD",
      description: "Failure due to manufacturing defects",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Cpu,
      title: "RAM",
      description: "Memory failure coverage",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Keyboard,
      title: "Keyboard/Trackpad",
      description: "Malfunction protection",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: SmartphoneCharging,
      title: "Charging System",
      description: "Port & adapter failure",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Thermometer,
      title: "Performance",
      description: "Overheating & performance issues",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Monitor,
      title: "Display",
      description: "Non-physical damage issues",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Wrench,
      title: "Software Support",
      description: "Diagnostic & optimization",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    }
  ];

  const notCoveredItems = [
    "Physical damage (drops, cracks, bent frame)",
    "Liquid damage",
    "Burn damage, short-circuit, or power surge",
    "Intentional or accidental damage",
    "Battery swelling due to misuse",
    "Pirated/malicious software damage",
    "Unauthorized third-party repairs",
    "Accessories (mouse, bag, cables)",
    "Cosmetic issues (scratches, dents, faded keys)"
  ];

  const warrantyProcess = [
    {
      step: "1",
      title: "Raise a Ticket",
      description: "Contact via WhatsApp, website form, or email with invoice and issue details",
      icon: FileText
    },
    {
      step: "2",
      title: "Free Diagnosis",
      description: "Our technician diagnoses within 24-48 hours",
      icon: Settings
    },
    {
      step: "3",
      title: "Repair/Replacement",
      description: "Free if covered, discounted quote if not covered",
      icon: Wrench
    },
    {
      step: "4",
      title: "Delivery/Pickup",
      description: "Device returned professionally packed",
      icon: ArrowRight
    }
  ];

  const batteryWarranty = [
    {
      period: "Year 1",
      coverage: "Full Coverage",
      details: [
        "Free replacement if health drops below acceptable performance",
        "Coverage for sudden shutdowns",
        "Charging cycle issues"
      ],
      highlight: true
    },
    {
      period: "Year 2",
      coverage: "Extended Support",
      details: [
        "Service support included",
        "Discounted replacement (not free)",
        "Diagnostics and assistance"
      ],
      highlight: false
    }
  ];

  const supportOptions = [
    {
      icon: Phone,
      title: "WhatsApp Support",
      contact: "+91-9373712701",
      details: "Quick response for warranty claims",
      color: "bg-[#8f1eae]"
    },
    {
      icon: Mail,
      title: "Email Support",
      contact: "contactrekraft@gmail.com",
      details: "24-48 hour response time",
      color: "bg-[#8f1eae]"
    },
    {
      icon: MapPin,
      title: "Service Network",
      contact: "Pan-India Coverage",
      details: "Professional service centers",
      color: "bg-[#8f1eae]"
    }
  ];

  const faqs = [
    {
      question: "What does the 2-year warranty cover?",
      answer: "It covers manufacturing/refurbishment-related issues including motherboard, SSD/HDD, RAM, keyboard, charging, performance issues, and display problems not caused by physical damage. Battery has Year 1 full replacement and Year 2 extended support."
    },
    {
      question: "What is NOT covered under warranty?",
      answer: "Physical damage, liquid damage, burn/short-circuit damage, intentional damage, battery swelling from misuse, pirated software damage, unauthorized repairs, accessories, and cosmetic issues are not covered."
    },
    {
      question: "How do I claim my warranty?",
      answer: "1. Raise a ticket via WhatsApp/website/email with invoice and issue description. 2. Free diagnosis within 24-48 hours. 3. Free repair if covered or discounted quote if not covered. 4. Professional delivery/pickup after repair."
    },
    {
      question: "Is the warranty transferable if I sell my device?",
      answer: "No, the Rekraft warranty is non-transferable. If you re-sell the device, the warranty does not transfer to the new owner."
    },
    {
      question: "What happens to the battery warranty in Year 2?",
      answer: "Year 2 provides extended support including service assistance and diagnostics, but battery replacement is at discounted rates (not free). This helps maintain sustainable business margins."
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
              <span className="text-sm font-medium text-gray-700 uppercase tracking-widest font-inter">Rekraft Assured</span>
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-6 tracking-wide uppercase font-poppins">
              2-Year Warranty Protection
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light font-roboto"
            >
              One of the longest warranty protections in India for refurbished laptops and PC components
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
        {/* Warranty Coverage Details */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins">
              What's Covered Under Warranty
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
              Protection against manufacturing or refurbishment-related issues during normal usage
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coverageDetails.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded-lg text-center"
                >
                  <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-light font-roboto">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Additional Protection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F5F2FA] p-8 border border-[#8f1eae]/20 rounded-lg mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-[#8f1eae]" />
              <h3 className="text-xl font-semibold text-gray-900 tracking-wide font-poppins">
                Additional Protection & Support
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                "Free diagnostics for any issue",
                "Free servicing for performance concerns",
                "Priority support for all customers"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#8f1eae] flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-light font-roboto">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* What's NOT Covered */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">
                What's NOT Covered
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
              To protect sustainability and ensure fair use for all customers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notCoveredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 border border-gray-300 hover:border-red-300 transition-all duration-300 rounded-lg group"
              >
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm font-light font-roboto group-hover:text-red-700 transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Battery Warranty Breakdown */}
        <section className="mb-16 bg-[#F5F2FA] p-8 rounded-lg border border-gray-300">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Battery className="w-8 h-8 text-[#8f1eae]" />
              <h2 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">
                Battery Warranty Breakdown
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
              Fair terms for sustainable business while protecting customer trust
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {batteryWarranty.map((period, index) => (
              <motion.div
                key={period.period}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`bg-white p-6 border rounded-lg ${
                  period.highlight 
                    ? 'border-[#8f1eae] shadow-lg' 
                    : 'border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 font-poppins">{period.period}</div>
                    <div className={`text-lg font-semibold ${
                      period.highlight ? 'text-[#8f1eae]' : 'text-gray-600'
                    } font-poppins`}>
                      {period.coverage}
                    </div>
                  </div>
                  {period.highlight && (
                    <div className="bg-[#8f1eae] text-white px-3 py-1 rounded-full text-sm font-medium">
                      Full Protection
                    </div>
                  )}
                </div>
                <ul className="space-y-3">
                  {period.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-light font-roboto">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                {!period.highlight && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 font-light">
                    Note: Protects business margins while maintaining customer trust
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Warranty Claim Process */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins">
              How Warranty Claims Work
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
              Simple 4-step process for worry-free warranty service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warrantyProcess.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white p-6 border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded-lg h-full">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#8f1eae] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mb-4 group-hover:bg-[#8f1eae] transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-[#8f1eae] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-light leading-relaxed font-roboto">
                      {step.description}
                    </p>
                  </div>
                  {index < warrantyProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-300"></div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 bg-[#F5F2FA] border-y border-gray-300 mb-16">
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
                Multiple ways to reach our dedicated warranty support team
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
        <section className="py-16 bg-white mb-16">
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
                Quick answers about your Rekraft warranty
              </p>
            </motion.div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-300 p-6 rounded-lg hover:border-[#8f1eae] transition-all duration-300 group"
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

        {/* Why 2 Years & Rekraft Promise */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Why We Offer 2 Years */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-300 p-8 rounded-lg hover:border-[#8f1eae] transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 tracking-wide uppercase font-poppins">
                Why We Offer 2 Years
              </h2>
              <ul className="space-y-4">
                {[
                  "40+ step refurbishment ensures long life",
                  "OEM-grade parts for reliability",
                  "Thermal servicing & deep cleaning by technicians",
                  "Every component stress-tested before selling",
                  "Confident protection with healthy margins"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-light font-roboto">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Rekraft Promise */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#8f1eae] text-white p-8 rounded-lg"
            >
              <h2 className="text-2xl font-semibold mb-6 tracking-wide uppercase font-poppins">
                Rekraft Promise
              </h2>
              <p className="text-white/90 font-light mb-6 leading-relaxed font-roboto">
                Your laptop is more than a device — it's your daily companion. With Rekraft, you get:
              </p>
              <ul className="space-y-4">
                {[
                  "Certified refurbished quality",
                  "Long-term trust & reliability",
                  "Strongest warranty in refurbished market",
                  "Professional support when you need it",
                  "Sustainable business practices"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-white/80 flex-shrink-0" />
                    <span className="font-light font-roboto">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Warranty Validity Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-16"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3 font-poppins">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Warranty Validity Rules
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Warranty starts from date of purchase",
              "Invoice must be shown to claim warranty",
              "Device, serial number, and Rekraft seal must be intact",
              "Only normal usage issues covered",
              "Warranty is non-transferable if device re-sold"
            ].map((rule, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm font-light font-roboto">{rule}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <section className="py-16 bg-black text-white rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold mb-4 tracking-wide uppercase font-poppins"
            >
              Need Warranty Assistance?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed font-light font-roboto"
            >
              Our support team is ready to help with warranty claims, diagnostics, and repairs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button className="bg-transparent text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 border border-white tracking-wide uppercase rounded font-roboto flex items-center justify-center gap-2">
                Contact +91 9373712701
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