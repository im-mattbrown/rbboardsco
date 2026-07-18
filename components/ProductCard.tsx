"use client";

import Image from "next/image";
import styles from "./ProductCard.module.css";

export type Product = {
  id: number;
  image: string;
  title: string;
  price: string;
  sold: boolean;
  dimensions: string;
  materials: string;
};

export default function ProductCard({
  product,
  onInquire,
}: {
  product: Product;
  onInquire: (product: Product) => void;
}) {
  return (
    <article className={styles.card}>
      <span className={styles.index}>
        {String(product.id).padStart(2, "0")}
      </span>

      <h3 className={styles.title}>{product.title}</h3>

      <div className={styles.thumb}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 520px) 90vw, (max-width: 768px) 45vw, (max-width: 1100px) 30vw, 22vw"
          className={styles.thumbImg}
        />
      </div>

      <p className={styles.price}>
        <span className={styles.priceLabel}>Price</span>
        <span className={product.sold ? styles.priceSold : undefined}>
          {product.price}
        </span>
        {product.sold && <span className={styles.soldTag}>Sold</span>}
      </p>

      <ul className={styles.specs}>
        <li>Dimensions: {product.dimensions}</li>
        <li>Materials: {product.materials}</li>
      </ul>

      <button
        type="button"
        className={styles.inquireBtn}
        onClick={() => onInquire(product)}
      >
        Inquire
      </button>
    </article>
  );
}
