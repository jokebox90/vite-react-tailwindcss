// src/components/StackedList.tsx

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash-es";
import { Children, ReactNode, cloneElement, isValidElement } from "react";
import "./StackedList.css";

interface TruncateOptions {
  length?: number;
  separator?: string;
  omission?: string;
}

interface StackedListProps {
  children: ReactNode[] | ReactNode;
  truncate?: TruncateOptions;
}

export default function StackedList({
  children,
  ...childProps
}: StackedListProps) {
  return (
    <div className="stacked-list">
      <div className="stacked-list-inner">
        {_.map(Children.toArray(children), (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, childProps);
          }
          return child;
        })}
      </div>
    </div>
  );
}
