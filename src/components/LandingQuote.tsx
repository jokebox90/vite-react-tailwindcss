// src/components/LandingQuote.tsx

import _ from "lodash-es";
import { Children, ReactElement, ReactNode } from "react";
import "./LandingQuote.css";

interface TruncateOptions {
  length?: number;
  separator?: string;
  omission?: string;
}

const defaultTruncateOptions: TruncateOptions = {
  length: 120,
};

interface LandingQuoteProps {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  truncate?: TruncateOptions;
}

export default function LandingQuote({
  children,
  truncate,
  className: argClass,
}: LandingQuoteProps) {
  const className = argClass ? _.split(argClass) : [];
  className.splice(0, 0, "landing-quote");

  return (
    <p className={_.join(className, " ")}>
      {Children.map(children, (child) => {
        if (typeof child === "string") {
          return _.truncate(
            child,
            truncate ? truncate : defaultTruncateOptions
          );
        }
        return child;
      })}
    </p>
  );
}
