// src/components/Logos.tsx

import { useEffect, useRef } from "react";
import { useAppConfig } from "../composables/appConfig";
import viteLogo from "/vite.svg";
import { gsap } from "gsap";

export default function Logos() {
  const { config } = useAppConfig();

  const el = useRef<HTMLDivElement>(null);
  const tl = useRef({});
  const t2 = useRef({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .to(".logo.react", { rotate: 360, repeat: -1, duration: 20, ease: "linear" });

      t2.current = gsap
        .timeline({ delay: 1.5, yoyo: true })
        .to(".logo", { x: -100 })
        .to(".logo", { x: 100 })
        .to(".logo", { x: 0 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex justify-center" ref={el}>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>

      <a href="https://react.dev" target="_blank">
        <img src={config.projectLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}
