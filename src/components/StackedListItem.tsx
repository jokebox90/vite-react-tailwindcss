// src/components/StackedListtsx

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash-es";
import "./StackedListItem.css";

interface TruncateOptions {
  length?: number;
  separator?: string;
  omission?: string;
}

const stackedListTruncateOptions = {
  length: 45,
};

interface StackedListItemProps {
  id?: number | string;
  text: string;
  icon?: IconProp;
  truncate?: TruncateOptions;
}

export default function StackedListItem({
  id,
  text,
  icon,
  truncate,
}: StackedListItemProps) {
  return (
    <div id={`stacked-list-item-${id}`} className="stacked-list-item">
      {icon && (
        <span className="stacked-list-item-icon">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}

      <span className="stacked-list-item-text">
        {_.truncate(
          text,
          truncate ? truncate : stackedListTruncateOptions
        )}
      </span>
    </div>
  );
}
