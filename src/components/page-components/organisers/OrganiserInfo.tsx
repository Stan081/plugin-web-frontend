import { ShowLess, ShowMore } from "@/components/ShowContentComponent";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { PiFlagPennantFill } from "react-icons/pi";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useMe } from "@/pages/api/query/me";
import {
  FollowOrganiser,
  useCheckFollow,
  useUnfollow,
} from "@/pages/api/mutate/follow/followOrg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { WEB_URL } from "@/lib/constants";

const OrganiserInfo: React.FC<{
  organiser: any;
}> = ({ organiser }) => {
  const [isShown, setIsShown] = useState<boolean>(true);
  const { data: userDate } = useMe();

  // console.log(organiser)

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

  const { data: isCheck, isLoading: isLaodingFollow } = useCheckFollow(
    organiser?.userId
  );
  const { mutate: removeFollow, isPending: PendingUnfollow } = useUnfollow(
    organiser?.userId
  );

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) => FollowOrganiser(data),
    onSuccess: (response) => {
      if (response?.message) {
        toast({
          variant: "success",
          title: "You have followed this organiser",
        });
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error?.message,
      });
    },
  });

  const handleFollow = () => {
    const data = {
      organizerId: organiser?.userId,
    };
    mutate(data, {
      onSuccess: () => {
        client.invalidateQueries({
          queryKey: ["isFollowing", organiser?.userId],
        });
        client.invalidateQueries({
          queryKey: ["organiser",],
        });
      },
    });
  };

  const handleUnfollow = () => {
    removeFollow();
  };

  return (
    <div className="lg:absolute top-52 md:top-48 left-0 md:left-40 z-20 float-right">
      <div className="w-full lg:w-96 border bg-white rounded-xl shadow-md shadow-[#8F706E26]/15 p-4">
        <div className="h-36 w-36 mx-auto">
          <Image
            src={organiser?.thumbnail ?? "/images/seagreen-bg.png"}
            alt={organiser?.name}
            width={1226}
            height={609}
            className=" pointer-events-none w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="my-4">
          <h3 className="font-pally-medium text-2xl text-center">
            {organiser?.name
              ? organiser?.name?.slice(0, 1).toLocaleUpperCase() +
                organiser?.name.slice(1)
              : organiser?.name}
          </h3>

          <div className="flex items-center justify-center mt-2 gap-4">
            <p className="font-pally-regular text-sm text-[#667185]">
              {organiser?.followers} Followers
            </p>
            {organiser?.userId !== userDate?.data?._id && (
              <Fragment>
                <div className="border border-[#77171624]/30 h-3" />
                {isPending || isLaodingFollow || PendingUnfollow ? (
                  <Skeleton className="w-8 h-3 rounded-full" />
                ) : (
                  <div
                    onClick={
                      isCheck?.isFollowing ? handleUnfollow : handleFollow
                    }
                  >
                    {isCheck?.isFollowing ? (
                      <p className="flex items-center gap-1.5 font-pally-medium text-sm destructive cursor-pointer">
                        unfollow
                      </p>
                    ) : (
                      <p className="flex items-center gap-1.5 font-pally-medium text-sm destructive cursor-pointer">
                        <RiUserAddLine size={18} />
                        <span>follow</span>
                      </p>
                    )}
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-2 my-4 lg:h-40 overflow-y-auto">
          <h4 className="font-pally-medium">About us</h4>
          <p className="font-pally-regular text-sm text-[#667185]">
            {isShown && organiser?.bio?.length > 150
              ? organiser?.bio?.slice(0, 150).concat("...")
              : organiser?.bio}
          </p>
          {organiser?.bio?.length > 150 && (
            <p
              onClick={() => setIsShown(!isShown)}
              className="font-pally-medium text-sm cursor-pointer"
            >
              {!isShown ? <ShowLess /> : <ShowMore />}
            </p>
          )}
        </div>

        <Separator />

        <div className="my-4">
          <h4 className="font-pally-medium">Connect with us on</h4>

          <div className="mt-3 flex items-center gap-5">
            <Link
              href={`${organiser?.data?.socials?.facebook}`}
              target="_blank"
            >
              <FaFacebook size={26} />
            </Link>
            <Link
              href={`${organiser?.data?.socials?.instagram}`}
              target="_blank"
            >
              <FaInstagram size={26} />
            </Link>
          </div>
        </div>

        <div
          onClick={() =>
            handleCopyLink(
              `${WEB_URL}/organiser/${organiser?.userId}`
            )
          }
          className="mt-6 cursor-pointer px-2 py-1 rounded-lg border flex items-center gap-2 w-32
      "
        >
          <p className="text-[#667185] font-pally-medium whitespace-nowrap text-sm">
            Copy page Link
          </p>
          <BsCopy size={18} color="#667185" />
        </div>
      </div>
      <Link href={`mailto:support@pluginent.com`} className="mt-7 font-pally-regular flex items-center gap-2 underline cursor-pointer px-4 text-gray-500">
        {" "}
        <span className="inline-block">
          <PiFlagPennantFill className="text-red-500" />
        </span>{" "}
        Report Organizer{" "}
      </Link>
    </div>
  );
};

export default OrganiserInfo;
