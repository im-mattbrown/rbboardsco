"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const LINKS = [
  { href: "/shop", label: "Shop", match: "/shop" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/contact", label: "Contact", match: "/contact" },
];

// Pages with a light background at the top need dark header text/logo.
const DARK_HEADER_ROUTES = ["/contact", "/shop"];

export default function Header() {
  const pathname = usePathname();
  const dark = DARK_HEADER_ROUTES.includes(pathname);

  return (
    <header className={`${styles.header} ${dark ? styles.dark : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Rb Boards — home">
          <Image
            src="/assets/logo.svg"
            alt="Rb Boards Co"
            width={56}
            height={56}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map((link) => {
            const active = link.match !== null && pathname === link.match;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={active ? styles.active : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
