import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import { Search, X, Filter, ChevronDown, ShoppingCart } from "lucide-react";
import apiService from '../services/api';

// ========== REUSABLE COMPONENTS ==========

// Loading Spinner Component
const LoadingSpinner = ({ size = "md", fullPage = false }) => {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-12 h-12" : "w-8 h-8";
  
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <div className={`${sizeClass} border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin`} />
      </div>
    );
  }
  
  return (
    <div className={`${sizeClass} border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin`} />
  );
};

// Error State Component
const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-16 bg-white rounded-lg border border-gray-200 p-8">
    <div className="text-4xl mb-4 text-gray-400">⚠️</div>
    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 uppercase tracking-wider">
      UNABLE TO LOAD PRODUCTS
    </h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto text-base font-roboto font-light">
      {error || "We're having trouble loading our products. Please check your connection and try again."}
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onRetry}
        className="bg-[#8f1eae] text-white px-6 py-3 rounded font-poppins font-medium text-sm tracking-wider uppercase transition-colors hover:bg-[#7a1a99]"
      >
        TRY AGAIN
      </button>
      <button
        onClick={() => window.location.reload()}
        className="border border-gray-900 text-gray-900 px-6 py-3 rounded font-poppins font-medium text-sm tracking-wider uppercase transition-colors hover:bg-black hover:text-white"
      >
        RELOAD PAGE
      </button>
    </div>
  </div>
);

// Helper function to calculate discount
const calculateDiscount = (originalPrice, currentPrice) => {
  const original = Number(originalPrice) || 0;
  const current = Number(currentPrice) || 0;
  
  if (original <= current || original === 0) return 0;
  return Math.round(((original - current) / original) * 100);
};

// Helper function to format price for display
const formatPrice = (priceValue) => {
  const priceNum = Number(priceValue) || 0;
  return `₹${priceNum.toLocaleString()}`;
};

// Helper function to normalize brand name
const normalizeBrandName = (brand) => {
  return (brand || '').toLowerCase().trim();
};

// Helper function to normalize search text (same as Navbar)
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

// Get product ID
const getProductId = (product) => {
  return product.id || product._id;
};

