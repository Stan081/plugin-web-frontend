import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Section } from "@/tw-components/Seaction";
import Link from "next/link";
import React, { Fragment } from "react";

const Error404Page = () => {
  return (
    <Layout title="Not found" showHeader showFooter>
      <Section
        id="not-found-page"
        className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" className="text-sm font-semibold text-gray-900">
              <Button variant="destructive">
                Go to home{" "}
                <span aria-hidden="true" className="ml-3">
                  &rarr;
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Error404Page;
