export function formatCount(value, { decimals = 0, prefix = "", suffix = "", group = false } = {}) {
  const numeric = Number(value);
  const shown = group
    ? Math.round(numeric).toLocaleString("en-US")
    : decimals
      ? numeric.toFixed(decimals)
      : String(Math.round(numeric));
  return `${prefix}${shown}${suffix}`;
}

export function countOptionsFromElement(element) {
  return {
    decimals: Number(element.getAttribute("data-decimals") || 0),
    prefix: element.getAttribute("data-prefix") || "",
    suffix: element.getAttribute("data-suffix") || "",
    group: element.getAttribute("data-group") === "true",
  };
}

export function countUp(gsap, element, { duration = 1.85, delay = 0 } = {}) {
  const target = Number(element.getAttribute("data-target"));
  const opts = countOptionsFromElement(element);
  const end = Number.isFinite(target) ? target : 0;
  const state = { val: 0 };

  element.textContent = formatCount(0, opts);

  return gsap.to(state, {
    val: end,
    duration,
    delay,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = formatCount(state.val, opts);
    },
    onComplete: () => {
      element.textContent = formatCount(end, opts);
    },
  });
}
