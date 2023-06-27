// src/pages/Home.tsx

import { useAppConfig } from "../composables/appConfig";
import Logos from "../components/Logos";
import Counter from "../components/Counter";
import Card from "../components/Card";

export default function Home() {
  const { config } = useAppConfig();

  return (
    <>
      <Logos />

      <h1>{config.projectName}</h1>

      <Card>
        <Counter />

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </Card>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
