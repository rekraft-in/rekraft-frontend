import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeFAQ, setActiveFAQ] = useState(null);

  const contactMethods = [
    {
      icon: Mail,
      title: "EMAIL US",
      details: "contactrekraft@gmail.com",
      description: "We'll respond within 4 hours",
      action: "mailto:contactrekraft@gmail.com",
      badge: "support"
    },
    {
      icon: Phone,
      title: "CALL US",
      details: "+91 9373712701",
      description: "Mon to Sat, 9AM to 6PM",
      action: "tel:+919373712701",
      badge: "Support"
    },
    {
      icon: MessageCircle,
      title: "WHATSAPP",
      details: "+91 9373712701",
      description: "Instant responses",
      action: "https://wa.me/919373712701",
      badge: "Chat"
    },
    {
      icon: MapPin,
      title: "VISIT US",
      details: "Nashik, Maharashtra",
      description: "Schedule a visit",
      action: "https://maps.google.com/?q=Row+House+No+-2+Wadala+Road+Near+Tagore+Abhyasica+Dgp+Nagar+-1+In+Front+Mangalmurti+Appt+Nashik+MAHARASHTRA+422010",
      badge: "On-site"
    }
  ];

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days across India. Express shipping (1-2 days) is available for most locations."
    },
    {
      question: "Do you offer bulk/corporate discounts?",
      answer: "Yes, we offer special pricing for corporate orders and bulk purchases. Contact our sales team for customized quotes."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 7-day no-questions-asked return policy. Extended warranty claims are processed within 5-7 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship across India. We're working on expanding to international markets soon."
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        setError(result.errors?.[0]?.msg || result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
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
                Contact Support
              </span>
            </div>
            <h1 className="text-3xl font-poppins font-semibold text-gray-900">
              Get in Touch
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-roboto font-light">
              We're here to help you find the perfect refurbished device. Reach out to our team for any questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-lg font-poppins font-semibold text-gray-900 mb-3 uppercase tracking-tight">
              Choose How to Reach Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-roboto font-light">
              Multiple ways to connect with our team. We're always ready to assist you.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactMethods.map((method, index) => {
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

      {/* Contact Form & Info */}
      <section className="py-12 bg-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-300 rounded-lg p-6"
            >
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-300">
                <div className="w-10 h-10 bg-[#F5F2FA] rounded flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-[#8f1eae]" />
                </div>
                <div>
                  <h2 className="text-xl font-poppins font-semibold text-gray-900">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 text-sm font-roboto font-light">
                    We typically respond within 4 hours
                  </p>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 px-4 py-3 rounded flex items-start gap-3 mb-6"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 font-roboto text-sm">{error}</p>
                </motion.div>
              )}
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm font-roboto font-light max-w-md mx-auto">
                    Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="inline-flex items-center justify-center bg-[#8f1eae] text-white px-6 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded uppercase text-xs tracking-wider"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-inter font-medium text-gray-900 mb-1 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-roboto placeholder-gray-400 text-sm"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-inter font-medium text-gray-900 mb-1 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-roboto placeholder-gray-400 text-sm"
                        placeholder="+91 93737 12701"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-inter font-medium text-gray-900 mb-1 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-roboto placeholder-gray-400 text-sm"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-inter font-medium text-gray-900 mb-1 uppercase tracking-wide">
                      Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-roboto appearance-none text-sm"
                      required
                    >
                      <option value="">What can we help you with?</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="trade-in">Trade-In Program</option>
                      <option value="corporate">Corporate Purchase</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-inter font-medium text-gray-900 mb-1 uppercase tracking-wide">
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 resize-none transition-all duration-300 font-roboto placeholder-gray-400 text-sm"
                      placeholder="Tell us more about your inquiry..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-inter font-medium transition-all duration-300 border rounded uppercase text-xs tracking-wider flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-gray-400 border-gray-400 cursor-not-allowed text-white' 
                        : 'bg-[#8f1eae] border-[#8f1eae] hover:bg-[#7a1a99] hover:border-[#7a1a99] text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info & FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Business Hours */}
              <div className="bg-white border border-gray-300 rounded p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#F5F2FA] rounded flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-poppins font-semibold text-gray-900">
                      Business Hours
                    </h3>
                    <p className="text-gray-600 text-xs font-roboto font-light">
                      Our dedicated support schedule
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM", status: "Open", color: "bg-green-100 text-green-700" },
                    { day: "Saturday", time: "10:00 AM - 4:00 PM", status: "Open", color: "bg-green-100 text-green-700" },
                    { day: "Sunday", time: "Closed", status: "Closed", color: "bg-red-100 text-red-700" }
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded">
                      <div>
                        <span className="text-gray-900 font-roboto font-medium text-xs">
                          {schedule.day}
                        </span>
                        <p className="text-gray-600 text-xs font-roboto font-light">
                          {schedule.time}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-inter font-medium ${schedule.color}`}>
                        {schedule.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

               {/* FAQ Section - Updated with Link */}
      <div className="bg-white border border-gray-300 rounded p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#F5F2FA] rounded flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-5 h-5 text-[#8f1eae]" />
          </div>
          <div>
            <h3 className="text-lg font-poppins font-semibold text-gray-900">
              Quick Answers
            </h3>
            <p className="text-gray-600 text-xs font-roboto font-light">
              Common questions answered
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-300 rounded hover:border-gray-400 transition-colors duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 rounded"
              >
                <span className="font-roboto font-medium text-gray-900 text-sm">
                  {faq.question}
                </span>
                <ChevronRight 
                  className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                    activeFAQ === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {activeFAQ === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-3 pb-2"
                >
                  <p className="text-gray-600 text-sm font-roboto font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        {/* Updated View All FAQs button */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <Link 
            to="/faq"
            className="block w-full py-2 bg-transparent text-[#8f1eae] font-inter font-medium hover:bg-[#8f1eae] hover:text-white transition-all duration-300 border border-[#8f1eae] rounded uppercase text-xs tracking-wider text-center"
          >
            View All FAQs
          </Link>
        </div>
      </div>

              {/* Emergency Support */}
              <div className="bg-gray-900 border border-gray-800 rounded p-4 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-poppins font-semibold text-white">
                      Urgent Support Needed?
                    </h3>
                    <p className="text-gray-400 text-xs font-roboto font-light">
                      For critical technical issues
                    </p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed text-xs font-roboto font-light">
                  For critical technical issues or immediate assistance with your device.
                </p>
                <div className="bg-gray-800 px-4 py-3 rounded text-center mb-3">
                  <p className="text-xl font-poppins font-semibold text-white">
                    +91 9373712701
                  </p>
                </div>
                <p className="text-gray-500 text-xs font-inter font-medium text-center uppercase tracking-wider">
                  24/7 for warranty claims
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <h2 className="text-lg font-poppins font-semibold text-gray-900 mb-2 uppercase tracking-tight">
              Visit Our Facility
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm font-roboto font-light">
              See where the magic happens. Visit our refurbishment center in Nashik.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-300 rounded overflow-hidden"
          >
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-[#F5F2FA] rounded flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#8f1eae]" />
              </div>
              <p className="text-lg font-poppins font-semibold text-gray-900 mb-3">
                Rekraft Headquarters
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm font-roboto font-light max-w-md mx-auto">
                Row House No -2, Wadala Road<br />
                Near Tagore Abhyasica, Dgp Nagar -1<br />
                In Front Mangalmurti Appt<br />
                Nashik, Maharashtra 422010
              </p>
              <a 
                href="https://maps.google.com/?q=Row+House+No+-2+Wadala+Road+Near+Tagore+Abhyasica+Dgp+Nagar+-1+In+Front+Mangalmurti+Appt+Nashik+MAHARASHTRA+422010"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#8f1eae] text-white px-4 py-2 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded uppercase text-xs tracking-wider"
              >
                Get Directions on Google Maps
                <MapPin className="w-3 h-3 ml-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Information */}
      <section className="py-8 bg-gray-50 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white border border-gray-300 rounded p-4">
            <h3 className="text-base font-poppins font-semibold text-gray-900 mb-4">
              Legal & Business Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 font-roboto">
              <div className="space-y-3">
                <div>
                  <h4 className="font-inter font-medium text-gray-900 mb-1 text-xs uppercase tracking-wide">
                    Merchant Legal Entity
                  </h4>
                  <p className="font-light">SHREYASH VINOD SHIRSIKAR</p>
                </div>
                
                <div>
                  <h4 className="font-inter font-medium text-gray-900 mb-1 text-xs uppercase tracking-wide">
                    Registered Address
                  </h4>
                  <p className="font-light text-sm">
                    Row House No -2, Wadala Road<br />
                    Near Tagore Abhyasica, Dgp Nagar -1<br />
                    In Front Mangalmurti Appt<br />
                    Nashik, MAHARASHTRA 422010
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-inter font-medium text-gray-900 mb-1 text-xs uppercase tracking-wide">
                    Operational Address
                  </h4>
                  <p className="font-light text-sm">
                    Row House No -2, Wadala Road<br />
                    Near Tagore Abhyasica, Dgp Nagar -1<br />
                    In Front Mangalmurti Appt<br />
                    Nashik, MAHARASHTRA 422010
                  </p>
                </div>
                
                <div>
                  <h4 className="font-inter font-medium text-gray-900 mb-1 text-xs uppercase tracking-wide">
                    Contact Information
                  </h4>
                  <p className="font-light text-sm">
                    Telephone: +91 9373712701<br />
                    Email: contactrekraft@gmail.com
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-300">
              <p className="text-xs text-gray-500 font-roboto font-light">
                Last updated on December 2nd 2025
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