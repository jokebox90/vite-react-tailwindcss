// src/components/PriceQuickViews.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash-es";
import { Fragment, createRef, useEffect } from "react";
import Button from "./Button";
import "./PriceView.css";

interface PriceQuickViewsProps {
  quote?: string;
  title?: string;
  content?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PriceView({
  quote,
  title,
  content,
  active,
  onClick,
  className,
  ...otherProps
}: PriceQuickViewsProps) {
  const buttonRef = createRef<HTMLButtonElement>();

  const handleClick = () => {
    document.querySelector(".price-view-scroll-target")?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });

    onClick && onClick();
  };

  useEffect(() => {
    if (active) {
      buttonRef.current?.classList.add("price-view-active")
    } else {
      buttonRef.current?.classList.remove("price-view-active");
    }
  }, [active, buttonRef]);

  return (
    <Fragment>
      <span className="price-view-scroll-target -mt-24"></span>

      <Button
        eventCategory="price-view"
        eventAction={title || ""}
        onClick={handleClick}
        buttonRef={buttonRef}
        className={_.join(["price-view", className], " ")}
        {...otherProps}
      >
        <span className="price-view-inner">
          <span className="price-view-circle">
            <FontAwesomeIcon icon={["fas", "circle"]} size="1x" />
          </span>

          <span className="price-view-circle">
            <FontAwesomeIcon icon={["fas", "circle"]} size="1x" />
          </span>

          <h4 className="price-view-quote">{quote}</h4>

          <h5 className="price-view-title">{title}</h5>

          <p className="price-view-content">{content}</p>
        </span>
      </Button>
    </Fragment>
  );
}
