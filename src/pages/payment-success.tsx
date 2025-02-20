"use client";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useEventsContext } from "@/providers/events.provider";
import Container from "@/tw-components/container";
import Image from "next/image";
import Link from "next/link";
import jsPDF from "jspdf";
import { HiDownload } from "react-icons/hi";

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

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Booking Receipt", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Event: ${freeEventPayload?.eventName || "N/A"}`, 20, 40);
    pdf.text(`Location: ${freeEventPayload?.eventLocation || "N/A"}`, 20, 50);
    pdf.text(
      `Date: ${new Date(freeEventPayload?.eventDate).toLocaleDateString()}`,
      20,
      60
    );
    pdf.text(`Email: ${freeEventPayload?.userEmail || "N/A"}`, 20, 70);

    pdf.text("Tickets:", 20, 90);
    freeEventPayload?.ticketData?.forEach((ticket, index) => {
      pdf.text(
        `${index + 1}. ${ticket.name} - $${ticket.price}`,
        20,
        100 + index * 10
      );
    });

    pdf.save(`Booking_Receipt_${freeEventPayload?.eventName}.pdf`);
  };

  return (
    <Layout title="Payment successful" showHeader showFooter>
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:my-10">
          <div className="hidden lg:block w-24 lg:w-2/5 h-[10vh] lg:h-[40vh] relative">
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

            <div className="flex justify-between gap-10 items-center mt-10">
              <div onClick={handleDownloadPDF} className="cursor-pointer">
                <HiDownload size={22} className="text-gray-500" />
              </div>
              <Link href="/tickets">
                <Button variant="destructive" >
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
