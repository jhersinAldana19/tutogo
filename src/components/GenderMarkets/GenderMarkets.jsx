import { gender } from "../../content/site";
import styles from "./GenderMarkets.module.css";

function WomanSilhouette() {
  return (
    <svg
      className={styles.figure}
      viewBox="0 0 80 170"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="40" cy="18" r="13" />
      <path d="M40 34c-7 0-16 5-19 12l-9 108h19l4-36 5 36h19L50 46c-3-7-10-12-10-12z" />
    </svg>
  );
}

function ManSilhouette() {
  return (
    <svg
      className={styles.figure}
      viewBox="0 0 80 170"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="40" cy="18" r="13" />
      <path d="M26 40h28v22h10v92h-16V98H32v56H16V62h10z" />
    </svg>
  );
}

export default function GenderView() {
  return (
    <>
      <div className={styles.gender}>
        <div
          className={styles.women}
          style={{ flexGrow: gender.women }}
          tabIndex={0}
        >
          <WomanSilhouette />
          <div className={styles.meta}>
            <p className={styles.pct}>{gender.women}%</p>
            <p>{gender.womenLabel}</p>
          </div>
        </div>
        <div
          className={styles.men}
          style={{ flexGrow: gender.men }}
          tabIndex={0}
        >
          <ManSilhouette />
          <div className={styles.meta}>
            <p className={styles.pct}>{gender.men}%</p>
            <p>{gender.menLabel}</p>
          </div>
        </div>
      </div>
      <p className={styles.note}>{gender.note}</p>
    </>
  );
}
