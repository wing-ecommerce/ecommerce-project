import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-50 text-gray-700 mt-16">
      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-green-600 mb-4">TeeSpace</h3>
            <p className="text-sm mb-2">hello@teespace.io</p>
            <p className="text-lg font-semibold mb-3">+02 036 038 3996</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              3665 Paseo Place, Suite 0960<br />
              San Diego
            </p>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-600 transition">About us</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Our Blog</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Start a Return</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Shipping FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-600 transition">Printing Services</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Digital Scanning</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Design Services</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Copying Services</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Print on Demand</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Useful links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-green-600 transition">My Account</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Print Provider</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Become a Partner</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Custom Products</a></li>
              <li><a href="#" className="hover:text-green-600 transition">Make your own shirt</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-sm mb-5">Subscribe to our newsletter.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <button className="bg-green-500 text-white px-7 py-3 rounded-full font-medium hover:bg-green-600 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Full Width */}
      <div className="border-t border-gray-200 py-6 mt-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-gray-600">
              © 2025 TeeSpace. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-4">
              {['AMEX', 'PayPal', 'Google Pay', 'Mastercard', 'Apple Pay', 'VISA'].map((method) => (
                <span key={method} className="bg-gray-200 text-xs px-3 py-1.5 rounded font-medium">
                  {method}
                </span>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-green-600 transition"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-green-600 transition"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-green-600 transition"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-green-600 transition"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}