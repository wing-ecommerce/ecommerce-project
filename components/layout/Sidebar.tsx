
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  UserPlus,
  ExternalLink,
  Box,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const menu = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  {
    href: "/admin/products",
    label: "Products",
    icon: Package,
    subMenu: [
      { href: "/admin/products/productlist", label: "Product List" },
      { href: "/admin/products/categories", label: "Categories" },
    ],
  },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({
    "/admin/products": true,
  });

  const toggleMenu = (href: string) => {
    setOpenMenus((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const isActive = (href: string) => pathname === href;
  const isSubActive = (subs: any[]) =>
    subs.some((s) => pathname === s.href);

  return (
    <aside className="w-64 h-screen flex flex-col bg-white dark:bg-gray-900 border-r border-gray-300/30 dark:border-white/10 sticky top-0">
      {/* ===== Header ===== */}
      <div className="p-6 border-b border-gray-300/30 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-600 rounded-lg shadow-md">
            <Box className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Admin Panel
          </h2>
        </div>
      </div>

      {/* ===== Menu ===== */}
      <div className="flex-1 py-4">
        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;

            /* ===== With Submenu ===== */
            if (item.subMenu) {
              const parentActive = isSubActive(item.subMenu);

              return (
                <div key={item.href}>
                  <button
                    onClick={() => toggleMenu(item.href)}
                    className={`w-full flex items-center justify-between px-6 py-3 rounded-lg transition-all duration-200
                      ${
                        parentActive
                          ? "bg-green-600 text-white shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </div>
                    {openMenus[item.href] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {openMenus[item.href] && (
                    <div className="ml-10 mt-1 space-y-1 border-l border-gray-300/30 dark:border-white/10 pl-4 animate-fade-in">
                      {item.subMenu.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-4 py-2 rounded-lg text-sm transition-all
                            ${
                              isActive(sub.href)
                                ? "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 font-medium"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                            }
                          `}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            /* ===== Single Item ===== */
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-200
                  ${
                    isActive(item.href)
                      ? "bg-green-600 text-white shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ===== Bottom ===== */}
      <div className="border-t border-gray-300/30 dark:border-white/10 p-4 space-y-3">
        <Link
          href="/signup"
          className="flex items-center gap-4 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:shadow-[0_0_12px_rgba(239,68,68,0.6)] transition"
        >
          <UserPlus className="w-5 h-5" />
          Sign Up
        </Link>

        <Link
          href="/"
          className="flex items-center gap-4 px-6 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition"
        >
          <ExternalLink className="w-5 h-5" />
          Go to Website
        </Link>
      </div>
    </aside>
  );
}

