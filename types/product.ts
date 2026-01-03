export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  additionalPhotos: string[];
  description: string;
  inStock: boolean;
  sizes: string[];
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  additionalPhotos: string[];
  description: string;
  inStock: boolean;
  sizes: string[];
  categoryId: string;
}