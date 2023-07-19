// src/components/Landing.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import "./LandingSection.css";

type LandingSectionProps = {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  innerClass?: string;
  title?: boolean;
  description?: boolean;
  quote?: boolean;
  centered?: boolean;
};

export default function LandingSection({
  children,
  className: argClass,
  innerClass: argInnerClass,
  description,
  quote,
  centered,
  title,
}: LandingSectionProps) {
  const className = argClass ? _.split(argClass) : [];
  const innerClass = argInnerClass ? _.split(argInnerClass) : [];

  centered && className.splice(0, 0, "landing-section-centered");
  description && className.splice(0, 0, "landing-section-description");
  quote && className.splice(0, 0, "landing-section-quote");
  title && className.splice(0, 0, "landing-section-title");
  innerClass.splice(0, 0, "landing-section-inner");
  className.splice(0, 0, "landing-section");


  return (
    <div className={_.join(className, " ")}>
      <div className={_.join(innerClass, " ")}>{children}</div>
    </div>
  );
}
