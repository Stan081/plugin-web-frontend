"use client";
import React from "react";

const EventsTags: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div>
      <h2 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
        Event Tags
      </h2>

      {tags.length !== 0 ? (
        <ul className="flex flex-wrap gap-4 mt-4">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="rounded-2xl text-sm font-pally-regular text-[#344054] border border-[#FCE0DC] py-1.5 px-2"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-pally-regular mt-5 text-gray-500">Event tags has not been added</p>
      )}
    </div>
  );
};

export default EventsTags;
