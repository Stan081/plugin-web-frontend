import { AgendaListsType } from "@/static-datas/create-event";
import React, { FC } from "react";
import EditSlotWithHost from "./EditSlotWithHost";
import EditSlotWithoutHost from "./EditSlotWithoutHost";
import { AgendaSlotProps } from "./Slot";

interface EditSlotProps extends AgendaSlotProps {
  selectedAgenda: AgendaListsType;
}

const EditSlot: FC<EditSlotProps> = ({
  selectedAgenda,
  handleReturnToList,
}) => {
  return (
    <div>
      {selectedAgenda?.isHost ? (
        <EditSlotWithHost {...selectedAgenda} handleReturnToList={handleReturnToList} />
      ) : (
        <EditSlotWithoutHost
          {...selectedAgenda}
          handleReturnToList={handleReturnToList}
        />
      )}
    </div>
  );
};

export default EditSlot;
