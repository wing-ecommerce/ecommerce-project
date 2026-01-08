'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string; // Optional redirect after sign in
};

export default function SignInModal({ isOpen, onClose, redirectTo = '/' }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('google', {
        callbackUrl: redirectTo,
        redirect: true,
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Gradient */}
          <div className="relative h-20 bg-gradient-to-br from-green-500 to-emerald-600">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/20 p-1 text-white hover:bg-white/30 transition"
            >
              <X size={18} />
            </button>

            <div className="flex h-full items-center justify-center">
              <h2 className="text-2xl font-bold text-white tracking-wide">
                TeeSpace
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <h3 className="text-center text-xl font-semibold text-gray-900">
              Welcome back 
            </h3>

            <p className="mt-2 text-center text-sm text-gray-500">
              Sign in to continue shopping and manage your orders.
            </p>

            {/* Google Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
              ) : (
                <>
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    width={18}
                    height={18}
                  />
                  Continue with Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <span className="h-px w-full bg-gray-200" />
              <span className="text-xs text-gray-400"></span>
              <span className="h-px w-full bg-gray-200" />
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="text-emerald-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-emerald-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}