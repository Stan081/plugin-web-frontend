import Image from "next/image";
import React, { FC } from "react";

const EventGallery: FC<{ photos: string[] }> = ({ photos }) => {
  return (
    <div className="space-y-5">
      <h2 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
        Photos
      </h2>
      <ul className="flex flex-wrap gap-5">
        {photos?.map((photo, index) => (
          <li key={index} className="h-56 w-56">
            <Image
              className="w-full h-full pointer-events-none object-cover rounded-lg"
              src={photo}
              alt="Event gallery"
              width={130}
              height={130}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventGallery;
