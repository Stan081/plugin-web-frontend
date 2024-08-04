import Container from "@/tw-components/container";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/static-datas/faq-data";

const Faq = () => {
  return (
    <div className="bg-whiteNoise backdrop-blur-md">
      <Container className="pt-10">
        <div className="mx-auto w-full max-w-2xl mb-6 space-y-2">
          <h2 className="font-pally-medium text-3xl text-center">
            Answers to most Asked Questions
          </h2>
          <p className="font-pally-regular text-base md:text-lg text-center w-full md:w-11/12 mx-auto">
            Get quick answers to all your questions and concerns about Gupa.
            Whether as a member, host or just a visitor, we will have an answer
            waiting for you.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full md:w-3/5 mx-auto">
          <ul>
            {faqs.map((faq, index) => (
              <li key={index}>
                <AccordionItem
                  value={faq.question as string}
                  className={`${
                    index === 0
                      ? `border-t border-r border-l rounded-tr-3xl rounded-tl-3xl`
                      : `border-r border-l`
                  }  pt-3 px-4`}
                >
                  <AccordionTrigger className=" font-pally-medium text-base md:text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className=" font-pally-regular text-base md:text-lg">{faq.answer}</AccordionContent>
                </AccordionItem>
              </li>
            ))}
          </ul>
        </Accordion>
      </Container>
    </div>
  );
};

export default Faq;
