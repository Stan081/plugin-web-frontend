import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateEventContext } from "@/providers/create_event.provider";
import SeatCard from "./SeatCard";
import EditPaidSeatDetail from "./EditPaidSeatDetail";
import EditFreeSeatDetail from "./EditFreeSeatDetail";
import GroupSeat from "./GroupSeat";
import { useGetGroupEvent } from "@/hooks/events/useGetGroupEvent";
import { useDeleteEventGroup } from "@/hooks/events/useDeleteEventGroup";
import { SpinnerOverlay } from "@/tw-components/SpinnerOverlay";

export enum GroupTicketState {
  VIEW_LIST,
  CREATE_TICKET,
  EDIT_TICKET,
}

const GroupTicket: FC = () => {
  const {
    seatType,
    nextStep: next,
    previousStep: previous,
    saveToDraft,
    handleClick,
  } = useCreateEventContext();
  const { data: allGroupEvent, isLoading } = useGetGroupEvent();
  const { mutate: deleteGroupTicket, isPending } = useDeleteEventGroup();
  const { selectTicket: selectedState } = useCreateEventContext();
  const [formState, setFormState] = useState<GroupTicketState>(
    GroupTicketState.VIEW_LIST
  );

  console.log(allGroupEvent?.data)

  const [selectedTicket, setSelectedTicket] = useState<any | undefined>(null);

  const handleEditForm = (id: number) => {
    const getEditGroup = allGroupEvent?.data.find((list) => list._id === id);

    if (getEditGroup) {
      setSelectedTicket(getEditGroup);
      handleClick(getEditGroup?.groupedTicketType)
    }
    setFormState(GroupTicketState.EDIT_TICKET);
  };

  // Function to return to the group ticket list view
  const handleReturnToList = () => {
    setFormState(GroupTicketState.VIEW_LIST);
  };

  // Function to handle delete
  const handleDelete = (id: number) => {
    deleteGroupTicket({ groupTicketId: id });
  };

  if (isLoading)
    return <p className="text-white mx-5 text-center mt-5">loading...</p>;

  return (
    <div className=" flex flex-col justify-between gap-4 w-full lg:h-[82vh]">
      {isPending && <SpinnerOverlay />}
      {formState === GroupTicketState.CREATE_TICKET ? (
        <GroupSeat handleReturnToList={handleReturnToList} />
      ) : formState === GroupTicketState.EDIT_TICKET  &&
        seatType === "paid" ? (
        <EditPaidSeatDetail
          handleReturnToList={handleReturnToList}
          selectedTicket={selectedTicket}
        />
      ) : formState === GroupTicketState.EDIT_TICKET &&
        seatType === "free" ? (
        <EditFreeSeatDetail
          handleReturnToList={handleReturnToList}
          selectedTicket={selectedTicket}
        />
      ) : (
        formState === GroupTicketState.VIEW_LIST &&
        selectedState === "grouped" && (
          <div className="my-3 flex flex-col gap-3 w-full">
            <div className="space-y-4">
              {allGroupEvent?.data.length !== 0 &&
                allGroupEvent?.data.map((list) => (
                  <SeatCard
                    key={list._id}
                    _id={list._id}
                    {...list}
                    handleEditForm={handleEditForm}
                    handleDelete={handleDelete}
                  />
                ))}
            </div>

            <div className="mt-4 flex justify-between gap-5">
              <button
                onClick={() => setFormState(GroupTicketState.CREATE_TICKET)}
                type="button"
                className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50"
              >
                Add Ticket
              </button>
            </div>
          </div>
        )
      )}

      <div className="sticky bottom-0 bg-[#281E17]">
        <Separator />
        <div className="py-5 flex justify-between items-center">
          <Button
            onClick={saveToDraft}
            variant="outline"
            className="text-white border-white hover:bg-[#6c5442]"
          >
            Save Progress
          </Button>

          <div className="flex items-center gap-8">
            <Button
              onClick={previous}
              className="cursor-pointer hover:outline hover:outline-white/50 p-2 rounded-lg"
            >
              Back
            </Button>

            <Button
              disabled={!allGroupEvent?.data.length}
              onClick={next}
              variant="destructive"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupTicket;
