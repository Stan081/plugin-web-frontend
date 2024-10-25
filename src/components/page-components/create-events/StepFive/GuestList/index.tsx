"use client";

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { guestList, GuestListType } from "@/static-datas/create-event";
import GuestsComponent from "./GuestsComponent";
import GuestModal from "./GuestModal";
import EditGuestModal from "./EditGuestModal";
import GuestEmptyState from "./GuestEmptyState";
import { useGetEventGuests } from "@/hooks/events/useGetEventGuests";
import { useDeleteGuest } from "@/hooks/events/useDeleteGuest";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

const GuestList = () => {
  const { data: allGuests, isLoading } = useGetEventGuests();
  const { mutate: deleteGuest, isPending } = useDeleteGuest();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const [editModal, setEditModal] = useState<any | null>();

  const open = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleEditGuest = (id: number) => {
    const getClickedGuest = allGuests?.data.find((list) => list._id === id);
    setEditModal(getClickedGuest);
    setIsOpenEdit(!isOpenEdit);
  };

  const handleDelete = (id: number) => {
    deleteGuest({ guestId: id });
  };

  if (isLoading)
    return <p className="text-white mx-5 text-center mt-5">loading...</p>;

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      {isPending && <SpinnerOverlay />}
      <p className="font-pally-regular text-sm text-white/60">
        Create a special guest for your event{" "}
      </p>

      <Separator decorative />

      {allGuests?.data.length !== 0 ? (
        <div className="my-5 space-y-5">
          {allGuests?.data.map((list) => (
            <GuestsComponent
              key={list._id}
              {...list}
              _id={list._id}
              handleEditGuest={handleEditGuest}
              handleDeleteGuest={handleDelete}
            />
          ))}

          <button
            onClick={open}
            type="button"
            className="border w-full border-dashed p-3 rounded-lg hover:bg-[#423730]/50"
          >
            New Guest
          </button>
        </div>
      ) : (
        <GuestEmptyState open={open} />
      )}

      <GuestModal isOpen={isOpen} close={close} />


      <EditGuestModal
        open={isOpenEdit}
        close={() => setIsOpenEdit(!isOpenEdit)}
        editGuestList={editModal}
      />
    </div>
  );
};

export default GuestList;
