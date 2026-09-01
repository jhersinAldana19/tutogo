import styles from "./Button.module.css";

export default function Button({
  href,
  children,
  className = "",
  type = "button",
  ...rest
}) {
  const classNames = [styles.btn, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={classNames} href={href} {...rest}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classNames} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}
