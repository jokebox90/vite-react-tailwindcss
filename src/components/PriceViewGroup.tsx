// src/components/PriceQuickViews.tsx

import { ReactNode } from "react";
import "./PriceViewGroup.css";

interface PriceViewGroupProps {
  children?: ReactNode[] | ReactNode;
}

export default function PriceViewGroup({ children }: PriceViewGroupProps) {
  return <div className="price-view-group">{children}</div>;
}
