"use client";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useEventsContext } from "@/providers/events.provider";
import Container from "@/tw-components/container";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { HiDownload } from "react-icons/hi";

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

// Payment success page for free events
const PaymentSuccess = () => {
  const router = useRouter();
  const { freeEventPayload } = useEventsContext();

  useEffect(() => {
    if (document.readyState === "complete") {
      setTimeout(() => {
        router.push("/tickets");
      }, 60000);
    }
  }, [router]);

  const startDate: string = freeEventPayload?.eventDate;
  const startTime: string = freeEventPayload?.startTime;

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

  // console.log(freeEventPayload);

  return (
    <Layout title="Payment successful" showHeader showFooter>
      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:my-10">
          <div className="hidden lg:block w-24 lg:w-2/5 h-[5vh] lg:h-[40vh] relative">
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
              A ticket guide will be sent to 
              <span className="text-black font-medium">
                {freeEventPayload?.userEmail}
              </span>
            </p>

            <p className="text-sm text-[#667185] my-6">Or download it below</p>

            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
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

            <div className="flex justify-between gap-6 lg:gap-10 items-center mt-10">
              <PDFDownloadLinkNoSSR
                document={
                  <ReceiptPDF
                    data={freeEventPayload}
                    formattedTime={formattedTime}
                  />
                }
                fileName={`Booking_Receipt_${freeEventPayload?.eventName}.pdf`}
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
                <Button variant="destructive">View tickets</Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default PaymentSuccess;
