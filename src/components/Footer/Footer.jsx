import { site } from "../../content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap-wide ${styles.inner}`}>
        <p className={styles.brand}>{site.wordmark}</p>
        <p className={styles.line}>{site.footerLine}</p>
      </div>
    </footer>
  );
}
