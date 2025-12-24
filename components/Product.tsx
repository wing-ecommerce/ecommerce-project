// types/product.ts
// Product.ts
import { StaticImageData } from "next/image";

export type BadgeType = "new" | "hot" | "sell";

export type Product = {
  id: number;
  title: string;
  price: string;
  image: StaticImageData;
  badge?: BadgeType;
};

