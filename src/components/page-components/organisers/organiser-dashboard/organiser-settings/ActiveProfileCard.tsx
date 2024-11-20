import { OrganiserProfileType } from "@/models";
import Image from "next/image";
import React, { FC, Fragment, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import DeleteProfilePrompt from "./DeleteProfilePrompt";
import ViewProfile from "./ViewProfile";
import ProfileFormModal from "./ProfileFormModal";
import { useRouter } from "next/router";
import { useOrganiserDashContext } from "@/providers/organiser_dashboard.provider";
import { useGetOrgProfileById } from "@/hooks/organiserProfile/useGetOrganiserProfile";
import { Skeleton } from "@/components/ui/skeleton";

const ActiveProfileCard: FC<{}> = ({}) => {
  const { data: orgProfile, isLoading } = useGetOrgProfileById();
  const { showProfile, handleCloseProfile } = useOrganiserDashContext();
  const [showDeleteMode, setShowDeleteMode] = useState<boolean>(false);

  const router = useRouter();
  return (
    <Fragment>
      <div className="mt-8 w-full max-w-2xl border rounded-xl p-4 md:p-6 flex justify-between items-start">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="w-40 h-32 rounded-lg" />
          ) : (
            <Image
              src={ orgProfile?.data?.thumbnail ??"/images/blue-bg.png"}
              alt="event"
              width={160}
              height={134}
              className="rounded-lg pointer-events-none object-cover w-40 h-32"
            />
          )}
          <div className="flex flex-col items-start gap-5">
            {isLoading ? (
              <Skeleton className="w-32 h-6" />
            ) : (
              <p className="text-[#101928] font-pally-medium text-base md:text-lg">
                {orgProfile?.data?.name}
              </p>
            )}

            <p className="text-[#036B26] rounded-full bg-[#DFFDE9] border border-[#B5E3C4] py-0.5 px-2">
              Active
            </p>
          </div>
        </div>

        <Popover>
          <PopoverTrigger>
            <div className="text-[#667185] rounded-3xl border border-[#667185] p-1.5">
              <HiOutlineDotsVertical size={24} />
            </div>
          </PopoverTrigger>
          <PopoverContent className="bg-white mt-0 w-40">
            <div className="space-y-2">
              <p
                onClick={handleCloseProfile}
                className="hover:bg-gray-200 cursor-pointer flex items-center p-1.5 rounded-md text-sm "
              >
                <MdOutlineEdit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </p>
              <p
                onClick={() => router.push("/organiser/1")}
                className="hover:bg-gray-200 cursor-pointer flex items-center p-1.5 rounded-md text-sm "
              >
                <MdOutlineRemoveRedEye className="mr-2 h-4 w-4" />
                <span>View</span>
              </p>
              <p
                onClick={() => setShowDeleteMode(!showDeleteMode)}
                className="hover:bg-gray-200 cursor-pointer flex items-center p-1.5 rounded-md text-sm "
              >
                <BsTrash3 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {showDeleteMode && <DeleteProfilePrompt />}
      {showProfile && <ProfileFormModal />}
    </Fragment>
  );
};

export default ActiveProfileCard;
