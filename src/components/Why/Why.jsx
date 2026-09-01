import { useRef } from "react";
import { why } from "../../content/site";
import { useGsapContext } from "../../hooks/useGsapContext";
import styles from "./Why.module.css";

export default function Why() {
  const root = useRef(null);

  useGsapContext(root, (gsap) => {
    const q = gsap.utils.selector(root);
    gsap.from(q("[data-why]"), {
      y: 18,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 72%" },
    });
  }, []);

  return (
    <section id="por-que" className={`section ${styles.section}`} ref={root}>
      <div className="wrap">
        <h2 className={styles.title} data-why>
          {why.title}
        </h2>
        <ul>
          {why.items.map((item) => (
            <li key={item.figure} data-why>
              <p className={styles.figure}>{item.figure}</p>
              <div>
                {item.label ? <p className={styles.label}>{item.label}</p> : null}
                <p className={styles.text}>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
