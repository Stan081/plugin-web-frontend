import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import React, { FC, useState } from "react";
import TicketIcon from "../../icons/ticket";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CardProps } from "@/static-datas/cards-data";
import { useCheckBookmark } from "@/hooks/events/bookmark-favourite/useCheckBookmark";
import { useDeleteBookmark } from "@/hooks/events/bookmark-favourite/useDeleteBookmark";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AddFavourite } from "@/pages/api/mutate/event-favourite/addFavourite";
import Link from "next/link";
import { toFiat } from "@/lib/amount";

const EventListComponent: FC<{ card: any }> = ({ card }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { data: isCheck, isLoading: isLoadingBookmark } = useCheckBookmark(
    card?._id
  );
  const { mutate: removeBookmark, isPending } = useDeleteBookmark(card?._id);

  const { toast } = useToast();

  console.log(isCheck?.data);

  const startDate: string =
    card?.oneTimeEvent?.startDate || card?.recurringEvent?.startDate;

  const startTime: string =
    card?.oneTimeEvent?.startTime || card?.recurringEvent?.startTime;

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

  const { mutate } = useMutation({
    mutationFn: (data: any) => AddFavourite(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event has been saved",
          // description: `${response?.message}`,
        });
        // setCookie("event_id", response?.data?._id);
      }
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Event has not been added to bookmark",
        description: error?.message,
      });
    },
  });

  const handleBookmark = () => {
    if (!isCheck?.data?.isFavorited) {
      const data = {
        eventId: card?._id,
      };
      mutate(data);
    } else {
      removeBookmark(card?._id);
    }
  };

  return (
    <div>
      <div className="flex items-start mb-3 border-b gap-2.5 pb-7 w-full justify-between">
        <div className="flex gap-3">
          <div className="relative w-36 lg:w-48 rounded-2xl border overflow-hidden">
            <img
              className="w-full md:h-36 object-cover"
              src={card?.thumbnail ?? "/images/blue-bg.png"}
              alt={card?.eventName || "Event image"}
              width={300}
              height={200}
            />
            <div className="absolute bottom-2 left-2 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl font-pally-medium">
              {card?.publishStatus}
            </div>
          </div>
          <Link
            href={`/explore-events/${card?._id}`}
            className="p-4 cursor-pointer transition delay-75 ease-in-out"
          >
            <h2 className="text-lg md:text-xl font-bold font-pally-medium">
              {card?.eventName?.length > 25
                ? card?.eventName.slice(0, 25).concat("...")
                : card?.eventName}
            </h2>
            <p className="text-sm md:text-lg text-gray-500 font-pally-regular">
              {card?.locationType === "physical"
                ? card?.physicalLocation?.address
                : "Online"}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm md:text-lg destructive font-pally-regular">
                {formattedDate ?? "No set date"}
              </p>
              <div className="h-5 border border-gray-400" />
              <p className="text-sm md:text-lg destructive font-pally-regular">
                {formattedTime ?? "No set time"}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <TicketIcon />
              <p className="text-sm md:text-lg text-black font-pally-medium">
                {card?.entryTicket?.ticketPrice ? (
                  toFiat(card?.entryTicket?.ticketPrice)
                ) : (
                  <span className=" text-sm">Click to explore price</span>
                )}
              </p>
            </div>
          </Link>
        </div>
        <div
          onClick={handleBookmark}
          className=" bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
        >
          {isLoadingBookmark || isPending ? (
            <Image
              src={"/gif/Animation.gif"}
              alt="spinner"
              width={50}
              height={25}
              className="w-5 h-5 p-0 rounded-full"
              unoptimized
            />
          ) : (
            <>
              {!isCheck?.data?.isFavorited ? (
                <RiHeartLine size={24} />
              ) : (
                <RiHeartFill size={24} className="destructive" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventListComponent;
