import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { categories } from "../../content/site";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import belleza from "../../assets/categories/cat-belleza.webp";
import moda from "../../assets/categories/cat-moda.webp";
import hogar from "../../assets/categories/cat-hogar.webp";
import alimentacion from "../../assets/categories/cat-alimentacion.webp";
import finanzas from "../../assets/categories/cat-finanzas.webp";
import viajes from "../../assets/categories/cat-viajes.webp";
import automotriz from "../../assets/categories/cat-automotriz.webp";
import tecnologia from "../../assets/categories/cat-tecnologia.webp";
import styles from "./Categories.module.css";

const IMAGES = [
  belleza,
  moda,
  hogar,
  alimentacion,
  finanzas,
  viajes,
  automotriz,
  tecnologia,
];

function wrap(index, length) {
  return ((index % length) + length) % length;
}

function shortestOffset(index, active, length) {
  let offset = index - active;
  const half = length / 2;
  if (offset > half) offset -= length;
  if (offset < -half) offset += length;
  return offset;
}

export default function Categories() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const cardRefs = useRef([]);
  const stageRef = useRef(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const slides = useMemo(
    () =>
      categories.items.map((name, i) => ({
        name,
        n: String(i + 1).padStart(2, "0"),
        src: IMAGES[i],
      })),
    [],
  );

  const count = slides.length;
  const current = slides[active];

  const go = useCallback(
    (delta) => {
      setActive((index) => wrap(index + delta, count));
    },
    [count],
  );

  useLayoutEffect(() => {
    const shift = desktop ? 215 : 0;
    const coverflow = desktop && !reduced;

    const tweens = slides.map((_, index) => {
      const el = cardRefs.current[index];
      if (!el) return null;

      const offset = shortestOffset(index, active, count);
      const abs = Math.abs(offset);
      const visible = coverflow ? abs <= 1 : offset === 0;

      return gsap.to(el, {
        xPercent: -50,
        yPercent: -50,
        x: coverflow ? offset * shift : 0,
        z: coverflow ? (offset === 0 ? 60 : -160) : 0,
        rotationY: coverflow ? offset * -46 : 0,
        transformPerspective: 900,
        force3D: true,
        scale: offset === 0 ? 1 : 0.84,
        autoAlpha: visible ? 1 : 0,
        zIndex: offset === 0 ? 5 : 3 - abs,
        duration: reduced ? 0.25 : 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });
    });

    return () => {
      tweens.forEach((tween) => tween?.kill());
    };
  }, [active, count, reduced, slides, desktop]);

  return (
    <section id="publicidad" className={`section ${styles.section}`}>
      <div className="wrap">
        <header className={styles.head}>
          <h2>{categories.title}</h2>
          <p>{categories.lead}</p>
        </header>

        <div
          className={styles.gallery}
          role="region"
          aria-roledescription="carrusel 3D"
          aria-label={categories.title}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              go(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              go(-1);
            }
          }}
        >
          <div className={styles.stage} ref={stageRef}>
            {slides.map((slide, index) => {
              const offset = shortestOffset(index, active, count);
              const isSide = desktop && !reduced && Math.abs(offset) === 1;

              return (
                <button
                  key={slide.name}
                  type="button"
                  className={`${styles.card} ${offset === 0 ? styles.center : ""}`}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  tabIndex={isSide || offset === 0 ? 0 : -1}
                  aria-hidden={Math.abs(offset) > 1 ? "true" : undefined}
                  aria-current={offset === 0 ? "true" : undefined}
                  aria-label={slide.name}
                  disabled={Math.abs(offset) > 1}
                  onClick={() => {
                    if (isSide) setActive(index);
                  }}
                >
                  <img
                    src={slide.src}
                    alt=""
                    width={800}
                    height={1200}
                    draggable="false"
                  />
                </button>
              );
            })}
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Categoría anterior"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.arrow}
              aria-label="Categoría siguiente"
              onClick={() => go(1)}
            >
              ›
            </button>
          </div>

          <p className={styles.caption} aria-live="polite">
            <span>
              {current.n}
              <em> / {String(count).padStart(2, "0")}</em>
            </span>
            <strong>{current.name}</strong>
          </p>

          <div className={styles.dots} role="tablist" aria-label={categories.title}>
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={slide.name}
                className={index === active ? styles.dotOn : ""}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
