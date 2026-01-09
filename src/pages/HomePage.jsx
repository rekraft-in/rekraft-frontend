import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import apiService from '../services/api';
import { 
  CheckCircle, 
  Shield, 
  Truck, 
  RotateCcw, 
  Clock,
  Star,
  Award,
  Users,
  Package,
  ThumbsUp,
  Leaf,
  Zap,
  Globe,
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ChevronDown,
  Search,
  Battery,
  Cpu,
  HardDrive,
  Monitor,
  ShoppingCart,
  Eye,
  ArrowRight,
  Send,
  CreditCard
} from 'lucide-react';

// Helper function to get product ID (handles both id and _id)
const getProductId = (product) => {
  return product.id || product._id;
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center rounded z-10">
    <div className="w-8 h-8 border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin"></div>
  </div>
);

// Quick View Modal Component
const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const navigate = useNavigate();
  
  if (!isOpen || !product) return null;

  const calculateDiscount = (originalPrice, currentPrice) => {
    try {
      const original = typeof originalPrice === 'number' 
        ? originalPrice 
        : typeof originalPrice === 'string' 
          ? parseInt(originalPrice.replace(/[^0-9]/g, '') || '0')
          : 0;
      
      const current = typeof currentPrice === 'number'
        ? currentPrice
        : typeof currentPrice === 'string'
          ? parseInt(currentPrice.replace(/[^0-9]/g, '') || '0')
          : 0;
      
      if (original <= current || original === 0) return "0%";
      const discount = ((original - current) / original) * 100;
      return `${Math.round(discount)}%`;
    } catch {
      return "0%";
    }
  };

  // Format price for display
  const formatPrice = (priceValue) => {
    if (typeof priceValue === 'number') {
      return `₹${priceValue.toLocaleString()}`;
    } else if (typeof priceValue === 'string') {
      const num = parseInt(priceValue.replace(/[^0-9]/g, '') || '0');
      return `₹${num.toLocaleString()}`;
    }
    return '₹0';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">{product.name}</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 text-lg transition-colors p-2 hover:bg-gray-100 rounded"
            >
              ✕
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded p-8 flex items-center justify-center border border-gray-300">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-contain transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = '/images/placeholder-laptop.png';
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-semibold text-gray-900 font-poppins">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-gray-600 line-through font-light font-roboto">{formatPrice(product.originalPrice)}</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium font-inter">
                      Save {calculateDiscount(product.originalPrice, product.price)}
                    </span>
                  </>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <strong className="text-gray-700 text-sm font-medium uppercase tracking-wide font-inter">Condition:</strong>
                  <span className="bg-[#F5F2FA] text-[#8f1eae] px-2 py-1 text-xs rounded-full font-medium font-inter">
                    {product.condition || 'Refurbished'}
                  </span>
                </div>
                <div className="text-sm">
                  <strong className="text-gray-700 font-medium uppercase tracking-wide font-inter">Warranty:</strong> 
                  <span className="text-gray-600 font-light ml-2 font-roboto">{product.warranty || '2 Year Warranty'}</span>
                </div>2
                <div className="text-sm">
                  <strong className="text-gray-700 font-medium uppercase tracking-wide font-inter">Brand:</strong> 
                  <span className="text-gray-600 font-light ml-2 font-roboto">{product.brand || 'Unknown'}</span>
                </div>
                {product.category && (
                  <div className="text-sm">
                    <strong className="text-gray-700 font-medium uppercase tracking-wide font-inter">Category:</strong> 
                    <span className="text-gray-600 font-light ml-2 capitalize font-roboto">{product.category}</span>
                  </div>
                )}
              </div>
              
              {product.specs && product.specs.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wide font-inter">Key Specifications</h3>
                  <ul className="space-y-2">
                    {product.specs.slice(0, 4).map((spec, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600 text-sm font-light font-roboto">
                        <div className="w-1 h-1 bg-[#8f1eae] rounded-full flex-shrink-0"></div>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => {
                    onClose();
                    const productId = getProductId(product);
                    if (productId) {
                      navigate(`/laptop/${productId}`);
                    } else {
                      console.error('Product has no ID:', product);
                    }
                  }}
                  className="block w-full text-center text-white py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 border border-transparent hover:bg-[#7a1a95] rounded font-inter"
                  style={{ backgroundColor: '#8f1eae' }}
                >
                  View Full Details
                </button>
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full bg-green-600 text-white py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:bg-green-700 rounded flex items-center justify-center gap-2 font-inter"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <button 
                  onClick={onClose}
                  className="w-full border border-gray-300 text-gray-700 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded flex items-center justify-center gap-2 font-inter"
                >
                  <ArrowRight className="w-4 h-4" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Notification Component
const Notification = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-20 right-6 bg-white text-gray-900 px-6 py-4 rounded-xl shadow-2xl border border-gray-300 z-50 max-w-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#F5F2FA] rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#8f1eae]" />
            </div>
            <span className="font-medium font-roboto">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -8 }}
    className="bg-white p-8 border border-gray-300 group hover:border-[#8f1eae] transition-all duration-300 rounded"
  >
    <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#8f1eae] group-hover:scale-110 transition-all duration-300">
      <Icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#8f1eae] transition-colors duration-300 font-poppins">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-xs font-light font-roboto">{description}</p>
  </motion.div>
);

// Stats Counter Component
const StatsSection = () => {
  const [stats, setStats] = useState({ customers: 0, products: 0, satisfaction: 0 });
  
  useEffect(() => {
    const animateNumbers = () => {
      let customers = 0;
      let products = 0;
      let satisfaction = 0;
      
      const interval = setInterval(() => {
        if (customers < 50) customers += 25;
        if (products < 60) products += 2;
        if (satisfaction < 95) satisfaction += 1;
        
        setStats({ customers, products, satisfaction });
        
        if (customers >= 850 && products >= 120 && satisfaction >= 95) {
          clearInterval(interval);
        }
      }, 50);
    };
    
    animateNumbers();
  }, []);

  return (
    <section className="py-16 bg-[#F5F2FA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-6 bg-white border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded"
          >
            <Users className="w-8 h-8 text-[#8f1eae] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-2xl font-semibold text-[#8f1eae] mb-2 group-hover:scale-105 transition-transform duration-300 font-poppins">
              {stats.customers.toLocaleString()}+
            </div>
            <div className="text-gray-600 font-light text-xs uppercase tracking-widest font-inter">Satisfied Customers</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center p-6 bg-white border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded"
          >
            <Package className="w-8 h-8 text-[#8f1eae] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-2xl font-semibold text-[#8f1eae] mb-2 group-hover:scale-105 transition-transform duration-300 font-poppins">
              {stats.products}+
            </div>
            <div className="text-gray-600 font-light text-xs uppercase tracking-widest font-inter">Quality Tested Devices</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center p-6 bg-white border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 group rounded"
          >
            <ThumbsUp className="w-8 h-8 text-[#8f1eae] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-2xl font-semibold text-[#8f1eae] mb-2 group-hover:scale-105 transition-transform duration-300 font-poppins">
              {stats.satisfaction}%
            </div>
            <div className="text-gray-600 font-light text-xs uppercase tracking-widest font-inter">Customer Satisfaction</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Trust Badges Component - UPDATED with 5 badges
const TrustSection = () => (
  <section className="py-16 bg-white border-y border-gray-300">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins">Trusted & Certified Refurbished Laptops</h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">Every device undergoes 50+ point quality testing and comes with comprehensive 2 year warranty</p>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
        {[
          { icon: Shield, text: "Secure Purchase" },
          { icon: Star, text: "4.8/5 Rating" },
          { icon: Truck, text: "Free Shipping" },
          { icon: Award, text: "2Y Warranty" },
          { icon: RotateCcw, text: "Easy Replacement" } // Added new badge
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 group"
          >
            <div className="w-12 h-12 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#8f1eae] group-hover:scale-110 transition-all duration-300">
              <item.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <div className="text-sm font-medium text-gray-700 font-inter">{item.text}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Brands Showcase Component
const BrandsSection = () => {
  const brands = [
    { 
      name: 'Apple', 
      logo: '/images/brands/apple-logo.png'
    },
    { 
      name: 'Dell', 
      logo: '/images/brands/dell-logo.png'
    },
    { 
      name: 'HP', 
      logo: '/images/brands/hp-logo.png'
    },
    { 
      name: 'Lenovo', 
      logo: '/images/brands/lenovo-logo.png'
    },
    { 
      name: 'Asus', 
      logo: '/images/brands/asus-logo.png'
    },
    { 
      name: 'Acer', 
      logo: '/images/brands/acer-logo.png'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-900 tracking-wide uppercase font-poppins">Premium Refurbished Laptop Brands</h3>
          <p className="text-gray-600 text-sm font-light font-roboto">Certified refurbished laptops from top manufacturers with quality assurance</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 text-center group rounded"
            >
              <div className="h-16 mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  onError={(e) => {
                    console.error(`Failed to load logo for ${brand.name}`);
                    e.target.src = '/images/placeholder-laptop.png';
                  }}
                />
              </div>
              <div className="font-medium text-gray-800 text-sm font-inter">{brand.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sustainability Impact Component
const SustainabilitySection = () => (
  <section className="py-20 bg-[#F5F2FA]">
    <div className="max-w-6xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 tracking-wide uppercase font-poppins">Environmental Impact of Refurbished Laptops</h3>
        <p className="text-gray-600 text-sm font-light font-roboto">Choosing refurbished electronics reduces e-waste and conserves resources</p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[
          { icon: Battery, value: "220L", label: "Water Saved", color: "from-[#8f1eae] to-[#7a1a95]" },
          { icon: Zap, value: "80%", label: "Energy Saved", color: "from-[#8f1eae] to-[#6b1680]" },
          { icon: Globe, value: "9kg", label: "CO₂ Reduced", color: "from-[#8f1eae] to-[#5c136b]" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="text-center bg-white p-8 border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 rounded"
          >
            <div className={`bg-gradient-to-r ${item.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <item.icon className="w-8 h-8" />
            </div>
            <div className="text-2xl font-semibold text-gray-900 mb-2 font-poppins">{item.value}</div>
            <div className="text-gray-600 font-medium text-sm font-inter">{item.label}</div>
            <div className="text-xs text-gray-500 mt-2 font-light font-roboto">Per refurbished laptop</div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center gap-2 text-[#8f1eae] mb-4">
          <Leaf className="w-6 h-6" />
          <span className="text-sm font-medium uppercase tracking-widest font-inter">Sustainable Choice</span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm font-light font-roboto">
          By choosing refurbished laptops, you help reduce electronic waste and conserve precious natural resources. 
          Join us in building a sustainable future for technology consumption.
        </p>
      </motion.div>
    </div>
  </section>
);

// FAQ Component
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      question: "Are refurbished laptops reliable for daily use?",
      answer: "Absolutely! Each refurbished laptop undergoes 50+ rigorous quality checks, professional restoration, and comprehensive testing. We ensure every device performs like new and comes with a 2-year warranty for complete peace of mind."
    },
    {
      question: "How long does shipping take for refurbished laptops?",
      answer: "We provide free 3-5 day shipping across India. Express delivery options are available for urgent requirements at an additional cost."
    },
    {
      question: "Do refurbished laptops come with warranty?",
      answer: "Yes! All our refurbished laptops come with 2-year comprehensive warranty covering parts and labor. Extended warranty options are also available for additional protection."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-[#8f1eae]" />
            <h3 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">Refurbished Laptop FAQs</h3>
          </div>
          <p className="text-gray-600 text-sm font-light font-roboto">Common questions about buying refurbished laptops online</p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-300 rounded overflow-hidden hover:border-[#8f1eae] transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 text-left font-medium text-gray-900 flex justify-between items-center hover:bg-[#F5F2FA] transition-colors duration-200 tracking-wide font-inter"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-base font-poppins">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-[#F5F2FA] text-gray-600 border-t border-gray-300 text-sm font-light font-roboto">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Support Widget Component
const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
    </>
  );
};

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [notification, setNotification] = useState({ message: "", isVisible: false });
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [email, setEmail] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const { addToCart } = useAuth();

  // Fetch featured products from backend - FIXED VERSION
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        console.log('🔄 Fetching featured products from backend...');
        
        const productsData = await apiService.getProducts();
        
        // Handle different response structures
        let products = [];
        if (Array.isArray(productsData)) {
          products = productsData;
        } else if (productsData?.data && Array.isArray(productsData.data)) {
          products = productsData.data;
        } else if (productsData?.products && Array.isArray(productsData.products)) {
          products = productsData.products;
        } else if (typeof productsData === 'object' && productsData !== null) {
          products = [productsData];
        }
        
        console.log('✅ Featured products received:', products.slice(0, 3));
        
        // Take first 3 products as featured
        setFeaturedProducts(products.slice(0, 3));
      } catch (error) {
        console.error('❌ Error fetching featured products:', error);
        setNotification({ 
          message: 'Failed to load products. Please try again.', 
          isVisible: true 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const handleImageLoad = (productId) => {
    setImagesLoaded(prev => ({ ...prev, [productId]: true }));
  };

  const handleAddToCart = async (product) => {
    try {
      console.log('🛒 Adding product to cart from homepage:', product.name);
      
      const productId = getProductId(product);
      if (!productId) {
        showNotification('❌ Product ID not found');
        return;
      }
      
      const result = await addToCart(productId, 1);
      
      if (result.success) {
        showNotification(`🎉 ${product.name} added to cart!`);
      } else {
        showNotification(result.message || '❌ Failed to add to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('❌ Failed to add to cart. Please try again.');
    }
  };

  const handleShopCollection = () => {
    navigate('/shop');
  };

  const handleSellDevice = () => {
    navigate('/sell');
  };

  const handleDiscover = (type) => {
    if (type === 'shop') {
      navigate('/shop');
    } else if (type === 'sell') {
      navigate('/sell');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showNotification(`🎉 Thank you for subscribing! You'll receive updates at ${email}`);
      setEmail("");
    } else {
      showNotification("📧 Please enter your email address");
    }
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    try {
      const original = typeof originalPrice === 'number' 
        ? originalPrice 
        : typeof originalPrice === 'string' 
          ? parseInt(originalPrice.replace(/[^0-9]/g, '') || '0')
          : 0;
      
      const current = typeof currentPrice === 'number'
        ? currentPrice
        : typeof currentPrice === 'string'
          ? parseInt(currentPrice.replace(/[^0-9]/g, '') || '0')
          : 0;
      
      if (original <= current || original === 0) return "0%";
      const discount = ((original - current) / original) * 100;
      return `${Math.round(discount)}%`;
    } catch {
      return "0%";
    }
  };

  // Format price for display
  const formatPrice = (priceValue) => {
    if (typeof priceValue === 'number') {
      return `₹${priceValue.toLocaleString()}`;
    } else if (typeof priceValue === 'string') {
      const num = parseInt(priceValue.replace(/[^0-9]/g, '') || '0');
      return `₹${num.toLocaleString()}`;
    }
    return '₹0';
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-roboto pt-20">
      {/* Simple Full Hero Banner */}
      <section className="w-full relative overflow-hidden">
        <img
          src="/images/Black Purple Modern Website Design And Development Banner.png"
          alt="Rekraft Banner"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/images/placeholder-laptop.png';
          }}
        />
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Trust Badges Section */}
      <TrustSection />

      {/* Enhanced Categories Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 tracking-wide uppercase font-poppins">
              Buy & Sell Refurbished Laptops
            </h2>
            <p className="text-gray-600 text-sm font-light max-w-2xl mx-auto tracking-wide font-roboto">
              Whether you're looking to upgrade to a refurbished laptop or sell your current device, we provide trusted services with complete transparency.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Buy Refurbished Laptops",
                desc: "Discover carefully selected and professionally restored laptops from premium brands with full 2-year warranty and quality certification",
                image: "/images/buy.png",
                type: "shop",
                features: ["2-Year Warranty", "Quality Certified", "Free Shipping"]
              },
              {
                title: "Sell Your Laptop",
                desc: "Get instant valuation, free doorstep pickup, and secure payment within 24 hours for your used laptop with transparent pricing",
                image: "/images/sell.png",
                type: "sell",
                features: ["Instant Payment", "Free Pickup", "Secure Process"]
              },
            ].map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer bg-white border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 rounded"
              >
                <div 
                  className="relative overflow-hidden bg-gray-100 aspect-4/3 cursor-pointer"
                  onClick={() => handleDiscover(cat.type)}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-laptop.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      {cat.features.map((feature, i) => (
                        <span key={i} className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-gray-700 uppercase tracking-widest font-inter">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 tracking-wide font-poppins">{cat.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm font-light font-roboto">{cat.desc}</p>
                  <button 
                    onClick={() => handleDiscover(cat.type)}
                    className="text-[#8f1eae] font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-widest font-inter"
                  >
                    Discover More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 bg-[#F5F2FA] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 tracking-wide uppercase font-poppins">
              Featured Refurbished Laptops
            </h2>
            <p className="text-gray-600 text-sm font-light max-w-2xl mx-auto tracking-wide font-roboto">
              Handpicked premium refurbished laptops with complete testing, warranty, and significant savings
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => {
                const productId = getProductId(product);
                
                return (
                  <motion.div
                    key={productId || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white group cursor-pointer border border-gray-300 hover:border-[#8f1eae] transition-all duration-300 rounded"
                    onClick={() => {
                      if (productId) {
                        navigate(`/laptop/${productId}`);
                      } else {
                        console.error('Product has no ID:', product);
                        setQuickViewProduct(product);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#F5F2FA] to-gray-50 aspect-square p-6">
                      {!imagesLoaded[productId] && <LoadingSpinner />}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        onLoad={() => handleImageLoad(productId)}
                        onError={(e) => {
                          e.target.src = '/images/placeholder-laptop.png';
                          e.target.onerror = null;
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-[#8f1eae] text-white px-2 py-1 text-xs font-medium rounded-full font-inter">
                        {product.condition || 'Refurbished'}
                      </div>
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-gray-700 rounded-full font-inter">
                        {product.warranty || '2Y Warranty'}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-base mb-2 text-gray-900 line-clamp-2 tracking-wide font-poppins">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-semibold text-gray-900 font-poppins">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-gray-600 text-sm line-through font-light font-roboto">{formatPrice(product.originalPrice)}</span>
                            <span className="bg-[#8f1eae] text-white px-2 py-1 rounded-full text-xs font-medium font-inter">
                              Save {calculateDiscount(product.originalPrice, product.price)}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="flex-1 bg-[#8f1eae] text-white py-3 rounded hover:bg-[#7a1a95] transition-all duration-300 font-medium text-sm uppercase tracking-widest flex items-center justify-center gap-2 font-inter"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          className="px-4 border border-gray-300 text-gray-700 py-3 rounded hover:border-[#8f1eae] hover:text-[#8f1eae] transition-all duration-300 font-medium text-sm uppercase tracking-widest flex items-center justify-center gap-2 font-inter"
                        >
                          <Eye className="w-4 h-4" />
                          Quick View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button 
              onClick={handleShopCollection}
              className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] tracking-wide uppercase flex items-center justify-center gap-2 mx-auto rounded font-inter"
            >
              View All Refurbished Laptops
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brands Showcase */}
      <BrandsSection />

      {/* Enhanced Value Proposition */}
      <section className="py-20 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 tracking-wide uppercase font-poppins">
              Why Choose Our Refurbished Laptops
            </h2>
            <p className="text-gray-600 text-sm font-light max-w-2xl mx-auto tracking-wide font-roboto">
              We provide quality-tested refurbished laptops with complete transparency and customer support
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[   
              { 
                icon: Search,
                title: "50+ Point Testing", 
                desc: "Complete diagnostic reports, battery health certificates, and performance verification for every laptop"
              },
              { 
                icon: Shield,
                title: "Secure Purchase", 
                desc: "Safe transactions with buyer protection, secure payment gateway, and easy return policies"
              },
              { 
                icon: Phone,
                title: "Dedicated Support", 
                desc: "24/7 customer care and technical assistance for all your refurbished laptop needs and queries"
              },
              { 
                icon: CreditCard,
                title: "Flexible Payments", 
                desc: "EMI options, credit card payments, and multiple payment methods for easy laptop purchasing"
              }
            ].map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <SustainabilitySection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Enhanced Newsletter */}
      <section className="py-20 bg-white border-t border-gray-300 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 border border-gray-300 rounded"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="w-8 h-8 text-[#8f1eae]" />
              <h2 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">
                Stay Updated on Refurbished Laptops
              </h2>
            </div>
            <p className="text-gray-600 mb-8 text-sm font-light max-w-md mx-auto tracking-wide font-roboto">
              Subscribe for new laptop arrivals, exclusive offers, and sustainability insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto bg-white border border-gray-300 p-1 rounded">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 placeholder-gray-400 text-gray-900 text-sm focus:outline-none px-4 py-2 font-light font-roboto"
                required
              />
              <button 
                type="submit" 
                className="bg-[#8f1eae] text-white px-4 py-2 hover:bg-[#7a1a95] transition-all duration-300 font-medium text-sm uppercase tracking-widest flex items-center gap-2 rounded font-inter"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-xs mt-4 font-light font-roboto">
              Join our community. No spam, unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - H&M Style */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold mb-4 tracking-wide uppercase font-poppins"
          >
            Smart Choice for Smart Savings
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed font-light font-roboto"
          >
            Choose certified refurbished laptops. Save money while making an environmentally conscious decision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <button 
              onClick={() => navigate('/shop')}
              className="bg-[#8f1eae] text-white px-6 py-3 text-sm font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] tracking-wide uppercase flex items-center justify-center gap-2 rounded font-inter"
            >
              <ShoppingCart className="w-4 h-4" />
              SHOP REFURBISHED LAPTOPS
            </button>
            <button 
              onClick={() => navigate('/sell')}
              className="bg-transparent text-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 border border-white tracking-wide uppercase flex items-center justify-center gap-2 rounded font-inter"
            >
              <ArrowRight className="w-4 h-4" />
              SELL YOUR LAPTOP
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Notification */}
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
      />

      {/* Support Widget */}
      <SupportWidget />
    </div>
  );
}
