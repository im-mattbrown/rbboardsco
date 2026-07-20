"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Typewriter.module.css";

export default function Typewriter({
  text,
  speed = 15,
  className,
}: {
  text: string;
  speed?: number; // avg ms per character
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Start typing when the quote scrolls into view (observe the parent so it
  // has real dimensions even before any text is rendered).
  useEffect(() => {
    const el = ref.current?.parentElement ?? ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) return;

    // Vary each keystroke so it feels like a real person typing.
    const prev = text[count - 1] ?? "";
    let delay = speed * (0.5 + Math.random() * 1.2); // jitter around the base
    if (".!?".includes(prev)) delay += 240 + Math.random() * 160; // pause after a sentence
    else if (",;:".includes(prev)) delay += 100 + Math.random() * 90; // shorter pause
    else if (prev === " ") delay += Math.random() * 40; // tiny gap between words

    const timer = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(timer);
  }, [started, count, text, speed]);

  const done = count >= text.length;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {!done && <span className={styles.cursor} aria-hidden />}
    </span>
  );
}
