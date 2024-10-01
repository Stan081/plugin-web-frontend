import React, { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCreateEventContext } from "@/providers/create_event.provider";
import { GrFormCheckmark } from "react-icons/gr";
import { StepsProps } from "@/pages/create-event";
import SeatCard from "./SeatCard";
import {
  SeatSectionListsType,
  SeatSectionLists as staticSeatSection,
} from "@/static-datas/create-event";
import EditPaidSeatDetail from "./EditPaidSeatDetail";
import EditFreeSeatDetail from "./EditFreeSeatDetail";
import GroupSeat from "./GroupSeat";

interface GroupTicketProps extends StepsProps {}

export enum GroupTicketState {
  VIEW_LIST,
  CREATE_TICKET,
  EDIT_TICKET,
}

const GroupTicket: FC<GroupTicketProps> = ({ next, previous }) => {
  const { isCheckedGroup, seatType } = useCreateEventContext();
  const [formState, setFormState] = useState<GroupTicketState>(
    GroupTicketState.CREATE_TICKET
  );

  const [groupTicketListState, setGroupTicketListState] = useState<
    SeatSectionListsType[]
  >([]);
  const [selectedTicket, setSelectedTicket] = useState<
    SeatSectionListsType | undefined
  >(undefined);
  const [nextId, setNextId] = useState<number>(Date.now());

  // Initialize the vendor list
  useEffect(() => {
    setGroupTicketListState(staticSeatSection);
  }, []);

  // Function to handle form edit
  const handleEditForm = (id: number) => {
    const getEditGroupticket = groupTicketListState.find(
      (list) => list.id === id
    );

    if (getEditGroupticket) {
      setSelectedTicket(getEditGroupticket);
      setFormState(GroupTicketState.EDIT_TICKET);
    }
  };

  // Function to handle creating a new vendor
  const handleCreateVendor = (groupTicketData: SeatSectionListsType) => {
    const newTicket = { ...groupTicketData, id: nextId };
    setGroupTicketListState((prevList) => [...prevList, newTicket]);
    setNextId(Date.now());
    setFormState(GroupTicketState.VIEW_LIST);
  };

  // Function to return to the group ticket list view
  const handleReturnToList = () => {
    setFormState(GroupTicketState.VIEW_LIST);
  };

  // Function to handle delete
  const handleDelete = (id: number) => {
    const updatedList = groupTicketListState.filter(
      (ticket) => ticket.id !== id
    );
    setGroupTicketListState(updatedList);
    setFormState(GroupTicketState.VIEW_LIST);
  };

  return (
    <div className="h-[60vh] lg:h-[82vh] overflow-x-auto flex flex-col justify-between gap-4 w-full">
      <Accordion type="single" collapsible className="w-full space-y-5">
        <AccordionItem
          value="item-1"
          className="border border-[#463635] rounded-xl px-4"
        >
          <AccordionTrigger>
            <div className="flex justify-start items-center gap-4">
              {!isCheckedGroup.sectionDetail ? (
                <div className="border border-white rounded-full h-4 w-4" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={16} />
                </div>
              )}
              <p className="font-pally-regular">SEATS/SECTION DEATAILS</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {formState === GroupTicketState.CREATE_TICKET ||
            !groupTicketListState.length ? (
              <GroupSeat
                handleReturnToList={handleReturnToList}
                handleCreateVendor={handleCreateVendor}
              />
            ) : formState === GroupTicketState.EDIT_TICKET &&
              selectedTicket &&
              seatType === "paid" ? (
              <EditPaidSeatDetail
                handleReturnToList={handleReturnToList}
                {...selectedTicket}
              />
            ) : formState === GroupTicketState.EDIT_TICKET &&
              selectedTicket &&
              seatType === "free" ? (
              <EditFreeSeatDetail
                handleReturnToList={handleReturnToList}
                {...selectedTicket}
              />
            ) : (
              formState === GroupTicketState.VIEW_LIST &&
              groupTicketListState.length !== 0 && (
                <div className="my-3 flex flex-col gap-3 w-full">
                  <div className="space-y-4">
                    {groupTicketListState.map((list) => (
                      <SeatCard
                        key={list.id}
                        id={list.id}
                        ticketName={list.ticketName}
                        ticketQuantity={list.ticketQuantity}
                        ticketCategory={list.ticketCategory}
                        ticketPrice={list?.ticketPrice}
                        seatType={list.seatType}
                        handleEditForm={handleEditForm}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between gap-5">
                    <button
                      onClick={() =>
                        setFormState(GroupTicketState.CREATE_TICKET)
                      }
                      type="button"
                      className="border border-dashed p-3 rounded-lg w-full hover:bg-[#423730]/50 md:w-32"
                    >
                      Add Ticket
                    </button>

                    <Button variant="destructive">Save</Button>
                  </div>
                </div>
              )
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border border-[#463635] rounded-xl px-4"
        >
          <AccordionTrigger>
            <div className="flex justify-start items-center gap-4">
              {!isCheckedGroup.labelling ? (
                <div className="border border-white rounded-full h-4 w-4" />
              ) : (
                <div className="bg-green-600 rounded-full p-0.5">
                  <GrFormCheckmark color="#fff" size={16} />
                </div>
              )}
              <p className="font-pally-regular">LABELLING</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>okkh</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="sticky bottom-0 bg-[#281E17]">
        <Separator />
        <div className="py-5 flex justify-between items-center">
          <Button
            onClick={() => {}}
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
              disabled={
                !isCheckedGroup.sectionDetail && !isCheckedGroup.labelling
              }
              onClick={() => next()}
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
