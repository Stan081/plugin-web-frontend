"use client"
import React, { FC, useState } from "react";

import { FiWatch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useCreateEventContext } from "@/providers/create_event.provider";
import SlotWithHost from "./SlotWithHost";
import SlotWithoutHost from "./SlotWithoutHost";
import { AgendaListsType } from "@/static-datas/create-event";

export interface AgendaSlotProps {
  handleReturnToList: () => void;
}

const AgendaSlot: FC<AgendaSlotProps> = ({
  handleReturnToList,
}) => {
  const { isHost } = useCreateEventContext();
  const [alert, setAlert] = useState<boolean>(() => true);

  return (
    <div>
      {alert && (
        <div className="my-5 flex justify-between items-center bg-[#fae4e2] rounded-lg p-1.5">
          <div className="flex items-center gap-3">
            <FiWatch color="#D9302A" size={18} />
            <p className="text-[#101928] font-pally-regular text-sm">
              Start-time and End-time will be recorded and displayed in minutes{" "}
            </p>
          </div>
          <div className="cursor-pointer" onClick={() => setAlert(false)}>
            <MdOutlineClose size={20} color="#000" />
          </div>
        </div>
      )}

      {isHost ? (
        <SlotWithHost
          handleReturnToList={handleReturnToList}
        />
      ) : (
        <SlotWithoutHost
          handleReturnToList={handleReturnToList}
        />
      )}
    </div>
  );
};

export default AgendaSlot;
