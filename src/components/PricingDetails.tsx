// src/pages/Home.tsx

import _ from "lodash-es";
import {
  Fragment,
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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
  const mainRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const categoryRefs: RefObject<HTMLElement>[] = useMemo(() => [], []);
  const itemRefs: RefObject<HTMLElement>[] = useMemo(() => [], []);
  const bodyRefs: RefObject<HTMLElement>[] = useMemo(() => [], []);
  const filterRefs: RefObject<HTMLElement>[] = useMemo(() => [], []);
  const [state, setState] = useState({
    selected: "filter-partner",
    active: ["filter-starter", "filter-advance", "filter-partner"],
    periodicity: "annualy",
  });

  const calculate = useCallback(
    (price: number) =>
      state.periodicity == "annualy" ? price : Math.round((price / 3) * 4),
    [state.periodicity]
  );

  useLayoutEffect(() => {
    if (mainRef.current) {
      observerRef.current.observe(mainRef.current);
    }
  }, [mainRef, observerRef]);

  useEffect(() => {
    _.each(filterRefs, async (ref) => {
      if (_.intersection(ref.current?.classList, state.active).length > 0) {
        ref.current?.classList.add("active");
      } else {
        ref.current?.classList.remove("active");
      }
    });

    _.each(itemRefs, async (ref) => {
      if (_.intersection(ref.current?.classList, state.active).length > 0) {
        ref.current?.classList.add("active");
      } else {
        ref.current?.classList.remove("active");
      }
    });

    _.each(categoryRefs, async (ref) => {
      if (_.intersection(ref.current?.classList, state.active).length > 0) {
        ref.current?.classList.add("active");
      } else {
        ref.current?.classList.remove("active");
      }
    });
  }, [state.active, filterRefs, itemRefs, categoryRefs]);

  useEffect(() => {
    _.each(filterRefs, async (ref) => {
      if (_.includes(ref.current?.classList, state.selected)) {
        ref.current?.classList.add("selected");
      } else {
        ref.current?.classList.remove("selected");
      }
    });

    _.each(itemRefs, async (ref) => {
      if (_.includes(ref.current?.classList, state.selected)) {
        ref.current?.classList.add("selected");
      } else {
        ref.current?.classList.remove("selected");
      }
    });

    _.each(categoryRefs, async (ref) => {
      if (_.includes(ref.current?.classList, state.selected)) {
        ref.current?.classList.add("selected");
      } else {
        ref.current?.classList.remove("selected");
      }
    });
  }, [state.selected, filterRefs, itemRefs, categoryRefs]);

  return (
    <div className="subscription" ref={mainRef}>
      <div className="pb-4 flex flex-col lg:grid lg:grid-cols-3 justify-between gap-4">
        <div className="text-start col-span-2">
          <h3 className="pb-4 text-3xl font-display">
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

        <div className="col-span-1 place-self-center">
          <p className="text-lg font-display">Engagement</p>
          <PriceToggleView
            toggle={() =>
              setState((prevState) => ({
                ...prevState,
                periodicity:
                  prevState.periodicity == "monthly"
                    ? "annualy"
                    : "monthly",
              }))
            }
            variants={["Par mois", "Par années"]}
            wrapperClass=""
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
                    if (state.selected === `filter-${item.name}`) {
                      setState((prevState) => ({
                        ...prevState,
                        active: item.filters.slice(0, -1),
                        selected: `filter-${arr[index - 1]?.name}`,
                      }));
                    } else {
                      setState((prevState) => ({
                        ...prevState,
                        active: item.filters,
                        selected: `filter-${item.name}`,
                      }));
                    }

                    trackEvent({
                      category: "subscription-filter",
                      action: `filter-${item.name}`,
                    });

                    console.log("Track event");
                  }}
                >
                  <h4 className="caption">
                    <Icon
                      icon={
                        _.includes(state.active, `filter-${item.name}`)
                          ? ["fas", "check-square"]
                          : ["far", "square"]
                      }
                      size="1x"
                    />
                    <span className="text">{item.title}</span>
                  </h4>

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
          [
            {
              name: "starter",
              filters: ["filter-starter"],
              title: "Meilleure communication",
              price: calculate(90),
              image: "photographe.jpg",
              comment: "Pour démarrer sereinement",
            },
            {
              name: "advance",
              filters: ["filter-starter", "filter-advance"],
              title: "Gain en efficaté",
              price: calculate(180),
              image: "wordpress-developer.jpg",
              comment: "Avec toutes les options Starter",
            },
            {
              name: "partner",
              filters: ["filter-starter", "filter-advance", "filter-partner"],
              title: "Forte croissance",
              price: calculate(450),
              image: "app-store.jpg",
              comment: "Avec toutes les options Advance",
            },
          ],
          (category, key) => {
            const categoryRef = createRef<HTMLParagraphElement>();

            categoryRefs.push(categoryRef);

            return (
              <Fragment key={key}>
                <div className="category" ref={categoryRef}>
                  <div className={`heading filter-${category.name}`}>
                    <h3 className="text-xl font-noto-serif font-bold small-caps">
                      Options {_.upperFirst(category.name)} *
                    </h3>
                    <div
                      className={`w-1/4 mx-auto mt-4 filter-${category.name}`}
                    ></div>
                    <p>Tarif de {category.price} € par mois</p>
                    <p>Soit {category.price * 12} € par an</p>
                    <p className="italic text-sm mt-4">* {category.comment}</p>
                  </div>

                  {_.map(
                    cardProvider.findBy({
                      key: "category",
                      value: category.name,
                    }),
                    (card, index) => {
                      const itemRef = createRef<HTMLDivElement>();
                      const bodyRef = createRef<HTMLParagraphElement>();

                      itemRefs.push(itemRef);
                      bodyRefs.push(bodyRef);

                      return (
                        <div
                          key={index}
                          ref={itemRef}
                          className={`details-item filter-${category.name}`}
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
              </Fragment>
            );
          }
        )}
      </div>
    </div>
  );
}
