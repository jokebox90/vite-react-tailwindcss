// src/Root.tsx

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash-es";
import moment from "moment";
import { ReactNode, useEffect, useState } from "react";
import "./MobileDevice.css";
import { useMatomo } from "@datapunt/matomo-tracker-react";

interface MobileDeviceProps {
  children: ReactNode[] | ReactNode;
}

export default function MobileDevice({ children }: MobileDeviceProps) {
  const { trackPageView, trackEvent } = useMatomo();
  const [state, setState] = useState({
    time: moment().format("HH:mm"),
    toEnd: true,
  });

  const scrollIntoCheckListElement = () => {
    const element = state.toEnd
      ? document.querySelector(".mobile-device-ui-end")
      : document.querySelector(".mobile-device-ui-start");

    trackEvent({ category: "home-page", action: "scroll-event" });

    element?.scrollIntoView({
      inline: "nearest",
      block: "end",
      behavior: "smooth",
    });

    setState((prevState) => ({
      ...prevState,
      toEnd: !state.toEnd,
    }));
  };

  useEffect(() => {
    let timerID: string | number | NodeJS.Timeout | undefined;

    if (!timerID) {
      timerID = setTimeout(() => {
        setState({
          ...state,
          time: moment().format("HH:mm:ss"),
        });
      }, 50);
    }

    return () => {
      timerID && clearTimeout(timerID);
    };
  }, [state]);

  // Track page view
  useEffect(() => {
    trackPageView({});
  });


  return (
    <div className="mobile-device-jacket">
      <div className="mobile-device">
        <div className="mobile-device-screen">
          <div className="mobile-device-taskbar">
            <p className="mobile-device-text-group">
              <span>{state.time}</span>
              <span>{moment().format("ddd D MMMM")}</span>
            </p>

            <span className="mobile-device-divider"></span>

            <p className="mobile-device-icon-group">
              <span>
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </span>
              <span>
                <FontAwesomeIcon icon={["fab", "instagram"]} />
              </span>
              <span>
                <FontAwesomeIcon icon={["fab", "linkedin"]} />
              </span>
              <span>
                <FontAwesomeIcon icon={["fab", "twitter"]} />
              </span>
            </p>

            <span className="mobile-device-divider"></span>

            <p className="mobile-device-icon-group">
              <span>
                <FontAwesomeIcon icon={["fas", "envelope"]} />
              </span>
              <span>
                <FontAwesomeIcon icon={["fas", "square-phone"]} />
              </span>
            </p>

            <p className="mobile-device-icon-group">
              <span>
                <FontAwesomeIcon icon={["fas", "signal"]} />
              </span>
              <span>
                <FontAwesomeIcon icon={["fas", "battery-three-quarters"]} />
              </span>
            </p>
          </div>

          <div className="mobile-device-ui">
            <div className="mobile-device-ui-inner">
              <div className="mobile-device-ui-start">&nbsp;</div>

              {children}

              <div className="mobile-device-ui-end">&nbsp;</div>

              <div
                className="mobile-device-scroller"
                onClick={scrollIntoCheckListElement}
              >
                <div
                  className={_.join(
                    [
                      "mobile-device-scroller-icon ",
                      state.toEnd ? "mobile-device-scroller-icon-reverse" : "",
                    ],
                    " "
                  )}
                >
                  <FontAwesomeIcon icon={["fas", "circle-play"]} size="2x" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-device-cta">
          <a
            className="mobile-device-button"
            href="https://calendly.com/jonathan-vagnier/consultation-pour-creer-votre-site-ou-votre-application"
          >
            <span className="mobile-device-button-text">Prendre RDV</span>

            <span className="mobile-device-button-icon">
              <FontAwesomeIcon icon={["fas", "clock"]} />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
