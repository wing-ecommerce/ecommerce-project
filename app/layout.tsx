"use client";

import "./globals.css";
import Navbar from "../components/layout/Navbar";
import CardCheckOut from "@/components/CardCheckOut";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProductPage = pathname === "/product";

  // Example state for CardCheckOut
  const [isOpen, setIsOpen] = useState(true);
  const [product, setProduct] = useState(null); // replace with real product data

  const handleClose = () => setIsOpen(false);

  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen flex">
          <div className="flex-1">{children}</div>

          {isProductPage && (
            <aside className="w-80">
              <CardCheckOut
                product={product}
                isOpen={isOpen}
                onClose={handleClose}
              />
            </aside>
          )}
        </main>
      </body>
    </html>
  );
}
