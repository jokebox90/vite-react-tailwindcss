// src/pages/Home.tsx

import _ from "lodash-es";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import "./Sheet.css";

interface SheetProps {
  footer?: string;
  heading?: string;
  icon?: string;
  body?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  innerClass?: string;
  headingClass?: string;
  iconClass?: string;
  bodyClass?: string;
  footerClass?: string;
}

export default function Sheet({
  icon,
  heading,
  body,
  footer,
  active,
  onClick,
  className: argClass,
  innerClass: argInnerClass,
  iconClass: argIconClass,
  headingClass: argHeadingClass,
  bodyClass: argBodyClass,
  footerClass: argFooterClass,
}: SheetProps) {
  const className = argClass ? _.split(argClass) : [];
  const innerClass = argInnerClass ? _.split(argInnerClass) : [];
  const headingClass = argHeadingClass ? _.split(argHeadingClass) : [];
  const iconClass = argIconClass ? _.split(argIconClass) : [];
  const bodyClass = argBodyClass ? _.split(argBodyClass) : [];
  const footerClass = argFooterClass ? _.split(argFooterClass) : [];

  className.splice(0, 0, "sheet");
  active && className.push("sheet-active");
  innerClass.splice(0, 0, "sheet-inner");
  headingClass.splice(0, 0, "sheet-heading");
  iconClass.splice(0, 0, "sheet-icon");
  footerClass.splice(0, 0, "sheet-footer");
  bodyClass.splice(0, 0, "sheet-body");

  return (
    <div className={_.join(className, " ")} onClick={onClick}>
      <div className={_.join(innerClass, " ")}>
        {icon && (
          <div className={_.join(iconClass, " ")}>
            <FontAwesomeIcon icon={["fas", icon as IconName]} size="1x" />
          </div>
        )}
        {heading && (
          <h3 className="sheet-heading">
            {_.truncate(heading, { length: 120 })}
          </h3>
        )}
        {body && (
          <p className={_.join(bodyClass, " ")}>
            {_.truncate(body, { length: 300 })}
          </p>
        )}
        {footer && <p className={_.join(footerClass, " ")}>{footer}</p>}
      </div>
    </div>
  );
}
