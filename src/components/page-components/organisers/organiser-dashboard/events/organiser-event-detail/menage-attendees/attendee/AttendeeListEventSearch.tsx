import { Input } from "@/components/ui/input";
import React from "react";
import { RiSearchLine } from "react-icons/ri";

const AttendeeListEventSearch = () => {
  return (
    <div className="relative">
      <div className="absolute h-full w-8 size-10 flex items-center justify-center">
        <RiSearchLine size={15} color="#8B919A" />
      </div>
      <Input placeholder="Event name" className="pl-9" />
    </div>
  );
};

export default AttendeeListEventSearch;



