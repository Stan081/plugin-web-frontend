"use client"

import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { guestList, GuestListType } from "@/static-datas/create-event";
import GuestsComponent from "./GuestsComponent";
import GuestModal from "./GuestModal";
import EditGuestModal from "./EditGuestModal";
import GuestEmptyState from "./GuestEmptyState";

const GuestList = () => {
  const [guests, setGuests] = useState<GuestListType[]>(guestList);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = React.useState<boolean>(false);
  const [editModal, setEditModal] = useState<GuestListType | null>();

  const open = () => {
    setIsOpen(!isOpen);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleEditGuest = (id: string) => {
    const getClickedGuest = guests.find((list) => list.id === id);
    setEditModal(getClickedGuest);
    setIsOpenEdit(!isOpenEdit);
  };


  return (
      <div className="mx-3 md:mx-8 flex flex-col gap-5">
        <p className="font-pally-regular text-sm text-white/60">
          Create a special guest for your event{" "}
        </p>

        <Separator decorative />

        {guests.length !== 0 ? (
          <div className="my-5 space-y-5">
            {guests.map((list) => (
              <GuestsComponent
                key={list.id}
                {...list}
                handleEditGuest={handleEditGuest}
              />
            ))}
            <button
              onClick={open}
              type="button"
              className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
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
          {...editModal}
        />
      </div>
  );
};

export default GuestList;
