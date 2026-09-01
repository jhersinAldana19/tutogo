import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { markets as copy } from "../../content/site";
import {
  getMarketByCountry,
  getMarketByGeoName,
  latamGeoNames,
  markets,
} from "../../data/markets";
import { useGsapContext } from "../../hooks/useGsapContext";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import geography from "../../data/countries-110m.json";
import styles from "./RegionalMarkets.module.css";

const FILL = {
  top: "var(--color-wine)",
  hover: "var(--color-rose)",
  selected: "var(--color-wine-deep)",
  neutral: "color-mix(in srgb, var(--color-cream) 78%, var(--color-text) 22%)",
  stroke: "var(--color-cream)",
  selectedStroke: "var(--color-gold)",
};

export default function RegionalMarkets() {
  const root = useRef(null);
  const pickRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [selected, setSelected] = useState(markets[0].country);
  const current = getMarketByCountry(selected);

  useGsapContext(root, (gsap, ScrollTrigger) => {
    const q = gsap.utils.selector(root);
    gsap.from(q("[data-rm]"), {
      y: 18,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: { trigger: root.current, start: "top 76%" },
    });
    ScrollTrigger.refresh();
  }, []);

  useLayoutEffect(() => {
    if (reduced || !pickRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.from("[data-pick]", {
        y: 10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      });
    }, pickRef.current);

    return () => ctx.revert();
  }, [selected, reduced]);

  const max = Math.max(...markets.map((item) => item.percentage));

  return (
    <section className={`section ${styles.section}`} ref={root}>
      <div className="wrap">
        <header className={styles.head} data-rm>
          <p className={styles.kicker}>{copy.kicker}</p>
          <h2 className={styles.title}>{copy.title}</h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.mapWrap} data-rm>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ center: [-72, -12], scale: 380 }}
              width={800}
              height={860}
              className={styles.map}
            >
              <Geographies geography={geography}>
                {({ geographies }) =>
                  geographies
                    .filter((geo) => latamGeoNames.has(geo.properties.name))
                    .map((geo) => {
                      const market = getMarketByGeoName(geo.properties.name);
                      const isSelected = market?.country === selected;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          tabIndex={market ? 0 : -1}
                          role={market ? "button" : undefined}
                          aria-label={
                            market
                              ? `${market.country} ${market.percentage}%`
                              : undefined
                          }
                          aria-pressed={market ? isSelected : undefined}
                          className={market ? styles.hit : styles.mute}
                          onClick={() => {
                            if (market) setSelected(market.country);
                          }}
                          onKeyDown={(event) => {
                            if (!market) return;
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              setSelected(market.country);
                            }
                          }}
                          style={{
                            default: {
                              fill: market
                                ? isSelected
                                  ? FILL.selected
                                  : FILL.top
                                : FILL.neutral,
                              stroke: isSelected
                                ? FILL.selectedStroke
                                : FILL.stroke,
                              strokeWidth: isSelected ? 1.2 : 0.6,
                              outline: "none",
                            },
                            hover: {
                              fill: market
                                ? isSelected
                                  ? FILL.selected
                                  : FILL.hover
                                : FILL.neutral,
                              stroke: isSelected
                                ? FILL.selectedStroke
                                : FILL.stroke,
                              strokeWidth: market ? 1.1 : 0.6,
                              outline: "none",
                            },
                            pressed: {
                              fill: market ? FILL.selected : FILL.neutral,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                }
              </Geographies>
            </ComposableMap>
          </div>

          <div className={styles.panel}>
            {current ? (
              <div ref={pickRef} className={styles.pick}>
                <p className={styles.country} data-pick>
                  {current.country}
                </p>
                <p className={styles.pct} data-pick>
                  {current.percentage}%
                </p>
                <p className={styles.caption} data-pick>
                  de la audiencia de TutoGo
                </p>
              </div>
            ) : null}

            <p className={styles.rankKicker}>{copy.kicker}</p>
            <ol className={styles.list}>
              {markets.map((item, index) => {
                const on = item.country === selected;
                return (
                  <li key={item.country}>
                    <button
                      type="button"
                      className={on ? styles.on : ""}
                      aria-pressed={on}
                      onClick={() => setSelected(item.country)}
                    >
                      <span className={styles.idx}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.name}>{item.country}</span>
                      <span className={styles.value}>{item.percentage}%</span>
                    </button>
                    <span className={styles.track} aria-hidden="true">
                      <span
                        className={styles.fill}
                        style={{
                          width: `${(item.percentage / max) * 100}%`,
                        }}
                      />
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className={styles.box} data-rm>
              <p className={styles.conc}>{copy.concentration}</p>
              <p>{copy.concentrationText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
