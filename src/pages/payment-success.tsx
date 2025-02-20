"use client";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useGetSuccessfulTicket } from "@/hooks/useGetSuccesfulTicket";
import { useEventsContext } from "@/providers/events.provider";
import Container from "@/tw-components/container";
import Image from "next/image";
import Link from "next/link";

// Payment success page for free events
const PaymentSuccess = () => {
  const { freeEventPayload } = useEventsContext();

  const startDate: string = freeEventPayload?.eventDate;

  const startTime: string = freeEventPayload?.eventTime;

  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric", // Add year to the options
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  const [hour, minute] = startTime ? startTime.split(":") : ["00", "00"];
  const formattedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    Number(hour),
    Number(minute)
  ).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });
  return (
    <Layout title="Payment successful" showHeader showFooter>
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:my-10">
          <div className="hidden lg:block w-40 lg:w-1/2 h-[10vh] lg:h-[60vh] relative">
            <Image
              src={freeEventPayload?.eventBanner}
              layout="fill"
              fill
              alt={freeEventPayload?.eventName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center items-center my-6 p-6 w-full lg:w-1/2 mx-auto">
            <Image
              src={"/gif/confetti.gif"}
              width={200}
              height={40}
              alt="confetti"
            />

            <p className="font-pally-medium text-2xl pb-3">
              Thanks for your order!
            </p>
            <p className="font-pally-regular mx-4 text-center text-sm lg:text-lg text-gray-600">
              You tickets will sent to{" "}
              <span className="text-black font-medium">
                {freeEventPayload?.userEmail}
              </span>
            </p>

            <p className="text-sm text-[#667185] my-6">Or downlaod it below</p>

            <ul className="space-y-4 ">
              {freeEventPayload?.ticketData?.map((ticket) => (
                <li className="border p-4 rounded-xl flex gap-4">
                  <Image
                    src={ticket?.qrCode}
                    width={200}
                    height={40}
                    alt={ticket.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="space-y-1.5">
                    <p className="font-pally-medium text-base lg:text-xl">
                      {freeEventPayload?.eventName}
                    </p>
                    <p className="font-pally-regular text-[#586170] text-sm ">
                      {freeEventPayload?.eventLocation}
                    </p>
                    <p className="font-pally-regular text-sm text-red-600">
                      {formattedDate} {formattedTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center mt-10">
              <Link href="/tickets">
                <Button variant="destructive" size="lg">
                  See tickets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccess;
