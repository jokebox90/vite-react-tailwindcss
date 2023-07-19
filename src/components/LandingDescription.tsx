// src/components/LandingDescription.tsx

import _ from "lodash-es";
import { Children, ReactElement, ReactNode } from "react";
import "./LandingDescription.css";

interface TruncateOptions {
  length?: number;
  separator?: string;
  omission?: string;
}

const truncateOptions: TruncateOptions = {
  length: 750,
};

interface LandingDescriptionProps {
  children?: ReactNode[] | ReactElement | string;
  className?: string;
  truncate?: TruncateOptions;
}

export default function LandingDescription(Props: LandingDescriptionProps) {
  return (
    <p className={`landing-description ${Props.className || ""}`}>
      {Children.map(Props.children, (child) =>
        typeof child === "string"
          ? _.truncate(child, Props.truncate || truncateOptions)
          : child
      )}
    </p>
  );
}
