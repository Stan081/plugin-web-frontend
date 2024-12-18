import Container from "@/tw-components/container";
import React from "react";
import OrganiserPlans from "../OrganiserPlans";

const OurPackages = () => {
  return (
    <Container className="py-12 space-y-8">
      <div className="mx-auto space-y-3 flex flex-col items-center">
        <h2 className="text-[#475367] text-center font-pally-medium text-3xl">
          Get More Attendees with Our Ad Packages!
        </h2>
        <p className="text-base font-pally-regular md:text-lg text-center max-w-lg w-full text-[#667185]">
          Choose from our Basic, Pro, or Premium plans to target audiences and
          drive more ticket sales.
        </p>
      </div>

      <OrganiserPlans />

      {/* <div className="hidden xs:max-md:block w-[95%] mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full md:w-3/5 mx-auto"
        >
          <ul className="space-y-4">
            {adPackagesData.slice(1).map((ad) => (
              <li key={ad.title}>
                <AccordionItem
                  value={ad.title as string}
                  className={`py-3 px-4 border-4 border- ${
                    isOpen === ad.title && " bg-[#F4F6F9]"
                  } rounded-2xl`}
                  onClick={() => openAccordion(ad.title)}
                >
                  <AccordionTrigger className=" font-pally-medium text-xl  text-[#344054] ">
                    <div className="flex items-end gap-2">
                      <div className="">
                        <input
                          checked={isOpen === ad.title}
                          type="checkbox"
                          className="size-4 accent-[#344054] rounded-lg"
                        />
                      </div>
                      <p className="">
                        {ad.title} - {toFiat(ad.pricing)}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className=" font-pally-regular text-base md:text-lg">
                    <p className="font-pally-regular text-[#667185] text-base leading-6">
                      This plan includes all the following perks below:{" "}
                    </p>
                    <ul className="list-inside list-disc ml-2 space-y-1 mt-2">
                      {ad.data[0].split(",").map((platform) => (
                        <li
                          key={platform}
                          className="font-pally-regular text-[#667185] text-sm md:text-base leading-6"
                        >
                          {platform}{" "}
                        </li>
                      ))}
                      <li className="font-pally-regular text-[#667185] text-sm md:text-base leading-6">
                        {ad.data[1]} impressions
                      </li>
                      <li className="font-pally-regular text-[#667185] text-sm md:text-base leading-6">
                        {ad.data[2]} runtime duration
                      </li>
                      <li className="font-pally-regular text-[#667185] text-sm md:text-base leading-6">
                        {ad.addOns}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </li>
            ))}
          </ul>
        </Accordion>
      </div> */}
    </Container>
  );
};

export default OurPackages;
