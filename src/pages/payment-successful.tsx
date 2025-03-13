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
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoText: {
    fontSize: 44,
    color: "#2E394C",
    fontWeight: "bold",
  },
  mainTitle: {
    fontSize: 24,
    color: "#D9302A",
    fontWeight: "500",
    marginTop: 16,
  },
  greeting: {
    fontSize: 16,
    color: "#515A6A",
    marginTop: 20,
  },
  eventName: {
    color: "#EB1C24",
    fontWeight: "600",
  },
  ticketContainer: {
    marginTop: 24,
  },
  ticketBackground: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  qrCode: {
    width: 150,
    height: 150,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  ticketDetails: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 32,
  },
  ticketHeader: {
    backgroundColor: "#221A14",
    padding: 14,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ticketHeaderText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  ticketContent: {
    backgroundColor: "#F9F7F7",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  detailItem: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: "#2C2B2E",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  appSection: {
    borderWidth: 1,
    borderColor: "#F4702D33",
    borderRadius: 12,
    backgroundColor: "#F4702D33",
    marginTop: 56,
    flexDirection: "row",
    padding: 24,
  },
  appContent: {
    width: "50%",
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  appDescription: {
    fontSize: 18,
    color: "#475367",
    marginTop: 20,
  },
  storeButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  storeButton: {
    backgroundColor: "#BC1622",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  storeButtonText: {
    color: "#ffffff",
  },
  storeButtonSmall: {
    fontSize: 12,
  },
  storeButtonLarge: {
    fontSize: 16,
  },
  footer: {
    marginTop: 40,
  },
  footerText: {
    color: "#969CA5",
    fontSize: 12,
  },
  socialLinks: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
  },
  socialIcon: {
    width: 28,
    height: 28,
  },
});

const ReceiptPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <PDFImage
            src="https://ik.imagekit.io/pluginImage/Plugin-images/img/logo.svg?updatedAt=1736331993218"
            style={styles.logo}
          />
          <Text style={styles.logoText}>Plugin</Text>
        </View>
      </View>

      <View>
        <Text style={styles.mainTitle}>Your paid ticket is Ready!</Text>

        <Text style={styles.greeting}>
          Hi {data?.userName || "there"}
          {"\n\n"}
          Thank you for purchasing a ticket for{" "}
          <Text style={styles.eventName}>"{data?.eventName || "N/A"}"</Text>
          {"\n\n"}
          We're thrilled to have you join us. Here's your ticket information:
        </Text>

        <View style={styles.ticketContainer}>
          {data?.ticketData?.map((ticket, index) => (
            <View key={index}>
              <View style={styles.ticketBackground}>
                <PDFImage
                  src="https://ik.imagekit.io/pluginImage/Plugin-images/img/ticket-bg-image.svg?updatedAt=1736331966100"
                  style={styles.ticketBackground}
                />
                <PDFImage src={ticket.qrCode} style={styles.qrCode} />
              </View>

              <View style={styles.ticketDetails}>
                <View style={styles.ticketHeader}>
                  <Text style={styles.ticketHeaderText}>Ticket ID</Text>
                  <Text style={styles.ticketHeaderText}>
                    {ticket.id || "N/A"}
                  </Text>
                </View>
                <View style={styles.ticketContent}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Event Name</Text>
                    <Text style={styles.detailValue}>
                      {data?.eventName || "N/A"}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Date and time</Text>
                    <Text style={styles.detailValue}>
                      {new Date(data?.eventDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Address</Text>
                    <Text style={styles.detailValue}>
                      {data?.eventLocation || "N/A"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.appSection}>
          <View style={styles.appContent}>
            <Text style={styles.appTitle}>
              Do more with the plugin mobile app
            </Text>
            <Text style={styles.appDescription}>
              Get real-time feeds on events you vibe with, interact and share
              with friends and Earn freebies
            </Text>
            <View style={styles.storeButtons}>
              <View style={styles.storeButton}>
                <PDFImage
                  src="https://ik.imagekit.io/pluginImage/Plugin-images/img/Playstore.svg?updatedAt=1736331966217"
                  style={{ width: 22, height: 22 }}
                />
                <View>
                  <Text
                    style={[styles.storeButtonText, styles.storeButtonSmall]}
                  >
                    Get in on
                  </Text>
                  <Text
                    style={[styles.storeButtonText, styles.storeButtonLarge]}
                  >
                    Google Play
                  </Text>
                </View>
              </View>
              <View style={styles.storeButton}>
                <PDFImage
                  src="https://ik.imagekit.io/pluginImage/Plugin-images/img/apple.svg?updatedAt=1736331993258"
                  style={{ width: 22, height: 22 }}
                />
                <View>
                  <Text
                    style={[styles.storeButtonText, styles.storeButtonSmall]}
                  >
                    Get in on
                  </Text>
                  <Text
                    style={[styles.storeButtonText, styles.storeButtonLarge]}
                  >
                    App store
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © Plugin by The Momentum Foundation, 100 Smith Street, Melbourne VIC
            3000. The Junity logo is a registered trademark of The Momentum
            Foundation
          </Text>
          <View style={styles.socialLinks}>
            <PDFImage
              src="https://ik.imagekit.io/pluginImage/Plugin-images/img/black-facebook.png?updatedAt=1736331966086"
              style={styles.socialIcon}
            />
            <PDFImage
              src="https://ik.imagekit.io/pluginImage/Plugin-images/img/black-twitter.png?updatedAt=1736331962243"
              style={styles.socialIcon}
            />
            <PDFImage
              src="https://ik.imagekit.io/pluginImage/Plugin-images/img/black-instagram.png?updatedAt=1736331993151"
              style={styles.socialIcon}
            />
          </View>
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
