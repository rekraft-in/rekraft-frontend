import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useAuth } from '../context/AuthContext';
import { Search, X, ShoppingBag, User, Menu, ChevronRight } from "lucide-react";

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

// Search Suggestions Component
const SearchSuggestions = ({ 
  suggestions, 
  onSuggestionClick, 
  onClose, 
  isLoading 
}) => {
  if (suggestions.length === 0 && !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 z-50 overflow-hidden"
    >
      {isLoading ? (
        <div className="p-4 text-center">
          <div className="inline-block w-5 h-5 border-2 border-gray-200 border-t-[#8f1eae] rounded-full animate-spin"></div>
          <span className="ml-2 text-sm font-light text-gray-600">Loading suggestions...</span>
        </div>
      ) : (
        <>
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-normal text-gray-600 uppercase tracking-wider font-inter">
              Search Suggestions
            </p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900 font-light font-roboto">{suggestion}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
          </div>
        </>
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
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (response.ok) {
        const products = await response.json();
        
        // Generate suggestions based on query
        const generatedSuggestions = [];
        const queryLower = query.toLowerCase();
        
        // Add product names
        products.forEach(product => {
          if (product.name.toLowerCase().includes(queryLower)) {
            generatedSuggestions.push(product.name);
          }
        });
        
        // Add brands
        const brands = [...new Set(products.map(p => p.brand))];
        brands.forEach(brand => {
          if (brand.toLowerCase().includes(queryLower)) {
            generatedSuggestions.push(`${brand} Laptops`);
          }
        });
        
        // Add processor suggestions
        const processors = ['i3', 'i5', 'i7', 'i9', 'Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'M1', 'M2', 'M3'];
        processors.forEach(processor => {
          if (processor.toLowerCase().includes(queryLower)) {
            generatedSuggestions.push(`Laptops with ${processor}`);
          }
        });
        
        // Add RAM suggestions
        const rams = ['8GB RAM', '16GB RAM', '32GB RAM'];
        rams.forEach(ram => {
          if (ram.toLowerCase().includes(queryLower)) {
            generatedSuggestions.push(`${ram} Laptops`);
          }
        });
        
        // Remove duplicates and limit to 8 suggestions
        const uniqueSuggestions = [...new Set(generatedSuggestions)].slice(0, 8);
        setSuggestions(uniqueSuggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    if (location.pathname === '/shop') {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    
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

  // Handle key events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
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
                      onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                      placeholder="Search laptops, brands, specs..."
                      className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] focus:ring-1 focus:ring-[#8f1eae] text-gray-900 placeholder-gray-500 font-light font-roboto bg-white"
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
                      onClose={() => setShowSuggestions(false)}
                      isLoading={isLoadingSuggestions}
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
                    onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                    placeholder="Search laptops, brands, specs..."
                    className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#8f1eae] focus:ring-1 focus:ring-[#8f1eae] text-gray-900 placeholder-gray-500 font-light font-roboto bg-white"
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
                    onClose={() => setShowSuggestions(false)}
                    isLoading={isLoadingSuggestions}
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