// src/components/Landing.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import "./Landing.css";

type LandingProps = {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  innerClass?: string;
};

export default function Landing({ children, className }: LandingProps) {
  return <div className={`landing ${className || ""}`}>{children}</div>;
}
