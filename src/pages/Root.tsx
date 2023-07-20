// src/Root.tsx

import { IconName } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash-es";
import { Outlet } from "react-router-dom";
import useCheckListProvider from "../composables/checkListProvider";
import { Suspense, lazy, useEffect, useState } from "react";
import Icon from "../components/Icon";
import Main from "../components/Main";

type AppProps = {
  config: object;
};

export default function Root(Props: AppProps) {
  const Footer = lazy(() => import("../components/Footer"));
  const FooterGreetings = lazy(() => import("../components/FooterGreetings"));
  const FooterLink = lazy(() => import("../components/FooterLink"));
  const FooterLinks = lazy(() => import("../components/FooterLinks"));
  const Landing = lazy(() => import("../components/Landing"));
  const LandingQuote = lazy(() => import("../components/LandingQuote"));
  const LandingSection = lazy(() => import("../components/LandingSection"));
  const LandingTitle = lazy(() => import("../components/LandingTitle"));
  const Navbar = lazy(() => import("../components/Navbar"));
  const NavbarBrand = lazy(() => import("../components/NavbarBrand"));
  const NavbarItem = lazy(() => import("../components/NavbarItem"));
  const NavbarMenu = lazy(() => import("../components/NavbarMenu"));
  const SocialLink = lazy(() => import("../components/SocialLink"));
  const SocialLinkGroup = lazy(() => import("../components/SocialLinkGroup"));

  return (
    <div data-theme="owner" className="max-w-screen bg-stone-200">
      <Suspense fallback={<div>Page is Loading...</div>}>
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
              <div
                className="animate-bounce"
                onClick={() =>
                  document.getElementById("main")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              >
                <Icon
                  icon={["fas", "play-circle"]}
                  size="2x"
                  className="rotate-90 text-white"
                ></Icon>
              </div>
            </LandingSection>
          </Landing>
        </header>
      </Suspense>

      <Outlet context={{ config: Props.config }} />

      <Suspense fallback={<div>Page is Loading...</div>}>
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
      </Suspense>
    </div>
  );
}
