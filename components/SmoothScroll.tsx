"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // smoothing (lower = smoother/slower catch-up)
        duration: 1.2, // wheel scroll duration
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
