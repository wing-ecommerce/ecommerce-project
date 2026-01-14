"use client";

import { useEffect, useState } from "react";
import { Product, Category } from "@/types/product";
import ProductForm from "../../../../../components/admin/ProductForm";
import ProductTable from "../../../../../components/admin/ProductTable";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      setProducts(await res.json());
    } catch {
      triggerToast("Failed to load products ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      triggerToast("Product deleted ✅");
    } else {
      triggerToast("Delete failed ❌");
    }
  };

  const handleSubmit = async (formData: any) => {
    const url = editingProduct
      ? `/api/products/${editingProduct.id}`
      : "/api/products";

    const method = editingProduct ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      triggerToast("Save failed ❌");
      return;
    }

    fetchProducts();
    setIsModalOpen(false);
    setEditingProduct(null);
    triggerToast(editingProduct ? "Product updated ✅" : "Product created ✅");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto relative">
      {/* Toast */}
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all z-50
          ${
            showToast
              ? "opacity-100 translate-y-0 bg-green-600"
              : "opacity-0 -translate-y-10"
          }`}
      >
        {toast}
      </div>

     
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
        >
          + Add Product
        </button>
      </div>

      {/* Table Card (SAME style) */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <ProductTable
          products={products}
          onEdit={(p) => {
            setEditingProduct(p);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal (SAME overlay & container style) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-2xl">
            <ProductForm
              product={editingProduct}
              categories={categories}
              onSubmit={handleSubmit}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
