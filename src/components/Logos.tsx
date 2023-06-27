// src/components/Logos.tsx

import { useEffect, useState } from "react";
import { useAppConfig } from "../composables/appConfig";
import viteLogo from "/vite.svg";

export default function Logos() {
  const { config } = useAppConfig();
  const [reactLogo, setReactLogo] = useState<string>("");

  useEffect(() => {
    async function imports() {
      setReactLogo(
        (await import(config.projectLogo /* @vite-ignore */)).default
      );
    }

    imports();
  }, [config.projectLogo]);

  return (
    <div className="flex justify-center">
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}