import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React, { Fragment } from "react";

const Notification = () => {
  return (
    <Fragment>
      <div>
        <h4 className="font-pally-medium text-2xl mb-6 text-[#771716]">
          Booking Notifications
        </h4>
        <ul className="space-y-5">
          <li className="flex items-start justify-between">
            <div className="space-y-3 max-w-md">
              <h3 className="font-pally-medium text-lg">Email Confirmation</h3>
              <p className="text-[#586170] font-pally-regular">
                Receive an email immediately after booking, including event
                details, tickets, and a calendar invite.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-pally-medium underline cursor-pointer">
                Enable
              </p>
              <Switch />
            </div>
          </li>
          <Separator />
          <li className="flex items-start justify-between">
            <div className="space-y-3 max-w-md">
              <h3 className="font-pally-medium text-lg">SMS Confirmation</h3>
              <p className="text-[#586170] font-pally-regular">
                Option to get a text message confirming your booking and
                providing essential details.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-pally-medium underline cursor-pointer">
                Enable
              </p>
              <Switch />
            </div>
          </li>
        </ul>
      </div>
      <div className="my-6 md:my-12">
        <h4 className="font-pally-medium text-2xl mb-6 text-[#771716]">
          Event Notifications
        </h4>
        <ul className="space-y-5">
          <li className="flex items-start justify-between">
            <div className="space-y-3 max-w-md">
              <h3 className="font-pally-medium text-lg">Event Reminders</h3>
              <p className="text-[#586170] font-pally-regular">
                Get reminders for your booked events one week, one day, and one
                hour before they start, so you never miss out.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-pally-medium underline cursor-pointer">
                Enable
              </p>
              <Switch />
            </div>
          </li>
          <Separator />
          <li className="flex items-start justify-between">
            <div className="space-y-3 max-w-md">
              <h3 className="font-pally-medium text-lg">
                Event Update Notifications
              </h3>
              <p className="text-[#586170] font-pally-regular">
                Stay informed of any changes to the event schedule, location, or
                important announcements via email or phone number.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-pally-medium underline cursor-pointer">
                Enable
              </p>
              <Switch />
            </div>
          </li>
          <Separator />
          <li className="flex items-start justify-between">
            <div className="space-y-3 max-w-md">
              <h3 className="font-pally-medium text-lg">
                Promotional Notifications
              </h3>
              <p className="text-[#586170] font-pally-regular">
                Stay informed of any changes to the event schedule, location, or
                important announcements via email or phone number.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-pally-medium underline cursor-pointer">
                Enable
              </p>
              <Switch />
            </div>
          </li>
        </ul>
      </div>
    </Fragment>
  );
};

export default Notification;
