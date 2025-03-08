"use client";
import Layout from "@/components/layout";
import { useGetSuccessfulTicket } from "@/hooks/useGetSuccesfulTicket";
import Container from "@/tw-components/container";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import { HiDownload } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Payment successful page after paystack payment
const PaymentSuccessful = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data: bookings, isLoading } = useGetSuccessfulTicket(
    bookingId as string
  );

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

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    // Title
    pdf.setFontSize(16);
    pdf.text("Booking Receipt", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Event: ${bookings?.data?.eventName || "N/A"}`, 20, 40);
    pdf.text(`Location: ${bookings?.data?.eventLocation || "N/A"}`, 20, 50);
    pdf.text(
      `Date: ${new Date(bookings?.data?.eventDate).toLocaleDateString()}`,
      20,
      60
    );
    pdf.text(`Email: ${bookings?.data?.userEmail || "N/A"}`, 20, 70);

    // Add Table for Tickets
    const tickets =
      bookings?.data?.ticketData?.map((ticket, index) => [
        index + 1,
        ticket.name,
        `$${ticket.price}`,
      ]) || [];

    // autoTable(pdf, {
    //   startY: 90,
    //   head: [["#", "Ticket Name", "Price"]],
    //   body: tickets,
    // });

    // // Add QR Code if available
    // const qrCode = bookings?.data?.qrCode; // Assuming it's a Base64 image
    // if (qrCode) {
    //   pdf.text("Scan QR Code:", 20, pdf.lastAutoTable.finalY + 20);
    //   pdf.addImage(qrCode, "PNG", 20, pdf.lastAutoTable.finalY + 30, 50, 50); // Position: (x, y, width, height)
    // }

    pdf.save(`Booking_Receipt_${bookings?.data?.eventName}.pdf`);
  };
  return (
    <Layout title="Payment successful" showHeader showFooter>
      <div className="block lg:hidden relative">
        <Image
          src={"/gif/confetti.gif"}
          width={200}
          height={40}
          alt="confetti"
          className="w-full h-80 absolute"
        />
      </div>
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:items-start">
          {isLoading ? (
            <Skeleton className="w-40 lg:w-2/5 h-[10vh] lg:h-[40vh]" />
          ) : (
            <div className="mt-5 w-3/5 lg:mt-40 lg:w-2/5 h-[30vh] lg:h-[40vh] relative">
              <Image
                src={bookings?.data?.eventBanner}
                layout="fill"
                fill
                alt={bookings?.data?.eventName}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex flex-col justify-center items-center mb-6 w-full lg:w-1/2 mx-auto">
            <div className="hidden lg:block">
              <Image
                src={"/gif/confetti.gif"}
                width={200}
                height={40}
                alt="confetti"
              />
            </div>

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

            {isLoading ? (
              <Skeleton className="h-12 w-38" />
            ) : (
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
            )}

            <div className="flex justify-between gap-10 items-center mt-10">
              <div onClick={handleDownloadPDF} className="cursor-pointer">
                <HiDownload size={22} className="text-gray-500" />
              </div>
              <Link href="/tickets">
                <Button variant="destructive">See tickets</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccessful;
