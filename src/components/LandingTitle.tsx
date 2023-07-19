// src/components/LandingTitle.tsx

import _ from "lodash-es";
import { Children, ReactElement, ReactNode } from "react";
import "./LandingTitle.css";

interface TruncateOptions {
  length?: number;
  separator?: string;
  omission?: string;
}

const defaultTruncateOptions: TruncateOptions = {
  length: 120,
};

interface LandingTitleProps {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  truncate?: TruncateOptions;
}

export default function LandingTitle({
  children,
  truncate,
  className: argClass,
}: LandingTitleProps) {
  const className = argClass ? _.split(argClass) : [];
  className.splice(0, 0, "landing-title");

  return (
    <h1 className={_.join(className, " ")}>
      {Children.map(children, (child) => {
        if (typeof child === "string") {
          return _.truncate(
            child,
            truncate ? truncate : defaultTruncateOptions
          );
        }
        return child;
      })}
    </h1>
  );
}
