import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { 
  Truck, Clock, MapPin, Package, 
  Phone, Mail, CheckCircle, Shield, 
  Navigation, Globe, AlertCircle, 
  Calendar, ShieldCheck, Map
} from 'lucide-react';

export default function ShippingPage() {
  const shippingStats = [
    { number: "9-15 Days", label: "Processing Time", icon: Clock },
    { number: "Pan-India", label: "Domestic Coverage", icon: Map },
    { number: "International", label: "Worldwide Shipping", icon: Globe },
    { number: "Registered", label: "Courier Partners", icon: ShieldCheck }
  ];

  const shippingOptions = [
    {
      step: "01",
      title: "Domestic Shipping",
      description: "Orders shipped through registered domestic courier companies and/or speed post. Delivery timelines vary based on location and courier norms.",
      icon: "🇮🇳",
      features: ["Registered couriers", "Speed post available", "Trackable service", "9-15 day processing"],
      badge: "Most Popular"
    },
    {
      step: "02",
      title: "International Shipping",
      description: "Worldwide delivery through registered international courier companies and/or International speed post. Customs clearance support included.",
      icon: "🌍",
      features: ["International couriers", "Global coverage", "Customs support", "Trackable service"],
      badge: "Global Reach"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Order Confirmation",
      description: "Order is confirmed after payment verification and address validation.",
      icon: "✅"
    },
    {
      step: "02",
      title: "Processing Period",
      description: "Orders are processed and prepared for shipment within 9-15 days from order date.",
      icon: "⚙️"
    },
    {
      step: "03",
      title: "Quality Verification",
      description: "Each product undergoes final quality check and secure packaging.",
      icon: "🔍"
    },
    {
      step: "04",
      title: "Courier Handover",
      description: "Products handed to registered courier partners with complete documentation.",
      icon: "📦"
    },
    {
      step: "05",
      title: "In Transit",
      description: "Shipment progresses according to courier company/post office norms.",
      icon: "🚚"
    },
    {
      step: "06",
      title: "Delivery Completion",
      description: "Delivery confirmed at the address provided by buyer with email notification.",
      icon: "🏡"
    }
  ];

  const shippingInfo = [
    {
      icon: Calendar,
      title: "Processing Timeline",
      description: "Orders are processed and handed to courier within 9-15 days from order confirmation. Courier delivery time is additional."
    },
    {
      icon: Globe,
      title: "International Orders",
      description: "For international buyers, orders shipped through registered international courier companies with customs clearance support."
    },
    {
      icon: Shield,
      title: "Secure Packaging",
      description: "All products undergo quality check and are securely packaged to prevent damage during transit."
    },
    {
      icon: AlertCircle,
      title: "Important Notice",
      description: "We guarantee handover to courier within 9-15 days. Delivery delays by courier are beyond our control."
    }
  ];

  const disclaimerPoints = [
    "Orders shipped to address provided by buyer at time of purchase",
    "Delivery confirmation sent to registered email ID upon completion",
    "Shipping timelines subject to courier company/post office norms",
    "International shipments subject to customs clearance procedures",
    "Contact for shipping issues: +91 93737 12701",
    "Email support: contactrekraft@gmail.com"
  ];

  const supportContacts = [
    {
      icon: Phone,
      title: "Support Helpline",
      value: "+91 93737 12701",
      action: "tel:+919373712701"
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "contactrekraft@gmail.com",
      action: "mailto:contactrekraft@gmail.com"
    },
    {
      icon: MapPin,
      title: "Business Entity",
      value: "SHREYASH VINOD SHIRSIKAR",
      action: null
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="relative bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-6 h-px bg-[#8f1eae]"></div>
              <span className="text-xs uppercase tracking-widest text-[#8f1eae] font-medium font-inter">
                Shipping Policy
              </span>
              <div className="w-6 h-px bg-[#8f1eae]"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#111827] mb-6 tracking-tight font-poppins">
              Shipping & Delivery
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base text-[#6B7280] max-w-3xl mx-auto leading-relaxed font-light"
            >
              Last updated on Dec 2nd 2025. Reliable domestic and international shipping with transparent timelines and tracking.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#F5F2FA] border-y border-[#D1D5DB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {shippingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="relative bg-white border border-[#D1D5DB] rounded-lg p-4 group hover:border-[#8f1eae] transition-all duration-300"
              >
                <div className="absolute -top-3 left-4">
                  <div className="w-10 h-10 bg-[#8f1eae] rounded flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="text-xl font-semibold text-[#111827] mb-2 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                    {stat.number}
                  </div>
                  <div className="text-[#6B7280] font-light text-xs uppercase tracking-wider font-inter">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#111827] mb-4 tracking-tight font-poppins">
              Shipping Methods
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-base font-light">
              Partnering with registered courier services for safe and reliable delivery worldwide.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {shippingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white border border-[#D1D5DB] rounded-lg p-6 hover:border-[#8f1eae] transition-all duration-300 h-full"
              >
                {option.badge && (
                  <div className="absolute -top-2 left-6">
                    <span className="bg-[#8f1eae] text-white px-3 py-1 text-xs font-medium tracking-wider rounded-full font-inter">
                      {option.badge}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-semibold rounded mr-4 flex-shrink-0 group-hover:bg-[#8f1eae] transition-colors duration-300">
                    {option.step}
                  </div>
                  <div className="text-3xl transform group-hover:scale-105 transition-transform duration-300">
                    {option.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#111827] mb-4 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                  {option.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed mb-6 text-sm font-light">
                  {option.description}
                </p>
                <div className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 text-sm text-[#6B7280]">
                      <div className="w-5 h-5 bg-[#F5F2FA] rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#8f1eae]" />
                      </div>
                      <span className="font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-16 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-[#111827] mb-4 tracking-tight font-poppins">
              Order Journey
            </h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto text-base font-light">
              Transparent process from order confirmation to delivery at your doorstep
            </p>
          </motion.div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-[#D1D5DB]"></div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  className={`group relative bg-white border border-[#D1D5DB] rounded-lg p-4 hover:border-[#8f1eae] transition-all duration-300 ${
                    index >= 3 ? 'lg:mt-8' : ''
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs font-semibold rounded flex-shrink-0 group-hover:bg-[#8f1eae] transition-colors duration-300">
                      {step.step}
                    </div>
                    <div className="text-xl transform group-hover:scale-105 transition-transform duration-300">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827] mb-2 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed text-xs font-light">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-[#8f1eae]"></div>
                <h2 className="text-2xl font-semibold text-[#111827] tracking-tight font-poppins">
                  Key Information
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {shippingInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="bg-[#F5F2FA] border border-[#D1D5DB] rounded-lg p-4 hover:border-[#8f1eae] transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-[#8f1eae] rounded flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#111827] mb-1 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">
                          {info.title}
                        </h3>
                        <p className="text-[#6B7280] font-light text-xs leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-[#8f1eae]"></div>
                  <h2 className="text-2xl font-semibold text-[#111827] tracking-tight font-poppins">
                    Important Points
                  </h2>
                </div>
                <div className="bg-[#F5F2FA] border border-[#D1D5DB] rounded-lg p-4">
                  <div className="space-y-3 mb-6">
                    {disclaimerPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-white rounded">
                        <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full mt-1.5 flex-shrink-0"></div>
                        <p className="text-[#6B7280] font-light text-xs leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4">
                      <h3 className="font-semibold text-[#111827] mb-2 font-poppins flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-[#8f1eae]" />
                        Delivery Address
                      </h3>
                      <p className="text-[#6B7280] font-light text-xs leading-relaxed">
                        All orders delivered to address provided during purchase. Delivery confirmation sent to registered email.
                      </p>
                    </div>
                    
                    <div className="bg-white rounded p-4">
                      <h3 className="font-semibold text-[#111827] mb-2 font-poppins flex items-center gap-2 text-sm">
                        <ShieldCheck className="w-4 h-4 text-[#8f1eae]" />
                        Processing Guarantee
                      </h3>
                      <p className="text-[#6B7280] font-light text-xs leading-relaxed">
                        We guarantee to hand over consignment to courier within 9-15 days from order confirmation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold mb-3 tracking-tight font-poppins"
            >
              Need Shipping Assistance?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base text-[#9CA3AF] mb-6 max-w-2xl mx-auto leading-relaxed font-light"
            >
              For any shipping-related queries or issues, contact our dedicated support team.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
            >
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-[#8f1eae] text-white px-6 py-3 text-sm font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] tracking-wider uppercase rounded font-inter"
              >
                Contact Support
              </button>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {supportContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-[#111827] rounded-lg p-4 text-center"
              >
                <div className="w-12 h-12 bg-[#8f1eae] rounded-full flex items-center justify-center mx-auto mb-3">
                  <contact.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-medium mb-1 text-xs uppercase tracking-wider font-inter">
                  {contact.title}
                </p>
                {contact.action ? (
                  <a 
                    href={contact.action}
                    className="text-white font-light text-sm hover:text-[#8f1eae] transition-colors duration-300 block"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <p className="text-white font-light text-sm">{contact.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-white border-t border-[#D1D5DB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-[#F5F2FA] border border-[#D1D5DB] rounded-lg p-6">
            <h3 className="text-xl font-semibold text-[#111827] mb-4 font-poppins flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-[#8f1eae]" />
              Legal Disclaimer
            </h3>
            <div className="space-y-3">
              <p className="text-[#6B7280] font-light text-sm leading-relaxed">
                The above content is created at <span className="font-medium">SHREYASH VINOD SHIRSIKAR</span>'s sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.
              </p>
              <p className="text-[#6B7280] font-light text-sm leading-relaxed">
                We are not liable for any delay in delivery by the courier company/postal authorities. Shipping timelines are subject to courier company/post office norms and customs clearance procedures for international orders.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#9CA3AF]">
              <p className="text-xs text-[#6B7280] font-light">
                Last Updated: December 2, 2025 • Version 2.1
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}