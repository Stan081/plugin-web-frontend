"use client";
import Layout from "@/components/layout";
import { useGetSuccessfulTicket } from "@/hooks/useGetSuccesfulTicket";
import Container from "@/tw-components/container";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

// Payment successful page after paystack payment
const PaymentSuccessful = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data: bookings } = useGetSuccessfulTicket(bookingId as string);

  const startDate: string = bookings?.data?.eventDate;

  const startTime: string = bookings?.data?.eventTime;

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
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="hidden lg:block w-40 lg:w-1/2 h-[10vh] lg:h-[60vh] relative">
            <Image
              src={bookings?.data?.eventBanner}
              layout="fill"
              fill
              alt={bookings?.data?.eventName}
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
                {bookings?.data?.userEmail}
              </span>
            </p>

            <p className="text-sm text-[#667185] my-6">Or downlaod it below</p>

            <ul className="space-y-4 ">
              {bookings?.data?.ticketData?.map((ticket) => (
                <li className="border p-4 rounded-xl flex gap-4">
                  <Image
                    src={ticket.qrCode}
                    width={200}
                    height={40}
                    alt={ticket.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  <div className="space-y-1.5">
                    <p className="font-pally-medium text-base lg:text-xl">
                      {bookings?.data?.eventName}
                    </p>
                    <p className="font-pally-regular text-[#586170] text-sm ">
                      {bookings?.data?.eventLocation}
                    </p>
                    <p className="font-pally-regular text-sm text-red-600">
                      {formattedDate} {formattedTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccessful;
