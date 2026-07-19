"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import RevealText from "@/components/RevealText";
import styles from "./page.module.css";

const VALUES = [
  {
    img: "/assets/value-1.png",
    title: "Sustainability",
    text: "We source only high quality, sustainable wood products for our materials. These are purchased from local vendors here in Newcastle, CA and those vendors buy from ethical wood producers.",
    corner: "tl",
  },
  {
    img: "/assets/value-2.png",
    title: "Supporting Local",
    text: "All of our woodwork products are hand crafted right here in our garage. We take the time to build our projects from raw materials, often using 4 or more different hard woods.",
    corner: "",
  },
  {
    img: "/assets/value-3.png",
    title: "One of a Kind",
    text: "Each of our cutting boards, pizza boards and other projects are unique. No board you purchase will be like any other board we make. All our products are food grade safe as well.",
    corner: "br",
  },
];

export default function ValuesSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Single trigger: drives both the "Our Values" reveal and the value-title wipes
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.values}>
      <div className="container">
        <div ref={titleRef}>
          <RevealText
            text="Our Values"
            className={styles.valuesTitle}
            active={active}
          />
        </div>

        <div
          className={`${styles.valuesGrid} ${active ? styles.inView : ""}`}
        >
          {VALUES.map((v) => (
            <article key={v.title} className={styles.value}>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueText}>{v.text}</p>
            </article>
          ))}
          {VALUES.map((v) => (
            <div
              key={`${v.title}-img`}
              className={`${styles.valueImageWrap} ${
                v.corner === "tl"
                  ? styles.cornerTL
                  : v.corner === "br"
                  ? styles.cornerBR
                  : ""
              }`}
            >
              <Image
                src={v.img}
                alt={v.title}
                width={360}
                height={360}
                className={styles.cover}
              />
            </div>
          ))}
        </div>

        <div className={styles.valuesCta}>
          <Link href="/shop" className="btn">
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
