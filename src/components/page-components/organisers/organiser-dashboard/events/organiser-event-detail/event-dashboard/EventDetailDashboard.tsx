import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiInformationLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoCopy } from "react-icons/go";
import { useToast } from "@/components/ui/use-toast";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SaleTable from "./EventDashboard";

const EventDetailDashboard = () => {
  const { toast } = useToast();

  const handleCopyLink = async (saveLink: string) => {
    try {
      // Copy the link to the clipboard
      await navigator.clipboard.writeText(saveLink);

      toast({
        variant: "success",
        title: "Link copied to clipboard!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy link.",
      });
    }
  };
  const sharedLink: string = "http://localhost:3000/organiser/events/2";
  return (
    <div>
      <div className="flex justify-between">
        <p className="font-pally-medium text-2xl">Dashboard</p>
        <p className="destructive font-pally-medium text-sm md:text-lg flex items-center gap-2">
          <RiInformationLine size={24} /> Plugin takes 10% Per ticket
        </p>
      </div>

      <ul className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <li className="border-2 rounded-md p-4 space-y-2">
          <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
            5050{" "}
            <span className="font-pally-regular text-sm md:text-base">
              / 2500
            </span>
          </p>
          <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
            Tickets sold
          </p>
        </li>
        <li className="border-2 rounded-md p-4 space-y-2">
          <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
            N24.4k
          </p>
          <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
            Net Sale
          </p>
        </li>
        <li className="border-2 rounded-md p-4 space-y-2">
          <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
            N24.4k
          </p>
          <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
            Sale Profits
          </p>
        </li>
        <li className="border-2 rounded-md p-4 space-y-2">
          <p className="font-pally-medium text-[#281E17] text-base md:text-xl">
            4.4k
          </p>
          <p className="font-pally-regular text-[#515A6A] text-base md:text-lg">
            Attendees
          </p>
        </li>
      </ul>

      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <li className="border-2 border-[#C7E2FC] rounded-xl bg-[#F2F8FE] flex items-start gap-6 p-5">
          <Image
            src={"/images/speakerImg.svg"}
            width={82}
            height={86}
            alt="speaker"
            className="pointer-events-none w-20 h-20 "
          />
          <div className=" space-y-12">
            <div className="space-y-3 block">
              <p className="font-pally-medium text-xl ">Promotion Campaign </p>
              <p className="font-pally-regular text-sm md:text-base text-[#667185]">
                Increase your sales by 63% with a marketing campaign
              </p>
            </div>

            <Link
              href={"/#"}
              className="destructive flex items-center gap-2 font-pally-medium text-sm md:text-base"
            >
              Start campaign
              <MdOutlineKeyboardArrowRight size={22} />
            </Link>
          </div>
        </li>
        <li className="border-2 border-[#CFECD9] rounded-xl bg-[#F4FEF7] flex items-start gap-6 p-5">
          <div className="space-y-6 w-full">
            <div className="space-y-3">
              <p className="font-pally-medium text-xl w-full">
                Share Event Link
              </p>
              <div className="flex items-center justify-between gap-4 border border-[#667185] p-3 w-full rounded-md">
                <p className="font-pally-regular text-[#667185] text-sm">
                  {sharedLink.length > 30
                    ? sharedLink.slice(0, 30).concat("...")
                    : sharedLink}
                </p>
                <div onClick={() => handleCopyLink(sharedLink)} className="cursor-pointer">
                  <GoCopy size={20} color="#D9302A" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-pally-medium text-sm md:text-base">
                Share on :
              </p>
              <div className="p-2 rounded-full border">
                <FaGoogle size={20} />
              </div>
              <div className="p-2 rounded-full border">
                <FaFacebook size={20} />
              </div>
              <div className="p-2 rounded-full border">
                <FaXTwitter size={20} />
              </div>
            </div>
          </div>
        </li>
      </ul>

      <SaleTable/>
    </div>
  );
};

export default EventDetailDashboard;
