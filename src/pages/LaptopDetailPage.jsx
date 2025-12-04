import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import apiService from '../services/api';

const LaptopDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState({ message: "", isVisible: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('specs');

  // Fetch product details from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching product details for ID:', id);
        
        // Fixed: Use only one API call method
        const productData = await apiService.getProduct(id);
        
        // Handle different response structures
        const product = productData?.data || productData;
        
        if (!product) {
          throw new Error('Product not found');
        }
        
        console.log('✅ Product details received:', product);
        setProduct(product);
        
        // Fetch related products
        await fetchRelatedProducts(product.category, product.id);
        
      } catch (err) {
        console.error('❌ Error fetching product:', err);
        setError(err.message || 'Failed to load product');
        
        // Navigate to shop page if product not found
        if (err.message.includes('not found') || err.response?.status === 404) {
          setTimeout(() => {
            navigate('/shop');
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category, currentProductId) => {
      try {
        const productsData = await apiService.getProducts();
        
        // Handle different response structures
        const products = Array.isArray(productsData) 
          ? productsData 
          : productsData?.data || productsData?.products || [];
        
        // Filter products by same category, exclude current product
        const related = products
          .filter(p => p.category === category && p.id !== currentProductId && p._id !== currentProductId)
          .slice(0, 4);
        
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setRelatedProducts([]);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError('No product ID provided');
      setLoading(false);
    }
  }, [id, navigate]);

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
    setTimeout(() => setNotification({ ...notification, isVisible: false }), 3000);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      console.log('🛒 Adding product to cart:', product.name);
      
      // Ensure we're passing the correct product ID
      const productId = product.id || product._id;
      if (!productId) {
        throw new Error('Product ID not found');
      }
      
      const result = await addToCart(productId, quantity);
      
      if (result.success) {
        showNotification(`✅ ${quantity} ${product.name} added to cart!`);
      } else {
        showNotification(result.message || '❌ Failed to add to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('❌ Failed to add to cart. Please try again.');
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
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

  // Loading state
  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4 font-light text-sm tracking-wide">LOADING PRODUCT DETAILS...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="pt-32 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6 text-gray-300">🔍</div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 font-poppins">
            PRODUCT NOT FOUND
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto font-light text-base">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <div className="space-y-4">
            <Link 
              to="/shop" 
              className="block bg-[#8f1eae] text-white px-6 py-3 font-medium hover:bg-[#7a1a99] transition-colors tracking-widest rounded"
            >
              BACK TO SHOP
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="block border border-gray-900 text-gray-900 px-6 py-3 font-medium hover:bg-black hover:text-white transition-colors tracking-widest rounded"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use product.images if available, otherwise create array with main image
  const productImages = product.images && Array.isArray(product.images) 
    ? product.images 
    : product.image 
      ? [product.image] 
      : ['/images/placeholder-laptop.png'];

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Notification */}
      {notification.isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-6 bg-[#8f1eae] text-white px-6 py-3 z-50 font-medium tracking-widest rounded"
        >
          {notification.message}
        </motion.div>
      )}

      {/* Rest of your component remains the same... */}
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F2FA] to-white z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <nav className="flex space-x-2 text-sm text-gray-600 mb-8 font-light">
              <Link to="/" className="hover:text-[#8f1eae] transition-colors tracking-wide">HOME</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-[#8f1eae] transition-colors tracking-wide">SHOP</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Product Images */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-300 p-6 group hover:border-[#8f1eae] transition-all duration-500">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-96 object-contain transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = '/images/placeholder-laptop.png';
                    }}
                  />
                </div>
                {productImages.length > 1 && (
                  <div className="flex space-x-4">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`bg-white border rounded p-2 transition-all duration-300 ${
                          selectedImage === index 
                            ? 'border-[#8f1eae] scale-105' 
                            : 'border-gray-300 hover:border-[#8f1eae]'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} view ${index + 1}`}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            e.target.src = '/images/placeholder-laptop.png';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center space-x-2 text-[#8f1eae] text-xs font-medium uppercase tracking-widest mb-4 font-inter">
                    <div className="w-1 h-1 bg-[#8f1eae] rounded-full"></div>
                    <span>REFURBISHED EXCELLENCE</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 leading-tight font-poppins">
                    {product.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400 text-lg">⭐</span>
                      <span className="text-gray-700 font-light">{product.rating || 4.5}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 font-light text-sm">{product.reviews || 50} REVIEWS</span>
                    </div>
                    <span className="bg-[#8f1eae]/10 text-[#8f1eae] px-3 py-1 font-medium text-xs tracking-widest rounded-full">
                      {(product.condition || 'EXCELLENT').toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-3xl lg:text-4xl font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xl text-gray-400 line-through font-light">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="bg-[#10B981] text-white px-3 py-2 font-medium text-xs tracking-widest rounded">
                          SAVE {calculateDiscount(product.originalPrice, product.price)}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed font-light text-base max-w-lg">
                    {product.description || 'No description available.'}
                  </p>
                </motion.div>

                {/* Key Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-y border-gray-300">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-light text-sm">BRAND: <span className="text-gray-900 font-medium capitalize">{product.brand || 'Unknown'}</span></span>
                    </div>
                    <div className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-light text-sm">WARRANTY: <span className="text-gray-900 font-medium">{product.warranty || "1 YEAR"}</span></span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-light text-sm">CONDITION: <span className="text-[#8f1eae] font-medium">{(product.condition || 'EXCELLENT').toUpperCase()}</span></span>
                    </div>
                    <div className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className={`font-medium text-sm ${(product.inStock !== false) ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {(product.inStock !== false) ? 'IN STOCK' : 'OUT OF STOCK'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <strong className="text-gray-700 font-medium tracking-wide text-sm">QUANTITY:</strong>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-300 font-light"
                    >
                      -
                    </button>
                    <span className="px-6 py-3 text-gray-900 font-light min-w-12 text-center border-x border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors duration-300 font-light"
                    >
                      +
                    </button>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                  <button
                    onClick={handleAddToCart}
                    disabled={product.inStock === false}
                    className="flex-1 bg-[#8f1eae] text-white py-3 font-medium tracking-widest hover:bg-[#7a1a99] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border border-[#8f1eae] rounded"
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.inStock === false}
                    className="flex-1 bg-transparent text-[#8f1eae] py-3 font-medium tracking-widest hover:bg-[#8f1eae] hover:text-white transition-all duration-300 transform hover:scale-105 border-2 border-[#8f1eae] disabled:opacity-50 disabled:cursor-not-allowed rounded"
                  >
                    BUY NOW
                  </button>
                </motion.div>

                {/* Rest of your component continues... */}
                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-300">
                  <div className="text-center p-4 group hover:bg-[#F5F2FA] transition-colors duration-300 rounded">
                    <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">🚚</div>
                    <div className="text-sm font-medium text-gray-700 tracking-wide">FREE SHIPPING</div>
                  </div>
                  <div className="text-center p-4 group hover:bg-[#F5F2FA] transition-colors duration-300 rounded">
                    <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">🛡️</div>
                    <div className="text-sm font-medium text-gray-700 tracking-wide">1 YEAR WARRANTY</div>
                  </div>
                  <div className="text-center p-4 group hover:bg-[#F5F2FA] transition-colors duration-300 rounded">
                    <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">↩️</div>
                    <div className="text-sm font-medium text-gray-700 tracking-wide">7-DAY RETURNS</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Specifications Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 text-[#8f1eae] text-xs font-medium uppercase tracking-widest mb-4 font-inter">
              <div className="w-1 h-1 bg-[#8f1eae] rounded-full"></div>
              <span>TECHNICAL DETAILS</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 font-poppins">COMPLETE <span className="text-[#8f1eae]">SPECIFICATIONS</span></h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-4 sm:space-x-8 border-b border-gray-300 mb-8">
            {['specs', 'features', 'warranty'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium tracking-wide transition-all duration-300 text-sm ${
                  activeTab === tab
                    ? 'text-[#8f1eae] border-b-2 border-[#8f1eae]'
                    : 'text-gray-600 hover:text-gray-700'
                }`}
              >
                {tab === 'specs' && 'TECHNICAL SPECIFICATIONS'}
                {tab === 'features' && 'KEY FEATURES'}
                {tab === 'warranty' && 'WARRANTY & SUPPORT'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F5F2FA] p-6 sm:p-8 lg:p-12 border border-gray-300 rounded-lg"
          >
            {activeTab === 'specs' && (
              <div className="grid md:grid-cols-2 gap-6">
                {product.specs && product.specs.map((spec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-2 h-2 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-gray-700 font-light text-sm leading-relaxed">{spec}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "50+ POINT QUALITY INSPECTION",
                  "CERTIFIED DATA WIPING PROCESS",
                  "LIKE-NEW PHYSICAL CONDITION",
                  "GENUINE COMPONENTS ONLY",
                  "BATTERY HEALTH CERTIFICATION",
                  "DISPLAY QUALITY ASSURANCE"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 group"
                  >
                    <div className="text-[#8f1eae] transform group-hover:scale-110 transition-transform duration-300">✓</div>
                    <span className="text-gray-700 font-light text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-wide font-poppins">WARRANTY COVERAGE</h3>
                    {[
                      "1-YEAR COMPREHENSIVE WARRANTY",
                      "FREE TECHNICAL SUPPORT",
                      "QUICK REPLACEMENT GUARANTEE",
                      "NATIONWIDE SERVICE NETWORK"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full"></div>
                        <span className="text-gray-700 font-light text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 tracking-wide font-poppins">SUPPORT SERVICES</h3>
                    {[
                      "24/7 CUSTOMER SUPPORT",
                      "ON-SITE SERVICE OPTIONS",
                      "EXTENDED WARRANTY AVAILABLE",
                      "DEDICATED ACCOUNT MANAGER"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full"></div>
                        <span className="text-gray-700 font-light text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Environmental Impact Section */}
      <section className="py-16 bg-[#F5F2FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 text-[#8f1eae] text-xs font-medium uppercase tracking-widest mb-4 font-inter">
                  <div className="w-1 h-1 bg-[#8f1eae] rounded-full"></div>
                  <span>YOUR IMPACT</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight font-poppins">
                  CHOOSE REFURBISHED,
                  <span className="text-[#8f1eae]"> CHOOSE SUSTAINABLE</span>
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-light">
                  By choosing this refurbished device, you're making an environmentally conscious decision 
                  that extends the product's lifecycle and reduces electronic waste.
                </p>
                <div className="space-y-4">
                  {[
                    "PREVENTS E-WASTE GENERATION",
                    "CONSERVES NATURAL RESOURCES",
                    "REDUCES CARBON FOOTPRINT",
                    "SUPPORTS CIRCULAR ECONOMY"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 group"
                    >
                      <div className="w-2 h-2 bg-[#8f1eae] rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white p-8 border border-gray-300 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center tracking-wide font-poppins">ENVIRONMENTAL SAVINGS</h3>
                <div className="space-y-6">
                  {[
                    { number: "85%", label: "REDUCED CARBON FOOTPRINT", color: "bg-[#8f1eae]" },
                    { number: "1.2KG", label: "E-WASTE PREVENTED", color: "bg-[#8f1eae]" },
                    { number: "₹15,000+", label: "VALUE SAVED", color: "bg-[#8f1eae]" }
                  ].map((impact, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="text-center p-6 border-b border-gray-300 last:border-b-0 group hover:bg-[#F5F2FA] transition-colors duration-300 rounded"
                    >
                      <div className="text-2xl lg:text-3xl font-semibold text-[#8f1eae] mb-2 group-hover:scale-105 transition-transform duration-300 font-poppins">
                        {impact.number}
                      </div>
                      <div className="text-gray-600 font-medium text-xs uppercase tracking-widest">{impact.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center space-x-2 text-[#8f1eae] text-xs font-medium uppercase tracking-widest mb-4 font-inter">
                <div className="w-1 h-1 bg-[#8f1eae] rounded-full"></div>
                <span>YOU MAY ALSO LIKE</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 font-poppins">RELATED <span className="text-[#8f1eae]">PRODUCTS</span></h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group"
                >
                  <Link to={`/laptop/${relatedProduct.id}`}>
                    <div className="bg-white border border-gray-300 p-6 group-hover:border-[#8f1eae] transition-all duration-500 rounded-lg">
                      <div className="bg-gray-100 rounded p-6 mb-6 group-hover:bg-white transition-colors duration-300">
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-32 object-contain transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-3 text-sm line-clamp-2 group-hover:text-[#8f1eae] transition-colors duration-300 leading-relaxed font-poppins">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xl font-semibold text-gray-900">{relatedProduct.price}</span>
                        <span className="text-sm text-gray-400 line-through font-light">{relatedProduct.originalPrice}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="bg-[#8f1eae]/10 text-[#8f1eae] px-3 py-1 font-medium text-xs tracking-widest rounded-full">
                          {relatedProduct.condition.toUpperCase()}
                        </span>
                        <div className="text-[#8f1eae] transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8f1eae]/10 to-black/50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 text-white/80 text-xs font-medium uppercase tracking-widest mb-4 font-inter">
              <div className="w-1 h-1 bg-white/80 rounded-full"></div>
              <span>READY TO OWN?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-6 leading-tight font-poppins">
              PREMIUM TECHNOLOGY,
              <br />
              <span className="text-white">SUSTAINABLE CHOICE</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Join thousands of satisfied customers who have chosen quality refurbished devices from Rekraft.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-[#8f1eae] text-white px-8 py-3 text-sm font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] tracking-widest hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed rounded"
              >
                ADD TO CART
              </button>
              <button 
                onClick={() => navigate('/shop')}
                className="bg-transparent text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-black transition-all duration-300 border-2 border-white tracking-widest hover:scale-105 transform rounded"
              >
                CONTINUE SHOPPING
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LaptopDetailPage;