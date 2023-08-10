// src/pages/Home.tsx

import _ from "lodash-es";
import { Suspense, lazy, useEffect } from "react";
import useCheckListProvider from "../composables/checkListProvider";
import MobileDevice from "../components/MobileDevice";
import StackedList from "../components/StackedList";
import StackedListItem from "../components/StackedListItem";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import Icon from "../components/Icon";
import RevealedWords from "../components/RevealedWords";
import { useMatomo } from "@datapunt/matomo-tracker-react";

export default function Home() {
  const { trackPageView } = useMatomo();
  const checkList = useCheckListProvider();
  const PricingDetails = lazy(() => import("../components/PricingDetails"));

  // Track page view
  useEffect(() => {
    trackPageView({});
  });

  return (
    <main id="main">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
        <div className="px-4 py-24 w-full flex flex-col gap-8 text-start">
          <div className="flex flex-col items-center gap-8">
            <Icon
              icon={["fas", "globe"]}
              size="4x"
              className="w-28 h-28 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>
            <h2 className="text-lg md:text-2xl text-center">
              <RevealedWords
                className="font-display"
                revealClass="text-xl md:text-3xl text-primary-500 font-source font-bold"
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

          <p className="w-full grid grid-cols-4 md:grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "users-gear"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-3 md:col-span-4">
              Dédiée à la création de projets Web sur mesure, notre équipe
              s'engage pour les artisans, les boutiques et les organismes à
              Paris et en Ile-De-France.
            </span>
          </p>

          <p className="w-full grid grid-cols-4 md:grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "person-arrow-up-from-line"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-3 md:col-span-4">
              Pour prendre soin au maximum de vos demandes, nous avons conçu
              pour vous approche progressive et consciencieuse qui respecte de
              votre rythme de travail et vos échéances.
            </span>
          </p>

          <p className="w-full grid grid-cols-4 md:grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "mobile-screen-button"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-3 md:col-span-4">
              De cette façon, nous pouvons développer le site internet et/ou
              l'application mobile qui reflète votre vision et vos valeurs.
            </span>
          </p>

          <p className="w-full grid grid-cols-4 md:grid-cols-5 place-items-center gap-4">
            <Icon
              icon={["fas", "people-robbery"]}
              size="2x"
              className="w-20 h-20 text-white bg-secondary-500 rounded-b-3xl rounded-t-xl p-4 shadow-md"
            ></Icon>

            <span className="lg:text-xl col-span-3 md:col-span-4">
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


      <Suspense fallback={<div>Chargement des tarifs...</div>}>
        <PricingDetails />
      </Suspense>
    </main>
  );
}
