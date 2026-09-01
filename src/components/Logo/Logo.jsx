import { officialLogo } from "../../content/assets";
import { site } from "../../content/site";
import styles from "./Logo.module.css";

export default function Logo({ tone = "wine" }) {
  if (officialLogo) {
    return (
      <img
        className={styles.image}
        src={officialLogo}
        alt="TutoGo"
        width="140"
        height="40"
      />
    );
  }

  return (
    <span className={`${styles.wordmark} ${styles[tone]}`} aria-label="TutoGo">
      {site.wordmark}
    </span>
  );
}
