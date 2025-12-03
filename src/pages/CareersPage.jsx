import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, TrendingUp, Target, Sprout,
  Users, Zap, Brain, Coins,
  Mail, Send
} from 'lucide-react';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';

export default function CareersPage() {
  const benefits = [
    {
      icon: Rocket,
      title: "Build From Scratch",
      description: "Be part of the core team that shapes the company's future"
    },
    {
      icon: TrendingUp,
      title: "Equity Opportunity",
      description: "Early team members get stock options in the company"
    },
    {
      icon: Target,
      title: "Direct Impact",
      description: "Your work directly influences our growth and success"
    },
    {
      icon: Sprout,
      title: "Rapid Growth",
      description: "Learn and grow faster in a fast-paced startup environment"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Customer First",
      description: "We obsess over delivering exceptional value to our customers"
    },
    {
      icon: Zap,
      title: "Move Fast",
      description: "We iterate quickly and learn from our mistakes"
    },
    {
      icon: Brain,
      title: "Think Big",
      description: "We're building something that will change the industry"
    },
    {
      icon: Coins,
      title: "Stay Lean",
      description: "We maximize impact with minimal resources"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-lato">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
            Join Our Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-lato font-light">
            We're building the future of sustainable technology in India. 
            Come help us revolutionize how people buy and use refurbished electronics.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#8f1eae] p-6 border border-[#8f1eae] rounded-[4px]">
              <p className="font-inter font-medium text-white text-base tracking-wide uppercase">
                🚀 Early-stage startup • Founding team opportunities • Massive impact potential
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Join Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12 tracking-tight font-montserrat">
            Why Join an Early-Stage Startup?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300 text-center group"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8f1eae] transition-all duration-300">
                  <benefit.icon className="w-8 h-8 text-[#8f1eae] group-hover:text-white transition-all duration-300" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 font-inter tracking-wide uppercase">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed font-lato font-light">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-light text-gray-900 text-center mb-12 tracking-tight font-montserrat">
            Our Culture & Values
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-[4px] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8f1eae] transition-all duration-300">
                    <value.icon className="w-6 h-6 text-[#8f1eae] group-hover:text-white transition-all duration-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 font-inter tracking-wide uppercase">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 font-lato font-light">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Roles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-light text-gray-900 text-center mb-8 tracking-tight font-montserrat">
            We're Looking For
          </h2>
          <div className="bg-white border border-gray-200 rounded-[4px] p-12 text-center max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-[#F5F2FA] to-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="text-4xl">💫</div>
            </div>
            <h3 className="text-2xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Passionate Problem-Solvers
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-lato font-light">
              While we don't have specific job openings listed yet, we're always interested in connecting with 
              talented individuals who are passionate about sustainability and technology.
            </p>
            <p className="text-lg font-medium text-[#8f1eae] mb-8 font-inter">
              Think you can help us build something amazing?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#8f1eae] text-white px-8 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide mx-auto"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-black text-white p-12 border border-[#8f1eae] rounded-[4px] text-center">
            <div className="w-16 h-16 bg-[#8f1eae] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-light mb-6 tracking-tight font-montserrat">
              Start the Conversation
            </h2>
            <p className="mb-8 max-w-2xl mx-auto font-lato font-light text-gray-100 leading-relaxed">
              Even if we're not actively hiring, we love meeting passionate people who share our vision.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-6 h-6 text-gray-300" />
                <p className="text-lg font-medium font-inter">contactrekraft@gmail.com</p>
              </div>
              <p className="text-sm font-lato font-light text-gray-300">
                Tell us what you're passionate about and how you can contribute!
              </p>
              <div className="pt-6">
                <a
                  href="mailto:contactrekraft@gmail.com"
                  className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 font-inter font-medium hover:bg-gray-100 transition-all duration-300 border border-white rounded-[4px] uppercase text-sm tracking-wide mx-auto"
                >
                  <Send className="w-4 h-4" />
                  Send Your Story
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}