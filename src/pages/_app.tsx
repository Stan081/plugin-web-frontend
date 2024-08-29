import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/test.css";
import { UserDashboardProvider } from "@/providers/user_dashboard.provider";
import { EventsProvider } from "@/providers/events.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserDashboardProvider>
      <EventsProvider>
        <Component {...pageProps} />
      </EventsProvider>
    </UserDashboardProvider>
  );
}
