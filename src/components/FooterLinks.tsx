// src/Root.tsx

import { Children, ReactNode } from "react";

interface FooterLinksProps {
  children: ReactNode[] | ReactNode;
  className?: string;
  title: string;
}

export default function FooterLinks(Props: FooterLinksProps) {
  return (
    <div
      className={`md:row-start-1 col-span-full md:col-span-1 grid grid-cols-1 gap-y-4 gap-4 place-items-start ${
        Props.className || ""
      }`}
    >
      <span className="footer-title text-stone-300">{Props.title}</span>
      {Children.map(Props.children, (child) => {
        return (
          <a className="link link-hover text-accent-400 hover:text-accent-500">
            {child}
          </a>
        );
      })}
    </div>
  );
}
