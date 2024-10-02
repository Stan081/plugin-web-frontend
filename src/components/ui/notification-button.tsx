import React from "react";
import Bell from "../../../public/images/icons/bell.svg";
import Image from "next/image";

const NotificationButton = () => {
  return (
    <div className="flex items-center justify-center w-[40px] h-[40px] border border-solid border-[#FFD2A6] bg-[#F5F0EB] rounded-full cursor-pointer">
      <Image src={Bell} alt="Notification" width={20} height={20} />
    </div>
  );
}

export default NotificationButton;