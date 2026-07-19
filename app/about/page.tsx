import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";
import AboutBanner from "@/components/AboutBanner";
import RevealText from "@/components/RevealText";
import ValuesSection from "./ValuesSection";

export const metadata: Metadata = {
  title: "About — Rb Boards Co",
  description: "The story behind Rb Boards Co. Hand crafted in Newcastle, CA.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ---------- Banner (image fades out on scroll) ---------- */}
      <AboutBanner />

      {/* ---------- Meet Ric ---------- */}
      <section className={styles.meet}>
        <div className="container">
          <div className={styles.meetGrid}>
            <div className={styles.meetText}>
              <RevealText
                as="h1"
                id="meet-ric-title"
                text="Meet Ric"
                className={styles.meetTitle}
              />
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
      <ValuesSection />
    </main>
  );
}
