import React from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import { 
  FileText,
  Shield,
  AlertCircle,
  Home,
  Globe,
  Link as LinkIcon,
  Scale,
  CreditCard,
  Mail,
  Clock,
  MapPin,
  User,
  Calendar,
  Gavel,
  Copyright,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

export default function TermsPage() {
  const legalInfo = [
    {
      icon: User,
      title: "Legal Entity",
      description: "SHREYASH VINOD SHIRSIKAR",
      details: "Sole Proprietor / Individual"
    },
    {
      icon: MapPin,
      title: "Registered Office",
      description: "Row House No -2 Wadala Road",
      details: "Near Tagore Abhyasica, Dgp Nagar -1, In Front Mangalmurti Appt, Nashik, MAHARASHTRA 422010"
    },
    {
      icon: Scale,
      title: "Governing Law",
      description: "Laws of India",
      details: "All disputes subject to Indian jurisdiction"
    },
    {
      icon: Calendar,
      title: "Last Updated",
      description: "December 2, 2025",
      details: "Effective from date of publication"
    }
  ];

  const termsContent = [
    {
      icon: User,
      title: "Definitions",
      content: `The term "we", "us", "our" used anywhere on this page shall mean SHREYASH VINOD SHIRSIKAR, whose registered/operational office is Row House No -2 Wadala Road Near Tagore Abhyasica Dgp Nagar -1 In Front Mangalmurti Appt Nashik MAHARASHTRA 422010. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.`,
      highlight: "Your use of the website and/or purchase from us are governed by following Terms and Conditions:"
    },
    {
      icon: AlertCircle,
      title: "Website Content & Accuracy",
      content: "The content of the pages of this website is subject to change without notice. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.",
      highlight: "Content subject to change without notice"
    },
    {
      icon: Shield,
      title: "User Responsibility & Liability",
      content: "Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.",
      highlight: "Use entirely at your own risk"
    },
    {
      icon: Home,
      title: "Intellectual Property",
      content: "Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions. All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.",
      highlight: "Unauthorized reproduction prohibited"
    },
    {
      icon: AlertTriangle,
      title: "Legal Warning",
      content: "Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.",
      highlight: "Unauthorized use is a criminal offense"
    },
    {
      icon: LinkIcon,
      title: "External Links",
      content: "From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information. You may not create a link to our website from another website or document without SHREYASH VINOD SHIRSIKAR's prior written consent.",
      highlight: "Prior written consent required for linking"
    },
    {
      icon: Scale,
      title: "Governing Law & Disputes",
      content: "Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.",
      highlight: "Subject to laws of India"
    }
  ];

  const transactionTerms = [
    "We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction",
    "Liability excluded on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time"
  ];

  const razorpayDisclaimer = "Disclaimer: The above content is created at SHREYASH VINOD SHIRSIKAR's sole discretion. Razorpay shall not be liable for any content provided here and shall not be responsible for any claims and liability that may arise due to merchant's non-adherence to it.";

  return (
    <div className="pt-20 min-h-screen bg-white font-lato">
      {/* Hero Section */}
      <section className="relative py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#F5F2FA] px-4 py-2 rounded-[4px] mb-6">
              <FileText className="w-4 h-4 text-[#8f1eae]" />
              <span className="text-sm font-medium text-gray-900 uppercase tracking-wider font-inter">Legal Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">
              Terms & Conditions
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light font-lato"
            >
              Last updated on December 2, 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Terms List */}
            <div className="lg:col-span-2 space-y-6">
              {termsContent.map((term, index) => {
                const IconComponent = term.icon;
                return (
                  <motion.div
                    key={term.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 border border-gray-200 hover:border-[#8f1eae] transition-all duration-300 rounded-[4px] group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8f1eae] transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-[#8f1eae] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-light text-gray-900 mb-3 tracking-tight font-montserrat">
                          {term.title}
                        </h3>
                        {term.highlight && (
                          <div className="mb-4">
                            <div className="inline-flex items-center gap-2 bg-[#F5F2FA] px-3 py-1 rounded-[4px]">
                              <AlertCircle className="w-4 h-4 text-[#8f1eae]" />
                              <span className="text-sm font-medium text-gray-700 font-inter">{term.highlight}</span>
                            </div>
                          </div>
                        )}
                        <p className="text-gray-600 leading-relaxed font-light font-lato">
                          {term.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Transaction Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white p-8 border border-gray-200 hover:border-[#8f1eae] transition-all duration-300 rounded-[4px]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 text-[#8f1eae]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">
                      Transaction Liability
                    </h3>
                    <div className="space-y-4">
                      {transactionTerms.map((term, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 flex-shrink-0">
                            <div className="w-6 h-6 bg-[#F5F2FA] rounded-full flex items-center justify-center">
                              <span className="text-[#8f1eae] text-sm font-bold">{index + 1}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed font-light font-lato">{term}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Razorpay Disclaimer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-yellow-50 border border-yellow-200 p-8 rounded-[4px]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-[4px] flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-light text-gray-900 mb-3 tracking-tight font-montserrat">
                      Payment Processor Disclaimer
                    </h3>
                    <div className="bg-white p-6 border border-yellow-200 rounded-[4px]">
                      <p className="text-gray-700 leading-relaxed font-light font-lato">
                        {razorpayDisclaimer}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Legal Information */}
            <div className="space-y-8">
              {/* Legal Info Cards */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Scale className="w-6 h-6 text-[#8f1eae]" />
                  <h3 className="text-lg font-medium text-gray-900 tracking-tight font-montserrat">
                    Legal Information
                  </h3>
                </div>
                
                {legalInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-[4px] p-6 hover:border-[#8f1eae] hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#F5F2FA] rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-[#8f1eae]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1 font-inter">
                            {info.title}
                          </h4>
                          <p className="text-gray-900 font-light text-base mb-1 font-lato">
                            {info.description}
                          </p>
                          <p className="text-gray-600 text-sm font-light font-lato">
                            {info.details}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Acceptance Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#F5F2FA] p-6 border border-[#8f1eae]/30 rounded-[4px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#8f1eae] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg tracking-tight font-montserrat">
                      TERMS ACCEPTANCE
                    </h4>
                    <p className="text-sm text-gray-600 font-light font-lato">
                      By using our website or making a purchase
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-light font-lato">
                  Your use of our website and/or purchase from us constitutes your acceptance of these Terms and Conditions. 
                  If you do not agree with any part of these terms, please do not use our website or services.
                </p>
              </motion.div>

              {/* Legal Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 p-6 border border-gray-200 rounded-[4px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <h4 className="font-medium text-gray-900 font-inter">Legal Inquiries</h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-light font-lato mb-4">
                  For terms-related questions and legal matters, please contact us using the registered office information provided.
                </p>
                <button className="w-full bg-gray-900 text-white px-4 py-3 font-medium hover:bg-black transition-all duration-300 border border-gray-900 rounded-[4px] uppercase text-sm tracking-wide font-inter flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Legal Department
                </button>
              </motion.div>
            </div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 bg-gradient-to-r from-red-50 to-pink-50 p-8 border-l-4 border-red-500 rounded-r-[4px]"
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">
                  Important Legal Notice
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed font-light font-lato mb-6">
                  Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense. 
                  All legal disputes arising from the use of this website or purchases made shall be governed by the laws of India.
                </p>
                <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-[4px] border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 font-medium text-sm uppercase tracking-wider font-inter">
                    These terms are legally binding
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Update Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 bg-white p-8 border border-gray-200 rounded-[4px]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-light text-gray-900 tracking-tight font-montserrat">
                  Updates & Modifications
                </h3>
                <p className="text-gray-600 font-light font-lato">We reserve the right to update these terms periodically</p>
              </div>
              <div className="bg-[#8f1eae] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider font-inter">
                Version 1.0
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#F5F2FA] p-6 rounded-[4px]">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-[#8f1eae]" />
                  <span className="font-medium text-gray-900 font-inter">Last Updated</span>
                </div>
                <p className="text-gray-900 text-2xl font-light font-lato">Dec 2, 2025</p>
              </div>
              <div className="bg-[#F5F2FA] p-6 rounded-[4px]">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-[#8f1eae]" />
                  <span className="font-medium text-gray-900 font-inter">Effective From</span>
                </div>
                <p className="text-gray-900 text-2xl font-light font-lato">Immediately</p>
              </div>
              <div className="bg-[#F5F2FA] p-6 rounded-[4px]">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-[#8f1eae]" />
                  <span className="font-medium text-gray-900 font-inter">Review Period</span>
                </div>
                <p className="text-gray-900 text-2xl font-light font-lato">Regularly</p>
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