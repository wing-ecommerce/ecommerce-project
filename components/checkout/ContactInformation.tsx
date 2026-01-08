'use client';

import { Phone } from 'lucide-react';

interface ContactInformationProps {
  email: string;
}

export default function ContactInformation({ email }: ContactInformationProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Phone className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Order confirmation will be sent to this email
          </p>
        </div>
      </div>
    </div>
  );
}