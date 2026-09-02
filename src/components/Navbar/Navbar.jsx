import { useEffect, useState } from "react";
import { hero, nav, site } from "../../content/site";
import Button from "../Button/Button.jsx";
import Logo from "../Logo/Logo.jsx";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles.bar} ${solid ? styles.solid : ""}`}>
      <div className={`wrap-wide ${styles.inner}`}>
        <a href="#inicio" className={styles.brand} onClick={() => setOpen(false)}>
          <Logo tone={solid && !open ? "wine" : "cream"} />
        </a>

        <nav className={styles.desktop} aria-label="Principal">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <Button
            href={hero.ctaPrimary.href}
            className={styles.cta}
            onClick={() => setOpen(false)}
          >
            {hero.ctaPrimary.label}
          </Button>
          <button
            className={styles.menuBtn}
            type="button"
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      <div
        id="nav-mobile"
        className={`${styles.mobile} ${open ? styles.open : ""}`}
      >
        <nav aria-label="Móvil">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          href={hero.ctaPrimary.href}
          className={styles.mobileCta}
          onClick={() => setOpen(false)}
        >
          {hero.ctaPrimary.label}
        </Button>
        <p className={styles.mobileMeta}>{site.definition}</p>
      </div>
    </header>
  );
}
