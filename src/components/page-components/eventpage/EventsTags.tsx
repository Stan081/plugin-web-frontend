"use client";
import React from "react";

// temp array
const tags = [
  "Music",
  "Business",
  "Food & Drinks",
  "Community",
  "Arts",
  "Entertainment",
  "Health, Fashion",
];

const EventsTags = () => {
  return (
    <div>
      <h2 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
        Event Tags
      </h2>

      <ul className="flex flex-wrap gap-4 mt-4">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="rounded-2xl text-sm font-pally-regular text-[#344054] border border-[#FCE0DC] p-2"
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsTags;
