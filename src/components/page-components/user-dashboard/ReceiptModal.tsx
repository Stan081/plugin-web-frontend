import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { TbReceipt } from "react-icons/tb";
import { BsDownload, BsTicketPerforated } from "react-icons/bs";
import { toFiat } from "@/lib/amount";
import Link from "next/link";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";
import dynamic from "next/dynamic";

type TicketDataProps = {
  price?: number;
  name?: string;
};

export type TicketProps = {
  _id: string;
  eventId: string;
  ticketData: TicketDataProps;
};
interface ReceiptModalProps {
  open: boolean;
  close: () => void;
  data?: TicketProps[];
  total?: number;
  email?: string;
  eventName: string;
}

type TicketAccumulator = {
  [ticketName: string]: {
    count: number;
    price: number;
  };
};

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

const ReceiptPDF = ({ data, eventName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.ticketContainer}>
        {data?.map((ticket, index) => (
          <View key={index} style={styles.ticket}>
            {/* Festival Header */}
            <View style={styles.festivalHeader}>
              <Text style={styles.festivalTitle}>{eventName}</Text>
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
              {/* <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email</Text>
                <Text style={styles.detailValue}>{data?.userEmail}</Text>
              </View> */}
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Price</Text>
                <Text style={styles.detailValue}>{ticket?.price}</Text>
              </View>
              {/* <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Ticket ID</Text>
                <Text style={styles.detailValue}>Txjup6qqo78kv</Text>
              </View> */}
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsSection}>
              <Text style={styles.termsTitle}>Terms and Conditions</Text>
              <Text style={styles.termsText}>
                - Tickets must be purchased from authorized sellers.
                {"\n"}- No refunds, exchanges, or cancellations unless the event
                is canceled or postponed.
              </Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const ReceiptModal: React.FC<ReceiptModalProps> = ({
  open,
  close,
  data,
  total,
  email,
  eventName
}) => {
  // Count occurrences of each ticket name and store price in a typed accumulator
  const ticketCount = data?.reduce<TicketAccumulator>((acc, ticket) => {
    const ticketName = ticket.ticketData.name;
    const ticketPrice = ticket.ticketData.price;

    if (!acc[ticketName]) {
      acc[ticketName] = { count: 0, price: ticketPrice };
    }

    acc[ticketName].count += 1;
    return acc;
  }, {});

  return (
    <div>
      <Dialog
        open={open}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium flex justify-between items-start"
              >
                <p className="px-3 py-1.5 bg-[#DAF0E1] flex items-center gap-2 p rounded-3xl text-[#04802E]">
                  Ticket Confirmed
                  <span className="inline-block">
                    <IoCheckmarkCircleSharp size={18} color="#04802E" />
                  </span>
                </p>
                <div onClick={close} className="p-1.5 rounded-full bg-gray-200">
                  <RiCloseLine size={20} />
                </div>
              </DialogTitle>
              <div>
                <div className="my-6 flex gap-5">
                  <IoTicket size={60} className="destructive" />
                  <div className="space-y-2">
                    <p className="font-pally-regular text-[#515A6A]">
                      Your ticket has been sent to{" "}
                    </p>
                    <p className="font-pally-medium text-xl">{email}</p>
                  </div>
                </div>
                <Separator />
                <div className="my-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="flex items-center gap-2">
                      <TbReceipt size={18} color="#667185" />
                      <span className="font-pally-medium">Order summary</span>
                    </p>

                    <PDFDownloadLinkNoSSR
                      document={<ReceiptPDF data={data} eventName={eventName} />}
                      fileName={`Ticket_Receipts_${eventName}.pdf`}
                      className="cursor-pointer"
                    >
                      {({ loading }) => (
                        <p className="flex items-center gap-2">
                          <BsDownload size={18} className="destructive" />
                          <span className="font-pally-medium destructive underline">
                            Download Ticket
                          </span>
                        </p>
                      )}
                    </PDFDownloadLinkNoSSR>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                      Order ID
                    </p>
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                      #1242801
                    </p>
                  </div>
                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                      Quantity
                    </p>
                    <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                      {data?.length} tickets
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="my-6 flex flex-col gap-4">
                  <p className="flex items-center gap-2">
                    <BsTicketPerforated size={18} color="#667185" />
                    <span className="font-pally-medium">Tickets</span>
                  </p>
                  {ticketCount &&
                    Object.entries(ticketCount).map(
                      ([name, { count, price }], index) => (
                        <div className="flex justify-between" key={index}>
                          <p className="text-sm md:text-base text-[#515A6A] font-pally-regular">
                            {count} x {name}
                          </p>
                          <p className="text-sm md:text-base text-[#515A6A] font-pally-medium">
                            {toFiat(price * count)}
                          </p>
                        </div>
                      )
                    )}

                  <div className=" flex justify-between">
                    <p className="text-sm md:text-base font-pally-medium">
                      Total
                    </p>
                    <p className="text-sm md:text-base font-pally-medium">
                      {toFiat(total)}
                    </p>
                  </div>
                </div>
                <Link
                  href={`mailto:support@pluginent.com`}
                  className="mt-5 text-sm font-pally-regular block text-center text-[#ee4d35]"
                >
                  Report an issue with this ticket
                </Link>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReceiptModal;
