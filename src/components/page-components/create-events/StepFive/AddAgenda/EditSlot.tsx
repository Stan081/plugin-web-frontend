import { AgendaListsType } from "@/static-datas/create-event";
import React, { FC } from "react";
import EditSlotWithHost from "./EditSlotWithHost";
import EditSlotWithoutHost from "./EditSlotWithoutHost";
import { AgendaSlotProps } from "./Slot";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { AgendaType } from "@/lib/types/EventType";

interface EditSlotProps {
  handleReturnToList: () => void;
  selectedAgenda: any;
}

const EditSlot: FC<EditSlotProps> = ({
  handleReturnToList,
  selectedAgenda,
}) => {
  const { allAgenda } = useCreateEventContext();
  return (
    <div>
      {allAgenda?.data?.host ? (
        <EditSlotWithHost
          selectedAgenda={selectedAgenda}
          handleReturnToList={handleReturnToList}
        />
      ) : (
        <EditSlotWithoutHost
        selectedAgenda={selectedAgenda}
          handleReturnToList={handleReturnToList}
        />
      )}
    </div>
  );
};

export default EditSlot;
