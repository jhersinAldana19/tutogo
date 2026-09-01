import { useState } from "react";
import { age, gender } from "../../content/site";
import AgeView from "../Age/Age.jsx";
import GenderView from "../GenderMarkets/GenderMarkets.jsx";
import styles from "./Demographics.module.css";

const tabs = [
  { id: "gender", label: gender.title },
  { id: "age", label: age.title },
];

export default function Demographics() {
  const [view, setView] = useState("gender");

  function onSwitchKeyDown(event) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = view === "gender" ? "age" : "gender";
    setView(next);
    const button = event.currentTarget.querySelector(`[data-tab="${next}"]`);
    button?.focus();
  }

  return (
    <section className={`section ${styles.section}`} aria-label={`${gender.title} y ${age.title}`}>
      <div className="wrap">
        <div
          className={styles.switch}
          role="tablist"
          aria-label={`${gender.title} y ${age.title}`}
          onKeyDown={onSwitchKeyDown}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              data-tab={tab.id}
              id={`demografia-tab-${tab.id}`}
              aria-selected={view === tab.id}
              aria-controls={`demografia-panel-${tab.id}`}
              tabIndex={view === tab.id ? 0 : -1}
              className={view === tab.id ? styles.on : ""}
              onClick={() => setView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={styles.panel}
          role="tabpanel"
          id={`demografia-panel-${view}`}
          aria-labelledby={`demografia-tab-${view}`}
        >
          {view === "gender" ? <GenderView /> : <AgeView />}
        </div>
      </div>
    </section>
  );
}
