import { useRef } from "react";
import { audience } from "../../content/site";
import { useGsapContext } from "../../hooks/useGsapContext";
import { withTikTok } from "../TikTokMark/TikTokMark.jsx";
import styles from "./Audience.module.css";

export default function Audience() {
  const root = useRef(null);

  useGsapContext(root, (gsap) => {
    const q = gsap.utils.selector(root);
    gsap.from(q("[data-aud]"), {
      y: 24,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 76%" },
    });
  }, []);

  return (
    <section id="audiencia" className={`section ${styles.section}`} ref={root}>
      <div className="wrap">
        <p className={styles.title} data-aud>
          {audience.title}
        </p>
      </div>

      <div className={`wrap-wide ${styles.layout}`}>
        <div className={styles.panel} data-aud>
          <h2 className={styles.highlight}>{audience.highlight}</h2>
          <p className={styles.body}>{withTikTok(audience.body)}</p>
          <ul className={styles.uses}>
            {audience.uses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.profile} data-aud>
          <p className={styles.profileLabel}>{audience.profileLabel}</p>
          <ul>
            {audience.profile.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.note}>{audience.note}</p>
        </aside>
      </div>
    </section>
  );
}
