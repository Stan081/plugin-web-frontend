"use client";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import AgendaEmptyState from "./AgendaEmptyState";
import AgendaSlot from "./Slot";
import AgendLists from "./AgendLists";
import { Accordion } from "@/components/ui/accordion";
import EditSlot from "./EditSlot";
import { useGetEventAgenda } from "@/hooks/events/useGetEventAgendas";
import { useDeleteAgenda } from "@/hooks/events/useDeleteEventAgenda";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

export enum AddAgendaState {
  VIEW_LIST,
  CREATE_AGENDA,
  EDIT_AGENDA,
}

const AddAgenda = () => {
  const { data: allAgenda, isLoading } = useGetEventAgenda();
  const { mutate: deleteAgenda, isPending } = useDeleteAgenda();

  const [formState, setFormState] = useState<AddAgendaState>(
    AddAgendaState.CREATE_AGENDA
  );

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
    deleteAgenda({ agendaId: id });
  };

  if (isLoading)
    return <p className="text-white mx-5 text-center mt-5">loading...</p>;

  return (
    <div className="mx-3 md:mx-8 flex flex-col gap-5">
      {isPending && <SpinnerOverlay />}
      <p className="font-pally-regular text-sm text-white/60">
        Add an itinerary or schedule to your event. You can include the time, a
        description of what will happen, and who will host this part of the
        event, (Ex. Speaker, performer, guide, etc.)
      </p>

      <Separator decorative />

      {formState === AddAgendaState.CREATE_AGENDA ? (
        <AgendaSlot handleReturnToList={handleReturnToList} />
      ) : formState === AddAgendaState.EDIT_AGENDA && selectedAgenda ? (
        <EditSlot
          selectedAgenda={selectedAgenda}
          handleReturnToList={handleReturnToList}
        />
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
