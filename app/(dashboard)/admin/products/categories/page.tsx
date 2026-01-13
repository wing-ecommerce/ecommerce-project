"use client";

import { useEffect, useState } from "react";
import CategoryForm, { Category } from "../../../../../components/admin/CategoryForm";
import CategoryTable from "../../../../../components/admin/CategoryTable";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [toast, setToast] = useState(""); 
  const [showToast, setShowToast] = useState(false); 

  const triggerToast = (message: string) => {
    setToast(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      triggerToast("Failed to load categories ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        triggerToast("Category deleted ✅");
      } else {
        triggerToast("Delete failed ❌");
      }
    } catch (err) {
      console.error(err);
      triggerToast("Delete failed ❌");
    }
  };

  const handleSave = async (data: Category) => {
    const url = editingCategory ? `/api/categories/${editingCategory.id}` : "/api/categories";
    const method = editingCategory ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        triggerToast(err?.error || "Failed to save category ❌");
        return;
      }

      setIsModalOpen(false);
      setEditingCategory(null);
      fetchCategories();
      triggerToast(editingCategory ? "Category updated ✅" : "Category created ✅");
    } catch (err) {
      console.error(err);
      triggerToast("Unexpected error ❌");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;

  return (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto relative">
      {/* Toast */}
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all duration-300 z-50 ${
          showToast ? "opacity-100 translate-y-0 bg-green-600" : "opacity-0 -translate-y-10"
        }`}
      >
        {toast}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Categories</h1>
        <button
          onClick={openCreate}
          className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
        >
          + Add Category
        </button>
      </div>

      {/* Categories Table Component */}
      <CategoryTable
        categories={categories}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {isModalOpen && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

