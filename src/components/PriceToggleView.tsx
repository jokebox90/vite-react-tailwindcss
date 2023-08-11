// src/components/PriceToggleView.tsx

import _ from "lodash-es";
import { useState } from "react";
import "./PriceToggleView.css";

interface PriceToggleViewProps {
  className?: string;
  wrapperClass?: string;
  variants?: string[];
  toggle?: () => void;
}

export default function PriceToggleView(Props: PriceToggleViewProps) {
  const { className, wrapperClass, variants, toggle } = Props;
  const [state, setState] = useState({
    toggled: true,
  });

  const hasVariantLeft = variants?.length && variants.length > 0;
  const hasVariantRight = variants?.length && variants.length > 1;

  const innerClass = [];
  const textClass = [];
  const inputClass = className ? _.split(className) : [];

  innerClass.push("price-toggle-view-label");
  textClass.push("price-toggle-view-text");
  inputClass.push("price-toggle-view-toggle");

  const doToggle = () => {
    setState({ toggled: !state.toggled });
    if (toggle) toggle();
  };

  return (
    <div className={_.join(["price-toggle-view", wrapperClass], " ")} onClick={doToggle}>
      <label htmlFor="" className={_.join(innerClass, " ")}>
        {hasVariantLeft && (
          <span className={_.join(textClass, " ")}>{variants[0]}</span>
        )}

        <input
          type="checkbox"
          className={_.join(inputClass, " ")}
          checked={state.toggled}
          onChange={doToggle}
        />

        {hasVariantRight && (
          <span className={_.join(textClass, " ")}>{variants[1]}</span>
        )}
      </label>
    </div>
  );
}
