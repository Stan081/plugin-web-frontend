"use client";
import Layout from "@/components/layout";
import { useGetSuccessfulTicket } from "@/hooks/useGetSuccesfulTicket";
import Container from "@/tw-components/container";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { HiDownload } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";

// Dynamically import PDFDownloadLink with ssr: false to disable SSR
const PDFDownloadLinkNoSSR = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
  },
  ticket: {
    width: "100%", // Use full page width
    maxWidth: 500, // Limit width for better readability
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
  },
  festivalHeader: {
    backgroundColor: "#D9302A",
    padding: 20,
    alignItems: "center",
  },
  festivalTitle: {
    fontSize: 24, // Larger font size
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  festivalSubtitle: {
    fontSize: 16, // Larger font size
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 8,
  },
  festivalDetails: {
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14, // Larger font size
    color: "#515A6A",
  },
  detailValue: {
    fontSize: 14, // Larger font size
    color: "#2C2B2E",
    fontWeight: "600",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  qrCode: {
    width: 150, // Larger QR code
    height: 150,
  },
  termsSection: {
    backgroundColor: "#F9F7F7",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  termsTitle: {
    fontSize: 14, // Larger font size
    color: "#515A6A",
    fontWeight: "600",
    marginBottom: 8,
  },
  termsText: {
    fontSize: 12, // Larger font size
    color: "#515A6A",
  },
});

const ReceiptPDF = ({ data, formattedTime }) => (
  <Document>
    {data?.ticketData?.map((ticket, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View style={styles.ticket}>
          {/* Festival Header */}
          <View style={styles.festivalHeader}>
            <Text style={styles.festivalTitle}>{data?.eventName}</Text>
            {data?.eventLocation && (
              <Text style={styles.festivalSubtitle}>{data.eventLocation}</Text>
            )}
          </View>

          {/* Festival Details */}
          <View style={styles.festivalDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>
                {new Date(data?.eventDate).toLocaleDateString("en-GB", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{formattedTime}</Text>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrCodeContainer}>
            <PDFImage src={ticket.qrCode} style={styles.qrCode} />
          </View>

          {/* Ticket Details */}
          <View style={styles.festivalDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ticket Type</Text>
              <Text style={styles.detailValue}>{ticket?.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Attendee</Text>
              <Text style={styles.detailValue}>
                {data?.userName || "Guest"}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{data?.userEmail}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Price</Text>
              <Text style={styles.detailValue}>
                {ticket?.price ? `₦${ticket.price}` : "Free"}
              </Text>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms and Conditions</Text>
            <Text style={styles.termsText}>
              - Tickets must be purchased from authorized sellers.
              {"\n"}- No refunds, exchanges, or cancellations unless the event
              is canceled or postponed.
              {"\n"}- This ticket is non-transferable.
            </Text>
          </View>
        </View>
      </Page>
    ))}
  </Document>
);

// Payment successful page after paystack payment
const PaymentSuccessful = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { data: bookings, isLoading } = useGetSuccessfulTicket(
    bookingId as string
  );

  const startDate: string = bookings?.data?.eventDate;

  const startTime: string = bookings?.data?.startTime;
  const date = new Date(startDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "long",
    day: "numeric",
    timeZone: "Africa/Lagos",
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
    timeZone: "Africa/Lagos",
  });

  console.log(bookings);

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
            <Skeleton className="w-40 mt-10 lg:w-2/5 h-[10vh] lg:h-[40vh]" />
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
              A ticket guide will be sent to
              <span className="text-black font-medium">
                {bookings?.data?.userEmail}
              </span>
            </p>

            <p className="text-sm text-[#667185] my-6">Or download it below</p>

            {isLoading ? (
              <Skeleton className="h-12 w-38" />
            ) : (
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
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

            <div className="flex justify-between gap-6 lg:gap-10 items-center mt-10">
              <PDFDownloadLinkNoSSR
                document={
                  <ReceiptPDF
                    data={bookings?.data}
                    formattedTime={formattedTime}
                  />
                }
                fileName={`Booking_Receipt_${bookings?.data?.eventName}.pdf`}
                className="cursor-pointer"
              >
                {({ loading }) => (
                  <Button variant="outline">
                    <span>Download</span>
                    <HiDownload size={22} className="text-gray-500 ml-2" />
                  </Button>
                )}
              </PDFDownloadLinkNoSSR>
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
