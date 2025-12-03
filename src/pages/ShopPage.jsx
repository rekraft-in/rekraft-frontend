import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import { Search, X, Filter, ChevronDown } from "lucide-react";
import apiService from '../services/api';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin"></div>
  </div>
);

// Error State Component
const ErrorState = ({ error, onRetry }) => (
  <div className="text-center py-16 bg-white rounded-lg border border-gray-300 p-8">
    <div className="text-4xl mb-4 text-gray-400">⚠️</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide font-poppins">
      Unable to Load Products
    </h3>
    <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm font-light font-roboto">
      {error || "We're having trouble loading our products. Please check your connection and try again."}
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onRetry}
        className="bg-[#8f1eae] text-white px-6 py-3 rounded font-medium text-sm tracking-wide uppercase transition-all duration-300 border border-[#8f1eae] hover:bg-[#7a1a99] font-roboto"
      >
        Try Again
      </button>
      <button
        onClick={() => window.location.reload()}
        className="border border-gray-900 text-gray-900 px-6 py-3 rounded font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:bg-black hover:text-white font-roboto"
      >
        Reload Page
      </button>
    </div>
    <p className="text-xs text-gray-500 mt-6 font-light font-roboto">
      If the problem persists, please contact our support team.
    </p>
  </div>
);

