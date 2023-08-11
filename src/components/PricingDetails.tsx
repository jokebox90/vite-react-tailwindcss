// src/pages/Home.tsx

import _ from "lodash-es";
import {
  Fragment,
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PriceToggleView from "./PriceToggleView";
import useCardProvider from "../composables/cardProvider";
import { useMatomo } from "@jonkoops/matomo-tracker-react";
import Icon from "./Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./PricingDetails.css";

export default function PricingDetails() {
  const { trackEvent } = useMatomo();
  const cardProvider = useCardProvider();
  const observerRef = useRef(
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("observe");
        } else {
          entry.target.classList.remove("observe");
        }
      });
    })
  );
  const itemRefs: RefObject<HTMLElement>[] = [];
  const bodyRefs: RefObject<HTMLElement>[] = [];
  const filterRefs: RefObject<HTMLElement>[] = [];

  const [selected, setSelected] = useState("filter-partner");
  const [active, setActive] = useState([
    "filter-starter",
    "filter-advance",
    "filter-partner",
  ]);
  const [periodicity, setPeriodicity] = useState("annualy");

  const calculate = useCallback(
    (price: number) =>
      periodicity == "annualy" ? price : Math.round((price / 3) * 4),
    [periodicity]
  );

  const handleObserver = (observer: IntersectionObserver) => {
    _.each(document.querySelectorAll(".subscription"), (node) => {
      observer.observe(node);
    });
  };

  useLayoutEffect(() => handleObserver(observerRef.current), [observerRef]);
  useEffect(() => {
    _.each(filterRefs, async (ref) => {
      if (_.intersection(ref.current?.classList, active).length > 0) {
        ref.current?.classList.add("active");
      } else {
        ref.current?.classList.remove("active");
      }

      if (_.includes(ref.current?.classList, selected)) {
        ref.current?.classList.add("selected");
      } else {
        ref.current?.classList.remove("selected");
      }
    });

    _.each(itemRefs, async (ref) => {
      if (_.intersection(ref.current?.classList, active).length > 0) {
        ref.current?.classList.add("active");
      } else {
        ref.current?.classList.remove("active");
      }

      if (_.includes(ref.current?.classList, selected)) {
        ref.current?.classList.add("selected");
      } else {
        ref.current?.classList.remove("selected");
      }
    });
  }, [active, selected, filterRefs, itemRefs]);

  return (
    <div className="subscription">
      <div className="pb-4 flex flex-col lg:grid lg:grid-cols-5 justify-between gap-4">
        <div className="text-start col-span-3">
          <h3 className="pb-2 text-3xl font-display border-b-2 border-secondary-50">
            Partagez le savoir faire de votre organisation sur le web
          </h3>

          <p className="pt-4 pb-4">
            Définissez le service adapté à votre manière de communiquer sur le
            web. Assurez-vous d'atteindre les personnes de votre choix et de
            remplir les objectifs fixés par votre activité. Nous mettons en
            oeuvre tous les outils numériques et les compétences techniques pour
            soutenir vos projets et vos ambitions au quotidien.
          </p>
        </div>

        <div className="col-span-2 lg:flex lg:justify-center lg:items-center">
          <PriceToggleView
            toggle={() =>
              setPeriodicity((prevPeriodicity) =>
                prevPeriodicity == "monthly" ? "annualy" : "monthly"
              )
            }
            variants={["Par mois", "Par années"]}
            className="self-start"
          />
        </div>
      </div>

      <div className="group">
        {_.map(
          [
            {
              name: "starter",
              filters: ["filter-starter"],
              title: "Meilleure communication",
              price: calculate(90),
              image: "photographe.jpg",
            },
            {
              name: "advance",
              filters: ["filter-starter", "filter-advance"],
              title: "Gain en efficaté",
              price: calculate(180),
              image: "wordpress-developer.jpg",
            },
            {
              name: "partner",
              filters: ["filter-starter", "filter-advance", "filter-partner"],
              title: "Forte croissance",
              price: calculate(450),
              image: "app-store.jpg",
            },
          ],
          (item, index, arr) => {
            const filterRef = createRef<HTMLDivElement>();

            filterRefs.push(filterRef);

            return (
              <Fragment key={index}>
                <div
                  ref={filterRef}
                  className={`filter filter-${item.name}`}
                  onClick={async () => {
                    if (selected === `filter-${item.name}`) {
                      setActive(item.filters.slice(0, -1));
                      setSelected(`filter-${arr[index - 1]?.name}`);
                    } else {
                      setActive(item.filters);
                      setSelected(`filter-${item.name}`);
                    }

                    trackEvent({
                      category: "subscription-filter",
                      action: `filter-${item.name}`,
                    });

                    console.log("Track event");
                  }}
                >
                  <div className="caption">
                    <Icon
                      icon={
                        _.includes(active, `filter-${item.name}`)
                          ? ["fas", "check-square"]
                          : ["far", "square"]
                      }
                      size="1x"
                    />

                    <span className="text">{item.title}</span>
                  </div>

                  <div className="price">
                    <img src={`/img/${item.image}`} alt="" />

                    <span>{`${item.price} €`}</span>
                  </div>
                </div>
              </Fragment>
            );
          }
        )}
      </div>

      <div className="details">
        {_.map(
          ["partner", "advance", "starter"].reverse(),
          (categoryName, key) => (
            <div key={key} className="flex flex-col gap-4">
              {_.map(
                cardProvider.findBy({ key: "category", value: categoryName }),
                (card, index) => {
                  const itemRef = createRef<HTMLDivElement>();
                  const bodyRef = createRef<HTMLParagraphElement>();

                  itemRefs.push(itemRef);
                  bodyRefs.push(bodyRef);

                  return (
                    <div
                      key={index}
                      ref={itemRef}
                      className={`details-item filter-${categoryName}`}
                      onClick={async () => {
                        _.each(bodyRefs, async (ref) => {
                          if (ref === bodyRef) {
                            bodyRef.current?.classList.toggle("hidden");
                            trackEvent({
                              category: "subscriptin-details",
                              action: `${_.kebabCase(card.title)}`,
                            });

                            console.log("Track event");
                          } else {
                            ref?.current?.classList.add("hidden");
                          }
                        });
                      }}
                    >
                      <Icon
                        icon={card.icon as IconProp}
                        size="1x"
                        className="greeter"
                      />

                      <div className="content">
                        <p className="title">{card.title}</p>
                        <Icon icon="play" size="1x" className="divider" />
                        <p className="body hidden" ref={bodyRef}>
                          {card.body}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
