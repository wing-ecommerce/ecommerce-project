'use client';

import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <tbody>
            <tr>
              <td colSpan={6} className="px-8 py-12 text-center text-gray-500">
                No products yet
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
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Image</th>
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Price</th>
            <th className="px-8 py-5 text-left text-sm font-semibold text-gray-700">Stock</th>
            <th className="px-8 py-5 text-right text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="border-t border-gray-200/30">
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`hover:bg-green-50/30 ${index !== 0 ? "border-t border-gray-200/30" : ""}`}
            >
              <td className="px-8 py-6">
                <div className="h-16 w-16">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>
              </td>
              <td className="px-8 py-6 font-semibold text-gray-800">
                {product.name}
                <div className="text-gray-500 text-sm">{product.slug}</div>
              </td>
              <td className="px-8 py-6">
                <span className="px-2 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category.name}
                </span>
              </td>
              <td className="px-8 py-6">
                ${product.price.toFixed(2)}
                {product.discount > 0 && (
                  <div className="text-gray-500 text-sm line-through">
                    ${product.originalPrice.toFixed(2)}
                  </div>
                )}
              </td>
              <td className="px-8 py-6">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                    product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </td>
              <td className="px-8 py-6 text-right space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
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
