"use client";

import { useEffect, useRef, useState } from "react";

// Adds `activeClassName` to a wrapper div once it scrolls into view (once).
export default function InView({
  className,
  activeClassName,
  threshold = 0.3,
  children,
}: {
  className?: string;
  activeClassName?: string;
  threshold?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className ?? ""}${
        inView && activeClassName ? " " + activeClassName : ""
      }`}
    >
      {children}
    </div>
  );
}
