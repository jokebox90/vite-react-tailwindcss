// src/components/PriceQuickViews.tsx

import { ReactNode } from "react";
import "./PriceQuickViews.css";

type PriceQuickViewsProps = {
  title: string;
  comment: string;
  children?: ReactNode[] | ReactNode;
};

export default function PriceQuickViews({
  children,
  title,
  comment,
}: PriceQuickViewsProps) {
  return (
    <div className="price-quick-views">
      <h2 className="price-quick-views-title">{title}</h2>
      <h3 className="price-quick-views-comment">{comment}</h3>

      {children}
    </div>
  );
}
