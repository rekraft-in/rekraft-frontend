import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus, Shield, RefreshCw, Loader2 } from "lucide-react";

export default function CartPage() {
  const { 
    cart, 
    removeFromCart, 
    updateCartItem, 
    clearCart, 
    cartLoading, 
    fetchCart, 
    user 
  } = useAuth();
  
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [localCart, setLocalCart] = useState({ items: [], totalPrice: 0 });
  const hasFetchedInitial = useRef(false);
  const isInitialMount = useRef(true);

  // Initialize local cart from context
  useEffect(() => {
    if (cart && cart.items) {
      console.log('🔄 Updating local cart from context:', cart.items.length, 'items');
      setLocalCart(cart);
    }
  }, [cart]);

  // Fetch cart only once on mount if user is logged in
  useEffect(() => {
    if (isInitialMount.current && user && !cartLoading && !hasFetchedInitial.current) {
      console.log('🔄 Initial cart fetch for user:', user.email);
      fetchCart();
      hasFetchedInitial.current = true;
      isInitialMount.current = false;
    }
  }, [user, cartLoading, fetchCart]);

  // Handle manual refresh
  const handleRefreshCart = async () => {
    setRefreshing(true);
    try {
      await fetchCart();
    } catch (error) {
      console.error('Error refreshing cart:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      // Optimistically update local state
      const updatedItems = localCart.items.map(item => {
        if (item._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
      setLocalCart({
        items: updatedItems,
        totalPrice: newTotal
      });
      
      // Update on server
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Revert by fetching fresh data
      await fetchCart();
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Optimistically update local state
      const updatedItems = localCart.items.filter(item => item._id !== itemId);
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.quantity * (item.price || 0)), 0);
      setLocalCart({
        items: updatedItems,
        totalPrice: newTotal
      });
      
      // Remove from server
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Revert by fetching fresh data
      await fetchCart();
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setClearing(true);
      try {
        // Immediately clear local state for instant feedback
        setLocalCart({ items: [], totalPrice: 0 });
        
        // Call clear cart API
        const result = await clearCart();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to clear cart');
        }
        
        console.log('✅ Cart cleared successfully');
      } catch (error) {
        console.error('Error clearing cart:', error);
        // On error, fetch the current state from server
        await fetchCart();
        alert('Failed to clear cart. Please try again.');
      } finally {
        setClearing(false);
      }
    }
  };

  // Calculate totals from local cart
  const total = localCart?.totalPrice || 0;
  const itemCount = localCart?.items?.reduce((count, item) => count + (item.quantity || 0), 0) || 0;
  const shipping = total > 50000 ? 0 : 199;
  const finalTotal = total + shipping;

  // Show loading state only on initial load
  if (cartLoading && localCart.items.length === 0 && !hasFetchedInitial.current) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center font-lato">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#8f1eae] animate-spin mx-auto" />
          <p className="text-gray-600 mt-4 font-light">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // Show clearing state
  if (clearing) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center font-lato">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#8f1eae] animate-spin mx-auto" />
          <p className="text-gray-600 mt-4 font-light">Clearing your cart...</p>
        </div>
      </div>
    );
  }

  // Check if user is not logged in
  if (!user) {
    return (
      <div className="pt-20 min-h-screen bg-white font-lato font-light">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-[#8f1eae]" />
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">Please Login</h2>
            <p className="text-gray-600 text-base mb-8 max-w-md mx-auto font-lato font-light">
              You need to be logged in to view your cart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="bg-[#8f1eae] text-white px-8 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide inline-flex items-center justify-center gap-2"
              >
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/shop" 
                className="border border-gray-300 text-gray-700 px-8 py-3 font-inter font-medium hover:border-[#8f1eae] hover:text-[#8f1eae] transition-all duration-300 rounded-[4px] uppercase text-sm tracking-wide inline-flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white font-lato font-light">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header with refresh button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight font-montserrat">Your Shopping Cart</h1>
            <p className="text-gray-600 text-base font-lato font-light">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          
          <button
            onClick={handleRefreshCart}
            disabled={refreshing || cartLoading}
            className="flex items-center gap-2 text-[#8f1eae] hover:text-[#7a1a99] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-inter font-medium text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing || cartLoading ? 'animate-spin' : ''}`} />
            {refreshing || cartLoading ? 'Refreshing...' : 'Refresh Cart'}
          </button>
        </div>
        
        {localCart.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-[#8f1eae]" />
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">Your cart is empty</h2>
            <p className="text-gray-600 text-base mb-8 max-w-md mx-auto font-lato font-light">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/shop" 
                className="bg-[#8f1eae] text-white px-8 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide inline-flex items-center justify-center gap-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleRefreshCart}
                disabled={refreshing}
                className="border border-gray-300 text-gray-700 px-8 py-3 font-inter font-medium hover:border-[#8f1eae] hover:text-[#8f1eae] transition-all duration-300 rounded-[4px] uppercase text-sm tracking-wide inline-flex items-center justify-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh Cart'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {localCart.items.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-[4px] flex items-center justify-center shrink-0 border border-gray-200">
                    <img
                      src={item.productId?.images?.[0] || item.productId?.image || '/placeholder-image.jpg'}
                      alt={item.productId?.name || 'Product'}
                      className="max-w-full max-h-full object-contain p-2"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
                      <h3 className="text-xl font-medium text-gray-900 pr-4 tracking-wide font-inter break-words">
                        {item.productId?.name || 'Unknown Product'}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        disabled={updating}
                        className="text-gray-600 hover:text-red-600 font-inter font-medium text-sm transition-colors duration-300 flex items-center gap-1 uppercase tracking-wide whitespace-nowrap disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                    
                    <p className="text-2xl font-medium text-[#8f1eae] mb-6 font-inter">
                      ₹{(item.price || 0).toLocaleString()}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-[4px] border border-gray-300"
                          disabled={item.quantity <= 1 || updating}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 h-10 flex items-center justify-center border-t border-b border-gray-300 font-inter font-medium text-gray-900 text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-[4px] border border-gray-300"
                          disabled={updating}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1 font-lato font-light">Item Total</p>
                        <p className="text-lg font-inter font-medium text-gray-900">
                          ₹{((item.quantity || 0) * (item.price || 0)).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white border border-gray-200 p-6 rounded-[4px] sticky top-32"
              >
                <h2 className="text-xl font-medium text-gray-900 mb-6 tracking-wide uppercase font-inter">Order Summary</h2>
                
                {/* Pricing Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 font-lato font-light">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 font-lato font-light">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-inter font-medium" : ""}>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  
                  {shipping > 0 && total > 0 && (
                    <div className="bg-[#F5F2FA] border border-[#8f1eae] rounded-[4px] p-3">
                      <p className="text-[#8f1eae] text-sm text-center font-lato font-light">
                        Add ₹{(50000 - total).toLocaleString()} more for free shipping!
                      </p>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-inter font-medium text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    className="w-full bg-[#8f1eae] text-white py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <button
                    onClick={handleClearCart}
                    disabled={localCart.items.length === 0}
                    className="w-full border border-gray-300 text-gray-700 py-3 font-inter font-medium hover:bg-gray-50 hover:text-red-600 hover:border-red-600 transition-all duration-300 rounded-[4px] uppercase text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </button>

                  <Link
                    to="/shop"
                    className="w-full border border-gray-300 text-gray-700 py-3 font-inter font-medium hover:border-[#8f1eae] hover:text-[#8f1eae] transition-all duration-300 rounded-[4px] uppercase text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    <span>Continue Shopping</span>
                  </Link>
                </div>

                {/* Security & Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 font-lato font-light">
                      <Shield className="w-4 h-4" />
                      <span>Secure checkout · 100% protected</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 font-lato font-light">
                      <span className="px-2 py-1 bg-gray-50 rounded-[4px]">7-Day Returns</span>
                      <span className="px-2 py-1 bg-gray-50 rounded-[4px]">1-Year Warranty</span>
                      <span className="px-2 py-1 bg-gray-50 rounded-[4px]">Free Support</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}