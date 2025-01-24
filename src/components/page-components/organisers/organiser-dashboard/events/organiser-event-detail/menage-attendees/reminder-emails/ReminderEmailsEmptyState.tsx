import React from "react";
import letter from "../../../../../../../../../public/images/reminder-emails-letter.png";
import Image from "next/image";

const ReminderEmailsEmptyState = () => {
  return (
    <div className="flex justify-center mt-[10vh]">
      <div className="flex flex-col items-center justify-center gap-5">
        <figure className="relative size-20">
          <Image
            fill={true}
            src={letter}
            alt="A picture of letters"
            className="object-contain"
          />
        </figure>
        <p className="font-pally-regular text-lg text-[#969CA5]">
          You do not have any completed Reminder emails.
        </p>
        <div>
          <button
            className="font-pally-regular py-2 px-3 border border-[#D9302A] text-[#D9302A] hover:bg-[#f3cac9] rounded-xl"
            aria-controls={`panel-create-reminder-emails`}
            id={`create-reminder-emails`}
          >
            Create reminder emails
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderEmailsEmptyState;
