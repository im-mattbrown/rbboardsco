import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import ProcessVideos from "@/components/ProcessVideos";
import GallerySlider from "@/components/GallerySlider";
import HeroVideo from "@/components/HeroVideo";
import RevealText from "@/components/RevealText";
import InView from "@/components/InView";

export default function Home() {
  return (
    <main>
      {/* ---------- Hero ---------- */}
      <section className={styles.hero}>
        <HeroVideo className={styles.heroVideo} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1
            className={styles.heroTitle}
            aria-label="Hand Crafted Cutting Boards"
          >
            <span className={styles.word}>
              <span className={styles.wordInner}>Hand</span>
            </span>{" "}
            <span className={styles.word}>
              <span className={styles.wordInner}>Crafted</span>
            </span>{" "}
            <span className={styles.word}>
              <span className={styles.wordInner}>Cutting</span>
            </span>{" "}
            <span className={styles.word}>
              <span className={styles.wordInner}>Boards</span>
            </span>
          </h1>
          <p className={styles.heroSubtitle}>Made in Newcastle, CA</p>
          <span className={styles.heroCtaWrap}>
            <Link href="/shop" className={styles.glassBtn}>
              Shop Now
            </Link>
          </span>
        </div>
      </section>

      {/* ---------- Gallery ---------- */}
      <section id="gallery" className={styles.gallery}>
        <div className="container">
          <GallerySlider />
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <InView
              className={styles.aboutImageFrame}
              activeClassName={styles.inView}
            >
              <div className={styles.aboutImageWrap}>
                <Image
                  src="/assets/about.png"
                  alt="A collection of hand crafted boards and pieces"
                  width={534}
                  height={497}
                  className={styles.aboutImage}
                />
              </div>
              <Image
                src="/assets/rbBoardsText.png"
                alt="RB Boards — Newcastle, CA"
                width={748}
                height={748}
                className={styles.aboutBadge}
              />
            </InView>
            <div className={styles.aboutText}>
              <RevealText text="About" className={styles.sectionTitle} />
              <p>
                  R B Boards is a woodworking company specialzing in unique custome boards and more. The unique products built at R B Boards include classic cutting boards, specialty cutting boards (often used a charquterie boards) and other specialty products. these include custom cookbook holders, candle stick and phone holders. RB Boards used locally sourced hardwoods such a maple, walnut, paduck, purple heart and osage orange. These woods have excellent qualities specifically adept at the various uses they are built for. RB Boards also uses local barnwoods and natural local woods such as oak and various nut and fruit tree woods. We finish our products with food grade mineral oil and then are hand rubbed with our own unique wood butter made of mineral oil, beeswax and carnuba wax. The majority of our boards are 12 inches wide by 18 inches long an 3/4 inches think but custom sizes are available. Contact us to find out what might be in our inventory or if we can build a product specific to your needs. Remember, no 2 boards are the same but all of our products are handmade and will last for many years!         
              </p>
            </div>
          </div>
          <div className={styles.aboutCta}>
            <Link href="/about" className="btn">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Section divider ---------- */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/lines2.png" alt="" className={styles.lines} />

      {/* ---------- Customer Experiences ---------- */}
      <section className={styles.experiences}>
        <div className="container">
          <RevealText
            text="Customer Experiences"
            className={styles.sectionTitle}
          />
          <figure className={styles.testimonial}>
            <div className={styles.avatar}>
              <Image
                src="/assets/testimonial-1.png"
                alt="Mike K."
                width={166}
                height={166}
                className={styles.avatarImg}
              />
              <figcaption className={styles.avatarName}>Mike K.</figcaption>
            </div>
            <blockquote className={styles.quote}>
              <span className={styles.quoteMark}>“</span>
              this is an example of a customer testimonial. they liked the
              product and would highly recommend this to their friends and
              family
              <span className={`${styles.quoteMark} ${styles.quoteMarkEnd}`}>
                ”
              </span>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* ---------- Our Process ---------- */}
      <section className={styles.process}>
        <div className="container">
          <RevealText text="Our Process" className={styles.sectionTitle} />
          <ProcessVideos />
          <div className={styles.processCta}>
            <Link href="/shop" className="btn">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
