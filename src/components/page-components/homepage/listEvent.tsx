import Button from "@/tw-components/button";
import Container from "@/tw-components/container";
import React from "react";

const ListEvent = () => {
  return (
    <div>
      <Container className="py-8 md:py-16">
        <div className="flex">
          <div className="bg-pinkNoise bg-cover backdrop-blur-md">
            <h2 className="font-pally-medium text-[36px] text-center">
              List your next event with Plugin
            </h2>
            <p>
              Our user-friendly software selects event listings based on your
              location or top priorities, making your search much more fun.
            </p>
            <div>
              <Button variant="primary">List an event</Button>
            </div>
          </div>
          <div className="bg-black w-full">

          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListEvent;
