import React from "react";
import letter from "../../../../../../../../public/images/no-ticket.png";
import Image from "next/image";

const TicketHistoryEmptyState = () => {
    return (
        <div className="flex justify-center mt-[10vh]">
      <div className="flex flex-col items-center justify-center gap-5">
        <figure className="relative size-40">
          <Image
            fill={true}
            src={letter}
            alt="A picture of letters"
            className="object-contain"
          />
        </figure>
        <p className="font-pally-regular text-lg text-[#969CA5] text-center">You have no ticket sale.<br/>Your sales will be recorded here</p>
       
      </div>
    </div>
    )
}
export default TicketHistoryEmptyState;