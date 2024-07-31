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

const UpcomingEvent = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        <Container className="mt-20">
          <h2 className="text-3xl font-pally-medium mb-5">Upcoming Events</h2>
          <div className="text-3xl font-pally-medium flex lg:flex-row gap-6">
            {cardData.map((card) => (
              <CarouselItem key={card.id} className="">
                <CardComponent {...card} />
              </CarouselItem>
            ))}
          </div>
          <CarouselPrevious />
          <CarouselNext />
        </Container>
      </CarouselContent>
    </Carousel>
  );
};


export default UpcomingEvent;
