"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProcessVideos.module.css";

const STEPS = [
  {
    n: "01",
    src: "https://matte-cdn.b-cdn.net/rbProcess_01.mp4",
    poster: "/assets/process-1.png",
    text: "Select the appropriate wood pieces, based on size, color and design. Then make an initial glueing to join the different woods together.",
  },
  {
    n: "02",
    src: "https://matte-cdn.b-cdn.net/rbProcess_02.mp4",
    poster: "/assets/process-2.png",
    text: "Overlay the two halves of the cutting board. Make various shapes of freeform cuts and inlay thin full depth hardwood strips to enhance the pattern.",
  },
  {
    n: "03",
    src: "https://matte-cdn.b-cdn.net/rbProcess_03.mp4",
    poster: "/assets/process-3.png",
    text: "The various freeform cuts are repeated 3-4 times to create the unique shapes within each board. The shapes are glued together, planed and sanded to a uniform thickness.",
  },
];

export default function ProcessVideos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);
  const inViewRef = useRef(false);
  const [active, setActive] = useState(0);

  const play = (i: number) => {
    const v = videoRefs.current[i];
    if (!v) return;
    v.play().catch(() => {});
  };

  // Advance to the next video when the current one finishes.
  const handleEnded = (i: number) => {
    const finished = videoRefs.current[i];
    if (finished) {
      finished.pause();
      finished.currentTime = 0; // reset so it shows its opening frame while idle
    }
    const next = (i + 1) % STEPS.length;
    activeRef.current = next;
    setActive(next);
    if (inViewRef.current) play(next);
  };

  // Start when the section scrolls into view; pause when it leaves.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        const current = videoRefs.current[activeRef.current];
        if (!current) return;
        if (entry.isIntersecting) {
          current.play().catch(() => {});
        } else {
          current.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.grid} ref={containerRef}>
      {STEPS.map((step, i) => (
        <article key={step.n} className={styles.step}>
          <span className={styles.stepNum}>{step.n}</span>
          <p className={styles.stepText}>{step.text}</p>
          <div
            className={`${styles.videoWrap} ${
              active === i ? styles.isActive : ""
            } ${i === 0 ? styles.cornerTL : ""} ${
              i === 2 ? styles.cornerBR : ""
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className={styles.video}
              src={step.src}
              poster={step.poster}
              muted
              playsInline
              preload="auto"
              onEnded={() => handleEnded(i)}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
