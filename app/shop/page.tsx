import type { Metadata } from "next";
import ShopGrid from "@/components/ShopGrid";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop — Rb Boards Co",
  description:
    "Browse our hand crafted, one-of-a-kind wooden boards. Made in Newcastle, CA.",
};

export default function ShopPage() {
  return (
    <main className={styles.page}>
      {/* Decorative background lines (behind the grid) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/lines2.png" alt="" className={styles.linesMid} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/line1.png" alt="" className={styles.linesBottom} />

      <div className="container">
        <h1 className={styles.title}>Shop</h1>
        <p className={styles.subtitle}>
          One-of-a-kind hand crafted boards. See something you like? Send an
          inquiry and we&apos;ll follow up.
        </p>
        <ShopGrid />
      </div>
    </main>
  );
}
