// src/components/SEO.tsx

import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  content: string;
}

export default function SEO({ content, title }: SEOProps) {
  return (
    <div>
      <Helmet>
        <html lang="fr" />
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
    </div>
  );
}
