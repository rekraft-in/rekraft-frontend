import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from '../context/AuthContext';
import { Search, X, ShoppingBag, User, Menu, ChevronRight } from "lucide-react";
import apiService from '../services/api';

// Debounce hook for search
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
};

const EscapeHandler = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  return null;
};

// Helper function for fuzzy matching
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
};

// Helper function for typo tolerance (simple version)
const getTypoTolerantQuery = (query) => {
  const commonTypos = {
    'lenevo': 'lenovo',
    'leneovo': 'lenovo',
    'delll': 'dell',
    'hp pavillion': 'hp pavilion',
    'assus': 'asus',
    'macbok': 'macbook',
    'mackbook': 'macbook',
    'thinkpad': 'thinkpad',
    'think pad': 'thinkpad',
    'i-5': 'i5',
    'i 5': 'i5',
    'i-7': 'i7',
    'i 7': 'i7',
    'ryzen5': 'ryzen 5',
    'ryzen7': 'ryzen 7',
    '8 gb': '8gb',
    '16 gb': '16gb',
    '256 gb': '256gb',
    '512 gb': '512gb',
    '1 tb': '1tb'
  };
  
  const normalized = normalizeText(query);
  return commonTypos[normalized] || normalized;
};

// Helper function to calculate similarity score (for fuzzy matching)
const calculateSimilarity = (str1, str2) => {
  const s1 = normalizeText(str1);
  const s2 = normalizeText(str2);
  
  if (s1.includes(s2) || s2.includes(s1)) return 1;
  
  // Simple Levenshtein distance approximation
  if (s1.length === 0 || s2.length === 0) return 0;
  
  let matches = 0;
  for (let i = 0; i < Math.min(s1.length, s2.length); i++) {
    if (s1[i] === s2[i]) matches++;
  }
  
  return matches / Math.max(s1.length, s2.length);
};

