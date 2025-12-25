import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const navigate = useNavigate();

  const handleFooterLink = (path, category = null) => {
    if (category) {
      navigate(`/shop?category=${category}`);
    } else {
      navigate(path);
    }
  };

  const footerSections = [
    {
      title: "SHOP BY BRAND",
      links: [
        { label: "Apple", path: "/shop", category: "apple" },
        { label: "Dell", path: "/shop", category: "dell" },
        { label: "HP", path: "/shop", category: "hp" },
        { label: "Lenovo", path: "/shop", category: "lenovo" },
        { label: "ASUS", path: "/shop", category: "asus" },
        { label: "Acer", path: "/shop", category: "acer" }
      ]
    },
    {
      title: "SERVICES",
      links: [
        { label: "Sell Your Device", path: "/sell" },
        { label: "Warranty", path: "/warranty" },
        { label: "Support", path: "/support" },
        { label: "FAQ", path: "/faq" },
      ]
    },
    {
      title: "COMPANY",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Sustainability", path: "/sustainability" },
        { label: "Contact", path: "/contact" },
        { label: "Careers", path: "/careers" },
      ]
    },
    {
      title: "LEGAL",
      links: [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Cookie Policy", path: "/cookies" },
        { label: "Shipping Policy", path: "/shipping" },
        { label: "Return Policy", path: "/returns" }
      ]
    }
  ];

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const fallback = e.target.nextSibling;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <footer className="bg-white border-t border-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Features Grid - Moved to Top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 pb-12 border-b border-gray-300"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase text-center font-poppins">
              Why Choose Rekraft?
            </h2>
            <p className="text-base mb-12 max-w-2xl mx-auto text-gray-600 font-light text-center font-roboto">
              We're committed to providing the best refurbished laptop experience with quality you can trust.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: "🛡️", 
                  title: "2-Year Warranty", 
                  description: "Comprehensive warranty covering parts and labor"
                },
                { 
                  icon: "🔄", 
                  title: "Customer Support", 
                  description: "Easy Support via WhatsApp & Email"
                },
                { 
                  icon: "🚚", 
                  title: "Free Shipping", 
                  description: "Free delivery all over India"
                },
                { 
                  icon: "🌱", 
                  title: "Eco-Friendly", 
                  description: "Reducing e-waste and environmental impact"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group text-center rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide font-poppins">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm font-light font-roboto">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Brand and Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <img 
                  src="/images/logo.png"
                  alt="Rekraft" 
                  className="h-12 w-auto object-contain"
                  onError={handleImageError}
                />
                <div className="hidden items-center justify-center rounded-lg bg-gradient-to-br from-[#8f1eae] to-[#6b1a8a] text-white font-semibold w-12 h-12 text-lg shadow-sm">
                  R
                </div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <span className="text-xs font-normal text-gray-500 uppercase tracking-widest font-inter">Since 2020</span>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md font-light tracking-wide font-roboto">
              Premium refurbished laptops with certified quality, sustainable value, 
              and complete peace of mind. Trusted by thousands for exceptional 
              technology that performs like new.
            </p>
          </motion.div>

          {/* Navigation Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="lg:col-span-1"
            >
              <h3 className="font-semibold text-gray-900 mb-6 text-xs uppercase tracking-widest border-l-4 border-[#8f1eae] pl-3 font-poppins">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                  >
                    <motion.button
                      onClick={() => handleFooterLink(link.path, link.category)}
                      className="text-gray-600 text-sm flex items-center gap-3 py-2.5 w-full text-left transition-all duration-300 hover:text-[#8f1eae] group font-light font-roboto"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-center w-5 h-5">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full transition-all duration-300 group-hover:bg-[#8f1eae] group-hover:scale-150" />
                      </div>
                      <span className="tracking-wide">{link.label}</span>
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <p className="text-gray-600 text-sm font-light tracking-wide mb-2 font-roboto">
                © {new Date().getFullYear()} Rekraft. All rights reserved.
              </p>
              <p className="text-[#8f1eae] font-semibold text-xs tracking-widest uppercase font-poppins">
                Making technology sustainable
              </p>
            </motion.div>

            {/* Additional Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-8 text-sm text-gray-600 justify-center"
            >
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => handleFooterLink(`/${item.toLowerCase()}`)}
                  className="cursor-pointer font-medium font-roboto transition-all duration-300 hover:text-[#8f1eae] whitespace-nowrap text-xs uppercase tracking-widest hover:underline underline-offset-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Accent Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 h-px bg-gradient-to-r from-transparent via-[#8f1eae] to-transparent"
          />
        </div>
      </div>
    </footer>
  );
}
