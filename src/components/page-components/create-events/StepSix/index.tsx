import { StepsProps } from "@/pages/create-event";
import React, { FC, useState } from "react";
import Intro from "../Intro";
import FormContainer from "../FormContainer";
import CreateTicketEmptyState from "./CreateTicketEmptyState";
import SelectTicketModal from "./SelectTicketModal";
import EntryTicket from "./entry-ticket";

const contents = [
  "Break down the event into segments (e.g., welcome drinks, painting session, cocktail break).",
  "Ensure the agenda flows smoothly and includes buffer times.",
];

const StepSix: FC<StepsProps> = ({ next, previous }) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectTicket, setSelectedTicket] = useState<string>("");

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex items-start gap-12">
      <div className="w-full lg:w-1/2">
        <Intro
          contents={contents}
          title={"Set up your ticketing options for attendees."}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <FormContainer
          formTitle="Setting up Tickets"
          currPosition={[100, 70, 0]}
        >
          <div className="overflow-x-auto flex flex-col justify-between gap-4 w-full h-full">
            {!selectTicket && (
              <SelectTicketModal
                isOpen={showModal}
                close={handleShowModal}
                setSelectedTicket={setSelectedTicket}
              />
            )}

            {selectTicket === "" ? (
              <CreateTicketEmptyState open={handleShowModal} />
            ) : selectTicket === "entry-ticket" ? (
              <EntryTicket
                next={next}
                previous={previous}
                selectTicket={selectTicket}
              />
            ) : (
              selectTicket === "group-ticket" && <div>Group</div>
            )}
          </div>
        </FormContainer>
      </div>
    </div>
  );
};

export default StepSix;
