// src/pages/Home.tsx

import Logos from "../components/Logos";
import Counter from "../components/Counter";
import Card from "../components/Card";

export default function About() {
  return (
    <>
      <Logos />

      <h1>About</h1>

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
