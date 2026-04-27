"use client";

import { useEffect } from "react";

/**
 * Scripts de animação da proposta:
 *  - fade-in via IntersectionObserver
 *  - bridge progress (--p, --p-text) via scroll listener
 *  - fit-to-width das big-words das bridges
 *
 * Tudo em um único client component para limitar a hidratação.
 */
export function PropostaScripts() {
  useEffect(() => {
    // Fade-in
    const els = document.querySelectorAll(".fade-in");
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => io?.observe(el));
    } else {
      els.forEach((el) => el.classList.add("visible"));
    }

    // Bridge progress
    const bridges = Array.from(
      document.querySelectorAll<HTMLElement>(".bridge")
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scheduled = false;
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    function updateBridge(bridge: HTMLElement) {
      const rect = bridge.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh || rect.top > vh * 2) return;
      const total = rect.height + vh;
      const p = clamp01((vh - rect.top) / total);
      const pText = p < 0.5 ? p / 0.5 : clamp01(1 - (p - 0.5) / 0.5);
      bridge.style.setProperty("--p", p.toFixed(4));
      bridge.style.setProperty("--p-text", pText.toFixed(4));
    }
    function update() {
      scheduled = false;
      for (const b of bridges) updateBridge(b);
    }
    function onScroll() {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    }
    if (!reduced && bridges.length) {
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
    }

    // Fit-to-width das big-words
    const TARGET = 0.94;
    const words = Array.from(
      document.querySelectorAll<HTMLElement>(".bridge .big-word")
    );
    function fit() {
      words.forEach((el) => {
        const ref =
          (el.querySelector(".ghost") as HTMLElement | null) || el;
        el.style.fontSize = "";
        const containerW = el.clientWidth;
        if (!containerW) return;
        const range = document.createRange();
        range.selectNodeContents(ref);
        const naturalW = range.getBoundingClientRect().width;
        if (!naturalW) return;
        const currentFs = parseFloat(getComputedStyle(el).fontSize);
        const targetFs = (currentFs * (containerW * TARGET)) / naturalW;
        el.style.fontSize = targetFs.toFixed(2) + "px";
      });
    }
    let resizeT: ReturnType<typeof setTimeout> | null = null;
    function onResize() {
      if (resizeT) clearTimeout(resizeT);
      resizeT = setTimeout(fit, 100);
    }
    if (words.length) {
      fit();
      window.addEventListener("resize", onResize);
      if ("fonts" in document) {
        document.fonts.ready.then(fit).catch(() => {});
      }
    }

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("resize", onResize);
      if (resizeT) clearTimeout(resizeT);
    };
  }, []);

  return null;
}
