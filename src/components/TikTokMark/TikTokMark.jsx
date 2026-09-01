import tiktokLogo from "../../assets/brands/tiktok.png";
import styles from "./TikTokMark.module.css";

export default function TikTokMark() {
  return (
    <span className={styles.mark}>
      <img src={tiktokLogo} alt="" width={20} height={20} />
      <span>TikTok</span>
    </span>
  );
}

export function withTikTok(text) {
  const parts = String(text).split("TikTok");
  if (parts.length === 1) return text;

  return parts.flatMap((part, index) =>
    index === 0 ? [part] : [<TikTokMark key={`tiktok-${index}`} />, part],
  );
}
