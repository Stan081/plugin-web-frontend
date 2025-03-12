"use client";
import Layout from "@/components/layout";
import { useGetSuccessfulTicket } from "@/hooks/useGetSuccesfulTicket";
import Container from "@/tw-components/container";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import jsPDF from "jspdf";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { HiDownload } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
  ticketSection: {
    marginTop: 20,
  },
  ticketItem: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 10,
    border: "1 solid #eee",
  },
  qrCode: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  ticketInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
  },
});

const ReceiptPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Plugin Booking Receipt</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Event</Text>
        <Text style={styles.value}>{data?.eventName || "N/A"}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{data?.eventLocation || "N/A"}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>
          {new Date(data?.eventDate).toLocaleDateString()}
        </Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{data?.userEmail || "N/A"}</Text>
      </View>

      <View style={styles.ticketSection}>
        <Text style={styles.label}>Tickets</Text>
        {data?.ticketData?.map((ticket, index) => (
          <View key={index} style={styles.ticketItem}>
            <PDFImage src={ticket.qrCode} style={styles.qrCode} />
            <View style={styles.ticketInfo}>
              <Text>{ticket.name}</Text>
              <Text>${ticket.price}</Text>
            </View>
          </View>
        ))}
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
              <PDFDownloadLink
                document={<ReceiptPDF data={bookings?.data} />}
                fileName={`Booking_Receipt_${bookings?.data?.eventName}.pdf`}
                className="cursor-pointer"
              >
                {({ loading }) => (
                  <HiDownload size={22} className="text-gray-500" />
                )}
              </PDFDownloadLink>
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
