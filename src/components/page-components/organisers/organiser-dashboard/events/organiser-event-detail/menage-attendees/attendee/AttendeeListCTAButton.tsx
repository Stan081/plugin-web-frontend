import React from "react";

const AttendeeListCTAButton = ({ icon, text }: { icon: any; text: string }) => {
  return (
    <button className="h-full rounded-lg p-2 border border-[#101928] flex items-center justify-center gap-1">
      <div className="size-5 flex items-center justify-center">{icon}</div>
      <p className="font-pally-regular text-[#101928]">{text}</p>
    </button>
  );
};

export default AttendeeListCTAButton;
