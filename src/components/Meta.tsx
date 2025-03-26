import React from "react";

import { FC } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

interface MetaProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const Meta: FC<MetaProps> = ({ title, description, canonical, image }) => {
  const metaDescription = description || "Plugin Entertainment";

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="57x57"
          href="apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href="apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href="apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href="apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="60x60"
          href="apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="120x120"
          href="apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="76x76"
          href="apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="152x152"
          href="apple-touch-icon-152x152.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="favicon-128.png"
          sizes="128x128"
        />
        <meta name="application-name" content="&nbsp;" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta
          name="msapplication-square150x150logo"
          content="mstile-150x150.png"
        />
        <meta
          name="msapplication-wide310x150logo"
          content="mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="mstile-310x310.png"
        />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />

        <meta name="description" content={metaDescription} />

        <meta property="og:url" content="Not yet url" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plugin" />
        <meta property="og:description" content={metaDescription} />
        <meta
          property="og:image"
          content={image ?? "/images/plugin-logo.svg"}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="Plugin" />
        <meta property="twitter:url" content="Twitter" />
        <meta name="twitter:title" content="Plugin" />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content={image ?? "/images/plugin-logo.svg"}
        />
      </Head>
      <NextSeo
        title={title}
        description={metaDescription}
        canonical={canonical}
        openGraph={{
          title: title,
          description: metaDescription,
          url: canonical,
          locale: "en",
          site_name: "Plugin",
        }}
      />
    </>
  );
};

export default Meta;
