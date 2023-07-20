// src/pages/Home.tsx

import _ from "lodash-es";
import { useState } from "react";
import { Isotope, IsotopeItem } from "../components/Isotope";
import PriceQuickViews from "../components/PriceQuickViews";
import PriceToggleView from "../components/PriceToggleView";
import PriceView from "../components/PriceView";
import PriceViewGroup from "../components/PriceViewGroup";
import Sheet from "../components/Sheet";
import useCardProvider from "../composables/cardProvider";
import useCheckListProvider from "../composables/checkListProvider";
import MobileDevice from "../components/MobileDevice";
import StackedList from "../components/StackedList";
import StackedListItem from "../components/StackedListItem";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import Icon from "../components/Icon";
import RevealedWords from "../components/RevealedWords";

export default function Home() {
  const cardProvider = useCardProvider();
  const checkList = useCheckListProvider();

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
    <main id="main">
      <div className="w-full flex lg:grid lg:grid-cols-2 gap-8 place-items-center">
        <div className="py-24 w-full flex flex-col gap-8 text-start">
          <div className="flex flex-col items-center gap-8">
            <Icon
              icon={["fas", "globe"]}
              size="4x"
              className="w-28 h-28 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>
            <h2 className="text-2xl text-center">
              <RevealedWords
                className="font-display"
                revealClass="text-3xl text-primary-500 font-source font-bold"
                words={[
                  "World !",
                  "design & animation",
                  "base de données",
                  "application mobile",
                  "site internet",
                  "réseaux sociaux",
                ]}
              >
                Hello,
              </RevealedWords>
            </h2>
          </div>

          <p className="w-full grid grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "users-gear"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-4">
              Dédiée à la création de projets Web sur mesure, notre équipe
              s'engage pour les artisans, les boutiques et les organismes à
              Paris et en Ile-De-France.
            </span>
          </p>

          <p className="w-full grid grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "person-arrow-up-from-line"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-4">
              Pour prendre soin au maximum de vos demandes, nous avons conçu
              pour vous approche progressive et consciencieuse qui respecte de
              votre rythme de travail et vos échéances.
            </span>
          </p>

          <p className="w-full grid grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "mobile-screen-button"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-4">
              De cette façon, nous pouvons développer le site internet et/ou
              l’application mobile qui reflète votre vision et vos valeurs.
            </span>
          </p>

          <p className="w-full grid grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "people-robbery"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-4">
              En nous confiant votre projet, vous travaillez avec des
              partenaires qui comprennent vos attentes et s'engagent à créer un
              outil numérique qui favorise votre croissance et votre visibilité
              en ligne.
            </span>
          </p>
        </div>

        <div className="flex justify-center py-8 relative">
          <MobileDevice>
            <StackedList>
              {_.map(checkList.find(1)?.body, (item, index) => (
                <StackedListItem
                  key={index}
                  id={`item-${item.id}`}
                  text={item.text}
                  icon={["fas", item.icon as IconName]}
                />
              ))}
            </StackedList>
          </MobileDevice>
        </div>
      </div>

      <div className="w-full flex flex-col px-4 lg:px-10 xl:px-20 py-10 shadow-md border-2 border-stone-300 rounded-2xl bg-stone-100">
        <PriceQuickViews
          title="Forfaits"
          content="Engagement sur un mois ou sur une année et surtout à volonté"
        >
          <PriceToggleView
            toggle={togglePriceQuickViews}
            variants={["Par mois", "Par années"]}
          />

          <PriceViewGroup {...state}>
            <PriceView
              quote="Démarrage"
              title={`${showPrice(120, "monthly")} €`}
              content={`Soit ${showPrice(120, "annualy")} € / an`}
              className="price-view-accent"
              onClick={handleIsotopeFilter("starter")}
              {...state}
            />
            <PriceView
              quote="Avancé"
              title={`${showPrice(240, "monthly")} €`}
              content={`Soit ${showPrice(240, "annualy")} € / an`}
              className="price-view-accent"
              onClick={handleIsotopeFilter("advance")}
              {...state}
            />
            <PriceView
              quote="Démarrage"
              title={`${showPrice(600, "monthly")} €`}
              content={`Soit ${showPrice(600, "annualy")} € / an`}
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
    </main>
  );
}
