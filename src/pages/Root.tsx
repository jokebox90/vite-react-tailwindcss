// src/Root.tsx

import { IconName } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash-es";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import FooterGreetings from "../components/FooterGreetings";
import FooterLink from "../components/FooterLink";
import FooterLinks from "../components/FooterLinks";
import Landing from "../components/Landing";
import LandingDescription from "../components/LandingDescription";
import LandingNextSection from "../components/LandingNextSection";
import LandingPoster from "../components/LandingPoster";
import LandingQuote from "../components/LandingQuote";
import LandingSection from "../components/LandingSection";
import LandingTitle from "../components/LandingTitle";
import MobileDevice from "../components/MobileDevice";
import Navbar from "../components/Navbar";
import NavbarBrand from "../components/NavbarBrand";
import NavbarItem from "../components/NavbarItem";
import NavbarMenu from "../components/NavbarMenu";
import SocialLink from "../components/SocialLink";
import SocialLinkGroup from "../components/SocialLinkGroup";
import StackedList from "../components/StackedList";
import StackedListItem from "../components/StackedListItem";
import useCheckListProvider from "../composables/checkListProvider";

type AppProps = {
  config: object;
};

export default function Root(Props: AppProps) {
  const checkList = useCheckListProvider();
  return (
    <div data-theme="owner" className="max-w-screen bg-stone-200">
      <header className="header dark:header-dark">
        <Navbar>
          <NavbarBrand>PetitBoutDeCloud</NavbarBrand>
          <NavbarMenu>
            <NavbarItem to={`/`}>Home</NavbarItem>
          </NavbarMenu>
        </Navbar>

        <Landing className="bg-gradient-to-r from-primary-500 via-primary-400 to-primary-700">
          <LandingSection
            className="flex-1"
            innerClass="justify-start items-center"
          >
            <div className="md:w-11/12 xl:w-4/5 2xl:w-full">
              <LandingTitle className="underline underline-offset-8 text-accent-300">
                PetitBoutDeCloud
              </LandingTitle>

              <LandingQuote
                className="text-stone-50"
                truncate={{
                  length: 100,
                }}
              >
                L’agence Web consciente des petits détails qui font les grandes
                différences
              </LandingQuote>
            </div>

            <LandingDescription className="self-center flex items-center bg-stone-100 rounded-r-3xl">
              Notre équipe est dédiée à la création de projets Web sur mesure
              pour les artisans, les boutiques et les organismes à Paris et en
              Ile-De-France. Nous avons conçu pour vous approche progressive et
              consciencieuse qui prend en compte votre rythme et vos attentes.
              De cette façon, nous pouvons développer le site internet et/ou
              l’application mobile qui reflète votre vision et vos valeurs. En
              nous confiant votre projet, vous travaillez avec des partenaires
              qui comprennent vos attentes et s'engagent à créer un outil
              numérique qui favorise votre croissance et votre visibilité en
              ligne.
            </LandingDescription>
          </LandingSection>

          <LandingPoster className="self-center">
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
          </LandingPoster>
          <LandingNextSection size="2x" />
        </Landing>
      </header>

      <main className="main" id="main">
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
  );
}
