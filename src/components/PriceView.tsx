// src/components/PriceQuickViews.tsx

import _ from "lodash-es";
import "./PriceView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useRef } from "react";

interface PriceQuickViewsProps {
  quote?: string;
  title?: string;
  comment?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  innerClass?: string;
  quoteClass?: string;
  commentClass?: string;
  titleClass?: string;
}

export default function PriceView({
  quote,
  title,
  comment,
  active,
  onClick,
  className: argClass,
  innerClass: argInnerClass,
  quoteClass: argQuoteClass,
  titleClass: argTitleClass,
  commentClass: argCommentClass,
}: PriceQuickViewsProps) {
  const className = argClass ? _.split(argClass) : [];
  const titleClass = argTitleClass ? _.split(argTitleClass) : [];
  const innerClass = argInnerClass ? _.split(argInnerClass) : [];
  const quoteClass = argQuoteClass ? _.split(argQuoteClass) : [];
  const commentClass = argCommentClass ? _.split(argCommentClass) : [];

  className.splice(0, 0, "price-view");
  active && className.push("price-view-active");
  titleClass.splice(0, 0, "price-view-title");
  innerClass.splice(0, 0, "price-view-inner");
  quoteClass.splice(0, 0, "price-view-quote");
  commentClass.splice(0, 0, "price-view-comment");

  const priceViewRef = useRef({} as HTMLDivElement);

  const handleClick = () => {
    _.map(document.querySelectorAll(".price-view-active"), (n) => {
      n.classList.remove("price-view-active");
    });
    priceViewRef.current.classList.add("price-view-active");

    document.querySelector(".price-view-scroll-target")?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });

    onClick && onClick();
  };

  return (
    <Fragment>
      <div className="price-view-scroll-target -mt-24"></div>
      <div
        className={_.join(className, " ")}
        ref={priceViewRef}
        onClick={handleClick}
      >
        <div className={_.join(innerClass, " ")}>
          <div className="price-view-circle">
            <FontAwesomeIcon icon={["fas", "circle"]} size="1x" />
          </div>
          <div className="price-view-circle">
            <FontAwesomeIcon icon={["fas", "circle"]} size="1x" />
          </div>
          <h4 className={_.join(quoteClass, " ")}>{quote}</h4>
          <h5 className={_.join(titleClass, " ")}>{title}</h5>
          <p className={_.join(commentClass, " ")}>{comment}</p>
        </div>
      </div>
    </Fragment>
  );
}
