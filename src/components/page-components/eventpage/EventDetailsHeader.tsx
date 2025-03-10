"use client"
import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useCheckBookmark } from "@/hooks/events/bookmark-favourite/useCheckBookmark";
import { useDeleteBookmark } from "@/hooks/events/bookmark-favourite/useDeleteBookmark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AddFavourite } from "@/pages/api/mutate/event-favourite/addFavourite";
import { Skeleton } from "@/components/ui/skeleton";
import { getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { WEB_URL } from "@/lib/constants";
import { RWebShare } from "react-web-share";

interface Props {
  title: string;
  image: string;
  id: string;
}

const EventDetailsHeader: React.FC<Props> = ({ title, image, id }) => {
  const { data: isCheck, isLoading: isLoadingBookmark } = useCheckBookmark(id);
  const { mutate: removeBookmark, isPending } = useDeleteBookmark(id);

  const client = useQueryClient();
  const { toast } = useToast();
  const token = getToken();
  const router = useRouter();

  const { mutate } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => AddFavourite(data),
    onSuccess: (response, id) => {
      client.invalidateQueries({ queryKey: ["isBookmark", id] });
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
      eventId: id,
    };
    if (token) {
      mutate(data, {
        onSuccess: () => {
          client.invalidateQueries({ queryKey: ["isBookmark", id] });
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
      removeBookmark();
      client.invalidateQueries({ queryKey: ["isBookmark"] });
      return
    }
  };

  const handleCopyLink = async (saveLink: string) => {
    try {
      await navigator.clipboard.writeText(saveLink);

      toast({
        variant: "success",
        title: "Link copied to clipboard!",
      });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Failed to copy link.",
      });
    }
  };

  const saveLink = `${WEB_URL}/explore-events/${id}`
  return (
    <div className="mt-5 md:mt-8">
      <div className="flex justify-between">
        <h1 className="hidden md:flex text-2xl md:text-4xl font-pally-medium">
          {title}
        </h1>
        <h1 className="md:hidden flex text-2xl md:text-4xl font-pally-medium">
          {title}
        </h1>
        <ul className="flex gap-4 md:gap-8">
          <li 
          onClick={() => handleCopyLink(saveLink)} 
          className="flex items-center gap-1.5 cursor-pointer">
            <MdOutlineFileUpload size={20} />
            <p className="hidden md:flex">Share</p>
          </li>
          <li
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={
              isCheck?.data?.isFavorited
                ? handleDeleteBookmark
                : handleAddBookmark
            }
          >
            <>
              {isCheck?.data?.isFavorited ? (
                <>
                  {isLoadingBookmark || isPending ? (
                    <Skeleton className="w-5 h-5" />
                  ) : (
                    <RiHeart3Fill size={20} className="destructive" />
                  )}
                  <p className="hidden md:flex">Saved</p>
                </>
              ) : (
                <>
                  {isLoadingBookmark || isPending ? (
                    <Skeleton className="w-5 h-5" />
                  ) : (
                    <RiHeart3Line size={20} />
                  )}
                  <p className="hidden md:flex">Save</p>
                </>
              )}
            </>
          </li>
        </ul>
      </div>
      <div className="h-[200px] md:h-[500px] mt-6 md:mt-10 ">
        {image && (
          <img
            src={image}
            alt={title}
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full rounded-xl object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailsHeader;
