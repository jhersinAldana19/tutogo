import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useGsapContext(scopeRef, factory, deps = []) {
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !scopeRef.current) return undefined;

    const ctx = gsap.context(() => {
      factory(gsap, ScrollTrigger);
    }, scopeRef.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}
