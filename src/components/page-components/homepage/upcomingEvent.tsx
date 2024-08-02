import CardComponent from "@/components/CardComponent";
import { cardData } from "@/static-datas/cards-data";
import Container from "@/tw-components/container";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const events = [
  {
    id: 1,
    title: "Designer's Connect",
    location: "Silverbird cinemas gallery, Udoudoma Avenue",
    date: "Sat, Sept 17, 10:00AM",
    price: "₦3,000 - ₦75,000",
    type: "Concert",
  },
  // Add more event objects here
];

const UpcomingEvent = () => {
  return (
    <div>
      vv
    </div>
  );
};

export default UpcomingEvent;


// <Carousel showArrows={true} showIndicators={true} infinite={true} className="w-full">
    //   {events.map(event => (
    //     <Card key={event.id} className="p-4 mx-2">
    //       <Badge className="bg-red-500 text-white">{event.type}</Badge>
    //       <div className="mt-4">
    //         <Heading size="md">{event.title}</Heading>
    //         <Text className="text-gray-500">{event.location}</Text>
    //         <Text className="text-red-500">{event.date}</Text>
    //         <Text className="text-black">{event.price}</Text>
    //       </div>
    //     </Card>
    //   ))}
    // </Carousel>