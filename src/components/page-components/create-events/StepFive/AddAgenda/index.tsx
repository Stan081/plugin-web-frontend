import { Separator } from "@/components/ui/separator";
import React, { useCallback, useEffect, useState } from "react";
import AgendaEmptyState from "./AgendaEmptyState";
import AgendaSlot from "./Slot";
import AgendLists from "./AgendLists";
import {
  AgendaLists as staticAgendaList,
  AgendaListsType,
} from "@/static-datas/create-event";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useCreateEventContext } from "@/providers/create_event.provider";
import EditSlot from "./EditSlot";
import { EventAgenda } from "@/pages/api/mutate/create-events/eventAgenda";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import Spinner from "@/tw-components/spinner";
import { AgendaType } from "@/lib/types/EventType";

export enum AddAgendaState {
  VIEW_LIST,
  CREATE_AGENDA,
  EDIT_AGENDA,
}

const AddAgenda = () => {
  const { allAgenda } = useCreateEventContext();

  const [formState, setFormState] = useState<AddAgendaState>(
    AddAgendaState.VIEW_LIST
  );

  const [agendaListState, setAgendaListState] = useState<AgendaListsType[]>([]);
  const [selectedAgenda, setSelectedAgenda] = useState<any | undefined>(
    undefined
  );

  // Function to handle form edit
  const handleEditForm = (id: number) => {
    const getEditAgenda = allAgenda?.data.find((list) => list._id === id);

    if (getEditAgenda) {
      setSelectedAgenda(getEditAgenda);
    }
    setFormState(AddAgendaState.EDIT_AGENDA);
  };

  // Function to return to the vendor list view
  const handleReturnToList = () => {
    setFormState(AddAgendaState.VIEW_LIST);
  };

  // Function to handle delete
  const handleDelete = (id: number) => {
    const updatedList = agendaListState.filter((vendor) => vendor.id !== id);
    setAgendaListState(updatedList);
    setFormState(AddAgendaState.VIEW_LIST);
  };

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      <p className="font-pally-regular text-sm text-white/60">
        Add an itinerary or schedule to your event. You can include the time, a
        description of what will happen, and who will host this part of the
        event, (Ex. Speaker, performer, guide, etc.)
      </p>

      <Separator decorative />

      {formState === AddAgendaState.CREATE_AGENDA ? (
        <AgendaSlot handleReturnToList={handleReturnToList} />
      ) : formState === AddAgendaState.EDIT_AGENDA && selectedAgenda ? (
        <EditSlot selectedAgenda={selectedAgenda} handleReturnToList={handleReturnToList} />
      ) : formState === AddAgendaState.VIEW_LIST &&
        allAgenda?.data.length !== 0 ? (
        <div className="my-3 flex flex-col gap-3 w-full">
          <Accordion type="single" collapsible className="w-full space-y-5">
            {allAgenda?.data.map((list) => (
              <AgendLists
                key={list._id}
                {...list}
                _id={list._id}
                handleEditForm={handleEditForm}
                handleDelete={handleDelete}
              />
            ))}
          </Accordion>

          <button
            onClick={() => setFormState(AddAgendaState.CREATE_AGENDA)}
            type="button"
            className="border block mt-5 border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
          >
            Add Agenda
          </button>
        </div>
      ) : (
        <AgendaEmptyState
          open={() => setFormState(AddAgendaState.CREATE_AGENDA)}
        />
      )}
    </div>
  );
};

export default AddAgenda;
