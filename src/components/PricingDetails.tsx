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
    <div className="pricing" ref={mainRef}>
      <div className="heading">
        <div className="heading-body">
          <h2>Partagez le savoir faire de votre organisation sur le web</h2>

          <p className="">
            Définissez le service adapté à votre manière de communiquer sur le
            web. Assurez-vous d'atteindre les personnes de votre choix et de
            remplir les objectifs fixés par votre activité. Nous mettons en
            oeuvre tous les outils numériques et les compétences techniques pour
            soutenir vos projets et vos ambitions au quotidien.
          </p>
        </div>

        <div className="heading-side">
          <h3>Engagement</h3>

          <label
            htmlFor="toggle-periodicity"
            className="inline-flex gap-4 px-8 py-4 bg-secondary-50 text-accent-500 font-bold rounded-xl"
          >
            <span>Par mois</span>

            <input
              id="toggle-periodicity"
              type="checkbox"
              className="toggle toggle-accent"
              checked={state.periodicity == "annualy"}
              onChange={() =>
                setState((prevState) => ({
                  ...prevState,
                  periodicity:
                    prevState.periodicity == "monthly" ? "annualy" : "monthly",
                }))
              }
            />

            <span>Par année</span>
          </label>
        </div>
      </div>

      <div className="option-group">
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
          (item, index, arr) => {
            const filterRef = createRef<HTMLDivElement>();

            filterRefs.push(filterRef);

            const handleFilter = async () => {
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
            };

            return (
              <div
                key={index}
                ref={filterRef}
                className={`option filter-${item.name}`}
              >
                <div className="option-heading"
                onClick={handleFilter}>
                  <h3 className="option-display-title">{item.title}</h3>

                  <div className="option-display-price">
                    <img src={`/img/${item.image}`} alt="" />

                    <span>&nbsp;</span>
                  </div>

                  <Icon
                    icon={
                      _.includes(state.active, `filter-${item.name}`)
                        ? ["fas", "check-square"]
                        : ["far", "square"]
                    }
                    size="1x"
                  />

                  <h4 className="option-title">
                    Option {_.upperFirst(item.name)}
                  </h4>

                  <p className="option-comment">{item.comment}</p>

                  <p className="option-price mb-4 text-6xl font-display">
                    {item.price} €
                  </p>

                  <p className="option-description">
                    Tarif mensuel
                    <br />
                    Soit {item.price * 12} € par an
                  </p>
                </div>

                {_.map(
                  cardProvider.findBy({
                    key: "category",
                    value: item.name,
                  }),
                  (feature, index) => {
                    const itemRef = createRef<HTMLDivElement>();
                    const bodyRef = createRef<HTMLParagraphElement>();

                    itemRefs.push(itemRef);
                    bodyRefs.push(bodyRef);

                    const handleCollapse = async () => {
                      _.each(itemRefs, async (ref) => {
                        if (ref === itemRef) {
                          ref.current?.classList.toggle("active");
                          trackEvent({
                            category: "subscriptin-details",
                            action: `${_.kebabCase(feature.title)}`,
                          });

                          console.log("Track event");
                        } else {
                          ref?.current?.classList.remove("active");
                        }
                      });
                    };

                    return (
                      <div
                        key={index}
                        ref={itemRef}
                        className="feature"
                        onClick={handleCollapse}
                      >
                        <Icon
                          icon={feature.icon as IconProp}
                          size="1x"
                          className="feature-icon"
                        />

                        <div className="feature-content">
                          <p className="feature-title">{feature.title}</p>
                          <Icon
                            icon="play"
                            size="1x"
                            className="feature-divider"
                          />
                          <p className="feature-body" ref={bodyRef}>
                            {feature.body}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
