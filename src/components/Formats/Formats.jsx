import { useCallback, useEffect, useRef, useState } from "react";
import { formats } from "../../content/site";
import brandVideo from "../../assets/formats/fmt-brand-video.webp";
import productIntegration from "../../assets/formats/fmt-product-integration.webp";
import brandMention from "../../assets/formats/fmt-brand-mention.webp";
import productReview from "../../assets/formats/fmt-product-review.webp";
import styles from "./Formats.module.css";

const IMAGES = [brandVideo, productIntegration, brandMention, productReview];

const cards = formats.items.map((item, index) => ({
  ...item,
  src: IMAGES[index],
}));

function wrap(index, length) {
  return ((index % length) + length) % length;
}

export default function Formats() {
  const scroller = useRef(null);
  const [active, setActive] = useState(0);

  const goTo = useCallback((index) => {
    const next = wrap(index, cards.length);
    const root = scroller.current;
    setActive(next);
    if (!root) return;
    root.scrollTo({ left: next * root.clientWidth, behavior: "smooth" });
  }, []);

  function onScroll() {
    const root = scroller.current;
    if (!root) return;
    const width = root.clientWidth;
    if (!width) return;
    const index = Math.round(root.scrollLeft / width);
    setActive(wrap(index, cards.length));
  }

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const reset = () => {
      if (media.matches) {
        scroller.current?.scrollTo({ left: 0 });
        setActive(0);
      }
    };
    media.addEventListener("change", reset);
    return () => media.removeEventListener("change", reset);
  }, []);

  return (
    <section className={`section ${styles.section}`} id="formatos">
      <div className="wrap">
        <h2 className={styles.title}>{formats.title}</h2>

        <div
          className={styles.gallery}
          role="region"
          aria-roledescription="carrusel"
          aria-label={formats.title}
        >
          <ul
            className={styles.scroller}
            ref={scroller}
            onScroll={onScroll}
          >
            {cards.map((item, index) => (
              <li key={item.n} className={styles.card} data-slide={index}>
                <div className={styles.frame}>
                  <img
                    src={item.src}
                    alt={item.title}
                    width={900}
                    height={1200}
                  />
                </div>
                <div className={styles.caption}>
                  <span>{item.n}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Formato anterior"
              onClick={() => goTo(active - 1)}
            >
              ‹
            </button>
            <div className={styles.dots} role="tablist" aria-label={formats.title}>
              {cards.map((item, index) => (
                <button
                  key={item.n}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={item.title}
                  className={index === active ? styles.dotOn : undefined}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Formato siguiente"
              onClick={() => goTo(active + 1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
