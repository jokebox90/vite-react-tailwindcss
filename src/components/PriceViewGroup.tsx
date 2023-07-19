// src/components/PriceQuickViews.tsx

import _ from "lodash-es";
import { ReactElement, ReactNode } from "react";
import "./PriceViewGroup.css";

type PriceQuickViewsProps = {
  children?: ReactNode[] | ReactElement;
  className?: string;
};

export default function PriceViewGroup({ children, className: argClass }: PriceQuickViewsProps) {
  const className = argClass ? _.split(argClass) : [];

  className.splice(0, 0, "price-view-group");
  return <div className={_.join(className, " ")}>{children}</div>;
}
