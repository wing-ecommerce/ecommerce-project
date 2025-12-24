import Image from "next/image";
import heroImg from "./image/hero.png";
import productImg from "./image/product.png";
import ProductSection from "../components/ProductSection";
import { Product } from "../components/Product";
import IdeaImg from "./image/idea.png";

import p1 from "./image/p1.avif";
import p2 from "./image/p2.jpg";
import p3 from "./image/p3.webp";
import p4 from "./image/p4.jpg";
import p5 from "./image/p5.jpg";
import p6 from "./image/p6.webp";
import p7 from "./image/p7.jpg";
import p8 from "./image/p8.avif";
import Footer from "@/components/layout/Footer";
const product1: Product[] = [
  {
    id: 1,
    title: "Premium Crewneck Sweatshirt",
    price: "$29.00",
    image: p1,
    badge: "sell",
  },
  {
    id: 2,
    title: "Midweight Cotton Tee",
    price: "$26.00",
    image: p2,
    badge: "new",
  },
  {
    id: 3,
    title: "Youth Short Sleeve Tee",
    price: "$26.00",
    image: p3,
    badge: "hot",
  },
  {
  id: 4,
    title: "Fine Jersey Tee",
    price: "$31.00",
    image: p4,
    badge: "new"
  }

];
const product2: Product[] = [
  {
    id: 1,
    title: "Premium Crewneck Sweatshirt",
    price: "$21.00",
    image: p5,
    badge: "hot",
  },
  {
    id: 2,
    title: "Midweight Cotton Tee",
    price: "$26.00",
    image: p6,
    badge: "new",
  },
  {
    id: 3,
    title: "Youth Short Sleeve Tee",
    price: "$26.00",
    image: p7,
    badge: "new",
  },
  {
    id: 4,
    title: "Fine Jersey Tee",
    price: "$31.00",
    image: p8,
    badge: "sell",
  },
];
export default function HomePage() {
  return (
    <>
     <section className="relative bg-linear-to-br from-purple-200 via-white to-green-100">
      <div className="max-w-12xl mx-auto px-30 py-30 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block bg-purple-100 text-purple-600 text-sm px-4 py-1 rounded-full mb-6">
            Create your own
          </span>

          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Make the most <br />
            of{" "}
            <span className="relative inline-block">
              printing
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-400 rounded-full"></span>
            </span>
          </h1>

          <p className="text-gray-500 max-w-md mb-8">
            What’s more, we do it right! A full administration printing background.
            Print shirts for yourself or your online business.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-6 mb-10">
            <button className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition">
              Shop Now →
            </button>

            <button className="flex items-center gap-2 text-gray-800 font-medium">
              <span className="w-10 h-10 flex items-center justify-center border rounded-full">
                ▶
              </span>
              How We Work
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <p className="text-3xl font-bold">4k+</p>
              <p className="text-sm text-gray-500">Collections</p>
            </div>

            <div>
              <p className="text-3xl font-bold">9k+</p>
              <p className="text-sm text-gray-500">
                items trusted to deliver
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">
          {/* Background Circle */}
          <div className="absolute w-[420px] h-[420px] bg-purple-200 rounded-full -z-10"></div>

          {/* Hero Image */}
          <Image
            src={heroImg}
            alt="Hero"
            className="w-full max-h-[520px] object-contain"
            priority
          />

          {/* Product Card */}
          <div className="absolute bottom-20 -left-6 bg-white rounded-xl shadow-lg p-4 w-40">
            <Image
              src={productImg}
              alt="Product"
              className="rounded-md mb-2"
            />
            <p className="text-sm font-medium">Adult Quality Tee</p>
            <p className="text-green-500 font-semibold">$29.00</p>
          </div>

          {/* Badge */}
          <div className="absolute right-0 top-32 bg-gradient-to-br from-pink-500 to-purple-500 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center text-sm font-semibold shadow-lg">
            <span>3000+</span>
            <span className="text-xs font-normal">Products</span>
          </div>
        </div>

      </div>
    </section>

    <ProductSection title="Our picks for you" products={product1} />
      <ProductSection title="Best Seller" products={product2} />
      {/* CTA SECTION */}
<section className="relative overflow-hidden py-24">
  <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-purple-50 -z-10" />

  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
    
    {/* LEFT – Illustration */}
    <div className="relative flex justify-center">
      <div className="absolute -left-10 -top-10 w-72 h-72 bg-purple-100 rounded-3xl -z-10" />
      
      <Image
        src={IdeaImg}
        alt="Design preview"
        className="rounded-2xl shadow-xl"
      />
    </div>

    {/* RIGHT – Content */}
    <div>
      <h2 className="text-4xl font-bold mb-6">
        Free and easy way to <br />
        bring your ideas to life
      </h2>

      <p className="text-gray-500 max-w-md mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Quisque convallis consequat.
      </p>

      <button className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition">
        Get Started
      </button>
    </div>

  </div>
</section>
 <Footer/>
    </>
  );
}
