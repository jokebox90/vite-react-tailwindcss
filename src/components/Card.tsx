// src/components/Card.tsx

import { ReactNodeArray } from "react";

type CardPropsType = {
  children: ReactNodeArray;
};

export default function Card(Props: CardPropsType) {
  const { children } = Props;

  return <div className="card">{children}</div>;
}