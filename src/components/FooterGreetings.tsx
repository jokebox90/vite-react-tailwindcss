// src/Root.tsx

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import _ from "lodash-es";
import { ReactNode } from "react";
import Icon from "../components/Icon";
import Copyrights from "./Copyrights";
import "./FooterGreetings.css";

interface FooterGreetingsProps {
  children: ReactNode[] | ReactNode;
  title: string;
  icon: IconProp;
  content: string;
  notes: string;
  className?: string;
}

export default function FooterGreetings(Props: FooterGreetingsProps) {
  return (
    <div className={_.trim(`footer-greetings ${Props.className || ""}`)}>
      <div className="footer-greetings-inner">
        <div className="footer-greetings-logo">
          <Icon
            icon={Props.icon}
            className="text-primary-500 rotate-12"
            size="4x"
          />
        </div>

        {Props.children}

        <div className="footer-greetings-message">
          <p className="font-bold underline">{Props.title}</p>
          <p className="font-semibold">{Props.content}</p>
        </div>
      </div>

      <Copyrights>{Props.notes}</Copyrights>
    </div>
  );
}
