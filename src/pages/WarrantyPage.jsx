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
  Cpu,
  HardDrive,
  Keyboard,
  SmartphoneCharging,
  Thermometer,
  Monitor,
  Wrench,
  AlertTriangle,
  FileText,
  Battery
} from 'lucide-react';

export default function WarrantyPage() {

  /* =========================
     UPDATED WARRANTY STATS
     ========================= */
  const stats = [
    { number: "1 Year", label: "Apple Laptop Warranty", icon: Shield },
    { number: "2 Years", label: "Non-Apple Laptop Warranty", icon: Shield },
    { number: "40+", label: "Quality Checkpoints", icon: CheckCircle },
    { number: "24–48 Hours", label: "Diagnosis Timeline", icon: Clock }
  ];

  /* =========================
     WHAT IS COVERED
     ========================= */
  const coverageDetails = [
    {
      icon: Cpu,
      title: "Motherboard",
      description: "Manufacturing or refurbishment-related defects under normal usage",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: HardDrive,
      title: "SSD / HDD",
      description: "Internal failure due to manufacturing defects",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Cpu,
      title: "RAM",
      description: "Memory failure not caused by external damage",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Keyboard,
      title: "Keyboard / Trackpad",
      description: "Functional malfunction excluding physical damage",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Monitor,
      title: "Display",
      description: "Non-physical internal display issues only",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    },
    {
      icon: Thermometer,
      title: "Performance & Thermal",
      description: "Overheating or throttling caused by internal faults",
      color: "text-purple-700",
      bgColor: "bg-purple-100"
    }
  ];

  /* =========================
     BATTERY – CONDITIONAL
     ========================= */
  const batteryPolicy = [
    "Battery is covered only for genuine manufacturing or refurbishment defects",
    "Battery degradation due to normal usage is not covered",
    "High-usage scenarios (gaming, mining, heavy workloads) are excluded",
    "Third-party chargers or adapters void battery coverage",
    "Battery replacement is subject to inspection & approval",
    "Pickup & inspection charges apply (refunded only if approved)"
  ];

  /* =========================
     NOT COVERED
     ========================= */
  const notCoveredItems = [
    "Broken or removed REKRAFT warranty seal",
    "Unauthorized or third-party repair attempts",
    "Replacement of original parts with duplicates or low-quality components",
    "Physical damage (drops, cracks, bent chassis)",
    "Liquid or moisture damage",
    "Burn damage, power surge, or electrical short",
    "Software, OS, or virus-related issues",
    "Chargers, adapters, or accessories",
    "Cosmetic wear and tear"
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">

      {/* =========================
         HERO SECTION
         ========================= */}
      <section className="relative bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#F5F2FA] px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-[#8f1eae]" />
              <span className="text-sm font-medium text-gray-700 uppercase tracking-widest font-inter">
                Rekraft Warranty Policy
              </span>
            </div>

            <h1 className="text-4xl font-semibold text-gray-900 mb-6 tracking-wide uppercase font-poppins">
              Warranty & Replacement Terms
            </h1>

            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed font-light font-roboto">
              Brand-based warranty coverage with strict inspection, verification,
              and anti-tampering rules.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================
         STATS SECTION
         ========================= */}
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
                  className="text-center p-6 bg-white border border-gray-300 rounded"
                >
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#8f1eae]" />
                  </div>
                  <div className="text-xl font-semibold text-[#8f1eae] font-poppins">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-xs uppercase mt-1 font-roboto">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
         MAIN CONTENT START
         ========================= */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* WHAT IS COVERED */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 uppercase font-poppins">
              What’s Covered Under Warranty
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
              Coverage applies only to genuine manufacturing or refurbishment defects
              under normal usage conditions.
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
                  className="bg-white p-6 border border-gray-300 rounded-lg text-center"
                >
                  <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-light font-roboto">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* BATTERY POLICY */}
        <section className="mb-16 bg-[#F5F2FA] p-8 border border-gray-300 rounded-lg">
          <div className="flex items-center gap-3 mb-6">
            <Battery className="w-6 h-6 text-[#8f1eae]" />
            <h3 className="text-xl font-semibold text-gray-900 uppercase font-poppins">
              Battery Warranty (Conditional)
            </h3>
          </div>

          <ul className="space-y-3">
            {batteryPolicy.map((rule, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-gray-700 font-light font-roboto">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
            Battery claims are evaluated strictly to prevent misuse and ensure
            fair service for genuine cases only.
          </div>
        </section>

        {/* NOT COVERED */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900 uppercase font-poppins">
                What’s Not Covered
              </h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notCoveredItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 border border-gray-300 rounded-lg"
              >
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <span className="text-gray-700 text-sm font-light font-roboto">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================
            WARRANTY CLAIM PROCESS
            ========================= */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 uppercase font-poppins">
              Warranty Claim Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
              All warranty claims follow a strict inspection and approval workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Raise a Request",
                desc: "Contact REKRAFT support with invoice and issue details"
              },
              {
                step: "2",
                title: "Pickup & Inspection",
                desc: "Device is picked up for technical inspection (charges apply)"
              },
              {
                step: "3",
                title: "Approval / Rejection",
                desc: "Warranty is approved only if terms are satisfied"
              },
              {
                step: "4",
                title: "Repair & Return",
                desc: "Repair completed if approved; device returned as-is if rejected"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 border border-gray-300 rounded-lg"
              >
                <div className="w-8 h-8 bg-[#8f1eae] text-white rounded-full flex items-center justify-center mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-poppins">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-light font-roboto">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* =========================
            INSPECTION FEES
            ========================= */}
        <section className="mb-16 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3 font-poppins">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            Inspection & Pickup Charges
          </h3>
          <ul className="list-disc ml-5 text-sm text-gray-700 font-light font-roboto space-y-2">
            <li>Pickup and inspection charges apply to all warranty claims</li>
            <li>Charges are refunded only if the warranty claim is approved</li>
            <li>If a claim is rejected, charges are non-refundable</li>
          </ul>
        </section>

        {/* =========================
            REPLACEMENT POLICY
            ========================= */}
        <section className="mb-16 bg-[#F5F2FA] p-8 border border-gray-300 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 uppercase font-poppins">
            Replacement Policy (No Returns / No Refunds)
          </h3>
          <p className="text-gray-700 text-sm font-light font-roboto mb-4">
            REKRAFT does not offer refunds or returns under any circumstances.
          </p>
          <ul className="list-disc ml-5 text-sm text-gray-700 font-light font-roboto space-y-2">
            <li>Replacement is provided only if a wrong product is delivered</li>
            <li>Replacement is applicable for DOA (Dead on Arrival) cases only</li>
            <li>Replacement requests must be raised within 48 hours of delivery</li>
            <li>All replacement requests are subject to verification</li>
          </ul>
        </section>

        {/* =========================
            SUPPORT SECTION
            ========================= */}
        <section className="py-16 bg-[#F5F2FA] border-y border-gray-300 mb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 uppercase font-poppins">
                Get Support
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
                Contact our support team for warranty or replacement assistance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Phone,
                  title: "WhatsApp Support",
                  contact: "+91-9373712701",
                  detail: "Warranty & replacement queries"
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  contact: "contactrekraft@gmail.com",
                  detail: "Response within 24–48 hours"
                },
                {
                  icon: MapPin,
                  title: "Service Coverage",
                  contact: "Pan-India",
                  detail: "Pickup & return available"
                }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center bg-white p-6 border border-gray-300 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-[#8f1eae] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 font-poppins">
                      {item.title}
                    </h3>
                    <p className="text-[#8f1eae] font-medium font-roboto">
                      {item.contact}
                    </p>
                    <p className="text-gray-500 text-sm font-light font-roboto">
                      {item.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================
            WARRANTY VALIDITY RULES
            ========================= */}
        <section className="mb-16">
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase font-poppins">
              Warranty Validity Rules
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 font-light font-roboto">
              <li>Warranty starts from the date of invoice</li>
              <li>Invoice and original product must be presented</li>
              <li>REKRAFT warranty seal must remain intact</li>
              <li>Warranty is non-transferable upon resale</li>
              <li>REKRAFT reserves the right to approve or reject any claim</li>
            </ul>
          </div>
        </section>

        {/* =========================
            CTA
            ========================= */}
        <section className="py-16 bg-black text-white rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold mb-4 uppercase font-poppins"
            >
              Need Warranty Assistance?
            </motion.h2>
            <p className="text-gray-300 text-sm mb-6 font-light font-roboto">
              Our team is ready to help with warranty verification and support.
            </p>
            <button className="border border-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-all">
              Contact Support
            </button>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
