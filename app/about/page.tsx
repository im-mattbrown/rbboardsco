import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Rb Boards Co",
  description: "The story behind Rb Boards Co. Hand crafted in Newcastle, CA.",
};

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

export default function AboutPage() {
  return (
    <main>
      {/* ---------- Banner ---------- */}
      <section className={styles.banner}>
        <Image
          src="/assets/about-hero.png"
          alt="Ric and family at the beach"
          fill
          priority
          sizes="100vw"
          className={styles.bannerImg}
        />
        <div className={styles.bannerOverlay} />
      </section>

      {/* ---------- Meet Ric ---------- */}
      <section className={styles.meet}>
        <div className="container">
          <div className={styles.meetGrid}>
            <div className={styles.meetText}>
              <h1 className={styles.meetTitle}>Meet Ric</h1>
              <p>
                Ric was raised in the Sacramento area and then went to Los Angeles and San Francisco with his career with Pacific Bell. He returned to the Sacramento area where he led a National sales team in the software industry. Ric retired in 2014 and move to a small ranch in Newcastle and built a workshop and garage for his two main passions, his woodworking and fishing. Ric became a member of the Auburn Woodworkers Guild and has learned and refined his skills with input from great woodworkers. Ric has been married to his wife Alice for 48 years and has 2 wonderful children (Cortnee and Matthew) and one grandson Mason!
              </p>
              <p>
                Woodworking has always been a keen interest of Ric's and he initially began helping his wife Alice in her antiques shop by building items with reclaimed wood and helping refinish antique furniture. After joining the woodworkers guild, Ric learned many of the skills he now uses to build the unique products that are shown on this website. These items are mnade of the highest quality and are affordable and uniques gifts that are both beautiful and useful.  
              </p>
            </div>

            <div className={styles.collage}>
              <div className={styles.collageLarge}>
                <Image
                  src="/assets/meet-large.png"
                  alt="Ric out fishing"
                  width={368}
                  height={294}
                  className={styles.cover}
                />
              </div>
              <div className={styles.collageGrid}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={styles.collageCell}>
                    <Image
                      src={`/assets/meet-grid-${n}.png`}
                      alt=""
                      width={140}
                      height={140}
                      className={styles.cover}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.collageWide}>
                <Image
                  src="/assets/meet-wide.png"
                  alt="A display of hand crafted boards"
                  width={680}
                  height={294}
                  className={styles.cover}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our Values ---------- */}
      <section className={styles.values}>
        <div className="container">
          <h2 className={styles.valuesTitle}>Our Values</h2>

          <div className={styles.valuesGrid}>
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
    </main>
  );
}
