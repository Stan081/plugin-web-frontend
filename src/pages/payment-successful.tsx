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
    padding: 10, // Reduced padding to save space
    backgroundColor: "#ffffff",
  },
  ticketContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8, // Further reduced gap to fit four tickets
  },
  ticket: {
    width: "48%", // Two tickets per row
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8, // Reduced border radius to save space
    overflow: "hidden",
    marginBottom: 8, // Further reduced margin to fit four tickets
  },
  festivalHeader: {
    backgroundColor: "#D9302A",
    padding: 8, // Further reduced padding to save space
    alignItems: "center",
  },
  festivalTitle: {
    fontSize: 16, // Further reduced font size to fit more content
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  festivalSubtitle: {
    fontSize: 12, // Further reduced font size to fit more content
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 4, // Further reduced margin to save space
  },
  festivalDetails: {
    padding: 8, // Further reduced padding to save space
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6, // Further reduced margin to save space
  },
  detailLabel: {
    fontSize: 10, // Further reduced font size to fit more content
    color: "#515A6A",
  },
  detailValue: {
    fontSize: 10, // Further reduced font size to fit more content
    color: "#2C2B2E",
    fontWeight: "600",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginTop: 8, // Further reduced margin to save space
    marginBottom: 8, // Further reduced margin to save space
  },
  qrCode: {
    width: 80, // Further reduced QR code size to fit more content
    height: 80, // Further reduced QR code size to fit more content
  },
  termsSection: {
    backgroundColor: "#F9F7F7",
    padding: 8, // Further reduced padding to save space
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  termsTitle: {
    fontSize: 10, // Further reduced font size to fit more content
    color: "#515A6A",
    fontWeight: "600",
    marginBottom: 4, // Further reduced margin to save space
  },
  termsText: {
    fontSize: 8, // Further reduced font size to fit more content
    color: "#515A6A",
  },
});

const ReceiptPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      

      <View style={styles.ticketContainer}>
        

        <View style={styles.ticketContainer}>
          {data?.ticketData?.map((ticket, index) => (
            <View key={index} style={styles.ticket}>
              {/* Festival Header */}
            <View style={styles.festivalHeader}>
              <Text style={styles.festivalTitle}>{data?.eventName}</Text>
              {/* <Text style={styles.festivalSubtitle}>
                {ticket?.eventLocation || "N/A"}
              </Text> */}
            </View>

            {/* Festival Details */}
            <View style={styles.festivalDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  {data?.eventLocation || "N/A"}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>
                  {new Date(data?.eventDate).toLocaleDateString("en-GB", {
                    weekday: "short",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>

               {/* QR Code */}
            <View style={styles.qrCodeContainer}>
              <PDFImage src={ticket.qrCode} style={styles.qrCode} />
            </View>

              {/* Ticket Details */}
              <View style={styles.festivalDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Ticket Name</Text>
                  <Text style={styles.detailValue}>{ticket?.name}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Ticket Date</Text>
                  <Text style={styles.detailValue}>
                    {new Date(data?.eventDate).toLocaleDateString("en-GB", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>{data?.userEmail}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={styles.detailValue}>{ticket?.price}</Text>
                </View>
                {/* <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ticket ID</Text>
                <Text style={styles.detailValue}>Txjup6qqo78kv</Text>
              </View> */}
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
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
              Your tickets will be sent to{" "}
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

            <div className="flex justify-between gap-10 items-center mt-10">
              <PDFDownloadLinkNoSSR
                document={<ReceiptPDF data={bookings?.data} />}
                fileName={`Booking_Receipt_${bookings?.data?.eventName}.pdf`}
                className="cursor-pointer"
              >
                {({ loading }) => (
                  <HiDownload size={22} className="text-gray-500" />
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
