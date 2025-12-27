
"use client";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = pathname === "/checkout";

  return (
    <html lang="en">
      <body>
        {!hideLayout && <Navbar />}

        <main className="min-h-screen">
          {children}
        </main>

        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}

