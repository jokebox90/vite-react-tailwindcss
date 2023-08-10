// src/pages/Home.tsx

import _ from "lodash-es";
import { createRef, useEffect, useRef, useState } from "react";
import PriceToggleView from "./PriceToggleView";
import useCardProvider from "../composables/cardProvider";
import { useMatomo } from "@datapunt/matomo-tracker-react";
import Icon from "./Icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import "./PricingDetails.css";

export default function PricingDetails() {
  const { trackPageView } = useMatomo();
  const cardProvider = useCardProvider();
  const animateRef = createRef<HTMLDivElement>();
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

  const [state, setState] = useState({
    togglePrice: true,
  });

  const [filter, setFilter] = useState(["starter", "advance", "partner"]);

  const togglePriceQuickViews = () =>
    setState((prevState) => ({
      ...prevState,
      togglePrice: !prevState.togglePrice,
    }));

  const showPrice = (price: number, term?: string) => {
    const priceTerms = {
      monthly: state.togglePrice ? Math.round((price * 9) / 12) : price,
      annualy: state.togglePrice ? price * 9 : price * 12,
    };

    return _.get(priceTerms, term || "monthly");
  };

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

  useEffect(() => handleObserver(observerRef.current), [observerRef]);
  useEffect(() => handleFilter(filter), [filter]);

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
          toggle={togglePriceQuickViews}
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
              price: 120,
              image: "photographe.jpg",
            },
            {
              name: "advance",
              className: "advance partner",
              filters: ["starter", "advance"],
              title: "Gain en efficaté",
              price: 240,
              image: "wordpress-developer.jpg",
            },
            {
              name: "partner",
              className: "partner",
              filters: ["starter", "advance", "partner"],
              title: "Forte croissance",
              price: 600,
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

                <span>{`${showPrice(item.price, "monthly")} €`}</span>
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
              (card, index) => (
                <div key={index} className={`details-item ${categoryName}`}>
                  <Icon
                    icon={card.icon as IconProp}
                    size="1x"
                    className="details-icon"
                  />
                  <p className="text">{card.title}</p>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
