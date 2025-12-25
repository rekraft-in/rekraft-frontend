// Add import at the top:
import apiService from '../services/api';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, Package, CreditCard, CheckCircle,
  Plus, Minus, Trash2, ArrowLeft, Mail,
  Phone, MapPin, Calendar, CreditCard as CardIcon,
  Smartphone, Wallet, Truck, FileText
} from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, clearCart, createOrder } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingData, setShippingData] = useState(null);
  const [orderData, setOrderData] = useState(null);

  // Load Razorpay script when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const cartItems = cart?.items || [];
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    if (item && item.price && item.quantity) {
      return total + (item.price * item.quantity);
    }
    return total;
  }, 0);

  const shipping = subtotal > 50000 ? 0 : 99;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: 'Cart Review', active: currentStep === 1, icon: ShoppingCart },
    { number: 2, title: 'Shipping', active: currentStep === 2, icon: Truck },
    { number: 3, title: 'Payment', active: currentStep === 3, icon: CreditCard },
    { number: 4, title: 'Confirmation', active: currentStep === 4, icon: CheckCircle }
  ];

  const handleProceedToShipping = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setCurrentStep(2);
  };

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setCurrentStep(3);
  };

  const handlePlaceOrder = async (paymentMethod) => {
    setIsProcessing(true);
    
    try {
      if (!shippingData) {
        throw new Error('Please complete shipping information first');
      }

      const orderData = {
        shippingAddress: shippingData,
        paymentMethod: paymentMethod,
        items: cartItems.map(item => {
          const productData = item.productId || item;
          return {
            product: productData._id || productData.productId,
            name: productData.name,
            price: productData.price,
            quantity: item.quantity,
            image: productData.image,
            brand: productData.brand,
            condition: productData.condition
          };
        }),
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
      };

      console.log('🛒 Creating order with data:', orderData);
      const result = await createOrder(orderData);
      
      if (!result.success) {
        throw new Error(result.message || 'Order creation failed');
      }

      const createdOrder = result.data;
      console.log('✅ Order created:', createdOrder);

      if (paymentMethod === 'cod') {
        await completeOrder(createdOrder._id);
      } else if (paymentMethod === 'card' || paymentMethod === 'upi') {
        await handleOnlinePayment(createdOrder, total);
      }

    } catch (error) {
      console.error('Order error:', error);
      alert(`Order failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOnlinePayment = async (order, amount) => {
    try {
      const token = localStorage.getItem('token');
      const amountInPaise = Math.round(amount * 100);

      // AFTER:
      const paymentData = await apiService.createPaymentOrder({
        amount: amountInPaise,
        orderId: order._id
      });

      if (!window.Razorpay) {
        throw new Error('Razorpay payment gateway is still loading. Please try again in a moment.');
      }

      const options = {
        key: 'rzp_test_Rj4p2i08W5GOfb',
        amount: amountInPaise,
        currency: "INR",
        name: "Rekraft",
        description: "Order Payment",
        order_id: paymentData.data.id,
        handler: async function (response) {
          // AFTER:
          const verification = await apiService.verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: order._id
          });

          if (verification.success) {
            await completeOrder(order._id);
          } else {
            alert('Payment verification failed: ' + (verification.error || 'Unknown error'));
          }
        },
        prefill: {
          name: `${shippingData.firstName} ${shippingData.lastName}`,
          email: shippingData.email,
          contact: shippingData.phone
        },
        theme: {
          color: "#8f1eae"
        },
        modal: {
          ondismiss: function() {
            alert('Payment was cancelled. You can try again.');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.message}`);
    }
  };

  const completeOrder = async (orderId) => {
    try {
      // AFTER:
      const orderComplete = await apiService.completeOrder(orderId);

      if (orderComplete.success) {
        await clearCart();
        
        // AFTER:
        const orderDetails = await apiService.getOrder(orderId);
        
        if (orderDetails.success) {
          setOrderData(orderDetails.data);
          setCurrentStep(4);
        }
      }
    } catch (error) {
      console.error('Order completion error:', error);
      alert('Failed to complete order. Please contact support.');
    }
  };

  if (cartItems.length === 0 && currentStep === 1) {
    return (
      <div className="pt-20 min-h-screen bg-white font-lato">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="w-32 h-32 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-200">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed font-light">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <div className="space-y-4 pt-6">
              <button
                onClick={() => navigate('/shop')}
                className="bg-[#8f1eae] text-white px-10 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide"
              >
                Start Shopping
              </button>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white font-lato">
      {/* Progress Steps */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">
              Checkout
            </h1>
            <p className="text-gray-600 font-light text-sm">
              Complete your purchase in a few simple steps
            </p>
          </div>
          
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-[4px] flex items-center justify-center font-inter font-medium transition-all duration-300 ${
                    step.active 
                      ? 'bg-[#8f1eae] border-[#8f1eae] text-white' 
                      : step.number < currentStep
                      ? 'bg-black border-black text-white'
                      : 'border border-gray-300 text-gray-500 bg-white'
                  }`}>
                    {step.number < currentStep ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`mt-3 font-inter font-medium text-xs tracking-wide uppercase ${
                    step.active ? 'text-[#8f1eae]' : 
                    step.number < currentStep ? 'text-black' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.number < currentStep ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Checkout Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {currentStep === 4 ? (
            <div className="max-w-4xl mx-auto">
              <OrderConfirmation 
                orderData={orderData}
                onContinueShopping={() => navigate('/shop')}
                onViewOrder={() => navigate('/orders')}
              />
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-8">
                {/* Step 1: Cart Review */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    <div className="bg-white border border-gray-200 rounded-[4px] p-8">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-light text-gray-900 tracking-tight font-montserrat">
                          Shopping Cart
                        </h2>
                        <span className="text-gray-600 bg-[#F5F2FA] px-3 py-1 text-xs font-inter font-medium rounded-[4px] tracking-wide uppercase">
                          {cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {cartItems.map((item, index) => {
                          const productData = item.productId || item;
                          const imageUrl = productData.image || '/default-image.jpg';
                          
                          return (
                            <motion.div 
                              key={item._id || item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-[#F5F2FA] p-6 rounded-[4px] flex items-center gap-6 border border-gray-200 group hover:border-[#8f1eae] transition-all duration-300"
                            >
                              <div className="flex-shrink-0">
                                <img 
                                  src={imageUrl} 
                                  alt={productData.name}
                                  className="w-24 h-24 object-contain bg-white border border-gray-200 p-2 rounded-[4px]"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h3 className="font-inter font-medium text-gray-900 text-lg mb-1">
                                      {productData.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-2 font-light">
                                      {productData.brand}
                                    </p>
                                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-inter font-medium bg-black text-white rounded-[4px] tracking-wide uppercase">
                                      {productData.condition}
                                    </span>
                                  </div>
                                  <div className="text-right ml-4">
                                    <p className="text-xl font-inter font-medium text-gray-900 mb-2">
                                      ₹{productData.price?.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-3 bg-white border border-gray-300 px-3 py-2 rounded-[4px]">
                                      <button
                                        onClick={() => updateCartItem(item._id, item.quantity - 1)}
                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 font-light rounded-[4px]"
                                        disabled={item.quantity <= 1}
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="w-8 text-center font-inter font-medium text-gray-900">
                                        {item.quantity}
                                      </span>
                                      <button
                                        onClick={() => updateCartItem(item._id, item.quantity + 1)}
                                        className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors font-light rounded-[4px]"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 font-light">
                                      Total: ₹{((productData.price || 0) * item.quantity).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                                  <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="flex items-center gap-2 text-gray-600 text-sm hover:text-black transition-colors font-inter font-medium tracking-wide uppercase"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
                        <button
                          onClick={() => navigate('/shop')}
                          className="flex items-center gap-2 text-[#8f1eae] hover:text-[#7a1a99] font-inter font-medium transition-colors tracking-wide uppercase text-sm"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Continue Shopping
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToShipping}
                      className="w-full bg-[#8f1eae] text-white py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide"
                    >
                      Proceed to Shipping
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Shipping Information */}
                {currentStep === 2 && (
                  <ShippingForm onSubmit={handleShippingSubmit} />
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <PaymentForm 
                    onPlaceOrder={handlePlaceOrder}
                    isProcessing={isProcessing}
                  />
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary 
                  cartItems={cartItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Order Summary Component
const OrderSummary = ({ cartItems, subtotal, shipping, tax, total }) => (
  <div className="bg-white border border-gray-200 rounded-[4px] p-6 sticky top-24">
    <h3 className="text-xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200 tracking-tight font-montserrat">
      Order Summary
    </h3>
    
    <div className="space-y-4 mb-6">
      <h4 className="font-inter font-medium text-gray-700 text-xs uppercase tracking-wide">
        Items ({cartItems.length})
      </h4>
      {cartItems.map((item) => {
        const productData = item.productId || item;
        const imageUrl = productData.image || '/default-image.jpg';
        
        return (
          <div key={item._id || item.id} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img 
                src={imageUrl} 
                alt={productData.name}
                className="w-12 h-12 object-contain bg-[#F5F2FA] border border-gray-200 p-1 rounded-[4px]"
              />
              <div className="min-w-0 flex-1">
                <p className="font-inter font-medium text-gray-900 text-sm truncate">
                  {productData.name}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 text-xs font-light">Qty: {item.quantity}</p>
                  <p className="text-gray-500 text-xs font-light">₹{productData.price?.toLocaleString()}/ea</p>
                </div>
              </div>
            </div>
            <p className="font-inter font-medium text-gray-900 text-sm ml-3">
              ₹{((productData.price || 0) * item.quantity).toLocaleString()}
            </p>
          </div>
        );
      })}
    </div>

    <div className="space-y-3 border-t border-gray-200 pt-4">
      <div className="flex justify-between text-gray-600 text-sm">
        <span className="font-light">Subtotal</span>
        <span className="font-inter font-medium">₹{subtotal.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-gray-600 text-sm">
        <span className="font-light">Shipping</span>
        <span className={shipping === 0 ? 'text-[#8f1eae] font-inter font-medium' : 'font-inter font-medium'}>
          {shipping === 0 ? 'FREE' : `₹${shipping}`}
        </span>
      </div>
      <div className="flex justify-between text-gray-600 text-sm">
        <span className="font-light">Tax (18% GST)</span>
        <span className="font-inter font-medium">₹{tax.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-lg font-inter font-medium text-gray-900 border-t border-gray-200 pt-3">
        <span>Total Amount</span>
        <span className="text-[#8f1eae]">₹{total.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

// Shipping Form Component
const ShippingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="bg-white border border-gray-200 rounded-[4px] p-8">
        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
          Shipping Information
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
              placeholder="Enter your complete address"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="Your city"
              />
            </div>
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="Your state"
              />
            </div>
            <div>
              <label className="block text-sm font-inter font-medium text-gray-700 mb-2 tracking-wide uppercase">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                placeholder="123456"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8f1eae] text-white py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// Payment Form Component
const PaymentForm = ({ onPlaceOrder, isProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handlePlaceOrder = () => {
    if (!agreeToTerms) {
      alert('Please agree to the Terms & Conditions');
      return;
    }
    onPlaceOrder(paymentMethod);
  };

  const paymentMethods = [
    {
      id: 'card',
      icon: CardIcon,
      title: 'Credit/Debit Card',
      description: 'Pay securely with your card'
    },
    {
      id: 'upi',
      icon: Smartphone,
      title: 'UPI Payment',
      description: 'Fast and secure UPI payment'
    },
    {
      id: 'cod',
      icon: Wallet,
      title: 'Cash on Delivery',
      description: 'Pay when you receive the order'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="bg-white border border-gray-200 rounded-[4px] p-8">
        <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight font-montserrat">
          Payment Method
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <label 
                key={method.id}
                className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200 rounded-[4px] ${
                  paymentMethod === method.id 
                    ? 'border-[#8f1eae] bg-[#F5F2FA]' 
                    : 'border-gray-300 hover:border-[#8f1eae] hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-[#8f1eae]"
                />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#F5F2FA] flex items-center justify-center rounded-[4px]">
                    <method.icon className="w-4 h-4 text-[#8f1eae]" />
                  </div>
                  <div>
                    <span className="font-inter font-medium text-gray-900">
                      {method.title}
                    </span>
                    <p className="text-gray-500 text-sm mt-1 font-light">
                      {method.description}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex items-start gap-3 p-4 bg-[#F5F2FA] rounded-[4px]">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-5 h-5 text-[#8f1eae] mt-0.5 rounded-[4px]"
            />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed font-light">
              I agree to the <a href="/terms" className="text-[#8f1eae] hover:underline font-inter font-medium">Terms & Conditions</a> and <a href="/privacy" className="text-[#8f1eae] hover:underline font-inter font-medium">Privacy Policy</a>.
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing || !agreeToTerms}
            className="w-full bg-black text-white py-3 font-inter font-medium hover:bg-gray-800 transition-all duration-300 border border-black rounded-[4px] uppercase text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Your Order...
              </div>
            ) : (
              `Place Order - Secure Payment`
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Order Confirmation Component
const OrderConfirmation = ({ orderData, onContinueShopping, onViewOrder }) => {
  const orderNumber = orderData?.orderNumber || `RK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
  const orderDate = orderData?.createdAt ? new Date(orderData.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const totals = orderData?.calculatedTotals || {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0
  };

  const items = orderData?.items || [];
  const shippingAddress = orderData?.shippingAddress;
  const paymentMethod = orderData?.paymentMethod;

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Success Header */}
      <div className="bg-white border border-gray-200 rounded-[4px] p-12 text-center">
        <div className="w-24 h-24 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
          <CheckCircle className="w-12 h-12 text-[#8f1eae]" />
        </div>
        
        <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">
          Order Confirmed!
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        
        {/* Order Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
          <div className="bg-[#F5F2FA] p-6 border border-gray-200 rounded-[4px]">
            <div className="w-12 h-12 bg-white flex items-center justify-center mx-auto mb-3 rounded-[4px]">
              <FileText className="w-6 h-6 text-[#8f1eae]" />
            </div>
            <p className="text-[#8f1eae] font-inter font-medium text-sm mb-2 tracking-wide uppercase">
              Order Number
            </p>
            <p className="text-gray-900 font-inter font-medium text-lg">{orderNumber}</p>
          </div>
          <div className="bg-[#F5F2FA] p-6 border border-gray-200 rounded-[4px]">
            <div className="w-12 h-12 bg-white flex items-center justify-center mx-auto mb-3 rounded-[4px]">
              <Calendar className="w-6 h-6 text-[#8f1eae]" />
            </div>
            <p className="text-[#8f1eae] font-inter font-medium text-sm mb-2 tracking-wide uppercase">
              Order Date
            </p>
            <p className="text-gray-900 font-light text-sm leading-tight">{orderDate}</p>
          </div>
          <div className="bg-[#F5F2FA] p-6 border border-gray-200 rounded-[4px]">
            <div className="w-12 h-12 bg-white flex items-center justify-center mx-auto mb-3 rounded-[4px]">
              <Package className="w-6 h-6 text-[#8f1eae]" />
            </div>
            <p className="text-[#8f1eae] font-inter font-medium text-sm mb-2 tracking-wide uppercase">
              Total Items
            </p>
            <p className="text-gray-900 font-inter font-medium text-2xl">{totalItems}</p>
          </div>
        </div>

        {/* Shipping Summary */}
        <div className="bg-[#F5F2FA] p-8 border border-gray-200 rounded-[4px] text-left max-w-3xl mx-auto mb-8">
          <h3 className="text-lg font-inter font-medium text-gray-900 mb-4 tracking-wide uppercase">
            Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 font-light">Items Total</span>
              <span className="font-inter font-medium">₹{totals.subtotal?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-light">Shipping</span>
              <span className="font-inter font-medium">
                {totals.shipping === 0 ? 'FREE' : `₹${totals.shipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-light">Tax (18% GST)</span>
              <span className="font-inter font-medium">₹{totals.tax?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-inter font-medium text-gray-900 border-t border-gray-200 pt-3">
              <span>Total Paid</span>
              <span className="text-[#8f1eae]">₹{totals.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onContinueShopping}
          className="bg-[#8f1eae] text-white px-10 py-3 font-inter font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase text-sm tracking-wide"
        >
          Continue Shopping
        </button>
        
        <button
          onClick={onViewOrder}
          className="bg-black text-white px-10 py-3 font-inter font-medium hover:bg-gray-800 transition-all duration-300 border border-black rounded-[4px] uppercase text-sm tracking-wide"
        >
          View Order Details
        </button>
      </div>
    </motion.div>
  );
};