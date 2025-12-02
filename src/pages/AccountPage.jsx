import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import AddressCard from '../components/AddressCard';
import AddressModal from '../components/AddressModal';
import { 
  Package, 
  CreditCard, 
  Calendar, 
  MapPin,
  LogOut,
  User,
  Settings,
  Home,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Check,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [ordersLoading, setOrdersLoading] = useState(true);
  
  // Address management states
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);

  const { user, logout, updateProfile, orders, fetchOrders, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();

  // Fetch orders when component mounts or when user changes
  useEffect(() => {
    if (user) {
      fetchOrdersData();
    }
  }, [user]);

  const fetchOrdersData = async () => {
    setOrdersLoading(true);
    await fetchOrders();
    setOrdersLoading(false);
  };

  // Helper function to format order status
  const getOrderStatusInfo = (status) => {
    const statusMap = {
      'pending': { 
        color: 'text-yellow-700', 
        bg: 'bg-yellow-100', 
        text: 'Pending',
        icon: <Clock className="w-4 h-4" />
      },
      'confirmed': { 
        color: 'text-blue-700', 
        bg: 'bg-blue-100', 
        text: 'Confirmed',
        icon: <CheckCircle className="w-4 h-4" />
      },
      'processing': { 
        color: 'text-purple-700', 
        bg: 'bg-purple-100', 
        text: 'Processing',
        icon: <Settings className="w-4 h-4" />
      },
      'shipped': { 
        color: 'text-indigo-700', 
        bg: 'bg-indigo-100', 
        text: 'Shipped',
        icon: <Truck className="w-4 h-4" />
      },
      'delivered': { 
        color: 'text-green-700', 
        bg: 'bg-green-100', 
        text: 'Delivered',
        icon: <Check className="w-4 h-4" />
      },
      'cancelled': { 
        color: 'text-red-700', 
        bg: 'bg-red-100', 
        text: 'Cancelled',
        icon: <XCircle className="w-4 h-4" />
      }
    };
    return statusMap[status] || { 
      color: 'text-gray-700', 
      bg: 'bg-gray-100', 
      text: status,
      icon: <Package className="w-4 h-4" />
    };
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Profile editing functions
  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user?.name || '',
      phone: user?.phone || ''
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    setMessageType('');
    
    const result = await updateProfile(formData.name, formData.phone);
    
    if (result.success) {
      setMessage('Profile updated successfully!');
      setMessageType('success');
      setIsEditing(false);
    } else {
      setMessage(result.error);
      setMessageType('error');
    }
    
    setLoading(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      phone: user?.phone || ''
    });
    setMessage('');
    setMessageType('');
  };

  // Address management functions
  const handleSaveAddress = async (addressData) => {
    setAddressLoading(true);
    setMessage('');
    setMessageType('');

    try {
      let result;
      if (editingAddress) {
        result = await updateAddress(editingAddress._id, addressData);
      } else {
        result = await addAddress(addressData);
      }

      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
        setShowAddAddress(false);
        setEditingAddress(null);
      } else {
        setMessage(result.error);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to save address');
      setMessageType('error');
    } finally {
      setAddressLoading(false);
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddAddress(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddressLoading(true);
      const result = await deleteAddress(addressId);
      if (result.success) {
        setMessage(result.message);
        setMessageType('success');
      } else {
        setMessage(result.error);
        setMessageType('error');
      }
      setAddressLoading(false);
    }
  };

  const handleSetDefaultAddress = async (addressId) => {
    setAddressLoading(true);
    const result = await setDefaultAddress(addressId);
    if (result.success) {
      setMessage(result.message);
      setMessageType('success');
    } else {
      setMessage(result.error);
      setMessageType('error');
    }
    setAddressLoading(false);
  };

  // Calculate total spent
  const totalSpent = orders.reduce((total, order) => total + order.total, 0);

  // If user is not logged in, show a message to login
  if (!user) {
    return (
      <div className="pt-20 min-h-screen bg-white font-lato">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-24 h-24 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-6">
              <LogOut className="w-12 h-12 text-[#8f1eae]" />
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight font-montserrat">Please Log In</h1>
            <p className="text-gray-600 text-base max-w-md mx-auto leading-relaxed font-light font-lato">
              You need to be logged in to view your account details and manage your orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="/login"
                className="bg-[#8f1eae] text-white px-8 py-3 font-medium text-sm hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-transparent text-gray-700 px-8 py-3 font-medium text-sm hover:text-[#8f1eae] transition-all duration-300 border border-gray-300 hover:border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter"
              >
                Register
              </a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white font-lato">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight font-montserrat">My Account</h1>
            <p className="text-gray-600 text-base font-light font-lato">Welcome back, {user.name} 👋</p>
          </div>
          <button
            onClick={logout}
            className="bg-transparent text-gray-700 px-6 py-3 font-medium text-sm hover:text-[#8f1eae] transition-all duration-300 border border-gray-300 hover:border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter mt-4 md:mt-0"
          >
            Logout
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`px-4 py-3 rounded-[4px] mb-6 border ${
              messageType === 'success' 
                ? 'bg-green-100 border-green-300 text-green-700'
                : 'bg-red-100 border-red-300 text-red-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {messageType === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-medium font-inter">{message}</span>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" /> },
              { id: "orders", label: "My Orders", icon: <Package className="w-4 h-4" /> },
              { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
              { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm tracking-wide uppercase transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-[#8f1eae] text-[#8f1eae]"
                    : "border-transparent text-gray-500 hover:text-gray-700 font-inter"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 uppercase tracking-wide font-inter">Total Orders</h3>
                    <p className="text-3xl font-light text-[#8f1eae] font-montserrat">{orders.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 uppercase tracking-wide font-inter">Total Spent</h3>
                    <p className="text-3xl font-light text-[#8f1eae] font-montserrat">
                      ₹{totalSpent.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 border border-gray-200 rounded-[4px] hover:border-[#8f1eae] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#F5F2FA] rounded-[4px] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#8f1eae]" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900 uppercase tracking-wide font-inter">Member Since</h3>
                    <p className="text-3xl font-light text-[#8f1eae] font-montserrat">
                      {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-gray-200 rounded-[4px]">
              <div className="p-8 border-b border-gray-300">
                <h3 className="text-xl font-light text-gray-900 tracking-tight font-montserrat">Recent Orders</h3>
              </div>
              {ordersLoading ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8f1eae] mx-auto"></div>
                  <p className="text-gray-600 mt-4 font-light font-lato">Loading orders...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-24 h-24 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-12 h-12 text-[#8f1eae]" />
                  </div>
                  <p className="text-gray-600 font-light font-lato mb-4">No orders found</p>
                  <a
                    href="/shop"
                    className="bg-[#8f1eae] text-white px-6 py-3 font-medium text-sm hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter inline-block"
                  >
                    Start Shopping
                  </a>
                </div>
              ) : (
                <>
                  <div className="divide-y divide-gray-300">
                    {orders.slice(0, 2).map(order => {
                      const statusInfo = getOrderStatusInfo(order.orderStatus);
                      return (
                        <div key={order._id} className="p-8 flex justify-between items-center hover:bg-[#F5F2FA] transition-colors duration-300">
                          <div>
                            <p className="font-medium text-gray-900 tracking-wide font-inter">Order #{order.orderNumber}</p>
                            <p className="text-gray-600 text-sm mt-2 font-light font-lato">
                              {order.items.length} item{order.items.length > 1 ? 's' : ''}
                            </p>
                            <p className="text-gray-500 text-sm font-light font-lato">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900 font-inter">₹{order.total.toLocaleString()}</p>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-[4px] text-xs font-medium mt-2 ${statusInfo.bg} ${statusInfo.color} font-inter`}>
                              {statusInfo.icon}
                              {statusInfo.text}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-8 border-t border-gray-300">
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-[#8f1eae] font-medium hover:text-[#7a1a95] transition-colors duration-300 flex items-center gap-2 text-sm tracking-wide uppercase font-inter"
                    >
                      View all orders
                      <span>→</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-[4px]"
          >
            <div className="p-8 border-b border-gray-300">
              <h3 className="text-xl font-light text-gray-900 tracking-tight font-montserrat">Order History</h3>
            </div>
            {ordersLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8f1eae] mx-auto"></div>
                <p className="text-gray-600 mt-4 font-light font-lato">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="w-12 h-12 text-[#8f1eae]" />
                </div>
                <h4 className="text-xl font-light text-gray-900 mb-2 tracking-tight font-montserrat">No Orders Yet</h4>
                <p className="text-gray-600 mb-6 font-light font-lato">You haven't placed any orders yet.</p>
                <a
                  href="/shop"
                  className="bg-[#8f1eae] text-white px-8 py-3 font-medium text-sm hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter inline-block"
                >
                  Start Shopping
                </a>
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {orders.map(order => {
                  const statusInfo = getOrderStatusInfo(order.orderStatus);
                  return (
                    <div key={order._id} className="p-8 hover:bg-[#F5F2FA] transition-colors duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="font-medium text-gray-900 tracking-wide font-inter">Order #{order.orderNumber}</p>
                          <p className="text-gray-600 text-sm mt-2 font-light font-lato">Placed on {formatDate(order.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 font-inter">₹{order.total.toLocaleString()}</p>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-[4px] text-xs font-medium mt-2 ${statusInfo.bg} ${statusInfo.color} font-inter`}>
                            {statusInfo.icon}
                            {statusInfo.text}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-700 font-medium mb-2 font-inter">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="text-sm text-gray-600 font-light font-lato">
                                {item.name}
                                {index < order.items.length - 1 && index < 2 ? ',' : ''}
                                {index === 2 && order.items.length > 3 && '...'}
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className="bg-transparent text-[#8f1eae] px-6 py-2 font-medium text-sm tracking-wide uppercase hover:bg-[#8f1eae] hover:text-white transition-all duration-300 border border-[#8f1eae] rounded-[4px] font-inter">
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-gray-200 rounded-[4px]"
          >
            <div className="p-8 border-b border-gray-300">
              <h3 className="text-xl font-light text-gray-900 tracking-tight font-montserrat">Profile Information</h3>
            </div>
            <div className="p-8">
              <div className="space-y-8 max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-medium text-gray-900 tracking-wide font-inter">Personal Details</h4>
                  {!isEditing && (
                    <button
                      onClick={handleEdit}
                      className="bg-[#8f1eae] text-white px-6 py-3 font-medium text-sm hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide font-inter">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                      />
                    ) : (
                      <p className="text-gray-900 text-base py-3 font-light font-lato">{user.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide font-inter">
                      Email Address
                    </label>
                    <p className="text-gray-900 text-base py-3 font-light font-lato">{user.email}</p>
                    <p className="text-gray-500 text-sm font-light font-lato mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wide font-inter">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#8f1eae] focus:border-[#8f1eae] bg-white text-gray-900 transition-all duration-300 font-inter"
                    />
                  ) : (
                    <p className="text-gray-900 text-base py-3 font-light font-lato">{user.phone}</p>
                  )}
                </div>

                {/* Edit Actions */}
                {isEditing && (
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-[#8f1eae] text-white px-8 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 border border-[#8f1eae] hover:bg-[#7a1a99] disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px] font-inter"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-transparent text-gray-700 px-8 py-3 font-medium text-sm tracking-wide uppercase transition-all duration-300 border border-gray-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded-[4px] font-inter"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Addresses */}
        {activeTab === "addresses" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white border border-gray-200 rounded-[4px] p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-light text-gray-900 tracking-tight font-montserrat">Saved Addresses</h3>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="bg-[#8f1eae] text-white px-6 py-3 font-medium text-sm hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Address
                </button>
              </div>

              {/* Address List */}
              <div className="grid md:grid-cols-2 gap-6">
                {user?.addresses?.length > 0 ? (
                  user.addresses.map((address) => (
                    <AddressCard 
                      key={address._id} 
                      address={address} 
                      onEdit={handleEditAddress}
                      onDelete={handleDeleteAddress}
                      onSetDefault={handleSetDefaultAddress}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <div className="w-24 h-24 bg-[#F5F2FA] rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-12 h-12 text-[#8f1eae]" />
                    </div>
                    <h4 className="text-xl font-light text-gray-900 mb-2 tracking-tight font-montserrat">No Addresses</h4>
                    <p className="text-gray-600 mb-8 font-light font-lato">You haven't added any addresses yet.</p>
                    <button
                      onClick={() => setShowAddAddress(true)}
                      className="bg-[#8f1eae] text-white px-8 py-3 font-medium text-sm hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] rounded-[4px] uppercase tracking-wide font-inter inline-block"
                    >
                      Add Your First Address
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Add/Edit Address Modal */}
        {showAddAddress && (
          <AddressModal
            mode={editingAddress ? "edit" : "add"}
            address={editingAddress}
            onSave={handleSaveAddress}
            onCancel={() => {
              setShowAddAddress(false);
              setEditingAddress(null);
            }}
            loading={addressLoading}
          />
        )}

      </div>
      <Footer />
    </div>
  );
}