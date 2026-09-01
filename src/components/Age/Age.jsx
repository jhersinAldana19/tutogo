import { age } from "../../content/site";
import { withTikTok } from "../TikTokMark/TikTokMark.jsx";
import styles from "./Age.module.css";

const max = Math.max(...age.bars.map((b) => b.value));

export default function AgeView() {
  return (
    <div className={styles.layout}>
      <div className={styles.chart}>
        {age.bars.map((bar) => (
          <div
            key={bar.range}
            className={styles.col}
            data-pct={`${bar.value}%`}
            tabIndex={0}
          >
            <div
              className={`${styles.bar} ${styles[bar.tone]}`}
              style={{ "--h": `${(bar.value / max) * 100}%` }}
            >
              <span>{bar.value}%</span>
            </div>
            <p className={styles.range}>{bar.range}</p>
          </div>
        ))}
      </div>

      <div className={styles.callouts}>
        <article className={styles.dark}>
          <p className={styles.big}>{age.highlightA.value}</p>
          <p>{age.highlightA.text}</p>
        </article>
        <article className={styles.light}>
          <p className={styles.big}>{age.highlightB.value}</p>
          <p>{withTikTok(age.highlightB.text)}</p>
        </article>
      </div>
    </div>
  );
}
