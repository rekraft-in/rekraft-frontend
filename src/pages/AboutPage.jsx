import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Globe, Shield, TrendingUp } from "lucide-react";
import Footer from "../components/Footer";

export default function AboutPage() {
  const milestones = [
    { title: "Our Foundation", description: "Started with a mission to make quality tech accessible to all" },
    { title: "Building Trust", description: "Developed India's most rigorous refurbishment certification" },
    { title: "Creating Impact", description: "Became the most trusted name in refurbished tech" },
    { year: "2023", title: "Quality Certified", description: "Received ISO 9001 certification for quality processes" }
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Quality First",
      description: "Every device undergoes 50+ point quality checks"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sustainability",
      description: "Reducing e-waste and carbon footprint"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Trust",
      description: "Transparent processes and honest pricing"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Value Creation",
      description: "Premium technology at accessible prices"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Excellence",
      description: "Industry-leading refurbishment standards"
    }
  ];

  const teamMembers = [
    {
      name: "Shreyash Shirsikar",
      role: "Founder & CEO",
      bio: "Former Apple engineer with 10+ years in device refurbishment",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      name: "Pranav Thormise",
      role: "Operational Director & General Manager",
      bio: "Expert in sustainable supply chains and quality management",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop"
    },
    {
      name: "Atharv Bachhav",
      role: "Technical Head",
      bio: "Specialized in hardware testing and certification processes",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      name: "Upasana Wagh",
      role: "Data Analyst",
      bio: "Dedicated to ensuring exceptional post-purchase support",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Sourcing",
      description: "Carefully select used laptops from verified sources",
      details: "We partner with corporate IT departments and certified recycling centers"
    },
    {
      step: "02",
      title: "Inspection",
      description: "Comprehensive 50-point quality assessment",
      details: "Every component is tested for performance and reliability"
    },
    {
      step: "03",
      title: "Refurbishment",
      description: "Professional cleaning and component replacement",
      details: "Cosmetic restoration and hardware upgrades as needed"
    },
    {
      step: "04",
      title: "Testing",
      description: "Rigorous stress testing and benchmarking",
      details: "72-hour continuous operation test to ensure stability"
    },
    {
      step: "05",
      title: "Certification",
      description: "Quality certification and 1-year warranty",
      details: "Each device receives our Rekraft Certified seal"
    },
    {
      step: "06",
      title: "Delivery",
      description: "Secure packaging and free shipping",
      details: "Tracked delivery with insurance for complete peace of mind"
    }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white font-lato font-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F5F2FA] to-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Premium Refurbished Laptops in India - Rekraft
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-lato font-light">
              Rekraft is India's trusted destination for certified refurbished laptops. We deliver premium technology with comprehensive quality checks, sustainable practices, and exceptional value.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="text-center px-8 py-4">
                <div className="text-3xl font-light text-[#8f1eae] mb-2">50+</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-inter font-medium">Quality Checks</div>
              </div>
              <div className="text-center px-8 py-4">
                <div className="text-3xl font-light text-[#8f1eae] mb-2">2-Year</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-inter font-medium">Warranty</div>
              </div>
              <div className="text-center px-8 py-4">
                <div className="text-3xl font-light text-[#8f1eae] mb-2">Free</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-inter font-medium">Shipping</div>
              </div>
              <div className="text-center px-8 py-4">
                <div className="text-3xl font-light text-[#8f1eae] mb-2">24Hr</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-inter font-medium">Customer Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-tight font-montserrat">
                About Rekraft
              </h2>
              <div className="space-y-6">
  <p className="text-gray-600 leading-relaxed font-lato font-light">
    Rekraft is more than a brand — it's a movement toward conscious technology consumption. 
    We are challenging the 'new is better' narrative by proving that refurbished electronics 
    can deliver equal performance, greater value, and positive environmental impact.
  </p>

  <p className="text-gray-600 leading-relaxed font-lato font-light">
    Our approach combines rigorous refurbishment standards with sustainable practices. 
    Each laptop undergoes extensive testing, professional restoration, and quality 
    certification before earning the Rekraft Certified seal. This ensures you receive 
    a device that performs like new, backed by our comprehensive warranty and support.
  </p>

  <p className="text-gray-600 leading-relaxed font-lato font-light">
    Based in Bangalore and serving customers across India, we're committed to transforming 
    the refurbished electronics market through transparency, quality assurance, and 
    customer-centric service.
  </p>
</div>

            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#8f1eae] to-[#6b1a99] p-12 rounded-[4px]">
                <div className="text-white text-center">
                  <div className="text-5xl mb-6">♻️</div>
                  <h3 className="text-2xl font-medium mb-4 tracking-wide uppercase font-inter">Our Commitment</h3>
                  <p className="text-lg font-lato font-light opacity-90">
                    Delivering certified refurbished laptops that combine premium performance, environmental sustainability, and exceptional value for every customer.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Rekraft Certified Process
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lato font-light">
              Every refurbished laptop undergoes our comprehensive 6-step certification process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-[#F5F2FA] text-[#8f1eae] rounded-[4px] flex items-center justify-center text-base font-inter font-medium group-hover:bg-[#8f1eae] group-hover:text-white transition-all duration-300">
                      {step.step}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-3 tracking-wide uppercase font-inter">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3 font-lato font-light">
                      {step.description}
                    </p>
                    <p className="text-gray-500 text-sm font-lato font-light">
                      {step.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Why Choose Rekraft
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lato font-light">
              We set the standard for refurbished laptops in India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-6 bg-[#F5F2FA] text-[#8f1eae] rounded-full flex items-center justify-center group-hover:bg-[#8f1eae] group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-3 tracking-wide uppercase font-inter">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm font-lato font-light">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F2FA]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Rekraft Journey
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lato font-light">
              Our commitment to quality and sustainability
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#8f1eae] via-[#8f1eae] to-transparent"></div>
            
            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300">
                      <div className="text-2xl font-light text-[#8f1eae] mb-2 font-montserrat">
                        {milestone.year}
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2 tracking-wide uppercase font-inter">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 font-lato font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-white border-4 border-[#8f1eae] rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
              Meet Our Experts
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-lato font-light">
              Our team combines technical expertise with a passion for sustainable technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-[4px] overflow-hidden hover:border-[#8f1eae] transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} at Rekraft`}
                      title={`${member.name} - ${member.role}`}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-medium text-gray-900 mb-1 tracking-wide uppercase font-inter">
                      {member.name}
                    </h3>
                    <p className="text-[#8f1eae] text-sm mb-3 font-lato font-light">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm font-lato font-light">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#8f1eae] to-[#7a1a99]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-light text-white mb-6 tracking-tight font-montserrat">
              Experience Premium Refurbished Laptops
            </h2>
            <p className="text-lg text-white opacity-90 mb-10 font-lato font-light">
              Join thousands of satisfied customers who trust Rekraft for certified refurbished laptops with warranty, free shipping, and exceptional support.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a
                href="/shop"
                className="bg-white text-[#8f1eae] px-8 py-3 font-inter font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:bg-[#F5F2FA] rounded-[4px] border border-white"
                title="Browse Refurbished Laptops"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="bg-transparent text-white px-8 py-3 font-inter font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:bg-white hover:text-[#8f1eae] rounded-[4px] border border-white"
                title="Contact Rekraft Support"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
