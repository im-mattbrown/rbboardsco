"use client";

import { useEffect, useState } from "react";

const DESKTOP_SRC = "https://matte-cdn.b-cdn.net/RBBOARDS_Desktop.mp4";
const MOBILE_SRC = "https://matte-cdn.b-cdn.net/RBBOARDS_Mobile.mp4";
const MOBILE_QUERY = "(max-width: 640px)";

export default function HeroVideo({ className }: { className?: string }) {
  // Chosen on the client so only the matching video downloads (not both).
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setSrc(mq.matches ? MOBILE_SRC : DESKTOP_SRC);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <video
      // Remount when the source changes so it reloads and autoplays.
      key={src ?? "pending"}
      className={className}
      poster="/assets/hero.png"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      {...(src ? { src } : {})}
    />
  );
}