// Search Suggestions Component with grouped results
const SearchSuggestions = ({ 
  suggestions, 
  onSuggestionClick, 
  onClose, 
  isLoading,
  query
}) => {
  if (suggestions.length === 0 && !isLoading && query) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 overflow-hidden"
      >
        <div className="p-4 text-center">
          <p className="text-sm font-light text-gray-600 mb-2">
            No results for "{query}"
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Did you mean:</p>
            <p className="font-medium">• Try "MacBook" instead of "macbok"</p>
            <p className="font-medium">• Try "i5" instead of "i-5"</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (suggestions.length === 0 && !isLoading) return null;

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    const type = suggestion.type || 'products';
    if (!acc[type]) acc[type] = [];
    acc[type].push(suggestion);
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg z-50 max-h-96 overflow-hidden"
    >
      {isLoading ? (
        <div className="p-4 text-center">
          <div className="inline-block w-5 h-5 border-2 border-gray-200 border-t-[#8f1eae] rounded-full animate-spin"></div>
          <span className="ml-2 text-sm font-light text-gray-600">Loading suggestions...</span>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-96">
          {Object.entries(groupedSuggestions).map(([type, items]) => (
            <div key={type} className="border-b border-gray-100 last:border-b-0">
              <div className="px-4 py-2 bg-gray-50">
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wider font-inter">
                  {type === 'products' ? 'Products' : 
                   type === 'brands' ? 'Brands' : 
                   type === 'categories' ? 'Categories' : 
                   type.charAt(0).toUpperCase() + type.slice(1)}
                </p>
              </div>
              <div>
                {items.map((suggestion, index) => (
                  <button
                    key={`${type}-${index}`}
                    onClick={() => onSuggestionClick(suggestion.text || suggestion.name)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-gray-400" />
                      <div>
                        <span className="text-sm text-gray-900 font-normal font-roboto block">
                          {suggestion.text || suggestion.name}
                        </span>
                        {suggestion.subtitle && (
                          <span className="text-xs text-gray-500 font-light font-roboto">
                            {suggestion.subtitle}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {/* Quick tips section */}
          {query && query.length >= 2 && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Search tips:</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-white border border-gray-300 rounded text-gray-600">
                  Try {query} 8GB
                </span>
                <span className="text-xs px-2 py-1 bg-white border border-gray-300 rounded text-gray-600">
                  {query} i5
                </span>
                <span className="text-xs px-2 py-1 bg-white border border-gray-300 rounded text-gray-600">
                  {query} 256GB
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default function Navbar({ cartItemsCount }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  
  // Keyboard navigation for suggestions
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced search suggestion generation
  const generateSearchSuggestions = useCallback(async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    
    try {
      // Fetch products
      const productsData = await apiService.getProducts();
      const products = Array.isArray(productsData) ? productsData : 
                       productsData?.data || productsData?.products || [];
      
      if (!Array.isArray(products) || products.length === 0) {
        setSuggestions([]);
        return;
      }
      
      const queryLower = normalizeText(query);
      const typoTolerantQuery = getTypoTolerantQuery(query);
      
      // Prepare all searchable data
      const allData = [];
      
      // Add products with their searchable fields
      products.forEach(product => {
        if (product.name) {
          allData.push({
            text: product.name,
            type: 'products',
            searchable: normalizeText(product.name + ' ' + product.brand + ' ' + (product.category || '') + ' ' + (product.specs?.join(' ') || '')),
            subtitle: `${product.brand} • ₹${product.price}`
          });
        }
      });
      
      // Extract unique brands
      const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
      brands.forEach(brand => {
        allData.push({
          text: brand,
          type: 'brands',
          searchable: normalizeText(brand)
        });
      });
      
      // Extract unique categories
      const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
      categories.forEach(category => {
        allData.push({
          text: category,
          type: 'categories',
          searchable: normalizeText(category)
        });
      });
      
      // Add common specifications as suggestions
      const commonSpecs = [
        { text: '8GB RAM Laptops', type: 'specs', searchable: '8gb ram' },
        { text: '16GB RAM Laptops', type: 'specs', searchable: '16gb ram' },
        { text: '256GB SSD Laptops', type: 'specs', searchable: '256gb ssd' },
        { text: '512GB SSD Laptops', type: 'specs', searchable: '512gb ssd' },
        { text: '1TB SSD Laptops', type: 'specs', searchable: '1tb ssd' },
        { text: 'Touchscreen Laptops', type: 'specs', searchable: 'touchscreen' },
        { text: '2-in-1 Laptops', type: 'specs', searchable: '2 in 1 convertible' },
        { text: 'Gaming Laptops', type: 'specs', searchable: 'gaming' }
      ];
      
      commonSpecs.forEach(spec => {
        allData.push(spec);
      });
      
      // Add processor suggestions
      const processors = [
        { text: 'i3 Laptops', searchable: 'i3' },
        { text: 'i5 Laptops', searchable: 'i5' },
        { text: 'i7 Laptops', searchable: 'i7' },
        { text: 'i9 Laptops', searchable: 'i9' },
        { text: 'Ryzen 3 Laptops', searchable: 'ryzen 3' },
        { text: 'Ryzen 5 Laptops', searchable: 'ryzen 5' },
        { text: 'Ryzen 7 Laptops', searchable: 'ryzen 7' },
        { text: 'M1 Laptops', searchable: 'm1' },
        { text: 'M2 Laptops', searchable: 'm2' },
        { text: 'M3 Laptops', searchable: 'm3' }
      ];
      
      processors.forEach(proc => {
        allData.push({
          text: proc.text,
          type: 'processors',
          searchable: normalizeText(proc.searchable)
        });
      });
      
      // Score and filter suggestions
      const scoredSuggestions = allData.map(item => {
        let score = 0;
        
        // Check if searchable text contains query (partial match)
        if (item.searchable.includes(queryLower)) {
          score += 100;
        }
        
        // Check typo-tolerant query
        if (item.searchable.includes(typoTolerantQuery) && typoTolerantQuery !== queryLower) {
          score += 80;
        }
        
        // Check for multi-word matches (words in any order)
        const queryWords = queryLower.split(' ').filter(word => word.length >= 2);
        const searchableWords = item.searchable.split(' ');
        
        queryWords.forEach(queryWord => {
          searchableWords.forEach(searchableWord => {
            if (searchableWord.includes(queryWord)) {
              score += 30;
            }
          });
        });
        
        // Fuzzy matching for typos
        if (calculateSimilarity(item.searchable, queryLower) > 0.7) {
          score += 50;
        }
        
        // Exact brand match gets higher score
        if (item.type === 'brands' && normalizeText(item.text) === queryLower) {
          score += 150;
        }
        
        // Exact product name match gets highest score
        if (item.type === 'products') {
          const productNameWords = normalizeText(item.text).split(' ');
          const hasAllQueryWords = queryWords.every(qw => 
            productNameWords.some(pw => pw.includes(qw))
          );
          if (hasAllQueryWords) {
            score += 200;
          }
        }
        
        return { ...item, score };
      });
      
      // Filter and sort suggestions
      const filteredSuggestions = scoredSuggestions
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      
      setSuggestions(filteredSuggestions);
      
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Effect to generate suggestions when query changes
  useEffect(() => {
    if (debouncedSearchQuery && showSuggestions) {
      generateSearchSuggestions(debouncedSearchQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery, showSuggestions, generateSearchSuggestions]);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedSuggestionIndex(-1);
    
    if (value.trim() && value.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    
    // Navigate to shop with search query
    navigate(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
    
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // Blur input on submit
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // Navigate to shop with the selected suggestion
    navigate(`/shop?search=${encodeURIComponent(suggestion.trim())}`);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    if (location.pathname === '/shop') {
      navigate('/shop');
    }
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Enhanced keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
          // Use the selected suggestion
          handleSuggestionClick(suggestions[selectedSuggestionIndex].text || suggestions[selectedSuggestionIndex].name);
        } else {
          // Submit the current query
          handleSearchSubmit();
        }
        break;
        
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        if (searchInputRef.current) {
          searchInputRef.current.blur();
        }
        break;
        
      case 'ArrowDown':
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestionIndex(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (showSuggestions && suggestions.length > 0) {
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
        }
        break;
        
      default:
        break;
    }
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (searchQuery.trim() && searchQuery.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/sell", label: "Sell" },
  ];

  const isActivePath = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white border-b border-gray-100 shadow-sm h-16' 
            : 'bg-white border-b border-gray-100 h-20'
        }`}
      >
        <div className="w-full px-4 md:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* Left Section - Logo and Navigation */}
            <div className="flex items-center gap-8 md:gap-12">
              {/* Logo */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center h-full"
              >
                <Link to="/" className="flex items-center">
                  <img 
                    src="/images/logo.png"
                    alt="Rekraft" 
                    className={`transition-all duration-300 ${
                      isScrolled ? "h-6" : "h-8"
                    } w-auto object-contain`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="font-poppins font-semibold text-xl text-gray-900 hidden">Rekraft</span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                  >
                    <motion.span
                      className={`text-sm font-medium transition-all duration-300 uppercase tracking-wider font-poppins ${
                        isActivePath(item.path)
                          ? 'text-[#8f1eae]'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      whileHover={{ y: -1 }}
                    >
                      {item.label}
                    </motion.span>
                    
                    <AnimatePresence>
                      {isActivePath(item.path) && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          exit={{ scaleX: 0 }}
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#8f1eae] origin-left"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-300 group-hover:w-full transition-all duration-300 origin-left" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Middle Section - Search Bar (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-xl mx-8">
              <div ref={searchContainerRef} className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                      onFocus={handleSearchFocus}
                      placeholder="Search laptops, brands, specs (e.g., dell i5 8gb, lenovo thinkpad)..."
                      className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#8f1eae] focus:ring-2 focus:ring-[#8f1eae] focus:ring-opacity-20 text-gray-900 placeholder-gray-500 font-normal font-roboto bg-white shadow-sm"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    
                    {/* Clear Button */}
                    {searchQuery && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </form>
                
                {/* Search Suggestions */}
                <AnimatePresence>
                  {showSuggestions && (
                    <SearchSuggestions
                      suggestions={suggestions}
                      onSuggestionClick={handleSuggestionClick}
                      onClose={() => {
                        setShowSuggestions(false);
                        setSelectedSuggestionIndex(-1);
                      }}
                      isLoading={isLoadingSuggestions}
                      query={searchQuery}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Mobile Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2"
                onClick={() => {
                  if (searchInputRef.current) {
                    searchInputRef.current.focus();
                  }
                }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {/* User Account Icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {user ? (
                  <Link 
                    to="/account"
                    className="text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2 flex items-center justify-center"
                    aria-label="My Account"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link 
                    to="/login"
                    className="text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2 flex items-center justify-center"
                    aria-label="Login"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                )}
              </motion.div>

              {/* Cart Icon */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cart"
                  className="relative text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2 flex items-center justify-center"
                  aria-label={`Shopping cart with ${cartItemsCount} items`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#8f1eae] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium font-roboto border border-white"
                    >
                      {cartItemsCount > 99 ? '99+' : cartItemsCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex flex-col gap-1 w-6 h-6 relative"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <motion.span
                  animate={{ 
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0
                  }}
                  className="w-full h-0.5 bg-gray-600 rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  className="w-full h-0.5 bg-gray-600 rounded-full"
                />
                <motion.span
                  animate={{ 
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0
                  }}
                  className="w-full h-0.5 bg-gray-600 rounded-full origin-center"
                />
              </motion.button>
            </div>
          </div>

          {/* Mobile Search Bar (Below navbar on mobile) */}
          <div className="lg:hidden mt-4" ref={searchContainerRef}>
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleSearchFocus}
                    placeholder="Search laptops, brands, specs..."
                    className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#8f1eae] focus:ring-2 focus:ring-[#8f1eae] focus:ring-opacity-20 text-gray-900 placeholder-gray-500 font-normal font-roboto bg-white shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  
                  {/* Clear Button */}
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </form>
              
              {/* Search Suggestions for Mobile */}
              <AnimatePresence>
                {showSuggestions && (
                  <SearchSuggestions
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                    onClose={() => {
                      setShowSuggestions(false);
                      setSelectedSuggestionIndex(-1);
                    }}
                    isLoading={isLoadingSuggestions}
                    query={searchQuery}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 w-full max-w-sm h-full bg-white border-l border-gray-200 z-50"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img 
                        src="/images/logo.png"
                        alt="Rekraft" 
                        className="h-6 w-auto object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="font-poppins font-semibold text-lg text-gray-900 hidden ml-2">Rekraft</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>
                </div>

                {/* User Info */}
                {user && (
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="px-6 py-4 border-b border-gray-200 bg-gray-50"
                  >
                    <p className="font-medium text-gray-900 text-sm font-poppins">Welcome back</p>
                    <p className="text-xs text-gray-600 font-light font-roboto mt-1">{user.email}</p>
                  </motion.div>
                )}

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 overflow-y-auto">
                  <div className="space-y-1">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-4 py-3 rounded transition-all duration-300 font-poppins ${
                            isActivePath(item.path)
                              ? 'bg-[#F5F2FA] text-[#8f1eae]'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <span className="font-medium uppercase tracking-wider text-sm">
                            {item.label}
                          </span>
                          <ChevronRight className={`w-4 h-4 transition-transform ${
                            isActivePath(item.path) ? 'text-[#8f1eae]' : 'text-gray-400'
                          }`} />
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Auth Links */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navItems.length * 0.05 }}
                      className="pt-4 mt-4 border-t border-gray-200"
                    >
                      {user ? (
                        <Link
                          to="/account"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                          <span className="font-medium uppercase tracking-wider text-sm font-poppins">My Account</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 mb-1"
                          >
                            <span className="font-medium uppercase tracking-wider text-sm font-poppins">Login</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                          >
                            <span className="font-medium uppercase tracking-wider text-sm font-poppins">Register</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </Link>
                        </>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Cart Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-6 py-4 border-t border-gray-200 bg-white"
                >
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#8f1eae] text-white py-3 rounded font-medium uppercase tracking-wider hover:bg-[#7a1a99] transition-all duration-300 flex items-center justify-center gap-3"
                    aria-label={`View cart with ${cartItemsCount} items`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm font-poppins">VIEW CART</span>
                    {cartItemsCount > 0 && (
                      <span className="bg-white text-[#8f1eae] px-2 py-0.5 rounded-full text-xs font-medium font-roboto min-w-6">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <EscapeHandler 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}