// src/pages/Home.tsx

import _ from "lodash-es";
import { useState } from "react";
import { Isotope, IsotopeItem } from "../components/Isotope";
import PriceQuickViews from "../components/PriceQuickViews";
import PriceToggleView from "../components/PriceToggleView";
import PriceView from "../components/PriceView";
import PriceViewGroup from "../components/PriceViewGroup";
import Sheet from "../components/Sheet";
import { useAppConfig } from "../composables/appConfig";
import useCardProvider from "../composables/cardProvider";

export default function Home() {
  const { config } = useAppConfig();
  const cardProvider = useCardProvider();

  const [state, setState] = useState({
    togglePrice: true,
    isotopeFilter: "filter-partner",
  });

  const togglePriceQuickViews = () =>
    setState({ ...state, togglePrice: !state.togglePrice });

  const showPrice = (price: number, term?: string) => {
    const priceTerms = {
      monthly: state.togglePrice ? Math.round((price * 9) / 12) : price,
      annualy: state.togglePrice ? price * 9 : price * 12,
    };

    return _.get(priceTerms, term || "monthly");
  };

  const handleIsotopeFilter = (filter: string) => () =>
    setState((prevState) => ({
      ...prevState,
      isotopeFilter: `filter-${_.kebabCase(filter)}`,
    }));

  const filters = {
    starter: "filter-starter filter-advance filter-partner",
    advance: "filter-advance filter-partner",
    partner: "filter-partner",
  };

  return (
    <div className="flex flex-col px-4 lg:px-20 py-10 shadow-md border-2 border-stone-300 rounded-2xl bg-stone-100">
      <PriceQuickViews
        title="Forfaits"
        comment="Engagement sur un mois ou sur une année et surtout à volonté"
      >
        <PriceToggleView
          toggle={togglePriceQuickViews}
          variants={["Par mois", "Par années"]}
        />

        <PriceViewGroup {...state}>
          <PriceView
            quote="Démarrage"
            title={`${showPrice(120, "monthly")} €`}
            comment={`Soit ${showPrice(120, "annualy")} € / an`}
            className="price-view-accent"
            onClick={handleIsotopeFilter("starter")}
            {...state}
          />
          <PriceView
            quote="Avancé"
            title={`${showPrice(240, "monthly")} €`}
            comment={`Soit ${showPrice(240, "annualy")} € / an`}
            className="price-view-accent"
            onClick={handleIsotopeFilter("advance")}
            {...state}
          />
          <PriceView
            quote="Démarrage"
            title={`${showPrice(600, "monthly")} €`}
            comment={`Soit ${showPrice(600, "annualy")} € / an`}
            active
            className="price-view-accent"
            onClick={handleIsotopeFilter("Partner")}
            {...state}
          />
        </PriceViewGroup>
      </PriceQuickViews>

      <Isotope filter={state.isotopeFilter} className="mt-16">
        {_.map(cardProvider.findAll(), (card, index) => (
          <IsotopeItem key={index} className={_.get(filters, card.category)}>
            <Sheet icon={card.icon} heading={card.title} body={card.body} />
          </IsotopeItem>
        ))}
      </Isotope>
    </div>
  );
}
