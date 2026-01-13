'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/types/product';
import { X } from 'lucide-react';
import CategoryForm from './CategoryForm';

interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductForm({ product, categories, onSubmit, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    originalPrice: product?.originalPrice.toString() || '',
    discount: product?.discount.toString() || '0',
    price: product?.price.toString() || '', // auto-calculated
    image: product?.image || '',
    additionalPhotos: product?.additionalPhotos || [],
    description: product?.description || '',
    inStock: product?.inStock !== undefined ? product.inStock : true,
    sizes: product?.sizes || [],
    categoryId: product?.categoryId || '',
  });

  const [localCategories, setLocalCategories] = useState<Category[]>(categories);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [photoInput, setPhotoInput] = useState('');
  const [toast, setToast] = useState('');
  const [showToast, setShowToast] = useState(false);

  /* ---------------- SYNC ---------------- */
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  /* ---------------- TOAST ---------------- */
  const triggerToast = (message: string) => {
    setToast(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  /* ---------------- CATEGORY CRUD ---------------- */
  const handleSaveCategory = async (data: Category) => {
    const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
    const method = editingCategory ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        triggerToast(err?.error || 'Failed to save category ❌');
        return;
      }

      triggerToast(editingCategory ? 'Category updated ✅' : 'Category created ✅');
      setEditingCategory(null);
      setShowCategoryForm(false);
    } catch (err) {
      console.error(err);
      triggerToast('Unexpected error ❌');
    }
  };

  /* ---------------- FORM HELPERS ---------------- */
  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const calculatePrice = (original: string, discount: string) => {
    const orig = parseFloat(original) || 0;
    const disc = parseFloat(discount) || 0;
    return (orig * (1 - disc / 100)).toFixed(2);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => {
        let updated = { ...prev, [name]: value };

        if (name === 'originalPrice' || name === 'discount') {
          updated.price = calculatePrice(updated.originalPrice, updated.discount);
        }

        if (name === 'name' && !product) {
          updated.slug = generateSlug(value);
        }

        return updated;
      });
    }
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleAddPhoto = () => {
    if (photoInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        additionalPhotos: [...prev.additionalPhotos, photoInput.trim()],
      }));
      setPhotoInput('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalPhotos: prev.additionalPhotos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition';

  return (
    <>
      {/* Toast Popup */}
     {showToast && (
  <div className="absolute top-4 right-4 z-50 bg-green-500 text-white px-5 py-3 rounded-xl shadow-lg animate-slide-down">
    {toast}
  </div>
)}

      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-6 py-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter product name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        required
                        placeholder="product-url-slug"
                        className={inputClass}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.categoryId}
                        required
                        disabled={showCategoryForm}
                        className={inputClass + ' md:col-span-2'}
                        onChange={(e) => {
                          if (e.target.value === 'add-new') {
                            setShowCategoryForm(true);
                            return;
                          }
                          setFormData((prev) => ({ ...prev, categoryId: e.target.value }));
                        }}
                      >
                        <option value="">Select category</option>
                        {localCategories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                        <option disabled>──────────</option>
                        <option value="add-new">➕ Add New Category</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                {/* ... (keep your pricing, images, description, and sizes sections unchanged) */}
                 {/* Pricing */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Original Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="originalPrice"
                          value={formData.originalPrice}
                          onChange={handleChange}
                          required
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 "
                          // className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Discount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount (%) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleChange}
                          required
                          min="0"
                          max="100"
                          placeholder="0"
                          className={inputClass}
                        />
                        {/* <span className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500">%</span> */}
                      </div>
                    </div>

                    {/* Final Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          readOnly
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Images</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Main Image URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      required
                      placeholder="https://example.com/image.jpg"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Photos</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="url"
                        value={photoInput}
                        onChange={(e) => setPhotoInput(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={handleAddPhoto}
                        className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
                      >
                        Add
                      </button>
                    </div>
                    {formData.additionalPhotos.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.additionalPhotos.map((photo, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 text-sm"
                          >
                            <span className="text-gray-600 truncate max-w-[200px]">
                              {photo.substring(0, 30)}...
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(index)}
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Enter product description..."
                    className={inputClass + ' resize-none'}
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Variants & Stock</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Available Sizes</label>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`px-5 py-2.5 rounded-lg font-medium transition ${
                            formData.sizes.includes(size)
                              ? 'bg-green-500 text-white border-2 border-green-500'
                              : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="inStock"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="h-5 w-5 text-green-500 focus:ring-green-400 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer">
                      In Stock
                    </label>
                   </div>
                 </div>
              </form>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium shadow-md"
              >
                {product ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Form */}
      {showCategoryForm && (
        <CategoryForm
          category={editingCategory}
          onClose={() => setShowCategoryForm(false)}
          onSave={(newCategory) => {
            // Prevent duplicate category
            const exists = localCategories.find(
              (c) => c.name.toLowerCase() === newCategory.name.toLowerCase()
            );
            if (exists && !editingCategory) {
              triggerToast('Category already exists ❌');
              return;
            }

            handleSaveCategory(newCategory);
            setLocalCategories((prev) => {
              const exist = prev.find((c) => c.id === newCategory.id);
              if (exist) return prev.map((c) => (c.id === newCategory.id ? newCategory : c));
              return [...prev, newCategory];
            });
            setFormData((prev) => ({ ...prev, categoryId: newCategory.id }));
            setShowCategoryForm(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* Tailwind animation style */}
      <style jsx>{`
        @keyframes slide-down {
          0% {
            opacity: 1;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';
// import { Product, Category } from '@/types/product';
// import CategoryForm from './CategoryForm';

// interface ProductFormProps {
//   product: Product | null;
//   categories: Category[];
//   onSubmit: (data: any) => void;
//   onClose: () => void;
// }

// const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// export default function ProductForm({
//   product,
//   categories,
//   onSubmit,
//   onClose,
// }: ProductFormProps) {
//   const [formData, setFormData] = useState({
//     name: product?.name || '',
//     slug: product?.slug || '',
//     originalPrice: product?.originalPrice?.toString() || '',
//     discount: product?.discount?.toString() || '0',
//     price: product?.price?.toString() || '',
//     image: product?.image || '',
//     additionalPhotos: product?.additionalPhotos || [],
//     description: product?.description || '',
//     inStock: product?.inStock ?? true,
//     sizes: product?.sizes || [],
//     categoryId: product?.categoryId || '',
//   });

//   const [localCategories, setLocalCategories] = useState<Category[]>(categories);
//   const [showCategoryForm, setShowCategoryForm] = useState(false);
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);
//   const [photoInput, setPhotoInput] = useState('');

//   useEffect(() => {
//     setLocalCategories(categories);
//   }, [categories]);

//   /* ---------------- HELPERS ---------------- */
//   const generateSlug = (value: string) =>
//     value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

//   const calculatePrice = (original: string, discount: string) => {
//     const o = parseFloat(original) || 0;
//     const d = parseFloat(discount) || 0;
//     return (o * (1 - d / 100)).toFixed(2);
//   };

//   /* ---------------- HANDLERS ---------------- */
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value, type } = e.target;

//     if (type === 'checkbox') {
//       setFormData((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
//       return;
//     }

//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };

//       if (name === 'originalPrice' || name === 'discount') {
//         updated.price = calculatePrice(updated.originalPrice, updated.discount);
//       }

//       if (name === 'name' && !product) {
//         updated.slug = generateSlug(value);
//       }

//       return updated;
//     });
//   };

//   const handleSizeToggle = (size: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       sizes: prev.sizes.includes(size)
//         ? prev.sizes.filter((s) => s !== size)
//         : [...prev.sizes, size],
//     }));
//   };
//   const [toast, setToast] = useState(""); 
//    const [showToast, setShowToast] = useState(false);
//   const triggerToast = (message: string) => {
//     setToast(message);
//     setShowToast(true);
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const handleAddPhoto = () => {
//     if (!photoInput.trim()) return;
//     setFormData((prev) => ({
//       ...prev,
//       additionalPhotos: [...prev.additionalPhotos, photoInput.trim()],
//     }));
//     setPhotoInput('');
//   };

//   const handleRemovePhoto = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       additionalPhotos: prev.additionalPhotos.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   /* ---------------- UI ---------------- */
//   const inputClass =
//     'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition';

//   return (
//     <>
//       {/* Backdrop */}
//       <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="bg-green-500 px-6 py-4 flex justify-between items-center">
//             <h2 className="text-xl font-bold text-white">
//               {product ? 'Edit Product' : 'Add New Product'}
//             </h2>
//             <button onClick={onClose} className="text-white">
//               <X />
//             </button>
//           </div>

//           {/* Body */}
//           <form
//             onSubmit={handleSubmit}
//             className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 space-y-6"
//           >
//             {/* Basic Info */}
//             <div className="bg-gray-50 p-5 rounded-xl">
//               <h3 className="font-semibold mb-4">Basic Information</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Product name"
//                   className={inputClass}
//                   required
//                 />
//                 <input
//                   name="slug"
//                   value={formData.slug}
//                   onChange={handleChange}
//                   placeholder="Slug"
//                   className={inputClass}
//                   required
//                 />
//                 <select
//                   value={formData.categoryId}
//                   className={`${inputClass} md:col-span-2`}
//                   onChange={(e) => {
//                     if (e.target.value === 'add-new') {
//                       setShowCategoryForm(true);
//                       return;
//                     }
//                     setFormData((p) => ({ ...p, categoryId: e.target.value }));
//                   }}
//                   required
//                 >
//                   <option value="">Select category</option>
//                   {localCategories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                   <option disabled>──────────</option>
//                   <option value="add-new">➕ Add New Category</option>
//                 </select>
//               </div>
//             </div>

//             {/* Pricing */}
//             {/* Pricing */}
// <div className="bg-gray-50 p-5 rounded-xl">
//   <h3 className="font-semibold mb-4">Pricing</h3>

//   <div className="grid md:grid-cols-3 gap-4">
//     {/* Original Price */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Original Price
//       </label>
//       <input
//         type="number"
//         name="originalPrice"
//         value={formData.originalPrice}
//         onChange={handleChange}
//         placeholder="0.00"
//         className={inputClass}
//       />
//     </div>

//     {/* Discount */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Discount (%)
//       </label>
//       <input
//         type="number"
//         name="discount"
//         value={formData.discount}
//         onChange={handleChange}
//         placeholder="0"
//         className={inputClass}
//       />
//     </div>

//     {/* Final Price */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Final Price
//       </label>
//       <input
//         type="number"
//         value={formData.price}
//         readOnly
//         placeholder="0.00"
//         className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
//       />
//     </div>
//   </div>
// </div>


//             {/* Images */}
//             <div className="bg-gray-50 p-5 rounded-xl">
//               <h3 className="font-semibold mb-4">Images</h3>
//               <input
//                 name="image"
//                 value={formData.image}
//                 onChange={handleChange}
//                 placeholder="Main image URL"
//                 className={inputClass}
//               />
//               <div className="flex gap-2 mt-3">
//                 <input
//                   value={photoInput}
//                   onChange={(e) => setPhotoInput(e.target.value)}
//                   placeholder="Additional image URL"
//                   className={inputClass}
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddPhoto}
//                   className="bg-green-500 text-white px-5 rounded-lg"
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>

//             {/* Description */}
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Product description"
//               rows={4}
//               className={inputClass}
//             />

//             {/* Sizes & Stock */}
//             <div className="bg-gray-50 p-5 rounded-xl">
//               <h3 className="font-semibold mb-4">Sizes & Stock</h3>
//               <div className="flex gap-2 flex-wrap mb-4">
//                 {SIZES.map((s) => (
//                   <button
//                     key={s}
//                     type="button"
//                     onClick={() => handleSizeToggle(s)}
//                     className={`px-4 py-2 rounded-lg border ${
//                       formData.sizes.includes(s)
//                         ? 'bg-green-500 text-white'
//                         : 'bg-white'
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 ))}
//               </div>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   name="inStock"
//                   checked={formData.inStock}
//                   onChange={handleChange}
//                 />
//                 In Stock
//               </label>
//             </div>
//           </form>

//           {/* Footer */}
//           <div className="p-4 border-t flex justify-end gap-3">
//             <button onClick={onClose} className="px-5 py-2 border rounded-lg">
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="px-6 py-2 bg-green-500 text-white rounded-lg"
//             >
//               {product ? 'Update' : 'Create'}
//             </button>
//           </div>
//         </div>
//       </div>
//   {/* Category Form */}
//        {showCategoryForm && (
//         <CategoryForm
//           category={editingCategory}
//           onClose={() => setShowCategoryForm(false)}
//           onSave={(newCategory) => {
//             // Prevent duplicate category
//             const exists = localCategories.find(
//               (c) => c.name.toLowerCase() === newCategory.name.toLowerCase()
//             );
//             if (exists && !editingCategory) {
//               triggerToast('Category already exists ❌');
//               return;
//             }
//             const handleSaveCategory = async (data: Category) => {
//     const url = editingCategory ? `/api/categories/${editingCategory.id}` : '/api/categories';
//     const method = editingCategory ? 'PUT' : 'POST';

//       try {
//         const res = await fetch(url, {
//           method,
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(data),
//         });

//         if (!res.ok) {
//           const err = await res.json();
//           triggerToast(err?.error || 'Failed to save category ❌');
//           return;
//       }

//             handleSaveCategory(newCategory);
//             setLocalCategories((prev) => {
//               const exist = prev.find((c) => c.id === newCategory.id);
//               if (exist) return prev.map((c) => (c.id === newCategory.id ? newCategory : c));
//               return [...prev, newCategory];
//             });
//             setFormData((prev) => ({ ...prev, categoryId: newCategory.id }));
//             setShowCategoryForm(false);
//             setEditingCategory(null);
//           }}
//         />
//       )}

//       {/* Tailwind animation style */}
//       <style jsx>{`
//         @keyframes slide-down {
//           0% {
//             opacity: 1;
//             transform: translateY(-20px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-down {
//           animation: slide-down 0.3s ease-out forwards;
//         }
//       `}</style>
//         </>
//   );
// }


