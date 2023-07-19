// src/components/Landing.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import "./Landing.css";

type LandingProps = {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  innerClass?: string;
};

export default function Landing({
  children,
  className: argClass,
  innerClass: argInnerClass,
}: LandingProps) {
  const className = argClass ? _.split(argClass) : [];
  const innerClass = argInnerClass ? _.split(argInnerClass) : [];

  innerClass.splice(0, 0, "landing-inner");
  className.splice(0, 0, "landing");

  return (
    <div className={_.join(className, " ")}>
      <div className={_.join(innerClass, " ")}>{children}</div>
    </div>
  );
}
