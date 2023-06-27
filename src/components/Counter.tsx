// src/components/Counter.tsx

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <button className="nav-link" onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
}