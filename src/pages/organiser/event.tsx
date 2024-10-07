import OrganiserHeader from "@/components/page-components/organisers/organiser-dashboard/OrganiserHeader";
import React, { Fragment } from "react";
import OrganiserTabs from '@/components/page-components/organisers/organiser-dashboard/OrganiserTabs'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const OrganiserEvent = () => {
  return (
    <Fragment>
      <OrganiserHeader />
      {/* Header Section */}
      <div className="flex-col m-8 gap-3 p-5">
        {/* Event Header text */}
        <div className="flex justify-between">
          <div>
            <h1 className="font-pally-bold text-4xl">Events</h1>
            <h4 className="font-pally-regular color-[#515A6A]">
              View and manage all your events here, from drafts to past events
            </h4>
          </div>
          {/* Quick Actions */}
          <div className="flex justify-between gap-3 items-center">
            <Input
              placeholder="Event name"
              type="text"
              autoCorrect="off"
              // disabled={isLoading}
              className="w-full bg-white font-pally-regular"
            />
            <div className="border border-gray-500 rotate-0 h-5 hidden lg:block" />
            <Button variant="destructive" className=" border-black" size="default">
              Create Event
            </Button>
          </div>
        </div>
        <div>
        <OrganiserTabs />
        </div>
      </div>
    </Fragment>
  );
};

export default OrganiserEvent;
