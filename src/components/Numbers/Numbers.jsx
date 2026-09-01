import { useRef } from "react";
import { numbers, site } from "../../content/site";
import { useGsapContext } from "../../hooks/useGsapContext";
import { countUp, formatCount } from "../../lib/gsapCount";
import TikTokMark from "../TikTokMark/TikTokMark.jsx";
import styles from "./Numbers.module.css";

const stats = [
  { ...numbers.items[0], count: { target: 78, suffix: "%" } },
  { ...numbers.items[1], count: { target: 84.4, suffix: "%", decimals: 1 } },
  { ...numbers.items[2], count: { target: 61.8, suffix: "%", decimals: 1 } },
  { ...numbers.items[3], count: null },
  { ...numbers.items[4], count: { target: 123, prefix: "+" } },
];

function CountValue({ count, fallback }) {
  if (!count) return fallback;

  return (
    <span
      data-count="true"
      data-target={count.target}
      data-decimals={count.decimals || 0}
      data-prefix={count.prefix || ""}
      data-suffix={count.suffix || ""}
      data-group={count.group ? "true" : "false"}
    >
      {formatCount(count.target, count)}
    </span>
  );
}

export default function Numbers() {
  const root = useRef(null);

  useGsapContext(root, (gsap, ScrollTrigger) => {
    const scope = root.current;
    const copy = gsap.utils.toArray("[data-num]", scope);
    const counters = gsap.utils.toArray("[data-count]", scope);
    let played = false;

    const play = (animateIn) => {
      if (played) return;
      played = true;

      if (animateIn) {
        gsap.from(copy, {
          y: 20,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          overwrite: "auto",
        });
      }

      counters.forEach((el, index) => {
        countUp(gsap, el, { duration: 1.9, delay: 0.12 + index * 0.08 });
      });
    };

    if (scope.getBoundingClientRect().top < window.innerHeight * 0.92) {
      play(false);
    } else {
      ScrollTrigger.create({
        trigger: scope,
        start: "top 90%",
        onEnter: () => play(true),
        onEnterBack: () => play(true),
      });
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <section className={`section ${styles.section}`} ref={root}>
      <div className="wrap">
        <header className={styles.head} data-num>
          <h2 className={styles.title}>{numbers.kicker}</h2>
          <p className={styles.lead}>{numbers.lead}</p>
        </header>

        <div className={styles.hero} data-num>
          <p className={styles.primary}>
            <CountValue count={{ target: site.followers, group: true }} />
          </p>
          <p className={styles.primaryMeta}>
            {numbers.primary.label} en <TikTokMark />
          </p>
          <p className={styles.tagline}>{site.footerLine}</p>
        </div>

        <ul className={styles.stats}>
          {stats.map((item, index) => (
            <li
              key={item.label}
              className={index === 4 ? styles.growth : undefined}
              data-num
            >
              <p className={styles.figure}>
                <CountValue count={item.count} fallback={item.value} />
              </p>
              <p className={styles.label}>{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
