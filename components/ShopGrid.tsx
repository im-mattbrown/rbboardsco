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
    title: "Woven Charcuterie & Cutting Board",
    price: "$150",
    sold: false,
    dimensions: "12” × 18” × 3/4”",
    materials: "Maple, Black Walnut, Paduck, Purple Heart, Wengue",
  },
  {
    id: 2,
    image: "/assets/RB-Boards-17.png",
    title: "Woven Charcuterie & Cutting Board",
    price: "$150",
    sold: false,
    dimensions: "12” × 18” × 3/4”",
    materials: "Maple, Black Walnut, Paduck, Wengue",
  },
  {
    id: 3,
    image: "/assets/RB-Boards-14.png",
    title: "Woven Cheese Slicer",
    price: "$120",
    sold: false,
    dimensions: "8” × 10” × 1/2”",
    materials: "Maple, Walnut, Paduck",
  },
  {
    id: 4,
    image: "/assets/RB-Boards-15.png",
    title: "Woven Cookbook Holder",
    price: "$160",
    sold: false,
    dimensions: "11” × 12” × 9”",
    materials: "Maple, Black Walnut, Paduck, Purple Heart",
  },
  {
    id: 5,
    image: "/assets/RB-Boards-5.jpg",
    title: "Woven Charcuterie & Cutting Board",
    price: "$150",
    sold: true,
    dimensions: "12” × 18” × 3/4”",
    materials: "Rosewood, Maple, Teak",
  },
  {
    id: 6,
    image: "/assets/RB-Boards-6.jpg",
    title: "Small Striped Cutting Board",
    price: "$100",
    sold: true,
    dimensions: "6” × 8” × 1/2”",
    materials: "Maple, Walnut, Teak",
  },
  {
    id: 7,
    image: "/assets/RB-Boards-7.jpg",
    title: "Checkered Charcuterie Board",
    price: "$160",
    sold: true,
    dimensions: "10” × 18” × 3/4”",
    materials: "Maple, Walnut, Teak",
  },
  {
    id: 8,
    image: "/assets/RB-Boards-8.jpg",
    title: "Pizza Board",
    price: "$160",
    sold: true,
    dimensions: "18” × 20” × 1/2”",
    materials: "Rosewood, Maple, Walnut, Teak",
  },
  {
    id: 9,
    image: "/assets/RB-Boards-9.jpg",
    title: "Woven Charcuterie & Cutting Board",
    price: "$150",
    sold: true,
    dimensions: "12” × 18” × 3/4”",
    materials: "Maple, Paduck, Rosewood",
  },
  {
    id: 10,
    image: "/assets/RB-Boards-10.jpg",
    title: "Wine Bottle & Glass Holder",
    price: "$100",
    sold: true,
    dimensions: "6” × 3” × 1/2”",
    materials: "Maple, Walnut, Teak",
  },
  {
    id: 11,
    image: "/assets/RB-Boards-11.jpg",
    title: "Wine Bottle & Glass Holder",
    price: "$100",
    sold: true,
    dimensions: "6” × 3” × 1/2”",
    materials: "Rosewood, Maple, Teak",
  },
  {
    id: 12,
    image: "/assets/RB-Boards-12.jpg",
    title: "Wine Bottle & Glass Holder",
    price: "$100",
    sold: true,
    dimensions: "6” × 3” × 1/2”",
    materials: "Maple, Walnut, Teak",
  },
  {
    id: 13,
    image: "/assets/RB-Boards-13.jpg",
    title: "Wine Bottle & Glass Holder",
    price: "$100",
    sold: true,
    dimensions: "6” × 3” × 1/2”",
    materials: "Maple, Walnut, Teak",
  },
  {
    id: 14,
    image: "/assets/RB-Boards-1.jpg",
   title: "Woven Charcuterie & Cutting Board",
    price: "$150",
    sold: true,
    dimensions: "12” × 18” × 3/4”",
    materials: "Maple, Paduck, Rosewood",
  },
  {
    id: 15,
    image: "/assets/RB-Boards-2.jpg",
    title: "Striped Cutting Board",
    price: "$150",
    sold: true,
    dimensions: "20” × 16” × 3/4”",
    materials: "Rosewood, Maple, Teak",
  },
  {
    id: 16,
    image: "/assets/RB-Boards-3.jpg",
    title: "Striped Cutting Board",
    price: "$120",
    sold: true,
    dimensions: "14” × 10” × 3/4”",
    materials: "Rosewood, Walnut",
  },
  {
    id: 17,
    image: "/assets/RB-Boards-4.jpg",
    title: "Woven Cutting Board",
    price: "$150",
    sold: true,
    dimensions: "18” × 12” × 3/4”",
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
