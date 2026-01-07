'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignInModal({ isOpen, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn('google', {
        callbackUrl: '/',
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
        className="fixed inset-0 z-50 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={20} />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <span className="text-2xl text-green-500 font-bold">
              Welcome to TeeSpace
            </span>
          </div>

          {/* Subtitle */}
          <p className="mt-2 text-center text-sm text-gray-500">
            Sign in to access your account and continue shopping.
          </p>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 py-3 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  width={18}
                  height={18}
                />
                Sign in with Google
              </>
            )}
          </button>

          {/* Terms */}
          <p className="mt-4 text-center text-xs text-gray-400">
            By signing in, you agree to our{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Terms
            </a>{' '}
            &{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </>
  );
}