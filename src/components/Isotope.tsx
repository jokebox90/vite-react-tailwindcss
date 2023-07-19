// src/components/Isotope.tsx

import "isotope-cells-by-column";
import "isotope-cells-by-row";
import IT from "isotope-layout";
import _ from "lodash-es";
import { ReactNode, useEffect, useRef } from "react";
import "./Isotope.css";

interface IsotopeProps {
  children: ReactNode[] | ReactNode;
  filter: string;
  className: string;
}

export function Isotope({
  children,
  filter,
  className: argClass,
}: IsotopeProps) {
  const className = argClass ? _.split(argClass) : [];
  const isoRef = useRef({} as IT);
  const gridRef = useRef({} as HTMLDivElement);

  useEffect(() => {
    const grid = gridRef.current;

    isoRef.current = new IT(grid, {
      itemSelector: ".isotope-item",
      layoutMode: "fitRows",
    });
  }, [gridRef]);

  useEffect(() => {
    isoRef.current.arrange({
      filter: (itemElement) => {
        return itemElement.classList.contains(filter);
      },
    });
  }, [filter]);

  className.splice(0, 0, "isotope");

  return (
    <div ref={gridRef} className={_.join(className, " ")}>
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
  className: argClass,
  innerClass: argInnerClass,
}: IsotopeItemProps) {
  const className = argClass ? _.split(argClass) : [];
  const innerClass = argInnerClass ? _.split(argInnerClass) : [];

  className.splice(0, 0, "isotope-item");
  innerClass.splice(0, 0, "isotope-inner");

  return (
    <div className={_.join(className, " ")}>
      <div className={_.join(innerClass, " ")}>{children}</div>
    </div>
  );
}
