import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Suspense fallback={<div>Loading Home Component...</div>}>
          <Main />
        </Suspense>
        <NextScript />
      </body>
    </Html>
  );
}
