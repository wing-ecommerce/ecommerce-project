'use client';

import { MapPin, Plus } from 'lucide-react';

interface Address {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  isDefault: boolean;
}

interface SavedAddressesProps {
  addresses: Address[];
  selectedAddressId: string;
  onAddressSelect: (addressId: string) => void;
  onAddNewAddress: () => void;
}

export default function SavedAddresses({
  addresses,
  selectedAddressId,
  onAddressSelect,
  onAddNewAddress,
}: SavedAddressesProps) {
  if (addresses.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Saved Addresses</h2>
        </div>
        <button
          onClick={onAddNewAddress}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium transition"
        >
          <Plus className="w-4 h-4" />
          New Address
        </button>
      </div>

      <div className="space-y-3">
        {addresses.map((address) => (
          <div
            key={address.id}
            onClick={() => onAddressSelect(address.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition ${
              selectedAddressId === address.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <input
                type="radio"
                checked={selectedAddressId === address.id}
                onChange={() => onAddressSelect(address.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{address.fullName}</p>
                <p className="text-sm text-gray-600">{address.address}</p>
                <p className="text-sm text-gray-600">{address.city}, Cambodia</p>
                <p className="text-sm text-gray-600">{address.phone}</p>
                {address.isDefault && (
                  <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Default
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}