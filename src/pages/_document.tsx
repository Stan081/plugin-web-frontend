import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add your script here */}
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          data-custom-attribute="value"
        ></script>
        {/* Inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("Custom script running!");
              // Additional JavaScript logic can go here.
            `,
          }}
        />
      </Head>
      <body>
        <Suspense fallback={<div>Loading Home Component...</div>}>
          <Main />
        </Suspense>
        <NextScript />
      </body>
    </Html>
  );
}
