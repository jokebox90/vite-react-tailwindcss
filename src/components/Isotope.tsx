// src/components/Isotope.tsx

import "isotope-cells-by-column";
import "isotope-cells-by-row";
import IsotopeLayout, { IsotopeOptions } from "isotope-layout";
import _ from "lodash-es";
import { ReactNode, createRef, useEffect, useRef } from "react";
import "./Isotope.css";

interface IsotopeProps {
  filter: string;
  children: ReactNode[] | ReactNode;
  className?: string;
}

export function Isotope({ children, filter, className }: IsotopeProps) {
  const isoRef = useRef<IsotopeLayout>();
  const gridRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const isoOptions = {
      item: ".isotope-item",
      layoutMode: "fitRows",
    };

    isoRef.current = new IsotopeLayout(
      gridRef.current as HTMLElement,
      isoOptions as IsotopeOptions
    );
  }, [gridRef, isoRef]);

  useEffect(() => {
    isoRef.current?.arrange({
      filter: (itemElement) => {
        return itemElement.classList.contains(filter);
      },
    });
  }, [filter, isoRef]);

  return (
    <div
      ref={gridRef}
      className={className ? `isotope ${className}` : "isotope"}
    >
      <div className="isotope-sizer"></div>
      {children}
      <div className="isotope-sizer"></div>
    </div>
  );
}

interface IsotopeItemProps {
  children: ReactNode[] | ReactNode;
  className?: string;
  innerClass?: string;
}

export function IsotopeItem({
  children,
  className,
  innerClass,
}: IsotopeItemProps) {
  return (
    <div className={className ? `isotope-item ${className}` : "isotope-item"}>
      <div
        className={innerClass ? `isotope-inner ${innerClass}` : "isotope-inner"}
      >
        {children}
      </div>
    </div>
  );
}
