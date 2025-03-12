"use client";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useEventsContext } from "@/providers/events.provider";
import Container from "@/tw-components/container";
import Image from "next/image";
import Link from "next/link";
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
              <PDFDownloadLink
                document={<ReceiptPDF data={freeEventPayload} />}
                fileName={`Booking_Receipt_${freeEventPayload?.eventName}.pdf`}
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

export default PaymentSuccess;
