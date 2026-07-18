"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./GallerySlider.module.css";

type Slide = {
  id: number;
  image: string;
  title: string;
  price: string;
  sold: boolean;
  dimensions: string;
  materials: string;
  href: string;
};

// 10 slides — edit each object below to customize that card.
// Drop board images in /public/assets and point `image` at them.
const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/assets/RB-Boards-9.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: true,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 2,
    image: "/assets/RB-Boards-3.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 3,
    image: "/assets/RB-Boards-2.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 4,
    image: "/assets/RB-Boards-1.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 5,
    image: "/assets/RB-Boards-4.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 6,
    image: "/assets/RB-Boards-5.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 7,
    image: "/assets/RB-Boards-6.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 8,
    image: "/assets/RB-Boards-7.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 9,
    image: "/assets/RB-Boards-8.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
  {
    id: 10,
    image: "/assets/RB-Boards-12.jpg",
    title: "Placeholder Title",
    price: "$200",
    sold: false,
    dimensions: "36” × 22” × 2”",
    materials: "Rosewood, Purple Heart, Teak",
    href: "/#gallery",
  },
];

const STRIP_MIN = 40; // collapsed card width (px) at the low end
const STRIP_MAX = 68; // collapsed card width (px) at the high end (matches Figma ratio)
const MOBILE_BP = 640; // below this, show only the active card full-width

type Dims = { strip: number; activeW: number; height: number; mobile: boolean };

export default function GallerySlider() {
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState<Dims>({
    strip: STRIP_MAX,
    activeW: 496,
    height: 496,
    mobile: false,
  });
  const rowRef = useRef<HTMLDivElement>(null);

  // Keep the active card square by deriving sizes from the row's width.
  const measure = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    const W = el.clientWidth;

    if (W < MOBILE_BP) {
      setDims({ strip: 0, activeW: W, height: W, mobile: true });
      return;
    }
    const collapsedCount = SLIDES.length - 1;
    const strip = Math.max(STRIP_MIN, Math.min(STRIP_MAX, W * 0.066));
    const activeW = W - strip * collapsedCount;
    setDims({ strip, activeW, height: activeW, mobile: false });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const go = (dir: number) =>
    setActive((a) => (a + dir + SLIDES.length) % SLIDES.length);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <h2 className={styles.title}>Gallery</h2>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label="Previous board"
            className={styles.arrow}
            onClick={() => go(-1)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M11 3L5 9l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next board"
            className={styles.arrow}
            onClick={() => go(1)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M7 3l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div ref={rowRef} className={styles.row} style={{ height: dims.height }}>
        {SLIDES.map((slide, i) => {
          const isActive = i === active;
          const style = dims.mobile
            ? undefined
            : { width: isActive ? dims.activeW : dims.strip };

          return (
            <div
              key={slide.id}
              className={`${styles.card} ${
                isActive ? styles.active : styles.collapsed
              }`}
              style={style}
              role="button"
              tabIndex={0}
              aria-label={`Board ${slide.id}`}
              aria-expanded={isActive}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <span className={styles.index}>
                {String(slide.id).padStart(2, "0")}
              </span>

              <div className={styles.details} aria-hidden={!isActive}>
                <h3 className={styles.cardTitle}>{slide.title}</h3>

                <div className={styles.thumb}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={496}
                    height={344}
                    sizes="(max-width: 640px) 90vw, 40vw"
                    className={styles.thumbImg}
                  />
                </div>

                <p className={styles.price}>
                  <span className={styles.priceLabel}>Price</span>
                  <span
                    className={slide.sold ? styles.priceSold : undefined}
                  >
                    {slide.price}
                  </span>
                  {slide.sold && <span className={styles.soldTag}>Sold</span>}
                </p>

                <ul className={styles.specs}>
                  <li>Dimensions: {slide.dimensions}</li>
                  <li>Materials: {slide.materials}</li>
                </ul>

                <Link
                  href={slide.href}
                  className={styles.viewBtn}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={isActive ? 0 : -1}
                >
                  View in Store
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
