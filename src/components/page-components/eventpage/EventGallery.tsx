import Image from "next/image";
import React, { FC } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const EventGallery: FC<{ photos: string[] }> = ({ photos }) => {
  return (
    <div className="space-y-5">
      <h2 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
        Photos
      </h2>
      <PhotoProvider>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {photos?.map((photo, index) => (
            <li key={index} className="h-36 w-full max-w-72 md:h-48">
              <PhotoView src={photo}>
                <Image
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  src={photo}
                  alt={`Event gallery image ${index + 1}`}
                  width={224}
                  height={224}
                />
              </PhotoView>
            </li>
          ))}
        </ul>
      </PhotoProvider>
    </div>
  );
};

export default EventGallery;
