import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add your script here */}
        <script
          async
          src="https://example.com/custom-script.js"
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
