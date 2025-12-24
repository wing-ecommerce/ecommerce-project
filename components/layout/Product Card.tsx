// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Product } from "./Product";

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ y: -6 }}
//       className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4"
//     >
//       <div className="relative rounded-xl overflow-hidden mb-4">
//         {product.badge && (
//           <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
//             {product.badge}
//           </span>
//         )}

//         <Image
//           src={product.image}
//           alt={product.title}
//           className="w-full h-[400px] object-cover"
//         />
//       </div>

//       <h3 className="text-sm font-semibold mb-1">{product.title}</h3>
//       <p className="text-green-600 font-bold">{product.price}</p>
//     </motion.div>
//   );
// }
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product, BadgeType } from "../Product";

interface ProductCardProps {
  product: Product;
}

/* Badge style map */
const badgeStyles: Record<
  BadgeType,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-blue-500",
  },
  hot: {
    label: "Hot",
    className: "bg-red-500",
  },
  sell: {
    label: "Sale",
    className: "bg-green-500",
  },
};

export default function ProductCard({ product }: ProductCardProps) {
  const badge = product.badge ? badgeStyles[product.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-4"
    >
      <div className="relative rounded-2xl overflow-hidden mb-4">
        {badge && (
          <span
            className={`absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full z-10 ${badge.className}`}
          >
            {badge.label}
          </span>
        )}

        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      <h3 className="text-sm font-semibold mb-1">{product.title}</h3>
      <p className="text-green-600 font-bold">{product.price}</p>
    </motion.div>
  );
}
