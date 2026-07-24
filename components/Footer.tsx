"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";

// Pages that show the decorative line behind the footer.
const LINE_ROUTES = ["/", "/about"];

export default function Footer() {
  const pathname = usePathname();
  const showLine = LINE_ROUTES.includes(pathname);

  return (
    <footer className={styles.footer}>
      {showLine && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src="/assets/line1.png" alt="" className={styles.line} />
      )}

      <div className={styles.inner}>
        <p className={styles.copy}>© Rb Boards - 2025</p>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.instagram}
          aria-label="Rb Boards on Instagram"
        >
          <Image src="/assets/instagram.svg" alt="" width={30} height={30} />
        </a>

        <p className={styles.credit}>
          <span>designed and developed by</span>
          <a
            href="https://monomstud.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.studio}
          >
            monom studio
          </a>
        </p>
      </div>
    </footer>
  );
}
