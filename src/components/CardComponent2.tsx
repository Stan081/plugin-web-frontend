import { useCheckBookmark } from "@/hooks/events/bookmark-favourite/useCheckBookmark";
import { useDeleteBookmark } from "@/hooks/events/bookmark-favourite/useDeleteBookmark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { useToast } from "./ui/use-toast";
import { AddFavourite } from "@/pages/api/mutate/event-favourite/addFavourite";
import { getToken } from "@/lib/token";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CardComponent2: FC<{ card: any }> = ({ card }) => {
  const { data: isCheck, isLoading: isLoadingBookmark } = useCheckBookmark(
    card?._id
  );

  const { mutate: removeBookmark, isPending } = useDeleteBookmark(card?._id);

  const client = useQueryClient();
  const { toast } = useToast();
  const token = getToken();
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/explore-events/${id}`);
  };

  const { mutate, isPending: pending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => AddFavourite(data),
    onSuccess: (response, card) => {
      client.invalidateQueries({ queryKey: ["isBookmark", card?._id] });
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event has been saved",
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Event has not been added to bookmark",
        description: error?.message,
      });
    },
  });

  const handleAddBookmark = () => {
    const data = {
      eventId: card?._id,
    };
    if (token) {
      mutate(data, {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["isBookmark", card?._id] });
        },
      });
    } else {
      return router.push("/login");
    }
  };

  const handleDeleteBookmark = () => {
    if (!token) {
      return router.push("/login");
    } else {
      removeBookmark(card?._id, {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["isBookmark", card?._id] });
        },
      });
    }
  };
  return (
    <div className="flex flex-col w-[25%] xs:max-md:min-w-[230px] bg-[#221A14] rounded-2xl cursor-pointer">
      <div className="group relative inline-block overflow-hidden rounded-2xl">
        <button className="w-full aspect-square xs:max-md:max-h-[300px] block overflow-hidden">
          <figure className="relative size-full">
            <div className="group-hover:opacity-0 absolute z-10 bottom-2 left-5 bg-destructive text-white text-xs font-semibold px-2 py-1 rounded-3xl">
              {card?.publishStatus}
            </div>
            <Image
              fill={true}
              src={card?.thumbnail ?? "/images/blue-bg.png"}
              alt={card?.eventName || "Event image"}
              className="object-cover"
            />
          </figure>
        </button>
        {/* The hover card */}
        <div className="rounded-2xl appear z-10 hidden backdrop-blur-[2px] px-5 py-1 font-pally-regular text-white justify-center items-start w-full h-full top-0 group-hover:flex flex-col group-hover:absolute bg-black bg-opacity-50 space-y-3">
          <p className="inline-flex bg-destructive text-white text-xs font-pally-regular px-2 py-1 rounded-3xl">
            {card?.publishStatus}
          </p>
          <h2
            onClick={() => handleCardClick(card?._id)}
            className="text-lg md:text-2xl font-pally-medium"
          >
            {card?.eventName?.length > 25
              ? card?.eventName.slice(0, 25).concat("...")
              : card?.eventName}
          </h2>
          <p className="text-sm md:text-md text-slate-200 font-pally-regular">
            {card?.locationType === "physical"
              ? card?.physicalLocation?.address?.length > 40
                ? card?.physicalLocation?.address?.slice(0, 40).concat("...")
                : card?.physicalLocation?.address
              : "Online"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-between p-4">
        <p className=" text-sm md:text-lg text-white font-bold font-pally-medium">
          {card?.eventName?.length > 25
            ? card?.eventName.slice(0, 25).concat("...")
            : card?.eventName}
        </p>
        <div
          onClick={
            isCheck?.data?.isFavorited
              ? handleDeleteBookmark
              : handleAddBookmark
          }
          className="text-white p-1 md:p-2 rounded-full cursor-pointer"
        >
          {isLoadingBookmark || isPending || pending ? (
            <Image
              src={"/gif/Animation.gif"}
              alt="spinner"
              width={50}
              height={25}
              className="w-5 h-5 p-0 bg-white rounded-full"
              unoptimized
            />
          ) : (
            <>
              {isCheck?.data?.isFavorited ? (
                <RiHeartFill size={24} className="destructive" />
              ) : (
                <RiHeartLine size={24} className="" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent2;
