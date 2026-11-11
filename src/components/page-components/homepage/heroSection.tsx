"use client";
import { Section } from "@/tw-components/Section";
import React, { useState } from "react";
import Container from "@/tw-components/container";
import Image from "next/image";
import HomeNavbar from "./HomeNavbar";
import {
  FALLBACK_BANNER_IMAGE,
  SiteContentResponse,
  usePublicSiteContent,
} from "@/lib/siteContent";

const DEFAULT_TITLE = "Discover your next event";
const DEFAULT_DESCRIPTION = "With plugin entertainment";

const text = (value: unknown, fallback: string) =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

type HeroSectionProps = {
  /** Site content fetched when the page was rendered (getStaticProps). */
  initialSiteContent?: SiteContentResponse;
};

const HeroSection = ({ initialSiteContent }: HeroSectionProps) => {
  const { data: siteContentResponse, isPending } =
    usePublicSiteContent(initialSiteContent);

  const siteHero = siteContentResponse?.data?.hero;
  const apiImage = text(siteHero?.backgroundImage, "");

  // The banner the admin set; the fallback only when the API has none or that
  // image fails to load. While the content is still loading, show neither (just
  // the dark placeholder) so the fallback never flashes up first.
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const bannerImage =
    apiImage && failedImage !== apiImage
      ? apiImage
      : isPending
        ? null
        : FALLBACK_BANNER_IMAGE;

  const bannerTitleRaw = text(siteHero?.title, DEFAULT_TITLE);
  const titleParts = bannerTitleRaw.split(/\s+/).filter(Boolean);
  const bannerTitleLine1 = titleParts[0] || "Discover";
  const bannerTitleLine2 = titleParts.slice(1).join(" ") || "your next event";
  const bannerDescription = text(siteHero?.description, DEFAULT_DESCRIPTION);

  return (
    <Section
      id="hero section"
      clean
      className="relative isolate overflow-hidden"
    >
      <div className="relative w-full h-[70vh] lg:h-[85vh] bg-[#1b1b1f]">
        {bannerImage && (
          <Image
            key={bannerImage}
            src={bannerImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
            onError={() => {
              if (bannerImage !== FALLBACK_BANNER_IMAGE) setFailedImage(bannerImage);
            }}
          />
        )}
        <Container className="relative flex flex-col justify-between h-full">
          <HomeNavbar />
          <div className="w-full lg:w-1/2 mb-20">
            <h1 className="bg-[#F58986] inline-block px-3 lg:px-6 py-3 font-pally-medium text-3xl lg:text-6xl uppercase text-black">
              {bannerTitleLine1} <br />
            </h1>
            <h2 className="bg-gradient-to-r from-[#F58986] to-[#ffffff]/90 px-3 lg:px-6 py-3 font-pally-medium text-3xl lg:text-6xl uppercase text-black w-full">
              {bannerTitleLine2}
            </h2>
            <p className="mt-2 lg:mt-6 text-base lg:text-2xl font-pally-regular text-white uppercase lg:px-8">
              {bannerDescription}
            </p>
          </div>
        </Container>
      </div>
    </Section>
  );
};

export default HeroSection;
