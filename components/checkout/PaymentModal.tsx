'use client';

import { ArrowLeft } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  onBack: () => void;
}

const MockKHQRPayment = ({ amount }: { amount: number }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="220" height="220" fill="white" />
        <g transform="translate(10, 10)">
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => (
              <rect
                key={`${i}-${j}`}
                x={i * 10}
                y={j * 10}
                width="10"
                height="10"
                fill={Math.random() > 0.5 ? 'black' : 'white'}
              />
            ))
          )}
        </g>
      </svg>

      <p className="text-sm text-red-500 font-medium text-center">
        Demo KHQR (Mock Payment)
      </p>
    </div>
  );
};

export default function PaymentModal({ total, onBack }: PaymentModalProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Checkout</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">Scan the QR code with your banking app</p>
          </div>

          <div className="flex justify-center mb-8">
            <MockKHQRPayment amount={total} />
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Amount to Pay:</span>
                <span className="font-semibold text-gray-800">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Merchant:</span>
                <span className="font-semibold text-gray-800">TeeSpace Store</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Location:</span>
                <span className="font-semibold text-gray-800">Phnom Penh, Cambodia</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">Payment Instructions:</h3>
            <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
              <li>Open your mobile banking app</li>
              <li>Select "Scan QR" or "KHQR Payment"</li>
              <li>Scan the QR code above</li>
              <li>Confirm the payment amount</li>
              <li>Complete the transaction</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}