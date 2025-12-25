import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building, MapPin, Edit, Trash2, CheckCircle } from 'lucide-react';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const getAddressTypeIcon = (type) => {
    switch (type) {
      case 'home': return <Home className="w-5 h-5" />;
      case 'work': return <Building className="w-5 h-5" />;
      case 'other': return <MapPin className="w-5 h-5" />;
      default: return <Home className="w-5 h-5" />;
    }
  };

  const getAddressTypeText = (type) => {
    switch (type) {
      case 'home': return 'HOME ADDRESS';
      case 'work': return 'WORK ADDRESS';
      case 'other': return 'OTHER ADDRESS';
      default: return 'ADDRESS';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border border-gray-300 p-6 transition-all duration-300 hover:border-[#8f1eae] group ${
        address.isDefault 
          ? 'border-[#8f1eae] bg-[#F5F2FA]' 
          : 'bg-white'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded flex items-center justify-center ${
            address.isDefault 
              ? 'bg-[#8f1eae] text-white' 
              : 'bg-[#F5F2FA] text-[#8f1eae] group-hover:bg-[#8f1eae] group-hover:text-white transition-all duration-300'
          }`}>
            {getAddressTypeIcon(address.type)}
          </div>
          <div>
            <h4 className="font-normal text-gray-900 text-base uppercase tracking-wider font-inter">
              {getAddressTypeText(address.type)}
            </h4>
            {address.isDefault && (
              <div className="flex items-center gap-2 mt-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-medium font-inter">DEFAULT ADDRESS</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
          {!address.isDefault && (
            <button
              onClick={() => onSetDefault(address._id)}
              className="text-xs text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 font-medium uppercase tracking-wider font-inter flex items-center gap-1"
            >
              <CheckCircle className="w-3 h-3" />
              SET DEFAULT
            </button>
          )}
          <button
            onClick={() => onEdit(address)}
            className="text-xs text-gray-600 hover:text-[#8f1eae] transition-colors duration-300 font-medium uppercase tracking-wider font-inter flex items-center gap-1"
          >
            <Edit className="w-3 h-3" />
            EDIT
          </button>
          <button
            onClick={() => onDelete(address._id)}
            className="text-xs text-red-600 hover:text-red-800 transition-colors duration-300 font-medium uppercase tracking-wider font-inter flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            DELETE
          </button>
        </div>
      </div>

      {/* Address Details */}
      <div className="space-y-4">
        <div>
          <p className="font-medium text-gray-900 text-sm mb-1 font-inter">CONTACT PERSON</p>
          <p className="font-light text-gray-600 text-sm font-lato">{address.fullName}</p>
        </div>
        
        <div>
          <p className="font-medium text-gray-900 text-sm mb-1 font-inter">PHONE NUMBER</p>
          <p className="font-light text-gray-600 text-sm font-lato">{address.phone}</p>
        </div>
        
        <div>
          <p className="font-medium text-gray-900 text-sm mb-1 font-inter">ADDRESS</p>
          <div className="space-y-1">
            <p className="font-light text-gray-600 text-sm font-lato leading-relaxed">
              {address.addressLine1}
            </p>
            {address.addressLine2 && (
              <p className="font-light text-gray-600 text-sm font-lato leading-relaxed">
                {address.addressLine2}
              </p>
            )}
            {address.landmark && (
              <p className="font-light text-gray-600 text-sm font-lato leading-relaxed">
                Landmark: {address.landmark}
              </p>
            )}
            <p className="font-light text-gray-600 text-sm font-lato leading-relaxed">
              {address.city}, {address.state} - {address.pincode}
            </p>
          </div>
        </div>
      </div>

      {/* Use Address Button */}
      <div className="mt-6 pt-6 border-t border-gray-300">
        <button className="w-full bg-[#8f1eae] text-white py-3 text-sm font-medium hover:bg-[#7a1a99] transition-all duration-300 border border-[#8f1eae] uppercase tracking-wider font-inter">
          USE THIS ADDRESS
        </button>
      </div>
    </motion.div>
  );
};

export default AddressCard;