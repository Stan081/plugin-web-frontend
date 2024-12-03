import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useCheckBookmark } from "@/hooks/events/bookmark-favourite/useCheckBookmark";
import { useDeleteBookmark } from "@/hooks/events/bookmark-favourite/useDeleteBookmark";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { AddFavourite } from "@/pages/api/mutate/event-favourite/addFavourite";

interface Props {
  title: string;
  image: string;
  id: string;
}

const EventDetailaHeader: React.FC<Props> = ({ title, image, id }) => {
  const { data: isCheck } = useCheckBookmark(id);
  const { mutate: removeBookmark } = useDeleteBookmark(id);

  const client = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => AddFavourite(data),
    onSuccess: (response, id) => {
      client.invalidateQueries({ queryKey: ["isBookmark", id] });
      if (response?.message) {
        toast({
          variant: "success",
          title: "Event has been saved",
          // description: `${response?.message}`,
        });
        // setCookie("event_id", response?.data?._id);
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
    mutate(data, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["isBookmark", id] });
      },
    });
  };

  const handleDeleteBookmark = () => {
    removeBookmark(id, {
      onSuccess: () => {
        client.invalidateQueries({ queryKey: ["isBookmark", id] });
      },
    });
  };
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
          <li className="flex items-center gap-1.5 cursor-pointer">
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
                  <RiHeart3Fill size={20} className="destructive" />
                  <p className="hidden md:flex">Saved</p>
                </>
              ) : (
                <>
                  <RiHeart3Line size={20} />
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

export default EventDetailaHeader;
