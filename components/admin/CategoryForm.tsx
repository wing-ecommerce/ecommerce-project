'use client';

import { useState, useEffect } from "react";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

interface CategoryFormProps {
  category?: Category | null;
  onClose: () => void;
  onSave: (data: Category) => void;
}

export default function CategoryForm({ category, onClose, onSave }: CategoryFormProps) {
  const [formData, setFormData] = useState<Category>({
    id: category?.id || "",
    name: category?.name || "",
    slug: category?.slug || "",
  });

  // Auto-generate slug
  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  useEffect(() => {
    if (category) setFormData(category);
  }, [category]);

  const handleChange = (name: string, value: string) => {
    const slug = name === "name" ? generateSlug(value) : formData.slug;
    const id = slug; // optionally use slug as ID
    setFormData({ ...formData, [name]: value, slug, id });
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        <input
          className="w-full border px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Category name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <p className="text-sm text-gray-500 mb-4">
          ID: <b>{formData.id}</b> <br />
          Slug: <b>{formData.slug}</b>
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
