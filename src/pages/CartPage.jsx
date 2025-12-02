import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus, Shield } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem, clearCart } = useAuth();
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Calculate totals from database cart
  const total = cart?.totalPrice || 0;
  const itemCount = cart?.items?.reduce((count, item) => count + item.quantity, 0) || 0;
  const shipping = total > 50000 ? 0 : 199;
  const finalTotal = total + shipping;

  if (!cart) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center font-lato">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-[#8f1eae] rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 mt-4 font-light">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white font-lato font-light">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">Your Shopping Cart</h1>
          <p className="text-gray-600 text-base font-lato font-light">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        
        {cart.items.length === 0 ? (
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
            <Link 
              to="/shop" 
              className="bg-[#8f1eae] text-white px-8 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide inline-flex items-center gap-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-6 bg-white border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-gray-50 rounded-[4px] flex items-center justify-center shrink-0 border border-gray-200">
                    <img
                      src={item.productId?.images?.[0] || item.productId?.image || '/placeholder-image.jpg'}
                      alt={item.productId?.name}
                      className="w-24 h-24 object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-medium text-gray-900 pr-4 tracking-wide font-inter">{item.productId?.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-gray-600 hover:text-red-600 font-inter font-medium text-sm transition-colors duration-300 flex items-center gap-1 uppercase tracking-wide"
                        disabled={updating}
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                    
                    <p className="text-2xl font-medium text-[#8f1eae] mb-6 font-inter">₹{item.price?.toLocaleString()}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
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
                          ₹{(item.quantity * item.price).toLocaleString()}
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
                  
                  {shipping > 0 && (
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
                    className="w-full border border-gray-300 text-gray-700 py-3 font-inter font-medium hover:bg-gray-50 hover:text-red-600 hover:border-red-600 transition-all duration-300 rounded-[4px] uppercase text-sm tracking-wide flex items-center justify-center gap-2"
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