// Quick View Modal Component
const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const calculateDiscount = (originalPrice, currentPrice) => {
    const original = parseInt(originalPrice?.replace(/[^0-9]/g, '') || '0');
    const current = parseInt(currentPrice?.replace(/[^0-9]/g, '') || '0');
    if (original <= current || original === 0) return "0%";
    const discount = ((original - current) / original) * 100;
    return `${Math.round(discount)}%`;
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
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 tracking-wide uppercase font-poppins">
              {product.name}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded font-roboto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center border border-gray-300">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-contain transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-gray-900 font-poppins">{product.price}</span>
                <span className="text-base text-gray-500 line-through font-light font-roboto">
                  {product.originalPrice}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium font-roboto">
                  Save {calculateDiscount(product.originalPrice, product.price)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <strong className="text-gray-700 text-sm font-medium uppercase tracking-wide font-inter">
                    Condition:
                  </strong>
                  <span className="bg-[#F5F2FA] text-[#8f1eae] px-3 py-1 text-xs rounded-full font-medium font-roboto">
                    {product.condition}
                  </span>
                </div>
                <div className="text-sm font-roboto">
                  <strong className="text-gray-700 font-medium uppercase tracking-wide font-inter">
                    Warranty:
                  </strong> 
                  <span className="text-gray-600 font-light ml-2 font-roboto">{product.warranty}</span>
                </div>
                <div className="text-sm font-roboto">
                  <strong className="text-gray-700 font-medium uppercase tracking-wide font-inter">
                    Brand:
                  </strong> 
                  <span className="text-gray-600 font-light ml-2 font-roboto">{product.brand}</span>
                </div>
                <div className="text-sm font-roboto">
                  <strong className="text-gray-700 font-medium uppercase tracking-wide font-inter">
                    Category:
                  </strong> 
                  <span className="text-gray-600 font-light ml-2 font-roboto capitalize">{product.category}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide font-poppins">
                  Key Specifications
                </h3>
                <ul className="space-y-3">
                  {product.specs && product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-600 text-sm font-light font-roboto">
                      <div className="w-1.5 h-1.5 bg-[#8f1eae] rounded-full mt-2 flex-shrink-0"></div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = `/laptop/${product.id}`;
                  }}
                  className="block w-full bg-[#8f1eae] text-white py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 border border-[#8f1eae] hover:bg-[#7a1a99] rounded font-roboto"
                >
                  View Full Details
                </button>
                <button 
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full bg-green-600 text-white py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:bg-green-700 rounded font-roboto"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={onClose}
                  className="w-full border border-gray-300 text-gray-700 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded font-roboto"
                >
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

// Helper function to calculate discount
const calculateDiscount = (originalPrice, currentPrice) => {
  const original = parseInt(originalPrice?.replace(/[^0-9]/g, '') || '0');
  const current = parseInt(currentPrice?.replace(/[^0-9]/g, '') || '0');
  if (original <= current || original === 0) return "0%";
  const discount = ((original - current) / original) * 100;
  return `${Math.round(discount)}%`;
};

// Helper function to extract numeric price
const extractPrice = (priceString) => {
  return parseInt(priceString?.replace(/[^0-9]/g, '') || '0');
};

// Helper function to normalize brand name
const normalizeBrandName = (brand) => {
  if (!brand) return '';
  return brand.toLowerCase().trim();
};

// Filter Sidebar Component
const FilterSidebar = ({ 
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
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-gray-700 rounded text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] font-roboto"
        >
          <Filter className="w-4 h-4" />
          {isMobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Sidebar - Desktop & Mobile */}
      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden lg:block'} space-y-6`}>
        {/* Search Filter */}
        <div className="p-6 border border-gray-300 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2 font-poppins">
            <Search className="w-4 h-4" />
            Search Products
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, brand, specs..."
              value={searchQuery}
              onChange={(e) => handleShopSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] text-gray-900 placeholder-gray-500 font-light font-roboto"
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
        <div className="p-6 border border-gray-300 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide font-poppins">
            Filter by Brand
          </h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
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
                  className="text-sm text-gray-700 font-light cursor-pointer hover:text-[#8f1eae] transition-colors font-roboto"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="p-6 border border-gray-300 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide font-poppins">
            Price Range
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs mb-2 block text-gray-600 font-light uppercase tracking-wide font-inter">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] font-light font-roboto"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs mb-2 block text-gray-600 font-light uppercase tracking-wide font-inter">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] font-light font-roboto"
                />
              </div>
            </div>
            <div className="pt-2">
              <input
                type="range"
                min="0"
                max="100000"
                step="5000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-1 rounded appearance-none cursor-pointer bg-gray-300 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#8f1eae]"
              />
              <div className="flex justify-between text-xs mt-2 text-gray-600 font-light font-roboto">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sort Filter */}
        <div className="p-6 border border-gray-300 bg-white rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2 font-poppins">
            <ChevronDown className="w-4 h-4" />
            Sort By
          </h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] text-gray-900 bg-white font-light font-roboto"
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
          className="w-full py-3 border border-gray-900 text-gray-900 rounded text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-black hover:text-white font-roboto"
        >
          Reset All Filters
        </button>

        {/* Mobile Filter Close Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="w-full py-3 bg-[#8f1eae] text-white rounded text-sm font-medium tracking-wide uppercase transition-all duration-300 border border-[#8f1eae] hover:bg-[#7a1a99] font-roboto"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

// Product Card Component
const ProductCard = ({ 
  product, 
  imagesLoaded, 
  handleImageLoad, 
  handleProductClick, 
  setSelectedProduct, 
  handleAddToCart 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4 }}
    className="bg-white group cursor-pointer border border-gray-300 rounded-lg overflow-hidden hover:border-[#8f1eae] transition-all duration-300"
    onClick={() => handleProductClick(product.id)}
  >
    <div className="relative bg-gray-100 aspect-square">
      {!imagesLoaded[product.id] && <LoadingSpinner />}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
        onLoad={() => handleImageLoad(product.id)}
      />
      
      {/* Condition Badge */}
      <div className="absolute top-4 left-4 bg-[#8f1eae] text-white px-3 py-1 text-xs rounded-full font-medium tracking-wide uppercase font-roboto">
        {product.condition}
      </div>

      {/* Discount Badge */}
      <div className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full font-medium font-roboto">
        Save {calculateDiscount(product.originalPrice, product.price)}
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-900 text-base leading-tight tracking-wide font-poppins">
          {product.name}
        </h3>
        <span className="text-xs px-3 py-1 rounded-full font-light bg-[#F5F2FA] text-gray-600 uppercase tracking-wide font-roboto">
          {product.brand}
        </span>
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl font-semibold text-gray-900 font-poppins">
          ₹{extractPrice(product.price).toLocaleString()}
        </span>
        {product.originalPrice && (
          <span className="text-gray-500 text-sm line-through font-light font-roboto">
            ₹{extractPrice(product.originalPrice).toLocaleString()}
          </span>
        )}
      </div>
      
      <div className="text-sm text-gray-600 mb-6 space-y-3 font-light font-roboto">
        {product.specs && product.specs.slice(0, 3).map((spec, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8f1eae] flex-shrink-0 mt-1.5"></div>
            <span className="leading-relaxed">{spec}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="w-full border border-gray-900 text-gray-900 py-3 font-medium text-sm tracking-wide uppercase rounded transition-all duration-300 hover:bg-black hover:text-white font-roboto"
        >
          Quick View
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          className="w-full bg-[#8f1eae] text-white py-3 font-medium text-sm tracking-wide uppercase rounded transition-all duration-300 border border-[#8f1eae] hover:bg-[#7a1a99] font-roboto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </motion.div>
);

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useAuth();
  
  // Read URL parameters
  const searchParams = new URLSearchParams(location.search);
  const urlSearch = searchParams.get('search');
  const urlCategory = searchParams.get('category');
  
  // State for all products and filters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(urlSearch || "");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState("featured");
  
  // UI states
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [notification, setNotification] = useState({ message: "", isVisible: false });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  
  // Available brands extracted from products
  const [availableBrands, setAvailableBrands] = useState([]);

  // Fetch all products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching all products from backend...');
        
        try {
  const productsData = await apiService.getProducts();
  const products = Array.isArray(productsData) ? productsData : 
                   productsData?.data || productsData?.products || [];
  setAllProducts(products);
  setFilteredProducts(products);
} catch (error) {
  console.error('Error fetching products:', error);
  setAllProducts([]);
  setFilteredProducts([]);
}

        
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from server');
        }
        
        console.log('✅ Backend products received:', data.length, 'products');
        
        const brands = [...new Set(data.map(product => product.brand).filter(Boolean))].sort();
        setAvailableBrands(brands);
        
        setProducts(data);
        setFilteredProducts(data);
        
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [retryCount]);

  // Update searchQuery when URL parameter changes
  useEffect(() => {
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  // Handle category parameter from URL (from footer brand links)
  useEffect(() => {
    if (urlCategory && products.length > 0) {
      console.log('📱 URL Category detected:', urlCategory);
      
      // Find the brand that matches the category (case-insensitive)
      const normalizedCategory = normalizeBrandName(urlCategory);
      const matchingBrand = availableBrands.find(brand => 
        normalizeBrandName(brand) === normalizedCategory
      );
      
      if (matchingBrand && !selectedBrands.includes(normalizeBrandName(matchingBrand))) {
        console.log('✅ Setting brand filter for:', matchingBrand);
        setSelectedBrands([normalizeBrandName(matchingBrand)]);
      }
    }
  }, [urlCategory, products, availableBrands]);

  // Apply filters whenever any filter changes
  useEffect(() => {
    if (!products.length) return;

    let results = [...products];

    // 1. Apply Search Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(product => {
        return (
          product.name?.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query) ||
          product.model?.toLowerCase().includes(query) ||
          (product.specs && product.specs.some(spec => 
            spec.toLowerCase().includes(query)
          ))
        );
      });
    }

    // 2. Apply Brand Filter
    if (selectedBrands.length > 0) {
      console.log('🔍 Filtering by brands:', selectedBrands);
      results = results.filter(product => 
        selectedBrands.includes(normalizeBrandName(product.brand))
      );
      console.log('✅ Filtered results count:', results.length);
    }

    // 3. Apply Price Range Filter
    results = results.filter(product => {
      const price = extractPrice(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // 4. Apply Sorting
    results.sort((a, b) => {
      const priceA = extractPrice(a.price);
      const priceB = extractPrice(b.price);
      
      switch(sortBy) {
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default: // "featured"
          return 0; // Keep original order
      }
    });

    setFilteredProducts(results);
  }, [searchQuery, selectedBrands, priceRange, sortBy, products]);

  // Handle shop search change
  const handleShopSearchChange = (value) => {
    setSearchQuery(value);
    
    // Update URL without page reload
    const params = new URLSearchParams(location.search);
    if (value.trim()) {
      params.set('search', value.trim());
    } else {
      params.delete('search');
    }
    
    // Remove category if search is being used
    params.delete('category');
    
    // Replace current URL without reloading
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Handle clear search from shop page
  const handleClearShopSearch = () => {
    setSearchQuery("");
    
    // Update URL
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Handle brand selection
  const toggleBrand = (brand) => {
    const normalizedBrand = normalizeBrandName(brand);
    setSelectedBrands(prev => {
      const newBrands = prev.includes(normalizedBrand) 
        ? prev.filter(b => b !== normalizedBrand) 
        : [...prev, normalizedBrand];
      
      // Update URL to reflect brand selection
      const params = new URLSearchParams(location.search);
      if (newBrands.length === 1) {
        // If only one brand selected, update category parameter
        params.set('category', newBrands[0]);
      } else {
        // If multiple or no brands, remove category parameter
        params.delete('category');
      }
      
      navigate(`?${params.toString()}`, { replace: true });
      
      return newBrands;
    });
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
    setTimeout(() => setNotification({ ...notification, isVisible: false }), 3000);
  };

  const handleImageLoad = (imageId) => {
    setImagesLoaded(prev => ({ ...prev, [imageId]: true }));
  };

  const handleAddToCart = async (product) => {
    try {
      console.log('🛒 Adding product to cart:', product.name);
      
      const result = await addToCart(product.id, 1);
      
      if (result.success) {
        showNotification(`✅ ${product.name} added to cart!`);
      } else {
        showNotification(result.message || '❌ Failed to add to cart. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showNotification('❌ Failed to add to cart. Please try again.');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/laptop/${productId}`);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setPriceRange([0, 100000]);
    setSortBy("featured");
    
    // Clear URL parameters
    navigate(`/shop`, { replace: true });
  };

  // Active filters count
  const activeFilterCount = [
    searchQuery.trim() !== "" ? 1 : 0,
    selectedBrands.length,
    priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0,
    sortBy !== "featured" ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="pt-20 min-h-screen bg-white font-roboto">
      {/* Notification */}
      {notification.isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-24 right-6 bg-[#8f1eae] text-white px-6 py-3 rounded shadow-lg z-50 font-medium text-sm tracking-wide uppercase font-roboto"
        >
          {notification.message}
        </motion.div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold text-gray-900 mb-4 tracking-wide uppercase font-poppins"
          >
            Shop Refurbished Laptops
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-3xl leading-relaxed text-gray-600 font-light font-roboto"
          >
            Discover certified pre-owned laptops from top brands. Each device undergoes rigorous testing 
            and comes with our quality guarantee for peace of mind.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filter Sidebar - Left */}
            <div className="lg:w-72">
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

            {/* Products Grid - Right */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 p-6 border border-gray-300 bg-white rounded-lg">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-wide uppercase font-poppins">
                    {urlCategory 
                      ? `${selectedBrands.map(b => b.charAt(0).toUpperCase() + b.slice(1)).join(', ')} Laptops`
                      : searchQuery 
                        ? `Search: "${searchQuery}"` 
                        : 'All Products'}
                  </h2>
                  <p className="text-gray-600 text-sm font-light font-roboto">
                    {loading 
                      ? "Loading products..." 
                      : error 
                      ? "Error loading products" 
                      : `Showing ${filteredProducts.length} of ${products.length} products`
                    }
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Active Filters Badge */}
                  {activeFilterCount > 0 && (
                    <div className="px-3 py-1 bg-[#F5F2FA] text-[#8f1eae] text-xs rounded-full font-medium font-roboto">
                      {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                    </div>
                  )}
                  
                  {/* Clear Filters Button */}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetAllFilters}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] font-roboto"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 100000) && (
                <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {/* Selected Brands */}
                    {selectedBrands.map(brand => (
                      <div key={brand} className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-300">
                        <span className="text-sm text-gray-700 font-light font-roboto">
                          Brand: {brand.charAt(0).toUpperCase() + brand.slice(1)}
                        </span>
                        <button
                          onClick={() => {
                            const matchingBrand = availableBrands.find(b => 
                              normalizeBrandName(b) === brand
                            );
                            if (matchingBrand) toggleBrand(matchingBrand);
                          }}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    
                    {/* Price Range */}
                    {(priceRange[0] > 0 || priceRange[1] < 100000) && (
                      <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-300">
                        <span className="text-sm text-gray-700 font-light font-roboto">
                          Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                        </span>
                        <button
                          onClick={() => setPriceRange([0, 100000])}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    {/* Sort Order */}
                    {sortBy !== "featured" && (
                      <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-300">
                        <span className="text-sm text-gray-700 font-light font-roboto">
                          Sort: {sortBy === "price-low" ? "Price: Low to High" : 
                                 sortBy === "price-high" ? "Price: High to Low" :
                                 sortBy === "name-asc" ? "Name: A to Z" : "Name: Z to A"}
                        </span>
                        <button
                          onClick={() => setSortBy("featured")}
                          className="text-gray-400 hover:text-gray-600 text-sm"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {error ? (
                <ErrorState error={error} onRetry={handleRetry} />
              ) : loading ? (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-300 p-8">
                  <div className="flex justify-center items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin"></div>
                    <span className="text-gray-600 text-sm font-light font-roboto">Loading products...</span>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-300 p-8">
                  <div className="text-4xl mb-4 text-gray-300">
                    {searchQuery ? "🔍" : "📦"}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide font-poppins">
                    {searchQuery ? 'No products found' : 'No products available'}
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm font-light font-roboto">
                    {searchQuery 
                      ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search terms or filters.`
                      : "We couldn't find any products at the moment. Please check back later."}
                  </p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetAllFilters}
                      className="bg-[#8f1eae] text-white px-6 py-3 rounded text-sm font-medium tracking-wide uppercase transition-all duration-300 border border-[#8f1eae] hover:bg-[#7a1a99] font-roboto"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      imagesLoaded={imagesLoaded}
                      handleImageLoad={handleImageLoad}
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