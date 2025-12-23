'use client';
import Link from 'next/link';
import { Star, Clock, Globe, RefreshCw, Headphones, CreditCard, ChevronRight } from 'lucide-react';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* NEW: Category Bar at the top */}
      <div className="bg-green-50 py-4 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/category/skirt" className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium hover:bg-green-100 transition">
              Skirt
            </Link>
            <Link href="/category/t-shirt" className="px-6 py-2.5 bg-green-500 text-white rounded-full font-medium shadow-md">
              T-Shirt
            </Link>
            <Link href="/category/jeans" className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium hover:bg-green-100 transition">
              Jeans
            </Link>
            <Link href="/category/dress" className="px-6 py-2.5 bg-white text-gray-700 rounded-full font-medium hover:bg-green-100 transition">
              Dress
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen max-h-screen overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1523395294268-3868e0e1bf65?w=1200&h=800&fit=crop"
          alt="People enjoying vacation in stylish t-shirts"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          loading="lazy"
        />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="max-w-2xl text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Rated 4.9 of 5.0</span>
              <div className="flex">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Enjoy up your vacations<br />in the best T-shirts
            </h1>
            <p className="text-lg mb-8 opacity-90">
              What's more, we do it right! A full administration printing background.<br />
              Print shirts for yourself or your online business.
            </p>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-10">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                Top quality prints using the latest technology
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
                Mix and match colors, sizes, and designs
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition">
                Get Started Today
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2">
                How We Work <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">T-shirt Printing for Everyone</h2>
          <p className="text-gray-600 mb-12">What's more, we do it right!</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: 'T-shirt', count: '15', img: 'https://i.pinimg.com/736x/8e/78/95/8e7895c171879b4b1d9089bc0b8d216d.jpg' },
              { name: 'Long-sleeves', count: '9', img: 'https://i.pinimg.com/736x/8e/78/95/8e7895c171879b4b1d9089bc0b8d216d.jpg' },
              { name: 'Sweater', count: '18', img: 'https://i.pinimg.com/736x/8e/78/95/8e7895c171879b4b1d9089bc0b8d216d.jpg' },
              { name: 'Hoodie', count: '8', img: 'https://i.pinimg.com/736x/8e/78/95/8e7895c171879b4b1d9089bc0b8d216d.jpg' },
              { name: 'Tanktop', count: '6', img: 'https://i.pinimg.com/736x/8e/78/95/8e7895c171879b4b1d9089bc0b8d216d.jpg' },
            ].map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { title: "Men's Collection", color: 'purple' },
            { title: "Kid's Collection", color: 'green' },
            { title: "Women's Collection", color: 'pink' },
          ].map((col) => (
            <div key={col.title} className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer">
              <img
                src={`https://via.placeholder.com/600x400/${col.color === 'purple' ? 'a855f7' : col.color === 'green' ? '86efac' : 'fbcfe8'}/ffffff?text=${col.title}`}
                alt={col.title}
                className="w-full h-96 object-cover group-hover:scale-105 transition"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                  {col.title}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Deals Section - NOW CLICKABLE TO PRODUCT DETAIL */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Best clothing deals online</h2>
          <p className="text-center text-gray-600 mb-12">What's more, we do it right!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <Link href={`/products/${i + 1}`} key={i} className="group block cursor-pointer">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                  {i % 3 === 0 && <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">Hot</span>}
                  {i % 4 === 0 && <span className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">-30%</span>}
                  <img
                    src={`https://via.placeholder.com/400x500/e5e7eb/6b7280?text=Zone+Sweatshirt+${i + 1}`}
                    alt="Product"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5">
                    <p className="text-sm text-gray-600 mb-2">Zone Sweatshirt</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-green-600">$19.95</span>
                      <span className="text-sm text-gray-500 line-through">$169.95</span>
                    </div>
                    <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition">
                      Add+
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offer Countdown */}
      <section className="py-16 bg-gradient-to-r from-purple-100 to-green-100">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-pink-600 font-semibold">SPECIAL OFFER</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Extra Sale 30% off</h2>
            <p className="text-gray-700 mb-6">
              Bucket hat with a contrast colored handle.<br />
              Perfect for playing on the beach.
            </p>
            <div className="flex items-center gap-4 text-4xl font-mono mb-8">
              <Clock className="w-10 h-10 text-green-600" />
              <span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>
            </div>
            <button className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition">
              Get only $29.00 →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <img src="https://i.pinimg.com/1200x/51/b3/db/51b3dbb5b0d0a959c288f4f1339e5e9f.jpg" alt="Sale item" className="rounded-2xl shadow-xl" />
            <div className="relative">
              <img src="https://i.pinimg.com/736x/0d/b0/07/0db0071aea7a3e64b55d0e92f6faf778.jpg" alt="Sale item" className="rounded-2xl shadow-xl" />
              <span className="absolute top-8 right-10 bg-purple-600 text-white text-3xl font-bold px-6 py-4 rounded-full">
                Save<br />30%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-3xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">10% off your first order</h3>
            <p className="mb-8">Free and easy way to bring your ideas to life</p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Shop Now
            </button>
          </div>
          <div className="bg-gradient-to-r from-pink-300 to-purple-300 rounded-3xl p-10 text-white">
            <h3 className="text-3xl font-bold mb-4">Create your unique style</h3>
            <p className="mb-8">Free and easy way to bring your ideas to life</p>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Explore More
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What people are saying</h2>
          <p className="text-gray-600 mb-12">What's more, we do it right!</p>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-12">
            <img src="https://via.placeholder.com/80x80/pink/white?text=M" alt="Customer" className="w-20 h-20 rounded-full mx-auto mb-6" />
            <p className="text-lg italic mb-6">
              "For all your printing prerequisites. Offer to make and print their pamphlets, business cards, solicitations, and occasion programs. More than ink... Solutions."
            </p>
            <p className="font-semibold">Marry - Designer at Lift</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Globe, title: 'Worldwide Shipping', desc: 'Get free shipping over $50.' },
            { icon: RefreshCw, title: 'Returns', desc: 'Within 30 days for an exchange.' },
            { icon: Headphones, title: 'Online Support', desc: '24/7 customer service.' },
            { icon: CreditCard, title: 'Flexible Payment', desc: 'Pay with Multiple Credit Cards.' },
          ].map((feature) => (
            <div key={feature.title}>
              <feature.icon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recommended action</h2>
          <p className="text-gray-600 mb-8">
            Get inspiration, updates, tips, & other assorted awesomeness.
          </p>
          <button className="text-green-600 font-semibold hover:underline mb-12">
            Read latest articles →
          </button>
          <div className="grid md:grid-cols-3 gap-8">
            {['Design Services', 'Print Company', 'Print Company'].map((title, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <img src={`https://via.placeholder.com/600x400/e5e7eb/6b7280?text=${title}`} alt={title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{title} • August 20, 2022</p>
                  <h4 className="font-bold text-lg">
                    {i === 0 ? 'Make yourself happy with our T-shirt customer designer' : i === 1 ? 'Are you ready to make it awesome with us' : 'The best custom T-shirt designer WordPress theme'}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}