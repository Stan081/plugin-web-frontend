import Container from "@/tw-components/container";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="bg-whiteNoise bg-cover backdrop-blur-md">
      <Container className="pt-10">
        <div className="mx-auto w-full max-w-2xl">
          <h1 className="font-pally-medium text-[36px] text-center">
            Answers to most Asked Questions
          </h1>
          <p className="font-pally-regular text-base md:text-lg text-center w-full md:w-11/12 mx-auto">
            Get quick answers to all your questions and concerns about Gupa.
            Whether as a member, host or just a visitor, we will have an answer
            waiting for you.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-4/5 mx-auto border p-5 rounded-tr-3xl rounded-tl-3xl">
          <AccordionItem value="item-1" className="border rounded-tr-3xl rounded-tl-3xl pt-3 px-3">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none rounded-tr-3xl rounded-tl-3xl pt-3 px-3">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Container>
    </div>
  );
};

export default FAQ;
