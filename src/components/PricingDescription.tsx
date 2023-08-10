// src/pages/Home.tsx

import _ from "lodash-es";
import { useEffect, useState } from "react";
import { Isotope, IsotopeItem } from "../components/Isotope";
import PriceQuickViews from "../components/PriceQuickViews";
import PriceToggleView from "../components/PriceToggleView";
import PriceView from "../components/PriceView";
import PriceViewGroup from "../components/PriceViewGroup";
import Sheet from "../components/Sheet";
import useCardProvider from "../composables/cardProvider";
import { useMatomo } from "@datapunt/matomo-tracker-react";

export default function PricingDescription() {
  const { trackPageView } = useMatomo();
  const cardProvider = useCardProvider();

  const [state, setState] = useState({
    togglePrice: true,
    filter: "filter-partner",
  });

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

  const handleFilter = (filter: string) =>
    setState((prevState) => ({
      ...prevState,
      filter,
    }));

  const filters = {
    starter: "filter-starter filter-advance filter-partner",
    advance: "filter-advance filter-partner",
    partner: "filter-partner",
  };

  // Track page view
  useEffect(() => {
    trackPageView({});
  });

  return (
    <div className="w-full flex flex-col gap-y-16 px-4 lg:px-10 xl:px-20 py-10 shadow-md border-2 border-stone-300 rounded-2xl bg-light-100">
      <PriceQuickViews
        title="Forfaits"
        content="Engagement sur un mois ou sur une année et surtout à volonté"
      >
        <PriceToggleView
          toggle={togglePriceQuickViews}
          variants={["Par mois", "Par années"]}
        />

        <PriceViewGroup>
          <PriceView
            quote="Démarrage"
            title={`${showPrice(120, "monthly")} €`}
            content={`Soit ${showPrice(120, "annualy")} € / an`}
            active={state.filter == "filter-starter"}
            className="price-view-accent"
            onClick={() => handleFilter("filter-starter")}
          />

          <PriceView
            quote="Avancé"
            title={`${showPrice(240, "monthly")} €`}
            content={`Soit ${showPrice(240, "annualy")} € / an`}
            active={state.filter == "filter-advance"}
            className="price-view-accent"
            onClick={() => handleFilter("filter-advance")}
          />

          <PriceView
            quote="Démarrage"
            title={`${showPrice(600, "monthly")} €`}
            content={`Soit ${showPrice(600, "annualy")} € / an`}
            active={state.filter == "filter-partner"}
            className="price-view-accent"
            onClick={() => handleFilter("filter-partner")}
          />
        </PriceViewGroup>
      </PriceQuickViews>

      <Isotope {...state}>
        {_.map(cardProvider.findAll(), (card, index) => (
          <IsotopeItem key={index} className={_.get(filters, card.category)}>
            <Sheet icon={card.icon} heading={card.title} body={card.body} />
          </IsotopeItem>
        ))}
      </Isotope>
    </div>
  );
}