// Quick View Modal Component - Memoized
const QuickViewModal = React.memo(({ product, isOpen, onClose, onAddToCart }) => {
  const navigate = useNavigate();
  
  if (!isOpen || !product) return null;

  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-2xl font-poppins font-semibold text-gray-900">
                {product.name}
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                <img 
                  src={product.image || '/images/placeholder-laptop.png'}
                  alt={product.name}
                  className="w-full h-64 object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-laptop.png';
                  }}
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-poppins font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-base text-gray-500 line-through font-roboto">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-poppins font-medium uppercase tracking-wide">
                        SAVE {discount}%
                      </span>
                    </>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <strong className="text-gray-700 text-sm font-poppins font-medium uppercase tracking-wide">CONDITION:</strong>
                    <span className="bg-[#F5F2FA] text-[#8f1eae] px-3 py-1 text-xs rounded-full font-poppins font-medium uppercase tracking-wide">
                      {product.condition || 'REFURBISHED'}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <strong className="text-gray-700 font-poppins font-medium uppercase tracking-wide">WARRANTY:</strong>
                    <span className="text-gray-600 ml-3 font-roboto font-light">{product.warranty || '1 YEAR'}</span>
                  </div>
                  
                  <div className="text-sm">
                    <strong className="text-gray-700 font-poppins font-medium uppercase tracking-wide">BRAND:</strong>
                    <span className="text-gray-600 ml-3 font-roboto font-light">{product.brand || 'UNKNOWN'}</span>
                  </div>
                </div>
                
                {product.specs && product.specs.length > 0 && (
                  <div>
                    <h3 className="font-poppins font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">KEY SPECIFICATIONS</h3>
                    <ul className="space-y-3">
                      {product.specs.slice(0, 3).map((spec, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-600 text-sm font-roboto font-light">
                          <span className="w-1 h-1 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="space-y-3 pt-6">
                  <button
                    onClick={() => {
                      onClose();
                      const productId = getProductId(product);
                      if (productId) navigate(`/laptop/${productId}`);
                    }}
                    className="w-full bg-[#8f1eae] text-white py-4 rounded font-poppins font-medium text-sm uppercase tracking-wider hover:bg-[#7a1a99] transition-colors"
                  >
                    VIEW FULL DETAILS
                  </button>
                  <button 
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="w-full bg-green-600 text-white py-4 rounded font-poppins font-medium text-sm uppercase tracking-wider hover:bg-green-700 transition-colors flex items-center justify-center gap-3"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

// Filter Sidebar Component - Memoized
const FilterSidebar = React.memo(({ 
  searchQuery, 
  handleShopSearchChange,
  handleClearShopSearch,
  selectedBrands, 
  toggleBrand, 
  priceRange, 
  setPriceRange, 
  sortBy, 
  setSortBy, 
  resetAllFilters, 
  availableBrands 
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 border border-gray-300 text-gray-700 rounded font-poppins font-medium text-sm uppercase tracking-wider hover:border-[#8f1eae] hover:text-[#8f1eae] transition-colors"
        >
          <Filter className="w-4 h-4" />
          {isMobileFiltersOpen ? 'HIDE FILTERS' : 'SHOW FILTERS'}
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} space-y-6`}>
        {/* Search Filter */}
        <div className="p-6 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-poppins font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-3">
            <Search className="w-4 h-4" />
            SEARCH PRODUCTS
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, brand, specs..."
              value={searchQuery}
              onChange={(e) => handleShopSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm font-roboto focus:outline-none focus:border-[#8f1eae] placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={handleClearShopSearch}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="p-6 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-poppins font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">FILTER BY BRAND</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {availableBrands.map(brand => (
              <div key={brand} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(normalizeBrandName(brand))}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-[#8f1eae] focus:ring-[#8f1eae]"
                />
                <label 
                  htmlFor={`brand-${brand}`}
                  className="text-sm text-gray-700 font-roboto font-light cursor-pointer hover:text-[#8f1eae] transition-colors"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="p-6 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-poppins font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">PRICE RANGE</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs mb-2 block text-gray-600 font-poppins font-medium uppercase tracking-wide">MIN PRICE (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-roboto focus:outline-none focus:border-[#8f1eae]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs mb-2 block text-gray-600 font-poppins font-medium uppercase tracking-wide">MAX PRICE (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 100000])}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-roboto focus:outline-none focus:border-[#8f1eae]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="p-6 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-poppins font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-3">
            <ChevronDown className="w-4 h-4" />
            SORT BY
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded text-sm font-roboto focus:outline-none focus:border-[#8f1eae] bg-white"
          >
            <option value="featured">FEATURED</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
            <option value="name-asc">NAME: A TO Z</option>
            <option value="name-desc">NAME: Z TO A</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={resetAllFilters}
          className="w-full py-4 border border-gray-900 text-gray-900 rounded font-poppins font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
        >
          RESET ALL FILTERS
        </button>

        {/* Mobile Filter Close Button */}
        {isMobileFiltersOpen && (
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="w-full py-4 bg-[#8f1eae] text-white rounded font-poppins font-medium text-sm uppercase tracking-wider hover:bg-[#7a1a99] transition-colors lg:hidden"
          >
            APPLY FILTERS
          </button>
        )}
      </div>
    </>
  );
});

// Product Card Component - Memoized
const ProductCard = React.memo(({ 
  product, 
  handleProductClick, 
  setSelectedProduct, 
  handleAddToCart 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const productId = getProductId(product);
  const discount = calculateDiscount(product.originalPrice, product.price);

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={() => {
        if (productId) {
          handleProductClick(productId);
        } else {
          console.error('Product has no ID:', product);
          setSelectedProduct(product);
        }
      }}
    >
      <div className="relative bg-gray-50 aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        )}
        <img
          src={product.image || '/images/placeholder-laptop.png'}
          alt={product.name}
          className={`w-full h-full object-contain p-8 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/images/placeholder-laptop.png';
            setImageLoaded(true);
          }}
        />
        
        {/* Condition Badge */}
        <div className="absolute top-4 left-4 bg-[#8f1eae] text-white px-3 py-1 text-xs rounded-full font-poppins font-medium uppercase tracking-wide">
          {product.condition || 'REFURBISHED'}
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-poppins font-medium uppercase tracking-wide">
            SAVE {discount}%
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-poppins font-semibold text-gray-900 text-base leading-tight line-clamp-2">
            {product.name || 'UNNAMED PRODUCT'}
          </h3>
          <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 ml-3 flex-shrink-0 font-poppins font-medium">
            {product.brand || 'UNKNOWN'}
          </span>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-poppins font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {discount > 0 && (
            <span className="text-gray-500 text-sm line-through font-roboto">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {product.specs && product.specs.length > 0 && (
          <div className="text-sm text-gray-600 mb-6 space-y-3 font-roboto font-light">
            {product.specs.slice(0, 2).map((spec, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="w-1 h-1 rounded-full bg-[#8f1eae] mt-2 flex-shrink-0"></span>
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full border border-gray-900 text-gray-900 py-3 text-sm font-poppins font-medium uppercase tracking-wider rounded hover:bg-black hover:text-white transition-colors"
          >
            QUICK VIEW
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="w-full bg-[#8f1eae] text-white py-3 text-sm font-poppins font-medium uppercase tracking-wider rounded hover:bg-[#7a1a99] transition-colors flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-4 h-4" />
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
});

// Notification Component
const Notification = React.memo(({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onHide, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-24 right-4 bg-[#8f1eae] text-white px-6 py-4 rounded shadow-lg z-50 max-w-xs"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm font-poppins font-medium uppercase tracking-wide">{message}</span>
      </div>
    </motion.div>
  );
});

// ========== MAIN SHOP PAGE COMPONENT ==========

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useAuth();
  
  // Read URL parameters - CRITICAL: Sync with Navbar search
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlSearch = searchParams.get('search') || "";
  const urlCategory = searchParams.get('category') || "";
  const urlMinPrice = searchParams.get('minPrice');
  const urlMaxPrice = searchParams.get('maxPrice');
  const urlSort = searchParams.get('sort');
  
  // State - Initialize from URL parameters
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([
    urlMinPrice ? parseInt(urlMinPrice) : 0,
    urlMaxPrice ? parseInt(urlMaxPrice) : 100000
  ]);
  const [sortBy, setSortBy] = useState(urlSort || "featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", isVisible: false });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [availableBrands, setAvailableBrands] = useState([]);

  // 🔥 CRITICAL FIX 1: Sync URL parameters with component state
  useEffect(() => {
    // Update search query from URL (when Navbar search is used)
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
    
    // Update price range from URL
    const newMin = urlMinPrice ? parseInt(urlMinPrice) : 0;
    const newMax = urlMaxPrice ? parseInt(urlMaxPrice) : 100000;
    if (newMin !== priceRange[0] || newMax !== priceRange[1]) {
      setPriceRange([newMin, newMax]);
    }
    
    // Update sort from URL
    if (urlSort && urlSort !== sortBy) {
      setSortBy(urlSort);
    }
  }, [urlSearch, urlMinPrice, urlMaxPrice, urlSort]);

  // 🔥 CRITICAL FIX 2: Sync category from URL
  useEffect(() => {
    if (urlCategory && availableBrands.length > 0) {
      const normalizedCategory = normalizeBrandName(urlCategory);
      const matchingBrand = availableBrands.find(brand => 
        normalizeBrandName(brand) === normalizedCategory
      );
      
      if (matchingBrand && !selectedBrands.includes(normalizedCategory)) {
        setSelectedBrands([normalizedCategory]);
      }
    }
  }, [urlCategory, availableBrands]);

  // 🔥 CRITICAL FIX 3: Update URL when any filter changes
  const updateURL = useCallback((filters) => {
    const params = new URLSearchParams();
    
    if (filters.searchQuery?.trim()) {
      params.set('search', filters.searchQuery.trim());
    }
    
    if (filters.selectedBrands?.length === 1) {
      params.set('category', filters.selectedBrands[0]);
    } else if (filters.selectedBrands?.length > 1) {
      // For multiple brands, we don't set category in URL
      params.delete('category');
    } else {
      params.delete('category');
    }
    
    if (filters.priceRange[0] > 0) {
      params.set('minPrice', filters.priceRange[0].toString());
    } else {
      params.delete('minPrice');
    }
    
    if (filters.priceRange[1] < 100000) {
      params.set('maxPrice', filters.priceRange[1].toString());
    } else {
      params.delete('maxPrice');
    }
    
    if (filters.sortBy && filters.sortBy !== "featured") {
      params.set('sort', filters.sortBy);
    } else {
      params.delete('sort');
    }
    
    navigate(`?${params.toString()}`, { replace: true });
  }, [navigate]);

  // Fetch products with caching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Check cache first (5 minute cache)
        const cacheKey = 'shop_products_cache';
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isCacheValid = Date.now() - timestamp < 5 * 60 * 1000;
          
          if (isCacheValid && data && data.length > 0) {
            console.log('📦 Using cached products');
            processProducts(data);
            setLoading(false);
            return;
          }
        }

        console.log('🔄 Fetching products from API...');
        const response = await apiService.getProducts();
        
        // Handle response structure
        let productsData = [];
        if (Array.isArray(response)) {
          productsData = response;
        } else if (response?.data && Array.isArray(response.data)) {
          productsData = response.data;
        } else if (response?.products && Array.isArray(response.products)) {
          productsData = response.products;
        } else if (response && typeof response === 'object') {
          productsData = [response];
        }
        
        // Cache the response
        if (productsData.length > 0) {
          localStorage.setItem(cacheKey, JSON.stringify({
            data: productsData,
            timestamp: Date.now()
          }));
        }
        
        processProducts(productsData);
        
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const processProducts = (productsData) => {
    setProducts(productsData);
    
    // Extract unique brands
    const brands = [...new Set(
      productsData
        .map(product => product.brand)
        .filter(Boolean)
        .map(brand => brand.trim())
    )].sort();
    
    setAvailableBrands(brands);
  };

  // 🔥 CRITICAL FIX 4: Handle search from both Navbar and shop page
  const handleShopSearchChange = useCallback((value) => {
    setSearchQuery(value);
    updateURL({ 
      searchQuery: value, 
      selectedBrands, 
      priceRange,
      sortBy 
    });
  }, [selectedBrands, priceRange, sortBy, updateURL]);

  // 🔥 CRITICAL FIX 5: Clear search properly
  const handleClearShopSearch = useCallback(() => {
    setSearchQuery("");
    updateURL({ 
      searchQuery: "", 
      selectedBrands, 
      priceRange,
      sortBy 
    });
  }, [selectedBrands, priceRange, sortBy, updateURL]);

  // 🔥 CRITICAL FIX 6: Update brand filters with URL sync
  const toggleBrand = useCallback((brand) => {
    const normalizedBrand = normalizeBrandName(brand);
    setSelectedBrands(prev => {
      const newBrands = prev.includes(normalizedBrand) 
        ? prev.filter(b => b !== normalizedBrand) 
        : [...prev, normalizedBrand];
      
      updateURL({ 
        searchQuery, 
        selectedBrands: newBrands, 
        priceRange,
        sortBy 
      });
      return newBrands;
    });
  }, [searchQuery, priceRange, sortBy, updateURL]);

  // 🔥 CRITICAL FIX 7: Update price range with URL sync
  const handlePriceRangeChange = useCallback((range) => {
    setPriceRange(range);
    updateURL({ 
      searchQuery, 
      selectedBrands, 
      priceRange: range,
      sortBy 
    });
  }, [searchQuery, selectedBrands, sortBy, updateURL]);

  // 🔥 CRITICAL FIX 8: Update sort with URL sync
  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    updateURL({ 
      searchQuery, 
      selectedBrands, 
      priceRange,
      sortBy: value 
    });
  }, [searchQuery, selectedBrands, priceRange, updateURL]);

  // Show notification
  const showNotification = useCallback((message) => {
    setNotification({ message, isVisible: true });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  const handleAddToCart = useCallback(async (product) => {
    try {
      const productId = getProductId(product);
      if (!productId) {
        showNotification('PRODUCT ID NOT FOUND');
        return;
      }
      
      const result = await addToCart(productId, 1);
      if (result.success) {
        showNotification(`${product.name} ADDED TO CART!`);
      } else {
        showNotification(result.message || 'FAILED TO ADD TO CART');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      showNotification('FAILED TO ADD TO CART');
    }
  }, [addToCart, showNotification]);

  const handleProductClick = useCallback((productId) => {
    if (productId) {
      navigate(`/laptop/${productId}`);
    }
  }, [navigate]);

  // 🔥 CRITICAL FIX 9: Reset all filters
  const resetAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedBrands([]);
    setPriceRange([0, 100000]);
    setSortBy("featured");
    navigate('/shop', { replace: true });
  }, [navigate]);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    localStorage.removeItem('shop_products_cache');
    setTimeout(() => setLoading(false), 100);
  }, []);

  // 🔥 CRITICAL FIX 10: Enhanced filtering logic (same as Navbar)
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let results = [...products];

    // Apply search filter with enhanced matching
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const normalizedQuery = normalizeText(query);
      
      results = results.filter(product => {
        // Create comprehensive search string
        const searchString = [
          product.name,
          product.brand,
          product.category,
          product.description,
          ...(product.specs || [])
        ].join(' ').toLowerCase();
        
        const normalizedSearchString = normalizeText(searchString);
        
        // Exact match check
        if (normalizedSearchString.includes(normalizedQuery)) {
          return true;
        }
        
        // Partial word matches (same as Navbar)
        const queryWords = normalizedQuery.split(' ').filter(w => w.length >= 2);
        if (queryWords.length > 0) {
          return queryWords.some(word => normalizedSearchString.includes(word));
        }
        
        // Single character search for brand initials
        if (normalizedQuery.length === 1) {
          return normalizedBrandName(product.brand).startsWith(normalizedQuery);
        }
        
        return false;
      });
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      results = results.filter(product => 
        selectedBrands.includes(normalizeBrandName(product.brand))
      );
    }

    // Apply price filter
    results = results.filter(product => {
      const price = Number(product.price) || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Apply sorting
    return results.sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      const nameA = (a.name || '').toLowerCase();
      const nameB = (b.name || '').toLowerCase();
      
      switch(sortBy) {
        case "price-low": return priceA - priceB;
        case "price-high": return priceB - priceA;
        case "name-asc": return nameA.localeCompare(nameB);
        case "name-desc": return nameB.localeCompare(nameA);
        default: 
          // Featured: show discounted items first, then by price
          const discountA = calculateDiscount(a.originalPrice, a.price);
          const discountB = calculateDiscount(b.originalPrice, b.price);
          if (discountA !== discountB) return discountB - discountA;
          return priceA - priceB;
      }
    });
  }, [products, searchQuery, selectedBrands, priceRange, sortBy]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return [
      searchQuery.trim() ? 1 : 0,
      selectedBrands.length,
      priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0,
      sortBy !== "featured" ? 1 : 0
    ].reduce((a, b) => a + b, 0);
  }, [searchQuery, selectedBrands, priceRange, sortBy]);

  // Render loading state
  if (loading && !products.length) {
    return (
      <div className="pt-20 min-h-screen bg-white">
        <LoadingSpinner size="lg" fullPage />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Notification */}
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">
            SHOP REFURBISHED LAPTOPS
          </h1>
          <p className="text-gray-600 max-w-3xl text-base font-roboto font-light">
            Discover certified pre-owned laptops from top brands. Each device undergoes rigorous testing 
            and comes with our quality guarantee.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filter Sidebar */}
            <div className="lg:w-72">
              <FilterSidebar
                searchQuery={searchQuery}
                handleShopSearchChange={handleShopSearchChange}
                handleClearShopSearch={handleClearShopSearch}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                priceRange={priceRange}
                setPriceRange={handlePriceRangeChange}
                sortBy={sortBy}
                setSortBy={handleSortChange}
                resetAllFilters={resetAllFilters}
                availableBrands={availableBrands}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 p-6 bg-white rounded-lg border border-gray-200">
                <div>
                  <h2 className="text-xl font-poppins font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                    {searchQuery 
                      ? `SEARCH: "${searchQuery}"` 
                      : selectedBrands.length > 0
                      ? `${selectedBrands.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')} LAPTOPS`
                      : 'ALL PRODUCTS'}
                  </h2>
                  <p className="text-gray-600 text-sm font-roboto font-light">
                    {loading 
                      ? "LOADING PRODUCTS..." 
                      : error 
                      ? "ERROR LOADING PRODUCTS" 
                      : `SHOWING ${filteredProducts.length} OF ${products.length} PRODUCTS`
                    }
                  </p>
                </div>
                
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#F5F2FA] text-[#8f1eae] text-xs rounded-full font-poppins font-medium uppercase tracking-wide">
                      {activeFilterCount} FILTER{activeFilterCount !== 1 ? 'S' : ''} ACTIVE
                    </span>
                    <button
                      onClick={resetAllFilters}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-poppins font-medium uppercase tracking-wide hover:border-[#8f1eae] hover:text-[#8f1eae] transition-colors"
                    >
                      CLEAR ALL
                    </button>
                  </div>
                )}
              </div>

              {/* Active Filters Display */}
              {activeFilterCount > 0 && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    {/* Selected Brands */}
                    {selectedBrands.map(brand => (
                      <div key={brand} className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                        <span className="text-sm text-gray-700 font-roboto font-light">
                          {brand.charAt(0).toUpperCase() + brand.slice(1)}
                        </span>
                        <button
                          onClick={() => {
                            const matchingBrand = availableBrands.find(b => 
                              normalizeBrandName(b) === brand
                            );
                            if (matchingBrand) toggleBrand(matchingBrand);
                          }}
                          className="text-gray-400 hover:text-gray-600 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Price Range */}
                    {(priceRange[0] > 0 || priceRange[1] < 100000) && (
                      <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                        <span className="text-sm text-gray-700 font-roboto font-light">
                          PRICE: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                        </span>
                        <button
                          onClick={() => handlePriceRangeChange([0, 100000])}
                          className="text-gray-400 hover:text-gray-600 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {/* Sort */}
                    {sortBy !== "featured" && (
                      <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                        <span className="text-sm text-gray-700 font-roboto font-light">
                          SORT: {sortBy.replace('-', ' ').toUpperCase()}
                        </span>
                        <button
                          onClick={() => handleSortChange("featured")}
                          className="text-gray-400 hover:text-gray-600 ml-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Products Display */}
              {error ? (
                <ErrorState error={error} onRetry={handleRetry} />
              ) : loading ? (
                <div className="flex justify-center items-center py-16">
                  <LoadingSpinner size="lg" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <div className="text-4xl mb-6 text-gray-300">
                    {searchQuery ? "🔍" : "📦"}
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                    {searchQuery ? 'NO PRODUCTS FOUND' : 'NO PRODUCTS AVAILABLE'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-base font-roboto font-light">
                    {searchQuery 
                      ? `WE COULDN'T FIND ANY PRODUCTS MATCHING "${searchQuery}".`
                      : "WE COULDN'T FIND ANY PRODUCTS AT THE MOMENT."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {activeFilterCount > 0 && (
                      <button
                        onClick={resetAllFilters}
                        className="bg-[#8f1eae] text-white px-6 py-3 rounded font-poppins font-medium text-sm uppercase tracking-wider hover:bg-[#7a1a99] transition-colors"
                      >
                        CLEAR ALL FILTERS
                      </button>
                    )}
                    <button
                      onClick={() => navigate('/')}
                      className="border border-gray-900 text-gray-900 px-6 py-3 rounded font-poppins font-medium text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                    >
                      RETURN TO HOME
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={getProductId(product) || product.name}
                      product={product}
                      handleProductClick={handleProductClick}
                      setSelectedProduct={setSelectedProduct}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}