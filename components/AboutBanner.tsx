"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import styles from "./AboutBanner.module.css";

// Absolute document offset of an element (independent of scroll position).
function docTop(el: HTMLElement) {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
}

export default function AboutBanner() {
  const imgRef = useRef<HTMLDivElement>(null);

  // Fade the image 1 -> 0 as the "Meet Ric" title scrolls up to the top.
  useLenis((lenis: { scroll: number }) => {
    const wrap = imgRef.current;
    const target = document.getElementById("meet-ric-title");
    if (!wrap || !target) return;
    const end = docTop(target);
    const progress = end > 0 ? Math.min(Math.max(lenis.scroll / end, 0), 1) : 1;
    wrap.style.opacity = String(1 - progress);
  });

  return (
    <section className={styles.banner}>
      <div ref={imgRef} className={styles.bannerImgWrap}>
        <Image
          src="/assets/about-hero.png"
          alt="Ric and family at the beach"
          fill
          priority
          sizes="100vw"
          className={styles.bannerImg}
        />
      </div>
      <div className={styles.bannerOverlay} />
    </section>
  );
}
