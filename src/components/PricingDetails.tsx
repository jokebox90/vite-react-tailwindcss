// src/pages/Home.tsx

import _ from "lodash-es";
import {
  RefObject,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import PriceToggleView from "./PriceToggleView";
import useCardProvider from "../composables/cardProvider";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import Icon from "./Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./PricingDetails.css";

export default function PricingDetails() {
  const { trackPageView } = useMatomo();
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

  const [pricing, setPricing] = useState({
    starter: 90,
    advance: 180,
    partner: 450,
  });

  const [periodicity, setPeriodicity] = useState("annualy");

  useEffect(() => {
    const calculate = (price: number) =>
      periodicity == "annualy" ? price : Math.round((price / 3) * 4);

    setPricing({
      starter: calculate(90),
      advance: calculate(180),
      partner: calculate(450),
    });
  }, [periodicity]);

  const [filter, setFilter] = useState(["starter", "advance", "partner"]);

  const handleFilter = (filter: string[]) => {
    const filters = document.querySelectorAll(".filter");

    const items = document.querySelectorAll(
      filter.length < 0
        ? `.details-item.${_.join(filter, ".")}`
        : ".details-item"
    );

    _.each(filters, async (node) => node.classList.remove("active"));
    _.each(items, async (node) => node.classList.remove("active"));

    const activateFilters = _.filter(
      filters,
      (node) => _.intersection(node.classList, filter).length > 0
    );

    const activateItems = _.filter(
      items,
      (node) => _.intersection(node.classList, filter).length > 0
    );

    _.each(activateFilters, async (node) => node.classList.add("active"));
    _.each(activateItems, async (node) => node.classList.add("active"));

    _.each(filters, async (node) => node.classList.remove("selected"));
    _.last(activateFilters)?.classList.add("selected");
  };

  const handleObserver = (observer: IntersectionObserver) => {
    _.each(document.querySelectorAll(".subscription"), (node) => {
      observer.observe(node);
    });
  };

  // Track page view
  useEffect(() => {
    trackPageView({});
  });

  useLayoutEffect(() => handleObserver(observerRef.current), [observerRef]);
  useEffect(() => handleFilter(filter), [filter]);

  const bodyRefs: RefObject<HTMLElement>[] = [];

  return (
    <div className="subscription">
      <div className="pb-4 flex flex-col lg:flex-row justify-between">
        <div className="text-start">
          <h3 className="pb-2 text-6xl font-display border-b-2 border-secondary-50">
            Forfaits
          </h3>

          <p className="pt-4 pb-4">
            Engagement sur un mois ou sur une année et surtout à volonté
          </p>
        </div>

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

      <div className="group">
        {_.map(
          [
            {
              name: "starter",
              className: "starter advance partner",
              filters: ["starter"],
              title: "Meilleure communication",
              price: pricing.starter,
              image: "photographe.jpg",
            },
            {
              name: "advance",
              className: "advance partner",
              filters: ["starter", "advance"],
              title: "Gain en efficaté",
              price: pricing.advance,
              image: "wordpress-developer.jpg",
            },
            {
              name: "partner",
              className: "partner",
              filters: ["starter", "advance", "partner"],
              title: "Forte croissance",
              price: pricing.partner,
              image: "app-store.jpg",
            },
          ],
          (item) => (
            <div
              className={_.join(["filter", item.className], " ")}
              onClick={() => {
                const slice = item.filters.slice(0, -1);

                setFilter((prevFilter) =>
                  _.isEqual(prevFilter, item.filters) ? slice : item.filters
                );
              }}
            >
              <div className="caption">
                <Icon
                  icon={
                    filter.includes(item.name)
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
          )
        )}
      </div>

      <div className="details">
        {_.map(["partner", "advance", "starter"].reverse(), (categoryName) => (
          <div className="flex flex-col gap-4">
            {_.map(
              cardProvider.findBy({ key: "category", value: categoryName }),
              (card, index) => {
                const bodyRef = createRef<HTMLParagraphElement>();

                bodyRefs.push(bodyRef);

                return (
                  <div
                    key={index}
                    className={`details-item ${categoryName}`}
                    onClick={() => {
                      _.each(bodyRefs, (ref) => {
                        if (ref === bodyRef) {
                          bodyRef.current?.classList.toggle("hidden");
                        } else {
                          ref?.current?.classList.add("hidden");
                        }
                      });
                    }}
                  >
                    <Icon icon={card.icon as IconProp} size="1x" />

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
        ))}
      </div>
    </div>
  );
}
