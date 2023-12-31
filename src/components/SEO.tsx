// src/components/SEO.tsx

import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  content: string;
}

export default function SEO({ content, title }: SEOProps) {
  return (
    <Fragment>
      <Helmet>
        <html lang="fr" />
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
    </Fragment>
  );
}
