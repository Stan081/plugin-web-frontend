import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add your script here */}
        {/* <script
          async
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBB32N6G4eSkIPwf5XV01n6mkLoXCHJCQQ&libraries=places&callback=initMap"
        ></script> */}
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
