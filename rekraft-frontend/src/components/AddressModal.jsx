import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AddressModal = ({ mode, address, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'home',
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && address) {
      setFormData({
        type: address.type || 'home',
        fullName: address.fullName || '',
        phone: address.phone || '',
        addressLine1: address.addressLine1 || '',
        addressLine2: address.addressLine2 || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.pincode || '',
        landmark: address.landmark || '',
        isDefault: address.isDefault || false
      });
    }
  }, [mode, address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 font-roboto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 tracking-wider uppercase font-poppins">
            {mode === 'edit' ? 'Edit Address' : 'Add New Address'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Address Type */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              Address Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 font-light tracking-wide"
            >
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
              placeholder="Enter full name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
              placeholder="Enter phone number"
            />
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
              placeholder="House/Flat number, Street name"
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
              placeholder="Area, Colony (optional)"
            />
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
                Pincode *
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
                placeholder="Pincode"
              />
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
              placeholder="State"
            />
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-3 tracking-wider uppercase font-inter">
              Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#8f1eae] bg-white text-gray-900 placeholder-gray-400 font-light tracking-wide"
              placeholder="Nearby landmark (optional)"
            />
          </div>

          {/* Set as Default */}
          <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded hover:bg-gray-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-5 h-5 text-[#8f1eae] rounded focus:ring-[#8f1eae]"
            />
            <label className="font-medium text-gray-900 text-sm tracking-wide">
              Set as default address
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-gray-200 text-gray-900 px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:border-[#8f1eae] hover:text-[#8f1eae] rounded font-roboto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#8f1eae] text-white px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-[#7a1a99] disabled:bg-gray-300 disabled:cursor-not-allowed rounded font-roboto flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                mode === 'edit' ? 'Update Address' : 'Save Address'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddressModal;