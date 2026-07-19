"use client";

import { useState } from "react";
import ProductCard, { type Product } from "./ProductCard";
import InquiryModal from "./InquiryModal";
import styles from "./ShopGrid.module.css";

// 13 products — edit each object to customize that card.
const PRODUCTS: Product[] = [
  {
    id: 1,
    image: "/assets/RB-Boards-16.png",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 2,
    image: "/assets/RB-Boards-17.png",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 3,
    image: "/assets/RB-Boards-14.png",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 4,
    image: "/assets/RB-Boards-15.png",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 5,
    image: "/assets/RB-Boards-5.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 6,
    image: "/assets/RB-Boards-6.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 7,
    image: "/assets/RB-Boards-7.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 8,
    image: "/assets/RB-Boards-8.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 9,
    image: "/assets/RB-Boards-9.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 10,
    image: "/assets/RB-Boards-10.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 11,
    image: "/assets/RB-Boards-11.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 12,
    image: "/assets/RB-Boards-12.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 13,
    image: "/assets/RB-Boards-13.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 14,
    image: "/assets/RB-Boards-1.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 15,
    image: "/assets/RB-Boards-2.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 16,
    image: "/assets/RB-Boards-3.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
  {
    id: 17,
    image: "/assets/RB-Boards-4.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
  },
];

export default function ShopGrid() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onInquire={setActiveProduct}
          />
        ))}
      </div>

      <InquiryModal
        open={activeProduct !== null}
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  );
}
