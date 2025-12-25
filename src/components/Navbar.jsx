import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from '../context/AuthContext';
import { Search, ShoppingBag, User, X } from "lucide-react";
import apiService from '../services/api';

// Simplified debounce hook
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

// Simplified search suggestions
const SearchSuggestions = ({ 
  suggestions, 
  onSuggestionClick, 
  isLoading,
  query
}) => {
  if (suggestions.length === 0 && !isLoading && query) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-100 shadow-sm z-50 overflow-hidden">
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">
            No results for "{query}"
          </p>
        </div>
      </div>
    );
  }

  if (suggestions.length === 0 && !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-100 shadow-sm z-50 max-h-80 overflow-hidden"
    >
      {isLoading ? (
        <div className="p-4 text-center">
          <div className="inline-block w-4 h-4 border-2 border-gray-200 border-t-[#8f1eae] rounded-full animate-spin"></div>
          <span className="ml-2 text-sm text-gray-500">Loading...</span>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-80">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion.text || suggestion.name)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0 flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-sm text-gray-700 font-normal block truncate">
                  {suggestion.text || suggestion.name}
                </span>
                {suggestion.subtitle && (
                  <span className="text-xs text-gray-500 font-light block truncate">
                    {suggestion.subtitle}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function Navbar({ cartItemsCount = 0 }) {
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
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch search suggestions
  const fetchSearchSuggestions = useCallback(async (query) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    
    try {
      const productsData = await apiService.getProducts();
      const products = Array.isArray(productsData) ? productsData : 
                       productsData?.data || productsData?.products || [];
      
      if (!Array.isArray(products) || products.length === 0) {
        setSuggestions([]);
        return;
      }
      
      const queryLower = query.toLowerCase().trim();
      
      // Filter products by name, brand, or category
      const productSuggestions = products
        .filter(product => 
          product.name?.toLowerCase().includes(queryLower) ||
          product.brand?.toLowerCase().includes(queryLower) ||
          product.category?.toLowerCase().includes(queryLower)
        )
        .slice(0, 5)
        .map(product => ({
          text: product.name,
          subtitle: `${product.brand} • ₹${product.price}`,
          type: 'products'
        }));
      
      // Add brand suggestions
      const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
      const brandSuggestions = brands
        .filter(brand => brand.toLowerCase().includes(queryLower))
        .slice(0, 3)
        .map(brand => ({
          text: brand,
          type: 'brands'
        }));
      
      setSuggestions([...productSuggestions, ...brandSuggestions]);
      
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Effect to fetch suggestions when query changes
  useEffect(() => {
    if (debouncedSearchQuery && showSuggestions) {
      fetchSearchSuggestions(debouncedSearchQuery);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery, showSuggestions, fetchSearchSuggestions]);

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) return;
    
    navigate(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
    setShowSuggestions(false);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/shop?search=${encodeURIComponent(suggestion.trim())}`);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    
    if (location.pathname === '/shop') {
      navigate('/shop');
    }
    
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
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
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim() && e.target.value.length >= 2) {
                          setShowSuggestions(true);
                        } else {
                          setShowSuggestions(false);
                        }
                      }}
                      onKeyDown={handleKeyDown}
                      onFocus={() => {
                        if (searchQuery.trim() && searchQuery.length >= 2) {
                          setShowSuggestions(true);
                        }
                      }}
                      placeholder="Search laptops, brands, specs..."
                      className="w-full pl-12 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:bg-gray-50 text-gray-700 placeholder-gray-400 font-normal bg-gray-50/50 hover:bg-gray-50 transition-all duration-200"
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </form>
                
                <AnimatePresence>
                  {showSuggestions && (
                    <SearchSuggestions
                      suggestions={suggestions}
                      onSuggestionClick={handleSuggestionClick}
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
              <button
                className="lg:hidden text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2"
                onClick={() => searchInputRef.current?.focus()}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account Icon */}
              <Link 
                to={user ? "/account" : "/login"}
                className="text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2 flex items-center justify-center"
                aria-label={user ? "My Account" : "Login"}
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 p-2 flex items-center justify-center"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#8f1eae] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium border border-white">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex flex-col gap-1 w-6 h-6 relative"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <span
                  className={`w-full h-0.5 bg-gray-600 rounded-full origin-center transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gray-600 rounded-full origin-center transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-4" ref={searchContainerRef}>
            <div className="relative">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value.trim() && e.target.value.length >= 2) {
                        setShowSuggestions(true);
                      } else {
                        setShowSuggestions(false);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search laptops, brands, specs..."
                    className="w-full pl-12 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-300 focus:bg-gray-50 text-gray-700 placeholder-gray-400 font-normal bg-gray-50/50 hover:bg-gray-50 transition-all duration-200"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
              
              <AnimatePresence>
                {showSuggestions && (
                  <SearchSuggestions
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
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
            <div
              className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
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
                      />
                      <span className="font-poppins font-semibold text-lg text-gray-900 hidden ml-2">Rekraft</span>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* User Info */}
                {user && (
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <p className="font-medium text-gray-900 text-sm font-poppins">Welcome back</p>
                    <p className="text-xs text-gray-600 font-light mt-1">{user.email}</p>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="flex-1 px-4 py-6 overflow-y-auto">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
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
                      </Link>
                    ))}
                    
                    {/* Auth Links */}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      {user ? (
                        <Link
                          to="/account"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-between px-4 py-3 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                        >
                          <span className="font-medium uppercase tracking-wider text-sm font-poppins">My Account</span>
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 mb-1"
                          >
                            <span className="font-medium uppercase tracking-wider text-sm font-poppins">Login</span>
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-between px-4 py-3 rounded text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                          >
                            <span className="font-medium uppercase tracking-wider text-sm font-poppins">Register</span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cart Button */}
                <div className="px-6 py-4 border-t border-gray-200 bg-white">
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-[#8f1eae] text-white py-3 rounded font-medium uppercase tracking-wider hover:bg-[#7a1a99] transition-all duration-300 flex items-center justify-center gap-3"
                    aria-label={`View cart with ${cartItemsCount} items`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm font-poppins">VIEW CART</span>
                    {cartItemsCount > 0 && (
                      <span className="bg-white text-[#8f1eae] px-2 py-0.5 rounded-full text-xs font-medium min-w-6">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}