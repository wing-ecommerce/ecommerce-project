'use client';

import { MapPin } from 'lucide-react';

interface NewAddressFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

interface NewAddressFormProps {
  formData: NewAddressFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  hasExistingAddresses: boolean;
}

export default function NewAddressForm({
  formData,
  onChange,
  onSave,
  hasExistingAddresses,
}: NewAddressFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {hasExistingAddresses ? 'New Shipping Address' : 'Shipping Address'}
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Sok Dara"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="+855 12 345 678"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Street 123, Sangkat BKK1"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City/Province <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={onChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select city/province</option>
            <option value="Phnom Penh">Phnom Penh</option>
            <option value="Siem Reap">Siem Reap</option>
            <option value="Battambang">Battambang</option>
            <option value="Sihanoukville">Sihanoukville</option>
            <option value="Kampong Cham">Kampong Cham</option>
            <option value="Kandal">Kandal</option>
            <option value="Prey Veng">Prey Veng</option>
            <option value="Takeo">Takeo</option>
            <option value="Kampot">Kampot</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {hasExistingAddresses && (
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={onChange}
                className="w-4 h-4 text-green-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Set as default address
              </span>
            </label>
          </div>
        )}

        <button
          onClick={onSave}
          type="button"
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}