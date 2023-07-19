// src/components/Landing.tsx

import { ReactElement, ReactNode } from "react";
import "./LandingSection.css";

type LandingSectionProps = {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
};

export default function LandingSection({
  children,
  className,
}: LandingSectionProps) {
  return <div className={`landing-section ${className || ""}`}>{children}</div>;
}
