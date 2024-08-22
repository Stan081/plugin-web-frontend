"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import MeetYourOganiser from "../user-dashboard/MeetYourOganiser";
import ShowLocation from "./ShowLocation";
import EventsTags from "./EventsTags";

interface Props {
  location: string;
  date: string;
}

const AboutEventDetail: React.FC = () => {
  return (
    <div className="space-y-5 mt-4 w-full md:w-1/2">
      <div className="space-y-1 my-6">
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular">
          70C Bennet Bassey Esau Street, Ewet Housing, Uyo
        </p>
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular">
          Sun, July 28 2024, 8:00 PM
        </p>
      </div>
      <Separator />
      <div>
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-medium">
          About the event
        </p>
        <p className="text-[#2C2B2E] text-base md:text-lg font-pally-regular mt-2">
          Vibes Barn is a monthly party series dedicated to fostering a vibrant
          community through the universal language of music. Each event is a
          celebration of diversity and togetherness, where people from all walks
          of life come together to enjoy good music, connect with others, and
          create lasting memories. Join us as we dance the night away, building
          meaningful connections and spreading positive vibes.
        </p>
      </div>
      <Separator />

      <MeetYourOganiser />

      <Separator />

      <ShowLocation />

      <Separator />

      <EventsTags />
    </div>
  );
};

export default AboutEventDetail;
