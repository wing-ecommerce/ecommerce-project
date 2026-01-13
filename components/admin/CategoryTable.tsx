'use client';

import { Category } from "./CategoryForm";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <tbody>
            <tr>
              <td colSpan={3} className="px-8 py-12 text-center text-gray-500">
                No categories yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Slug</th>
            <th className="px-8 py-5 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr
              key={cat.id}
              className={`hover:bg-green-50/30 ${index !== 0 ? "border-t border-gray-200/30" : ""}`}
            >
              <td className="px-8 py-6 font-semibold text-gray-800">{cat.name}</td>
              <td className="px-8 py-6 text-gray-500">{cat.slug}</td>
              <td className="px-8 py-6 text-right space-x-2">
                <button
                  onClick={() => onEdit(cat)}
                  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(cat.id)}
                  className="px-4 py-2 rounded-xl bg-red-100 text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
