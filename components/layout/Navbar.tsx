'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import CartSidebar from '../cart/CartSideBar';

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock cart count - replace with your actual cart store
  const cartCount = 3;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-50 via-white to-green-50 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-500 bg-clip-text text-transparent hidden sm:block">
                  MyApp
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all hover:text-green-500 relative ${
                    pathname === link.href
                      ? 'text-green-500'
                      : 'text-gray-700'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-green-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border-2 border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white shadow-sm transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Icon */}
              <button className="md:hidden p-2 text-gray-700 hover:text-green-500 transition-colors">
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-green-500 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-all shadow-md"
              >
                <User className="w-5 h-5" />
                <span className="text-sm font-semibold hidden lg:block">Sign In</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-green-500 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-purple-100">
              {/* Mobile Search */}
              <div className="mb-4 px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border-2 border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-semibold transition-all rounded-full ${
                      pathname === link.href
                        ? 'text-green-500 bg-gradient-to-r from-purple-50 to-green-50'
                        : 'text-gray-700 hover:bg-purple-50 hover:text-green-500'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Account Link */}
                <Link
                  href="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="sm:hidden flex items-center space-x-3 px-4 py-3 text-base font-semibold text-white bg-green-500 hover:bg-green-600 transition-all rounded-full"
                >
                  <User className="w-5 h-5" />
                  <span>Account / Sign In</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;