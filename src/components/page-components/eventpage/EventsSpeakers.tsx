import { eventSpeakers } from "@/static-datas/event-speakers";
import Image from "next/image";
import React, { Fragment } from "react";

type SpeakerCardProps = {
  image: string;
  name: string;
  role: string;
};

const SpeakerCard: React.FC<SpeakerCardProps> = ({ image, name, role }) => {
  return (
    <div>
      <div className="h-40 w-40">
        <Image
          className="w-full h-full pointer-events-none object-cover rounded-lg"
          src={"/images/blue-bg.png"}
          alt={"title"}
          width={130}
          height={130}
        />
      </div>
      <div className="mt-3">
        <p className="font-pally-medium text-sm text-[#2C2B2E]">
          Ronald Richards
        </p>
        <p className="font-pally-regular text-sm text-[#2C2B2E]">
          Design Consultant, Plugin
        </p>
      </div>
    </div>
  );
};

const EventsSpeakers = () => {
  return (
    <div>
      <h2 className="font-pally-medium text-[#515A6A] text-base md:text-lg">
        Speakers
      </h2>

      <div className="mt-5 flex lg:flex-row gap-6 overflow-x-auto w-full pb-8">
        {eventSpeakers.map((speaker) => (
          <SpeakerCard key={speaker.id} {...speaker} />
        ))}
      </div>
    </div>
  );
};

export default EventsSpeakers;
