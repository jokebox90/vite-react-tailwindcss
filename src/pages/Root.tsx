// src/Root.tsx

import { IconName } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash-es";
import { Outlet } from "react-router-dom";
import useCheckListProvider from "../composables/checkListProvider";
import { Suspense, lazy } from "react";

type AppProps = {
  config: object;
};

export default function Root(Props: AppProps) {
  const checkList = useCheckListProvider();

  const Footer = lazy(() => import("../components/Footer"));
  const FooterGreetings = lazy(() => import("../components/FooterGreetings"));
  const FooterLink = lazy(() => import("../components/FooterLink"));
  const FooterLinks = lazy(() => import("../components/FooterLinks"));
  const Landing = lazy(() => import("../components/Landing"));
  // const LandingDescription = lazy(
  //   () => import("../components/LandingDescription")
  // );
  // const LandingNextSection = lazy(
  //   () => import("../components/LandingNextSection")
  // );
  // const LandingPoster = lazy(() => import("../components/LandingPoster"));
  const LandingQuote = lazy(() => import("../components/LandingQuote"));
  const LandingSection = lazy(() => import("../components/LandingSection"));
  const LandingTitle = lazy(() => import("../components/LandingTitle"));
  const MobileDevice = lazy(() => import("../components/MobileDevice"));
  const Navbar = lazy(() => import("../components/Navbar"));
  const NavbarBrand = lazy(() => import("../components/NavbarBrand"));
  const NavbarItem = lazy(() => import("../components/NavbarItem"));
  const NavbarMenu = lazy(() => import("../components/NavbarMenu"));
  const SocialLink = lazy(() => import("../components/SocialLink"));
  const SocialLinkGroup = lazy(() => import("../components/SocialLinkGroup"));
  const StackedList = lazy(() => import("../components/StackedList"));
  const StackedListItem = lazy(() => import("../components/StackedListItem"));

  return (
    <Suspense fallback={<div>Page is Loading...</div>}>
      <div data-theme="owner" className="max-w-screen bg-stone-200">
        <header className="header dark:header-dark">
          <Navbar>
            <NavbarBrand>PetitBoutDeCloud</NavbarBrand>
            <NavbarMenu>
              <NavbarItem to={`/`}>Home</NavbarItem>
            </NavbarMenu>
          </Navbar>

          <Landing className="bg-gradient-to-r from-primary-500 via-primary-400 to-primary-700">
            <LandingSection>
              <LandingTitle className="text-center underline underline-offset-8 text-accent-300">
                PetitBoutDeCloud
              </LandingTitle>

              <LandingQuote
                className="text-stone-50 text-center"
                truncate={{
                  length: 100,
                }}
              >
                L’agence Web consciente des petits détails qui font les grandes
                différences
              </LandingQuote>
            </LandingSection>
          </Landing>
        </header>

        <main id="main">
          <div className="w-full grid lg:grid-cols-2 gap-8">
            <div className="flex flex-col flex-wrap items-center justify-center">
              <h2 className="mb-8 text-5xl font-display">World Wide Web</h2>
              <p className="lg:text-xl font-semibold">
                Notre équipe est dédiée à la création de projets Web sur mesure
                pour les artisans, les boutiques et les organismes à Paris et en
                Ile-De-France. Nous avons conçu pour vous approche progressive
                et consciencieuse qui prend en compte votre rythme et vos
                attentes. De cette façon, nous pouvons développer le site
                internet et/ou l’application mobile qui reflète votre vision et
                vos valeurs. En nous confiant votre projet, vous travaillez avec
                des partenaires qui comprennent vos attentes et s'engagent à
                créer un outil numérique qui favorise votre croissance et votre
                visibilité en ligne.
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

          <Outlet context={{ config: Props.config }} />
        </main>

        <Footer>
          <FooterLinks title="Services">
            {_.map(
              [
                { title: "Web & Mobile" },
                { title: "Design" },
                { title: "Marketing" },
                { title: "Kit SEO" },
              ],
              (item, index) => {
                return <FooterLink key={index}>{item.title}</FooterLink>;
              }
            )}
          </FooterLinks>

          <FooterLinks title="Agence">
            {_.map(
              [
                { title: "A propos" },
                { title: "Contact" },
                { title: "Partenaires" },
                { title: "Blog" },
              ],
              (item, index) => {
                return <FooterLink key={index}>{item.title}</FooterLink>;
              }
            )}
          </FooterLinks>

          <FooterLinks title="Mentions légales">
            {_.map(
              [
                { title: "Conditions d'utilisation" },
                { title: "Politique de confidentialité" },
                { title: "Gestion des cookies" },
              ],
              (item, index) => {
                return <FooterLink key={index}>{item.title}</FooterLink>;
              }
            )}
          </FooterLinks>

          <FooterGreetings
            title="PetitBoutDeCloud"
            icon={["fas", "cloud-download"]}
            content="we got aa million ways to get IT, choose one !"
            notes="Jonathan Vagnier"
          >
            <SocialLinkGroup>
              <SocialLink icon="facebook-f" styles="blue" />
              <SocialLink icon="instagram" styles="pink" />
              <SocialLink icon="linkedin" styles="cyan" />
              <SocialLink icon="twitter" styles="sky" />
            </SocialLinkGroup>
          </FooterGreetings>
        </Footer>
      </div>
    </Suspense>
  );
}
