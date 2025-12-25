import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { Phone, Mail, Clock, Package, Truck, CheckCircle, XCircle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function ReturnsPage() {
  const returnFeatures = [
    { 
      number: "N/A", 
      label: "Returns",
      icon: Package 
    },
    { 
      number: "Free", 
      label: "Return Shipping",
      icon: Truck 
    },
    { 
      number: "5-7 Days", 
      label: "Quick Refunds",
      icon: Clock 
    },
    { 
      number: "1 Year", 
      label: "Warranty Support",
      icon: CheckCircle 
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initiate Return",
      description: "Contact support or use your account portal within 7 days of delivery.",
      icon: HelpCircle
    },
    {
      step: "02",
      title: "Package Product",
      description: "Include all original accessories, packaging, and documentation securely.",
      icon: Package
    },
    {
      step: "03",
      title: "Schedule Pickup",
      description: "Free pickup for defective products, otherwise shipping charges apply.",
      icon: Truck
    },
    {
      step: "04",
      title: "Quality Check",
      description: "Our team inspects the product to ensure return eligibility.",
      icon: AlertCircle
    },
    {
      step: "05",
      title: "Refund Process",
      description: "Refund initiated immediately after successful inspection.",
      icon: CheckCircle
    },
    {
      step: "06",
      title: "Completion",
      description: "Refund reflects in your account within 5-7 business days.",
      icon: ArrowRight
    }
  ];

  const refundTimelines = [
    { method: "Credit/Debit Cards", duration: "5-7 business days" },
    { method: "UPI Payments", duration: "2-3 business days" },
    { method: "Net Banking", duration: "3-5 business days" },
    { method: "Wallet Payments", duration: "1-2 business days" }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 font-poppins">
              Cancellation & Refund Policy
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto font-roboto font-light"
            >
              Last updated on December 2nd 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-[#F5F2FA] border-y border-gray-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {returnFeatures.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white p-6 border border-gray-200 rounded-lg hover:border-[#8f1eae] transition-all duration-300 text-center group hover:scale-105"
                >
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#8f1eae] group-hover:text-white transition-all duration-300" />
                  </div>
                  <div className="text-2xl font-semibold text-[#8f1eae] mb-2 font-poppins">
                    {stat.number}
                  </div>
                  <div className="text-xs font-inter font-medium text-gray-900 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 border border-gray-300 rounded-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-[#8f1eae] rounded"></div>
              <h2 className="text-3xl font-semibold text-gray-900 font-poppins">
                Cancellation & Refund Policy
              </h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4 font-poppins">
                  SHREYASH VINOD SHIRSIKAR believes in helping its customers as far as possible, and has therefore a liberal cancellation policy.
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 text-base font-roboto font-light">
                      <span className="font-medium text-gray-900 font-poppins">Cancellations will be considered</span> only if the request is made immediately upon placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 text-base font-roboto font-light">
                      <span className="font-medium text-gray-900 font-poppins">SHREYASH VINOD SHIRSIKAR does not accept cancellation requests</span> for refurbished electronic devices that have been prepared for shipping. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 text-base font-roboto font-light">
                      <span className="font-medium text-gray-900 font-poppins">In case of receipt of damaged or defective items</span> please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 text-base font-roboto font-light">
                      <span className="font-medium text-gray-900 font-poppins">In case you feel that the product received is not as shown on the site</span> or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 text-base font-roboto font-light">
                      <span className="font-medium text-gray-900 font-poppins">In case of complaints regarding products that come with a warranty</span> from manufacturers, please refer the issue to them according to the warranty terms provided with your device.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-700 text-base font-roboto font-light">
                      <span className="font-medium text-gray-900 font-poppins">In case of any Refunds approved by SHREYASH VINOD SHIRSIKAR</span>, it will take 5-7 business days for the refund to be processed to the end customer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-300">
              <div className="bg-gray-100 p-6 rounded border border-gray-300">
                <p className="text-sm text-gray-600 font-roboto font-light">
                  <span className="font-medium text-gray-900 font-poppins">Disclaimer:</span> The above content is created at SHREYASH VINOD SHIRSIKAR's sole discretion. Payment gateways shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4 font-poppins">
              Return Eligibility
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base font-roboto font-light">
              Clear guidelines for what can and cannot be returned
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-6 border border-gray-300 rounded-lg h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-700" />
                  </div>
                  <h3 className="text-base font-inter font-medium text-gray-900 uppercase tracking-wider">
                    Valid Reasons for Return
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Product received is damaged or defective
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Wrong product delivered
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Significant difference from product description
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Change of mind (within 7 days, conditions apply)
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-6 border border-gray-300 rounded-lg h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-700" />
                  </div>
                  <h3 className="text-base font-inter font-medium text-gray-900 uppercase tracking-wider">
                    Non-Returnable Items
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Products with physical damage caused by customer
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Missing accessories or original packaging
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Products used beyond basic testing (beyond 1 hour)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-700 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Software-related issues after device setup
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-[#F5F2FA] border-y border-gray-300">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-4 font-poppins">
              Return Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base font-roboto font-light">
              Simple and straightforward process to ensure your return is handled efficiently.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group relative bg-white border border-gray-300 p-6 rounded-lg hover:border-[#8f1eae] transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-inter font-medium rounded group-hover:bg-[#8f1eae] transition-all duration-300">
                      {step.step}
                    </div>
                    <div className="w-10 h-10 bg-[#F5F2FA] rounded-lg flex items-center justify-center group-hover:bg-[#8f1eae] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#8f1eae] group-hover:text-white transition-all duration-300" />
                    </div>
                  </div>
                  <h3 className="text-base font-inter font-medium text-gray-900 mb-3 group-hover:text-[#8f1eae] transition-colors duration-300 uppercase tracking-wider">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-roboto font-light">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Refund Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-8 bg-[#8f1eae] rounded"></div>
                <h2 className="text-3xl font-semibold text-gray-900 font-poppins">
                  Refund Timeline
                </h2>
              </div>
              <div className="space-y-4">
                {refundTimelines.map((timeline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center py-4 px-6 border border-gray-300 rounded-lg hover:border-[#8f1eae] transition-all duration-300 hover:bg-[#F5F2FA] group"
                  >
                    <span className="text-gray-700 font-inter font-medium text-sm">
                      {timeline.method}
                    </span>
                    <span className="text-[#8f1eae] font-inter font-medium text-sm bg-[#F5F2FA] px-3 py-1 rounded group-hover:bg-white transition-all duration-300">
                      {timeline.duration}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-6 border border-gray-300 rounded-lg h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-black rounded"></div>
                  <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                    Important Notes
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      For change of mind returns, return shipping charges may apply
                    </span>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Original shipping charges are non-refundable for change of mind returns
                    </span>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Refunds are processed to the original payment method only
                    </span>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 text-sm font-roboto font-light">
                      Keep the product in original condition with all tags and packaging
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-semibold mb-4 font-poppins">
              Need Help with Returns?
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto font-roboto font-light">
              Our support team is here to help you with any questions about returns or refunds.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded uppercase tracking-wider hover:scale-105"
            >
              CONTACT SUPPORT
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-all duration-300 group-hover:scale-110">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <p className="font-inter font-medium text-xs mb-2 uppercase tracking-wider">Phone Support</p>
              <p className="font-roboto font-light text-white/90 text-base">+91 9373712701</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-all duration-300 group-hover:scale-110">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <p className="font-inter font-medium text-xs mb-2 uppercase tracking-wider">Email Support</p>
              <p className="font-roboto font-light text-white/90 text-base">contactrekraft@gmail.com</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8f1eae] transition-all duration-300 group-hover:scale-110">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <p className="font-inter font-medium text-xs mb-2 uppercase tracking-wider">Response Time</p>
              <p className="font-roboto font-light text-white/90 text-base">Within 24 hours</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-12 bg-gray-100 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white p-8 border border-gray-300 rounded-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gray-900 rounded"></div>
              <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                Legal Entity Information
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-base text-gray-600 font-roboto">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 font-inter">Merchant Legal Entity</h4>
                <p className="mb-4">SHREYASH VINOD SHIRSIKAR</p>
                
                <h4 className="font-medium text-gray-900 mb-2 font-inter">Registered Address</h4>
                <p className="font-light">Row House No -2, Wadala Road<br />
                Near Tagore Abhyasica, Dgp Nagar -1<br />
                In Front Mangalmurti Appt<br />
                Nashik, MAHARASHTRA 422010</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 font-inter">Operational Address</h4>
                <p className="font-light mb-4">Row House No -2, Wadala Road<br />
                Near Tagore Abhyasica, Dgp Nagar -1<br />
                In Front Mangalmurti Appt<br />
                Nashik, MAHARASHTRA 422010</p>
                
                <h4 className="font-medium text-gray-900 mb-2 font-inter">Contact Information</h4>
                <p className="font-light">Telephone: +91 9373712701<br />
                Email: contactrekraft@gmail.com</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-500">
              <p className="font-light font-roboto">Policy last updated on December 2nd 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}