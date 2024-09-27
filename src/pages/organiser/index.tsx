import React, { useState } from "react";
import Layout from "@/components/layout";
import { OrganiserData } from "@/static-datas/organiser-info";
import Image from "next/image";
import OrganiserInfo from "@/components/page-components/organisers/OrganiserInfo";
import CardComponent from "@/components/CardComponent";
import { cardData } from "@/static-datas/cards-data";

const OrganiserPage = () => {
  // Ensure there is at least one element in the OrganiserData array
  const { organiserName, aboutOrganiser } = OrganiserData[0];
    // Define state fo tab
    const [isActive, setIsActive] = useState<string>("physical");

    const tabLink = [
      { title: "Upcoming Events (6)", key: "upcoming" },
      { title: "Past Events", key: "past" }
    ];

  return (
    <Layout title="Organiser Page" showHeader showFooter>
      <div className="flex-col">
        {/* BANNER SECTION */}
        <div className="relative w-full h-[257px]">
          <Image
            src="/images/organiser-banner.png"
            alt="Organiser Banner"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        {/* CONTENT SECTION */}
        <div className="flex">
          {/* ORGANISER CARD */}
          <div className="flex-1">
            <OrganiserInfo
              organiserName={organiserName}
              aboutOrganiser={aboutOrganiser}
            />
          </div>
          <div className="flex-col gap-2 flex-end mt-5">
            <div>
              <ul className="flex justify-start items-center gap-4 align-baseline">
                {tabLink.map((tab) => (
                  <li key={tab.key} role="presentation">
                    <button
                      className={`border py-2 px-3 rounded-3xl ${
                        isActive === tab.key
                          ? "border-2 border-[#D9302A] text-[#D9302A]"
                          : "border-[#586170] text-[#586170]"
                      }`}
                      role="tab"
                      aria-selected={isActive === tab.key}
                      aria-controls={`panel-${tab.key}`}
                      id={`tab-${tab.key}`}
                      onClick={() => setIsActive(tab.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setIsActive(tab.key);
                        }
                      }}
                    >
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-4 pb-8 mt-4 w-full">
              {cardData.map((card) => (
                <CardComponent key={card.id} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrganiserPage;
