import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCreateEventContext } from "@/providers/create_event.provider";
import React, { useState } from "react";

const RefundPolicy = () => {
  const { isChecked, handleIsChecked } = useCreateEventContext();

  return (
    <div className="mx-8 space-y-4">
      <div className="space-y-2">
        <h3 className="font-pally-medium text-lg">
          Refund Policy for Organisers
        </h3>
        <p className="font-pally-regular text-sm">
          Our platform has a comprehensive refund policy designed to protect
          attendees and maintain event integrity. Organizers must adhere to the
          following guidelines:
        </p>
      </div>

      <Separator />

      <ul className="space-y-2.5">
        <li className="list-decimal space-y-1.5">
          <p className="font-pally-medium">Attendee Refund Obligations:</p>
          <p className="font-pally-regular text-sm">
            Organizers are required to honor refund requests submitted by
            attendees through our platform within the designated refund request
            window, typically up to 14 days before the event date
          </p>
        </li>
        <li className="list-decimal space-y-1.5">
          <p className="font-pally-medium">
            Event Cancellation or Rescheduling:
          </p>
          <p className="font-pally-regular text-sm">
            If an organizer cancels or reschedules an event, they are
            responsible for refunding the full ticket price (excluding
            non-refundable platform fees) to attendees. Our platform will manage
            the refund process to ensure timely disbursement.
          </p>
        </li>
        <li className="list-decimal space-y-1.5">
          <p className="font-pally-medium">Refund Approval and Disbursement:</p>
          <p className="font-pally-regular text-sm">
            All refunds will be processed through our platform. Organizers will
            be notified of the total amount refunded to attendees, and the
            amount will be deducted from the event revenue.
          </p>
        </li>
        <li className="list-decimal space-y-1.5">
          <p className="font-pally-medium">Refund Review Process:</p>
          <p className="font-pally-regular text-sm">
            Platform service fees, including transaction and administrative
            fees, are non-refundable. Organizers agree to cover these costs in
            the event of cancellations or refunds.
          </p>
        </li>
        <li className="list-decimal space-y-1.5">
          <p className="font-pally-medium">Refund Review Process:</p>
          <p className="font-pally-regular text-sm">
            Our platform reserves the right to review and approve refund
            requests based on the specific circumstances of each case. This
            includes ensuring that all refund requests align with the platform's
            terms and conditions.
          </p>
        </li>
        <li className="list-decimal space-y-1.5">
          <p className="font-pally-medium">Communication with Attendees:</p>
          <p className="font-pally-regular text-sm">
            Organizers are encouraged to maintain clear and timely communication
            with attendees regarding any changes to the event. This includes
            informing them of any cancellations, rescheduling, or special refund
            policies in place.
          </p>
        </li>
      </ul>

      <Separator />

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={isChecked.refundPolicy}
          onChange={() => handleIsChecked("refundPolicy")}
          className="h-4 w-4 shrink-0 border rounded bg-[#D9302A] text-white"
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I have read and agree to the refund policies and guidelines outlined
          above. By checking this box, I acknowledge and accept responsibility
          for adhering to these terms as an event organizer.
        </label>
      </div>
    </div>
  );
};

export default RefundPolicy;
