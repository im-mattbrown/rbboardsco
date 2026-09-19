"use client";

import Image from "next/image";
import { useEffect } from "react";
import styles from "./ProductModal.module.css";
import type { Product } from "./ProductCard";

export default function ProductModal({
  open,
  product,
  onClose,
  onInquire,
}: {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onInquire: (product: Product) => void;
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <span className={styles.index}>
          {String(product.id).padStart(2, "0")}
        </span>

        <h2 id="product-modal-title" className={styles.title}>
          {product.title}
        </h2>

        <div className={styles.thumb}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 90vw, 560px"
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
      </div>
    </div>
  );
}
