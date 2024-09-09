import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@/styles/test.css";
import { UserDashboardProvider } from "@/providers/user_dashboard.provider";
import { EventsProvider } from "@/providers/events.provider";
import { CreateEventProvider } from "@/providers/create_event.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserDashboardProvider>
      <CreateEventProvider>
        <EventsProvider>
          <Component {...pageProps} />
        </EventsProvider>
      </CreateEventProvider>
    </UserDashboardProvider>
  );
}
