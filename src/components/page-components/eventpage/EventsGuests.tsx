"use client"
import Image from "next/image";
import React from "react";

const GuestCard: React.FC<{ guest: any }> = ({ guest }) => {
  return (
    <div className="border rounded-xl flex-shrink-0">
      <div className="block rounded-3xl">
        <Image
          className="w-48 h-48 pointer-events-none object-cover rounded-lg"
          src={guest?.photo}
          alt={guest?.name}
          width={130}
          height={130}
        />
      </div>
      <div className="p-3 overflow-auto">
        <p className="font-pally-medium w-full max-w-36 text-sm text-[#2C2B2E] whitespace-normal">
          {guest?.name}
        </p>
        <p className="font-pally-regular w-full max-w-36 text-sm text-[#2C2B2E] whitespace-normal">
          {guest?.role}
        </p>
      </div>
    </div>
  );
};

const EventsGuests: React.FC<{ guests: any }> = ({ guests }) => {
  return (
    <div>
      <h2 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
        Guests
      </h2>

      {guests.length !== 0 ? (
        <div className="mt-5 flex lg:flex-row gap-6 overflow-x-auto w-full pb-3 whitespace-nowrap">
          {guests.map((guest) => (
            <GuestCard key={guest._id} guest={guest} />
          ))}
        </div>
      ) : (
        <p className="font-pally-regular mt-5 text-gray-500">
          Event guests has not been added
        </p>
      )}
    </div>
  );
};

export default EventsGuests;
