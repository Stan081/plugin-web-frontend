import { Separator } from "@/components/ui/separator";
import { useGetOrganiserEvents } from "@/hooks/organiser/userGetOrganiserEvents";
import { useMe } from "@/pages/api/query/me";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import Image from "next/image";
import React from "react";
import { TabProgress } from "../../home/TabProgress";
import { RiEditLine, RiInformationFill } from "react-icons/ri";
import { campaignPlans } from "./CampaignType";
import { toFiat } from "@/lib/amount";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import Spinner from "@/tw-components/spinner";

const ReviewCampaign = () => {
  const { clickedCampaignId, setCurrentStep, setCheckedEvent, checkedEvent } =
    useOrganiserDashContext();

  console.log(checkedEvent);

  const { data: user } = useMe();
  const {
    data: organiserEvents,
    isLoading,
    isError,
  } = useGetOrganiserEvents(user?.data?._id);

  const now = new Date();

  const currentEvents = organiserEvents?.data?.data.filter((item) => {
    const startDate = new Date(
      item?.oneTimeEvent?.startDate || item?.recurringEvent?.startDate
    );
    return item.isPublished === true && startDate > now;
  });

  const pickedEvent = currentEvents?.find(
    (item) => item?._id === "674cf245bf5b4e478620ec81"
  );

  const campaignType = campaignPlans?.find(
    (item) => item.id === clickedCampaignId
  );

  const startDate: string =
    pickedEvent?.oneTimeEvent?.startDate ||
    pickedEvent?.recurringEvent?.startDate;

  const startTime: string =
    pickedEvent?.oneTimeEvent?.startTime ||
    pickedEvent?.recurringEvent?.startTime;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric", // Add year to the options
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  const [hour, minute] = startTime ? startTime.split(":") : ["00", "00"];
  const formattedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(hour),
    Number(minute)
  ).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });

  return (
    <div className="w-full md:w-3/5 pt-6 md:pt-10 md:px-10 rounded-lg h-screen bg-white flex flex-col justify-between">
      <div>
        <div className="space-y-4">
          <h2 className="text-4xl font-pally-medium">
            Review and Start Campaign{" "}
          </h2>
          <p className="text-[#475367] font-pally-regular text-lg">
            Review your preferences before starting a campaign
          </p>
          <Separator />
        </div>
        <div className="mt-6 block space-y-6">
          <p className="font-pally-medium text-xl">Event Details</p>

          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4 mt-4">
              {pickedEvent?.thumbnail && (
                <Image
                  src={pickedEvent?.thumbnail}
                  alt={pickedEvent?.eventName}
                  width={160}
                  height={134}
                  className="rounded-lg pointer-events-none object-cover w-40 h-32"
                />
              )}
              <div className="h-full space-y-3">
                <p className="font-pally-medium text-[#2C2B2E] text-base md:text-xl">
                  {pickedEvent?.eventName?.length > 25
                    ? pickedEvent?.eventName.slice(0, 25).concat("...")
                    : pickedEvent?.eventName}
                </p>
                <p className="font-pally-regular text-[#586170]">
                  Starts{" "}
                  <span className="font-pally-medium text-[#3D89DF]">
                    {formattedDate}
                  </span>{" "}
                  at{" "}
                  <span className="font-pally-medium text-[#3D89DF]">
                    {formattedTime}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[#667185] whitespace-nowrap font-pally-regular text-base">
                    Sale progress
                  </p>
                  <div className="w-52">
                    <TabProgress value={10} max={100} />
                  </div>
                  <p className="text-[#667185] whitespace-nowrap font-pally-regular">
                    {10}/{100}
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={() => setCurrentStep(2)}
              className="border border-[#586170] rounded-md p-1 cursor-pointer hover:border-black hover:shadow-md"
            >
              <RiEditLine size={24} className="text-[#586170]" />
            </div>
          </div>

          <div className="border rounded-lg p-2 md:p-4 mt-5 block">
            <div className="flex justify-between items-center">
              <p className="text-[#2C2B2E] font-pally-medium text-base md:text-lg">
                Campaign Type
              </p>
              <div
                onClick={() => setCurrentStep(1)}
                className="border border-[#586170] rounded-md p-1 cursor-pointer hover:border-black hover:shadow-md"
              >
                <RiEditLine size={24} className="text-[#586170]" />
              </div>
            </div>
            <p className="text-[#667185] font-pally-regular text-base md:text-base">
              {campaignType?.title}
            </p>
          </div>

          <div className="border rounded-lg p-2 md:p-4 mt-5 block">
            <p className="text-[#2C2B2E] font-pally-medium text-base md:text-lg">
              Campaign Plan
            </p>

            <p className="text-[#667185] font-pally-regular text-base md:text-base">
              {toFiat(campaignType?.price)}
            </p>
          </div>

          <div className="flex gap-3 items-center border border[#523300]/20 bg-[#F6F8F9] p-2 rounded-lg text-sm">
            <RiInformationFill size={18} color="#F3A218" />{" "}
            <p className="font-pally-regular text-[#667185]">
              Payment for selected plan is required to continue
            </p>
            <p className="font-pally-regular destructive flex items-center gap-2 underline">
              Pay Here <HiOutlineArrowNarrowRight size={16} color="#D9302A" />
            </p>
          </div>
        </div>
      </div>
      <div className="sticky z-50 bottom-0 bg-white">
        <Separator />
        <div className="py-5 flex justify-between items-center">
          <Button type="button" variant="outline">
            Back
          </Button>
          <Button
            type="submit"
            // disabled={isPending || isUpdatePending}
            variant="destructive"
          >
            {false ? <Spinner /> : "Start Campaign"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCampaign;
