import { useRef } from "react";
import { defines } from "../../content/site";
import { useGsapContext } from "../../hooks/useGsapContext";
import styles from "./Defines.module.css";

export default function Defines() {
  const root = useRef(null);

  useGsapContext(root, (gsap) => {
    const q = gsap.utils.selector(root);
    gsap.from(q("[data-step]"), {
      x: -18,
      opacity: 0,
      duration: 0.55,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 70%" },
    });
  }, []);

  return (
    <section id="comunidad" className={`section ${styles.section}`} ref={root}>
      <div className="wrap">
        <h2 className={styles.title}>{defines.title}</h2>
        <ol className={styles.list}>
          {defines.steps.map((step, i) => (
            <li key={step.n} data-step>
              <span className={styles.n}>{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              {i < defines.steps.length - 1 ? (
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
