import { StepsProps } from "@/pages/create-event";
import React, { FC, useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import CreateTicketEmptyState from "./CreateTicketEmptyState";
import SelectTicketModal from "./SelectTicketModal";
import EntryTicket from "./entry-ticket";
import GroupTicket from "./group-ticket";
import { useCreateEventContext } from "@/providers/create_event.provider";

const contents = [
  "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
  "Ensure the agenda flows smoothly and includes buffer times.",
];

const StepSix: FC<StepsProps> = ({ next, previous }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { selectTicket } = useCreateEventContext();

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
          <div className="flex flex-col justify-between gap-4 w-full lg:h-[82vh] px-3 overflow-y-auto">
            {!selectTicket && (
              <SelectTicketModal isOpen={showModal} close={handleShowModal} />
            )}

            {selectTicket === "" ? (
              <CreateTicketEmptyState open={handleShowModal} />
            ) : selectTicket === "entry" ? (
              <EntryTicket next={next} previous={previous} />
            ) : (
              selectTicket === "grouped" && (
                <GroupTicket next={next} previous={previous} />
              )
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSix;
