import { useRef } from "react";
import { hero, site } from "../../content/site";
import { useGsapContext } from "../../hooks/useGsapContext";
import { countUp } from "../../lib/gsapCount";
import Button from "../Button/Button.jsx";
import TikTokMark from "../TikTokMark/TikTokMark.jsx";
import collage from "../../assets/hero/hero-collage.webp";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef(null);

  useGsapContext(root, (gsap) => {
    const scope = root.current;
    const intro = gsap.utils.toArray("[data-hero]", scope);
    const counter = scope.querySelector("[data-count]");
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline.from(intro, {
      y: 28,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
    });

    if (counter) {
      timeline.add(() => {
        countUp(gsap, counter, { duration: 1.7 });
      }, "-=0.45");
    }
  }, []);

  return (
    <section id="inicio" className={styles.hero} ref={root}>
      <div className={styles.shell}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-hero>
            {site.eyebrow}
          </p>
          <h1 className={styles.word} data-hero>
            {site.wordmark}
          </h1>
          <p className={styles.headline} data-hero>
            {site.definition}
          </p>
          <div className={styles.actions} data-hero>
            <Button href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</Button>
          </div>
        </div>

        <div className={styles.visual} data-hero>
          <img
            className={styles.collage}
            src={collage}
            alt="Tres momentos de la comunidad TutoGo: café, conversación y cocina"
            width={1024}
            height={768}
          />
          <aside className={styles.plate}>
            <p className={styles.statNum}>
              <span data-count="true" data-target={site.followers} data-group="true">
                {site.followersFormatted}
              </span>
            </p>
            <p className={styles.statLabel}>
              seguidores en <TikTokMark />
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
