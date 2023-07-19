// src/components/Landing.tsx

import _ from "lodash-es";
import { ReactNode } from "react";
import "./LandingPoster.css";

interface LandingPosterProps {
  children: ReactNode[] | ReactNode;
  className?: string;
  innerClass?: string;
  top?: boolean;
  topLeft?: boolean;
  topRight?: boolean;
  bottom?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  left?: boolean;
  right?: boolean;
  focusStart?: () => void;
  focusEnd?: () => void;
}

export default function LandingPoster({
  children,
  className: argClass,
  innerClass: argInnerClass,
  top,
  topLeft,
  topRight,
  bottom,
  bottomLeft,
  bottomRight,
  left,
  right,
  focusStart,
  focusEnd,
}: LandingPosterProps) {
  const className = argClass ? _.split(argClass) : [];
  const innerClass = argInnerClass ? _.split(argInnerClass) : [];

  className.splice(0, 0, "landing-poster");

  top
    ? className.splice(0, 0, "landing-poster-t")
    : topLeft
    ? className.splice(0, 0, "landing-poster-tl")
    : topRight
    ? className.splice(0, 0, "landing-poster-tr")
    : bottom
    ? className.splice(0, 0, "landing-poster-b")
    : bottomLeft
    ? className.splice(0, 0, "landing-poster-bl")
    : bottomRight
    ? className.splice(0, 0, "landing-poster-br")
    : left
    ? className.splice(0, 0, "landing-poster-l")
    : right
    ? className.splice(0, 0, "landing-poster-r")
    : className.splice(0, 0, "landing-poster-br");

  innerClass.splice(0, 0, "landing-poster-inner");

  return (
    <div
      className={_.join(className, " ")}
      onMouseOver={focusStart}
      onMouseLeave={focusEnd}
      onTouchStart={focusStart}
      onTouchEnd={focusEnd}
    >
      <div className={_.join(innerClass, " ")}>{children}</div>
    </div>
  );
}
