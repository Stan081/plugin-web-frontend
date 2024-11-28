import React, { FC, useEffect, useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import CreateTicketEmptyState from "./CreateTicketEmptyState";
import SelectTicketModal from "./SelectTicketModal";
import EntryTicket from "./entry-ticket";
import GroupTicket from "./group-ticket";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { useGetEvent } from "@/hooks/events/useGetEvent";

const contents = [
  "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
  "Ensure the agenda flows smoothly and includes buffer times.",
];

const StepSix: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { selectTicket, setSelectedTicket } = useCreateEventContext();

  const {data:event} = useGetEvent()

  useEffect(() => {
    if(event?.data?.ticketCategory){
      setSelectedTicket(event?.data?.ticketCategory)
    }
  }, [event?.data, selectTicket])

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-12 h-full lg:h-screen">
      <div className="w-full lg:w-2/5 px-4 lg:px-0 ">
        <Intro
          contents={contents}
          title={"Set up your ticketing options for attendees."}
        />
      </div>
      <div className="w-full lg:w-3/5">
        <FormContainer
          formTitle="Setting up Tickets"
          currPosition={[100, 100, 50]}
        >
          <div className="flex flex-col justify-between gap-4 w-full lg:h-[70vh] px-3 overflow-y-auto">
            {!selectTicket && (
              <SelectTicketModal isOpen={showModal} close={handleShowModal} />
            )}

            {selectTicket === "" ? (
              <CreateTicketEmptyState open={handleShowModal} />
            ) : selectTicket === "entry" ? (
              <EntryTicket />
            ) : (
              selectTicket === "grouped" && <GroupTicket />
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSix;
