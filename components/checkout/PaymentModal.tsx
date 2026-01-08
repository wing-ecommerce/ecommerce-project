'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import QRCode from 'qrcode';

interface PaymentModalProps {
  total: number;
  onBack: () => void;
}

interface KHQRData {
  orderId: string;
  qr: string;
  md5: string;
  amount: number;
  currency: string;
  merchantName: string;
  timestamp: string;
}

export default function PaymentModal({ total, onBack }: PaymentModalProps) {
  const [khqrData, setKhqrData] = useState<KHQRData | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateKHQR();
  }, [total]);

  const generateKHQR = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/generate-khqr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'USD',
        }),
      });

      if (response.ok) {
        const data: KHQRData = await response.json();
        setKhqrData(data);

        // Generate QR code image from the QR string
        const qrImage = await QRCode.toDataURL(data.qr, {
          errorCorrectionLevel: 'M',
          margin: 1,
          width: 300,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });
        setQrCodeImage(qrImage);

        console.log('KHQR Generated:');
        console.log('Order ID:', data.orderId);
        console.log('QR String:', data.qr);
        console.log('MD5 Hash:', data.md5);
        console.log('Amount:', data.amount);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate KHQR');
      }
    } catch (error) {
      console.error('Error generating KHQR:', error);
      setError('Failed to generate payment QR code');
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="text-gray-600">Scan the QR code with your Bakong app</p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
              <p className="text-gray-600">Generating Bakong KHQR...</p>
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <p className="text-red-600 font-semibold mb-2">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
              <button
                onClick={generateKHQR}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success State - Show KHQR */}
          {khqrData && qrCodeImage && !isLoading && (
            <>
              {/* QR Code */}
              <div className="flex justify-center mb-8">
                <div className="bg-white p-4 rounded-xl border-2 border-green-500 shadow-lg">
                  <img
                    src={qrCodeImage}
                    alt="Bakong KHQR"
                    className="rounded-lg"
                  />
                  <p className="text-center text-xs text-green-600 font-semibold mt-3">
                    Bakong KHQR Code
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Order ID:</span>
                    <span className="font-mono text-sm font-semibold text-gray-800">
                      {khqrData.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Amount to Pay:</span>
                    <span className="font-semibold text-gray-800">
                      ${khqrData.amount.toFixed(2)} {khqrData.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Merchant:</span>
                    <span className="font-semibold text-gray-800">
                      {khqrData.merchantName}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>MD5 Hash:</span>
                    <span className="font-mono text-xs font-semibold text-gray-800 break-all">
                      {khqrData.md5}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">
                  Payment Instructions:
                </h3>
                <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                  <li>Open your Bakong app or any banking app</li>
                  <li>Select "Scan KHQR" or "Scan to Pay"</li>
                  <li>Scan the QR code above</li>
                  <li>Verify the payment amount (${khqrData.amount.toFixed(2)})</li>
                  <li>Enter your PIN to complete the transaction</li>
                </ol>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Note:</strong> This QR code will expire in 15 minutes. 
                  After completing the payment, please wait while we verify your transaction.
                </p>
              </div>

              {/* Debug Info (Remove in production) */}
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <details className="text-xs">
                  <summary className="cursor-pointer font-semibold text-gray-700">
                    Debug Info (Development Only)
                  </summary>
                  <pre className="mt-2 overflow-x-auto text-gray-600">
                    {JSON.stringify(khqrData, null, 2)}
                  </pre>
                </details>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}