"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./RevealText.module.css";

// Splits text into words that rise up into view (masked) when scrolled into view.
export default function RevealText({
  text,
  className,
  as: Tag = "h2",
  id,
  active,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  id?: string;
  // When provided, visibility is controlled externally (self-observes otherwise)
  active?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [selfVisible, setSelfVisible] = useState(false);
  const controlled = active !== undefined;

  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfVisible(true);
          io.disconnect(); // reveal once
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controlled]);

  const visible = controlled ? active : selfVisible;

  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      id={id}
      aria-label={text}
      className={`${styles.reveal} ${visible ? styles.visible : ""}${
        className ? " " + className : ""
      }`}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className={styles.word}>
            <span
              className={styles.wordInner}
              style={{ transitionDelay: `${0.15 + i * 0.15}s` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
