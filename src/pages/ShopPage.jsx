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
    <h3 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">
      Unable to Load Products
    </h3>
    <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
      {error || "We're having trouble loading our products. Please check your connection and try again."}
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onRetry}
        className="bg-[#8f1eae] text-white px-6 py-3 rounded font-medium text-sm tracking-wide uppercase transition-colors hover:bg-[#7a1a99]"
      >
        Try Again
      </button>
      <button
        onClick={() => window.location.reload()}
        className="border border-gray-900 text-gray-900 px-6 py-3 rounded font-medium text-sm tracking-wide uppercase transition-colors hover:bg-black hover:text-white"
      >
        Reload Page
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
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {product.name}
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-500 hover:text-gray-700 transition-colors p-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
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
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-base text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <strong className="text-gray-700 text-sm font-medium">Condition:</strong>
                    <span className="bg-[#F5F2FA] text-[#8f1eae] px-2 py-1 text-xs rounded-full font-medium">
                      {product.condition || 'Refurbished'}
                    </span>
                  </div>
                  
                  <div className="text-sm">
                    <strong className="text-gray-700 font-medium">Warranty:</strong>
                    <span className="text-gray-600 ml-2">{product.warranty || '1 Year'}</span>
                  </div>
                  
                  <div className="text-sm">
                    <strong className="text-gray-700 font-medium">Brand:</strong>
                    <span className="text-gray-600 ml-2">{product.brand || 'Unknown'}</span>
                  </div>
                </div>
                
                {product.specs && product.specs.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Key Specifications</h3>
                    <ul className="space-y-1">
                      {product.specs.slice(0, 3).map((spec, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                          <span className="w-1 h-1 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="space-y-2 pt-4">
                  <button
                    onClick={() => {
                      onClose();
                      const productId = getProductId(product);
                      if (productId) navigate(`/laptop/${productId}`);
                    }}
                    className="w-full bg-[#8f1eae] text-white py-3 rounded font-medium text-sm hover:bg-[#7a1a99] transition-colors"
                  >
                    View Full Details
                  </button>
                  <button 
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded font-medium text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
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
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-[#8f1eae] hover:text-[#8f1eae] transition-colors"
        >
          <Filter className="w-4 h-4" />
          {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Sidebar */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} space-y-4`}>
        {/* Search Filter */}
        <div className="p-4 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Products
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, brand, specs..."
              value={searchQuery}
              onChange={(e) => handleShopSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={handleClearShopSearch}
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="p-4 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Filter by Brand</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {availableBrands.map(brand => (
              <div key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(normalizeBrandName(brand))}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded border-gray-300 text-[#8f1eae] focus:ring-[#8f1eae]"
                />
                <label 
                  htmlFor={`brand-${brand}`}
                  className="text-sm text-gray-700 cursor-pointer hover:text-[#8f1eae] transition-colors"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="p-4 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Price Range</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs mb-1 block text-gray-600">Min Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs mb-1 block text-gray-600">Max Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 100000])}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="p-4 border border-gray-200 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm flex items-center gap-2">
            <ChevronDown className="w-4 h-4" />
            Sort By
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={resetAllFilters}
          className="w-full py-2 border border-gray-900 text-gray-900 rounded text-sm font-medium hover:bg-black hover:text-white transition-colors"
        >
          Reset All Filters
        </button>

        {/* Mobile Filter Close Button */}
        {isMobileFiltersOpen && (
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="w-full py-2 bg-[#8f1eae] text-white rounded text-sm font-medium hover:bg-[#7a1a99] transition-colors lg:hidden"
          >
            Apply Filters
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
          className={`w-full h-full object-contain p-4 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = '/images/placeholder-laptop.png';
            setImageLoaded(true);
          }}
        />
        
        {/* Condition Badge */}
        <div className="absolute top-3 left-3 bg-[#8f1eae] text-white px-2 py-1 text-xs rounded-full font-medium">
          {product.condition || 'Refurbished'}
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full font-medium">
            Save {discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {product.name || 'Unnamed Product'}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 ml-2 flex-shrink-0">
            {product.brand || 'Unknown'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {discount > 0 && (
            <span className="text-gray-500 text-sm line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {product.specs && product.specs.length > 0 && (
          <div className="text-sm text-gray-600 mb-4 space-y-1">
            {product.specs.slice(0, 2).map((spec, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#8f1eae] mt-2 flex-shrink-0"></span>
                <span className="line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full border border-gray-900 text-gray-900 py-2 text-sm font-medium rounded hover:bg-black hover:text-white transition-colors"
          >
            Quick View
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="w-full bg-[#8f1eae] text-white py-2 text-sm font-medium rounded hover:bg-[#7a1a99] transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
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
      className="fixed top-24 right-4 bg-[#8f1eae] text-white px-4 py-3 rounded shadow-lg z-50 max-w-xs"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{message}</span>
      </div>
    </motion.div>
  );
});

// ========== MAIN SHOP PAGE COMPONENT ==========

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useAuth();
  
  // Read URL parameters
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlSearch = searchParams.get('search');
  const urlCategory = searchParams.get('category');
  
  // State
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", isVisible: false });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [availableBrands, setAvailableBrands] = useState([]);

  // Initial fetch with caching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Check cache first (5 minute cache)
        const cacheKey = 'shop_products_cache';
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isCacheValid = Date.now() - timestamp < 5 * 60 * 1000; // 5 minutes
          
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

    // Cleanup function
    return () => {
      // Cleanup if needed
    };
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

  // Handle URL category parameter
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

  // Filter and sort products - Optimized with useMemo
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    let results = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(product => {
        const searchString = [
          product.name,
          product.brand,
          product.description,
          ...(product.specs || [])
        ].join(' ').toLowerCase();
        return searchString.includes(query);
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
      
      switch(sortBy) {
        case "price-low": return priceA - priceB;
        case "price-high": return priceB - priceA;
        case "name-asc": return (a.name || '').localeCompare(b.name || '');
        case "name-desc": return (b.name || '').localeCompare(a.name || '');
        default: return 0;
      }
    });
  }, [products, searchQuery, selectedBrands, priceRange, sortBy]);

  // Memoized handlers
  const handleShopSearchChange = useCallback((value) => {
    setSearchQuery(value);
    
    const params = new URLSearchParams(location.search);
    if (value.trim()) {
      params.set('search', value.trim());
    } else {
      params.delete('search');
    }
    params.delete('category');
    
    navigate(`?${params.toString()}`, { replace: true });
  }, [location.search, navigate]);

  const handleClearShopSearch = useCallback(() => {
    setSearchQuery("");
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate(`?${params.toString()}`, { replace: true });
  }, [location.search, navigate]);

  const toggleBrand = useCallback((brand) => {
    const normalizedBrand = normalizeBrandName(brand);
    setSelectedBrands(prev => {
      const newBrands = prev.includes(normalizedBrand) 
        ? prev.filter(b => b !== normalizedBrand) 
        : [...prev, normalizedBrand];
      
      const params = new URLSearchParams(location.search);
      if (newBrands.length === 1) {
        params.set('category', newBrands[0]);
      } else {
        params.delete('category');
      }
      
      navigate(`?${params.toString()}`, { replace: true });
      return newBrands;
    });
  }, [location.search, navigate]);

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
        showNotification('Product ID not found');
        return;
      }
      
      const result = await addToCart(productId, 1);
      if (result.success) {
        showNotification(`${product.name} added to cart!`);
      } else {
        showNotification(result.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      showNotification('Failed to add to cart');
    }
  }, [addToCart, showNotification]);

  const handleProductClick = useCallback((productId) => {
    if (productId) {
      navigate(`/laptop/${productId}`);
    }
  }, [navigate]);

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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shop Refurbished Laptops
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Discover certified pre-owned laptops from top brands. Each device undergoes rigorous testing 
            and comes with our quality guarantee.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Filter Sidebar */}
            <div className="lg:w-64">
              <FilterSidebar
                searchQuery={searchQuery}
                handleShopSearchChange={handleShopSearchChange}
                handleClearShopSearch={handleClearShopSearch}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                resetAllFilters={resetAllFilters}
                availableBrands={availableBrands}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 p-4 bg-white rounded-lg border border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {urlCategory 
                      ? `${selectedBrands.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')} Laptops`
                      : searchQuery 
                        ? `Search: "${searchQuery}"` 
                        : 'All Products'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {loading 
                      ? "Loading products..." 
                      : error 
                      ? "Error loading products" 
                      : `Showing ${filteredProducts.length} of ${products.length} products`
                    }
                  </p>
                </div>
                
                {activeFilterCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#F5F2FA] text-[#8f1eae] text-xs rounded-full font-medium">
                      {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                    </span>
                    <button
                      onClick={resetAllFilters}
                      className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:border-[#8f1eae] hover:text-[#8f1eae] transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* Active Filters Display */}
              {activeFilterCount > 0 && (
                <div className="mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {/* Selected Brands */}
                    {selectedBrands.map(brand => (
                      <div key={brand} className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                        <span className="text-sm text-gray-700">
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
                      <div className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-200">
                        <span className="text-sm text-gray-700">
                          Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                        </span>
                        <button
                          onClick={() => setPriceRange([0, 100000])}
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
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl mb-4 text-gray-300">
                    {searchQuery ? "🔍" : "📦"}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchQuery ? 'No products found' : 'No products available'}
                  </h3>
                  <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
                    {searchQuery 
                      ? `We couldn't find any products matching "${searchQuery}".`
                      : "We couldn't find any products at the moment."}
                  </p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetAllFilters}
                      className="bg-[#8f1eae] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#7a1a99] transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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